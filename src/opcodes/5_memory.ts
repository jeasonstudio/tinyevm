import {
  Address,
  bigIntToBuffer,
  bufferToBigInt,
  setLengthLeft,
} from '@ethereumjs/util';
import { add0x } from '../utils';
import { AOpcode, opcode } from './common';

@opcode(0x50, 'POP', 'stackTopValue = pop')
export class POP extends AOpcode {
  async execute() {
    this.ctx.stack.pop();
    this.debugOpcode();
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x51, 'MLOAD', 'memoryWordValue = mload(memoryByteIndex)')
export class MLOAD extends AOpcode {
  async execute() {
    const pos = this.ctx.stack.pop();
    const word = this.ctx.memory.read(Number(pos), 32);
    this.ctx.stack.push(bufferToBigInt(word));
    this.debugOpcode(pos);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x52, 'MSTORE', 'mstore(memoryByteIndex, valueOut)')
export class MSTORE extends AOpcode {
  async execute() {
    const [offset, word] = this.ctx.stack.popN(2);
    const buf = setLengthLeft(bigIntToBuffer(word), 32);
    const offsetNum = Number(offset);
    this.ctx.memory.write(offsetNum, 32, buf);
    this.debugOpcode(offset, word);
  }
  async gasUsed() {
    // TODO
    // const memDiff = this.ctx.memory.length - this.ctx.memory.prevLength;
    // if (memDiff > 0) {
    //   return BigInt(3) + BigInt(memDiff);
    // }
    return BigInt(3);
  }
}

@opcode(0x53, 'MSTORE8', 'mstore8(memoryByteIndex, valueOut [ & 0xff ])')
export class MSTORE8 extends AOpcode {
  async execute() {
    this.debugOpcode();
    throw new Error(`[tinyevm] opcode 'MSTORE8(0x53)' not implemented.`);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x54, 'SLOAD', 'storageWordValue = sload(storageWordIndex)')
export class SLOAD extends AOpcode {
  async execute() {
    const key = this.ctx.stack.pop();
    const address = this.ctx.tx.to ?? Address.zero();
    const keyBuf = setLengthLeft(bigIntToBuffer(key), 32);
    const value = await this.ctx.eei.storageLoad(address, keyBuf, false);
    const valueBigInt = value.length ? bufferToBigInt(value) : BigInt(0);
    this.ctx.stack.push(valueBigInt);
    this.debugOpcode(key);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x55, 'SSTORE', 'sstore(storageWordIndex, valueOut)')
export class SSTORE extends AOpcode {
  async execute() {
    const [key, val] = this.ctx.stack.popN(2);
    const address = this.ctx.tx.to ?? Address.zero();
    const keyBuf = setLengthLeft(bigIntToBuffer(key), 32);
    const value = val === BigInt(0) ? Buffer.from([]) : bigIntToBuffer(val);
    await this.ctx.eei.storageStore(address, keyBuf, value);
    this.debugOpcode(key, val);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x56, 'JUMP', 'jump(target)')
export class JUMP extends AOpcode {
  async execute() {
    const dest = this.ctx.stack.pop();
    const destNum = Number(dest);
    this.assert(
      dest <= this.ctx.codeSize,
      '[tinyevm] invalid jump destination'
    );

    this.ctx.programCounter = destNum;
    this.debugOpcode(dest);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x57, 'JUMPI', 'jumpi(target, notZero)')
export class JUMPI extends AOpcode {
  async execute() {
    const [dest, cond] = this.ctx.stack.popN(2);
    if (cond !== BigInt(0)) {
      this.assert(
        dest <= this.ctx.codeSize,
        '[tinyevm] invalid jump destination'
      );
      this.ctx.programCounter = Number(dest);
    }
    this.debugOpcode(dest, cond);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x58, 'PC', 'programCounter = pc')
export class PC extends AOpcode {
  async execute() {
    this.ctx.stack.push(BigInt(this.ctx.programCounter - 1));
    this.debugOpcode();
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x59, 'MSIZE', 'currentMemorySize = msize')
export class MSIZE extends AOpcode {
  async execute() {
    this.debugOpcode();
    throw new Error(`[tinyevm] opcode 'MSIZE(0x59)' not implemented.`);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x5a, 'GAS', 'remainingGas = gas')
export class GAS extends AOpcode {
  async execute() {
    this.debugOpcode();
    throw new Error(`[tinyevm] opcode 'GAS(0x5a)' not implemented.`);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x5b, 'JUMPDEST', 'jumpdest')
export class JUMPDEST extends AOpcode {
  async execute() {
    this.debugOpcode();
    // DO NOTHING, JUST A JUMP FLAG
  }
  async gasUsed() {
    return BigInt(1);
  }
}
