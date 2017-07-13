// js файл для анимации контроль кнопок в слайдере

$(function(){

	// переменные
	const btnPrev = $('.slider__prev');
	const btnNext = $('.slider__next');
	const duration = 500;
	let active = 'slider-controls__item-active';
	let inProgress = false;

	// функция для перемещения "Назад"
	const moveSlidesPrev = (container, direction) => {

		// переменные
		let items        = container.find('.slider-controls__item');
		let activeItem   = items.filter('.slider-controls__item-active');
		let strafePerc   = direction === 'down' ? 100 : -100;
		let counter      = activeItem.index();

		counter--;

		// условие чтобы зациклить смену слайдов
		if(counter < 0) counter = items.length - 1;

		// сохраняем элемент который должен показаться
		const reqItem = items.eq(counter);

		// элемент который показан скрыть
		activeItem.animate({
			'top': `${strafePerc}%`,
		}, duration)

		// показать следующий элемент, добавив ему активный класс
		reqItem.animate({
			'top': '0',
		}, duration, function (){
			activeItem.removeClass(active).css('top', `${-strafePerc}%`);
			$(this).addClass(active);

			inProgress = false;
		});
	}

	// функция для перемещения "Вперед"
	const moveSlidesNext = (container, direction) => {

		// пременные
		let items         = container.find('.slider-controls__item');
		let activeItem    = items.filter('.slider-controls__item-active');
		let strafePerc    = direction === 'down' ? 100 : -100;
		let counter       = activeItem.index();

		counter++;

		// условие чтобы зациклить смену слайдов
		if (counter >= items.length) counter = 0;

		// сохраняем элемент который должен показаться
		const reqItem = items.eq(counter);

		// элемент который показан скрыть
		activeItem.animate({
			'top': `${strafePerc}%`
		}, duration)

		// показать следующий элемент, добавив ему активный класс
		reqItem.animate({
			top: 0
		}, duration, function (){
			activeItem.removeClass(active).css('top', `${-strafePerc}%`);
			$(this).addClass(active);

			inProgress = false;
		});
	}

	// при клике на кнопку "Назад"
	btnPrev.on('click', function(e) {
		e.preventDefault();


		if (inProgress) return;
		inProgress = true;

		moveSlidesPrev(btnPrev, 'down');
		moveSlidesPrev(btnNext, 'up');
	});

	// при клике на кнопку "Вперед"
	btnNext.on('click', function(e) {
		e.preventDefault();


		if (inProgress) return;
		inProgress = true;

		moveSlidesNext(btnPrev, 'down');
		moveSlidesNext(btnNext, 'up');
	});

});