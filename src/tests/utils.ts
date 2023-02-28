import { Opcode } from '../opcodes';
import { TinyEVM } from '../tinyevm';
import { opcode2bytecode, createTx } from '../utils';

// prettier-ignore
export const createOpcodes = (opcodes: Array<string | Opcode>) => opcodes;

export const runOpcodes = async (opcodes: Array<string | Opcode>) => {
  const bytecode = opcode2bytecode(opcodes);
  const tinyevm = new TinyEVM();
  const tx = createTx({ data: bytecode });
  const result = await tinyevm.runTx(tx);

  return {
    returnValue: result.returnValue,
    stack: result.context.stack,
    memory: result.context.memory,
    // storage: result.context.storage,
    gas: result.executionGasUsed,
  };
};

export * from '../opcodes/opcodes';
