// TinyEVM - Tiny Ethereum Virtual Machine Memory Implementation
export class Memory {
  // 使用一段字符串来模拟内存空间
  private prevStore: string = '';
  private store: string = '';
  // 初始化内存空间
  public constructor(size?: number) {
    this.extend(size ?? 2 ** 10);
  }
  // 扩展内存空间
  public extend(size: number) {
    this.prevStore = this.store;
    this.store = this.store.padEnd(size, '0');
  }
  // 获取内存空间的长度
  public get length() {
    return this.store.length;
  }
  public get prevLength() {
    return this.prevStore.length;
  }
  // 写入数据
  public write(offset: number, value: string) {
    this.prevStore = this.store;
    this.store =
      this.store.slice(0, offset) +
      value +
      this.store.slice(offset + value.length);
  }
  // 读取数据
  public read(offset: number, size: number): string {
    return this.store.slice(offset, offset + size);
  }
  public toString() {
    return this.store;
  }
}
