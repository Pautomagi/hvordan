module.exports = function(pkg, browserSync) {
    return function() {
        browserSync.init({
            server: { baseDir: pkg.paths.dist.base }
        });
    }
}