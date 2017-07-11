// js файл для анимации информации в слайдере

$(function() {

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

	const btnPrev     = $('.slider__prev');
	const btnNext     = $('.slider__next');
	const infoBlock   = $('.slider-left__info');
	let slideInfo     = $.makeArray(sliderInfo);
	let title         = $('.slider__title');
	let tools         = $('.slider__tools');
	let link          = infoBlock.find('.slider__link');


	const setLinkPrev = (container) => {
		let items        = container.find('.slider-controls__item');
		let activeItem   = items.filter('.slider-controls__item-active');
		let counter      = activeItem.index();

		const reqLink = slideInfo[counter].link;

		link.attr('href', reqLink);

	}

	const setLinkNext = (container) => {
		let items        = container.find('.slider-controls__item');
		let activeItem   = items.filter('.slider-controls__item-active');
		let counter      = activeItem.index();

		const reqLink = slideInfo[counter].link;

		link.attr('href', reqLink);

	}


	const animateRow = (str) => {
		let time = 50,
			animate = str.find('.example').children('span');


		animate.css('opacity', 0);

		animate.each(function() {
			let $this = $(this);
			setTimeout(function () {
				$this.addClass('slider__text--animate');
			}, time);
			time = time + 50;
		});

	};

	const spanRowPrev = (container,str,data) => {
		let items        = container.find('.slider-controls__item');
		let activeItem   = items.filter('.slider-controls__item-active');
		let counter      = activeItem.index();
		let row          = data == 'title' ? sliderInfo[counter].title : sliderInfo[counter].tools; 
		let span         = document.createElement('span');
		let toRow        = document.createElement('span');
		$(toRow).addClass('example');

		row.split('').forEach(function(item){
			span.innerHTML = item;
			if (item === ' ') span.style.display = "inline";
			toRow.appendChild(span);
			span = document.createElement('span');
		});

			str.html(toRow);
	}

	const spanRowNext = (container,str,data) => {
		let items        = container.find('.slider-controls__item');
		let activeItem   = items.filter('.slider-controls__item-active');
		let counter      = activeItem.index();
		let row          = data == 'title' ? sliderInfo[counter].title : sliderInfo[counter].tools; 
		let span         = document.createElement('span');
		let toRow        = document.createElement('span');
		$(toRow).addClass('example');

		row.split('').forEach(function(item){
			span.innerHTML = item;
			if (item === ' ') span.style.display = "inline";
			toRow.appendChild(span);
			span = document.createElement('span');
		});

			str.html(toRow);
	}

	btnPrev.on('click', function(e) {
		e.preventDefault();

		spanRowPrev(btnPrev,title, 'title');
		animateRow(title);
		spanRowPrev(btnPrev,tools, 'tools');
		animateRow(tools);
		setLinkPrev(btnPrev);
	});

	btnNext.on('click', function(e) {
		e.preventDefault();

		spanRowNext(btnNext,title, 'title');
		animateRow(title);
		spanRowNext(btnNext,tools,'tools');
		animateRow(tools);
		setLinkNext(btnNext);
	});


});