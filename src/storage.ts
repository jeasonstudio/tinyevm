import { Address } from '@ethereumjs/util';
import assert from 'assert';

export interface IStorage {
  // get value from storage
  get(addr: Address, key: Buffer): Buffer;
  // set value to storage
  put(addr: Address, key: Buffer, value: Buffer): void;
  // clear storage
  clear(): void;

  // TinyEVM 不实现复杂功能
  // commit(): void;
  // checkpoint(): void;
  // revert(): void;
  // toJSON(): { [address: string]: { [key: string]: string } };
}

export class Storage implements IStorage {
  // mapping(addressString => mapping(keyString => valueBuffer))
  private _storage = new Map<string, Map<string, Buffer>>();

  public get(addr: Address, key: Buffer): Buffer {
    const map = this._storage.get(addr.toString());
    if (!map) return Buffer.alloc(32);
    const value = map.get(key.toString('hex'));
    if (!value) return Buffer.alloc(32);
    return value;
  }

  public put(addr: Address, key: Buffer, value: Buffer) {
    assert(key.length === 32, '[tinyevm] storage key must be 32 bytes long');
    assert(
      value.length <= 32,
      '[tinyevm] storage value cannot be longer than 32 bytes'
    );

    const addrString = addr.toString();
    // 如果没有这个地址，就创建一个 Map
    if (!this._storage.has(addrString)) {
      this._storage.set(addrString, new Map<string, Buffer>());
    }
    const map = this._storage.get(addrString)!;
    const keyStr = key.toString('hex');
    map.set(keyStr, value);
  }

  public clear(): void {
    this._storage = new Map();
  }
}
