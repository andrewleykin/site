// js файл для анимации главного дисплея


$(function(){

	// переменные кнопок
	const btnPrev = $('.slider__prev');
	const btnNext = $('.slider__next');

	// функция для показа на главном дисплеи
	const sliderShow = function(container) {

		// переменные
		let display = container.closest('.slider-right').find('.slider__display-img'),
			path = container.find('.slider-controls__item-active').children('.slider-controls__img').attr('src'),
			fadedOut = $.Deferred(),
			loaded = $.Deferred();

		// включить рычаг у Дефферед объекта
		display.fadeOut(function () {
			fadedOut.resolve();
		});

		// Дисплею изменить путь к картинке
		fadedOut.done(() => {
			display.attr('src', path).on('load', () => {
				loaded.resolve();
			});
		});

		// показать дисплей
		loaded.done(() => {
			display.fadeIn(500);
		});

	}

	// при клике на кнопку "Назад"
	btnPrev.on('click', function(e) {
		e.preventDefault();

		sliderShow(btnPrev);

	});

	// при клике на кнопку "Вперед"
	btnNext.on('click', function(e) {
		e.preventDefault();

		sliderShow(btnNext);

	});

});