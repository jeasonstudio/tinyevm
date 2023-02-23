import { AOpcode, opcode } from './common';

@opcode(0xf0, 'CREATE', 'address = create(value, index, length)')
export class CREATE extends AOpcode {
  async execute() {
    throw new Error(`[tinyevm] opcode 'CREATE(0xf0)' not implemented.`);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(
  0xf1,
  'CALL',
  'v = call(gasLimit, address, value, inputIndex, inputLength, outputIndex, outputLength)'
)
export class CALL extends AOpcode {
  async execute() {
    throw new Error(`[tinyevm] opcode 'CALL(0xf1)' not implemented.`);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0xf2, 'CALLCODE', 'v = callcode(@TODO)')
export class CALLCODE extends AOpcode {
  async execute() {
    throw new Error(`[tinyevm] opcode 'CALLCODE(0xf2)' not implemented.`);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0xf3, 'RETURN', 'return(index, length)')
export class RETURN extends AOpcode {
  async execute() {
    const [offset, length] = this.ctx.stack.popN(2);
    this.ctx.returnValue = this.ctx.memory.read(Number(offset), Number(length));
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(
  0xf4,
  'DELEGATECALL',
  'v = delegatecall(gasLimit, address, inputIndex, inputLength, outputIndex, outputLength)'
)
export class DELEGATECALL extends AOpcode {
  async execute() {
    throw new Error(`[tinyevm] opcode 'DELEGATECALL(0xf4)' not implemented.`);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0xf5, 'CREATE2', 'address = create2(value, index, length, salt)')
export class CREATE2 extends AOpcode {
  async execute() {
    throw new Error(`[tinyevm] opcode 'CREATE2(0xf5)' not implemented.`);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(
  0xfa,
  'STATICCALL',
  'v = staticcall(gasLimit, address, inputIndex, inputLength, outputIndex, outputLength)'
)
export class STATICCALL extends AOpcode {
  async execute() {
    throw new Error(`[tinyevm] opcode 'STATICCALL(0xfa)' not implemented.`);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0xfd, 'REVERT', 'revert(returnDataOffset, returnDataLength)')
export class REVERT extends AOpcode {
  async execute() {
    throw new Error(`[tinyevm] opcode 'REVERT(0xfd)' not implemented.`);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0xfe, 'INVALID', 'invalid')
export class INVALID extends AOpcode {
  async execute() {
    throw new Error(`[tinyevm] opcode 'INVALID(0xfe)' not implemented.`);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0xff, 'SUICIDE', 'suicide(targetAddress)')
export class SUICIDE extends AOpcode {
  async execute() {
    throw new Error(`[tinyevm] opcode 'SUICIDE(0xff)' not implemented.`);
  }
  async gasUsed() {
    return BigInt(0);
  }
}
