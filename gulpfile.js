'use strict';

global.$ = {
  package: require('./package.json'),
  config: require('./gulp/config'),
  path: {
    task: require('./gulp/paths/tasks.js'),
    jsFoundation: require('./gulp/paths/js.foundation.js'),
    cssFoundation: require('./gulp/paths/css.foundation.js'),
    app: require('./gulp/paths/app.js')
  },
  gulp: require('gulp'),
  del: require('del'),
  merge: require('merge-stream'),
  browserSync: require('browser-sync').create(),
  gp: require('gulp-load-plugins')()
};

$.path.task.forEach(function(taskPath) {
  require(taskPath)();
});

$.gulp.task('default', $.gulp.series(
  'clean',
  'sprite:create',
  $.gulp.parallel(
    'sass',
    'pug',
    'js:foundation',
    'js:process',
    'copy:fonts',
    'copy:image',
    'copy:data',
    'css:foundation',
    'sprite:svg'
  ),
  $.gulp.parallel(
    'watch',
    'serve'
  )
));

$.gulp.task('build', $.gulp.series(
  'clean',
  'sprite:create',
  $.gulp.parallel(
    'sass',
    'pug',
    'js:foundation',
    'js:process',
    'copy:fonts',
    'copy:image',
    'copy:data',
    'css:foundation',
    'sprite:svg'
  )
));


