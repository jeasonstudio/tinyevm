import { AOpcode, opcode } from './common';

@opcode(0x40, 'BLOCKHASH', 'hash = blockhash(blockNumber)')
export class BLOCKHASH extends AOpcode {
  async execute() {
    this.debugOpcode();
    throw new Error(`[tinyevm] opcode 'BLOCKHASH(0x40)' not implemented.`);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x41, 'COINBASE', 'miner = coinbase')
export class COINBASE extends AOpcode {
  async execute() {
    this.debugOpcode();
    throw new Error(`[tinyevm] opcode 'COINBASE(0x41)' not implemented.`);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x42, 'TIMESTAMP', 'now = timestamp')
export class TIMESTAMP extends AOpcode {
  async execute() {
    this.debugOpcode();
    throw new Error(`[tinyevm] opcode 'TIMESTAMP(0x42)' not implemented.`);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x43, 'NUMBER', 'blockNumber = number')
export class NUMBER extends AOpcode {
  async execute() {
    this.debugOpcode();
    throw new Error(`[tinyevm] opcode 'NUMBER(0x43)' not implemented.`);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x44, 'DIFFICULTY', 'diff = difficulty')
export class DIFFICULTY extends AOpcode {
  async execute() {
    this.debugOpcode();
    throw new Error(`[tinyevm] opcode 'DIFFICULTY(0x44)' not implemented.`);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x45, 'GASLIMIT', 'gas = gaslimit')
export class GASLIMIT extends AOpcode {
  async execute() {
    this.debugOpcode();
    throw new Error(`[tinyevm] opcode 'GASLIMIT(0x45)' not implemented.`);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x46, 'CHAINID', 'chainid = chainid')
export class CHAINID extends AOpcode {
  async execute() {
    this.debugOpcode();
    throw new Error(`[tinyevm] opcode 'CHAINID(0x46)' not implemented.`);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x47, 'SELFBALANCE', 'bal = selfbalance')
export class SELFBALANCE extends AOpcode {
  async execute() {
    this.debugOpcode();
    throw new Error(`[tinyevm] opcode 'SELFBALANCE(0x47)' not implemented.`);
  }
  async gasUsed() {
    return BigInt(0);
  }
}
