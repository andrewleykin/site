// js файл для анимации главного дисплея


$(function(){

	const btnPrev = $('.slider__prev');
	const btnNext = $('.slider__next');


	const sliderShow = function(container) {
		let display = container.closest('.slider-right').find('.slider__display-img'),
			path = container.find('.slider-controls__item-active').children('.slider-controls__img').attr('src'),
			fadedOut = $.Deferred(),
			loaded = $.Deferred();

	display.fadeOut(function () {
		fadedOut.resolve();
	});

	fadedOut.done(() => {
		display.attr('src', path).on('load', () => {
			loaded.resolve();
		});
	});

	loaded.done(() => {
		display.fadeIn(500);
	});

}

	btnPrev.on('click', function(e) {
		e.preventDefault();

		sliderShow(btnPrev);

	});

	btnNext.on('click', function(e) {
		e.preventDefault();

		sliderShow(btnNext);

	});

});