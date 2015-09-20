import gulp from 'gulp';
import gutil from 'gulp-util';

import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';

const DEFAULT_OUTPUT_NAME = 'output.js';
const DEFAULT_OUTPUT_PATH = 'output';

const logBundleError = (err) => {
  gutil.log('Error bundling components: ', err.message || err);
};

const build = (entryPoint, outputName, outputPath) => {
  return browserify(entryPoint, {debug: true})
    .transform(babelify)
    .bundle()
    .on('error', logBundleError)
    .pipe(source(outputName || DEFAULT_OUTPUT_NAME))
    .pipe(gulp.dest((outputPath || DEFAULT_OUTPUT_PATH)));
};

gulp.task('build', () => {
  return build('../handsontable/src/browser.js');
});
