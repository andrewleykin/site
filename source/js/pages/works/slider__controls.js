// js файл для анимации контроль кнопок в слайдере


$(function(){

	const btnPrev = $('.slider__prev');
	const btnNext = $('.slider__next');
	const duration = 500;
	let active = 'slider-controls__item-active';
	let inProgress = false;

	const moveSlidesPrev = (container, direction) => {
		let items        = container.find('.slider-controls__item');
		let activeItem   = items.filter('.slider-controls__item-active');
		let strafePerc   = direction === 'down' ? 100 : -100;
		let counter      = activeItem.index();

		counter--;

		if(counter < 0) counter = items.length - 1;

		const reqItem = items.eq(counter);

		activeItem.animate({
			'top': `${strafePerc}%`,
		}, duration)

		reqItem.animate({
			'top': '0',
		}, duration, function (){
			activeItem.removeClass(active).css('top', `${-strafePerc}%`);
			$(this).addClass(active);

			inProgress = false;
		});
	}

	const moveSlidesNext = (container, direction) => {
		let items         = container.find('.slider-controls__item');
		let activeItem    = items.filter('.slider-controls__item-active');
		let strafePerc    = direction === 'down' ? 100 : -100;
		let counter       = activeItem.index();

		counter++;

		if (counter >= items.length) counter = 0;

		const reqItem = items.eq(counter);

		activeItem.animate({
			'top': `${strafePerc}%`
		}, duration)

		reqItem.animate({
			top: 0
		}, duration, function (){
			activeItem.removeClass(active).css('top', `${-strafePerc}%`);
			$(this).addClass(active);

			inProgress = false;
		});
	}

	btnPrev.on('click', function(e) {
		e.preventDefault();


		if (inProgress) return;
		inProgress = true;

		moveSlidesPrev(btnPrev, 'down');
		moveSlidesPrev(btnNext, 'up');
	});

	btnNext.on('click', function(e) {
		e.preventDefault();


		if (inProgress) return;
		inProgress = true;

		moveSlidesNext(btnPrev, 'down');
		moveSlidesNext(btnNext, 'up');
	});

});