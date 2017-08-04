// js файл для анимации информации в слайдере

$(function() {

	// значения
	let sliderInfo = [
		{
			"title": "Свой сайт портфолио",
			"tools": "html, css, javascript",
			"link": "index.html"
		},
		{
			"title": "Старый сайт портфолио",
			"tools": "html, css",
			"link": "../works/portfolio__homer/index.html"
		},
		{
			"title": "Glacy - магазин мороженого",
			"tools": "html, css3",
			"link": "../works/glacy__code/index.html"
		},
		{
			"title": "Тестовое задание",
			"tools": "html, css, jquery",
			"link": "../works/ls-test/index.html"
		},
		{
			"title": "SEDONA",
			"tools": "html, css, javascript",
			"link": "../works/sedona/index.html"
		}
	]

	// переменные
	const btnPrev     = $('.slider__prev');
	const btnNext     = $('.slider__next');
	const infoBlock   = $('.slider-left__info');
	let slideInfo     = $.makeArray(sliderInfo);
	let title         = $('.slider__title');
	let tools         = $('.slider__tools');
	let link          = infoBlock.find('.slider__link');


	// функция для смены ссылки
	const setLink = (container) => {

		// переменные
		let items        = container.find('.slider-controls__item');
		let activeItem   = items.filter('.slider-controls__item-active');
		let counter      = activeItem.index();

		// выбрать нужныую ссылку
		const reqLink = slideInfo[counter].link;

		// сменить ссылку 
		link.attr('href', reqLink);

	}

	// функция для анимации строки
	const animateRow = (str) => {

		// переменные
		let time = 50,
			animate = str.find('.example').children('span');

		// изначально скрыть элементы
		animate.css('opacity', 0);

		/* для каждого элемента с разной скоростью добавить класс с анимацией */
		animate.each(function() {
			let $this = $(this);
			setTimeout(function () {
				$this.addClass('slider__text--animate');
			}, time);
			time = time + 50;
		});

	};

	// функция для смены описания "Назад"
	const spanRowPrev = (container,str,data) => {

		// переменные
		let items        = container.find('.slider-controls__item');
		let activeItem   = items.filter('.slider-controls__item-active');
		let counter      = activeItem.index();
		let row          = data == 'title' ? sliderInfo[counter].title : sliderInfo[counter].tools; 
		let span         = document.createElement('span');
		let toRow        = document.createElement('span');
		$(toRow).addClass('example');

		// разбить строку на спаны по одному символу
		row.split('').forEach(function(item){
			span.innerHTML = item;
			if (item === ' ') span.style.display = "inline";
			toRow.appendChild(span);
			span = document.createElement('span');
		});

		// заменить то что было на то что получилось
		str.html(toRow);
	}

	// функция для смены описания "Вперед"
	const spanRowNext = (container,str,data) => {

		// переменные
		let items        = container.find('.slider-controls__item');
		let activeItem   = items.filter('.slider-controls__item-active');
		let counter      = activeItem.index();
		let row          = data == 'title' ? sliderInfo[counter].title : sliderInfo[counter].tools; 
		let span         = document.createElement('span');
		let toRow        = document.createElement('span');
		$(toRow).addClass('example');

		// разбить строку на спаны по одному символу
		row.split('').forEach(function(item){
			span.innerHTML = item;
			if (item === ' ') span.style.display = "inline";
			toRow.appendChild(span);
			span = document.createElement('span');
		});

		// заменить то что было на то что получилось
		str.html(toRow);
	}

	// при клике на кнопку "Назад"
	btnPrev.on('click', function(e) {
		e.preventDefault();

		spanRowPrev(btnPrev,title, 'title');
		animateRow(title);
		spanRowPrev(btnPrev,tools, 'tools');
		animateRow(tools);
		setLink(btnPrev);
	});

	// при клике на кнопку "Вперед"
	btnNext.on('click', function(e) {
		e.preventDefault();

		spanRowNext(btnNext,title, 'title');
		animateRow(title);
		spanRowNext(btnNext,tools,'tools');
		animateRow(tools);
		setLink(btnNext);
	});


});