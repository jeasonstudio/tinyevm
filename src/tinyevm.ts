import { BlockHeader } from '@ethereumjs/block';
import { Chain, Common } from '@ethereumjs/common';
import { Transaction } from '@ethereumjs/tx';
import assert from 'assert';
import { Context, IContextEEI } from './context';
import { opcodeValueMap, UNIMPLEMENTED } from './opcodes';

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
}

/**
 * TinyEVM tiny evm implementation
 */
export class TinyEVM implements ITinyEVMOpts {
  public common = new Common({ chain: Chain.Mainnet });
  public blockHeader = BlockHeader.fromHeaderData({}, { common: this.common });

  // public events: AsyncEventEmitter<any> = new AsyncEventEmitter();

  public constructor(protected opts?: ITinyEVMOpts) {
    // debug('constructor options', opts);
    Object.assign(this, opts);
  }

  public async runTx(
    tx: Transaction,
    eei?: Partial<IContextEEI>
  ): Promise<IExecuteResult> {
    const code = tx.data.toString('hex');
    debug('runTx', code);
    const ctx = new Context(tx, eei ?? {});

    debug('stack', ctx.stack.toString());

    const errors: Error[] = [];
    while (ctx.programCounter < ctx.codeSize) {
      const opcode = ctx.code[ctx.programCounter];
      assert(ctx.programCounter >= 0, '[tinyevm] invalid program counter');
      assert(opcode !== undefined, '[tinyevm] invalid opcode');

      const Factory = opcodeValueMap[opcode] || UNIMPLEMENTED;
      const operation = new Factory(ctx, ctx.programCounter);

      ctx.programCounter += 1;

      // try {
      // 执行 opcode
      await operation.execute();
      // 计算 gas
      ctx.gasUsed += operation.gasUsed ? await operation.gasUsed() : BigInt(0);
      // 更新 counter
      // } catch (err) {
      //   const error = err as Error;
      //   // 0x00
      //   if (error.message === 'stop') {
      //     throw error;
      //   }
      //   errors.push(error);
      // }
    }

    return {
      executionGasUsed: ctx.gasUsed,
      returnValue: ctx.returnValue,
    };
  }
}
