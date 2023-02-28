import { AOpcode, opcode } from './common';

@opcode(0xffff, 'UNIMPLEMENTED')
export class UNIMPLEMENTED extends AOpcode {
  async execute() {
    this.debugOpcode();
    throw new Error(
      `[tinyevm] opcode not not found: '${this.label}(${this.opcode})'`
    );
  }
  async gasUsed() {
    return BigInt(0);
  }
}
