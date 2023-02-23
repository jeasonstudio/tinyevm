import { AOpcode, opcode } from './common';

@opcode(0x30, 'ADDRESS', 'myAddr = address')
export class ADDRESS extends AOpcode {
  async execute() {
    throw new Error(`[tinyevm] opcode 'ADDRESS(0x30)' not implemented.`);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x31, 'BALANCE', 'wei = balance(address)')
export class BALANCE extends AOpcode {
  async execute() {
    throw new Error(`[tinyevm] opcode 'BALANCE(0x31)' not implemented.`);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x32, 'ORIGIN', 'txOrigin = origin')
export class ORIGIN extends AOpcode {
  async execute() {
    throw new Error(`[tinyevm] opcode 'ORIGIN(0x32)' not implemented.`);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x33, 'CALLER', 'msgSender = caller')
export class CALLER extends AOpcode {
  async execute() {
    throw new Error(`[tinyevm] opcode 'CALLER(0x33)' not implemented.`);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x34, 'CALLVALUE', 'msgValue = callvalue')
export class CALLVALUE extends AOpcode {
  async execute() {
    throw new Error(`[tinyevm] opcode 'CALLVALUE(0x34)' not implemented.`);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x35, 'CALLDATALOAD', 'calldataWordValue = calldataload(byteOffet)')
export class CALLDATALOAD extends AOpcode {
  async execute() {
    throw new Error(`[tinyevm] opcode 'CALLDATALOAD(0x35)' not implemented.`);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x36, 'CALLDATASIZE', 'calldataLength = calldatasize')
export class CALLDATASIZE extends AOpcode {
  async execute() {
    throw new Error(`[tinyevm] opcode 'CALLDATASIZE(0x36)' not implemented.`);
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
    throw new Error(`[tinyevm] opcode 'CODESIZE(0x38)' not implemented.`);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x39, 'CODECOPY', 'codecopy(dstMemoryIndex, codeIndex, length)')
export class CODECOPY extends AOpcode {
  async execute() {
    throw new Error(`[tinyevm] opcode 'CODECOPY(0x39)' not implemented.`);
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
