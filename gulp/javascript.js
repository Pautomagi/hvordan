module.exports = function(gulp, $, pkg, stylish) {
    return function() {
        return gulp
        .src([
            pkg.paths.src.js + '/custom/*.js'
        ])
        .pipe($.plumber())
        .pipe($.jshint())
        .pipe($.jshint.reporter(stylish))
        .pipe($.concat('scripts.js'))
        .pipe(gulp.dest(pkg.paths.dist.js))
        .pipe($.rename({suffix: '.min'}))
        .pipe($.uglify())
        .pipe(gulp.dest(pkg.paths.dist.js))
    }
}