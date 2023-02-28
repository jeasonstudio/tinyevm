const solc = require('solc');
const path = require('path');
const fs = require('fs');
const assert = require('assert');

const input = {
  language: 'Solidity',
  sources: {},
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};

async function main() {
  const [, , targetPath] = process.argv;
  assert(targetPath, 'Please provide a target path');

  const solidityPath = path.join(process.cwd(), targetPath);
  assert(fs.existsSync(solidityPath), 'Please provide a valid path');

  const solFilename = path.basename(solidityPath);
  const solContent = fs.readFileSync(solidityPath, 'utf8');
  input.sources[solFilename] = { content: solContent };

  const output = JSON.parse(solc.compile(JSON.stringify(input)));
  const contract = output.contracts[solFilename];

  const total = Object.entries(contract).map(([contractName, contractData]) => {
    let info = '';
    info += `↓----------------- contract: ${contractName} -----------------↓\n`;
    info += `--------- ABI ---------\n`;
    info += JSON.stringify(contractData.abi);
    info += `\n--------- Bytecode ---------\n`;
    info += contractData.evm.bytecode.object;
    info += `\n--------- Deployed Bytecode ---------\n`;
    info += contractData.evm.deployedBytecode.object;
    info += `\n↑----------------- contract: ${contractName} -----------------↑\n`;

    return info;
  });

  console.log(total.join('\n'));
  const resultPath = path.join(solidityPath, `../${solFilename}.txt`);
  fs.writeFileSync(resultPath, total.join('\n'), 'utf-8');
}

main().catch(console.error);

// var output = JSON.parse(solc.compile(JSON.stringify(input)));

// // `output` here contains the JSON output as specified in the documentation
// for (var contractName in output.contracts['test.sol']) {
//   console.log(
//     contractName +
//       ': ' +
//       output.contracts['test.sol'][contractName].evm.bytecode.object
//   );
// }
