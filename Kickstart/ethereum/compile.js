/**********Version1
const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath=path.resolve(__dirname,'build');//creating a path to the build directory
fs.removeSync(buildPath);//delete any build file if present

const campaignPath=path.resolve(__dirname,'contracts','Campaign.sol');
const source=fs.readFileSync(campaignPath,'utf8');//creating a source file to be compiled
const output=solc.compile(source,1).contracts;//assigning the output of the compiled contract to the output 
						//there are two output in this case 1>output of campaign contract and 2>output of the campaign factory

fs.ensureDirSync(buildPath);//check presence of build directory and if absent creates one.
console.log(output);
for(let contract in output)//looping is used to put the output of the compilation output of two contracts in two separate files of 
{ 
	fs.outputJsonSync
	(
		path.resolve(buildPath,contract.replace(':','')+'.json'),
		output[contract]
	);	
 
}
*************/	
//version2	
const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');
const output = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath);

for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(':', '') + '.json'),
    output[contract]
  );
}