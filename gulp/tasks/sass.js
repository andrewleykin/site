// преобразование sass файлов и дальнешее преобразование

'use strict';

module.exports = function() {
  $.gulp.task('sass', function() {
    return $.gulp.src('./source/style/*.scss')
      .pipe($.gp.sourcemaps.init())
      .pipe($.gp.sass()).on('error', $.gp.notify.onError({ title: 'Style' }))
      .pipe($.gp.csso())
      .pipe($.gp.autoprefixer({ browsers: $.config.autoprefixerConfig }))
      .pipe($.gp.sourcemaps.write())
      .pipe($.gulp.dest($.config.root + '/app/css'))
      .pipe($.browserSync.stream());
  })
};
