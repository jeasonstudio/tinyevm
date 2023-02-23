import { Transaction, TxData } from '@ethereumjs/tx';
import { AbiCoder, Interface, defaultAbiCoder } from '@ethersproject/abi';

/**
 * 构造一笔交易
 */
export const createTx = Transaction.fromTxData;

/**
 * 构造一笔合约部署的交易
 * @param abi 合约的 abi
 * @param bytecode 合约的字节码
 * @param deployArgv 部署参数，需要跟 abi 能够对应上
 * @param tx 交易的其他参数
 */
export const createDeployContractTx = (
  abi: any[],
  bytecode: string,
  deployArgv: any[],
  tx?: TxData
) => {
  const contract = new Interface(abi);
  const params = contract.encodeDeploy(deployArgv);
  console.log('params', params);
  const deployData = Buffer.concat([
    Buffer.from(bytecode, 'hex'),
    Buffer.from(params, 'hex'),
  ]);
  return createTx({ ...tx, data: deployData });
};

// TODO
export const createRunContractTx = () => {};
