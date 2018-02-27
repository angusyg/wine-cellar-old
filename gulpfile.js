const gulp = require('gulp');
const del = require('del');
const pump = require('pump');
const plugins = require('gulp-load-plugins')();
const gutil = require('gulp-util');
const uglify = require('gulp-uglify-es').default;

const libJs = [
  'node_modules/jquery/dist/jquery.min.js',
  'node_modules/angular/angular.min.js',
  'node_modules/angular-aria/angular-aria.min.js',
  'node_modules/angular-material/angular-material.min.js',
  'node_modules/angular-animate/angular-animate.min.js',
  'node_modules/angular-messages/angular-messages.min.js',
  'node_modules/@uirouter/angularjs/release/angular-ui-router.min.js',
  'node_modules/angular-storage/dist/angular-storage.min.js',
  'node_modules/angular-deferred-bootstrap/angular-deferred-bootstrap.min.js',
];
const libCss = ['node_modules/angular-material/angular-material.min.css'];
const sourceJs = [
  'src/client/app/components/core/**/*.module.js',
  'src/client/app/app.module.js',
  'src/client/app/**/*.module.js',
  'src/client/app/**/*.js'
];
const destinationJs = 'src/client/public/js';
const destinationCss = 'src/client/public/stylesheets';
const finalJs = 'client.js';
const finalLibJs = 'lib.min.js';
const esLintJs = ['src/**/*.js'];

/**
 * Log to console an Error
 * @param  {error} err error thrown during gulp task
 */
function logError(err) {
  if (err) gutil.log(gutil.colors.red('[Error]'), err.toString());
}

// validate js files
gulp.task('eslint', () => {
  pump([
    gulp.src(esLintJs),
    plugins.eslint(),
    plugins.eslint.format('stylish'),
    plugins.eslint.results((results) => {
      if (results.errorCount > 0) {
        gutil.log(gutil.colors.red('End in eslint task due to error(s)'));
        process.exit(1);
      }
    }),
  ], logError);
});

// remove js libs
gulp.task('clean-js', () => {
  del([`${destinationJs}/*.js`])
    .catch(logError);
});

// remove css libs
gulp.task('clean-css', () => {
  del([
      `${destinationCss}/*.css`,
      `${destinationCss}/*.map`,
    ])
    .catch(logError);
});

// remove js and css lib from public
gulp.task('clean', ['clean-js', 'clean-css']);

// expose js lib in public
gulp.task('copy-js-lib', ['clean-js'], () => {
  pump([
    gulp.src(libJs),
    plugins.concat(finalLibJs),
    gulp.dest(destinationJs),
  ], logError);
});

// expose css lib in public
gulp.task('copy-css-lib', ['clean-css'], () => {
  pump([
    gulp.src(libCss),
    gulp.dest(destinationCss),
  ], logError);
});

// minification of client js
gulp.task('uglify', () => {
  pump([
    gulp.src(sourceJs),
    plugins.concat(finalJs),
    gulp.dest(destinationJs),
    uglify({
      mangle: {
        toplevel: true,
      },
    }),
    plugins.rename({
      suffix: '.min',
    }),
    gulp.dest(destinationJs),
  ], logError);
});

// watch files for reload in dev mode
gulp.task('watch', () => {
  plugins.livereload.listen();
  gulp.watch(sourceJs, ['uglify']);
});

// default task (production)
gulp.task('default', ['copy-css-lib', 'copy-js-lib', 'uglify']);
