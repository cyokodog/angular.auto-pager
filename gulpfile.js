(function(){

    var gulp = require('gulp');
    var browser = require('browser-sync');
    var p = require('gulp-load-plugins')();

    gulp.task('server', function(){
        return browser({
            port: '3020',
            server: {
                baseDir: './'
            }
        });
    })

    gulp.task('watch', ['server'], function(done){
        gulp.watch(['./*.js'], [browser.reload]);
        gulp.watch(['./*.html'], [browser.reload]);
        done();
    });

    gulp.task('build', function(){
        return gulp.src(['./angular.auto-pager.js']).
            pipe(p.uglify()).
            pipe(gulp.dest('./min'))
        ;
    })

    gulp.task('default', ['build', 'watch'], function(){
    });

})();
