import {
  createAccount,
  createCallTxData,
  createDeployTxData,
  createTx,
  TinyEVM,
} from '../src';

/*
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Counter {
    uint256 public count;

    // Function to get the current count
    function get() public view returns (uint256) {
        return count;
    }

    // Function to increment count by 1
    function inc(uint256 n) public {
        count += n;
    }

    // Function to decrement count by 1
    function dec() public {
        // This function will fail if count = 0
        count -= 1;
    }
}
*/
const contractABI = [
  {
    inputs: [],
    name: 'count',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'dec',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'get',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'n', type: 'uint256' }],
    name: 'inc',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
const contractBytecode =
  '608060405234801561001057600080fd5b50610257806100206000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806306661abd146100515780636d4ce63c1461006f578063812600df1461008d578063b3bcfa82146100a9575b600080fd5b6100596100b3565b6040516100669190610111565b60405180910390f35b6100776100b9565b6040516100849190610111565b60405180910390f35b6100a760048036038101906100a2919061015d565b6100c2565b005b6100b16100dd565b005b60005481565b60008054905090565b806000808282546100d391906101b9565b9250508190555050565b60016000808282546100ef91906101ed565b92505081905550565b6000819050919050565b61010b816100f8565b82525050565b60006020820190506101266000830184610102565b92915050565b600080fd5b61013a816100f8565b811461014557600080fd5b50565b60008135905061015781610131565b92915050565b6000602082840312156101735761017261012c565b5b600061018184828501610148565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006101c4826100f8565b91506101cf836100f8565b92508282019050808211156101e7576101e661018a565b5b92915050565b60006101f8826100f8565b9150610203836100f8565b925082820390508181111561021b5761021a61018a565b5b9291505056fea2646970667358221220268c9c378ef68897c36525bb083e3e167822e276e4f5dcbb347a540ea7f05e6364736f6c63430008130033';

async function main() {
  const tinyevm = new TinyEVM();
  const { privateKey } = createAccount('7777');
  const data = createDeployTxData(contractABI, contractBytecode, []);
  const tx = createTx({ data }).sign(privateKey);

  const result = await tinyevm.runTx(tx);
  const contractCode = result.returnValue;
  const contractAddress = result.to;

  console.log('Deploy Contract:', contractCode.toString('hex'));
  console.log('Contract Address:', contractAddress.toString());
  console.log('storage', result.storage.toString());

  const callTxData = createCallTxData(contractABI, 'inc', [100]);
  console.log('Call contract tx.data:', callTxData);
  const callTx = createTx({ data: callTxData, to: contractAddress }).sign(
    privateKey
  );
  const callResult = await tinyevm.runTx(callTx, {
    async getContractCode() {
      return contractCode;
    },
  });
  console.log('Call Result:', callResult.returnValue.toString('hex'));
  console.log('storage', callResult.storage.toString());

  const callTxData2 = createCallTxData(contractABI, 'get', []);
  console.log('Call contract tx.data2:', callTxData2);
  const callTx2 = createTx({ data: callTxData2, to: contractAddress }).sign(
    privateKey
  );
  const callResult2 = await tinyevm.runTx(callTx2, {
    async getContractCode() {
      return contractCode;
    },
  });
  console.log('Call Result:', callResult2.returnValue.toString('hex'));
  console.log('storage', callResult2.storage.toString());
}

main().catch(console.error);
