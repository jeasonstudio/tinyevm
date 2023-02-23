import { Transaction } from '@ethereumjs/tx';
import { Account, Address } from '@ethereumjs/util';
import { Memory } from './memory';
import { AOpcode, opcodeLabelMap, UNIMPLEMENTED } from './opcodes';
import { Stack } from './stack';
import * as asm from '@ethersproject/asm';
import { add0x } from './utils';

// export interface RunState {
//   programCounter: number
//   opCode: number
//   memory: Memory
//   memoryWordCount: bigint
//   highestMemCost: bigint
//   stack: Stack
//   returnStack: Stack
//   code: Buffer
//   shouldDoJumpAnalysis: boolean
//   validJumps: Uint8Array // array of values where validJumps[index] has value 0 (default), 1 (jumpdest), 2 (beginsub)
//   eei: EEIInterface
//   env: Env
//   messageGasLimit?: bigint // Cache value from `gas.ts` to save gas limit for a message call
//   interpreter: Interpreter
//   gasRefund: bigint // Tracks the current refund
//   gasLeft: bigint // Current gas left
//   auth?: Address /** EIP-3074 AUTH parameter */
//   returnBuffer: Buffer /* Current bytes in the return buffer. Cleared each time a CALL/CREATE is made in the current frame. */
// }

export interface IContextEEI {
  // getBlockHash(num: bigint): Promise<bigint>;
  storageStore(address: Address, key: string, value: string): Promise<void>;
  storageLoad(
    address: Address,
    key: string,
    original: boolean
  ): Promise<string>;
  // copy(): IContextEEI;
  // addWarmedAddress(address: Buffer): void;
  // isWarmedAddress(address: Buffer): boolean;
  // addWarmedStorage(address: Buffer, slot: Buffer): void;
  // isWarmedStorage(address: Buffer, slot: Buffer): boolean;
  // clearWarmedAccounts(): void;
  // generateAccessList?(
  //   addressesRemoved: Address[],
  //   addressesOnlyStorage: Address[]
  // ): AccessList;
  // clearOriginalStorageCache(): void;
  // cleanupTouchedAccounts(): Promise<void>;
  // generateCanonicalGenesis(initState: any): Promise<void>;
  // accountExists(address: Address): Promise<boolean>;
  getAccount(address: Address): Promise<Account>;
  // putAccount(address: Address, account: Account): Promise<void>;
  // accountIsEmpty(address: Address): Promise<boolean>;
  // deleteAccount(address: Address): Promise<void>;
  // modifyAccountFields(
  //   address: Address,
  //   accountFields: AccountFields
  // ): Promise<void>;
  // putContractCode(address: Address, value: Buffer): Promise<void>;
  // getContractCode(address: Address): Promise<Buffer>;
  // getContractStorage(address: Address, key: Buffer): Promise<Buffer>;
  // putContractStorage(
  //   address: Address,
  //   key: Buffer,
  //   value: Buffer
  // ): Promise<void>;
  // clearContractStorage(address: Address): Promise<void>;
  // checkpoint(): Promise<void>;
  // commit(): Promise<void>;
  // revert(): Promise<void>;
  // getStateRoot(): Promise<Buffer>;
  // setStateRoot(stateRoot: Buffer): Promise<void>;
  // getProof?(address: Address, storageSlots: Buffer[]): Promise<Proof>;
  // verifyProof?(proof: Proof): Promise<boolean>;
  // hasStateRoot(root: Buffer): Promise<boolean>;
}

const storage: Record<PropertyKey, string> = {};

export const defaultEEI: IContextEEI = {
  getAccount: async () => new Account(),
  storageStore: async (address, key, value) => {
    storage[`${address.toString()}_${key}`] = value;
  },
  storageLoad: async (address, key, original) => {
    return storage[`${address.toString()}_${key}`] || '';
  },
};

export class Context {
  // 连续的内存空间 1024
  public memory = new Memory(2 ** 10);
  // 固定大小的栈空间 1024
  public stack = new Stack(2 ** 10);
  // 返回值
  public returnValue: string = '';
  // 已经用过的 gas 数量
  public gasUsed = BigInt(0);
  // 交易
  public readonly tx!: Transaction;
  // code as string
  public readonly code: string = '';
  public readonly codeSize: bigint = BigInt(0);
  // gasLimit in tx
  public readonly gasLimit: bigint = BigInt(Number.MAX_SAFE_INTEGER);
  // opcode list
  public readonly operations: AOpcode[] = [];
  // 程序计数器
  public operationCounter = 0;
  // map(offset => operationIndex)
  public offsetOperationIndexMap: Record<number, number> = {};
  // Ethereum EVM Interface
  public readonly eei!: IContextEEI;

  public constructor(_tx: Transaction, _eei?: Partial<IContextEEI>) {
    this.tx = _tx;
    this.code = _tx.data.toString('hex');
    this.codeSize = BigInt(_tx.data.length);
    this.gasLimit = _tx.gasLimit;
    this.eei = Object.assign({}, defaultEEI, _eei);

    const asmOpcodes = asm.disassemble(_tx.data.toString('hex'));
    const _offsetOperationIndexMap: Record<number, number> = {};
    this.operations = asmOpcodes.map((item, index) => {
      const opcodeLabel = item.opcode.mnemonic;
      const OpcodeFactory = opcodeLabelMap[opcodeLabel] || UNIMPLEMENTED;
      const operation = new OpcodeFactory(
        this,
        item.offset,
        item.length,
        item.pushValue ? BigInt(add0x(item.pushValue)) : undefined
      );
      if (!opcodeLabelMap[opcodeLabel]) {
        operation.label = opcodeLabel;
        operation.opcode = item.opcode.value;
      }
      _offsetOperationIndexMap[item.offset] = index;
      return operation;
    });
    this.offsetOperationIndexMap = _offsetOperationIndexMap;
    // console.log(this.codeSize, _offsetOperationIndexMap);
  }
}
