gulp = require 'gulp'
browser = require 'browser-sync'
plugins = require 'gulp-load-plugins'
p = plugins()

gulp.task 'server', ->
  browser
    server:
      baseDir: './'

gulp.task 'transpile', ->
  gulp.src ['./src/angular.auto-pager.coffee']
    .pipe p.coffee()
    .pipe gulp.dest './src'

gulp.task 'minify', ->
  gulp.src ['./src/angular.auto-pager.js']
    .pipe p.rename {suffix: '.min'}
    .pipe p.uglify()
    .pipe gulp.dest './src'

gulp.task 'watch', ['transpile', 'minify', 'server'], (done)->
  gulp.watch ['src/**/*.coffee'], ['transpile']
  gulp.watch ['src/**/*.js'], [browser.reload]
  gulp.watch ['./**/*.html'], [browser.reload]
  done()

gulp.task 'default', ['watch']
