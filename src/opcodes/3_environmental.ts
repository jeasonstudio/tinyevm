import { Address, bufferToBigInt } from '@ethereumjs/util';
import { add0x } from '../utils';
import { AOpcode, opcode } from './common';

@opcode(0x30, 'ADDRESS', 'myAddr = address')
export class ADDRESS extends AOpcode {
  async execute() {
    const address = this.ctx.tx.to ?? Address.zero();
    this.ctx.stack.push(bufferToBigInt(address.buf));
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x31, 'BALANCE', 'wei = balance(address)')
export class BALANCE extends AOpcode {
  async execute() {
    const addressBigInt = this.ctx.stack.pop();
    const address = Address.fromString(
      addressBigInt.toString(16).padStart(40, '0')
    );
    const balance = (await this.ctx.eei.getAccount(address)).balance;
    this.ctx.stack.push(balance);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x32, 'ORIGIN', 'txOrigin = origin')
export class ORIGIN extends AOpcode {
  async execute() {
    // 这里的实现不准确，origin 应该是交易的最初调用者
    // 但 TinyEVM 并没有合约之间调用的能力，所以这里直接返回 sender
    const sender = this.ctx.tx.getSenderAddress();
    this.ctx.stack.push(bufferToBigInt(sender.buf));
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x33, 'CALLER', 'msgSender = caller')
export class CALLER extends AOpcode {
  async execute() {
    const sender = this.ctx.tx.getSenderAddress();
    this.ctx.stack.push(bufferToBigInt(sender.buf));
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x34, 'CALLVALUE', 'msgValue = callvalue')
export class CALLVALUE extends AOpcode {
  async execute() {
    this.ctx.stack.push(this.ctx.tx.value);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x35, 'CALLDATALOAD', 'calldataWordValue = calldataload(byteOffet)')
export class CALLDATALOAD extends AOpcode {
  async execute() {
    const pos = this.ctx.stack.pop();
    if (pos > this.ctx.codeSize) {
      this.ctx.stack.push(BigInt(0));
      return;
    }
    const i = Number(pos);
    const loaded = this.ctx.code.slice(i, i + 64).padStart(64, '0');
    this.ctx.stack.push(BigInt(add0x(loaded)));
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x36, 'CALLDATASIZE', 'calldataLength = calldatasize')
export class CALLDATASIZE extends AOpcode {
  async execute() {
    this.ctx.stack.push(this.ctx.codeSize);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x37, 'CALLDATACOPY', 'calldatacopy(dstMemoryIndex, dataIndex, length)')
export class CALLDATACOPY extends AOpcode {
  async execute() {
    throw new Error(`[tinyevm] opcode 'CALLDATACOPY(0x37)' not implemented.`);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x38, 'CODESIZE', 'myCodeLength = codesize')
export class CODESIZE extends AOpcode {
  async execute() {
    this.ctx.stack.push(this.ctx.codeSize);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x39, 'CODECOPY', 'codecopy(dstMemoryIndex, codeIndex, length)')
export class CODECOPY extends AOpcode {
  async execute() {
    const [memOffset, codeOffset, dataLength] = this.ctx.stack.popN(3);

    if (dataLength !== BigInt(0)) {
      const data = this.ctx.code.slice(
        Number(codeOffset),
        Number(codeOffset + dataLength)
      );
      const memOffsetNum = Number(memOffset);
      this.ctx.memory.write(memOffsetNum, data);
    }
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x3a, 'GASPRICE', 'txGasPrice = gasprice')
export class GASPRICE extends AOpcode {
  async execute() {
    throw new Error(`[tinyevm] opcode 'GASPRICE(0x3a)' not implemented.`);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x3b, 'EXTCODESIZE', 'otherCodeLength = extcodesize(address)')
export class EXTCODESIZE extends AOpcode {
  async execute() {
    throw new Error(`[tinyevm] opcode 'EXTCODESIZE(0x3b)' not implemented.`);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(
  0x3c,
  'EXTCODECOPY',
  'extcodecopy(address, dstMemoryIndex, extcodeIndex, length)'
)
export class EXTCODECOPY extends AOpcode {
  async execute() {
    throw new Error(`[tinyevm] opcode 'EXTCODECOPY(0x3c)' not implemented.`);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x3d, 'RETURNDATASIZE', 'v = returndatasize')
export class RETURNDATASIZE extends AOpcode {
  async execute() {
    throw new Error(`[tinyevm] opcode 'RETURNDATASIZE(0x3d)' not implemented.`);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(
  0x3e,
  'RETURNDATACOPY',
  'returndatacopy(dstMemoryOffset, returndataIndex, length)'
)
export class RETURNDATACOPY extends AOpcode {
  async execute() {
    throw new Error(`[tinyevm] opcode 'RETURNDATACOPY(0x3e)' not implemented.`);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x3f, 'EXTCODEHASH', 'hash = extcodehash(address)')
export class EXTCODEHASH extends AOpcode {
  async execute() {
    throw new Error(`[tinyevm] opcode 'EXTCODEHASH(0x3f)' not implemented.`);
  }
  async gasUsed() {
    return BigInt(0);
  }
}
