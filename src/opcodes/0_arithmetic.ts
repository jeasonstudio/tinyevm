import { TWO_POW256 } from '@ethereumjs/util';
import { AOpcode, mod, opcode } from './common';

function fromTwos(a: bigint) {
  return BigInt.asIntN(256, a);
}

function toTwos(a: bigint) {
  return BigInt.asUintN(256, a);
}

const N =
  BigInt(
    115792089237316195423570985008687907853269984665640564039457584007913129639936
  );
function exponentiation(bas: bigint, exp: bigint) {
  let t = BigInt(1);
  while (exp > BigInt(0)) {
    if (exp % BigInt(2) !== BigInt(0)) {
      t = (t * bas) % N;
    }
    bas = (bas * bas) % N;
    exp = exp / BigInt(2);
  }
  return t;
}

@opcode(0x00, 'STOP', 'stop')
export class STOP extends AOpcode {
  async execute() {
    this.debugOpcode();
    throw new Error('STOP');
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
    this.debugOpcode(a, b);
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
    this.debugOpcode(a, b);
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
    this.debugOpcode(a, b);
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
    this.debugOpcode(a, b);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x05, 'SDIV', 'v = sdiv(top, bottom)')
export class SDIV extends AOpcode {
  async execute() {
    const [a, b] = this.ctx.stack.popN(2);
    let r;
    if (b === BigInt(0)) {
      r = BigInt(0);
    } else {
      r = toTwos(fromTwos(a) / fromTwos(b));
    }
    this.ctx.stack.push(r);
    this.debugOpcode(a, b);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x06, 'MOD', 'v = mod(a, modulo)')
export class MOD extends AOpcode {
  async execute() {
    const [a, b] = this.ctx.stack.popN(2);
    let r;
    if (b === BigInt(0)) {
      r = b;
    } else {
      r = mod(a, b);
    }
    this.ctx.stack.push(r);
    this.debugOpcode(a, b);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x07, 'SMOD', 'v = smod(a, modulo)')
export class SMOD extends AOpcode {
  async execute() {
    const [a, b] = this.ctx.stack.popN(2);
    let r;
    if (b === BigInt(0)) {
      r = b;
    } else {
      r = fromTwos(a) % fromTwos(b);
    }
    this.ctx.stack.push(toTwos(r));
    this.debugOpcode(a, b);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x08, 'ADDMOD', 'v = addmod(a, b, modulo)')
export class ADDMOD extends AOpcode {
  async execute() {
    const [a, b, c] = this.ctx.stack.popN(3);
    let r;
    if (c === BigInt(0)) {
      r = BigInt(0);
    } else {
      r = mod(a + b, c);
    }
    this.ctx.stack.push(r);
    this.debugOpcode(a, b, c);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x09, 'MULMOD', 'v = mul(a, b, modulo)')
export class MULMOD extends AOpcode {
  async execute() {
    const [a, b, c] = this.ctx.stack.popN(3);
    let r;
    if (c === BigInt(0)) {
      r = BigInt(0);
    } else {
      r = mod(a * b, c);
    }
    this.ctx.stack.push(r);
    this.debugOpcode(a, b, c);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x0a, 'EXP', 'v = exp(base, exponent)')
export class EXP extends AOpcode {
  async execute() {
    const [base, exponent] = this.ctx.stack.popN(2);
    if (exponent === BigInt(0)) {
      this.ctx.stack.push(BigInt(1));
    } else if (base === BigInt(0)) {
      this.ctx.stack.push(base);
    } else {
      const r = exponentiation(base, exponent);
      this.ctx.stack.push(r);
    }
    this.debugOpcode(base, exponent);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x0b, 'SIGNEXTEND', 'v = signextend(value, byteWidth)')
export class SIGNEXTEND extends AOpcode {
  async execute() {
    this.debugOpcode();
    throw new Error(`[tinyevm] opcode 'SIGNEXTEND(0x0b)' not implemented.`);
  }
  async gasUsed() {
    return BigInt(0);
  }
}
