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
        .pipe(gutil.env.type === 'pretty' ? $.svgo({
            js2svg: {
                pretty: true
            }
        }) : $.svgo())
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
        server: { baseDir: pkg.paths.dist.base }
    });
});

gulp.task('deploy', ['sass', 'js', 'svg', 'templates'], function() {
    // Dirs and Files to sync
    rsyncPaths = [pkg.paths.dist.base];

    // Default options for rsync
    rsyncConf = {
        root: 'dist/',
        progress: true,
        incremental: true,
        relative: true,
        emptyDirectories: true,
        recursive: true,
        clean: true,
        compress: true,
        exclude: [],
    };

    rsyncConf.hostname = 'inhub.no'; // hostname
    rsyncConf.username = 'root'; // ssh username
    rsyncConf.destination = '/var/www/' + pkg.name; // path where uploaded files go
    rsyncConf.port = 2248;

    return gulp.src(pkg.paths.dist.base + '/**').pipe($.rsync(rsyncConf));

    function throwError(taskName, msg) {
        throw new gutil.PluginError({
            plugin: taskName,
            message: msg
        });
    }
});

gulp.task('default', ['sass', 'svg', 'js', 'templates', 'serve'], function() {
    gulp.watch(pkg.paths.src.scss + '/**/*.scss', ['sass']);
    gulp.watch(pkg.paths.src.svg + '/**/*.svg', ['svg']);
    gulp.watch(pkg.paths.src.js + '/**/*.js', ['js']);
    gulp.watch(pkg.paths.src.base + '/**/*.html', ['templates']);
})