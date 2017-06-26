// Переписывать пути в css

'use strict';

module.exports = function() {
    $.gulp.task('css-url-adjuster', function() {
        return $.gulp.src($.config.root + '/app/css/foundation.css')
            .pipe($.gp.cssUrlAdjuster({
                replace:  ['../font-awesome/fonts/','../fonts/']
            }))
            .pipe($.gulp.dest($.config.root + '/app/css/'))
    })
};