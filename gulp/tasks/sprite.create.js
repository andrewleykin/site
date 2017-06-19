// создание спрайтов

'use strict';

module.exports = function () {
	$.gulp.task('sprite:create', function () {
	  var spriteData = $.gulp.src('source/sprite/*.png')
	  .pipe($.gp.spritesmith({
		imgName: 'sprite.png',	// имя картинки
		cssName: 'sprite.scss',	// имя файла стилей
	  	algorithm: 'left-right',
      	padding: 20
	  }));
	
	  // Прописываем путь для картинки
	  var imgStream = spriteData.img
		.pipe($.gulp.dest($.config.root + '/app/img'));
		
	  // Прописываем путь для файла стилей
	  var cssStream = spriteData.css
		.pipe($.gulp.dest('./source/style/common'));
	 
	  // Возвращаем две переменные
	  return $.merge(imgStream, cssStream);
	});
};
