import { AOpcode, opcode } from './common';

const commonExecute = async (self: AOpcode) => {
  // SWAP1: 0x90 - 0x8f = 0x01
  const stackPos = self.opcode - 0x8f;
  self.ctx.stack.swap(stackPos);
  self.debugOpcode();
};

@opcode(0x90, 'SWAP1')
export class SWAP1 extends AOpcode {
  async execute() {
    await commonExecute(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x91, 'SWAP2')
export class SWAP2 extends AOpcode {
  async execute() {
    await commonExecute(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x92, 'SWAP3')
export class SWAP3 extends AOpcode {
  async execute() {
    await commonExecute(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x93, 'SWAP4')
export class SWAP4 extends AOpcode {
  async execute() {
    await commonExecute(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x94, 'SWAP5')
export class SWAP5 extends AOpcode {
  async execute() {
    await commonExecute(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x95, 'SWAP6')
export class SWAP6 extends AOpcode {
  async execute() {
    await commonExecute(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x96, 'SWAP7')
export class SWAP7 extends AOpcode {
  async execute() {
    await commonExecute(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x97, 'SWAP8')
export class SWAP8 extends AOpcode {
  async execute() {
    await commonExecute(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x98, 'SWAP9')
export class SWAP9 extends AOpcode {
  async execute() {
    await commonExecute(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x99, 'SWAP10')
export class SWAP10 extends AOpcode {
  async execute() {
    await commonExecute(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x9a, 'SWAP11')
export class SWAP11 extends AOpcode {
  async execute() {
    await commonExecute(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x9b, 'SWAP12')
export class SWAP12 extends AOpcode {
  async execute() {
    await commonExecute(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x9c, 'SWAP13')
export class SWAP13 extends AOpcode {
  async execute() {
    await commonExecute(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x9d, 'SWAP14')
export class SWAP14 extends AOpcode {
  async execute() {
    await commonExecute(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x9e, 'SWAP15')
export class SWAP15 extends AOpcode {
  async execute() {
    await commonExecute(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x9f, 'SWAP16')
export class SWAP16 extends AOpcode {
  async execute() {
    await commonExecute(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}
