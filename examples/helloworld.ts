import { createTx, TinyEVM, opcodeLabelMap, opcode2bytecode } from '../src';

const { PUSH1, PUSH10, MSTORE, RETURN } = opcodeLabelMap;

// prettier-ignore
const bytecode = opcode2bytecode([
  PUSH10, '0x48656c6c6f576f726c64', // store string: HelloWorld
  PUSH1, '0x00',                    // offset: 0
  MSTORE,
  PUSH1, '0x0a',                    // return length: 10
  PUSH1, '0x16',                    // return offset: 22
  RETURN,
]);
// Bytecode: 0x6948656c6c6f576f726c64600052600a6016f3

async function main() {
  const tinyevm = new TinyEVM();
  const tx = createTx({ data: bytecode });

  const result = await tinyevm.runTx(tx);
  console.log('returnValue', result.returnValue.toString('utf-8'));
  // returnValue HelloWorld
}

main().catch(console.error);
