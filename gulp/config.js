'use strict';

// paths map
var path = {
  src:  'app',
  dest: 'build'
};

// set configs for plugins
global['config'] = module.exports = {
  src:  path.src,
  dest: path.dest,
  tests: {
    src: path.src + '/tests/**/*'
  },
  js: {
    src:  path.src + '/assets/js/**/*.js',
    dest: path.dest + '/assets/js'
  },
  browserSync: {
    server: { baseDir: path.dest }
  },
  markup: {
    src:  path.src + '/**/*.html',
    dest: path.dest
  },
  compass: {
    src:  path.src + '/assets/sass',
    dest: path.dest + '/assets/css'
  },
  preprocessor: {
    choice: 'sass',
    src:    path.src + '/assets/sass/**/*.scss',
    dest:   path.dest + '/assets/css'
  }
};
