import { BlockHeader } from '@ethereumjs/block';
import { Chain, Common } from '@ethereumjs/common';
import { Transaction } from '@ethereumjs/tx';
import * as asm from '@ethersproject/asm';
import { Context } from './context';
import { opcodeLabelMap, UNIMPLEMENTED } from './opcodes';

const debug = require('debug')('tinyevm:core');

export interface ITinyEVMOpts {
  // ethereumjs common instance
  common?: Common;
  // 区块头（只需要头信息）
  blockHeader?: BlockHeader;
}

export interface IExecuteResult {
  executionGasUsed: bigint;
  returnValue: string;
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

  public async runTx(tx: Transaction): Promise<IExecuteResult> {
    const code = tx.data.toString('hex');
    debug('runTx', code);
    const asmOpcodes = asm.disassemble(tx.data.toString('hex'));
    const ctx = new Context(code, tx.gasLimit);

    const operations = asmOpcodes.map((item) => {
      const opcodeLabel = item.opcode.mnemonic;
      const OpcodeFactory = opcodeLabelMap[opcodeLabel] || UNIMPLEMENTED;
      return new OpcodeFactory(ctx, item.offset, item.length, item.pushValue);
    });

    debug('stack', ctx.stack.toString());
    for (const operation of operations) {
      await operation.execute();
      debug('stack', ctx.stack.toString());
      ctx.gasUsed += await operation.gasUsed();
    }

    return {
      executionGasUsed: ctx.gasUsed,
      returnValue: `0x${ctx.returnValue}`,
    };
  }
}
