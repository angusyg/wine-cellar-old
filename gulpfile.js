const gulp = require('gulp'),
    del = require('del'),
    pump = require('pump'),
    plugins = require('gulp-load-plugins')();

// folder configuration
// !! angular module first for concatenation
const libJs = [
        './node_modules/jquery/dist/jquery.min.js',
        './node_modules/angular/angular.min.js',
        './node_modules/angular-aria/angular-aria.min.js',
        './node_modules/angular-material/angular-material.min.js',
        './node_modules/angular-animate/angular-animate.min.js',
        './node_modules/angular-messages/angular-messages.min.js',
        './node_modules/@uirouter/angularjs/release/angular-ui-router.min.js',
        './node_modules/angular-storage/dist/angular-storage.min.js',
        './node_modules/angular-deferred-bootstrap/angular-deferred-bootstrap.min.js'
    ],
    libJsMap = [
        './node_modules/angular/angular.min.js.map',
        './node_modules/angular-aria/angular-aria.min.js.map',
        './node_modules/angular-animate/angular-animate.min.js.map',
        './node_modules/angular-messages/angular-messages.min.js.map',
        './node_modules/@uirouter/angularjs/release/angular-ui-router.min.js.map',
        './node_modules/angular-deferred-bootstrap/angular-deferred-bootstrap.min.js'
    ],
    libCss = ['./node_modules/angular-material/angular-material.min.css'],
    sourceJs = ['./client/app.module.js', './client/**/*.js'],
    destinationJs = './public/js',
    destinationCss = './public/stylesheets',
    finalJs = '/client.js',
    finalLibJs = '/lib.min.js';

gulp.task('clean', function() {
    return del([
        destinationJs + '/*.js',
        destinationCss + '/*.css'
    ]);
});

gulp.task('copy-js-lib', function() {
    return del([destinationJs + '/*.js'],
        gulp.src(libJs)
        .pipe(plugins.concat(finalLibJs))
        .pipe(gulp.dest(destinationJs))
    );
});

gulp.task('copy-css-lib', function() {
    return del([destinationCss + '/*.css'],
        gulp.src(libCss)
        .pipe(gulp.dest(destinationCss))
    );
});

// minification of client js
gulp.task('uglify', ['copy-js-lib'], function() {
    pump([
        gulp.src(sourceJs),
        plugins.concat(finalJs),
        gulp.dest(destinationJs),
        plugins.uglify({
            mangle: {
                toplevel: true
            }
        }),
        plugins.rename({
            suffix: '.min'
        }),
        gulp.src(destinationJs),
        gulp.dest(destinationJs)
    ]);
});

// watch files for reload
gulp.task('watch', function() {
    plugins.livereload.listen();
    gulp.watch(sourceJs, ['uglify']);
});

// default task (production)
gulp.task('default', ['clean', 'copy-css-lib', 'copy-js-lib', 'uglify']);