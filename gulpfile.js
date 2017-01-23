var gulp = require('gulp'),
    gutil = require('gulp-util'),
    stylish = require('jshint-stylish'),
    browserSync = require('browser-sync').create();

const $ = require('gulp-load-plugins')();
const pkg = require('./package.json');

gulp.task('sass', function() {
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
});

gulp.task('js', function() {
    return gulp
        .src([
          './assets/js/custom/*.js'
        ])
        .pipe($.plumber())
        .pipe($.jshint())
        .pipe($.jshint.reporter(stylish))
        .pipe($.concat('scripts.js'))
        .pipe(gulp.dest(pkg.paths.dist.js))
        .pipe($.rename({suffix: '.min'}))
        .pipe($.uglify())
        .pipe(gulp.dest(pkg.paths.dist.js))
});

gulp.task('svg', function() {
    return gulp
        .src(pkg.paths.src.svg + '/**/*.svg')
        .pipe($.svgo())
        .pipe(gulp.dest(pkg.paths.src.svg))
});

gulp.task('templates', function() {
    return gulp
        .src([
            pkg.paths.src.base + '/**/*.html',
            '!' + pkg.paths.src.base + '/layouts/**'
        ], {dot: true})
        .pipe($.twig())
        .pipe(gulp.dest(pkg.paths.dist.base))
        .pipe(browserSync.stream());
});

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: pkg.paths.dist.base
        }
    });
});

gulp.task('default', ['sass', 'svg', 'js', 'templates', 'serve'], function() {
    gulp.watch(pkg.paths.src.scss + '/**/*.scss', ['sass']);
    gulp.watch(pkg.paths.src.svg + '/**/*.svg', ['svg']);
    gulp.watch(pkg.paths.src.js + '/**/*.js', ['js']);
    gulp.watch(pkg.paths.src.base + '/**/*.html', ['templates']);
})