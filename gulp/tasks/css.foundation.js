// создание библиотеки css

'use strict';

module.exports = function() {
  $.gulp.task('css:foundation', function() {
    return $.gulp.src($.path.cssFoundation)
      .pipe($.gp.concatCss('foundation.css'))
      .pipe($.gp.cssUrlAdjuster({
                replace:  ['../font-awesome/fonts/','../fonts/']
       }))
      .pipe($.gp.csso())
      .pipe($.gulp.dest($.config.root + '/app/css'))
  })
};
