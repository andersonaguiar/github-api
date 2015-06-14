gulp.task(
  'build',
  [
    'copy-assets',
    config.preprocessor.choice
  ]
);
