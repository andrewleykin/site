// js файл для анимации информации в слайдере

$(function() {

	// значения
	let sliderInfo = [
		{
			"title": "Cайт школы онлайн образования",
			"tools": "html, css, javascript",
			"link": "https://loftschool.com"
		},
		{
			"title": "Cайт 2",
			"tools": "html, php",
			"link": "https://ya.ru"
		},
		{
			"title": "Cайт 3",
			"tools": "jquery, react",
			"link": "https://vk.com"
		},
		{
			"title": "Cайт 4",
			"tools": "wordpress, sass",
			"link": "https://youtube.com"
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