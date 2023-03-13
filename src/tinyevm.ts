import { BlockHeader } from '@ethereumjs/block';
import { Chain, Common } from '@ethereumjs/common';
import { Transaction, TxData } from '@ethereumjs/tx';
import { Address } from '@ethereumjs/util';
import assert from 'assert';
import EventEmitter2 from 'eventemitter2';
import { Context, IContextEEI, Log } from './context';
import { Memory } from './memory';
import { opcodeValueMap } from './opcodes';
import { Stack } from './stack';
import { Storage } from './storage';
import {
  createCallTxData,
  createDeployTxData,
  createTx,
  decodeReturnValue,
} from './utils';

const debug = require('debug')('tinyevm:core');

export interface ITinyEVMOpts {
  // ethereumjs common instance
  common?: Common;
  // 区块头（只需要头信息）
  blockHeader?: BlockHeader;
}

export interface IExecResultBase extends Record<PropertyKey, any> {
  storage: Storage;
  memory: Memory;
  stack: Stack;
  returnValue: Buffer;
  logs: Log[];
  executionGasUsed: bigint;
}

export interface IRunTxResult extends IExecResultBase {
  to: Address;
}

export interface IDeployContractParams {
  privateKey: Buffer;
  bytecode: string;
  abi?: any[];
  deployArgv?: any[];
  txData?: TxData;
}

export interface IDeployContractResult extends IExecResultBase {
  contractAddress: Address;
}

export interface ICallContractParams {
  contractAddress: Address;
  privateKey: Buffer;
  abi: any[];
  method: string;
  methodArgv?: any[];
  txData?: TxData;
}

export interface ICallContractResult extends IExecResultBase {
  parsedReturnValue: ReadonlyArray<any>;
}

export type TinyEVMEvent = [string, Function];

/**
 * TinyEVM tiny evm implementation
 */
export class TinyEVM implements ITinyEVMOpts {
  public common = new Common({ chain: Chain.Mainnet });
  public blockHeader = BlockHeader.fromHeaderData({}, { common: this.common });
  private storage = new Storage();

  // mapping(address -> code)
  private contracts = new Map<string, Buffer>();

  public events: EventEmitter2 = new EventEmitter2();

  public constructor(protected opts?: ITinyEVMOpts) {
    // debug('constructor options', opts);
    Object.assign(this, opts);
  }

  private getBuiltinEEI = (): Pick<
    IContextEEI,
    'storageLoad' | 'storageStore' | 'getContractCode'
  > => {
    return {
      storageStore: async (address, key, value) => {
        this.storage.put(address, key, value);
      },
      storageLoad: async (address, key, original) => {
        const result = this.storage.get(address, key);
        return result;
      },
      getContractCode: async (address) => {
        const code = this.contracts.get(address.toString()) || Buffer.alloc(0);
        return code;
      },
    };
  };

  public async runTx(
    tx: Transaction,
    eei?: Partial<IContextEEI>
  ): Promise<IRunTxResult> {
    const code = tx.data.toString('hex');
    debug('runTx', code);

    // 初始化上下文 Context
    const ctx = new Context(
      tx,
      this.events,
      Object.assign({}, this.getBuiltinEEI(), eei)
    );
    await ctx.prepare();

    // 程序运行
    while (ctx.programCounter < ctx.code.length) {
      const opcode = ctx.code[ctx.programCounter];
      assert(ctx.programCounter >= 0, '[tinyevm] invalid program counter');
      assert(opcode !== undefined, '[tinyevm] invalid opcode');

      const Factory = opcodeValueMap[opcode] || opcodeValueMap[0xfe];
      const operation = new Factory(ctx, ctx.programCounter);

      // 更新 program counter
      ctx.programCounter += 1;

      try {
        // 执行 opcode
        await operation.execute();
        // 计算 gas
        ctx.gasUsed += await operation.gasUsed();
      } catch (err) {
        const error = err as any;
        error.programCounter = ctx.programCounter;
        error.opcode = operation.toString();
        if (error.message === 'RETURN') {
          // 正常的 RETURN Opcode，不应该抛出错误
        } else if (error.message === 'STOP') {
          // 正常的 STOP Opcode，不应该抛出错误
        } else {
          throw error;
        }
        break;
      }
    }

    return {
      executionGasUsed: ctx.gasUsed,
      returnValue: ctx.returnValue,
      storage: this.storage,
      memory: ctx.memory,
      stack: ctx.stack,
      to: ctx.to,
      logs: ctx.logs,
    };
  }

  /**
   * 部署合约：对 runTx 的高级封装
   * @param params deploy params
   * @returns result
   */
  public async deployContract(
    params: IDeployContractParams
  ): Promise<IDeployContractResult> {
    const { privateKey, abi = [], bytecode, deployArgv = [], txData } = params;
    const from = Address.fromPrivateKey(privateKey);
    debug('deployContract from', from.toString());

    const data = createDeployTxData(abi, bytecode, deployArgv);
    const tx = createTx({ ...txData, data }).sign(privateKey);

    const result = await this.runTx(tx);
    const contractCode = result.returnValue;
    const contractAddress = result.to;

    this.contracts.set(contractAddress.toString(), contractCode);
    return {
      ...result,
      contractAddress,
    };
  }

  /**
   * 调用合约：对 runTx 的高级封装
   * @param params call contract params
   * @returns result
   */
  public async callContract(
    params: ICallContractParams
  ): Promise<ICallContractResult> {
    const {
      privateKey,
      abi = [],
      method,
      methodArgv = [],
      txData,
      contractAddress,
    } = params;
    const from = Address.fromPrivateKey(privateKey);
    debug('callContract from', from.toString());
    debug('callContract address', contractAddress.toString());

    const data = createCallTxData(abi, method, methodArgv);
    const tx = createTx({ ...txData, data, to: contractAddress }).sign(
      privateKey
    );

    const result = await this.runTx(tx);
    const parsedReturnValue = decodeReturnValue(
      abi,
      method,
      result.returnValue
    );
    return {
      ...result,
      parsedReturnValue,
    };
  }

  public addEventListener(
    eventName: 'contract.deploy',
    callback: (address: Address, code: Buffer) => Promise<void>
  ) {
    this.events.addListener(eventName, callback);
  }
  // public addEventListener() {}
}
