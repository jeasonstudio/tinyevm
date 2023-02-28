import assert from 'assert';

const ceil = (value: number, ceiling: number): number => {
  const r = value % ceiling;
  if (r === 0) {
    return value;
  } else {
    return value + ceiling - r;
  }
};

const CONTAINER_SIZE = 8192;

// TinyEVM - Tiny Ethereum Virtual Machine Memory Implementation
export class Memory {
  // 使用 Buffer 来模拟内存空间
  private _store: Buffer = Buffer.alloc(0);
  // 初始化内存空间
  public constructor(size?: number) {
    this._store = Buffer.alloc(size || 0);
  }
  // 扩展内存空间
  public extend(offset: number, size: number) {
    if (size === 0) return;
    const newSize = ceil(offset + size, 32);
    const sizeDiff = newSize - this._store.length;
    if (sizeDiff <= 0) return;
    this._store = Buffer.concat([
      this._store,
      Buffer.alloc(Math.ceil(sizeDiff / CONTAINER_SIZE) * CONTAINER_SIZE),
    ]);
  }
  // 获取内存空间的长度
  public get length() {
    return this._store.length;
  }
  // 写入数据
  public write(offset: number, size: number, value: Buffer) {
    if (size === 0) return;
    this.extend(offset, size);

    assert(value.length === size, '[tinyevm] Invalid value size');
    assert(
      offset + size <= this._store.length,
      '[tinyevm] Value exceeds memory capacity'
    );
    value.copy(this._store, offset);
  }
  // 读取数据
  read(offset: number, size: number): Buffer {
    this.extend(offset, size);
    const returnBuffer = Buffer.allocUnsafe(size);

    const loaded = Buffer.from(this._store.subarray(offset, offset + size));
    returnBuffer.fill(loaded, 0, loaded.length);

    if (loaded.length < size) {
      // fill the remaining part of the Buffer with zeros
      returnBuffer.fill(0, loaded.length, size);
    }

    return returnBuffer;
  }
  public toString() {
    return this._store.toString('hex');
  }
}
