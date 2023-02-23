import { AOpcode, opcode } from './common';

@opcode(0xffff, 'UNIMPLEMENTED')
export class UNIMPLEMENTED extends AOpcode {
  async execute() {
    console.warn(
      `[tinyevm] opcode not not found: '${this.label}(${this.opcode})'`
    );
  }
  async gasUsed() {
    return BigInt(0);
  }
}
