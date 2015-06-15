var reload = $.browserSync.reload;

gulp.task('watch', function(callback) {
  // sass|stylus
  gulp.watch(config.preprocessor.src, [config.preprocessor.choice]);

  // js
  // gulp.watch(config.js.src, ['uglifyJs']);
  gulp.watch(config.js.src, ['copy-js']);

  // markup
  gulp.watch(config.markup.src, ['markup']);

  // js tests
  gulp.watch(config.tests.src, ['test']);

  // browser sync
  gulp.watch(config.markup.src).on('change', reload);
  gulp.watch(config.preprocessor.dest + '/**/*.css').on('change', reload);
  gulp.watch(config.js.dest + '/**/*.js').on('change', reload);
});
