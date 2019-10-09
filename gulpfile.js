var gulp        = require('gulp'),
    $           = require('gulp-load-plugins')(),
    pkg         = require('./package.json'),
    argv        = require('minimist')(process.argv),
    gutil       = require('gulp-util'),
    stylish     = require('jshint-stylish'),
    browserSync = require('browser-sync').create();

// Define tasks
gulp.task('serve',      require('./gulp/serve')(pkg, browserSync))
gulp.task('sass',       require('./gulp/sass')(gulp, $, pkg, browserSync))
gulp.task('js',         require('./gulp/javascript.js')(gulp, $, pkg, stylish))
gulp.task('templates',  require('./gulp/templates')(gulp, $, pkg, browserSync))

// Svg takes --pretty as a flag.
gulp.task('svg',        require('./gulp/svg.js')(gulp, $, pkg, argv))

// Deploy takes --staging or --production as flags.
gulp.task('deploy', gulp.series('sass', 'svg', 'js', 'templates', require('./gulp/deploy')(gulp, $, pkg, argv, gutil)))

// Default task
gulp.task('default', gulp.series('sass', 'svg', 'js', 'templates', 'serve', () => {
    gulp.watch(pkg.paths.src.js   + '/**/*.js',     ['js']);
    gulp.watch(pkg.paths.src.svg  + '/**/*.svg',    ['svg']);
    gulp.watch(pkg.paths.src.scss + '/**/*.scss',   ['sass']);
    gulp.watch(pkg.paths.src.base + '/**/*.html',   ['templates']);
}));