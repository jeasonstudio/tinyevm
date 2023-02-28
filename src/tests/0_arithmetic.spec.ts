import { ADD, createOpcodes, DIV, MUL, PUSH1, runOpcodes, SUB } from './utils';

describe('arithmetic', () => {
  // test('STOP', () => {
  //   expect(async () => {
  //     await runOpcodes(createOpcodes([STOP]));
  //   }).toThrowError();
  // });

  test('ADD', async () => {
    const { stack } = await runOpcodes(
      createOpcodes([PUSH1, '0x0a', PUSH1, '0x0a', ADD])
    );
    expect(stack.length).toEqual(1);
    expect(stack.pop()).toEqual(BigInt('0x14'));
  });
  test('MUL', async () => {
    const { stack } = await runOpcodes(
      createOpcodes([PUSH1, '0x0a', PUSH1, '0x0a', MUL])
    );
    expect(stack.length).toEqual(1);
    expect(stack.pop()).toEqual(BigInt('0x64'));
  });
  test('DIV', async () => {
    const { stack } = await runOpcodes(
      createOpcodes([PUSH1, '0x0a', PUSH1, '0x0a', DIV])
    );
    expect(stack.length).toEqual(1);
    expect(stack.pop()).toEqual(BigInt('0x01'));
  });
});
