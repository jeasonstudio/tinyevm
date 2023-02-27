import assert from 'assert';
import debug from 'debug';
import type { Context } from '../context';

// 添加一个 Abstract Opcode 用于给被 opcode 装饰的类添加类型保护
export abstract class AOpcode {
  public static opcode: number;
  public static label: string;
  public opcode!: number;
  public label!: string;
  public constructor(
    readonly ctx: Context,
    // offset from operations(bytecode)
    readonly offset: number
  ) {}
  public abstract execute(): Promise<void>;
  public abstract gasUsed?(): Promise<bigint>;
  public assert!: typeof assert;
  public debug!: ReturnType<typeof debug>;
  [key: PropertyKey]: any;
}

export class BaseOpcode extends AOpcode {
  public async execute() {}
  public async gasUsed() {
    return BigInt(0);
  }
}

export type Opcode = typeof BaseOpcode;

// 用于将被装饰的类变成 Opcode
export const opcode = (opcode: number, label: string, doc?: string) => {
  return (constructor: any) => {
    // 上面 AOpcode 的实现
    class WrapperdOpcode extends constructor {
      public static opcode = opcode;
      public static label = label;
      public static readonly doc = doc;
      public static readonly toString = () => {
        const hexOpcode = '0x' + opcode.toString(16).padStart(2, '0');
        return `${label.toUpperCase()}(${hexOpcode})`;
      };
      public static readonly valueOf = () => opcode;
      public opcode = opcode;
      public label = label;
      public constructor(readonly ctx: Context, readonly offset: number) {
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
        return this.label.toUpperCase();
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
