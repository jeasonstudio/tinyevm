import {
  createAccount,
  createCallTxData,
  createDeployTxData,
  createTx,
  TinyEVM,
} from '../../src';
import abi from './abi';
import bytecode from './bytecode';

async function main() {
  const tinyevm = new TinyEVM();
  const { privateKey, address } = createAccount('7777');
  const deployTx = createTx({
    data: createDeployTxData(abi, bytecode, []),
  }).sign(privateKey);
  const deployResult = await tinyevm.runTx(deployTx);
  const contractCode = deployResult.returnValue;
  const contractAddress = deployResult.to;

  // console.log('Deploy Contract:', contractCode.toString('hex'));
  console.log('Contract Address:', contractAddress.toString());
  console.log('storage', deployResult.storage.toString());

  const mintTx = createTx({
    data: createCallTxData(abi, 'mint', [100]),
    to: contractAddress,
  }).sign(privateKey);

  const mintResult = await tinyevm.runTx(mintTx, {
    async getContractCode() {
      return contractCode;
    },
  });
  console.log('mint Result:', mintResult.returnValue.toString('hex'));

  const balanceOfTx = createTx({
    data: createCallTxData(abi, 'balanceOf', [address.toString()]),
    to: contractAddress,
  }).sign(privateKey);

  const balanceOfResult = await tinyevm.runTx(balanceOfTx, {
    async getContractCode() {
      return contractCode;
    },
  });
  console.log('balanceOf Result:', balanceOfResult.returnValue.toString('hex'));
}

main().catch(console.error);
