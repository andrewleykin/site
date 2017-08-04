// js для меню

(function() {
  'use strict';

  // Переменные
  var link = $('.header__menu'),
      link__active= 'header__menu__active',
      list = $('.main-menu__list'),
      bg = $('.main-menu'),
      social = $('.header__social'),
      animate = 'main-menu__animate';

    // промис который будет проверять наличие ссылки(гамбургера)
    var menuPromise = new Promise (function(resolve, reject) {
      if (link.length) {
        resolve();
      } else {
        reject();
      }
    });

    // функция при наличии ссылки(гамбургера)
    menuPromise.then(function(){
      link.on('click', clickFunction);
    }).catch(function(){
      return ;
    });



  // Функция при нажатии на меню-шамбургер
  var clickFunction = function (e) {
  	e.preventDefault(); // отмена стандартных дейсвтйи

  	$(this).toggleClass(link__active); // изменяем на активное состояние

  	// Если кнопка активна то
  	if(link.hasClass(link__active)) {
  		bg.css('display', 'block').addClass(animate); // отобразить меню, и добавить класс анимации
  		setTimeout(function(){
  			social.css('opacity', '0'); // через 200 милисекунд скрыть иконки
  		},200);
    	// через 700 милисекунд отображать список меню
    	setTimeout(function(){
    		list.css('transform', 'translateY(0)');
    	},800);
    } else { // Если кнопка не активна
      bg.css('display', 'none').removeClass(animate); // скрыть меню, удалить класс анимации
      social.css('opacity', '1') // отобразить иконки
      list.css('transform', 'translateY(-100%)');
    }


  };
})();
// js для параллакс эффекта, на фоне гор
'use sctrict';

$(function(){
	// задаём общую переменную
	var svgText = document.querySelector('.js__header-text');

	// промис который будет проверять наличие svgText в page-header
	var parallaxPromise = new Promise (function(resolve, reject) {
			if (svgText) {
				resolve();
			}
		});



	// функция для parallax при скроле
	var parallax = (function () {
		var img = document.querySelector('.page-header__img');
		var user = document.querySelector('.user-block__top');

		return {
			move: function(block, windowScroll, strafeAmount) {
				var strafe = windowScroll / -strafeAmount + '%';
				var transformString = 'translate3d(0,' + strafe + ',0)';

				block.style.transform = transformString;
			},
			init: function (wScroll) {
				this.move(img, wScroll, 45);
				this.move(svgText, wScroll, 30);
				this.move(user, wScroll, 10);
			}
		}
	}());
	window.onscroll = function () {
		var wScroll = window.pageYOffset;
		if (svgText) {
				parallax.init(wScroll);
			}
		// функция при наличии svgText в page-header
		// parallaxPromise.then(function(){
		// 	parallax.init(wScroll);
		// });
	}
})


// js файл для прелоадера на любых страницах


	// задаём переменные
	var images = $('img'),
		imagesTotalCount = images.length,
		imagesLoadedCount = 0,
		percDisplay = $('.preloader__percent'),
		preloader = $('.preloader'),
		rounds = $('.preloader__rounds'),
		strokeGlobal = 450,
		strokeStart = 450,
		strokeDashoffset;

	// промис который будет проверять наличие прелоадера на странице
	var preloaderPromise = new Promise (function(resolve, reject) {
			if (preloader.length) {
				resolve();
			} else {
				reject();
			}
		});

	// функция при наличии прелоадера на странице
	preloaderPromise.then(function(){

		// цикл для перебирания всех картинок
		for (var i=0; i < imagesTotalCount; i++) {
			imageClone = new Image();
			imageClone.onload = imageLoaded;
			imageClone.onerror = imageLoaded;
			imageClone.src = images[i].src;
		}

		// функция для проверки загрузки всех картинок
		function imageLoaded() {

			// увеличиваем число загруженных картинок
			imagesLoadedCount++;

			// считаем процент загруженных
			var perc = Math.round(((100 / imagesTotalCount) * imagesLoadedCount)) + '%';
			
			// выводим наше значение процентное
			percDisplay.html(perc);

			// считаем относительное закраску обводки круга
			strokeDashoffset = strokeStart - Math.round((strokeGlobal / imagesTotalCount));

			// вычитаем стартовый отчёт
			strokeStart -= (strokeGlobal / imagesTotalCount);

			// присваиваем то что посчитали, нашему кругу свг
			rounds.css('strokeDashoffset', strokeDashoffset);

			// Если все картинки загруженны, убрать блок прелоадер
			if(imagesLoadedCount >= imagesTotalCount) {
				setTimeout(function(){
					if(!preloader.hasClass('done')){
						preloader.addClass('done');
					}
				}, 1000);
			}
			if(preloader.hasClass('done')) {
				$('.flip').addClass('flip__animation');
			}
		}
	}).catch(function(){
		return ;
		});




// js файл для валидации форм


(function( $ ){


	$(function(){

		// задаем переменные
		var form       = $('.js__form'),
				input      = form.find('.js__input'),
				btn        = form.find('.js__form-btn'),
				btnReset   = form.find('.js__form-btn--reset'),
				icon       = form.find('.js__form-icon'),
				check      = form.find('.js__check'),
				email      = form.find('.js__form-email'),
				pattern    = /^[a-z0-9_-]+@[a-z0-9-]+\.[a-z]{2,6}$/i,
				valid      = true,
				inputError = 'form__input--error',
				inputSuccess = 'form__input--success',
				iconError    = 'form__icon--error',
				iconSuccess  = 'form__icon--success';

		// функция валидация формы
		var validFunc = function () {

			// проверяем каждый input
			input.each(function(i) {

				// проверяем условие, есть ли в поле что-нидь
				if($(this).val() != '') {
					$(this).addClass(inputSuccess); 
					icon.eq(i).addClass(iconSuccess);
					btn.removeClass('js__form-no-submit');
				} else {
					$(this).addClass(inputError);
					icon.eq(i).addClass(iconError);
					btn.addClass('js__form-no-submit');
				}

			}); // --> заканчиваем проверять инпуты


			// условия наличия чек-инпутов
			if(check) {

				// проверяем каждый чек-инпут
				check.each(function() {

					// проверяем условие, выбран ли инпут
					if($(this).prop("checked")){
						valid = true;
					} else {
						valid = false;
					}
					return valid;
				});

				return valid;
			}


			return valid;
		} // --> validFunc is end


		// функция для проверки email
		var emailFunc= function () {

			// проверяем условие, есть ли что-нидь в нём
			if (email.val() != '') {

					// проверяем, соответствует ли шаблону email
					if(email.val().search(pattern) == 0){
						email.addClass(inputSuccess);
						valid = true;
					} else {
						email.addClass(inputError);
						valid = false;
					}
				} else {
					email.addClass(inputError);
					valid = false
				}


			return valid;
		} // --> emailFunc is end


		// функция для email, когда покидашь инпут
		email.blur(function() {

			// проверяем email, на наличие чего-нидь
			if (email.val() != '') {

				// соответствует ли нашему шаблону
				if(email.val().search(pattern) == 0){
					email.addClass(inputSuccess);
					valid = true;
				} else {
					email.addClass(inputError);
					valid = false
				}
			} else {
				email.addClass(inputError);
				valid = false
			}

		});


		// проверяем каждый инпут
		input.each(function(i) {

			// для каждого инпута при покидании поля
			$(this).blur(function() {

				// проверяем наличие чего-либо
				if($(this).val() != '') {
					$(this).addClass(inputSuccess);
					icon.eq(i).addClass(iconSuccess);
					btn.removeClass('js__form-no-submit')
				} else {
					$(this).addClass(inputError);
					icon.eq(i).addClass(iconError);
					btn.addClass('js__form-no-submit');
				}
			});

		});


		// при клике на кнопку отправки
		btn.click(function(e) {

			e.preventDefault();
			validFunc();

			// если есть email
			if(email) {
				emailFunc();
			}

			// проверять условие есть ли класс
			if(btn.hasClass('js__form-no-submit')) {
				return false;
			} else {
				form.submit();
			}

		});


		// при клике на кнопку "очистить"
		btnReset.click(function() {
			input.add(email).removeClass(inputError, inputSuccess);
			icon.removeClass(iconError, iconSuccess);
		});


	}); // --> ready end

})( jQuery );
// js для скролла вниз или вверх
'use sctrict';

$(function (){

	// задаём переменные
	var body = $('body, html'),
		arrowDown = $('.js__arrow-down'),
		arrowUp = $('.js__arrow-up'),
		headerHeight = $('.js__header').height();

	// проверяем наличие стрелки -- вниз
	if(arrowDown){
		// функция при нажатии
		arrowDown.click(function(){
			// анимация скролла
			body.animate({scrollTop: headerHeight}, 1500);
		});
	}

	// проверяем наличе стрелки -- вверх
	if(arrowUp) {
		// функция при нажатии
		arrowUp.click(function() {
			// анимация скролла
			body.animate({scrollTop: 0}, 2500);
		});
	}

});

// js для index-parallax

$(function(){

	// задаём переменные
	var parallaxContainer = $('.parallax'),
		layers = $('.parallax__layer');


	// промис который будет проверять наличие Главного параллакса на странице
	var parallaxPromise = new Promise (function(resolve, reject) {
			if (parallaxContainer.length) {
				resolve();
			} else {
				reject();
			}
		});

	// функция при наличии главного параллакса
	parallaxPromise.then(function(){
		window.addEventListener('mousemove', moveLayers);
	}).catch(function(){
		return ;
		});

	// функция для движения слоёв
	var moveLayers = function (e) {
		var initialX = (window.innerWidth / 2) - e.pageX,
			initialY = (window.innerHeight / 2) - e.pageY;

		[].slice.call(layers).forEach(function(layer, index) {
			var divider = index / 100,
				positionX = initialX * divider,
				positionY = initialY * divider,
				transformString = 'translate(' + positionX + 'px,' + positionY + 'px)';

			layer.style.transform = transformString;
		});
	};
});
// Flip эффект

$(function(){

	// задаём переменные
	var link = $('.btn-autho__link'),
		box = $('.flip'),
		mainLink = $('.login__link'); 

	// промис который будет проверять наличие флип котейнера на странице
	var flipPromise = new Promise (function(resolve, reject) {
			if (box.length) {
				resolve();
			} else {
				reject();
			}
		});

	// функция при наличии флип контейнере
	flipPromise.then(function() {

		// при клике, флип контенейру добавить класс с поворотом
		link.click(function(e) {
			e.preventDefault(); // отмена стандартных дейсвтйи

			link.css('opacity', '0');
			box.toggleClass('js__flip');
		});

		// при клике  на "На главную", удалить класс поворота, тем самым развернув контейнер
		mainLink.click(function(e) {
			e.preventDefault(); // отмена стандартных дейсвтйи

			link.css('opacity', '1');
			box.removeClass('js__flip');
		});

		// разворачивать блок при нажатии на Esc
		$('body').keyup(function(e) {
			if(box.hasClass('js__flip')) {
				if(e.which==27) {
					link.css('opacity', '1');
					box.removeClass('js__flip');
				}
			}
		});

		// при клике на область вокруг блока, разворачивать блок
		$('.parallax').click(function() {
			if(box.hasClass('js__flip')) {
				link.css('opacity', '1');
				box.removeClass('js__flip');
			}
		});
	}).catch(function(){
			return ;
		});

});
// js файл для анимации появления flip


(function(){

	// переменные
	var flip = $('.flip'),
		flipAnimation = 'flip__animation';

	// условие проверяющее наличие Флип контейнера на странице
	if(flip.length) {

		// при загрузке странице
		$(window).on('load',() =>{

			//с задержкой 1 сек
			setTimeout(()=>{

				// добавить класс с анимацией
				flip.addClass(flipAnimation);
			}, 1000);

		});

	}

}());
// js для Липкого сайдбара на странице Блог

(function() {

    // задаем переменные
    var sidebar = $('.sidebar'),
        sidebarFix = 'sidebar__fixed',
        btnSidebar = $('.sidebar__show'),
        btnSidebarShow = 'js__sidebar-show',
        scrollHeight = 620;

    // промис который будет проверять наличие Сайдбара на странице
    var sidebarPromise = new Promise (function(resolve, reject) {
        if (sidebar.length) {
            resolve();
        } else {
            reject();
        }
    });

    // функция при наличии сайдбара
    sidebarPromise.then(function () {
        $(window).scroll(function() {

            /* если скролл больше заданной высоты, то добавить класс */
            if($(this).scrollTop() > scrollHeight){
                sidebar.addClass(sidebarFix);
                btnSidebar.addClass(btnSidebarShow);
            } else if ($(this).scrollTop() < scrollHeight) {
                sidebar.removeClass(sidebarFix);
                btnSidebar.removeClass(btnSidebarShow);
            }
        });
    }).catch(function(){
        return ;
    });

})();
// js для навигации на странице Блог

(function() {

	// переменные
	var link = $('.sidebar__link'),
		item = $('.write__item');

	$(function(){

		// промис который будет проверять наличие Сайдбара на странице
		var navSidebarPromise = new Promise (function(resolve, reject) {
			if (link.length) {
				resolve();
			} else {
				reject();
			}
		});

		// функция при наличии сайдбара
		navSidebarPromise.then(function() {
			link.click(function(e) {
				e.preventDefault();

				showArticle($(this).attr('href'), true);
			});
		}).catch(function(){
			return ;
		});


	});

	// при скролле вызывать функцию checkArticle
	$(window).scroll(function() {
		checkArticle();
	});


	// функция для скролла к нужному элементу
	function showArticle(article, isAnimate) {
		var direction = article.replace(/#/, ''),
			reqArticle = item.filter('[data-article="' + direction + '"]'),
			reqArticlePos = reqArticle.offset().top;

		if (isAnimate) {
			$('body, html').animate({scrollTop: reqArticlePos}, 500);
		}
	}

	// функция для автоматическего переключения класса active у ссылок
	function checkArticle() {
		item.each(function() {
			var $this = $(this),
				topEdge = $this.offset().top - 150,
				bottomEdge = topEdge + $this.height(),
				wScroll = $(window).scrollTop();

			if (topEdge < wScroll && bottomEdge > wScroll) {
				var currentId = $this.data('article'),
					reqLink = link.filter('[href="#' + currentId + '"]');

					link.removeClass('sidebar__link--active');
					reqLink.addClass('sidebar__link--active');
			}
		});
	}


})(); 
// js функция для показа sidebar


$(function () {

	// переменные
	var btn = $('.js__btn-sidebar'),
		sidebar = $('.sidebar'),
		otherContent = $('.write'),
		flag = true;

	// при клике на кнопку показывать или скрывать сайдбар
	btn.click(function() {
		if (flag == true) {
			sidebar.css('transform', 'translateX(100%)');
			flag = false;
		} else  {
			sidebar.removeAttr('style');
			flag = true;
		}
	});

	// если сайдбар показан, при клике на другой контент убрать сайдбар
	otherContent.click(function() {
		if (flag == false) {
			sidebar.removeAttr('style');
			flag = true;
		}
	});

	// если сайдбар показан, при клике на клавишу Esc убрать сайдбар
	$('body').keyup(function(e) {
		if(e.which == 27) {
			sidebar.removeAttr('style');
			flag = true;
		}
	});



});
// js файл для анимации кругов скиллов

$(function(){
	// переменная блоки скиллов
	var elem = $('.skills__items-wrap');

	// промис который будет проверять наличие блока скиллов
	var skillsPromise = new Promise (function(resolve, reject) {
		if (elem.length) {
		resolve();
		} else {
		reject();
		}
	});

	// функция при наличии блока скиллов
	skillsPromise.then(function(){
		// при скролле 
		$(window).scroll(function() {
			var scrollTop = $(window).scrollTop();

			/* если функция checkDistance вернула return то, добавить класс / иначе удалить */
			if(checkDistance(scrollTop)) {
				elem.addClass('js__circle-animate');
			} else {
				elem.removeClass('js__circle-animate');
			}
		});
	}).catch(function(){
		return ;
	});

	// функция для проверки позиции элемента
	var checkDistance = function(scrollTop) {
		var offset = elem.offset().top,
			windowMargin = Math.ceil($(window).height() / 3),
			topBorder = offset - scrollTop - windowMargin - 100,
			bottomEdge = elem.outerHeight(true) + offset,
			bottomBorder = scrollTop + windowMargin - bottomEdge;

			return topBorder <= 0 && bottomBorder <= 0
	}


});
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
// Библиотека svg4everybody для svg

$(function(){
	svg4everybody();
})
// js файл для карты

$(function() {
    google.maps.event.addDomListener(window, 'load', init);
    var map, markersArray = [];

    function bindInfoWindow(marker, map, location) {
        google.maps.event.addListener(marker, 'click', function() {
            function close(location) {
                location.ib.close();
                location.infoWindowVisible = false;
                location.ib = null;
            }

            if (location.infoWindowVisible === true) {
                close(location);
            } else {
                markersArray.forEach(function(loc, index){
                    if (loc.ib && loc.ib !== null) {
                        close(loc);
                    }
                });

                var boxText = document.createElement('div');
                boxText.style.cssText = 'background: #fff;';
                boxText.classList.add('md-whiteframe-2dp');

                function buildPieces(location, el, part, icon) {
                    if (location[part] === '') {
                        return '';
                    } else if (location.iw[part]) {
                        switch(el){
                            case 'photo':
                                if (location.photo){
                                    return '<div class="iw-photo" style="background-image: url(' + location.photo + ');"></div>';
                                 } else {
                                    return '';
                                }
                                break;
                            case 'iw-toolbar':
                                return '<div class="iw-toolbar"><h3 class="md-subhead">' + location.title + '</h3></div>';
                                break;
                            case 'div':
                                switch(part){
                                    case 'email':
                                        return '<div class="iw-details"><i class="material-icons" style="color:#4285f4;"><img src="//cdn.mapkit.io/v1/icons/' + icon + '.svg"/></i><span><a href="mailto:' + location.email + '" target="_blank">' + location.email + '</a></span></div>';
                                        break;
                                    case 'web':
                                        return '<div class="iw-details"><i class="material-icons" style="color:#4285f4;"><img src="//cdn.mapkit.io/v1/icons/' + icon + '.svg"/></i><span><a href="' + location.web + '" target="_blank">' + location.web_formatted + '</a></span></div>';
                                        break;
                                    case 'desc':
                                        return '<label class="iw-desc" for="cb_details"><input type="checkbox" id="cb_details"/><h3 class="iw-x-details">Details</h3><i class="material-icons toggle-open-details"><img src="//cdn.mapkit.io/v1/icons/' + icon + '.svg"/></i><p class="iw-x-details">' + location.desc + '</p></label>';
                                        break;
                                    default:
                                        return '<div class="iw-details"><i class="material-icons"><img src="//cdn.mapkit.io/v1/icons/' + icon + '.svg"/></i><span>' + location[part] + '</span></div>';
                                    break;
                                }
                                break;
                            case 'open_hours':
                                var items = '';
                                if (location.open_hours.length > 0){
                                    for (var i = 0; i < location.open_hours.length; ++i) {
                                        if (i !== 0){
                                            items += '<li><strong>' + location.open_hours[i].day + '</strong><strong>' + location.open_hours[i].hours +'</strong></li>';
                                        }
                                        var first = '<li><label for="cb_hours"><input type="checkbox" id="cb_hours"/><strong>' + location.open_hours[0].day + '</strong><strong>' + location.open_hours[0].hours +'</strong><i class="material-icons toggle-open-hours"><img src="//cdn.mapkit.io/v1/icons/keyboard_arrow_down.svg"/></i><ul>' + items + '</ul></label></li>';
                                    }
                                    return '<div class="iw-list"><i class="material-icons first-material-icons" style="color:#4285f4;"><img src="//cdn.mapkit.io/v1/icons/' + icon + '.svg"/></i><ul>' + first + '</ul></div>';
                                 } else {
                                    return '';
                                }
                                break;
                         }
                    } else {
                        return '';
                    }
                }

                boxText.innerHTML = 
                    buildPieces(location, 'photo', 'photo', '') +
                    buildPieces(location, 'iw-toolbar', 'title', '') +
                    buildPieces(location, 'div', 'address', 'location_on') +
                    buildPieces(location, 'div', 'web', 'public') +
                    buildPieces(location, 'div', 'email', 'email') +
                    buildPieces(location, 'div', 'tel', 'phone') +
                    buildPieces(location, 'div', 'int_tel', 'phone') +
                    buildPieces(location, 'open_hours', 'open_hours', 'access_time') +
                    buildPieces(location, 'div', 'desc', 'keyboard_arrow_down');

                var myOptions = {
                    alignBottom: true,
                    content: boxText,
                    disableAutoPan: true,
                    maxWidth: 0,
                    pixelOffset: new google.maps.Size(-140, -40),
                    zIndex: null,
                    boxStyle: {
                        opacity: 1,
                        width: '280px'
                    },
                    closeBoxMargin: '0px 0px 0px 0px',
                    infoBoxClearance: new google.maps.Size(1, 1),
                    isHidden: false,
                    pane: 'floatPane',
                    enableEventPropagation: false
                };

                location.ib = new InfoBox(myOptions);
                location.ib.open(map, marker);
                location.infoWindowVisible = true;
            }
        });
    }

    function init() {
        var mapOptions = {
            center: new google.maps.LatLng(55.748358112720375,52.35417588749998),
            zoom: 13,
            gestureHandling: 'cooperative',
            fullscreenControl: false,
            zoomControl: true,
            disableDoubleClickZoom: true,
            mapTypeControl: true,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            },
            scaleControl: false,
            scrollwheel: false,
            streetViewControl: false,
            draggable : true,
            clickableIcons: true,
            zoomControlOptions: {
                position: google.maps.ControlPosition.RIGHT_CENTER
            },
            mapTypeControlOptions: {
                position: google.maps.ControlPosition.RIGHT_TOP
            },
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: [{"featureType":"water","stylers":[{"color":"#46bcec"},{"visibility":"on"}]},{"featureType":"landscape","stylers":[{"color":"#f2f2f2"}]},{"featureType":"road","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]}]
        }
        var mapElement = document.getElementById('map');
        var map = new google.maps.Map(mapElement, mapOptions);
        var locations = [
            {"title":"ANDREW","tel":"+7(951)896-42-44","email":"katashi1328@mail.ru","web":"https://andrewleykin.github.io/portfolio/build/","web_formatted":"andrewleykin.github.io","lat":55.734705704592805,"lng":52.397515020762626,"vicinity":"","marker":{"fillColor":"#00ACC1","fillOpacity":1,"strokeWeight":0,"scale":1.5,"path":"M10.2,7.4c-6,0-10.9,4.9-10.9,10.9c0,6,10.9,18.4,10.9,18.4s10.9-12.3,10.9-18.4C21.2,12.2,16.3,7.4,10.2,7.4z M10.2,22.9c-2.6,0-4.6-2.1-4.6-4.6s2.1-4.6,4.6-4.6s4.6,2.1,4.6,4.6S12.8,22.9,10.2,22.9z","anchor":{"x":10,"y":30},"origin":{"x":0,"y":0},"style":1},"iw":{"tel":true,"web":true,"email":true}}
        ];
        for (i = 0; i < locations.length; i++) {
            marker = new google.maps.Marker({
                icon: locations[i].marker,
                position: new google.maps.LatLng(locations[i].lat, locations[i].lng),

                map: map,
                title: locations[i].title,
                address: locations[i].address,
                desc: locations[i].desc,
                tel: locations[i].tel,
                int_tel: locations[i].int_tel,
                vicinity: locations[i].vicinity,
                open: locations[i].open,
                open_hours: locations[i].open_hours,
                photo: locations[i].photo,
                time: locations[i].time,
                email: locations[i].email,
                web: locations[i].web,
                iw: locations[i].iw
            });
            markersArray.push(marker);

            if (locations[i].iw.enable === true){
                bindInfoWindow(marker, map, locations[i]);
            }
        }
    }



}); 

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lbnUuanMiLCJwYXJhbGxheC5qcyIsInByZWxvYWRlci5qcyIsInZhbGlkYXRlLmpzIiwic2Nyb2xsLmpzIiwiaW5kZXgtcGFyYWxsYXguanMiLCJmbGlwLmpzIiwiZmxpcF9fc2hvdy5qcyIsInN0aWNreS1zaWRlYmFyLmpzIiwibmF2LXNpZGViYXIuanMiLCJzaWRlYmFyX19zaG93LmpzIiwiY2lyY2xlLWFuaW1hdGUuanMiLCJzbGlkZXJfX2NvbnRyb2xzLmpzIiwic2xpZGVyX19kaXNwbGF5LmpzIiwic2xpZGVyX19pbmZvLmpzIiwic3ZnNGV2ZXJ5Ym9keS5qcyIsIm1hcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBqcyDQtNC70Y8g0LzQtdC90Y5cclxuXHJcbihmdW5jdGlvbigpIHtcclxuICAndXNlIHN0cmljdCc7XHJcblxyXG4gIC8vINCf0LXRgNC10LzQtdC90L3Ri9C1XHJcbiAgdmFyIGxpbmsgPSAkKCcuaGVhZGVyX19tZW51JyksXHJcbiAgICAgIGxpbmtfX2FjdGl2ZT0gJ2hlYWRlcl9fbWVudV9fYWN0aXZlJyxcclxuICAgICAgbGlzdCA9ICQoJy5tYWluLW1lbnVfX2xpc3QnKSxcclxuICAgICAgYmcgPSAkKCcubWFpbi1tZW51JyksXHJcbiAgICAgIHNvY2lhbCA9ICQoJy5oZWFkZXJfX3NvY2lhbCcpLFxyXG4gICAgICBhbmltYXRlID0gJ21haW4tbWVudV9fYW5pbWF0ZSc7XHJcblxyXG4gICAgLy8g0L/RgNC+0LzQuNGBINC60L7RgtC+0YDRi9C5INCx0YPQtNC10YIg0L/RgNC+0LLQtdGA0Y/RgtGMINC90LDQu9C40YfQuNC1INGB0YHRi9C70LrQuCjQs9Cw0LzQsdGD0YDQs9C10YDQsClcclxuICAgIHZhciBtZW51UHJvbWlzZSA9IG5ldyBQcm9taXNlIChmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgaWYgKGxpbmsubGVuZ3RoKSB7XHJcbiAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlamVjdCgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyDRhNGD0L3QutGG0LjRjyDQv9GA0Lgg0L3QsNC70LjRh9C40Lgg0YHRgdGL0LvQutC4KNCz0LDQvNCx0YPRgNCz0LXRgNCwKVxyXG4gICAgbWVudVByb21pc2UudGhlbihmdW5jdGlvbigpe1xyXG4gICAgICBsaW5rLm9uKCdjbGljaycsIGNsaWNrRnVuY3Rpb24pO1xyXG4gICAgfSkuY2F0Y2goZnVuY3Rpb24oKXtcclxuICAgICAgcmV0dXJuIDtcclxuICAgIH0pO1xyXG5cclxuXHJcblxyXG4gIC8vINCk0YPQvdC60YbQuNGPINC/0YDQuCDQvdCw0LbQsNGC0LjQuCDQvdCwINC80LXQvdGOLdGI0LDQvNCx0YPRgNCz0LXRgFxyXG4gIHZhciBjbGlja0Z1bmN0aW9uID0gZnVuY3Rpb24gKGUpIHtcclxuICBcdGUucHJldmVudERlZmF1bHQoKTsgLy8g0L7RgtC80LXQvdCwINGB0YLQsNC90LTQsNGA0YLQvdGL0YUg0LTQtdC50YHQstGC0LnQuFxyXG5cclxuICBcdCQodGhpcykudG9nZ2xlQ2xhc3MobGlua19fYWN0aXZlKTsgLy8g0LjQt9C80LXQvdGP0LXQvCDQvdCwINCw0LrRgtC40LLQvdC+0LUg0YHQvtGB0YLQvtGP0L3QuNC1XHJcblxyXG4gIFx0Ly8g0JXRgdC70Lgg0LrQvdC+0L/QutCwINCw0LrRgtC40LLQvdCwINGC0L5cclxuICBcdGlmKGxpbmsuaGFzQ2xhc3MobGlua19fYWN0aXZlKSkge1xyXG4gIFx0XHRiZy5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKS5hZGRDbGFzcyhhbmltYXRlKTsgLy8g0L7RgtC+0LHRgNCw0LfQuNGC0Ywg0LzQtdC90Y4sINC4INC00L7QsdCw0LLQuNGC0Ywg0LrQu9Cw0YHRgSDQsNC90LjQvNCw0YbQuNC4XHJcbiAgXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICBcdFx0XHRzb2NpYWwuY3NzKCdvcGFjaXR5JywgJzAnKTsgLy8g0YfQtdGA0LXQtyAyMDAg0LzQuNC70LjRgdC10LrRg9C90LQg0YHQutGA0YvRgtGMINC40LrQvtC90LrQuFxyXG4gIFx0XHR9LDIwMCk7XHJcbiAgICBcdC8vINGH0LXRgNC10LcgNzAwINC80LjQu9C40YHQtdC60YPQvdC0INC+0YLQvtCx0YDQsNC20LDRgtGMINGB0L/QuNGB0L7QuiDQvNC10L3RjlxyXG4gICAgXHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICBcdFx0bGlzdC5jc3MoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGVZKDApJyk7XHJcbiAgICBcdH0sODAwKTtcclxuICAgIH0gZWxzZSB7IC8vINCV0YHQu9C4INC60L3QvtC/0LrQsCDQvdC1INCw0LrRgtC40LLQvdCwXHJcbiAgICAgIGJnLmNzcygnZGlzcGxheScsICdub25lJykucmVtb3ZlQ2xhc3MoYW5pbWF0ZSk7IC8vINGB0LrRgNGL0YLRjCDQvNC10L3Rjiwg0YPQtNCw0LvQuNGC0Ywg0LrQu9Cw0YHRgSDQsNC90LjQvNCw0YbQuNC4XHJcbiAgICAgIHNvY2lhbC5jc3MoJ29wYWNpdHknLCAnMScpIC8vINC+0YLQvtCx0YDQsNC30LjRgtGMINC40LrQvtC90LrQuFxyXG4gICAgICBsaXN0LmNzcygndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZVkoLTEwMCUpJyk7XHJcbiAgICB9XHJcblxyXG5cclxuICB9O1xyXG59KSgpOyIsIi8vIGpzINC00LvRjyDQv9Cw0YDQsNC70LvQsNC60YEg0Y3RhNGE0LXQutGC0LAsINC90LAg0YTQvtC90LUg0LPQvtGAXHJcbid1c2Ugc2N0cmljdCc7XHJcblxyXG4kKGZ1bmN0aW9uKCl7XHJcblx0Ly8g0LfQsNC00LDRkdC8INC+0LHRidGD0Y4g0L/QtdGA0LXQvNC10L3QvdGD0Y5cclxuXHR2YXIgc3ZnVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qc19faGVhZGVyLXRleHQnKTtcclxuXHJcblx0Ly8g0L/RgNC+0LzQuNGBINC60L7RgtC+0YDRi9C5INCx0YPQtNC10YIg0L/RgNC+0LLQtdGA0Y/RgtGMINC90LDQu9C40YfQuNC1IHN2Z1RleHQg0LIgcGFnZS1oZWFkZXJcclxuXHR2YXIgcGFyYWxsYXhQcm9taXNlID0gbmV3IFByb21pc2UgKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cdFx0XHRpZiAoc3ZnVGV4dCkge1xyXG5cdFx0XHRcdHJlc29sdmUoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cclxuXHJcblx0Ly8g0YTRg9C90LrRhtC40Y8g0LTQu9GPIHBhcmFsbGF4INC/0YDQuCDRgdC60YDQvtC70LVcclxuXHR2YXIgcGFyYWxsYXggPSAoZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIGltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdlLWhlYWRlcl9faW1nJyk7XHJcblx0XHR2YXIgdXNlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51c2VyLWJsb2NrX190b3AnKTtcclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRtb3ZlOiBmdW5jdGlvbihibG9jaywgd2luZG93U2Nyb2xsLCBzdHJhZmVBbW91bnQpIHtcclxuXHRcdFx0XHR2YXIgc3RyYWZlID0gd2luZG93U2Nyb2xsIC8gLXN0cmFmZUFtb3VudCArICclJztcclxuXHRcdFx0XHR2YXIgdHJhbnNmb3JtU3RyaW5nID0gJ3RyYW5zbGF0ZTNkKDAsJyArIHN0cmFmZSArICcsMCknO1xyXG5cclxuXHRcdFx0XHRibG9jay5zdHlsZS50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1TdHJpbmc7XHJcblx0XHRcdH0sXHJcblx0XHRcdGluaXQ6IGZ1bmN0aW9uICh3U2Nyb2xsKSB7XHJcblx0XHRcdFx0dGhpcy5tb3ZlKGltZywgd1Njcm9sbCwgNDUpO1xyXG5cdFx0XHRcdHRoaXMubW92ZShzdmdUZXh0LCB3U2Nyb2xsLCAzMCk7XHJcblx0XHRcdFx0dGhpcy5tb3ZlKHVzZXIsIHdTY3JvbGwsIDEwKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0oKSk7XHJcblx0d2luZG93Lm9uc2Nyb2xsID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIHdTY3JvbGwgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XHJcblx0XHRpZiAoc3ZnVGV4dCkge1xyXG5cdFx0XHRcdHBhcmFsbGF4LmluaXQod1Njcm9sbCk7XHJcblx0XHRcdH1cclxuXHRcdC8vINGE0YPQvdC60YbQuNGPINC/0YDQuCDQvdCw0LvQuNGH0LjQuCBzdmdUZXh0INCyIHBhZ2UtaGVhZGVyXHJcblx0XHQvLyBwYXJhbGxheFByb21pc2UudGhlbihmdW5jdGlvbigpe1xyXG5cdFx0Ly8gXHRwYXJhbGxheC5pbml0KHdTY3JvbGwpO1xyXG5cdFx0Ly8gfSk7XHJcblx0fVxyXG59KVxyXG5cclxuIiwiLy8ganMg0YTQsNC50Lsg0LTQu9GPINC/0YDQtdC70L7QsNC00LXRgNCwINC90LAg0LvRjtCx0YvRhSDRgdGC0YDQsNC90LjRhtCw0YVcclxuXHJcblxyXG5cdC8vINC30LDQtNCw0ZHQvCDQv9C10YDQtdC80LXQvdC90YvQtVxyXG5cdHZhciBpbWFnZXMgPSAkKCdpbWcnKSxcclxuXHRcdGltYWdlc1RvdGFsQ291bnQgPSBpbWFnZXMubGVuZ3RoLFxyXG5cdFx0aW1hZ2VzTG9hZGVkQ291bnQgPSAwLFxyXG5cdFx0cGVyY0Rpc3BsYXkgPSAkKCcucHJlbG9hZGVyX19wZXJjZW50JyksXHJcblx0XHRwcmVsb2FkZXIgPSAkKCcucHJlbG9hZGVyJyksXHJcblx0XHRyb3VuZHMgPSAkKCcucHJlbG9hZGVyX19yb3VuZHMnKSxcclxuXHRcdHN0cm9rZUdsb2JhbCA9IDQ1MCxcclxuXHRcdHN0cm9rZVN0YXJ0ID0gNDUwLFxyXG5cdFx0c3Ryb2tlRGFzaG9mZnNldDtcclxuXHJcblx0Ly8g0L/RgNC+0LzQuNGBINC60L7RgtC+0YDRi9C5INCx0YPQtNC10YIg0L/RgNC+0LLQtdGA0Y/RgtGMINC90LDQu9C40YfQuNC1INC/0YDQtdC70L7QsNC00LXRgNCwINC90LAg0YHRgtGA0LDQvdC40YbQtVxyXG5cdHZhciBwcmVsb2FkZXJQcm9taXNlID0gbmV3IFByb21pc2UgKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cdFx0XHRpZiAocHJlbG9hZGVyLmxlbmd0aCkge1xyXG5cdFx0XHRcdHJlc29sdmUoKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZWplY3QoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdC8vINGE0YPQvdC60YbQuNGPINC/0YDQuCDQvdCw0LvQuNGH0LjQuCDQv9GA0LXQu9C+0LDQtNC10YDQsCDQvdCwINGB0YLRgNCw0L3QuNGG0LVcclxuXHRwcmVsb2FkZXJQcm9taXNlLnRoZW4oZnVuY3Rpb24oKXtcclxuXHJcblx0XHQvLyDRhtC40LrQuyDQtNC70Y8g0L/QtdGA0LXQsdC40YDQsNC90LjRjyDQstGB0LXRhSDQutCw0YDRgtC40L3QvtC6XHJcblx0XHRmb3IgKHZhciBpPTA7IGkgPCBpbWFnZXNUb3RhbENvdW50OyBpKyspIHtcclxuXHRcdFx0aW1hZ2VDbG9uZSA9IG5ldyBJbWFnZSgpO1xyXG5cdFx0XHRpbWFnZUNsb25lLm9ubG9hZCA9IGltYWdlTG9hZGVkO1xyXG5cdFx0XHRpbWFnZUNsb25lLm9uZXJyb3IgPSBpbWFnZUxvYWRlZDtcclxuXHRcdFx0aW1hZ2VDbG9uZS5zcmMgPSBpbWFnZXNbaV0uc3JjO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vINGE0YPQvdC60YbQuNGPINC00LvRjyDQv9GA0L7QstC10YDQutC4INC30LDQs9GA0YPQt9C60Lgg0LLRgdC10YUg0LrQsNGA0YLQuNC90L7QulxyXG5cdFx0ZnVuY3Rpb24gaW1hZ2VMb2FkZWQoKSB7XHJcblxyXG5cdFx0XHQvLyDRg9Cy0LXQu9C40YfQuNCy0LDQtdC8INGH0LjRgdC70L4g0LfQsNCz0YDRg9C20LXQvdC90YvRhSDQutCw0YDRgtC40L3QvtC6XHJcblx0XHRcdGltYWdlc0xvYWRlZENvdW50Kys7XHJcblxyXG5cdFx0XHQvLyDRgdGH0LjRgtCw0LXQvCDQv9GA0L7RhtC10L3RgiDQt9Cw0LPRgNGD0LbQtdC90L3Ri9GFXHJcblx0XHRcdHZhciBwZXJjID0gTWF0aC5yb3VuZCgoKDEwMCAvIGltYWdlc1RvdGFsQ291bnQpICogaW1hZ2VzTG9hZGVkQ291bnQpKSArICclJztcclxuXHRcdFx0XHJcblx0XHRcdC8vINCy0YvQstC+0LTQuNC8INC90LDRiNC1INC30L3QsNGH0LXQvdC40LUg0L/RgNC+0YbQtdC90YLQvdC+0LVcclxuXHRcdFx0cGVyY0Rpc3BsYXkuaHRtbChwZXJjKTtcclxuXHJcblx0XHRcdC8vINGB0YfQuNGC0LDQtdC8INC+0YLQvdC+0YHQuNGC0LXQu9GM0L3QvtC1INC30LDQutGA0LDRgdC60YMg0L7QsdCy0L7QtNC60Lgg0LrRgNGD0LPQsFxyXG5cdFx0XHRzdHJva2VEYXNob2Zmc2V0ID0gc3Ryb2tlU3RhcnQgLSBNYXRoLnJvdW5kKChzdHJva2VHbG9iYWwgLyBpbWFnZXNUb3RhbENvdW50KSk7XHJcblxyXG5cdFx0XHQvLyDQstGL0YfQuNGC0LDQtdC8INGB0YLQsNGA0YLQvtCy0YvQuSDQvtGC0YfRkdGCXHJcblx0XHRcdHN0cm9rZVN0YXJ0IC09IChzdHJva2VHbG9iYWwgLyBpbWFnZXNUb3RhbENvdW50KTtcclxuXHJcblx0XHRcdC8vINC/0YDQuNGB0LLQsNC40LLQsNC10Lwg0YLQviDRh9GC0L4g0L/QvtGB0YfQuNGC0LDQu9C4LCDQvdCw0YjQtdC80YMg0LrRgNGD0LPRgyDRgdCy0LNcclxuXHRcdFx0cm91bmRzLmNzcygnc3Ryb2tlRGFzaG9mZnNldCcsIHN0cm9rZURhc2hvZmZzZXQpO1xyXG5cclxuXHRcdFx0Ly8g0JXRgdC70Lgg0LLRgdC1INC60LDRgNGC0LjQvdC60Lgg0LfQsNCz0YDRg9C20LXQvdC90YssINGD0LHRgNCw0YLRjCDQsdC70L7QuiDQv9GA0LXQu9C+0LDQtNC10YBcclxuXHRcdFx0aWYoaW1hZ2VzTG9hZGVkQ291bnQgPj0gaW1hZ2VzVG90YWxDb3VudCkge1xyXG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdGlmKCFwcmVsb2FkZXIuaGFzQ2xhc3MoJ2RvbmUnKSl7XHJcblx0XHRcdFx0XHRcdHByZWxvYWRlci5hZGRDbGFzcygnZG9uZScpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0sIDEwMDApO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmKHByZWxvYWRlci5oYXNDbGFzcygnZG9uZScpKSB7XHJcblx0XHRcdFx0JCgnLmZsaXAnKS5hZGRDbGFzcygnZmxpcF9fYW5pbWF0aW9uJyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9KS5jYXRjaChmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIDtcclxuXHRcdH0pO1xyXG5cclxuXHJcblxyXG4iLCIvLyBqcyDRhNCw0LnQuyDQtNC70Y8g0LLQsNC70LjQtNCw0YbQuNC4INGE0L7RgNC8XHJcblxyXG5cclxuKGZ1bmN0aW9uKCAkICl7XHJcblxyXG5cclxuXHQkKGZ1bmN0aW9uKCl7XHJcblxyXG5cdFx0Ly8g0LfQsNC00LDQtdC8INC/0LXRgNC10LzQtdC90L3Ri9C1XHJcblx0XHR2YXIgZm9ybSAgICAgICA9ICQoJy5qc19fZm9ybScpLFxyXG5cdFx0XHRcdGlucHV0ICAgICAgPSBmb3JtLmZpbmQoJy5qc19faW5wdXQnKSxcclxuXHRcdFx0XHRidG4gICAgICAgID0gZm9ybS5maW5kKCcuanNfX2Zvcm0tYnRuJyksXHJcblx0XHRcdFx0YnRuUmVzZXQgICA9IGZvcm0uZmluZCgnLmpzX19mb3JtLWJ0bi0tcmVzZXQnKSxcclxuXHRcdFx0XHRpY29uICAgICAgID0gZm9ybS5maW5kKCcuanNfX2Zvcm0taWNvbicpLFxyXG5cdFx0XHRcdGNoZWNrICAgICAgPSBmb3JtLmZpbmQoJy5qc19fY2hlY2snKSxcclxuXHRcdFx0XHRlbWFpbCAgICAgID0gZm9ybS5maW5kKCcuanNfX2Zvcm0tZW1haWwnKSxcclxuXHRcdFx0XHRwYXR0ZXJuICAgID0gL15bYS16MC05Xy1dK0BbYS16MC05LV0rXFwuW2Etel17Miw2fSQvaSxcclxuXHRcdFx0XHR2YWxpZCAgICAgID0gdHJ1ZSxcclxuXHRcdFx0XHRpbnB1dEVycm9yID0gJ2Zvcm1fX2lucHV0LS1lcnJvcicsXHJcblx0XHRcdFx0aW5wdXRTdWNjZXNzID0gJ2Zvcm1fX2lucHV0LS1zdWNjZXNzJyxcclxuXHRcdFx0XHRpY29uRXJyb3IgICAgPSAnZm9ybV9faWNvbi0tZXJyb3InLFxyXG5cdFx0XHRcdGljb25TdWNjZXNzICA9ICdmb3JtX19pY29uLS1zdWNjZXNzJztcclxuXHJcblx0XHQvLyDRhNGD0L3QutGG0LjRjyDQstCw0LvQuNC00LDRhtC40Y8g0YTQvtGA0LzRi1xyXG5cdFx0dmFyIHZhbGlkRnVuYyA9IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHRcdC8vINC/0YDQvtCy0LXRgNGP0LXQvCDQutCw0LbQtNGL0LkgaW5wdXRcclxuXHRcdFx0aW5wdXQuZWFjaChmdW5jdGlvbihpKSB7XHJcblxyXG5cdFx0XHRcdC8vINC/0YDQvtCy0LXRgNGP0LXQvCDRg9GB0LvQvtCy0LjQtSwg0LXRgdGC0Ywg0LvQuCDQsiDQv9C+0LvQtSDRh9GC0L4t0L3QuNC00YxcclxuXHRcdFx0XHRpZigkKHRoaXMpLnZhbCgpICE9ICcnKSB7XHJcblx0XHRcdFx0XHQkKHRoaXMpLmFkZENsYXNzKGlucHV0U3VjY2Vzcyk7IFxyXG5cdFx0XHRcdFx0aWNvbi5lcShpKS5hZGRDbGFzcyhpY29uU3VjY2Vzcyk7XHJcblx0XHRcdFx0XHRidG4ucmVtb3ZlQ2xhc3MoJ2pzX19mb3JtLW5vLXN1Ym1pdCcpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQkKHRoaXMpLmFkZENsYXNzKGlucHV0RXJyb3IpO1xyXG5cdFx0XHRcdFx0aWNvbi5lcShpKS5hZGRDbGFzcyhpY29uRXJyb3IpO1xyXG5cdFx0XHRcdFx0YnRuLmFkZENsYXNzKCdqc19fZm9ybS1uby1zdWJtaXQnKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHR9KTsgLy8gLS0+INC30LDQutCw0L3Rh9C40LLQsNC10Lwg0L/RgNC+0LLQtdGA0Y/RgtGMINC40L3Qv9GD0YLRi1xyXG5cclxuXHJcblx0XHRcdC8vINGD0YHQu9C+0LLQuNGPINC90LDQu9C40YfQuNGPINGH0LXQui3QuNC90L/Rg9GC0L7QslxyXG5cdFx0XHRpZihjaGVjaykge1xyXG5cclxuXHRcdFx0XHQvLyDQv9GA0L7QstC10YDRj9C10Lwg0LrQsNC20LTRi9C5INGH0LXQui3QuNC90L/Rg9GCXHJcblx0XHRcdFx0Y2hlY2suZWFjaChmdW5jdGlvbigpIHtcclxuXHJcblx0XHRcdFx0XHQvLyDQv9GA0L7QstC10YDRj9C10Lwg0YPRgdC70L7QstC40LUsINCy0YvQsdGA0LDQvSDQu9C4INC40L3Qv9GD0YJcclxuXHRcdFx0XHRcdGlmKCQodGhpcykucHJvcChcImNoZWNrZWRcIikpe1xyXG5cdFx0XHRcdFx0XHR2YWxpZCA9IHRydWU7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHR2YWxpZCA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0cmV0dXJuIHZhbGlkO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gdmFsaWQ7XHJcblx0XHRcdH1cclxuXHJcblxyXG5cdFx0XHRyZXR1cm4gdmFsaWQ7XHJcblx0XHR9IC8vIC0tPiB2YWxpZEZ1bmMgaXMgZW5kXHJcblxyXG5cclxuXHRcdC8vINGE0YPQvdC60YbQuNGPINC00LvRjyDQv9GA0L7QstC10YDQutC4IGVtYWlsXHJcblx0XHR2YXIgZW1haWxGdW5jPSBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0XHQvLyDQv9GA0L7QstC10YDRj9C10Lwg0YPRgdC70L7QstC40LUsINC10YHRgtGMINC70Lgg0YfRgtC+LdC90LjQtNGMINCyINC90ZHQvFxyXG5cdFx0XHRpZiAoZW1haWwudmFsKCkgIT0gJycpIHtcclxuXHJcblx0XHRcdFx0XHQvLyDQv9GA0L7QstC10YDRj9C10LwsINGB0L7QvtGC0LLQtdGC0YHRgtCy0YPQtdGCINC70Lgg0YjQsNCx0LvQvtC90YMgZW1haWxcclxuXHRcdFx0XHRcdGlmKGVtYWlsLnZhbCgpLnNlYXJjaChwYXR0ZXJuKSA9PSAwKXtcclxuXHRcdFx0XHRcdFx0ZW1haWwuYWRkQ2xhc3MoaW5wdXRTdWNjZXNzKTtcclxuXHRcdFx0XHRcdFx0dmFsaWQgPSB0cnVlO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0ZW1haWwuYWRkQ2xhc3MoaW5wdXRFcnJvcik7XHJcblx0XHRcdFx0XHRcdHZhbGlkID0gZmFsc2U7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGVtYWlsLmFkZENsYXNzKGlucHV0RXJyb3IpO1xyXG5cdFx0XHRcdFx0dmFsaWQgPSBmYWxzZVxyXG5cdFx0XHRcdH1cclxuXHJcblxyXG5cdFx0XHRyZXR1cm4gdmFsaWQ7XHJcblx0XHR9IC8vIC0tPiBlbWFpbEZ1bmMgaXMgZW5kXHJcblxyXG5cclxuXHRcdC8vINGE0YPQvdC60YbQuNGPINC00LvRjyBlbWFpbCwg0LrQvtCz0LTQsCDQv9C+0LrQuNC00LDRiNGMINC40L3Qv9GD0YJcclxuXHRcdGVtYWlsLmJsdXIoZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0XHQvLyDQv9GA0L7QstC10YDRj9C10LwgZW1haWwsINC90LAg0L3QsNC70LjRh9C40LUg0YfQtdCz0L4t0L3QuNC00YxcclxuXHRcdFx0aWYgKGVtYWlsLnZhbCgpICE9ICcnKSB7XHJcblxyXG5cdFx0XHRcdC8vINGB0L7QvtGC0LLQtdGC0YHRgtCy0YPQtdGCINC70Lgg0L3QsNGI0LXQvNGDINGI0LDQsdC70L7QvdGDXHJcblx0XHRcdFx0aWYoZW1haWwudmFsKCkuc2VhcmNoKHBhdHRlcm4pID09IDApe1xyXG5cdFx0XHRcdFx0ZW1haWwuYWRkQ2xhc3MoaW5wdXRTdWNjZXNzKTtcclxuXHRcdFx0XHRcdHZhbGlkID0gdHJ1ZTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0ZW1haWwuYWRkQ2xhc3MoaW5wdXRFcnJvcik7XHJcblx0XHRcdFx0XHR2YWxpZCA9IGZhbHNlXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGVtYWlsLmFkZENsYXNzKGlucHV0RXJyb3IpO1xyXG5cdFx0XHRcdHZhbGlkID0gZmFsc2VcclxuXHRcdFx0fVxyXG5cclxuXHRcdH0pO1xyXG5cclxuXHJcblx0XHQvLyDQv9GA0L7QstC10YDRj9C10Lwg0LrQsNC20LTRi9C5INC40L3Qv9GD0YJcclxuXHRcdGlucHV0LmVhY2goZnVuY3Rpb24oaSkge1xyXG5cclxuXHRcdFx0Ly8g0LTQu9GPINC60LDQttC00L7Qs9C+INC40L3Qv9GD0YLQsCDQv9GA0Lgg0L/QvtC60LjQtNCw0L3QuNC4INC/0L7Qu9GPXHJcblx0XHRcdCQodGhpcykuYmx1cihmdW5jdGlvbigpIHtcclxuXHJcblx0XHRcdFx0Ly8g0L/RgNC+0LLQtdGA0Y/QtdC8INC90LDQu9C40YfQuNC1INGH0LXQs9C+LdC70LjQsdC+XHJcblx0XHRcdFx0aWYoJCh0aGlzKS52YWwoKSAhPSAnJykge1xyXG5cdFx0XHRcdFx0JCh0aGlzKS5hZGRDbGFzcyhpbnB1dFN1Y2Nlc3MpO1xyXG5cdFx0XHRcdFx0aWNvbi5lcShpKS5hZGRDbGFzcyhpY29uU3VjY2Vzcyk7XHJcblx0XHRcdFx0XHRidG4ucmVtb3ZlQ2xhc3MoJ2pzX19mb3JtLW5vLXN1Ym1pdCcpXHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdCQodGhpcykuYWRkQ2xhc3MoaW5wdXRFcnJvcik7XHJcblx0XHRcdFx0XHRpY29uLmVxKGkpLmFkZENsYXNzKGljb25FcnJvcik7XHJcblx0XHRcdFx0XHRidG4uYWRkQ2xhc3MoJ2pzX19mb3JtLW5vLXN1Ym1pdCcpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0fSk7XHJcblxyXG5cclxuXHRcdC8vINC/0YDQuCDQutC70LjQutC1INC90LAg0LrQvdC+0L/QutGDINC+0YLQv9GA0LDQstC60LhcclxuXHRcdGJ0bi5jbGljayhmdW5jdGlvbihlKSB7XHJcblxyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdHZhbGlkRnVuYygpO1xyXG5cclxuXHRcdFx0Ly8g0LXRgdC70Lgg0LXRgdGC0YwgZW1haWxcclxuXHRcdFx0aWYoZW1haWwpIHtcclxuXHRcdFx0XHRlbWFpbEZ1bmMoKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8g0L/RgNC+0LLQtdGA0Y/RgtGMINGD0YHQu9C+0LLQuNC1INC10YHRgtGMINC70Lgg0LrQu9Cw0YHRgVxyXG5cdFx0XHRpZihidG4uaGFzQ2xhc3MoJ2pzX19mb3JtLW5vLXN1Ym1pdCcpKSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGZvcm0uc3VibWl0KCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHR9KTtcclxuXHJcblxyXG5cdFx0Ly8g0L/RgNC4INC60LvQuNC60LUg0L3QsCDQutC90L7Qv9C60YMgXCLQvtGH0LjRgdGC0LjRgtGMXCJcclxuXHRcdGJ0blJlc2V0LmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRpbnB1dC5hZGQoZW1haWwpLnJlbW92ZUNsYXNzKGlucHV0RXJyb3IsIGlucHV0U3VjY2Vzcyk7XHJcblx0XHRcdGljb24ucmVtb3ZlQ2xhc3MoaWNvbkVycm9yLCBpY29uU3VjY2Vzcyk7XHJcblx0XHR9KTtcclxuXHJcblxyXG5cdH0pOyAvLyAtLT4gcmVhZHkgZW5kXHJcblxyXG59KSggalF1ZXJ5ICk7IiwiLy8ganMg0LTQu9GPINGB0LrRgNC+0LvQu9CwINCy0L3QuNC3INC40LvQuCDQstCy0LXRgNGFXHJcbid1c2Ugc2N0cmljdCc7XHJcblxyXG4kKGZ1bmN0aW9uICgpe1xyXG5cclxuXHQvLyDQt9Cw0LTQsNGR0Lwg0L/QtdGA0LXQvNC10L3QvdGL0LVcclxuXHR2YXIgYm9keSA9ICQoJ2JvZHksIGh0bWwnKSxcclxuXHRcdGFycm93RG93biA9ICQoJy5qc19fYXJyb3ctZG93bicpLFxyXG5cdFx0YXJyb3dVcCA9ICQoJy5qc19fYXJyb3ctdXAnKSxcclxuXHRcdGhlYWRlckhlaWdodCA9ICQoJy5qc19faGVhZGVyJykuaGVpZ2h0KCk7XHJcblxyXG5cdC8vINC/0YDQvtCy0LXRgNGP0LXQvCDQvdCw0LvQuNGH0LjQtSDRgdGC0YDQtdC70LrQuCAtLSDQstC90LjQt1xyXG5cdGlmKGFycm93RG93bil7XHJcblx0XHQvLyDRhNGD0L3QutGG0LjRjyDQv9GA0Lgg0L3QsNC20LDRgtC40LhcclxuXHRcdGFycm93RG93bi5jbGljayhmdW5jdGlvbigpe1xyXG5cdFx0XHQvLyDQsNC90LjQvNCw0YbQuNGPINGB0LrRgNC+0LvQu9CwXHJcblx0XHRcdGJvZHkuYW5pbWF0ZSh7c2Nyb2xsVG9wOiBoZWFkZXJIZWlnaHR9LCAxNTAwKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0Ly8g0L/RgNC+0LLQtdGA0Y/QtdC8INC90LDQu9C40YfQtSDRgdGC0YDQtdC70LrQuCAtLSDQstCy0LXRgNGFXHJcblx0aWYoYXJyb3dVcCkge1xyXG5cdFx0Ly8g0YTRg9C90LrRhtC40Y8g0L/RgNC4INC90LDQttCw0YLQuNC4XHJcblx0XHRhcnJvd1VwLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQvLyDQsNC90LjQvNCw0YbQuNGPINGB0LrRgNC+0LvQu9CwXHJcblx0XHRcdGJvZHkuYW5pbWF0ZSh7c2Nyb2xsVG9wOiAwfSwgMjUwMCk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG59KTtcclxuIiwiLy8ganMg0LTQu9GPIGluZGV4LXBhcmFsbGF4XHJcblxyXG4kKGZ1bmN0aW9uKCl7XHJcblxyXG5cdC8vINC30LDQtNCw0ZHQvCDQv9C10YDQtdC80LXQvdC90YvQtVxyXG5cdHZhciBwYXJhbGxheENvbnRhaW5lciA9ICQoJy5wYXJhbGxheCcpLFxyXG5cdFx0bGF5ZXJzID0gJCgnLnBhcmFsbGF4X19sYXllcicpO1xyXG5cclxuXHJcblx0Ly8g0L/RgNC+0LzQuNGBINC60L7RgtC+0YDRi9C5INCx0YPQtNC10YIg0L/RgNC+0LLQtdGA0Y/RgtGMINC90LDQu9C40YfQuNC1INCT0LvQsNCy0L3QvtCz0L4g0L/QsNGA0LDQu9C70LDQutGB0LAg0L3QsCDRgdGC0YDQsNC90LjRhtC1XHJcblx0dmFyIHBhcmFsbGF4UHJvbWlzZSA9IG5ldyBQcm9taXNlIChmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHRcdFx0aWYgKHBhcmFsbGF4Q29udGFpbmVyLmxlbmd0aCkge1xyXG5cdFx0XHRcdHJlc29sdmUoKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZWplY3QoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdC8vINGE0YPQvdC60YbQuNGPINC/0YDQuCDQvdCw0LvQuNGH0LjQuCDQs9C70LDQstC90L7Qs9C+INC/0LDRgNCw0LvQu9Cw0LrRgdCwXHJcblx0cGFyYWxsYXhQcm9taXNlLnRoZW4oZnVuY3Rpb24oKXtcclxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBtb3ZlTGF5ZXJzKTtcclxuXHR9KS5jYXRjaChmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIDtcclxuXHRcdH0pO1xyXG5cclxuXHQvLyDRhNGD0L3QutGG0LjRjyDQtNC70Y8g0LTQstC40LbQtdC90LjRjyDRgdC70L7RkdCyXHJcblx0dmFyIG1vdmVMYXllcnMgPSBmdW5jdGlvbiAoZSkge1xyXG5cdFx0dmFyIGluaXRpYWxYID0gKHdpbmRvdy5pbm5lcldpZHRoIC8gMikgLSBlLnBhZ2VYLFxyXG5cdFx0XHRpbml0aWFsWSA9ICh3aW5kb3cuaW5uZXJIZWlnaHQgLyAyKSAtIGUucGFnZVk7XHJcblxyXG5cdFx0W10uc2xpY2UuY2FsbChsYXllcnMpLmZvckVhY2goZnVuY3Rpb24obGF5ZXIsIGluZGV4KSB7XHJcblx0XHRcdHZhciBkaXZpZGVyID0gaW5kZXggLyAxMDAsXHJcblx0XHRcdFx0cG9zaXRpb25YID0gaW5pdGlhbFggKiBkaXZpZGVyLFxyXG5cdFx0XHRcdHBvc2l0aW9uWSA9IGluaXRpYWxZICogZGl2aWRlcixcclxuXHRcdFx0XHR0cmFuc2Zvcm1TdHJpbmcgPSAndHJhbnNsYXRlKCcgKyBwb3NpdGlvblggKyAncHgsJyArIHBvc2l0aW9uWSArICdweCknO1xyXG5cclxuXHRcdFx0bGF5ZXIuc3R5bGUudHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nO1xyXG5cdFx0fSk7XHJcblx0fTtcclxufSk7IiwiLy8gRmxpcCDRjdGE0YTQtdC60YJcclxuXHJcbiQoZnVuY3Rpb24oKXtcclxuXHJcblx0Ly8g0LfQsNC00LDRkdC8INC/0LXRgNC10LzQtdC90L3Ri9C1XHJcblx0dmFyIGxpbmsgPSAkKCcuYnRuLWF1dGhvX19saW5rJyksXHJcblx0XHRib3ggPSAkKCcuZmxpcCcpLFxyXG5cdFx0bWFpbkxpbmsgPSAkKCcubG9naW5fX2xpbmsnKTsgXHJcblxyXG5cdC8vINC/0YDQvtC80LjRgSDQutC+0YLQvtGA0YvQuSDQsdGD0LTQtdGCINC/0YDQvtCy0LXRgNGP0YLRjCDQvdCw0LvQuNGH0LjQtSDRhNC70LjQvyDQutC+0YLQtdC50L3QtdGA0LAg0L3QsCDRgdGC0YDQsNC90LjRhtC1XHJcblx0dmFyIGZsaXBQcm9taXNlID0gbmV3IFByb21pc2UgKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cdFx0XHRpZiAoYm94Lmxlbmd0aCkge1xyXG5cdFx0XHRcdHJlc29sdmUoKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZWplY3QoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdC8vINGE0YPQvdC60YbQuNGPINC/0YDQuCDQvdCw0LvQuNGH0LjQuCDRhNC70LjQvyDQutC+0L3RgtC10LnQvdC10YDQtVxyXG5cdGZsaXBQcm9taXNlLnRoZW4oZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0Ly8g0L/RgNC4INC60LvQuNC60LUsINGE0LvQuNC/INC60L7QvdGC0LXQvdC10LnRgNGDINC00L7QsdCw0LLQuNGC0Ywg0LrQu9Cw0YHRgSDRgSDQv9C+0LLQvtGA0L7RgtC+0LxcclxuXHRcdGxpbmsuY2xpY2soZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7IC8vINC+0YLQvNC10L3QsCDRgdGC0LDQvdC00LDRgNGC0L3Ri9GFINC00LXQudGB0LLRgtC50LhcclxuXHJcblx0XHRcdGxpbmsuY3NzKCdvcGFjaXR5JywgJzAnKTtcclxuXHRcdFx0Ym94LnRvZ2dsZUNsYXNzKCdqc19fZmxpcCcpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8g0L/RgNC4INC60LvQuNC60LUgINC90LAgXCLQndCwINCz0LvQsNCy0L3Rg9GOXCIsINGD0LTQsNC70LjRgtGMINC60LvQsNGB0YEg0L/QvtCy0L7RgNC+0YLQsCwg0YLQtdC8INGB0LDQvNGL0Lwg0YDQsNC30LLQtdGA0L3Rg9CyINC60L7QvdGC0LXQudC90LXRgFxyXG5cdFx0bWFpbkxpbmsuY2xpY2soZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7IC8vINC+0YLQvNC10L3QsCDRgdGC0LDQvdC00LDRgNGC0L3Ri9GFINC00LXQudGB0LLRgtC50LhcclxuXHJcblx0XHRcdGxpbmsuY3NzKCdvcGFjaXR5JywgJzEnKTtcclxuXHRcdFx0Ym94LnJlbW92ZUNsYXNzKCdqc19fZmxpcCcpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8g0YDQsNC30LLQvtGA0LDRh9C40LLQsNGC0Ywg0LHQu9C+0Log0L/RgNC4INC90LDQttCw0YLQuNC4INC90LAgRXNjXHJcblx0XHQkKCdib2R5Jykua2V5dXAoZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRpZihib3guaGFzQ2xhc3MoJ2pzX19mbGlwJykpIHtcclxuXHRcdFx0XHRpZihlLndoaWNoPT0yNykge1xyXG5cdFx0XHRcdFx0bGluay5jc3MoJ29wYWNpdHknLCAnMScpO1xyXG5cdFx0XHRcdFx0Ym94LnJlbW92ZUNsYXNzKCdqc19fZmxpcCcpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8g0L/RgNC4INC60LvQuNC60LUg0L3QsCDQvtCx0LvQsNGB0YLRjCDQstC+0LrRgNGD0LMg0LHQu9C+0LrQsCwg0YDQsNC30LLQvtGA0LDRh9C40LLQsNGC0Ywg0LHQu9C+0LpcclxuXHRcdCQoJy5wYXJhbGxheCcpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRpZihib3guaGFzQ2xhc3MoJ2pzX19mbGlwJykpIHtcclxuXHRcdFx0XHRsaW5rLmNzcygnb3BhY2l0eScsICcxJyk7XHJcblx0XHRcdFx0Ym94LnJlbW92ZUNsYXNzKCdqc19fZmxpcCcpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9KS5jYXRjaChmdW5jdGlvbigpe1xyXG5cdFx0XHRyZXR1cm4gO1xyXG5cdFx0fSk7XHJcblxyXG59KTsiLCIvLyBqcyDRhNCw0LnQuyDQtNC70Y8g0LDQvdC40LzQsNGG0LjQuCDQv9C+0Y/QstC70LXQvdC40Y8gZmxpcFxyXG5cclxuXHJcbihmdW5jdGlvbigpe1xyXG5cclxuXHQvLyDQv9C10YDQtdC80LXQvdC90YvQtVxyXG5cdHZhciBmbGlwID0gJCgnLmZsaXAnKSxcclxuXHRcdGZsaXBBbmltYXRpb24gPSAnZmxpcF9fYW5pbWF0aW9uJztcclxuXHJcblx0Ly8g0YPRgdC70L7QstC40LUg0L/RgNC+0LLQtdGA0Y/RjtGJ0LXQtSDQvdCw0LvQuNGH0LjQtSDQpNC70LjQvyDQutC+0L3RgtC10LnQvdC10YDQsCDQvdCwINGB0YLRgNCw0L3QuNGG0LVcclxuXHRpZihmbGlwLmxlbmd0aCkge1xyXG5cclxuXHRcdC8vINC/0YDQuCDQt9Cw0LPRgNGD0LfQutC1INGB0YLRgNCw0L3QuNGG0LVcclxuXHRcdCQod2luZG93KS5vbignbG9hZCcsKCkgPT57XHJcblxyXG5cdFx0XHQvL9GBINC30LDQtNC10YDQttC60L7QuSAxINGB0LXQulxyXG5cdFx0XHRzZXRUaW1lb3V0KCgpPT57XHJcblxyXG5cdFx0XHRcdC8vINC00L7QsdCw0LLQuNGC0Ywg0LrQu9Cw0YHRgSDRgSDQsNC90LjQvNCw0YbQuNC10LlcclxuXHRcdFx0XHRmbGlwLmFkZENsYXNzKGZsaXBBbmltYXRpb24pO1xyXG5cdFx0XHR9LCAxMDAwKTtcclxuXHJcblx0XHR9KTtcclxuXHJcblx0fVxyXG5cclxufSgpKTsiLCIvLyBqcyDQtNC70Y8g0JvQuNC/0LrQvtCz0L4g0YHQsNC50LTQsdCw0YDQsCDQvdCwINGB0YLRgNCw0L3QuNGG0LUg0JHQu9C+0LNcclxuXHJcbihmdW5jdGlvbigpIHtcclxuXHJcbiAgICAvLyDQt9Cw0LTQsNC10Lwg0L/QtdGA0LXQvNC10L3QvdGL0LVcclxuICAgIHZhciBzaWRlYmFyID0gJCgnLnNpZGViYXInKSxcclxuICAgICAgICBzaWRlYmFyRml4ID0gJ3NpZGViYXJfX2ZpeGVkJyxcclxuICAgICAgICBidG5TaWRlYmFyID0gJCgnLnNpZGViYXJfX3Nob3cnKSxcclxuICAgICAgICBidG5TaWRlYmFyU2hvdyA9ICdqc19fc2lkZWJhci1zaG93JyxcclxuICAgICAgICBzY3JvbGxIZWlnaHQgPSA2MjA7XHJcblxyXG4gICAgLy8g0L/RgNC+0LzQuNGBINC60L7RgtC+0YDRi9C5INCx0YPQtNC10YIg0L/RgNC+0LLQtdGA0Y/RgtGMINC90LDQu9C40YfQuNC1INCh0LDQudC00LHQsNGA0LAg0L3QsCDRgdGC0YDQsNC90LjRhtC1XHJcbiAgICB2YXIgc2lkZWJhclByb21pc2UgPSBuZXcgUHJvbWlzZSAoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgaWYgKHNpZGViYXIubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZWplY3QoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyDRhNGD0L3QutGG0LjRjyDQv9GA0Lgg0L3QsNC70LjRh9C40Lgg0YHQsNC50LTQsdCw0YDQsFxyXG4gICAgc2lkZWJhclByb21pc2UudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIC8qINC10YHQu9C4INGB0LrRgNC+0LvQuyDQsdC+0LvRjNGI0LUg0LfQsNC00LDQvdC90L7QuSDQstGL0YHQvtGC0YssINGC0L4g0LTQvtCx0LDQstC40YLRjCDQutC70LDRgdGBICovXHJcbiAgICAgICAgICAgIGlmKCQodGhpcykuc2Nyb2xsVG9wKCkgPiBzY3JvbGxIZWlnaHQpe1xyXG4gICAgICAgICAgICAgICAgc2lkZWJhci5hZGRDbGFzcyhzaWRlYmFyRml4KTtcclxuICAgICAgICAgICAgICAgIGJ0blNpZGViYXIuYWRkQ2xhc3MoYnRuU2lkZWJhclNob3cpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPCBzY3JvbGxIZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgIHNpZGViYXIucmVtb3ZlQ2xhc3Moc2lkZWJhckZpeCk7XHJcbiAgICAgICAgICAgICAgICBidG5TaWRlYmFyLnJlbW92ZUNsYXNzKGJ0blNpZGViYXJTaG93KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSkuY2F0Y2goZnVuY3Rpb24oKXtcclxuICAgICAgICByZXR1cm4gO1xyXG4gICAgfSk7XHJcblxyXG59KSgpOyIsIi8vIGpzINC00LvRjyDQvdCw0LLQuNCz0LDRhtC40Lgg0L3QsCDRgdGC0YDQsNC90LjRhtC1INCR0LvQvtCzXHJcblxyXG4oZnVuY3Rpb24oKSB7XHJcblxyXG5cdC8vINC/0LXRgNC10LzQtdC90L3Ri9C1XHJcblx0dmFyIGxpbmsgPSAkKCcuc2lkZWJhcl9fbGluaycpLFxyXG5cdFx0aXRlbSA9ICQoJy53cml0ZV9faXRlbScpO1xyXG5cclxuXHQkKGZ1bmN0aW9uKCl7XHJcblxyXG5cdFx0Ly8g0L/RgNC+0LzQuNGBINC60L7RgtC+0YDRi9C5INCx0YPQtNC10YIg0L/RgNC+0LLQtdGA0Y/RgtGMINC90LDQu9C40YfQuNC1INCh0LDQudC00LHQsNGA0LAg0L3QsCDRgdGC0YDQsNC90LjRhtC1XHJcblx0XHR2YXIgbmF2U2lkZWJhclByb21pc2UgPSBuZXcgUHJvbWlzZSAoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblx0XHRcdGlmIChsaW5rLmxlbmd0aCkge1xyXG5cdFx0XHRcdHJlc29sdmUoKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZWplY3QoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8g0YTRg9C90LrRhtC40Y8g0L/RgNC4INC90LDQu9C40YfQuNC4INGB0LDQudC00LHQsNGA0LBcclxuXHRcdG5hdlNpZGViYXJQcm9taXNlLnRoZW4oZnVuY3Rpb24oKSB7XHJcblx0XHRcdGxpbmsuY2xpY2soZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdFx0c2hvd0FydGljbGUoJCh0aGlzKS5hdHRyKCdocmVmJyksIHRydWUpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pLmNhdGNoKGZ1bmN0aW9uKCl7XHJcblx0XHRcdHJldHVybiA7XHJcblx0XHR9KTtcclxuXHJcblxyXG5cdH0pO1xyXG5cclxuXHQvLyDQv9GA0Lgg0YHQutGA0L7Qu9C70LUg0LLRi9C30YvQstCw0YLRjCDRhNGD0L3QutGG0LjRjiBjaGVja0FydGljbGVcclxuXHQkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xyXG5cdFx0Y2hlY2tBcnRpY2xlKCk7XHJcblx0fSk7XHJcblxyXG5cclxuXHQvLyDRhNGD0L3QutGG0LjRjyDQtNC70Y8g0YHQutGA0L7Qu9C70LAg0Log0L3Rg9C20L3QvtC80YMg0Y3Qu9C10LzQtdC90YLRg1xyXG5cdGZ1bmN0aW9uIHNob3dBcnRpY2xlKGFydGljbGUsIGlzQW5pbWF0ZSkge1xyXG5cdFx0dmFyIGRpcmVjdGlvbiA9IGFydGljbGUucmVwbGFjZSgvIy8sICcnKSxcclxuXHRcdFx0cmVxQXJ0aWNsZSA9IGl0ZW0uZmlsdGVyKCdbZGF0YS1hcnRpY2xlPVwiJyArIGRpcmVjdGlvbiArICdcIl0nKSxcclxuXHRcdFx0cmVxQXJ0aWNsZVBvcyA9IHJlcUFydGljbGUub2Zmc2V0KCkudG9wO1xyXG5cclxuXHRcdGlmIChpc0FuaW1hdGUpIHtcclxuXHRcdFx0JCgnYm9keSwgaHRtbCcpLmFuaW1hdGUoe3Njcm9sbFRvcDogcmVxQXJ0aWNsZVBvc30sIDUwMCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvLyDRhNGD0L3QutGG0LjRjyDQtNC70Y8g0LDQstGC0L7QvNCw0YLQuNGH0LXRgdC60LXQs9C+INC/0LXRgNC10LrQu9GO0YfQtdC90LjRjyDQutC70LDRgdGB0LAgYWN0aXZlINGDINGB0YHRi9C70L7QulxyXG5cdGZ1bmN0aW9uIGNoZWNrQXJ0aWNsZSgpIHtcclxuXHRcdGl0ZW0uZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyICR0aGlzID0gJCh0aGlzKSxcclxuXHRcdFx0XHR0b3BFZGdlID0gJHRoaXMub2Zmc2V0KCkudG9wIC0gMTUwLFxyXG5cdFx0XHRcdGJvdHRvbUVkZ2UgPSB0b3BFZGdlICsgJHRoaXMuaGVpZ2h0KCksXHJcblx0XHRcdFx0d1Njcm9sbCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcclxuXHJcblx0XHRcdGlmICh0b3BFZGdlIDwgd1Njcm9sbCAmJiBib3R0b21FZGdlID4gd1Njcm9sbCkge1xyXG5cdFx0XHRcdHZhciBjdXJyZW50SWQgPSAkdGhpcy5kYXRhKCdhcnRpY2xlJyksXHJcblx0XHRcdFx0XHRyZXFMaW5rID0gbGluay5maWx0ZXIoJ1tocmVmPVwiIycgKyBjdXJyZW50SWQgKyAnXCJdJyk7XHJcblxyXG5cdFx0XHRcdFx0bGluay5yZW1vdmVDbGFzcygnc2lkZWJhcl9fbGluay0tYWN0aXZlJyk7XHJcblx0XHRcdFx0XHRyZXFMaW5rLmFkZENsYXNzKCdzaWRlYmFyX19saW5rLS1hY3RpdmUnKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHJcbn0pKCk7ICIsIi8vIGpzINGE0YPQvdC60YbQuNGPINC00LvRjyDQv9C+0LrQsNC30LAgc2lkZWJhclxyXG5cclxuXHJcbiQoZnVuY3Rpb24gKCkge1xyXG5cclxuXHQvLyDQv9C10YDQtdC80LXQvdC90YvQtVxyXG5cdHZhciBidG4gPSAkKCcuanNfX2J0bi1zaWRlYmFyJyksXHJcblx0XHRzaWRlYmFyID0gJCgnLnNpZGViYXInKSxcclxuXHRcdG90aGVyQ29udGVudCA9ICQoJy53cml0ZScpLFxyXG5cdFx0ZmxhZyA9IHRydWU7XHJcblxyXG5cdC8vINC/0YDQuCDQutC70LjQutC1INC90LAg0LrQvdC+0L/QutGDINC/0L7QutCw0LfRi9Cy0LDRgtGMINC40LvQuCDRgdC60YDRi9Cy0LDRgtGMINGB0LDQudC00LHQsNGAXHJcblx0YnRuLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0aWYgKGZsYWcgPT0gdHJ1ZSkge1xyXG5cdFx0XHRzaWRlYmFyLmNzcygndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZVgoMTAwJSknKTtcclxuXHRcdFx0ZmxhZyA9IGZhbHNlO1xyXG5cdFx0fSBlbHNlICB7XHJcblx0XHRcdHNpZGViYXIucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuXHRcdFx0ZmxhZyA9IHRydWU7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdC8vINC10YHQu9C4INGB0LDQudC00LHQsNGAINC/0L7QutCw0LfQsNC9LCDQv9GA0Lgg0LrQu9C40LrQtSDQvdCwINC00YDRg9Cz0L7QuSDQutC+0L3RgtC10L3RgiDRg9Cx0YDQsNGC0Ywg0YHQsNC50LTQsdCw0YBcclxuXHRvdGhlckNvbnRlbnQuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHRpZiAoZmxhZyA9PSBmYWxzZSkge1xyXG5cdFx0XHRzaWRlYmFyLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcblx0XHRcdGZsYWcgPSB0cnVlO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQvLyDQtdGB0LvQuCDRgdCw0LnQtNCx0LDRgCDQv9C+0LrQsNC30LDQvSwg0L/RgNC4INC60LvQuNC60LUg0L3QsCDQutC70LDQstC40YjRgyBFc2Mg0YPQsdGA0LDRgtGMINGB0LDQudC00LHQsNGAXHJcblx0JCgnYm9keScpLmtleXVwKGZ1bmN0aW9uKGUpIHtcclxuXHRcdGlmKGUud2hpY2ggPT0gMjcpIHtcclxuXHRcdFx0c2lkZWJhci5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG5cdFx0XHRmbGFnID0gdHJ1ZTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblxyXG5cclxufSk7IiwiLy8ganMg0YTQsNC50Lsg0LTQu9GPINCw0L3QuNC80LDRhtC40Lgg0LrRgNGD0LPQvtCyINGB0LrQuNC70LvQvtCyXHJcblxyXG4kKGZ1bmN0aW9uKCl7XHJcblx0Ly8g0L/QtdGA0LXQvNC10L3QvdCw0Y8g0LHQu9C+0LrQuCDRgdC60LjQu9C70L7QslxyXG5cdHZhciBlbGVtID0gJCgnLnNraWxsc19faXRlbXMtd3JhcCcpO1xyXG5cclxuXHQvLyDQv9GA0L7QvNC40YEg0LrQvtGC0L7RgNGL0Lkg0LHRg9C00LXRgiDQv9GA0L7QstC10YDRj9GC0Ywg0L3QsNC70LjRh9C40LUg0LHQu9C+0LrQsCDRgdC60LjQu9C70L7QslxyXG5cdHZhciBza2lsbHNQcm9taXNlID0gbmV3IFByb21pc2UgKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cdFx0aWYgKGVsZW0ubGVuZ3RoKSB7XHJcblx0XHRyZXNvbHZlKCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0cmVqZWN0KCk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdC8vINGE0YPQvdC60YbQuNGPINC/0YDQuCDQvdCw0LvQuNGH0LjQuCDQsdC70L7QutCwINGB0LrQuNC70LvQvtCyXHJcblx0c2tpbGxzUHJvbWlzZS50aGVuKGZ1bmN0aW9uKCl7XHJcblx0XHQvLyDQv9GA0Lgg0YHQutGA0L7Qu9C70LUgXHJcblx0XHQkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgc2Nyb2xsVG9wID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xyXG5cclxuXHRcdFx0Lyog0LXRgdC70Lgg0YTRg9C90LrRhtC40Y8gY2hlY2tEaXN0YW5jZSDQstC10YDQvdGD0LvQsCByZXR1cm4g0YLQviwg0LTQvtCx0LDQstC40YLRjCDQutC70LDRgdGBIC8g0LjQvdCw0YfQtSDRg9C00LDQu9C40YLRjCAqL1xyXG5cdFx0XHRpZihjaGVja0Rpc3RhbmNlKHNjcm9sbFRvcCkpIHtcclxuXHRcdFx0XHRlbGVtLmFkZENsYXNzKCdqc19fY2lyY2xlLWFuaW1hdGUnKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRlbGVtLnJlbW92ZUNsYXNzKCdqc19fY2lyY2xlLWFuaW1hdGUnKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fSkuY2F0Y2goZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiA7XHJcblx0fSk7XHJcblxyXG5cdC8vINGE0YPQvdC60YbQuNGPINC00LvRjyDQv9GA0L7QstC10YDQutC4INC/0L7Qt9C40YbQuNC4INGN0LvQtdC80LXQvdGC0LBcclxuXHR2YXIgY2hlY2tEaXN0YW5jZSA9IGZ1bmN0aW9uKHNjcm9sbFRvcCkge1xyXG5cdFx0dmFyIG9mZnNldCA9IGVsZW0ub2Zmc2V0KCkudG9wLFxyXG5cdFx0XHR3aW5kb3dNYXJnaW4gPSBNYXRoLmNlaWwoJCh3aW5kb3cpLmhlaWdodCgpIC8gMyksXHJcblx0XHRcdHRvcEJvcmRlciA9IG9mZnNldCAtIHNjcm9sbFRvcCAtIHdpbmRvd01hcmdpbiAtIDEwMCxcclxuXHRcdFx0Ym90dG9tRWRnZSA9IGVsZW0ub3V0ZXJIZWlnaHQodHJ1ZSkgKyBvZmZzZXQsXHJcblx0XHRcdGJvdHRvbUJvcmRlciA9IHNjcm9sbFRvcCArIHdpbmRvd01hcmdpbiAtIGJvdHRvbUVkZ2U7XHJcblxyXG5cdFx0XHRyZXR1cm4gdG9wQm9yZGVyIDw9IDAgJiYgYm90dG9tQm9yZGVyIDw9IDBcclxuXHR9XHJcblxyXG5cclxufSk7IiwiLy8ganMg0YTQsNC50Lsg0LTQu9GPINCw0L3QuNC80LDRhtC40Lgg0LrQvtC90YLRgNC+0LvRjCDQutC90L7Qv9C+0Log0LIg0YHQu9Cw0LnQtNC10YDQtVxyXG5cclxuJChmdW5jdGlvbigpe1xyXG5cclxuXHQvLyDQv9C10YDQtdC80LXQvdC90YvQtVxyXG5cdGNvbnN0IGJ0blByZXYgPSAkKCcuc2xpZGVyX19wcmV2Jyk7XHJcblx0Y29uc3QgYnRuTmV4dCA9ICQoJy5zbGlkZXJfX25leHQnKTtcclxuXHRjb25zdCBkdXJhdGlvbiA9IDUwMDtcclxuXHRsZXQgYWN0aXZlID0gJ3NsaWRlci1jb250cm9sc19faXRlbS1hY3RpdmUnO1xyXG5cdGxldCBpblByb2dyZXNzID0gZmFsc2U7XHJcblxyXG5cdC8vINGE0YPQvdC60YbQuNGPINC00LvRjyDQv9C10YDQtdC80LXRidC10L3QuNGPIFwi0J3QsNC30LDQtFwiXHJcblx0Y29uc3QgbW92ZVNsaWRlc1ByZXYgPSAoY29udGFpbmVyLCBkaXJlY3Rpb24pID0+IHtcclxuXHJcblx0XHQvLyDQv9C10YDQtdC80LXQvdC90YvQtVxyXG5cdFx0bGV0IGl0ZW1zICAgICAgICA9IGNvbnRhaW5lci5maW5kKCcuc2xpZGVyLWNvbnRyb2xzX19pdGVtJyk7XHJcblx0XHRsZXQgYWN0aXZlSXRlbSAgID0gaXRlbXMuZmlsdGVyKCcuc2xpZGVyLWNvbnRyb2xzX19pdGVtLWFjdGl2ZScpO1xyXG5cdFx0bGV0IHN0cmFmZVBlcmMgICA9IGRpcmVjdGlvbiA9PT0gJ2Rvd24nID8gMTAwIDogLTEwMDtcclxuXHRcdGxldCBjb3VudGVyICAgICAgPSBhY3RpdmVJdGVtLmluZGV4KCk7XHJcblxyXG5cdFx0Y291bnRlci0tO1xyXG5cclxuXHRcdC8vINGD0YHQu9C+0LLQuNC1INGH0YLQvtCx0Ysg0LfQsNGG0LjQutC70LjRgtGMINGB0LzQtdC90YMg0YHQu9Cw0LnQtNC+0LJcclxuXHRcdGlmKGNvdW50ZXIgPCAwKSBjb3VudGVyID0gaXRlbXMubGVuZ3RoIC0gMTtcclxuXHJcblx0XHQvLyDRgdC+0YXRgNCw0L3Rj9C10Lwg0Y3Qu9C10LzQtdC90YIg0LrQvtGC0L7RgNGL0Lkg0LTQvtC70LbQtdC9INC/0L7QutCw0LfQsNGC0YzRgdGPXHJcblx0XHRjb25zdCByZXFJdGVtID0gaXRlbXMuZXEoY291bnRlcik7XHJcblxyXG5cdFx0Ly8g0Y3Qu9C10LzQtdC90YIg0LrQvtGC0L7RgNGL0Lkg0L/QvtC60LDQt9Cw0L0g0YHQutGA0YvRgtGMXHJcblx0XHRhY3RpdmVJdGVtLmFuaW1hdGUoe1xyXG5cdFx0XHQndG9wJzogYCR7c3RyYWZlUGVyY30lYCxcclxuXHRcdH0sIGR1cmF0aW9uKVxyXG5cclxuXHRcdC8vINC/0L7QutCw0LfQsNGC0Ywg0YHQu9C10LTRg9GO0YnQuNC5INGN0LvQtdC80LXQvdGCLCDQtNC+0LHQsNCy0LjQsiDQtdC80YMg0LDQutGC0LjQstC90YvQuSDQutC70LDRgdGBXHJcblx0XHRyZXFJdGVtLmFuaW1hdGUoe1xyXG5cdFx0XHQndG9wJzogJzAnLFxyXG5cdFx0fSwgZHVyYXRpb24sIGZ1bmN0aW9uICgpe1xyXG5cdFx0XHRhY3RpdmVJdGVtLnJlbW92ZUNsYXNzKGFjdGl2ZSkuY3NzKCd0b3AnLCBgJHstc3RyYWZlUGVyY30lYCk7XHJcblx0XHRcdCQodGhpcykuYWRkQ2xhc3MoYWN0aXZlKTtcclxuXHJcblx0XHRcdGluUHJvZ3Jlc3MgPSBmYWxzZTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0Ly8g0YTRg9C90LrRhtC40Y8g0LTQu9GPINC/0LXRgNC10LzQtdGJ0LXQvdC40Y8gXCLQktC/0LXRgNC10LRcIlxyXG5cdGNvbnN0IG1vdmVTbGlkZXNOZXh0ID0gKGNvbnRhaW5lciwgZGlyZWN0aW9uKSA9PiB7XHJcblxyXG5cdFx0Ly8g0L/RgNC10LzQtdC90L3Ri9C1XHJcblx0XHRsZXQgaXRlbXMgICAgICAgICA9IGNvbnRhaW5lci5maW5kKCcuc2xpZGVyLWNvbnRyb2xzX19pdGVtJyk7XHJcblx0XHRsZXQgYWN0aXZlSXRlbSAgICA9IGl0ZW1zLmZpbHRlcignLnNsaWRlci1jb250cm9sc19faXRlbS1hY3RpdmUnKTtcclxuXHRcdGxldCBzdHJhZmVQZXJjICAgID0gZGlyZWN0aW9uID09PSAnZG93bicgPyAxMDAgOiAtMTAwO1xyXG5cdFx0bGV0IGNvdW50ZXIgICAgICAgPSBhY3RpdmVJdGVtLmluZGV4KCk7XHJcblxyXG5cdFx0Y291bnRlcisrO1xyXG5cclxuXHRcdC8vINGD0YHQu9C+0LLQuNC1INGH0YLQvtCx0Ysg0LfQsNGG0LjQutC70LjRgtGMINGB0LzQtdC90YMg0YHQu9Cw0LnQtNC+0LJcclxuXHRcdGlmIChjb3VudGVyID49IGl0ZW1zLmxlbmd0aCkgY291bnRlciA9IDA7XHJcblxyXG5cdFx0Ly8g0YHQvtGF0YDQsNC90Y/QtdC8INGN0LvQtdC80LXQvdGCINC60L7RgtC+0YDRi9C5INC00L7Qu9C20LXQvSDQv9C+0LrQsNC30LDRgtGM0YHRj1xyXG5cdFx0Y29uc3QgcmVxSXRlbSA9IGl0ZW1zLmVxKGNvdW50ZXIpO1xyXG5cclxuXHRcdC8vINGN0LvQtdC80LXQvdGCINC60L7RgtC+0YDRi9C5INC/0L7QutCw0LfQsNC9INGB0LrRgNGL0YLRjFxyXG5cdFx0YWN0aXZlSXRlbS5hbmltYXRlKHtcclxuXHRcdFx0J3RvcCc6IGAke3N0cmFmZVBlcmN9JWBcclxuXHRcdH0sIGR1cmF0aW9uKVxyXG5cclxuXHRcdC8vINC/0L7QutCw0LfQsNGC0Ywg0YHQu9C10LTRg9GO0YnQuNC5INGN0LvQtdC80LXQvdGCLCDQtNC+0LHQsNCy0LjQsiDQtdC80YMg0LDQutGC0LjQstC90YvQuSDQutC70LDRgdGBXHJcblx0XHRyZXFJdGVtLmFuaW1hdGUoe1xyXG5cdFx0XHR0b3A6IDBcclxuXHRcdH0sIGR1cmF0aW9uLCBmdW5jdGlvbiAoKXtcclxuXHRcdFx0YWN0aXZlSXRlbS5yZW1vdmVDbGFzcyhhY3RpdmUpLmNzcygndG9wJywgYCR7LXN0cmFmZVBlcmN9JWApO1xyXG5cdFx0XHQkKHRoaXMpLmFkZENsYXNzKGFjdGl2ZSk7XHJcblxyXG5cdFx0XHRpblByb2dyZXNzID0gZmFsc2U7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdC8vINC/0YDQuCDQutC70LjQutC1INC90LAg0LrQvdC+0L/QutGDIFwi0J3QsNC30LDQtFwiXHJcblx0YnRuUHJldi5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cclxuXHRcdGlmIChpblByb2dyZXNzKSByZXR1cm47XHJcblx0XHRpblByb2dyZXNzID0gdHJ1ZTtcclxuXHJcblx0XHRtb3ZlU2xpZGVzUHJldihidG5QcmV2LCAnZG93bicpO1xyXG5cdFx0bW92ZVNsaWRlc1ByZXYoYnRuTmV4dCwgJ3VwJyk7XHJcblx0fSk7XHJcblxyXG5cdC8vINC/0YDQuCDQutC70LjQutC1INC90LAg0LrQvdC+0L/QutGDIFwi0JLQv9C10YDQtdC0XCJcclxuXHRidG5OZXh0Lm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblxyXG5cdFx0aWYgKGluUHJvZ3Jlc3MpIHJldHVybjtcclxuXHRcdGluUHJvZ3Jlc3MgPSB0cnVlO1xyXG5cclxuXHRcdG1vdmVTbGlkZXNOZXh0KGJ0blByZXYsICdkb3duJyk7XHJcblx0XHRtb3ZlU2xpZGVzTmV4dChidG5OZXh0LCAndXAnKTtcclxuXHR9KTtcclxuXHJcbn0pOyIsIi8vIGpzINGE0LDQudC7INC00LvRjyDQsNC90LjQvNCw0YbQuNC4INCz0LvQsNCy0L3QvtCz0L4g0LTQuNGB0L/Qu9C10Y9cclxuXHJcblxyXG4kKGZ1bmN0aW9uKCl7XHJcblxyXG5cdC8vINC/0LXRgNC10LzQtdC90L3Ri9C1INC60L3QvtC/0L7QulxyXG5cdGNvbnN0IGJ0blByZXYgPSAkKCcuc2xpZGVyX19wcmV2Jyk7XHJcblx0Y29uc3QgYnRuTmV4dCA9ICQoJy5zbGlkZXJfX25leHQnKTtcclxuXHJcblx0Ly8g0YTRg9C90LrRhtC40Y8g0LTQu9GPINC/0L7QutCw0LfQsCDQvdCwINCz0LvQsNCy0L3QvtC8INC00LjRgdC/0LvQtdC4XHJcblx0Y29uc3Qgc2xpZGVyU2hvdyA9IGZ1bmN0aW9uKGNvbnRhaW5lcikge1xyXG5cclxuXHRcdC8vINC/0LXRgNC10LzQtdC90L3Ri9C1XHJcblx0XHRsZXQgZGlzcGxheSA9IGNvbnRhaW5lci5jbG9zZXN0KCcuc2xpZGVyLXJpZ2h0JykuZmluZCgnLnNsaWRlcl9fZGlzcGxheS1pbWcnKSxcclxuXHRcdFx0cGF0aCA9IGNvbnRhaW5lci5maW5kKCcuc2xpZGVyLWNvbnRyb2xzX19pdGVtLWFjdGl2ZScpLmNoaWxkcmVuKCcuc2xpZGVyLWNvbnRyb2xzX19pbWcnKS5hdHRyKCdzcmMnKSxcclxuXHRcdFx0ZmFkZWRPdXQgPSAkLkRlZmVycmVkKCksXHJcblx0XHRcdGxvYWRlZCA9ICQuRGVmZXJyZWQoKTtcclxuXHJcblx0XHQvLyDQstC60LvRjtGH0LjRgtGMINGA0YvRh9Cw0LMg0YMg0JTQtdGE0YTQtdGA0LXQtCDQvtCx0YrQtdC60YLQsFxyXG5cdFx0ZGlzcGxheS5mYWRlT3V0KGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0ZmFkZWRPdXQucmVzb2x2ZSgpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8g0JTQuNGB0L/Qu9C10Y4g0LjQt9C80LXQvdC40YLRjCDQv9GD0YLRjCDQuiDQutCw0YDRgtC40L3QutC1XHJcblx0XHRmYWRlZE91dC5kb25lKCgpID0+IHtcclxuXHRcdFx0ZGlzcGxheS5hdHRyKCdzcmMnLCBwYXRoKS5vbignbG9hZCcsICgpID0+IHtcclxuXHRcdFx0XHRsb2FkZWQucmVzb2x2ZSgpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vINC/0L7QutCw0LfQsNGC0Ywg0LTQuNGB0L/Qu9C10LlcclxuXHRcdGxvYWRlZC5kb25lKCgpID0+IHtcclxuXHRcdFx0ZGlzcGxheS5mYWRlSW4oNTAwKTtcclxuXHRcdH0pO1xyXG5cclxuXHR9XHJcblxyXG5cdC8vINC/0YDQuCDQutC70LjQutC1INC90LAg0LrQvdC+0L/QutGDIFwi0J3QsNC30LDQtFwiXHJcblx0YnRuUHJldi5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0c2xpZGVyU2hvdyhidG5QcmV2KTtcclxuXHJcblx0fSk7XHJcblxyXG5cdC8vINC/0YDQuCDQutC70LjQutC1INC90LAg0LrQvdC+0L/QutGDIFwi0JLQv9C10YDQtdC0XCJcclxuXHRidG5OZXh0Lm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRzbGlkZXJTaG93KGJ0bk5leHQpO1xyXG5cclxuXHR9KTtcclxuXHJcbn0pOyIsIi8vIGpzINGE0LDQudC7INC00LvRjyDQsNC90LjQvNCw0YbQuNC4INC40L3RhNC+0YDQvNCw0YbQuNC4INCyINGB0LvQsNC50LTQtdGA0LVcclxuXHJcbiQoZnVuY3Rpb24oKSB7XHJcblxyXG5cdC8vINC30L3QsNGH0LXQvdC40Y9cclxuXHRsZXQgc2xpZGVySW5mbyA9IFtcclxuXHRcdHtcclxuXHRcdFx0XCJ0aXRsZVwiOiBcItCh0LLQvtC5INGB0LDQudGCINC/0L7RgNGC0YTQvtC70LjQvlwiLFxyXG5cdFx0XHRcInRvb2xzXCI6IFwiaHRtbCwgY3NzLCBqYXZhc2NyaXB0XCIsXHJcblx0XHRcdFwibGlua1wiOiBcImluZGV4Lmh0bWxcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFx0XCJ0aXRsZVwiOiBcItCh0YLQsNGA0YvQuSDRgdCw0LnRgiDQv9C+0YDRgtGE0L7Qu9C40L5cIixcclxuXHRcdFx0XCJ0b29sc1wiOiBcImh0bWwsIGNzc1wiLFxyXG5cdFx0XHRcImxpbmtcIjogXCIuLi93b3Jrcy9wb3J0Zm9saW9fX2hvbWVyL2luZGV4Lmh0bWxcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFx0XCJ0aXRsZVwiOiBcIkdsYWN5IC0g0LzQsNCz0LDQt9C40L0g0LzQvtGA0L7QttC10L3QvtCz0L5cIixcclxuXHRcdFx0XCJ0b29sc1wiOiBcImh0bWwsIGNzczNcIixcclxuXHRcdFx0XCJsaW5rXCI6IFwiLi4vd29ya3MvZ2xhY3lfX2NvZGUvaW5kZXguaHRtbFwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XHRcInRpdGxlXCI6IFwi0KLQtdGB0YLQvtCy0L7QtSDQt9Cw0LTQsNC90LjQtVwiLFxyXG5cdFx0XHRcInRvb2xzXCI6IFwiaHRtbCwgY3NzLCBqcXVlcnlcIixcclxuXHRcdFx0XCJsaW5rXCI6IFwiLi4vd29ya3MvbHMtdGVzdC9pbmRleC5odG1sXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcdFwidGl0bGVcIjogXCJTRURPTkFcIixcclxuXHRcdFx0XCJ0b29sc1wiOiBcImh0bWwsIGNzcywgamF2YXNjcmlwdFwiLFxyXG5cdFx0XHRcImxpbmtcIjogXCIuLi93b3Jrcy9zZWRvbmEvaW5kZXguaHRtbFwiXHJcblx0XHR9XHJcblx0XVxyXG5cclxuXHQvLyDQv9C10YDQtdC80LXQvdC90YvQtVxyXG5cdGNvbnN0IGJ0blByZXYgICAgID0gJCgnLnNsaWRlcl9fcHJldicpO1xyXG5cdGNvbnN0IGJ0bk5leHQgICAgID0gJCgnLnNsaWRlcl9fbmV4dCcpO1xyXG5cdGNvbnN0IGluZm9CbG9jayAgID0gJCgnLnNsaWRlci1sZWZ0X19pbmZvJyk7XHJcblx0bGV0IHNsaWRlSW5mbyAgICAgPSAkLm1ha2VBcnJheShzbGlkZXJJbmZvKTtcclxuXHRsZXQgdGl0bGUgICAgICAgICA9ICQoJy5zbGlkZXJfX3RpdGxlJyk7XHJcblx0bGV0IHRvb2xzICAgICAgICAgPSAkKCcuc2xpZGVyX190b29scycpO1xyXG5cdGxldCBsaW5rICAgICAgICAgID0gaW5mb0Jsb2NrLmZpbmQoJy5zbGlkZXJfX2xpbmsnKTtcclxuXHJcblxyXG5cdC8vINGE0YPQvdC60YbQuNGPINC00LvRjyDRgdC80LXQvdGLINGB0YHRi9C70LrQuFxyXG5cdGNvbnN0IHNldExpbmsgPSAoY29udGFpbmVyKSA9PiB7XHJcblxyXG5cdFx0Ly8g0L/QtdGA0LXQvNC10L3QvdGL0LVcclxuXHRcdGxldCBpdGVtcyAgICAgICAgPSBjb250YWluZXIuZmluZCgnLnNsaWRlci1jb250cm9sc19faXRlbScpO1xyXG5cdFx0bGV0IGFjdGl2ZUl0ZW0gICA9IGl0ZW1zLmZpbHRlcignLnNsaWRlci1jb250cm9sc19faXRlbS1hY3RpdmUnKTtcclxuXHRcdGxldCBjb3VudGVyICAgICAgPSBhY3RpdmVJdGVtLmluZGV4KCk7XHJcblxyXG5cdFx0Ly8g0LLRi9Cx0YDQsNGC0Ywg0L3Rg9C20L3Ri9GD0Y4g0YHRgdGL0LvQutGDXHJcblx0XHRjb25zdCByZXFMaW5rID0gc2xpZGVJbmZvW2NvdW50ZXJdLmxpbms7XHJcblxyXG5cdFx0Ly8g0YHQvNC10L3QuNGC0Ywg0YHRgdGL0LvQutGDIFxyXG5cdFx0bGluay5hdHRyKCdocmVmJywgcmVxTGluayk7XHJcblxyXG5cdH1cclxuXHJcblx0Ly8g0YTRg9C90LrRhtC40Y8g0LTQu9GPINCw0L3QuNC80LDRhtC40Lgg0YHRgtGA0L7QutC4XHJcblx0Y29uc3QgYW5pbWF0ZVJvdyA9IChzdHIpID0+IHtcclxuXHJcblx0XHQvLyDQv9C10YDQtdC80LXQvdC90YvQtVxyXG5cdFx0bGV0IHRpbWUgPSA1MCxcclxuXHRcdFx0YW5pbWF0ZSA9IHN0ci5maW5kKCcuZXhhbXBsZScpLmNoaWxkcmVuKCdzcGFuJyk7XHJcblxyXG5cdFx0Ly8g0LjQt9C90LDRh9Cw0LvRjNC90L4g0YHQutGA0YvRgtGMINGN0LvQtdC80LXQvdGC0YtcclxuXHRcdGFuaW1hdGUuY3NzKCdvcGFjaXR5JywgMCk7XHJcblxyXG5cdFx0Lyog0LTQu9GPINC60LDQttC00L7Qs9C+INGN0LvQtdC80LXQvdGC0LAg0YEg0YDQsNC30L3QvtC5INGB0LrQvtGA0L7RgdGC0YzRjiDQtNC+0LHQsNCy0LjRgtGMINC60LvQsNGB0YEg0YEg0LDQvdC40LzQsNGG0LjQtdC5ICovXHJcblx0XHRhbmltYXRlLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdGxldCAkdGhpcyA9ICQodGhpcyk7XHJcblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdCR0aGlzLmFkZENsYXNzKCdzbGlkZXJfX3RleHQtLWFuaW1hdGUnKTtcclxuXHRcdFx0fSwgdGltZSk7XHJcblx0XHRcdHRpbWUgPSB0aW1lICsgNTA7XHJcblx0XHR9KTtcclxuXHJcblx0fTtcclxuXHJcblx0Ly8g0YTRg9C90LrRhtC40Y8g0LTQu9GPINGB0LzQtdC90Ysg0L7Qv9C40YHQsNC90LjRjyBcItCd0LDQt9Cw0LRcIlxyXG5cdGNvbnN0IHNwYW5Sb3dQcmV2ID0gKGNvbnRhaW5lcixzdHIsZGF0YSkgPT4ge1xyXG5cclxuXHRcdC8vINC/0LXRgNC10LzQtdC90L3Ri9C1XHJcblx0XHRsZXQgaXRlbXMgICAgICAgID0gY29udGFpbmVyLmZpbmQoJy5zbGlkZXItY29udHJvbHNfX2l0ZW0nKTtcclxuXHRcdGxldCBhY3RpdmVJdGVtICAgPSBpdGVtcy5maWx0ZXIoJy5zbGlkZXItY29udHJvbHNfX2l0ZW0tYWN0aXZlJyk7XHJcblx0XHRsZXQgY291bnRlciAgICAgID0gYWN0aXZlSXRlbS5pbmRleCgpO1xyXG5cdFx0bGV0IHJvdyAgICAgICAgICA9IGRhdGEgPT0gJ3RpdGxlJyA/IHNsaWRlckluZm9bY291bnRlcl0udGl0bGUgOiBzbGlkZXJJbmZvW2NvdW50ZXJdLnRvb2xzOyBcclxuXHRcdGxldCBzcGFuICAgICAgICAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcblx0XHRsZXQgdG9Sb3cgICAgICAgID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0JCh0b1JvdykuYWRkQ2xhc3MoJ2V4YW1wbGUnKTtcclxuXHJcblx0XHQvLyDRgNCw0LfQsdC40YLRjCDRgdGC0YDQvtC60YMg0L3QsCDRgdC/0LDQvdGLINC/0L4g0L7QtNC90L7QvNGDINGB0LjQvNCy0L7Qu9GDXHJcblx0XHRyb3cuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24oaXRlbSl7XHJcblx0XHRcdHNwYW4uaW5uZXJIVE1MID0gaXRlbTtcclxuXHRcdFx0aWYgKGl0ZW0gPT09ICcgJykgc3Bhbi5zdHlsZS5kaXNwbGF5ID0gXCJpbmxpbmVcIjtcclxuXHRcdFx0dG9Sb3cuYXBwZW5kQ2hpbGQoc3Bhbik7XHJcblx0XHRcdHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQvLyDQt9Cw0LzQtdC90LjRgtGMINGC0L4g0YfRgtC+INCx0YvQu9C+INC90LAg0YLQviDRh9GC0L4g0L/QvtC70YPRh9C40LvQvtGB0YxcclxuXHRcdHN0ci5odG1sKHRvUm93KTtcclxuXHR9XHJcblxyXG5cdC8vINGE0YPQvdC60YbQuNGPINC00LvRjyDRgdC80LXQvdGLINC+0L/QuNGB0LDQvdC40Y8gXCLQktC/0LXRgNC10LRcIlxyXG5cdGNvbnN0IHNwYW5Sb3dOZXh0ID0gKGNvbnRhaW5lcixzdHIsZGF0YSkgPT4ge1xyXG5cclxuXHRcdC8vINC/0LXRgNC10LzQtdC90L3Ri9C1XHJcblx0XHRsZXQgaXRlbXMgICAgICAgID0gY29udGFpbmVyLmZpbmQoJy5zbGlkZXItY29udHJvbHNfX2l0ZW0nKTtcclxuXHRcdGxldCBhY3RpdmVJdGVtICAgPSBpdGVtcy5maWx0ZXIoJy5zbGlkZXItY29udHJvbHNfX2l0ZW0tYWN0aXZlJyk7XHJcblx0XHRsZXQgY291bnRlciAgICAgID0gYWN0aXZlSXRlbS5pbmRleCgpO1xyXG5cdFx0bGV0IHJvdyAgICAgICAgICA9IGRhdGEgPT0gJ3RpdGxlJyA/IHNsaWRlckluZm9bY291bnRlcl0udGl0bGUgOiBzbGlkZXJJbmZvW2NvdW50ZXJdLnRvb2xzOyBcclxuXHRcdGxldCBzcGFuICAgICAgICAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcblx0XHRsZXQgdG9Sb3cgICAgICAgID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0JCh0b1JvdykuYWRkQ2xhc3MoJ2V4YW1wbGUnKTtcclxuXHJcblx0XHQvLyDRgNCw0LfQsdC40YLRjCDRgdGC0YDQvtC60YMg0L3QsCDRgdC/0LDQvdGLINC/0L4g0L7QtNC90L7QvNGDINGB0LjQvNCy0L7Qu9GDXHJcblx0XHRyb3cuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24oaXRlbSl7XHJcblx0XHRcdHNwYW4uaW5uZXJIVE1MID0gaXRlbTtcclxuXHRcdFx0aWYgKGl0ZW0gPT09ICcgJykgc3Bhbi5zdHlsZS5kaXNwbGF5ID0gXCJpbmxpbmVcIjtcclxuXHRcdFx0dG9Sb3cuYXBwZW5kQ2hpbGQoc3Bhbik7XHJcblx0XHRcdHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQvLyDQt9Cw0LzQtdC90LjRgtGMINGC0L4g0YfRgtC+INCx0YvQu9C+INC90LAg0YLQviDRh9GC0L4g0L/QvtC70YPRh9C40LvQvtGB0YxcclxuXHRcdHN0ci5odG1sKHRvUm93KTtcclxuXHR9XHJcblxyXG5cdC8vINC/0YDQuCDQutC70LjQutC1INC90LAg0LrQvdC+0L/QutGDIFwi0J3QsNC30LDQtFwiXHJcblx0YnRuUHJldi5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0c3BhblJvd1ByZXYoYnRuUHJldix0aXRsZSwgJ3RpdGxlJyk7XHJcblx0XHRhbmltYXRlUm93KHRpdGxlKTtcclxuXHRcdHNwYW5Sb3dQcmV2KGJ0blByZXYsdG9vbHMsICd0b29scycpO1xyXG5cdFx0YW5pbWF0ZVJvdyh0b29scyk7XHJcblx0XHRzZXRMaW5rKGJ0blByZXYpO1xyXG5cdH0pO1xyXG5cclxuXHQvLyDQv9GA0Lgg0LrQu9C40LrQtSDQvdCwINC60L3QvtC/0LrRgyBcItCS0L/QtdGA0LXQtFwiXHJcblx0YnRuTmV4dC5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0c3BhblJvd05leHQoYnRuTmV4dCx0aXRsZSwgJ3RpdGxlJyk7XHJcblx0XHRhbmltYXRlUm93KHRpdGxlKTtcclxuXHRcdHNwYW5Sb3dOZXh0KGJ0bk5leHQsdG9vbHMsJ3Rvb2xzJyk7XHJcblx0XHRhbmltYXRlUm93KHRvb2xzKTtcclxuXHRcdHNldExpbmsoYnRuTmV4dCk7XHJcblx0fSk7XHJcblxyXG5cclxufSk7IiwiLy8g0JHQuNCx0LvQuNC+0YLQtdC60LAgc3ZnNGV2ZXJ5Ym9keSDQtNC70Y8gc3ZnXHJcblxyXG4kKGZ1bmN0aW9uKCl7XHJcblx0c3ZnNGV2ZXJ5Ym9keSgpO1xyXG59KSIsIi8vIGpzINGE0LDQudC7INC00LvRjyDQutCw0YDRgtGLXHJcblxyXG4kKGZ1bmN0aW9uKCkge1xyXG4gICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkRG9tTGlzdGVuZXIod2luZG93LCAnbG9hZCcsIGluaXQpO1xyXG4gICAgdmFyIG1hcCwgbWFya2Vyc0FycmF5ID0gW107XHJcblxyXG4gICAgZnVuY3Rpb24gYmluZEluZm9XaW5kb3cobWFya2VyLCBtYXAsIGxvY2F0aW9uKSB7XHJcbiAgICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIobWFya2VyLCAnY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZnVuY3Rpb24gY2xvc2UobG9jYXRpb24pIHtcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uLmliLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5pbmZvV2luZG93VmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgbG9jYXRpb24uaWIgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAobG9jYXRpb24uaW5mb1dpbmRvd1Zpc2libGUgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIGNsb3NlKGxvY2F0aW9uKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1hcmtlcnNBcnJheS5mb3JFYWNoKGZ1bmN0aW9uKGxvYywgaW5kZXgpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsb2MuaWIgJiYgbG9jLmliICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlKGxvYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGJveFRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgICAgIGJveFRleHQuc3R5bGUuY3NzVGV4dCA9ICdiYWNrZ3JvdW5kOiAjZmZmOyc7XHJcbiAgICAgICAgICAgICAgICBib3hUZXh0LmNsYXNzTGlzdC5hZGQoJ21kLXdoaXRlZnJhbWUtMmRwJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gYnVpbGRQaWVjZXMobG9jYXRpb24sIGVsLCBwYXJ0LCBpY29uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxvY2F0aW9uW3BhcnRdID09PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChsb2NhdGlvbi5pd1twYXJ0XSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2goZWwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncGhvdG8nOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsb2NhdGlvbi5waG90byl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnPGRpdiBjbGFzcz1cIml3LXBob3RvXCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJyArIGxvY2F0aW9uLnBob3RvICsgJyk7XCI+PC9kaXY+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2l3LXRvb2xiYXInOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnPGRpdiBjbGFzcz1cIml3LXRvb2xiYXJcIj48aDMgY2xhc3M9XCJtZC1zdWJoZWFkXCI+JyArIGxvY2F0aW9uLnRpdGxlICsgJzwvaDM+PC9kaXY+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2Rpdic6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoKHBhcnQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdlbWFpbCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzxkaXYgY2xhc3M9XCJpdy1kZXRhaWxzXCI+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiIHN0eWxlPVwiY29sb3I6IzQyODVmNDtcIj48aW1nIHNyYz1cIi8vY2RuLm1hcGtpdC5pby92MS9pY29ucy8nICsgaWNvbiArICcuc3ZnXCIvPjwvaT48c3Bhbj48YSBocmVmPVwibWFpbHRvOicgKyBsb2NhdGlvbi5lbWFpbCArICdcIiB0YXJnZXQ9XCJfYmxhbmtcIj4nICsgbG9jYXRpb24uZW1haWwgKyAnPC9hPjwvc3Bhbj48L2Rpdj4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3dlYic6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzxkaXYgY2xhc3M9XCJpdy1kZXRhaWxzXCI+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiIHN0eWxlPVwiY29sb3I6IzQyODVmNDtcIj48aW1nIHNyYz1cIi8vY2RuLm1hcGtpdC5pby92MS9pY29ucy8nICsgaWNvbiArICcuc3ZnXCIvPjwvaT48c3Bhbj48YSBocmVmPVwiJyArIGxvY2F0aW9uLndlYiArICdcIiB0YXJnZXQ9XCJfYmxhbmtcIj4nICsgbG9jYXRpb24ud2ViX2Zvcm1hdHRlZCArICc8L2E+PC9zcGFuPjwvZGl2Pic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZGVzYyc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzxsYWJlbCBjbGFzcz1cIml3LWRlc2NcIiBmb3I9XCJjYl9kZXRhaWxzXCI+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwiY2JfZGV0YWlsc1wiLz48aDMgY2xhc3M9XCJpdy14LWRldGFpbHNcIj5EZXRhaWxzPC9oMz48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zIHRvZ2dsZS1vcGVuLWRldGFpbHNcIj48aW1nIHNyYz1cIi8vY2RuLm1hcGtpdC5pby92MS9pY29ucy8nICsgaWNvbiArICcuc3ZnXCIvPjwvaT48cCBjbGFzcz1cIml3LXgtZGV0YWlsc1wiPicgKyBsb2NhdGlvbi5kZXNjICsgJzwvcD48L2xhYmVsPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnPGRpdiBjbGFzcz1cIml3LWRldGFpbHNcIj48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+PGltZyBzcmM9XCIvL2Nkbi5tYXBraXQuaW8vdjEvaWNvbnMvJyArIGljb24gKyAnLnN2Z1wiLz48L2k+PHNwYW4+JyArIGxvY2F0aW9uW3BhcnRdICsgJzwvc3Bhbj48L2Rpdj4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdvcGVuX2hvdXJzJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbXMgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobG9jYXRpb24ub3Blbl9ob3Vycy5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsb2NhdGlvbi5vcGVuX2hvdXJzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSAhPT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXMgKz0gJzxsaT48c3Ryb25nPicgKyBsb2NhdGlvbi5vcGVuX2hvdXJzW2ldLmRheSArICc8L3N0cm9uZz48c3Ryb25nPicgKyBsb2NhdGlvbi5vcGVuX2hvdXJzW2ldLmhvdXJzICsnPC9zdHJvbmc+PC9saT4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZpcnN0ID0gJzxsaT48bGFiZWwgZm9yPVwiY2JfaG91cnNcIj48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCJjYl9ob3Vyc1wiLz48c3Ryb25nPicgKyBsb2NhdGlvbi5vcGVuX2hvdXJzWzBdLmRheSArICc8L3N0cm9uZz48c3Ryb25nPicgKyBsb2NhdGlvbi5vcGVuX2hvdXJzWzBdLmhvdXJzICsnPC9zdHJvbmc+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29ucyB0b2dnbGUtb3Blbi1ob3Vyc1wiPjxpbWcgc3JjPVwiLy9jZG4ubWFwa2l0LmlvL3YxL2ljb25zL2tleWJvYXJkX2Fycm93X2Rvd24uc3ZnXCIvPjwvaT48dWw+JyArIGl0ZW1zICsgJzwvdWw+PC9sYWJlbD48L2xpPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwiaXctbGlzdFwiPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgZmlyc3QtbWF0ZXJpYWwtaWNvbnNcIiBzdHlsZT1cImNvbG9yOiM0Mjg1ZjQ7XCI+PGltZyBzcmM9XCIvL2Nkbi5tYXBraXQuaW8vdjEvaWNvbnMvJyArIGljb24gKyAnLnN2Z1wiLz48L2k+PHVsPicgKyBmaXJzdCArICc8L3VsPjwvZGl2Pic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBib3hUZXh0LmlubmVySFRNTCA9IFxyXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkUGllY2VzKGxvY2F0aW9uLCAncGhvdG8nLCAncGhvdG8nLCAnJykgK1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkUGllY2VzKGxvY2F0aW9uLCAnaXctdG9vbGJhcicsICd0aXRsZScsICcnKSArXHJcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRQaWVjZXMobG9jYXRpb24sICdkaXYnLCAnYWRkcmVzcycsICdsb2NhdGlvbl9vbicpICtcclxuICAgICAgICAgICAgICAgICAgICBidWlsZFBpZWNlcyhsb2NhdGlvbiwgJ2RpdicsICd3ZWInLCAncHVibGljJykgK1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkUGllY2VzKGxvY2F0aW9uLCAnZGl2JywgJ2VtYWlsJywgJ2VtYWlsJykgK1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkUGllY2VzKGxvY2F0aW9uLCAnZGl2JywgJ3RlbCcsICdwaG9uZScpICtcclxuICAgICAgICAgICAgICAgICAgICBidWlsZFBpZWNlcyhsb2NhdGlvbiwgJ2RpdicsICdpbnRfdGVsJywgJ3Bob25lJykgK1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkUGllY2VzKGxvY2F0aW9uLCAnb3Blbl9ob3VycycsICdvcGVuX2hvdXJzJywgJ2FjY2Vzc190aW1lJykgK1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkUGllY2VzKGxvY2F0aW9uLCAnZGl2JywgJ2Rlc2MnLCAna2V5Ym9hcmRfYXJyb3dfZG93bicpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBteU9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxpZ25Cb3R0b206IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogYm94VGV4dCxcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlQXV0b1BhbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBtYXhXaWR0aDogMCxcclxuICAgICAgICAgICAgICAgICAgICBwaXhlbE9mZnNldDogbmV3IGdvb2dsZS5tYXBzLlNpemUoLTE0MCwgLTQwKSxcclxuICAgICAgICAgICAgICAgICAgICB6SW5kZXg6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgYm94U3R5bGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICcyODBweCdcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlQm94TWFyZ2luOiAnMHB4IDBweCAwcHggMHB4JyxcclxuICAgICAgICAgICAgICAgICAgICBpbmZvQm94Q2xlYXJhbmNlOiBuZXcgZ29vZ2xlLm1hcHMuU2l6ZSgxLCAxKSxcclxuICAgICAgICAgICAgICAgICAgICBpc0hpZGRlbjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFuZTogJ2Zsb2F0UGFuZScsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlRXZlbnRQcm9wYWdhdGlvbjogZmFsc2VcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgbG9jYXRpb24uaWIgPSBuZXcgSW5mb0JveChteU9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgbG9jYXRpb24uaWIub3BlbihtYXAsIG1hcmtlcik7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5pbmZvV2luZG93VmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgICAgIHZhciBtYXBPcHRpb25zID0ge1xyXG4gICAgICAgICAgICBjZW50ZXI6IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoNTUuNzQ4MzU4MTEyNzIwMzc1LDUyLjM1NDE3NTg4NzQ5OTk4KSxcclxuICAgICAgICAgICAgem9vbTogMTMsXHJcbiAgICAgICAgICAgIGdlc3R1cmVIYW5kbGluZzogJ2Nvb3BlcmF0aXZlJyxcclxuICAgICAgICAgICAgZnVsbHNjcmVlbkNvbnRyb2w6IGZhbHNlLFxyXG4gICAgICAgICAgICB6b29tQ29udHJvbDogdHJ1ZSxcclxuICAgICAgICAgICAgZGlzYWJsZURvdWJsZUNsaWNrWm9vbTogdHJ1ZSxcclxuICAgICAgICAgICAgbWFwVHlwZUNvbnRyb2w6IHRydWUsXHJcbiAgICAgICAgICAgIG1hcFR5cGVDb250cm9sT3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgc3R5bGU6IGdvb2dsZS5tYXBzLk1hcFR5cGVDb250cm9sU3R5bGUuSE9SSVpPTlRBTF9CQVIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNjYWxlQ29udHJvbDogZmFsc2UsXHJcbiAgICAgICAgICAgIHNjcm9sbHdoZWVsOiBmYWxzZSxcclxuICAgICAgICAgICAgc3RyZWV0Vmlld0NvbnRyb2w6IGZhbHNlLFxyXG4gICAgICAgICAgICBkcmFnZ2FibGUgOiB0cnVlLFxyXG4gICAgICAgICAgICBjbGlja2FibGVJY29uczogdHJ1ZSxcclxuICAgICAgICAgICAgem9vbUNvbnRyb2xPcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogZ29vZ2xlLm1hcHMuQ29udHJvbFBvc2l0aW9uLlJJR0hUX0NFTlRFUlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBtYXBUeXBlQ29udHJvbE9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBnb29nbGUubWFwcy5Db250cm9sUG9zaXRpb24uUklHSFRfVE9QXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG1hcFR5cGVJZDogZ29vZ2xlLm1hcHMuTWFwVHlwZUlkLlJPQURNQVAsXHJcbiAgICAgICAgICAgIHN0eWxlczogW3tcImZlYXR1cmVUeXBlXCI6XCJ3YXRlclwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiIzQ2YmNlY1wifSx7XCJ2aXNpYmlsaXR5XCI6XCJvblwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJsYW5kc2NhcGVcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiNmMmYyZjJcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicm9hZFwiLFwic3R5bGVyc1wiOlt7XCJzYXR1cmF0aW9uXCI6LTEwMH0se1wibGlnaHRuZXNzXCI6NDV9XX0se1wiZmVhdHVyZVR5cGVcIjpcInJvYWQuaGlnaHdheVwiLFwic3R5bGVyc1wiOlt7XCJ2aXNpYmlsaXR5XCI6XCJzaW1wbGlmaWVkXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInJvYWQuYXJ0ZXJpYWxcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHMuaWNvblwiLFwic3R5bGVyc1wiOlt7XCJ2aXNpYmlsaXR5XCI6XCJvZmZcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwiYWRtaW5pc3RyYXRpdmVcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHMudGV4dC5maWxsXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjNDQ0NDQ0XCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInRyYW5zaXRcIixcInN0eWxlcnNcIjpbe1widmlzaWJpbGl0eVwiOlwib2ZmXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInBvaVwiLFwic3R5bGVyc1wiOlt7XCJ2aXNpYmlsaXR5XCI6XCJvZmZcIn1dfV1cclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG1hcEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwJyk7XHJcbiAgICAgICAgdmFyIG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAobWFwRWxlbWVudCwgbWFwT3B0aW9ucyk7XHJcbiAgICAgICAgdmFyIGxvY2F0aW9ucyA9IFtcclxuICAgICAgICAgICAge1widGl0bGVcIjpcIkFORFJFV1wiLFwidGVsXCI6XCIrNyg5NTEpODk2LTQyLTQ0XCIsXCJlbWFpbFwiOlwia2F0YXNoaTEzMjhAbWFpbC5ydVwiLFwid2ViXCI6XCJodHRwczovL2FuZHJld2xleWtpbi5naXRodWIuaW8vcG9ydGZvbGlvL2J1aWxkL1wiLFwid2ViX2Zvcm1hdHRlZFwiOlwiYW5kcmV3bGV5a2luLmdpdGh1Yi5pb1wiLFwibGF0XCI6NTUuNzM0NzA1NzA0NTkyODA1LFwibG5nXCI6NTIuMzk3NTE1MDIwNzYyNjI2LFwidmljaW5pdHlcIjpcIlwiLFwibWFya2VyXCI6e1wiZmlsbENvbG9yXCI6XCIjMDBBQ0MxXCIsXCJmaWxsT3BhY2l0eVwiOjEsXCJzdHJva2VXZWlnaHRcIjowLFwic2NhbGVcIjoxLjUsXCJwYXRoXCI6XCJNMTAuMiw3LjRjLTYsMC0xMC45LDQuOS0xMC45LDEwLjljMCw2LDEwLjksMTguNCwxMC45LDE4LjRzMTAuOS0xMi4zLDEwLjktMTguNEMyMS4yLDEyLjIsMTYuMyw3LjQsMTAuMiw3LjR6IE0xMC4yLDIyLjljLTIuNiwwLTQuNi0yLjEtNC42LTQuNnMyLjEtNC42LDQuNi00LjZzNC42LDIuMSw0LjYsNC42UzEyLjgsMjIuOSwxMC4yLDIyLjl6XCIsXCJhbmNob3JcIjp7XCJ4XCI6MTAsXCJ5XCI6MzB9LFwib3JpZ2luXCI6e1wieFwiOjAsXCJ5XCI6MH0sXCJzdHlsZVwiOjF9LFwiaXdcIjp7XCJ0ZWxcIjp0cnVlLFwid2ViXCI6dHJ1ZSxcImVtYWlsXCI6dHJ1ZX19XHJcbiAgICAgICAgXTtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbG9jYXRpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xyXG4gICAgICAgICAgICAgICAgaWNvbjogbG9jYXRpb25zW2ldLm1hcmtlcixcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKGxvY2F0aW9uc1tpXS5sYXQsIGxvY2F0aW9uc1tpXS5sbmcpLFxyXG5cclxuICAgICAgICAgICAgICAgIG1hcDogbWFwLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IGxvY2F0aW9uc1tpXS50aXRsZSxcclxuICAgICAgICAgICAgICAgIGFkZHJlc3M6IGxvY2F0aW9uc1tpXS5hZGRyZXNzLFxyXG4gICAgICAgICAgICAgICAgZGVzYzogbG9jYXRpb25zW2ldLmRlc2MsXHJcbiAgICAgICAgICAgICAgICB0ZWw6IGxvY2F0aW9uc1tpXS50ZWwsXHJcbiAgICAgICAgICAgICAgICBpbnRfdGVsOiBsb2NhdGlvbnNbaV0uaW50X3RlbCxcclxuICAgICAgICAgICAgICAgIHZpY2luaXR5OiBsb2NhdGlvbnNbaV0udmljaW5pdHksXHJcbiAgICAgICAgICAgICAgICBvcGVuOiBsb2NhdGlvbnNbaV0ub3BlbixcclxuICAgICAgICAgICAgICAgIG9wZW5faG91cnM6IGxvY2F0aW9uc1tpXS5vcGVuX2hvdXJzLFxyXG4gICAgICAgICAgICAgICAgcGhvdG86IGxvY2F0aW9uc1tpXS5waG90byxcclxuICAgICAgICAgICAgICAgIHRpbWU6IGxvY2F0aW9uc1tpXS50aW1lLFxyXG4gICAgICAgICAgICAgICAgZW1haWw6IGxvY2F0aW9uc1tpXS5lbWFpbCxcclxuICAgICAgICAgICAgICAgIHdlYjogbG9jYXRpb25zW2ldLndlYixcclxuICAgICAgICAgICAgICAgIGl3OiBsb2NhdGlvbnNbaV0uaXdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG1hcmtlcnNBcnJheS5wdXNoKG1hcmtlcik7XHJcblxyXG4gICAgICAgICAgICBpZiAobG9jYXRpb25zW2ldLml3LmVuYWJsZSA9PT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICBiaW5kSW5mb1dpbmRvdyhtYXJrZXIsIG1hcCwgbG9jYXRpb25zW2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG5cclxufSk7IFxyXG4iXX0=
