gulp.task('copy-html', function() {
  gulp.src([config.markup.src])
    .pipe(gulp.dest(config.markup.dest))
});

gulp.task('copy-js', function() {
  gulp.src([config.js.src])
    .pipe(gulp.dest(config.js.dest))
});

gulp.task('copy-assets', ['copy-html', 'copy-js']);
