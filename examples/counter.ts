import { createAccount, createDeployTxData, createTx, TinyEVM } from '../src';

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
    function inc() public {
        count += 1;
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
    inputs: [],
    name: 'inc',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
const contractBytecode =
  '608060405234801561001057600080fd5b506101e7806100206000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806306661abd14610051578063371303c01461006f5780636d4ce63c14610079578063b3bcfa8214610097575b600080fd5b6100596100a1565b60405161006691906100ff565b60405180910390f35b6100776100a7565b005b6100816100c2565b60405161008e91906100ff565b60405180910390f35b61009f6100cb565b005b60005481565b60016000808282546100b99190610149565b92505081905550565b60008054905090565b60016000808282546100dd919061017d565b92505081905550565b6000819050919050565b6100f9816100e6565b82525050565b600060208201905061011460008301846100f0565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610154826100e6565b915061015f836100e6565b92508282019050808211156101775761017661011a565b5b92915050565b6000610188826100e6565b9150610193836100e6565b92508282039050818111156101ab576101aa61011a565b5b9291505056fea264697066735822122043d469ae4c6ac674fc273fb1f63b9683bbf875977edf45a9b4456e56d3b231d064736f6c63430008130033';

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
  // TODO: call method
  // console.log('memory', result.context.memory.toString());
  // console.log('storage', result.storage.toString());
}

main().catch(console.error);
