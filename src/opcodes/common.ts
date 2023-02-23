import assert from 'assert';
import debug from 'debug';
import type { Context } from '../context';

// 添加一个 Abstract Opcode 用于给被 opcode 装饰的类添加类型保护
export abstract class AOpcode {
  public static readonly opcode: number;
  public static readonly label: string;
  public readonly opcode!: number;
  public readonly label!: string;
  public constructor(
    readonly ctx: Context,
    // offset from operations(bytecode)
    readonly offset: number,
    // stack length
    readonly length: number,
    // push value for opcode
    readonly pushValue?: string
  ) {}
  public abstract execute(): Promise<void>;
  public abstract gasUsed?(): Promise<bigint>;
  protected assert!: typeof assert;
  protected debug!: ReturnType<typeof debug>;
  [key: PropertyKey]: any;
}

// 用于将被装饰的类变成 Opcode
export const opcode = (opcode: number, label: string, doc?: string) => {
  return (constructor: any) => {
    // 上面 AOpcode 的实现
    class WrapperdOpcode extends constructor {
      public static opcode = opcode;
      public static readonly label = label;
      public static readonly doc = doc;
      public static readonly toString = () => {
        const hexOpcode = '0x' + opcode.toString(16).padStart(2, '0');
        return `${label.toUpperCase()}(${hexOpcode})`;
      };
      public static readonly valueOf = () => opcode;
      public readonly opcode = opcode;
      public readonly label = label;
      public constructor(
        readonly ctx: Context,
        readonly offset: number,
        readonly length: number,
        readonly pushValue?: string
      ) {
        super();
      }
      protected debug = debug(`tinyevm:opcodes:${label.toLowerCase()}`);
      protected assert = assert;
      public async execute(ctx: Context) {
        // TODO: before execute
        this.debug(this.toString());
        await super.execute(ctx);
        // TODO: after execute
      }
      public async gasUsed(ctx: Context) {
        // TODO: before gasUsed
        const gas = await super.gasUsed?.(ctx);
        // TODO: after gasUsed
        return gas || BigInt(0);
      }
      public toString() {
        if (!this.pushValue?.length) {
          return this.label.toUpperCase();
        }
        return `${this.label.toUpperCase()} ${this.pushValue}`;
      }
    }
    // 这里不需要返回类型
    return WrapperdOpcode as any;
  };
};

export function mod(a: bigint, b: bigint) {
  let r = a % b;
  if (r < BigInt(0)) {
    r = b + r;
  }
  return r;
}
