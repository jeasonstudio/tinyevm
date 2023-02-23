import { AOpcode, opcode } from './common';

@opcode(0x20, 'SHA3', 'v = sha3(offset, length)')
export class SHA3 extends AOpcode {
  async execute() {
    throw new Error(`[tinyevm] opcode 'SHA3(0x20)' not implemented.`);
  }
  async gasUsed() {
    return BigInt(0);
  }
}
