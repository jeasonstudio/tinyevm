import { createOpcodes, runOpcodes, PUSH1, PUSH32, DUP1, DUP2 } from './utils';

describe('dup', () => {
  test('DUP1', async () => {
    const { stack } = await runOpcodes(createOpcodes([PUSH1, '0x33', DUP1]));
    expect(stack.length).toEqual(2);
    expect(stack.pop()).toEqual(BigInt('0x33'));
    expect(stack.pop()).toEqual(BigInt('0x33'));
  });
  // 中间的 DUP Opcode 省略
  test('DUP2', async () => {
    const { stack } = await runOpcodes(
      createOpcodes([PUSH1, '0x01', PUSH1, '0x02', DUP2])
    );
    expect(stack.length).toEqual(3);
    expect(stack.pop()).toEqual(BigInt('0x01'));
    expect(stack.pop()).toEqual(BigInt('0x02'));
    expect(stack.pop()).toEqual(BigInt('0x01'));
  });
});
