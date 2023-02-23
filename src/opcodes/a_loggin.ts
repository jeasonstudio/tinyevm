import { AOpcode, opcode } from './common';

@opcode(0xa0, 'LOG0')
export class LOG0 extends AOpcode {
  async execute() {
    throw new Error(`[tinyevm] opcode 'LOG0(0xa0)' not implemented.`);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0xa1, 'LOG1')
export class LOG1 extends AOpcode {
  async execute() {
    throw new Error(`[tinyevm] opcode 'LOG1(0xa1)' not implemented.`);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0xa2, 'LOG2')
export class LOG2 extends AOpcode {
  async execute() {
    throw new Error(`[tinyevm] opcode 'LOG2(0xa2)' not implemented.`);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0xa3, 'LOG3')
export class LOG3 extends AOpcode {
  async execute() {
    throw new Error(`[tinyevm] opcode 'LOG3(0xa3)' not implemented.`);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0xa4, 'LOG4')
export class LOG4 extends AOpcode {
  async execute() {
    throw new Error(`[tinyevm] opcode 'LOG4(0xa4)' not implemented.`);
  }
  async gasUsed() {
    return BigInt(0);
  }
}
