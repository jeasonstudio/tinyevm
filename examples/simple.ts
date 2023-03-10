import { createTx, TinyEVM } from '../src';

/*
  PUSH1 0x42
  PUSH1 0
  MSTORE
  PUSH1 32
  PUSH1 0
  RETURN
*/
const bytecode = '0x604260005260206000F3';

async function main() {
  const tinyevm = new TinyEVM();
  const tx = createTx({ data: bytecode });

  const result = await tinyevm.runTx(tx);
  console.log('returnValue', result.returnValue.toString('hex'));
  // returnValue 00000000000000000000000000000042
  console.log('executionGasUsed', result.executionGasUsed.toString());
}

main().catch(console.error);
