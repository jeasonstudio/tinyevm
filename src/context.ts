import { Account, Address } from '@ethereumjs/util';
import { Memory } from './memory';
import { Stack } from './stack';

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
  getBlockHash(num: bigint): Promise<bigint>;
  storageStore(address: Address, key: Buffer, value: Buffer): Promise<void>;
  storageLoad(
    address: Address,
    key: Buffer,
    original: boolean
  ): Promise<Buffer>;
  // copy(): IContextEEI;
  addWarmedAddress(address: Buffer): void;
  isWarmedAddress(address: Buffer): boolean;
  addWarmedStorage(address: Buffer, slot: Buffer): void;
  isWarmedStorage(address: Buffer, slot: Buffer): boolean;
  clearWarmedAccounts(): void;
  // generateAccessList?(
  //   addressesRemoved: Address[],
  //   addressesOnlyStorage: Address[]
  // ): AccessList;
  clearOriginalStorageCache(): void;
  cleanupTouchedAccounts(): Promise<void>;
  generateCanonicalGenesis(initState: any): Promise<void>;
  accountExists(address: Address): Promise<boolean>;
  getAccount(address: Address): Promise<Account>;
  putAccount(address: Address, account: Account): Promise<void>;
  accountIsEmpty(address: Address): Promise<boolean>;
  deleteAccount(address: Address): Promise<void>;
  // modifyAccountFields(
  //   address: Address,
  //   accountFields: AccountFields
  // ): Promise<void>;
  putContractCode(address: Address, value: Buffer): Promise<void>;
  getContractCode(address: Address): Promise<Buffer>;
  getContractStorage(address: Address, key: Buffer): Promise<Buffer>;
  putContractStorage(
    address: Address,
    key: Buffer,
    value: Buffer
  ): Promise<void>;
  clearContractStorage(address: Address): Promise<void>;
  checkpoint(): Promise<void>;
  commit(): Promise<void>;
  revert(): Promise<void>;
  getStateRoot(): Promise<Buffer>;
  setStateRoot(stateRoot: Buffer): Promise<void>;
  // getProof?(address: Address, storageSlots: Buffer[]): Promise<Proof>;
  // verifyProof?(proof: Proof): Promise<boolean>;
  hasStateRoot(root: Buffer): Promise<boolean>;
}

export class Context {
  // 连续的内存空间 1024
  public memory = new Memory(2 ** 10);
  // 固定大小的栈空间 1024
  public stack = new Stack(2 ** 10);
  // 返回值
  public returnValue: string = '';
  // 已经用过的 gas 数量
  public gasUsed = BigInt(0);

  public constructor(
    // code as string
    readonly code: string = '',
    // gasLimit in tx
    readonly gasLimit: bigint,
    readonly eei: Partial<IContextEEI>
  ) {}
}
