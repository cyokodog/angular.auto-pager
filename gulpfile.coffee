gulp = require 'gulp'
browser = require 'browser-sync'
plugins = require 'gulp-load-plugins'
p = plugins()

gulp.task 'server', ->
  browser
    server:
      baseDir: './'

gulp.task 'build', ->
  gulp.src(['./src/angular.auto-pager.js']).
    pipe(p.rename({suffix: '.min'})).
    pipe(p.uglify()).
    pipe(gulp.dest('./src'))

gulp.task 'watch', ['server'], (done)->
  gulp.watch ['src/**/*.js'], [browser.reload]
  gulp.watch ['./**/*.html'], [browser.reload]
  done()


gulp.task 'default', ['build','watch']
