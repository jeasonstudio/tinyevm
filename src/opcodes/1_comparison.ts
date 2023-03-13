import { MAX_INTEGER_BIGINT } from '@ethereumjs/util';
import { AOpcode, opcode } from './common';

function fromTwos(a: bigint) {
  return BigInt.asIntN(256, a);
}

@opcode(0x10, 'LT', 'v = lt(a, b)')
export class LT extends AOpcode {
  async execute() {
    const [a, b] = this.ctx.stack.popN(2);
    const r = a < b ? BigInt(1) : BigInt(0);
    this.ctx.stack.push(r);
    this.debugOpcode(a, b);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x11, 'GT', 'v = gt(a, b)')
export class GT extends AOpcode {
  async execute() {
    const [a, b] = this.ctx.stack.popN(2);
    const r = a > b ? BigInt(1) : BigInt(0);
    this.ctx.stack.push(r);
    this.debugOpcode(a, b);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x12, 'SLT', 'v = slt(a, b)')
export class SLT extends AOpcode {
  async execute() {
    const [a, b] = this.ctx.stack.popN(2);
    const r =
      BigInt.asIntN(256, a) < BigInt.asIntN(256, b) ? BigInt(1) : BigInt(0);
    this.ctx.stack.push(r);
    this.debugOpcode(a, b);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x13, 'SGT', 'v = sgt(a, b)')
export class SGT extends AOpcode {
  async execute() {
    const [a, b] = this.ctx.stack.popN(2);
    const r = fromTwos(a) > fromTwos(b) ? BigInt(1) : BigInt(0);
    this.ctx.stack.push(r);
    this.debugOpcode(a, b);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x14, 'EQ', 'v = eq(a, b)')
export class EQ extends AOpcode {
  async execute() {
    const [a, b] = this.ctx.stack.popN(2);
    const r = a === b ? BigInt(1) : BigInt(0);
    this.ctx.stack.push(r);
    this.debugOpcode(a, b);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x15, 'ISZERO', 'v = iszero(a)')
export class ISZERO extends AOpcode {
  async execute() {
    const a = this.ctx.stack.pop();
    const r = a === BigInt(0) ? BigInt(1) : BigInt(0);
    this.ctx.stack.push(r);
    this.debugOpcode(a);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x16, 'AND', 'v = and(a, b)')
export class AND extends AOpcode {
  async execute() {
    const [a, b] = this.ctx.stack.popN(2);
    const r = a & b;
    this.ctx.stack.push(r);
    this.debugOpcode(a, b);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x17, 'OR', 'v = or(a, b)')
export class OR extends AOpcode {
  async execute() {
    const [a, b] = this.ctx.stack.popN(2);
    const r = a | b;
    this.ctx.stack.push(r);
    this.debugOpcode(a, b);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x18, 'XOR', 'v = xor(a, b)')
export class XOR extends AOpcode {
  async execute() {
    const [a, b] = this.ctx.stack.popN(2);
    const r = a ^ b;
    this.ctx.stack.push(r);
    this.debugOpcode(a, b);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x19, 'NOT', 'v = not(a, b)')
export class NOT extends AOpcode {
  async execute() {
    const a = this.ctx.stack.pop();
    const r = BigInt.asUintN(256, ~a);
    this.ctx.stack.push(r);
    this.debugOpcode(a);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x1a, 'BYTE', 'v = byte(msbByteIndex, value)')
export class BYTE extends AOpcode {
  async execute() {
    const [pos, word] = this.ctx.stack.popN(2);
    if (pos > BigInt(32)) {
      this.ctx.stack.push(BigInt(0));
      return;
    }
    // TODO: 暂时没看懂这里的逻辑
    const r = (word >> ((BigInt(31) - pos) * BigInt(8))) & BigInt(0xff);
    this.ctx.stack.push(r);
    this.debugOpcode(pos, word);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x1b, 'SHL', 'v = shl(shiftBits, value)')
export class SHL extends AOpcode {
  async execute() {
    const [a, b] = this.ctx.stack.popN(2);
    if (a > BigInt(256)) {
      this.ctx.stack.push(BigInt(0));
      return;
    }

    const r = (b << a) & MAX_INTEGER_BIGINT;
    this.ctx.stack.push(r);
    this.debugOpcode(a, b);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x1c, 'SHR', 'v = shr(shiftBits, value)')
export class SHR extends AOpcode {
  async execute() {
    const [a, b] = this.ctx.stack.popN(2);
    if (a > 256) {
      this.ctx.stack.push(BigInt(0));
      return;
    }

    const r = b >> a;
    this.ctx.stack.push(r);
    this.debugOpcode(a, b);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x1d, 'SAR', 'v = sar(shiftBits, value)')
export class SAR extends AOpcode {
  async execute() {
    const [a, b] = this.ctx.stack.popN(2);

    let r;
    const bComp = BigInt.asIntN(256, b);
    const isSigned = bComp < 0;
    if (a > 256) {
      if (isSigned) {
        r = MAX_INTEGER_BIGINT;
      } else {
        r = BigInt(0);
      }
      this.ctx.stack.push(r);
      return;
    }

    const c = b >> a;
    if (isSigned) {
      const shiftedOutWidth = BigInt(255) - a;
      const mask = (MAX_INTEGER_BIGINT >> shiftedOutWidth) << shiftedOutWidth;
      r = c | mask;
    } else {
      r = c;
    }
    this.ctx.stack.push(r);
    this.debugOpcode(a, b);
  }
  async gasUsed() {
    return BigInt(0);
  }
}
