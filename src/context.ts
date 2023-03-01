import { Transaction } from '@ethereumjs/tx';
import {
  Account,
  Address,
  bigIntToBuffer,
  generateAddress,
} from '@ethereumjs/util';
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
  // getBlockHash(num: bigint): Promise<bigint>;
  storageStore(address: Address, key: Buffer, value: Buffer): Promise<void>;
  storageLoad(
    address: Address,
    key: Buffer,
    original: boolean
  ): Promise<Buffer>;
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
  getContractCode(address: Address): Promise<Buffer>;
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

export const defaultEEI: Partial<IContextEEI> = {
  getAccount: async () => new Account(),
  getContractCode: async () => Buffer.alloc(0),
};

export type Log = [address: Buffer, topics: Buffer[], data: Buffer];

export class Context {
  // tx.to
  public to: Address = Address.zero();
  // 程序计数器
  public programCounter: number = 0;
  // 连续的内存空间
  public memory = new Memory();
  // 固定大小的栈空间
  public stack = new Stack();
  // 返回值
  public returnValue: Buffer = Buffer.alloc(0);
  // Log
  public logs: Log[] = [];
  // 已经用过的 gas 数量
  public gasUsed = BigInt(0);
  // 交易
  public readonly tx!: Transaction;
  // data
  public data: Buffer = Buffer.from([0]);
  // code
  public code: Buffer = Buffer.alloc(0);
  // gasLimit in tx
  public readonly gasLimit: bigint = BigInt(Number.MAX_SAFE_INTEGER);
  // Ethereum EVM Interface
  public readonly eei!: IContextEEI;

  // 构造函数
  public constructor(_tx: Transaction, _eei?: Partial<IContextEEI>) {
    this.tx = _tx;
    this.gasLimit = _tx.gasLimit;
    if (_tx.to) {
      // tx.to 存在代表是一个合约调用
      // TODO: not implemented
      this.to = _tx.to;
      this.data = _tx.data;
    } else {
      // tx.to 不存在代表是一个合约部署
      this.code = _tx.data;
      this.data = Buffer.alloc(0);
    }

    this.eei = Object.assign({}, defaultEEI, _eei) as IContextEEI;
  }

  public async prepare() {
    await this.prepareToAddress();
    await this.prepareCode();
  }

  private async prepareCode() {
    if (!this.to.isZero()) {
      const code = await this.eei.getContractCode(this.to);
      if (code.length) {
        this.code = code;
      }
    }
  }

  private async prepareToAddress() {
    if (!this.to.isZero()) return;
    const sender = this.tx.getSenderAddress();
    const addr = generateAddress(sender.buf, bigIntToBuffer(this.tx.nonce));
    this.to = new Address(addr);
  }
}
