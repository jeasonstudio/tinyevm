import { createCallTxData } from '../src';

const tx = createCallTxData(
  [
    {
      inputs: [],
      name: 'count',
      outputs: [{ internalType: 'uint32', name: '', type: 'uint32' }],
      stateMutability: 'pure',
      type: 'function',
    },
  ],
  'count',
  []
);

console.log(tx.toString());
