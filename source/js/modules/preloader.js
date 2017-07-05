// js файл для прелоадера на любых страницах

$(function(){

	var images = $('img'),
		imagesTotalCount = images.length,
		imagesLoadedCount = 0,
		percDisplay = $('.preloader__percent'),
		preloader = $('.preloader'),
		rounds = $('.preloader__rounds'),
		strokeGlobal = 450,
		strokeStart = 450,
		mainStroke;



	for (var i=0; i < imagesTotalCount; i++) {
		imageClone = new Image();
		imageClone.onload = imageLoaded;
		imageClone.onerror = imageLoaded;
		imageClone.src = images[i].src;
	}

	function imageLoaded() {
		imagesLoadedCount++;
		var perc = Math.round(((100 / imagesTotalCount) * imagesLoadedCount)) + '%';
		mainStroke = strokeStart - Math.round((strokeGlobal / imagesTotalCount));
		strokeStart -= (strokeGlobal / imagesTotalCount);

		console.log(mainStroke);
		rounds.css('strokeDashoffset', mainStroke);

		percDisplay.html(perc);
		
		if(imagesLoadedCount >= imagesTotalCount) {
			setTimeout(function(){
				if(!preloader.hasClass('done')){
					preloader.addClass('done');
				}
			}, 1000);
		}
	}
});
