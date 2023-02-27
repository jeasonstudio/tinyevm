import { AOpcode, opcode } from './common';
import { keccak256 } from 'ethereum-cryptography/keccak';
import { bytesToHex } from 'ethereum-cryptography/utils';

@opcode(0x20, 'SHA3', 'v = sha3(offset, length)')
export class SHA3 extends AOpcode {
  async execute() {
    const [offset, length] = this.ctx.stack.popN(2);
    let data = Buffer.alloc(0);
    if (length !== BigInt(0)) {
      data = this.ctx.memory.read(Number(offset), Number(length));
    }
    const r = BigInt('0x' + bytesToHex(keccak256(data)));
    this.ctx.stack.push(r);
  }
  async gasUsed() {
    return BigInt(0);
  }
}
