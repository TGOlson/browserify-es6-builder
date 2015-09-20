'use strict';

var babelify = require('babelify');
var browserify = require('browserify');
var fs = require('fs');

var logBundleError = function(err) {
  console.log('Error bundling components: ', err.message || err);
};

var writeToFileSystem = function(path, buffer) {
  fs.writeFile(path, buffer);
};

var ensureDirectorySync = function(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

var validateArg = function(name, val) {
  if (!val) {
    throw new Error('Must provide argument "' + name + '"');
  }
};

var build = function(entryPoint, outputDir, outputFile) {
  validateArg('entryPoint', entryPoint);
  validateArg('outputDir', outputDir);
  validateArg('outputFile', outputFile);

  var filePath = outputDir + '/' + outputFile;
  ensureDirectorySync(outputDir);

  return browserify(entryPoint)
    .transform(babelify)
    .bundle(function(err, buffer) {
      if (err) {
        logBundleError(err);
      }

      return writeToFileSystem(filePath, buffer);
    })
    .on('error', logBundleError);
};

module.exports = build;
