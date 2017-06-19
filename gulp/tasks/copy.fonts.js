// копирование шрифтов

'use strict';

module.exports = function () {
	$.gulp.task('copy:fonts', function() {
    return $.gulp.src('./source/fonts/**/*.*', { since: $.gulp.lastRun('copy:fonts') }) // копируем только вновь добавленные шрифты
      .pipe($.gulp.dest($.config.root + '/app/fonts'));
  });
};