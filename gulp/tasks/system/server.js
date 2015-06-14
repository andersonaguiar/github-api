gulp.task('server', function() {
  gulp.src('build')
    .pipe($.webserver({
      open: true
    }));
});
