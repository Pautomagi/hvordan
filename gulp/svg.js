module.exports = function (gulp, $, pkg, argv) {
    return function () {
        return gulp
        .src(pkg.paths.src.svg + '/**/*.svg')
        .pipe(argv.pretty ? $.svgo({
            js2svg: {
                pretty: true
            }
        }) : $.svgo())
        .pipe(gulp.dest(pkg.paths.src.svg))
    }
}