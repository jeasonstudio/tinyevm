import { AOpcode, opcode } from './common';

@opcode(0xffff, 'UNIMPLEMENTED')
export class UNIMPLEMENTED extends AOpcode {
  async execute() {
    throw new Error(`[tinyevm] opcode not not found: ${this.opcode}}`);
  }
  async gasUsed() {
    return BigInt(0);
  }
}
