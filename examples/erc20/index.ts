import { Address } from '@ethereumjs/util';
import { generatePrivateKey, TinyEVM } from '../../src';
import abi from './abi';
import bytecode from './bytecode';

const privateKey = generatePrivateKey('7777');
const owner = Address.fromPrivateKey(privateKey);
const user1 = Address.fromPrivateKey(generatePrivateKey('8888'));

async function main() {
  const tinyevm = new TinyEVM();

  const { contractAddress } = await tinyevm.deployContract({
    privateKey,
    abi,
    bytecode,
  });

  console.log('deploy address:', contractAddress.toString());

  const { parsedReturnValue: mintResult } = await tinyevm.callContract({
    privateKey,
    abi,
    method: 'mint',
    methodArgv: [100],
    contractAddress,
  });

  console.log('call mint():', mintResult);

  const { parsedReturnValue: transferResult } = await tinyevm.callContract({
    privateKey,
    abi,
    method: 'transfer',
    methodArgv: [user1.toString(), 30],
    contractAddress,
  });
  console.log('call transfer(user1, 30):', transferResult);

  const { parsedReturnValue: balanceOfResult } = await tinyevm.callContract({
    privateKey,
    abi,
    method: 'balanceOf',
    methodArgv: [owner.toString()],
    contractAddress,
  });
  console.log('call balanceOf(owner):', balanceOfResult);

  const { parsedReturnValue: balanceOfUser1Result } =
    await tinyevm.callContract({
      privateKey,
      abi,
      method: 'balanceOf',
      methodArgv: [user1.toString()],
      contractAddress,
    });
  console.log('call balanceOf(user1):', balanceOfUser1Result);
}

main().catch(console.error);
