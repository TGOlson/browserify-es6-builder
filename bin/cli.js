#!/usr/bin/env node

var argv = require('yargs').argv;
var build = require('../src/build');

var DEFAULT_OUTPUT_DIR = 'output';
var DEFAULT_OUTPUT_FILE = 'output.js';

var entryPoint = argv._[0];
var outputDir = argv.dir || DEFAULT_OUTPUT_DIR;
var outputFile = argv.file || DEFAULT_OUTPUT_FILE;

if (!entryPoint) {
  throw new Error(
    'Must provide entry point.' +
    '\n$ browserify-es6-builder <entry-point>'
  );
}

build(entryPoint, outputDir, outputFile);
