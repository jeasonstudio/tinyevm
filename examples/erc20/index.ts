import { Address } from '@ethereumjs/util';
import { generatePrivateKey, TinyEVM } from '../../src';
import abi from './abi';
import bytecode from './bytecode';

const privateKey = generatePrivateKey('01');
const owner = Address.fromPrivateKey(privateKey);
const user1 = Address.fromPrivateKey(generatePrivateKey('02'));

async function main() {
  const tinyevm = new TinyEVM();
  const deployParams = { privateKey, abi, bytecode };

  const { contractAddress } = await tinyevm.deployContract(deployParams);
  console.log('contract address:', contractAddress.toString());

  const callParams = { privateKey, abi, contractAddress };
  // Mint 100 Token
  await tinyevm.callContract({
    ...callParams,
    method: 'mint',
    methodArgv: [100],
  });
  // transfer 30 Token to user1
  const { parsedReturnValue: transferResult } = await tinyevm.callContract({
    ...callParams,
    method: 'transfer',
    methodArgv: [user1.toString(), 30],
  });
  console.log('call transfer(user1, 30):', transferResult); // => [true]

  // Balance Of Owner
  const { parsedReturnValue: balanceOfResult } = await tinyevm.callContract({
    ...callParams,
    method: 'balanceOf',
    methodArgv: [owner.toString()],
  });
  console.log('call balanceOf(owner):', balanceOfResult); // => [0x46]

  // Balance Of User1
  const { parsedReturnValue: balanceOfUser1Result } =
    await tinyevm.callContract({
      ...callParams,
      method: 'balanceOf',
      methodArgv: [user1.toString()],
    });
  console.log('call balanceOf(user1):', balanceOfUser1Result); // => [0x1e]
}

main().catch(console.error);
