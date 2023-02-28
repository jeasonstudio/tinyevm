import { AOpcode, opcode } from './common';

@opcode(0xf0, 'CREATE', 'address = create(value, index, length)')
export class CREATE extends AOpcode {
  async execute() {
    this.debugOpcode();
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
    this.debugOpcode();
    throw new Error(`[tinyevm] opcode 'CALL(0xf1)' not implemented.`);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0xf2, 'CALLCODE', 'v = callcode(@TODO)')
export class CALLCODE extends AOpcode {
  async execute() {
    this.debugOpcode();
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
    this.ctx.returnValue =
      length === BigInt(0)
        ? Buffer.alloc(0)
        : this.ctx.memory.read(Number(offset), Number(length));
    this.debugOpcode(offset, length);
    throw new Error('RETURN');
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
    this.debugOpcode();
    throw new Error(`[tinyevm] opcode 'DELEGATECALL(0xf4)' not implemented.`);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0xf5, 'CREATE2', 'address = create2(value, index, length, salt)')
export class CREATE2 extends AOpcode {
  async execute() {
    this.debugOpcode();
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
    this.debugOpcode();
    throw new Error(`[tinyevm] opcode 'STATICCALL(0xfa)' not implemented.`);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0xfd, 'REVERT', 'revert(returnDataOffset, returnDataLength)')
export class REVERT extends AOpcode {
  async execute() {
    const [offset, length] = this.ctx.stack.popN(2);
    this.ctx.returnValue =
      length === BigInt(0)
        ? Buffer.alloc(0)
        : this.ctx.memory.read(Number(offset), Number(length));
    this.debugOpcode(offset, length);
    throw new Error(
      '[tinyevm] revert: ' + this.ctx.returnValue.toString('hex')
    );
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0xfe, 'INVALID', 'invalid')
export class INVALID extends AOpcode {
  async execute() {
    this.debugOpcode();
    // FIXME: 0xfe 一般等效于 revert(0x00, 0x00);
    // 通常是在 bytecode 中用于分割 constructor logic 和 contract code
    this.ctx.returnValue = Buffer.alloc(0);
    throw new Error(`[tinyevm] invalid(0xfe) opcode.`);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0xff, 'SUICIDE', 'suicide(targetAddress)')
export class SUICIDE extends AOpcode {
  async execute() {
    this.debugOpcode();
    throw new Error(`[tinyevm] opcode 'SUICIDE(0xff)' not implemented.`);
  }
  async gasUsed() {
    return BigInt(0);
  }
}
