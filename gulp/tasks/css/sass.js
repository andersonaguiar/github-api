gulp.task('sass', function() {
  gulp.src(config.preprocessor.src)
    .pipe($.compass({
      sass: config.compass.src,
      css: config.compass.dest,
      style: 'compressed',
      debug: false
    }))
    .pipe($.sourcemaps.init())
    .pipe($.concat('main.min.css'))
    .pipe($.minifyCss())
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest(config.preprocessor.dest));
});


