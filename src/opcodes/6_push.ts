import { AOpcode, opcode } from './common';

const commonExecute = async (self: AOpcode) => {
  self.assert(self.pushValue !== undefined, '[tinyevm] pushValue is undefined');
  self.ctx.stack.push(self.pushValue);
};

@opcode(0x60, 'PUSH1')
export class PUSH1 extends AOpcode {
  async execute() {
    await commonExecute(this);
  }
  async gasUsed() {
    return BigInt(3);
  }
}

@opcode(0x61, 'PUSH2')
export class PUSH2 extends AOpcode {
  async execute() {
    await commonExecute(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x62, 'PUSH3')
export class PUSH3 extends AOpcode {
  async execute() {
    await commonExecute(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x63, 'PUSH4')
export class PUSH4 extends AOpcode {
  async execute() {
    await commonExecute(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x64, 'PUSH5')
export class PUSH5 extends AOpcode {
  async execute() {
    await commonExecute(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x65, 'PUSH6')
export class PUSH6 extends AOpcode {
  async execute() {
    await commonExecute(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x66, 'PUSH7')
export class PUSH7 extends AOpcode {
  async execute() {
    await commonExecute(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x67, 'PUSH8')
export class PUSH8 extends AOpcode {
  async execute() {
    await commonExecute(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x68, 'PUSH9')
export class PUSH9 extends AOpcode {
  async execute() {
    await commonExecute(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x69, 'PUSH10')
export class PUSH10 extends AOpcode {
  async execute() {
    await commonExecute(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x6a, 'PUSH11')
export class PUSH11 extends AOpcode {
  async execute() {
    await commonExecute(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x6b, 'PUSH12')
export class PUSH12 extends AOpcode {
  async execute() {
    await commonExecute(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x6c, 'PUSH13')
export class PUSH13 extends AOpcode {
  async execute() {
    await commonExecute(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x6d, 'PUSH14')
export class PUSH14 extends AOpcode {
  async execute() {
    await commonExecute(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x6e, 'PUSH15')
export class PUSH15 extends AOpcode {
  async execute() {
    await commonExecute(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x6f, 'PUSH16')
export class PUSH16 extends AOpcode {
  async execute() {
    await commonExecute(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x70, 'PUSH17')
export class PUSH17 extends AOpcode {
  async execute() {
    await commonExecute(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x71, 'PUSH18')
export class PUSH18 extends AOpcode {
  async execute() {
    await commonExecute(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x72, 'PUSH19')
export class PUSH19 extends AOpcode {
  async execute() {
    await commonExecute(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x73, 'PUSH20')
export class PUSH20 extends AOpcode {
  async execute() {
    await commonExecute(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x74, 'PUSH21')
export class PUSH21 extends AOpcode {
  async execute() {
    await commonExecute(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x75, 'PUSH22')
export class PUSH22 extends AOpcode {
  async execute() {
    await commonExecute(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x76, 'PUSH23')
export class PUSH23 extends AOpcode {
  async execute() {
    await commonExecute(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x77, 'PUSH24')
export class PUSH24 extends AOpcode {
  async execute() {
    await commonExecute(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x78, 'PUSH25')
export class PUSH25 extends AOpcode {
  async execute() {
    await commonExecute(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x79, 'PUSH26')
export class PUSH26 extends AOpcode {
  async execute() {
    await commonExecute(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x7a, 'PUSH27')
export class PUSH27 extends AOpcode {
  async execute() {
    await commonExecute(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x7b, 'PUSH28')
export class PUSH28 extends AOpcode {
  async execute() {
    await commonExecute(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x7c, 'PUSH29')
export class PUSH29 extends AOpcode {
  async execute() {
    await commonExecute(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x7d, 'PUSH30')
export class PUSH30 extends AOpcode {
  async execute() {
    await commonExecute(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x7e, 'PUSH31')
export class PUSH31 extends AOpcode {
  async execute() {
    await commonExecute(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x7f, 'PUSH32')
export class PUSH32 extends AOpcode {
  async execute() {
    await commonExecute(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}
