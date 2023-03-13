import {
  Address,
  bigIntToBuffer,
  bufferToBigInt,
  setLengthLeft,
} from '@ethereumjs/util';
import { AOpcode, opcode } from './common';

const MASK_160 = (BigInt(1) << BigInt(160)) - BigInt(1);

function addressToBuffer(address: bigint | Buffer) {
  if (Buffer.isBuffer(address)) return address;
  return setLengthLeft(bigIntToBuffer(address & MASK_160), 20);
}

function getDataSlice(data: Buffer, offset: bigint, length: bigint): Buffer {
  const len = BigInt(data.length);
  if (offset > len) {
    offset = len;
  }

  let end = offset + length;
  if (end > len) {
    end = len;
  }

  data = data.subarray(Number(offset), Number(end));
  // Right-pad with zeros to fill dataLength bytes
  data = setLengthLeft(data, Number(length));

  return data;
}

@opcode(0x30, 'ADDRESS', 'myAddr = address')
export class ADDRESS extends AOpcode {
  async execute() {
    const address = this.ctx.to ?? Address.zero();
    this.ctx.stack.push(bufferToBigInt(address.buf));
    this.debugOpcode();
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
    this.debugOpcode(addressBigInt);
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
    this.debugOpcode();
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
    this.debugOpcode();
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x34, 'CALLVALUE', 'msgValue = callvalue')
export class CALLVALUE extends AOpcode {
  async execute() {
    this.ctx.stack.push(this.ctx.tx.value);
    this.debugOpcode();
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x35, 'CALLDATALOAD', 'calldataWordValue = calldataload(byteOffet)')
export class CALLDATALOAD extends AOpcode {
  async execute() {
    const pos = this.ctx.stack.pop();
    if (pos > this.ctx.data.length) {
      this.ctx.stack.push(BigInt(0));
    } else {
      const i = Number(pos);
      let loaded = this.ctx.data.subarray(i, i + 32);
      loaded = loaded.length ? loaded : Buffer.from([0]);
      let r = bufferToBigInt(loaded);
      if (loaded.length < 32) {
        r = r << (BigInt(8) * BigInt(32 - loaded.length));
      }
      this.ctx.stack.push(r);
    }
    this.debugOpcode(pos);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x36, 'CALLDATASIZE', 'calldataLength = calldatasize')
export class CALLDATASIZE extends AOpcode {
  async execute() {
    this.ctx.stack.push(BigInt(this.ctx.data.length));
    this.debugOpcode();
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x37, 'CALLDATACOPY', 'calldatacopy(dstMemoryIndex, dataIndex, length)')
export class CALLDATACOPY extends AOpcode {
  async execute() {
    const [memOffset, dataOffset, dataLength] = this.ctx.stack.popN(3);

    if (dataLength !== BigInt(0)) {
      const data = getDataSlice(this.ctx.data, dataOffset, dataLength);
      const memOffsetNum = Number(memOffset);
      const dataLengthNum = Number(dataLength);
      this.ctx.memory.write(memOffsetNum, dataLengthNum, data);
    }
    this.debugOpcode(memOffset, dataOffset, dataLength);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x38, 'CODESIZE', 'myCodeLength = codesize')
export class CODESIZE extends AOpcode {
  async execute() {
    this.ctx.stack.push(BigInt(this.ctx.code.length));
    this.debugOpcode();
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
      const data = getDataSlice(this.ctx.code, codeOffset, dataLength);
      const memOffsetNum = Number(memOffset);
      const lengthNum = Number(dataLength);
      this.ctx.memory.write(memOffsetNum, lengthNum, data);
    }
    this.debugOpcode(memOffset, codeOffset, dataLength);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x3a, 'GASPRICE', 'txGasPrice = gasprice')
export class GASPRICE extends AOpcode {
  async execute() {
    this.ctx.stack.push(this.ctx.tx.gasPrice);
    this.debugOpcode();
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x3b, 'EXTCODESIZE', 'otherCodeLength = extcodesize(address)')
export class EXTCODESIZE extends AOpcode {
  async execute() {
    const addressBigInt = this.ctx.stack.pop();
    const size = BigInt(
      (
        await this.ctx.eei.getContractCode(
          new Address(addressToBuffer(addressBigInt))
        )
      ).length
    );
    this.ctx.stack.push(size);
    this.debugOpcode(addressBigInt);
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
    const [addressBigInt, memOffset, codeOffset, dataLength] =
      this.ctx.stack.popN(4);

    if (dataLength !== BigInt(0)) {
      const code = await this.ctx.eei.getContractCode(
        new Address(addressToBuffer(addressBigInt))
      );

      const data = getDataSlice(code, codeOffset, dataLength);
      const memOffsetNum = Number(memOffset);
      const lengthNum = Number(dataLength);
      this.ctx.memory.write(memOffsetNum, lengthNum, data);
    }

    this.debugOpcode(addressBigInt, memOffset, codeOffset, dataLength);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x3d, 'RETURNDATASIZE', 'v = returndatasize')
export class RETURNDATASIZE extends AOpcode {
  async execute() {
    this.ctx.stack.push(BigInt(this.ctx.returnValue.length));
    this.debugOpcode();
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
    const [memOffset, returnDataOffset, dataLength] = this.ctx.stack.popN(3);

    if (dataLength !== BigInt(0)) {
      const data = getDataSlice(
        this.ctx.returnValue,
        returnDataOffset,
        dataLength
      );
      const memOffsetNum = Number(memOffset);
      const lengthNum = Number(dataLength);
      this.ctx.memory.write(memOffsetNum, lengthNum, data);
    }
    this.debugOpcode(memOffset, returnDataOffset, dataLength);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0x3f, 'EXTCODEHASH', 'hash = extcodehash(address)')
export class EXTCODEHASH extends AOpcode {
  async execute() {
    const addressBigInt = this.ctx.stack.pop();
    const address = new Address(addressToBuffer(addressBigInt));
    const account = await this.ctx.eei.getAccount(address);
    if (account.isEmpty()) {
      this.ctx.stack.push(BigInt(0));
      return;
    }

    this.ctx.stack.push(BigInt('0x' + account.codeHash.toString('hex')));
    this.debugOpcode(addressBigInt);
  }
  async gasUsed() {
    return BigInt(0);
  }
}
