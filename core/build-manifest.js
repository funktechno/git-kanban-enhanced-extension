#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */
// copy manifest based off argument
// set version from package.json
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;
const fs = require('fs');
// const path = require('path');

// use the custom manifest settings
let custom = false;

// keep the application setting
let firefox = false;
if (argv.custom) {
  console.log('Is Custom');
  custom = true;
}

if (argv.firefox) {
  console.log('Is Custom');
  firefox = true;
}

const main = () => {
  const manifestType = custom ? '-custom' : '-main';
  const extPackageJson = require('../src/manifest' + manifestType + '.json');
  const packageJson = require('../package.json');
  extPackageJson.version = packageJson.version;
  if (!firefox) {
    delete extPackageJson.applications;
  }
  const manifestLocations = ['./src/manifest.json', './dist/manifest.json'];

  manifestLocations.forEach(l => {
    fs.writeFile(l, JSON.stringify(extPackageJson, null, 4), function(err) {
      if (err) return console.log(err);
      console.log('Manifest set');
    });
  });
};

main();
