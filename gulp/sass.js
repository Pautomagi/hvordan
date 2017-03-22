module.exports = function(gulp, $, pkg, browserSync) {
    return function() {
        const s = $.size({pretty: true});
        return gulp
        .src(pkg.paths.src.scss + pkg.vars.scssName)
        .pipe($.sass({
            includePaths: pkg.paths.scss,
            outputStyle: 'compressed'
        }).on('error', $.sass.logError))
        .pipe($.autoprefixer({
            browsers: ['last 2 versions', 'ie >= 9']
        }))
        .pipe(s)
        .pipe($.notify({
            onLast: true,
            title : function() {
                return 'Sass compiled'
            },
            message: function() {
                return 'Filstørrelse: ' + s.prettySize;
            }
            })
        )
        .pipe(gulp.dest(pkg.paths.dist.css))
        .pipe(browserSync.stream());
    }
}