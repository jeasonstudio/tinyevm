import { createAccount, createDeployTxData, createTx, TinyEVM } from '../src';

/*
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Blank {}
*/
const contractABI: any[] = [];

const contractBytecode =
  '6080604052348015600f57600080fd5b50603f80601d6000396000f3fe6080604052600080fdfea2646970667358221220658da5dce50773042b45b1f807fe23504db02262f4745a58fcfac29e7a0ca58964736f6c63430008130033';

async function main() {
  const tinyevm = new TinyEVM();

  const { privateKey } = createAccount('7777');
  const data = createDeployTxData(contractABI, contractBytecode, []);
  const tx = createTx({ data }).sign(privateKey);

  const result = await tinyevm.runTx(tx);
  console.log('returnValue', result.returnValue.toString('hex'));
  console.log('executionGasUsed', result.executionGasUsed.toString());
}

main().catch(console.error);
