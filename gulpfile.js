var gulp = require('gulp'),
    gutil = require('gulp-util'),
    argv  = require('minimist')(process.argv),
    stylish = require('jshint-stylish'),
    browserSync = require('browser-sync').create();

const $ = require('gulp-load-plugins')()
const pkg = require('./package.json')

// Define tasks
gulp.task('serve',      require('./gulp/serve')(pkg, browserSync))
gulp.task('sass',       require('./gulp/sass')(gulp, $, pkg, browserSync))
gulp.task('js',         require('./gulp/javascript.js')(gulp, $, pkg, stylish))
gulp.task('templates',  require('./gulp/templates')(gulp, $, pkg, browserSync))

// Svg takes --pretty as a flag.
gulp.task('svg',        require('./gulp/svg.js')(gulp, $, pkg, argv))

// Deploy takes --staging or --production as flags.
gulp.task('deploy', ['sass', 'svg', 'js', 'templates'], require('./gulp/deploy')(gulp, $, pkg, argv, gutil))

// Default task
gulp.task('default', ['sass', 'svg', 'js', 'templates', 'serve'], function() {
    gulp.watch(pkg.paths.src.js     + '/**/*.js',     ['js']);
    gulp.watch(pkg.paths.src.svg    + '/**/*.svg',    ['svg']);
    gulp.watch(pkg.paths.src.scss   + '/**/*.scss',   ['sass']);
    gulp.watch(pkg.paths.src.base   + '/**/*.html',   ['templates']);
})