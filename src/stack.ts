import assert from 'assert';
import { MAX_INTEGER_BIGINT } from '@ethereumjs/util';

// 一个简单的 Stack 结构
export class Stack {
  private store: bigint[] = [];
  private maxHeight: number = 2048;

  public constructor(_maxHeight?: number) {
    if (_maxHeight) this.maxHeight = _maxHeight;
  }

  // Stack 长度
  public get length() {
    return this.store.length;
  }

  public push(value: bigint) {
    assert(typeof value === 'bigint', '[tinyevm] internal error');
    assert(value <= MAX_INTEGER_BIGINT, '[tinyevm] value out of range');
    assert(this.store.length < this.maxHeight, '[tinyevm] value out of range');
    this.store.push(value);
  }

  public pop(): bigint {
    assert(this.store.length >= 1, '[tinyevm] stack underflow');
    return this.store.pop()!;
  }

  // Pop multiple items from stack. Top of stack is first item in returned array.
  public popN(num: number = 1): bigint[] {
    assert(this.store.length >= num, '[tinyevm] stack underflow');
    return num === 0 ? [] : this.store.splice(-1 * num).reverse();
  }

  // Return items from the stack
  public peek(num: number = 1): bigint[] {
    const peekArray: bigint[] = [];
    for (let peek = 1; peek <= num; peek++) {
      const index = this.store.length - peek;
      assert(index >= 0, '[tinyevm] stack underflow');
      peekArray.push(this.store[index]);
    }
    return peekArray;
  }

  // Swap top of stack with an item in the stack.
  public swap(position: number) {
    assert(this.store.length > position, '[tinyevm] stack underflow');

    const head = this.store.length - 1;
    const i = this.store.length - position - 1;

    const tmp = this.store[head];
    this.store[head] = this.store[i];
    this.store[i] = tmp;
  }

  public toString() {
    return this.store.map((item) => item.toString(16)).join(',');
  }
}
