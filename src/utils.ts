import { Transaction, TxData } from '@ethereumjs/tx';
import { Account, Address, privateToPublic } from '@ethereumjs/util';
import { Interface } from '@ethersproject/abi';
import assert from 'assert';
import { Opcode } from './opcodes';

const debug = require('debug')('tinyevm:utils');

export const cut0x = (str: string) =>
  str.startsWith('0x') ? str.slice(2) : str;
export const add0x = (str: string) => (str.startsWith('0x') ? str : `0x${str}`);

/**
 * 构造一笔交易
 */
export const createTx = (txData?: TxData) => {
  let tx = Transaction.fromTxData({
    nonce: BigInt(1),
    gasLimit: BigInt(Number.MAX_SAFE_INTEGER),
    ...txData,
  });
  return tx;
};

/**
 * 构造一笔合约部署的交易 data
 * @param abi 合约的 abi
 * @param bytecode 合约的字节码
 * @param deployArgv 部署参数，需要跟 abi 能够对应上
 */
export const createDeployTxData = (
  abi: any[],
  bytecode: string,
  deployArgv: any[]
) => {
  const contract = new Interface(abi);
  const params = contract.encodeDeploy(deployArgv);
  const deployData = Buffer.concat([
    Buffer.from(cut0x(bytecode), 'hex'),
    Buffer.from(cut0x(params), 'hex'),
  ]);
  return deployData;
};

export const opcode2bytecode = (opcodes: Array<string | Opcode>) => {
  let bytecode = '';
  for (const opcode of opcodes) {
    if (typeof opcode === 'string') {
      assert(
        opcode.length % 2 === 0 && opcode.startsWith('0x'),
        `[tinyevm] invalid value: ${opcode}`
      );
      bytecode += cut0x(opcode);
    } else if (opcode.opcode !== undefined) {
      bytecode += opcode.opcode.toString(16).padStart(2, '0');
    } else {
      assert(false, `[tinyevm] invalid opcodes: ${opcode}`);
    }
  }
  return add0x(bytecode);
};

export const createAccount = (key?: string | number) => {
  const privateKey = Buffer.from(String(key ?? '').padStart(64, '0'), 'hex');
  const publicKey = privateToPublic(privateKey);
  debug('createAccount publicKey:', publicKey.toString('hex'));
  debug('createAccount privateKey:', privateKey.toString('hex'));
  const address = Address.fromPrivateKey(privateKey);
  debug('createAccount address:', address.toString());
  const account = Account.fromAccountData({
    nonce: BigInt(1),
    balance: BigInt(0),
  });
  return { publicKey, privateKey, address, account };
};
