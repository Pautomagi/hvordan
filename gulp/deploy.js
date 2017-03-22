module.exports = function (gulp, $, pkg, argv, gutil) {
    return function () {
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

            // Setup deployment environment
            if (argv.staging) {
                rsyncConf.hostname      = pkg.deploy.staging.hostname;
                rsyncConf.username      = pkg.deploy.staging.username;
                rsyncConf.destination   = pkg.deploy.staging.destination;
                rsyncConf.port          = pkg.deploy.staging.port;
            } else if (argv.production) {
                rsyncConf.hostname      = pkg.deploy.production.hostname;
                rsyncConf.username      = pkg.deploy.production.username;
                rsyncConf.destination   = pkg.deploy.production.destination;
                rsyncConf.port          = pkg.deploy.production.port;
            } else {
                throwError('deploy', gutil.colors.red('Missing or invalid target'));
            }

            return gulp.src(pkg.paths.dist.base + '/**').pipe($.rsync(rsyncConf));

            function throwError(taskName, msg) {
                throw new gutil.PluginError({
                    plugin: taskName,
                    message: msg
                });
            }
    };
};