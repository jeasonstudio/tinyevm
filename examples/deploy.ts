import { createDeployContractTx, TinyEVM } from '../src';

/*
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Token {
  uint256 public totalSuply;
  constructor(uint256 _totalSuply) {
    totalSuply = _totalSuply;
  }
}
*/
const contractABI = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_totalSuply',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'totalSuply',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

const contractBytecode =
  '0x608060405234801561001057600080fd5b5060405161015f38038061015f83398181016040528101906100329190610054565b806000819055505061009e565b60008151905061004e81610087565b92915050565b60006020828403121561006657600080fd5b60006100748482850161003f565b91505092915050565b6000819050919050565b6100908161007d565b811461009b57600080fd5b50565b60b3806100ac6000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c8063a2a9679914602d575b600080fd5b60336047565b604051603e9190605a565b60405180910390f35b60005481565b6054816073565b82525050565b6000602082019050606d6000830184604d565b92915050565b600081905091905056fea2646970667358221220616ba67169b8375cb070e76a35371c7b36d9a6a0b7e8c04cfd91f1a74bd5849f64736f6c63430008040033';

async function main() {
  const tinyevm = new TinyEVM();
  const tx = createDeployContractTx(contractABI, contractBytecode, [
    1000_000, // TotalSupply
  ]);
  console.log('tx.data', tx.data.toString('hex'));
  const result = await tinyevm.runTx(tx);
  console.log('returnValue', result.returnValue);
  console.log('executionGasUsed', result.executionGasUsed.toString());
}

main().catch(console.error);
