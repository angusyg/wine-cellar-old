var gulp = require('gulp');
var gutil = require('gulp-util');
// Include all dev dependencies of package.json
var plugins = require('gulp-load-plugins')();

// folder configuration
// !! angular module first for concatenation
var libJs = [
    '/node_modules/jquery/dist/jquery.min.js',
    '/node_modules/angular/angular.min.js',
    '/node_modules/angular-aria/angular-aria.min.js',
    '/node_modules/angular-material/angular-material.min.js',
    '/node_modules/angular-animate/angular-animate.min.js',
    '/node_modules/angular-messages/angular-messages.min.js',
    '/node_modules/@uirouter/angularjs/release/angular-ui-router.min.js',
    '/node_modules/angular-storage/dist/angular-storage.min.js'
];
var libCss = ['/node_modules/angular-material/angular-material.min.css'];
var sourceJs = ['./client/app/app.module.js', './client/app/**/*.js'];
var sourcePug = './views/**/*.pug';
var sourceSass = './client/stylesheets/*.sass';
var destination = './public/js';
var destinationCss = './public/stylesheets';
var finalJs = 'client.js';

// concatenation of all client js
gulp.task('concat', function() {
    return gulp.src(sourceJs)
        .pipe(plugins.concat(finalJs))
        .pipe(gulp.dest(destination))
        .pipe(plugins.livereload());
});

// minification of client js
gulp.task('uglify', function() {
    return gulp.src(destination + finalJs)
        .pipe(plugins.uglify({
            mangle: {
                toplevel: true
            }
        }))
        .pipe(plugins.rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(destination))
        .pipe(plugins.livereload());
});

// copy of public js libraries
gulp.task('copy-js', function() {
    return gulp.src(libJs)
        .pipe(gulp.dest(destination));
});

// copy of public css libraries
gulp.task('copy-css', function() {
    return gulp.src(libCss)
        .pipe(gulp.dest(destinationCss));
});

gulp.task('replace', function() {
    return gulp.src('./**/*.*', {
            base: './'
        })
        .pipe(function() {
            var installCfg = require('./install.json');
            Object.entries(installCfg).forEach(function(entry) {
                plugins.replace(entry.key, entry.value);
            });
        })
        .pipe(gulp.dest('./'));
});

// watch files for reload
gulp.task('watch', function() {
    plugins.livereload.listen();
    gulp.watch(sourceJs, ['concat']);
    gulp.watch(sourceSass, []);
    gulp.watch(sourcePug, []);
});

// task of installation (replace config and copy css and js lib)
gulp.task('install', ['replace', 'copy-css', 'copy-js']);
// default task (production)
gulp.task('default', ['copy-css', 'copy-js', 'concat', 'uglify']);
