const gulp = require('gulp');
const del = require('del');
const pump = require('pump');
const plugins = require('gulp-load-plugins')();
const gutil = require('gulp-util');
const uglify = require('gulp-uglify-es').default;

const libJs = [
  'node_modules/jquery/dist/jquery.min.js',
  'node_modules/angular/angular.min.js',
  'node_modules/angular-animate/angular-animate.min.js',
  'node_modules/angular-messages/angular-messages.min.js',
  'node_modules/@uirouter/angularjs/release/angular-ui-router.min.js',
  'node_modules/angular-storage/dist/angular-storage.min.js',
  'node_modules/angular-translate/dist/angular-translate.min.js',
  'node_modules/angular-translate-loader-partial/angular-translate-loader-partial.min.js',
  'node_modules/ui-bootstrap4/dist/ui-bootstrap-tpls.js',
];
const libJsToUglify = ['node_modules/angular1-ui-bootstrap4/dist/ui-bootstrap-tpls.js'];
const sourceJs = [
  'src/client/app/components/core/**/*.module.js',
  'src/client/app/app.module.js',
  'src/client/app/**/*.module.js',
  'src/client/app/**/*.js'
];
const sourceCss = [
  'src/client/styles/**/*.sass',
  'src/client/styles/**/*.scss'
];
const destinationJs = 'src/client/public/js';
const destinationCss = 'src/client/public/stylesheets';
const finalJs = 'client.js';
const finalLibJs = 'lib.min.js';
const esLintJs = ['src/**/*.js'];
const cleanJs = [`${destinationJs}/*.js`];
const cleanTempJs = [
  `${destinationJs}/*.js`,
  `!${destinationJs}/*.min.js`
];
const cleanCss = [
  `${destinationCss}/*.css`,
  `${destinationCss}/*.map`,
];

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
  del(cleanJs)
    .catch(logError);
});

// remove css libs
gulp.task('clean-css', () => {
  del(cleanCss)
    .catch(logError);
});

// remove js libs
gulp.task('clean-temp-js', () => {
  del(cleanTempJs)
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

gulp.task('sass', () => {
  pump([
    gulp.src(sourceCss),
    plugins.sass(),
    plugins.cleanCss(),
    gulp.dest(destinationCss),
    plugins.livereload(),
  ], logError);
});

// minification of client js
gulp.task('uglify', () => {
  pump([
    gulp.src(sourceJs),
    plugins.concat(finalJs),
    gulp.dest(destinationJs),
    uglify({
      mangle: false
    }),
    plugins.rename({
      suffix: '.min',
    }),
    gulp.dest(destinationJs),
    plugins.livereload(),
  ], logError);
});

// watch files for reload in dev mode
gulp.task('watch', () => {
  plugins.livereload.listen();
  gulp.watch(sourceCss, ['sass']);
  gulp.watch(sourceJs, ['uglify']);
});

// default task (production)
gulp.task('default', ['copy-js-lib', 'sass', 'uglify', 'clean-temp-js']);
