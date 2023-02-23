import { TinyEVM } from '../src/tinyevm';
import { Transaction } from '@ethereumjs/tx';
import { BlockHeader } from '@ethereumjs/block';
import { Chain, Common } from '@ethereumjs/common';

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
  const common = new Common({ chain: Chain.Mainnet });
  const blockHeader = BlockHeader.fromHeaderData({}, { common });
  const tinyevm = new TinyEVM({ common, blockHeader });
  const tx = Transaction.fromTxData({ data: bytecode }, { common });
  const { returnValue, executionGasUsed } = await tinyevm.runTx(tx);
  console.log('returnValue', returnValue);
  console.log('executionGasUsed', executionGasUsed.toString());
  // returnValue 00000000000000000000000000000042
}

main().catch(console.error);
