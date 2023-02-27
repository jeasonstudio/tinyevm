import { AOpcode, opcode } from './common';

const commonExecuteLog = async (self: AOpcode) => {
  const [memOffset, memLength] = self.ctx.stack.popN(2);
  console.log('[tinyevm] LOG', memOffset, memLength);

  // const topicsCount = runState.opCode - 0xa0;

  // const topics = runState.stack.popN(topicsCount);
  // const topicsBuf = topics.map(function (a: bigint) {
  //   return setLengthLeft(bigIntToBuffer(a), 32);
  // });

  // let mem = Buffer.alloc(0);
  // if (memLength !== BigInt(0)) {
  //   mem = runState.memory.read(Number(memOffset), Number(memLength));
  // }

  // runState.interpreter.log(mem, topicsCount, topicsBuf);
};

@opcode(0xa0, 'LOG0')
export class LOG0 extends AOpcode {
  async execute() {
    await commonExecuteLog(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0xa1, 'LOG1')
export class LOG1 extends AOpcode {
  async execute() {
    await commonExecuteLog(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0xa2, 'LOG2')
export class LOG2 extends AOpcode {
  async execute() {
    await commonExecuteLog(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0xa3, 'LOG3')
export class LOG3 extends AOpcode {
  async execute() {
    await commonExecuteLog(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}

@opcode(0xa4, 'LOG4')
export class LOG4 extends AOpcode {
  async execute() {
    await commonExecuteLog(this);
  }
  async gasUsed() {
    return BigInt(0);
  }
}
