// js файл для прелоадера на любых страницах

	var images = $('img'),
		imagesTotalCount = images.length,
		imagesLoadedCount = 0,
		percDisplay = $('.preloader__percent');



	for (var i=0; i < imagesTotalCount; i++) {
		imageClone = new Image();
		imageClone.onload = imageLoaded;
		imageClone.onerror = imageLoaded;
		imageClone.src = images[i].src;
	}

	function imageLoaded() {
		imagesLoadedCount++;
		var perc = Math.round(((100 / imagesTotalCount) * imagesLoadedCount)) + '%';

		percDisplay.html(perc);
		
		if(imagesLoadedCount >= imagesTotalCount) {
			setTimeout(function(){
				var preloader = $('.preloader');
				if(!preloader.hasClass('done')){
					preloader.addClass('done');
				}
			}, 1000);
		}
	}
