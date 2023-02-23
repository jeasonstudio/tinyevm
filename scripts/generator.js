const opMap = {
  create: {
    value: 0xf0,
    delta: 3,
    alpha: 1,
    doc: 'address = create(value, index, length)',
    nonStatic: true,
    memory: 'read',
  },
  call: {
    value: 0xf1,
    delta: 7,
    alpha: 1,
    doc: 'v = call(gasLimit, address, value, inputIndex, inputLength, outputIndex, outputLength)',
    nonStatic: true,
    memory: 'full',
  },
  callcode: {
    value: 0xf2,
    delta: 7,
    alpha: 1,
    doc: 'v = callcode(@TODO)',
    nonStatic: true,
    memory: 'full',
  },
  return: {
    value: 0xf3,
    delta: 2,
    alpha: 0,
    doc: 'return(index, length)',
    memory: 'read',
  },
  delegatecall: {
    value: 0xf4,
    delta: 6,
    alpha: 1,
    doc: 'v = delegatecall(gasLimit, address, inputIndex, inputLength, outputIndex, outputLength)',
    nonStatic: true,
    memory: 'full',
  },
  create2: {
    value: 0xf5,
    delta: 4,
    alpha: 1,
    doc: 'address = create2(value, index, length, salt)',
    nonStatic: true,
    memory: 'read',
  },
  staticcall: {
    value: 0xfa,
    delta: 6,
    alpha: 1,
    doc: 'v = staticcall(gasLimit, address, inputIndex, inputLength, outputIndex, outputLength)',
    memory: 'full',
  },
  revert: {
    value: 0xfd,
    delta: 2,
    alpha: 0,
    doc: 'revert(returnDataOffset, returnDataLength)',
    memory: 'read',
  },
  invalid: { value: 0xfe, delta: 0, alpha: 0, doc: 'invalid' },
  suicide: {
    value: 0xff,
    delta: 1,
    alpha: 0,
    doc: 'suicide(targetAddress)',
    nonStatic: true,
  },
};

const target = `${__dirname}/target.ts.template`;

(async () => {
  let result = `import { AOpcode, opcode } from './common';\n\n`;
  Object.entries(opMap).forEach(([name, { value, doc, ...others }]) => {
    const hexOpcode = '0x' + value.toString(16).padStart(2, '0');
    const label = name.toUpperCase();
    const template = `@opcode(${hexOpcode}, '${label}'${
      doc ? `, '${doc}'` : ''
    })
export class ${label} extends AOpcode {
  async execute() {
    throw new Error(\`[tinyevm] opcode '${label}(${hexOpcode})' not implemented.\`);
  }
  async gasUsed() {
    return BigInt(0);
  }
}
\n`;
    result += template;
  });

  require('fs').writeFileSync(target, result);
})();
