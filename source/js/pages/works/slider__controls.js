// js файл для анимации контроль кнопок в слайдере


$(function(){

	const duration = 500;
	let counter    = 1;
	let inProgress = false;

	const moveSlides = (container, direction) => {
		let items      = container.find('.slider-controls__item');
		let activeItem = items.filter('.active');
		let strafePerc = direction === 'down' ? 100 : -100;

		console.log(items);
		if (counter >= items.length) counter = 0;

		const reqItem = items.eq(counter);

		activeItem.animate({
			'top': `${strafePerc}%`
		}, duration)

		reqItem.animate({
			top: 0
		}, duration, function (){
			activeItem.removeClass('active').css('top', `${-strafePerc}%`);
			$(this).addClass('active');

			inProgress = false;
		});
	}

	$('.js__slider-controls').on('click', function(e) {
		e.preventDefault();


		if (inProgress) return;

		inProgress = true;

		moveSlides($('.slider__prev'), 'down');
		moveSlides($('.slider__next'), 'up');
		counter++;
	});

});