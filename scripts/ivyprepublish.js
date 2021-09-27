const fs = require('fs');
const { argv } = require('process');
const path = require('path');

const pathPackage = path.resolve(process.cwd(), argv[2]);

const pkgData = require(pathPackage);

delete pkgData.scripts;

fs.writeFileSync(pathPackage, JSON.stringify(pkgData, null, 2));

console.log('DONE');
