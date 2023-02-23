import { AOpcode, opcode } from './common';

const commonExecute = async (self: AOpcode) => {
  const stackPos = self.opcode - 0x7f;
  self.ctx.stack.dup(stackPos);
};

@opcode(0x80, 'DUP1')
export class DUP1 extends AOpcode {
  async execute() {
    await commonExecute(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x81, 'DUP2')
export class DUP2 extends AOpcode {
  async execute() {
    await commonExecute(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x82, 'DUP3')
export class DUP3 extends AOpcode {
  async execute() {
    await commonExecute(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x83, 'DUP4')
export class DUP4 extends AOpcode {
  async execute() {
    await commonExecute(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x84, 'DUP5')
export class DUP5 extends AOpcode {
  async execute() {
    await commonExecute(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x85, 'DUP6')
export class DUP6 extends AOpcode {
  async execute() {
    await commonExecute(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x86, 'DUP7')
export class DUP7 extends AOpcode {
  async execute() {
    await commonExecute(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x87, 'DUP8')
export class DUP8 extends AOpcode {
  async execute() {
    await commonExecute(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x88, 'DUP9')
export class DUP9 extends AOpcode {
  async execute() {
    await commonExecute(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x89, 'DUP10')
export class DUP10 extends AOpcode {
  async execute() {
    await commonExecute(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x8a, 'DUP11')
export class DUP11 extends AOpcode {
  async execute() {
    await commonExecute(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x8b, 'DUP12')
export class DUP12 extends AOpcode {
  async execute() {
    await commonExecute(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x8c, 'DUP13')
export class DUP13 extends AOpcode {
  async execute() {
    await commonExecute(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x8d, 'DUP14')
export class DUP14 extends AOpcode {
  async execute() {
    await commonExecute(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x8e, 'DUP15')
export class DUP15 extends AOpcode {
  async execute() {
    await commonExecute(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x8f, 'DUP16')
export class DUP16 extends AOpcode {
  async execute() {
    await commonExecute(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}
