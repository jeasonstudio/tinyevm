import { AOpcode, opcode } from './common';

@opcode(0x50, 'POP', 'stackTopValue = pop')
export class POP extends AOpcode {
  async execute() {
    throw new Error(`[tinyevm] opcode 'POP(0x50)' not implemented.`);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x51, 'MLOAD', 'memoryWordValue = mload(memoryByteIndex)')
export class MLOAD extends AOpcode {
  async execute() {
    throw new Error(`[tinyevm] opcode 'MLOAD(0x51)' not implemented.`);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x52, 'MSTORE', 'mstore(memoryByteIndex, valueOut)')
export class MSTORE extends AOpcode {
  async execute() {
    const [offset, word] = this.ctx.stack.popN(2);
    const targetValue = word.toString(16).padStart(32, '0');
    this.ctx.memory.write(Number(offset), targetValue);
  }
  async gasUsed() {
    const memDiff = this.ctx.memory.length - this.ctx.memory.prevLength;
    if (memDiff > 0) {
      return BigInt(3) + BigInt(memDiff);
    }
    return BigInt(3);
  }
}

@opcode(0x53, 'MSTORE8', 'mstore8(memoryByteIndex, valueOut [ & 0xff ])')
export class MSTORE8 extends AOpcode {
  async execute() {
    throw new Error(`[tinyevm] opcode 'MSTORE8(0x53)' not implemented.`);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x54, 'SLOAD', 'storageWordValue = sload(storageWordIndex)')
export class SLOAD extends AOpcode {
  async execute() {
    throw new Error(`[tinyevm] opcode 'SLOAD(0x54)' not implemented.`);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x55, 'SSTORE', 'sstore(storageWordIndex, valueOut)')
export class SSTORE extends AOpcode {
  async execute() {
    throw new Error(`[tinyevm] opcode 'SSTORE(0x55)' not implemented.`);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x56, 'JUMP', 'jump(target)')
export class JUMP extends AOpcode {
  async execute() {
    throw new Error(`[tinyevm] opcode 'JUMP(0x56)' not implemented.`);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x57, 'JUMPI', 'jumpi(target, notZero)')
export class JUMPI extends AOpcode {
  async execute() {
    throw new Error(`[tinyevm] opcode 'JUMPI(0x57)' not implemented.`);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x58, 'PC', 'programCounter = pc')
export class PC extends AOpcode {
  async execute() {
    throw new Error(`[tinyevm] opcode 'PC(0x58)' not implemented.`);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x59, 'MSIZE', 'currentMemorySize = msize')
export class MSIZE extends AOpcode {
  async execute() {
    throw new Error(`[tinyevm] opcode 'MSIZE(0x59)' not implemented.`);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x5a, 'GAS', 'remainingGas = gas')
export class GAS extends AOpcode {
  async execute() {
    throw new Error(`[tinyevm] opcode 'GAS(0x5a)' not implemented.`);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x5b, 'JUMPDEST', 'jumpdest')
export class JUMPDEST extends AOpcode {
  async execute() {
    throw new Error(`[tinyevm] opcode 'JUMPDEST(0x5b)' not implemented.`);
  }
  async gasUsed() {
    return BigInt(0);
  }
}
