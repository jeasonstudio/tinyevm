import { createOpcodes, runOpcodes, PUSH1, PUSH32 } from './utils';

describe('push', () => {
  test('PUSH1', async () => {
    const opcodes = createOpcodes([PUSH1, '0x33']);
    const { stack } = await runOpcodes(opcodes);
    expect(stack.length).toEqual(1);
    expect(stack.pop()).toEqual(BigInt(0x33));
  });
  // 中间的 PUSH Opcode 省略
  test('PUSH32', async () => {
    const num =
      '0x112233445566778899aabbcceeff00112233445566778899aabbccddeeff0011';
    const opcodes = createOpcodes([PUSH32, num]);
    const { stack } = await runOpcodes(opcodes);
    expect(stack.length).toEqual(1);
    expect(stack.pop()).toEqual(BigInt(num));
  });
});
