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
    readonly gasLimit: bigint
  ) {}
}
