import { BlockHeader } from '@ethereumjs/block';
import { Chain, Common } from '@ethereumjs/common';
import { Transaction } from '@ethereumjs/tx';
import { Address } from '@ethereumjs/util';
import assert from 'assert';
import { Context, IContextEEI } from './context';
import { Memory } from './memory';
import { opcodeValueMap, UNIMPLEMENTED } from './opcodes';
import { Stack } from './stack';
import { Storage } from './storage';

const debug = require('debug')('tinyevm:core');

export interface ITinyEVMOpts {
  // ethereumjs common instance
  common?: Common;
  // 区块头（只需要头信息）
  blockHeader?: BlockHeader;
}

export interface IExecuteResult {
  executionGasUsed: bigint;
  returnValue: Buffer;
  storage: Storage;
  memory: Memory;
  stack: Stack;
  to: Address;
}

/**
 * TinyEVM tiny evm implementation
 */
export class TinyEVM implements ITinyEVMOpts {
  public common = new Common({ chain: Chain.Mainnet });
  public blockHeader = BlockHeader.fromHeaderData({}, { common: this.common });
  private storage = new Storage();

  // public events: AsyncEventEmitter<any> = new AsyncEventEmitter();

  public constructor(protected opts?: ITinyEVMOpts) {
    // debug('constructor options', opts);
    Object.assign(this, opts);
  }

  private getBuiltinEEI = (): Pick<
    IContextEEI,
    'storageLoad' | 'storageStore'
  > => {
    return {
      storageStore: async (address, key, value) => {
        this.storage.put(address, key, value);
      },
      storageLoad: async (address, key, original) => {
        const result = this.storage.get(address, key);
        return result;
      },
    };
  };

  public async runTx(
    tx: Transaction,
    eei?: Partial<IContextEEI>
  ): Promise<IExecuteResult> {
    const code = tx.data.toString('hex');
    debug('runTx', code);

    // 初始化上下文 Context
    const ctx = new Context(tx, Object.assign({}, this.getBuiltinEEI(), eei));
    await ctx.prepareToAddress();

    // 程序运行
    while (ctx.programCounter < ctx.code.length) {
      const opcode = ctx.code[ctx.programCounter];
      assert(ctx.programCounter >= 0, '[tinyevm] invalid program counter');
      assert(opcode !== undefined, '[tinyevm] invalid opcode');

      const Factory = opcodeValueMap[opcode] || UNIMPLEMENTED;
      const operation = new Factory(ctx, ctx.programCounter);

      // 更新 counter
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
          // normal return
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
    };
  }
}
