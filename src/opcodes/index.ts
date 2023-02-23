import * as opcodesMap from './opcodes';

export const opcodes = Object.values(opcodesMap);

export const opcodeLabelMap = Object.fromEntries(
  Object.values(opcodesMap).map((opcode) => {
    return [opcode.label, opcode];
  })
);

export const opcodeValueMap = Object.fromEntries(
  Object.values(opcodesMap).map((opcode) => [opcode.opcode, opcode])
);

export * from './common';
export * from './unimplemented';
