module.exports = function (gulp, $, pkg, browserSync) {
    return function () {
        return gulp
        .src([
            pkg.paths.src.base + '/**/*.html',
            '!' + pkg.paths.src.base + '/layouts/**'
        ], {dot: true})
        .pipe($.twig())
        .pipe(gulp.dest(pkg.paths.dist.base))
        .pipe(browserSync.stream());
    }
}