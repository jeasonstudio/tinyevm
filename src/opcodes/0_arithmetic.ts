import { TWO_POW256 } from '@ethereumjs/util';
import { AOpcode, mod, opcode } from './common';

@opcode(0x00, 'STOP', 'stop')
export class STOP extends AOpcode {
  async execute() {
    throw new Error(`[tinyevm] opcode 'STOP(0x00)' stop.`);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x01, 'ADD', 'v = add(a, b)')
export class ADD extends AOpcode {
  async execute() {
    const [a, b] = this.ctx.stack.popN(2);
    const r = mod(a + b, TWO_POW256);
    this.ctx.stack.push(r);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x02, 'MUL', 'v = mul(a, b)')
export class MUL extends AOpcode {
  async execute() {
    const [a, b] = this.ctx.stack.popN(2);
    const r = mod(a * b, TWO_POW256);
    this.ctx.stack.push(r);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x03, 'SUB', 'v = sub(a, b)')
export class SUB extends AOpcode {
  async execute() {
    const [a, b] = this.ctx.stack.popN(2);
    const r = mod(a - b, TWO_POW256);
    this.ctx.stack.push(r);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x04, 'DIV', 'v = div(top, bottom)')
export class DIV extends AOpcode {
  async execute() {
    const [a, b] = this.ctx.stack.popN(2);
    let r;
    if (b === BigInt(0)) {
      r = BigInt(0);
    } else {
      r = mod(a / b, TWO_POW256);
    }
    this.ctx.stack.push(r);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x05, 'SDIV', 'v = sdiv(top, bottom)')
export class SDIV extends AOpcode {
  async execute() {}
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x06, 'MOD', 'v = mod(a, modulo)')
export class MOD extends AOpcode {
  async execute() {
    throw new Error(`[tinyevm] opcode 'MOD(0x06)' not implemented.`);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x07, 'SMOD', 'v = smod(a, modulo)')
export class SMOD extends AOpcode {
  async execute() {
    throw new Error(`[tinyevm] opcode 'SMOD(0x07)' not implemented.`);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x08, 'ADDMOD', 'v = addmod(a, b, modulo)')
export class ADDMOD extends AOpcode {
  async execute() {
    throw new Error(`[tinyevm] opcode 'ADDMOD(0x08)' not implemented.`);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x09, 'MULMOD', 'v = mul(a, b, modulo)')
export class MULMOD extends AOpcode {
  async execute() {
    throw new Error(`[tinyevm] opcode 'MULMOD(0x09)' not implemented.`);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x0a, 'EXP', 'v = exp(base, exponent)')
export class EXP extends AOpcode {
  async execute() {
    throw new Error(`[tinyevm] opcode 'EXP(0x0a)' not implemented.`);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x0b, 'SIGNEXTEND', 'v = signextend(value, byteWidth)')
export class SIGNEXTEND extends AOpcode {
  async execute() {
    throw new Error(`[tinyevm] opcode 'SIGNEXTEND(0x0b)' not implemented.`);
  }
  async gasUsed() {
    return BigInt(0);
  }
}
