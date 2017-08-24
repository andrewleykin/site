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
			"title": "Landing - SEDONA",
			"tools": "html, css, javascript, adaptiv",
			"link": "../works/sedona/index.html"
		},
		{
			"title": "Lnading - Hostel",
			"tools": "html, css, adaptiv",
			"link": "../works/hostel/index.html"
		},
		{
			"title": "Lnading - Keksbi",
			"tools": "html, css, adaptiv",
			"link": "../works/keksbi/index.html"
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lbnUuanMiLCJwYXJhbGxheC5qcyIsInByZWxvYWRlci5qcyIsInZhbGlkYXRlLmpzIiwic2Nyb2xsLmpzIiwiaW5kZXgtcGFyYWxsYXguanMiLCJmbGlwLmpzIiwiZmxpcF9fc2hvdy5qcyIsInN0aWNreS1zaWRlYmFyLmpzIiwibmF2LXNpZGViYXIuanMiLCJzaWRlYmFyX19zaG93LmpzIiwiY2lyY2xlLWFuaW1hdGUuanMiLCJzbGlkZXJfX2NvbnRyb2xzLmpzIiwic2xpZGVyX19kaXNwbGF5LmpzIiwic2xpZGVyX19pbmZvLmpzIiwic3ZnNGV2ZXJ5Ym9keS5qcyIsIm1hcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGpzINC00LvRjyDQvNC10L3RjlxyXG5cclxuKGZ1bmN0aW9uKCkge1xyXG4gICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgLy8g0J/QtdGA0LXQvNC10L3QvdGL0LVcclxuICB2YXIgbGluayA9ICQoJy5oZWFkZXJfX21lbnUnKSxcclxuICAgICAgbGlua19fYWN0aXZlPSAnaGVhZGVyX19tZW51X19hY3RpdmUnLFxyXG4gICAgICBsaXN0ID0gJCgnLm1haW4tbWVudV9fbGlzdCcpLFxyXG4gICAgICBiZyA9ICQoJy5tYWluLW1lbnUnKSxcclxuICAgICAgc29jaWFsID0gJCgnLmhlYWRlcl9fc29jaWFsJyksXHJcbiAgICAgIGFuaW1hdGUgPSAnbWFpbi1tZW51X19hbmltYXRlJztcclxuXHJcbiAgICAvLyDQv9GA0L7QvNC40YEg0LrQvtGC0L7RgNGL0Lkg0LHRg9C00LXRgiDQv9GA0L7QstC10YDRj9GC0Ywg0L3QsNC70LjRh9C40LUg0YHRgdGL0LvQutC4KNCz0LDQvNCx0YPRgNCz0LXRgNCwKVxyXG4gICAgdmFyIG1lbnVQcm9taXNlID0gbmV3IFByb21pc2UgKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICBpZiAobGluay5sZW5ndGgpIHtcclxuICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVqZWN0KCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vINGE0YPQvdC60YbQuNGPINC/0YDQuCDQvdCw0LvQuNGH0LjQuCDRgdGB0YvQu9C60Lgo0LPQsNC80LHRg9GA0LPQtdGA0LApXHJcbiAgICBtZW51UHJvbWlzZS50aGVuKGZ1bmN0aW9uKCl7XHJcbiAgICAgIGxpbmsub24oJ2NsaWNrJywgY2xpY2tGdW5jdGlvbik7XHJcbiAgICB9KS5jYXRjaChmdW5jdGlvbigpe1xyXG4gICAgICByZXR1cm4gO1xyXG4gICAgfSk7XHJcblxyXG5cclxuXHJcbiAgLy8g0KTRg9C90LrRhtC40Y8g0L/RgNC4INC90LDQttCw0YLQuNC4INC90LAg0LzQtdC90Y4t0YjQsNC80LHRg9GA0LPQtdGAXHJcbiAgdmFyIGNsaWNrRnVuY3Rpb24gPSBmdW5jdGlvbiAoZSkge1xyXG4gIFx0ZS5wcmV2ZW50RGVmYXVsdCgpOyAvLyDQvtGC0LzQtdC90LAg0YHRgtCw0L3QtNCw0YDRgtC90YvRhSDQtNC10LnRgdCy0YLQudC4XHJcblxyXG4gIFx0JCh0aGlzKS50b2dnbGVDbGFzcyhsaW5rX19hY3RpdmUpOyAvLyDQuNC30LzQtdC90Y/QtdC8INC90LAg0LDQutGC0LjQstC90L7QtSDRgdC+0YHRgtC+0Y/QvdC40LVcclxuXHJcbiAgXHQvLyDQldGB0LvQuCDQutC90L7Qv9C60LAg0LDQutGC0LjQstC90LAg0YLQvlxyXG4gIFx0aWYobGluay5oYXNDbGFzcyhsaW5rX19hY3RpdmUpKSB7XHJcbiAgXHRcdGJnLmNzcygnZGlzcGxheScsICdibG9jaycpLmFkZENsYXNzKGFuaW1hdGUpOyAvLyDQvtGC0L7QsdGA0LDQt9C40YLRjCDQvNC10L3Rjiwg0Lgg0LTQvtCx0LDQstC40YLRjCDQutC70LDRgdGBINCw0L3QuNC80LDRhtC40LhcclxuICBcdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gIFx0XHRcdHNvY2lhbC5jc3MoJ29wYWNpdHknLCAnMCcpOyAvLyDRh9C10YDQtdC3IDIwMCDQvNC40LvQuNGB0LXQutGD0L3QtCDRgdC60YDRi9GC0Ywg0LjQutC+0L3QutC4XHJcbiAgXHRcdH0sMjAwKTtcclxuICAgIFx0Ly8g0YfQtdGA0LXQtyA3MDAg0LzQuNC70LjRgdC10LrRg9C90LQg0L7RgtC+0LHRgNCw0LbQsNGC0Ywg0YHQv9C40YHQvtC6INC80LXQvdGOXHJcbiAgICBcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgIFx0XHRsaXN0LmNzcygndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZVkoMCknKTtcclxuICAgIFx0fSw4MDApO1xyXG4gICAgfSBlbHNlIHsgLy8g0JXRgdC70Lgg0LrQvdC+0L/QutCwINC90LUg0LDQutGC0LjQstC90LBcclxuICAgICAgYmcuY3NzKCdkaXNwbGF5JywgJ25vbmUnKS5yZW1vdmVDbGFzcyhhbmltYXRlKTsgLy8g0YHQutGA0YvRgtGMINC80LXQvdGOLCDRg9C00LDQu9C40YLRjCDQutC70LDRgdGBINCw0L3QuNC80LDRhtC40LhcclxuICAgICAgc29jaWFsLmNzcygnb3BhY2l0eScsICcxJykgLy8g0L7RgtC+0LHRgNCw0LfQuNGC0Ywg0LjQutC+0L3QutC4XHJcbiAgICAgIGxpc3QuY3NzKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlWSgtMTAwJSknKTtcclxuICAgIH1cclxuXHJcblxyXG4gIH07XHJcbn0pKCk7IiwiLy8ganMg0LTQu9GPINC/0LDRgNCw0LvQu9Cw0LrRgSDRjdGE0YTQtdC60YLQsCwg0L3QsCDRhNC+0L3QtSDQs9C+0YBcclxuJ3VzZSBzY3RyaWN0JztcclxuXHJcbiQoZnVuY3Rpb24oKXtcclxuXHQvLyDQt9Cw0LTQsNGR0Lwg0L7QsdGJ0YPRjiDQv9C10YDQtdC80LXQvdC90YPRjlxyXG5cdHZhciBzdmdUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzX19oZWFkZXItdGV4dCcpO1xyXG5cclxuXHQvLyDQv9GA0L7QvNC40YEg0LrQvtGC0L7RgNGL0Lkg0LHRg9C00LXRgiDQv9GA0L7QstC10YDRj9GC0Ywg0L3QsNC70LjRh9C40LUgc3ZnVGV4dCDQsiBwYWdlLWhlYWRlclxyXG5cdHZhciBwYXJhbGxheFByb21pc2UgPSBuZXcgUHJvbWlzZSAoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblx0XHRcdGlmIChzdmdUZXh0KSB7XHJcblx0XHRcdFx0cmVzb2x2ZSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblxyXG5cclxuXHQvLyDRhNGD0L3QutGG0LjRjyDQtNC70Y8gcGFyYWxsYXgg0L/RgNC4INGB0LrRgNC+0LvQtVxyXG5cdHZhciBwYXJhbGxheCA9IChmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgaW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2UtaGVhZGVyX19pbWcnKTtcclxuXHRcdHZhciB1c2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnVzZXItYmxvY2tfX3RvcCcpO1xyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdG1vdmU6IGZ1bmN0aW9uKGJsb2NrLCB3aW5kb3dTY3JvbGwsIHN0cmFmZUFtb3VudCkge1xyXG5cdFx0XHRcdHZhciBzdHJhZmUgPSB3aW5kb3dTY3JvbGwgLyAtc3RyYWZlQW1vdW50ICsgJyUnO1xyXG5cdFx0XHRcdHZhciB0cmFuc2Zvcm1TdHJpbmcgPSAndHJhbnNsYXRlM2QoMCwnICsgc3RyYWZlICsgJywwKSc7XHJcblxyXG5cdFx0XHRcdGJsb2NrLnN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcclxuXHRcdFx0fSxcclxuXHRcdFx0aW5pdDogZnVuY3Rpb24gKHdTY3JvbGwpIHtcclxuXHRcdFx0XHR0aGlzLm1vdmUoaW1nLCB3U2Nyb2xsLCA0NSk7XHJcblx0XHRcdFx0dGhpcy5tb3ZlKHN2Z1RleHQsIHdTY3JvbGwsIDMwKTtcclxuXHRcdFx0XHR0aGlzLm1vdmUodXNlciwgd1Njcm9sbCwgMTApO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSgpKTtcclxuXHR3aW5kb3cub25zY3JvbGwgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgd1Njcm9sbCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcclxuXHRcdGlmIChzdmdUZXh0KSB7XHJcblx0XHRcdFx0cGFyYWxsYXguaW5pdCh3U2Nyb2xsKTtcclxuXHRcdFx0fVxyXG5cdFx0Ly8g0YTRg9C90LrRhtC40Y8g0L/RgNC4INC90LDQu9C40YfQuNC4IHN2Z1RleHQg0LIgcGFnZS1oZWFkZXJcclxuXHRcdC8vIHBhcmFsbGF4UHJvbWlzZS50aGVuKGZ1bmN0aW9uKCl7XHJcblx0XHQvLyBcdHBhcmFsbGF4LmluaXQod1Njcm9sbCk7XHJcblx0XHQvLyB9KTtcclxuXHR9XHJcbn0pXHJcblxyXG4iLCIvLyBqcyDRhNCw0LnQuyDQtNC70Y8g0L/RgNC10LvQvtCw0LTQtdGA0LAg0L3QsCDQu9GO0LHRi9GFINGB0YLRgNCw0L3QuNGG0LDRhVxyXG5cclxuXHJcblx0Ly8g0LfQsNC00LDRkdC8INC/0LXRgNC10LzQtdC90L3Ri9C1XHJcblx0dmFyIGltYWdlcyA9ICQoJ2ltZycpLFxyXG5cdFx0aW1hZ2VzVG90YWxDb3VudCA9IGltYWdlcy5sZW5ndGgsXHJcblx0XHRpbWFnZXNMb2FkZWRDb3VudCA9IDAsXHJcblx0XHRwZXJjRGlzcGxheSA9ICQoJy5wcmVsb2FkZXJfX3BlcmNlbnQnKSxcclxuXHRcdHByZWxvYWRlciA9ICQoJy5wcmVsb2FkZXInKSxcclxuXHRcdHJvdW5kcyA9ICQoJy5wcmVsb2FkZXJfX3JvdW5kcycpLFxyXG5cdFx0c3Ryb2tlR2xvYmFsID0gNDUwLFxyXG5cdFx0c3Ryb2tlU3RhcnQgPSA0NTAsXHJcblx0XHRzdHJva2VEYXNob2Zmc2V0O1xyXG5cclxuXHQvLyDQv9GA0L7QvNC40YEg0LrQvtGC0L7RgNGL0Lkg0LHRg9C00LXRgiDQv9GA0L7QstC10YDRj9GC0Ywg0L3QsNC70LjRh9C40LUg0L/RgNC10LvQvtCw0LTQtdGA0LAg0L3QsCDRgdGC0YDQsNC90LjRhtC1XHJcblx0dmFyIHByZWxvYWRlclByb21pc2UgPSBuZXcgUHJvbWlzZSAoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblx0XHRcdGlmIChwcmVsb2FkZXIubGVuZ3RoKSB7XHJcblx0XHRcdFx0cmVzb2x2ZSgpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlamVjdCgpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0Ly8g0YTRg9C90LrRhtC40Y8g0L/RgNC4INC90LDQu9C40YfQuNC4INC/0YDQtdC70L7QsNC00LXRgNCwINC90LAg0YHRgtGA0LDQvdC40YbQtVxyXG5cdHByZWxvYWRlclByb21pc2UudGhlbihmdW5jdGlvbigpe1xyXG5cclxuXHRcdC8vINGG0LjQutC7INC00LvRjyDQv9C10YDQtdCx0LjRgNCw0L3QuNGPINCy0YHQtdGFINC60LDRgNGC0LjQvdC+0LpcclxuXHRcdGZvciAodmFyIGk9MDsgaSA8IGltYWdlc1RvdGFsQ291bnQ7IGkrKykge1xyXG5cdFx0XHRpbWFnZUNsb25lID0gbmV3IEltYWdlKCk7XHJcblx0XHRcdGltYWdlQ2xvbmUub25sb2FkID0gaW1hZ2VMb2FkZWQ7XHJcblx0XHRcdGltYWdlQ2xvbmUub25lcnJvciA9IGltYWdlTG9hZGVkO1xyXG5cdFx0XHRpbWFnZUNsb25lLnNyYyA9IGltYWdlc1tpXS5zcmM7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8g0YTRg9C90LrRhtC40Y8g0LTQu9GPINC/0YDQvtCy0LXRgNC60Lgg0LfQsNCz0YDRg9C30LrQuCDQstGB0LXRhSDQutCw0YDRgtC40L3QvtC6XHJcblx0XHRmdW5jdGlvbiBpbWFnZUxvYWRlZCgpIHtcclxuXHJcblx0XHRcdC8vINGD0LLQtdC70LjRh9C40LLQsNC10Lwg0YfQuNGB0LvQviDQt9Cw0LPRgNGD0LbQtdC90L3Ri9GFINC60LDRgNGC0LjQvdC+0LpcclxuXHRcdFx0aW1hZ2VzTG9hZGVkQ291bnQrKztcclxuXHJcblx0XHRcdC8vINGB0YfQuNGC0LDQtdC8INC/0YDQvtGG0LXQvdGCINC30LDQs9GA0YPQttC10L3QvdGL0YVcclxuXHRcdFx0dmFyIHBlcmMgPSBNYXRoLnJvdW5kKCgoMTAwIC8gaW1hZ2VzVG90YWxDb3VudCkgKiBpbWFnZXNMb2FkZWRDb3VudCkpICsgJyUnO1xyXG5cdFx0XHRcclxuXHRcdFx0Ly8g0LLRi9Cy0L7QtNC40Lwg0L3QsNGI0LUg0LfQvdCw0YfQtdC90LjQtSDQv9GA0L7RhtC10L3RgtC90L7QtVxyXG5cdFx0XHRwZXJjRGlzcGxheS5odG1sKHBlcmMpO1xyXG5cclxuXHRcdFx0Ly8g0YHRh9C40YLQsNC10Lwg0L7RgtC90L7RgdC40YLQtdC70YzQvdC+0LUg0LfQsNC60YDQsNGB0LrRgyDQvtCx0LLQvtC00LrQuCDQutGA0YPQs9CwXHJcblx0XHRcdHN0cm9rZURhc2hvZmZzZXQgPSBzdHJva2VTdGFydCAtIE1hdGgucm91bmQoKHN0cm9rZUdsb2JhbCAvIGltYWdlc1RvdGFsQ291bnQpKTtcclxuXHJcblx0XHRcdC8vINCy0YvRh9C40YLQsNC10Lwg0YHRgtCw0YDRgtC+0LLRi9C5INC+0YLRh9GR0YJcclxuXHRcdFx0c3Ryb2tlU3RhcnQgLT0gKHN0cm9rZUdsb2JhbCAvIGltYWdlc1RvdGFsQ291bnQpO1xyXG5cclxuXHRcdFx0Ly8g0L/RgNC40YHQstCw0LjQstCw0LXQvCDRgtC+INGH0YLQviDQv9C+0YHRh9C40YLQsNC70LgsINC90LDRiNC10LzRgyDQutGA0YPQs9GDINGB0LLQs1xyXG5cdFx0XHRyb3VuZHMuY3NzKCdzdHJva2VEYXNob2Zmc2V0Jywgc3Ryb2tlRGFzaG9mZnNldCk7XHJcblxyXG5cdFx0XHQvLyDQldGB0LvQuCDQstGB0LUg0LrQsNGA0YLQuNC90LrQuCDQt9Cw0LPRgNGD0LbQtdC90L3Riywg0YPQsdGA0LDRgtGMINCx0LvQvtC6INC/0YDQtdC70L7QsNC00LXRgFxyXG5cdFx0XHRpZihpbWFnZXNMb2FkZWRDb3VudCA+PSBpbWFnZXNUb3RhbENvdW50KSB7XHJcblx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0aWYoIXByZWxvYWRlci5oYXNDbGFzcygnZG9uZScpKXtcclxuXHRcdFx0XHRcdFx0cHJlbG9hZGVyLmFkZENsYXNzKCdkb25lJyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSwgMTAwMCk7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYocHJlbG9hZGVyLmhhc0NsYXNzKCdkb25lJykpIHtcclxuXHRcdFx0XHQkKCcuZmxpcCcpLmFkZENsYXNzKCdmbGlwX19hbmltYXRpb24nKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0pLmNhdGNoKGZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4gO1xyXG5cdFx0fSk7XHJcblxyXG5cclxuXHJcbiIsIi8vIGpzINGE0LDQudC7INC00LvRjyDQstCw0LvQuNC00LDRhtC40Lgg0YTQvtGA0LxcclxuXHJcblxyXG4oZnVuY3Rpb24oICQgKXtcclxuXHJcblxyXG5cdCQoZnVuY3Rpb24oKXtcclxuXHJcblx0XHQvLyDQt9Cw0LTQsNC10Lwg0L/QtdGA0LXQvNC10L3QvdGL0LVcclxuXHRcdHZhciBmb3JtICAgICAgID0gJCgnLmpzX19mb3JtJyksXHJcblx0XHRcdFx0aW5wdXQgICAgICA9IGZvcm0uZmluZCgnLmpzX19pbnB1dCcpLFxyXG5cdFx0XHRcdGJ0biAgICAgICAgPSBmb3JtLmZpbmQoJy5qc19fZm9ybS1idG4nKSxcclxuXHRcdFx0XHRidG5SZXNldCAgID0gZm9ybS5maW5kKCcuanNfX2Zvcm0tYnRuLS1yZXNldCcpLFxyXG5cdFx0XHRcdGljb24gICAgICAgPSBmb3JtLmZpbmQoJy5qc19fZm9ybS1pY29uJyksXHJcblx0XHRcdFx0Y2hlY2sgICAgICA9IGZvcm0uZmluZCgnLmpzX19jaGVjaycpLFxyXG5cdFx0XHRcdGVtYWlsICAgICAgPSBmb3JtLmZpbmQoJy5qc19fZm9ybS1lbWFpbCcpLFxyXG5cdFx0XHRcdHBhdHRlcm4gICAgPSAvXlthLXowLTlfLV0rQFthLXowLTktXStcXC5bYS16XXsyLDZ9JC9pLFxyXG5cdFx0XHRcdHZhbGlkICAgICAgPSB0cnVlLFxyXG5cdFx0XHRcdGlucHV0RXJyb3IgPSAnZm9ybV9faW5wdXQtLWVycm9yJyxcclxuXHRcdFx0XHRpbnB1dFN1Y2Nlc3MgPSAnZm9ybV9faW5wdXQtLXN1Y2Nlc3MnLFxyXG5cdFx0XHRcdGljb25FcnJvciAgICA9ICdmb3JtX19pY29uLS1lcnJvcicsXHJcblx0XHRcdFx0aWNvblN1Y2Nlc3MgID0gJ2Zvcm1fX2ljb24tLXN1Y2Nlc3MnO1xyXG5cclxuXHRcdC8vINGE0YPQvdC60YbQuNGPINCy0LDQu9C40LTQsNGG0LjRjyDRhNC+0YDQvNGLXHJcblx0XHR2YXIgdmFsaWRGdW5jID0gZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdFx0Ly8g0L/RgNC+0LLQtdGA0Y/QtdC8INC60LDQttC00YvQuSBpbnB1dFxyXG5cdFx0XHRpbnB1dC5lYWNoKGZ1bmN0aW9uKGkpIHtcclxuXHJcblx0XHRcdFx0Ly8g0L/RgNC+0LLQtdGA0Y/QtdC8INGD0YHQu9C+0LLQuNC1LCDQtdGB0YLRjCDQu9C4INCyINC/0L7Qu9C1INGH0YLQvi3QvdC40LTRjFxyXG5cdFx0XHRcdGlmKCQodGhpcykudmFsKCkgIT0gJycpIHtcclxuXHRcdFx0XHRcdCQodGhpcykuYWRkQ2xhc3MoaW5wdXRTdWNjZXNzKTsgXHJcblx0XHRcdFx0XHRpY29uLmVxKGkpLmFkZENsYXNzKGljb25TdWNjZXNzKTtcclxuXHRcdFx0XHRcdGJ0bi5yZW1vdmVDbGFzcygnanNfX2Zvcm0tbm8tc3VibWl0Jyk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdCQodGhpcykuYWRkQ2xhc3MoaW5wdXRFcnJvcik7XHJcblx0XHRcdFx0XHRpY29uLmVxKGkpLmFkZENsYXNzKGljb25FcnJvcik7XHJcblx0XHRcdFx0XHRidG4uYWRkQ2xhc3MoJ2pzX19mb3JtLW5vLXN1Ym1pdCcpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdH0pOyAvLyAtLT4g0LfQsNC60LDQvdGH0LjQstCw0LXQvCDQv9GA0L7QstC10YDRj9GC0Ywg0LjQvdC/0YPRgtGLXHJcblxyXG5cclxuXHRcdFx0Ly8g0YPRgdC70L7QstC40Y8g0L3QsNC70LjRh9C40Y8g0YfQtdC6LdC40L3Qv9GD0YLQvtCyXHJcblx0XHRcdGlmKGNoZWNrKSB7XHJcblxyXG5cdFx0XHRcdC8vINC/0YDQvtCy0LXRgNGP0LXQvCDQutCw0LbQtNGL0Lkg0YfQtdC6LdC40L3Qv9GD0YJcclxuXHRcdFx0XHRjaGVjay5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0XHRcdC8vINC/0YDQvtCy0LXRgNGP0LXQvCDRg9GB0LvQvtCy0LjQtSwg0LLRi9Cx0YDQsNC9INC70Lgg0LjQvdC/0YPRglxyXG5cdFx0XHRcdFx0aWYoJCh0aGlzKS5wcm9wKFwiY2hlY2tlZFwiKSl7XHJcblx0XHRcdFx0XHRcdHZhbGlkID0gdHJ1ZTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHZhbGlkID0gZmFsc2U7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRyZXR1cm4gdmFsaWQ7XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdHJldHVybiB2YWxpZDtcclxuXHRcdFx0fVxyXG5cclxuXHJcblx0XHRcdHJldHVybiB2YWxpZDtcclxuXHRcdH0gLy8gLS0+IHZhbGlkRnVuYyBpcyBlbmRcclxuXHJcblxyXG5cdFx0Ly8g0YTRg9C90LrRhtC40Y8g0LTQu9GPINC/0YDQvtCy0LXRgNC60LggZW1haWxcclxuXHRcdHZhciBlbWFpbEZ1bmM9IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHRcdC8vINC/0YDQvtCy0LXRgNGP0LXQvCDRg9GB0LvQvtCy0LjQtSwg0LXRgdGC0Ywg0LvQuCDRh9GC0L4t0L3QuNC00Ywg0LIg0L3RkdC8XHJcblx0XHRcdGlmIChlbWFpbC52YWwoKSAhPSAnJykge1xyXG5cclxuXHRcdFx0XHRcdC8vINC/0YDQvtCy0LXRgNGP0LXQvCwg0YHQvtC+0YLQstC10YLRgdGC0LLRg9C10YIg0LvQuCDRiNCw0LHQu9C+0L3RgyBlbWFpbFxyXG5cdFx0XHRcdFx0aWYoZW1haWwudmFsKCkuc2VhcmNoKHBhdHRlcm4pID09IDApe1xyXG5cdFx0XHRcdFx0XHRlbWFpbC5hZGRDbGFzcyhpbnB1dFN1Y2Nlc3MpO1xyXG5cdFx0XHRcdFx0XHR2YWxpZCA9IHRydWU7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRlbWFpbC5hZGRDbGFzcyhpbnB1dEVycm9yKTtcclxuXHRcdFx0XHRcdFx0dmFsaWQgPSBmYWxzZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0ZW1haWwuYWRkQ2xhc3MoaW5wdXRFcnJvcik7XHJcblx0XHRcdFx0XHR2YWxpZCA9IGZhbHNlXHJcblx0XHRcdFx0fVxyXG5cclxuXHJcblx0XHRcdHJldHVybiB2YWxpZDtcclxuXHRcdH0gLy8gLS0+IGVtYWlsRnVuYyBpcyBlbmRcclxuXHJcblxyXG5cdFx0Ly8g0YTRg9C90LrRhtC40Y8g0LTQu9GPIGVtYWlsLCDQutC+0LPQtNCwINC/0L7QutC40LTQsNGI0Ywg0LjQvdC/0YPRglxyXG5cdFx0ZW1haWwuYmx1cihmdW5jdGlvbigpIHtcclxuXHJcblx0XHRcdC8vINC/0YDQvtCy0LXRgNGP0LXQvCBlbWFpbCwg0L3QsCDQvdCw0LvQuNGH0LjQtSDRh9C10LPQvi3QvdC40LTRjFxyXG5cdFx0XHRpZiAoZW1haWwudmFsKCkgIT0gJycpIHtcclxuXHJcblx0XHRcdFx0Ly8g0YHQvtC+0YLQstC10YLRgdGC0LLRg9C10YIg0LvQuCDQvdCw0YjQtdC80YMg0YjQsNCx0LvQvtC90YNcclxuXHRcdFx0XHRpZihlbWFpbC52YWwoKS5zZWFyY2gocGF0dGVybikgPT0gMCl7XHJcblx0XHRcdFx0XHRlbWFpbC5hZGRDbGFzcyhpbnB1dFN1Y2Nlc3MpO1xyXG5cdFx0XHRcdFx0dmFsaWQgPSB0cnVlO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRlbWFpbC5hZGRDbGFzcyhpbnB1dEVycm9yKTtcclxuXHRcdFx0XHRcdHZhbGlkID0gZmFsc2VcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0ZW1haWwuYWRkQ2xhc3MoaW5wdXRFcnJvcik7XHJcblx0XHRcdFx0dmFsaWQgPSBmYWxzZVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fSk7XHJcblxyXG5cclxuXHRcdC8vINC/0YDQvtCy0LXRgNGP0LXQvCDQutCw0LbQtNGL0Lkg0LjQvdC/0YPRglxyXG5cdFx0aW5wdXQuZWFjaChmdW5jdGlvbihpKSB7XHJcblxyXG5cdFx0XHQvLyDQtNC70Y8g0LrQsNC20LTQvtCz0L4g0LjQvdC/0YPRgtCwINC/0YDQuCDQv9C+0LrQuNC00LDQvdC40Lgg0L/QvtC70Y9cclxuXHRcdFx0JCh0aGlzKS5ibHVyKGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0XHQvLyDQv9GA0L7QstC10YDRj9C10Lwg0L3QsNC70LjRh9C40LUg0YfQtdCz0L4t0LvQuNCx0L5cclxuXHRcdFx0XHRpZigkKHRoaXMpLnZhbCgpICE9ICcnKSB7XHJcblx0XHRcdFx0XHQkKHRoaXMpLmFkZENsYXNzKGlucHV0U3VjY2Vzcyk7XHJcblx0XHRcdFx0XHRpY29uLmVxKGkpLmFkZENsYXNzKGljb25TdWNjZXNzKTtcclxuXHRcdFx0XHRcdGJ0bi5yZW1vdmVDbGFzcygnanNfX2Zvcm0tbm8tc3VibWl0JylcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0JCh0aGlzKS5hZGRDbGFzcyhpbnB1dEVycm9yKTtcclxuXHRcdFx0XHRcdGljb24uZXEoaSkuYWRkQ2xhc3MoaWNvbkVycm9yKTtcclxuXHRcdFx0XHRcdGJ0bi5hZGRDbGFzcygnanNfX2Zvcm0tbm8tc3VibWl0Jyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHR9KTtcclxuXHJcblxyXG5cdFx0Ly8g0L/RgNC4INC60LvQuNC60LUg0L3QsCDQutC90L7Qv9C60YMg0L7RgtC/0YDQsNCy0LrQuFxyXG5cdFx0YnRuLmNsaWNrKGZ1bmN0aW9uKGUpIHtcclxuXHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0dmFsaWRGdW5jKCk7XHJcblxyXG5cdFx0XHQvLyDQtdGB0LvQuCDQtdGB0YLRjCBlbWFpbFxyXG5cdFx0XHRpZihlbWFpbCkge1xyXG5cdFx0XHRcdGVtYWlsRnVuYygpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyDQv9GA0L7QstC10YDRj9GC0Ywg0YPRgdC70L7QstC40LUg0LXRgdGC0Ywg0LvQuCDQutC70LDRgdGBXHJcblx0XHRcdGlmKGJ0bi5oYXNDbGFzcygnanNfX2Zvcm0tbm8tc3VibWl0JykpIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Zm9ybS5zdWJtaXQoKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdH0pO1xyXG5cclxuXHJcblx0XHQvLyDQv9GA0Lgg0LrQu9C40LrQtSDQvdCwINC60L3QvtC/0LrRgyBcItC+0YfQuNGB0YLQuNGC0YxcIlxyXG5cdFx0YnRuUmVzZXQuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHRcdGlucHV0LmFkZChlbWFpbCkucmVtb3ZlQ2xhc3MoaW5wdXRFcnJvciwgaW5wdXRTdWNjZXNzKTtcclxuXHRcdFx0aWNvbi5yZW1vdmVDbGFzcyhpY29uRXJyb3IsIGljb25TdWNjZXNzKTtcclxuXHRcdH0pO1xyXG5cclxuXHJcblx0fSk7IC8vIC0tPiByZWFkeSBlbmRcclxuXHJcbn0pKCBqUXVlcnkgKTsiLCIvLyBqcyDQtNC70Y8g0YHQutGA0L7Qu9C70LAg0LLQvdC40Lcg0LjQu9C4INCy0LLQtdGA0YVcclxuJ3VzZSBzY3RyaWN0JztcclxuXHJcbiQoZnVuY3Rpb24gKCl7XHJcblxyXG5cdC8vINC30LDQtNCw0ZHQvCDQv9C10YDQtdC80LXQvdC90YvQtVxyXG5cdHZhciBib2R5ID0gJCgnYm9keSwgaHRtbCcpLFxyXG5cdFx0YXJyb3dEb3duID0gJCgnLmpzX19hcnJvdy1kb3duJyksXHJcblx0XHRhcnJvd1VwID0gJCgnLmpzX19hcnJvdy11cCcpLFxyXG5cdFx0aGVhZGVySGVpZ2h0ID0gJCgnLmpzX19oZWFkZXInKS5oZWlnaHQoKTtcclxuXHJcblx0Ly8g0L/RgNC+0LLQtdGA0Y/QtdC8INC90LDQu9C40YfQuNC1INGB0YLRgNC10LvQutC4IC0tINCy0L3QuNC3XHJcblx0aWYoYXJyb3dEb3duKXtcclxuXHRcdC8vINGE0YPQvdC60YbQuNGPINC/0YDQuCDQvdCw0LbQsNGC0LjQuFxyXG5cdFx0YXJyb3dEb3duLmNsaWNrKGZ1bmN0aW9uKCl7XHJcblx0XHRcdC8vINCw0L3QuNC80LDRhtC40Y8g0YHQutGA0L7Qu9C70LBcclxuXHRcdFx0Ym9keS5hbmltYXRlKHtzY3JvbGxUb3A6IGhlYWRlckhlaWdodH0sIDE1MDApO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHQvLyDQv9GA0L7QstC10YDRj9C10Lwg0L3QsNC70LjRh9C1INGB0YLRgNC10LvQutC4IC0tINCy0LLQtdGA0YVcclxuXHRpZihhcnJvd1VwKSB7XHJcblx0XHQvLyDRhNGD0L3QutGG0LjRjyDQv9GA0Lgg0L3QsNC20LDRgtC40LhcclxuXHRcdGFycm93VXAuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHRcdC8vINCw0L3QuNC80LDRhtC40Y8g0YHQutGA0L7Qu9C70LBcclxuXHRcdFx0Ym9keS5hbmltYXRlKHtzY3JvbGxUb3A6IDB9LCAyNTAwKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcbn0pO1xyXG4iLCIvLyBqcyDQtNC70Y8gaW5kZXgtcGFyYWxsYXhcclxuXHJcbiQoZnVuY3Rpb24oKXtcclxuXHJcblx0Ly8g0LfQsNC00LDRkdC8INC/0LXRgNC10LzQtdC90L3Ri9C1XHJcblx0dmFyIHBhcmFsbGF4Q29udGFpbmVyID0gJCgnLnBhcmFsbGF4JyksXHJcblx0XHRsYXllcnMgPSAkKCcucGFyYWxsYXhfX2xheWVyJyk7XHJcblxyXG5cclxuXHQvLyDQv9GA0L7QvNC40YEg0LrQvtGC0L7RgNGL0Lkg0LHRg9C00LXRgiDQv9GA0L7QstC10YDRj9GC0Ywg0L3QsNC70LjRh9C40LUg0JPQu9Cw0LLQvdC+0LPQviDQv9Cw0YDQsNC70LvQsNC60YHQsCDQvdCwINGB0YLRgNCw0L3QuNGG0LVcclxuXHR2YXIgcGFyYWxsYXhQcm9taXNlID0gbmV3IFByb21pc2UgKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cdFx0XHRpZiAocGFyYWxsYXhDb250YWluZXIubGVuZ3RoKSB7XHJcblx0XHRcdFx0cmVzb2x2ZSgpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlamVjdCgpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0Ly8g0YTRg9C90LrRhtC40Y8g0L/RgNC4INC90LDQu9C40YfQuNC4INCz0LvQsNCy0L3QvtCz0L4g0L/QsNGA0LDQu9C70LDQutGB0LBcclxuXHRwYXJhbGxheFByb21pc2UudGhlbihmdW5jdGlvbigpe1xyXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG1vdmVMYXllcnMpO1xyXG5cdH0pLmNhdGNoKGZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4gO1xyXG5cdFx0fSk7XHJcblxyXG5cdC8vINGE0YPQvdC60YbQuNGPINC00LvRjyDQtNCy0LjQttC10L3QuNGPINGB0LvQvtGR0LJcclxuXHR2YXIgbW92ZUxheWVycyA9IGZ1bmN0aW9uIChlKSB7XHJcblx0XHR2YXIgaW5pdGlhbFggPSAod2luZG93LmlubmVyV2lkdGggLyAyKSAtIGUucGFnZVgsXHJcblx0XHRcdGluaXRpYWxZID0gKHdpbmRvdy5pbm5lckhlaWdodCAvIDIpIC0gZS5wYWdlWTtcclxuXHJcblx0XHRbXS5zbGljZS5jYWxsKGxheWVycykuZm9yRWFjaChmdW5jdGlvbihsYXllciwgaW5kZXgpIHtcclxuXHRcdFx0dmFyIGRpdmlkZXIgPSBpbmRleCAvIDEwMCxcclxuXHRcdFx0XHRwb3NpdGlvblggPSBpbml0aWFsWCAqIGRpdmlkZXIsXHJcblx0XHRcdFx0cG9zaXRpb25ZID0gaW5pdGlhbFkgKiBkaXZpZGVyLFxyXG5cdFx0XHRcdHRyYW5zZm9ybVN0cmluZyA9ICd0cmFuc2xhdGUoJyArIHBvc2l0aW9uWCArICdweCwnICsgcG9zaXRpb25ZICsgJ3B4KSc7XHJcblxyXG5cdFx0XHRsYXllci5zdHlsZS50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1TdHJpbmc7XHJcblx0XHR9KTtcclxuXHR9O1xyXG59KTsiLCIvLyBGbGlwINGN0YTRhNC10LrRglxyXG5cclxuJChmdW5jdGlvbigpe1xyXG5cclxuXHQvLyDQt9Cw0LTQsNGR0Lwg0L/QtdGA0LXQvNC10L3QvdGL0LVcclxuXHR2YXIgbGluayA9ICQoJy5idG4tYXV0aG9fX2xpbmsnKSxcclxuXHRcdGJveCA9ICQoJy5mbGlwJyksXHJcblx0XHRtYWluTGluayA9ICQoJy5sb2dpbl9fbGluaycpOyBcclxuXHJcblx0Ly8g0L/RgNC+0LzQuNGBINC60L7RgtC+0YDRi9C5INCx0YPQtNC10YIg0L/RgNC+0LLQtdGA0Y/RgtGMINC90LDQu9C40YfQuNC1INGE0LvQuNC/INC60L7RgtC10LnQvdC10YDQsCDQvdCwINGB0YLRgNCw0L3QuNGG0LVcclxuXHR2YXIgZmxpcFByb21pc2UgPSBuZXcgUHJvbWlzZSAoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblx0XHRcdGlmIChib3gubGVuZ3RoKSB7XHJcblx0XHRcdFx0cmVzb2x2ZSgpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlamVjdCgpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0Ly8g0YTRg9C90LrRhtC40Y8g0L/RgNC4INC90LDQu9C40YfQuNC4INGE0LvQuNC/INC60L7QvdGC0LXQudC90LXRgNC1XHJcblx0ZmxpcFByb21pc2UudGhlbihmdW5jdGlvbigpIHtcclxuXHJcblx0XHQvLyDQv9GA0Lgg0LrQu9C40LrQtSwg0YTQu9C40L8g0LrQvtC90YLQtdC90LXQudGA0YMg0LTQvtCx0LDQstC40YLRjCDQutC70LDRgdGBINGBINC/0L7QstC+0YDQvtGC0L7QvFxyXG5cdFx0bGluay5jbGljayhmdW5jdGlvbihlKSB7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTsgLy8g0L7RgtC80LXQvdCwINGB0YLQsNC90LTQsNGA0YLQvdGL0YUg0LTQtdC50YHQstGC0LnQuFxyXG5cclxuXHRcdFx0bGluay5jc3MoJ29wYWNpdHknLCAnMCcpO1xyXG5cdFx0XHRib3gudG9nZ2xlQ2xhc3MoJ2pzX19mbGlwJyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQvLyDQv9GA0Lgg0LrQu9C40LrQtSAg0L3QsCBcItCd0LAg0LPQu9Cw0LLQvdGD0Y5cIiwg0YPQtNCw0LvQuNGC0Ywg0LrQu9Cw0YHRgSDQv9C+0LLQvtGA0L7RgtCwLCDRgtC10Lwg0YHQsNC80YvQvCDRgNCw0LfQstC10YDQvdGD0LIg0LrQvtC90YLQtdC50L3QtdGAXHJcblx0XHRtYWluTGluay5jbGljayhmdW5jdGlvbihlKSB7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTsgLy8g0L7RgtC80LXQvdCwINGB0YLQsNC90LTQsNGA0YLQvdGL0YUg0LTQtdC50YHQstGC0LnQuFxyXG5cclxuXHRcdFx0bGluay5jc3MoJ29wYWNpdHknLCAnMScpO1xyXG5cdFx0XHRib3gucmVtb3ZlQ2xhc3MoJ2pzX19mbGlwJyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQvLyDRgNCw0LfQstC+0YDQsNGH0LjQstCw0YLRjCDQsdC70L7QuiDQv9GA0Lgg0L3QsNC20LDRgtC40Lgg0L3QsCBFc2NcclxuXHRcdCQoJ2JvZHknKS5rZXl1cChmdW5jdGlvbihlKSB7XHJcblx0XHRcdGlmKGJveC5oYXNDbGFzcygnanNfX2ZsaXAnKSkge1xyXG5cdFx0XHRcdGlmKGUud2hpY2g9PTI3KSB7XHJcblx0XHRcdFx0XHRsaW5rLmNzcygnb3BhY2l0eScsICcxJyk7XHJcblx0XHRcdFx0XHRib3gucmVtb3ZlQ2xhc3MoJ2pzX19mbGlwJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHQvLyDQv9GA0Lgg0LrQu9C40LrQtSDQvdCwINC+0LHQu9Cw0YHRgtGMINCy0L7QutGA0YPQsyDQsdC70L7QutCwLCDRgNCw0LfQstC+0YDQsNGH0LjQstCw0YLRjCDQsdC70L7QulxyXG5cdFx0JCgnLnBhcmFsbGF4JykuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHRcdGlmKGJveC5oYXNDbGFzcygnanNfX2ZsaXAnKSkge1xyXG5cdFx0XHRcdGxpbmsuY3NzKCdvcGFjaXR5JywgJzEnKTtcclxuXHRcdFx0XHRib3gucmVtb3ZlQ2xhc3MoJ2pzX19mbGlwJyk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH0pLmNhdGNoKGZ1bmN0aW9uKCl7XHJcblx0XHRcdHJldHVybiA7XHJcblx0XHR9KTtcclxuXHJcbn0pOyIsIi8vIGpzINGE0LDQudC7INC00LvRjyDQsNC90LjQvNCw0YbQuNC4INC/0L7Rj9Cy0LvQtdC90LjRjyBmbGlwXHJcblxyXG5cclxuKGZ1bmN0aW9uKCl7XHJcblxyXG5cdC8vINC/0LXRgNC10LzQtdC90L3Ri9C1XHJcblx0dmFyIGZsaXAgPSAkKCcuZmxpcCcpLFxyXG5cdFx0ZmxpcEFuaW1hdGlvbiA9ICdmbGlwX19hbmltYXRpb24nO1xyXG5cclxuXHQvLyDRg9GB0LvQvtCy0LjQtSDQv9GA0L7QstC10YDRj9GO0YnQtdC1INC90LDQu9C40YfQuNC1INCk0LvQuNC/INC60L7QvdGC0LXQudC90LXRgNCwINC90LAg0YHRgtGA0LDQvdC40YbQtVxyXG5cdGlmKGZsaXAubGVuZ3RoKSB7XHJcblxyXG5cdFx0Ly8g0L/RgNC4INC30LDQs9GA0YPQt9C60LUg0YHRgtGA0LDQvdC40YbQtVxyXG5cdFx0JCh3aW5kb3cpLm9uKCdsb2FkJywoKSA9PntcclxuXHJcblx0XHRcdC8v0YEg0LfQsNC00LXRgNC20LrQvtC5IDEg0YHQtdC6XHJcblx0XHRcdHNldFRpbWVvdXQoKCk9PntcclxuXHJcblx0XHRcdFx0Ly8g0LTQvtCx0LDQstC40YLRjCDQutC70LDRgdGBINGBINCw0L3QuNC80LDRhtC40LXQuVxyXG5cdFx0XHRcdGZsaXAuYWRkQ2xhc3MoZmxpcEFuaW1hdGlvbik7XHJcblx0XHRcdH0sIDEwMDApO1xyXG5cclxuXHRcdH0pO1xyXG5cclxuXHR9XHJcblxyXG59KCkpOyIsIi8vIGpzINC00LvRjyDQm9C40L/QutC+0LPQviDRgdCw0LnQtNCx0LDRgNCwINC90LAg0YHRgtGA0LDQvdC40YbQtSDQkdC70L7Qs1xyXG5cclxuKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIC8vINC30LDQtNCw0LXQvCDQv9C10YDQtdC80LXQvdC90YvQtVxyXG4gICAgdmFyIHNpZGViYXIgPSAkKCcuc2lkZWJhcicpLFxyXG4gICAgICAgIHNpZGViYXJGaXggPSAnc2lkZWJhcl9fZml4ZWQnLFxyXG4gICAgICAgIGJ0blNpZGViYXIgPSAkKCcuc2lkZWJhcl9fc2hvdycpLFxyXG4gICAgICAgIGJ0blNpZGViYXJTaG93ID0gJ2pzX19zaWRlYmFyLXNob3cnLFxyXG4gICAgICAgIHNjcm9sbEhlaWdodCA9IDYyMDtcclxuXHJcbiAgICAvLyDQv9GA0L7QvNC40YEg0LrQvtGC0L7RgNGL0Lkg0LHRg9C00LXRgiDQv9GA0L7QstC10YDRj9GC0Ywg0L3QsNC70LjRh9C40LUg0KHQsNC50LTQsdCw0YDQsCDQvdCwINGB0YLRgNCw0L3QuNGG0LVcclxuICAgIHZhciBzaWRlYmFyUHJvbWlzZSA9IG5ldyBQcm9taXNlIChmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBpZiAoc2lkZWJhci5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlamVjdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vINGE0YPQvdC60YbQuNGPINC/0YDQuCDQvdCw0LvQuNGH0LjQuCDRgdCw0LnQtNCx0LDRgNCwXHJcbiAgICBzaWRlYmFyUHJvbWlzZS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgLyog0LXRgdC70Lgg0YHQutGA0L7Qu9C7INCx0L7Qu9GM0YjQtSDQt9Cw0LTQsNC90L3QvtC5INCy0YvRgdC+0YLRiywg0YLQviDQtNC+0LHQsNCy0LjRgtGMINC60LvQsNGB0YEgKi9cclxuICAgICAgICAgICAgaWYoJCh0aGlzKS5zY3JvbGxUb3AoKSA+IHNjcm9sbEhlaWdodCl7XHJcbiAgICAgICAgICAgICAgICBzaWRlYmFyLmFkZENsYXNzKHNpZGViYXJGaXgpO1xyXG4gICAgICAgICAgICAgICAgYnRuU2lkZWJhci5hZGRDbGFzcyhidG5TaWRlYmFyU2hvdyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA8IHNjcm9sbEhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgc2lkZWJhci5yZW1vdmVDbGFzcyhzaWRlYmFyRml4KTtcclxuICAgICAgICAgICAgICAgIGJ0blNpZGViYXIucmVtb3ZlQ2xhc3MoYnRuU2lkZWJhclNob3cpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KS5jYXRjaChmdW5jdGlvbigpe1xyXG4gICAgICAgIHJldHVybiA7XHJcbiAgICB9KTtcclxuXHJcbn0pKCk7IiwiLy8ganMg0LTQu9GPINC90LDQstC40LPQsNGG0LjQuCDQvdCwINGB0YLRgNCw0L3QuNGG0LUg0JHQu9C+0LNcclxuXHJcbihmdW5jdGlvbigpIHtcclxuXHJcblx0Ly8g0L/QtdGA0LXQvNC10L3QvdGL0LVcclxuXHR2YXIgbGluayA9ICQoJy5zaWRlYmFyX19saW5rJyksXHJcblx0XHRpdGVtID0gJCgnLndyaXRlX19pdGVtJyk7XHJcblxyXG5cdCQoZnVuY3Rpb24oKXtcclxuXHJcblx0XHQvLyDQv9GA0L7QvNC40YEg0LrQvtGC0L7RgNGL0Lkg0LHRg9C00LXRgiDQv9GA0L7QstC10YDRj9GC0Ywg0L3QsNC70LjRh9C40LUg0KHQsNC50LTQsdCw0YDQsCDQvdCwINGB0YLRgNCw0L3QuNGG0LVcclxuXHRcdHZhciBuYXZTaWRlYmFyUHJvbWlzZSA9IG5ldyBQcm9taXNlIChmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHRcdFx0aWYgKGxpbmsubGVuZ3RoKSB7XHJcblx0XHRcdFx0cmVzb2x2ZSgpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlamVjdCgpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHQvLyDRhNGD0L3QutGG0LjRjyDQv9GA0Lgg0L3QsNC70LjRh9C40Lgg0YHQsNC50LTQsdCw0YDQsFxyXG5cdFx0bmF2U2lkZWJhclByb21pc2UudGhlbihmdW5jdGlvbigpIHtcclxuXHRcdFx0bGluay5jbGljayhmdW5jdGlvbihlKSB7XHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdFx0XHRzaG93QXJ0aWNsZSgkKHRoaXMpLmF0dHIoJ2hyZWYnKSwgdHJ1ZSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSkuY2F0Y2goZnVuY3Rpb24oKXtcclxuXHRcdFx0cmV0dXJuIDtcclxuXHRcdH0pO1xyXG5cclxuXHJcblx0fSk7XHJcblxyXG5cdC8vINC/0YDQuCDRgdC60YDQvtC70LvQtSDQstGL0LfRi9Cy0LDRgtGMINGE0YPQvdC60YbQuNGOIGNoZWNrQXJ0aWNsZVxyXG5cdCQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XHJcblx0XHRjaGVja0FydGljbGUoKTtcclxuXHR9KTtcclxuXHJcblxyXG5cdC8vINGE0YPQvdC60YbQuNGPINC00LvRjyDRgdC60YDQvtC70LvQsCDQuiDQvdGD0LbQvdC+0LzRgyDRjdC70LXQvNC10L3RgtGDXHJcblx0ZnVuY3Rpb24gc2hvd0FydGljbGUoYXJ0aWNsZSwgaXNBbmltYXRlKSB7XHJcblx0XHR2YXIgZGlyZWN0aW9uID0gYXJ0aWNsZS5yZXBsYWNlKC8jLywgJycpLFxyXG5cdFx0XHRyZXFBcnRpY2xlID0gaXRlbS5maWx0ZXIoJ1tkYXRhLWFydGljbGU9XCInICsgZGlyZWN0aW9uICsgJ1wiXScpLFxyXG5cdFx0XHRyZXFBcnRpY2xlUG9zID0gcmVxQXJ0aWNsZS5vZmZzZXQoKS50b3A7XHJcblxyXG5cdFx0aWYgKGlzQW5pbWF0ZSkge1xyXG5cdFx0XHQkKCdib2R5LCBodG1sJykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiByZXFBcnRpY2xlUG9zfSwgNTAwKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8vINGE0YPQvdC60YbQuNGPINC00LvRjyDQsNCy0YLQvtC80LDRgtC40YfQtdGB0LrQtdCz0L4g0L/QtdGA0LXQutC70Y7Rh9C10L3QuNGPINC60LvQsNGB0YHQsCBhY3RpdmUg0YMg0YHRgdGL0LvQvtC6XHJcblx0ZnVuY3Rpb24gY2hlY2tBcnRpY2xlKCkge1xyXG5cdFx0aXRlbS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgJHRoaXMgPSAkKHRoaXMpLFxyXG5cdFx0XHRcdHRvcEVkZ2UgPSAkdGhpcy5vZmZzZXQoKS50b3AgLSAxNTAsXHJcblx0XHRcdFx0Ym90dG9tRWRnZSA9IHRvcEVkZ2UgKyAkdGhpcy5oZWlnaHQoKSxcclxuXHRcdFx0XHR3U2Nyb2xsID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xyXG5cclxuXHRcdFx0aWYgKHRvcEVkZ2UgPCB3U2Nyb2xsICYmIGJvdHRvbUVkZ2UgPiB3U2Nyb2xsKSB7XHJcblx0XHRcdFx0dmFyIGN1cnJlbnRJZCA9ICR0aGlzLmRhdGEoJ2FydGljbGUnKSxcclxuXHRcdFx0XHRcdHJlcUxpbmsgPSBsaW5rLmZpbHRlcignW2hyZWY9XCIjJyArIGN1cnJlbnRJZCArICdcIl0nKTtcclxuXHJcblx0XHRcdFx0XHRsaW5rLnJlbW92ZUNsYXNzKCdzaWRlYmFyX19saW5rLS1hY3RpdmUnKTtcclxuXHRcdFx0XHRcdHJlcUxpbmsuYWRkQ2xhc3MoJ3NpZGViYXJfX2xpbmstLWFjdGl2ZScpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cclxufSkoKTsgIiwiLy8ganMg0YTRg9C90LrRhtC40Y8g0LTQu9GPINC/0L7QutCw0LfQsCBzaWRlYmFyXHJcblxyXG5cclxuJChmdW5jdGlvbiAoKSB7XHJcblxyXG5cdC8vINC/0LXRgNC10LzQtdC90L3Ri9C1XHJcblx0dmFyIGJ0biA9ICQoJy5qc19fYnRuLXNpZGViYXInKSxcclxuXHRcdHNpZGViYXIgPSAkKCcuc2lkZWJhcicpLFxyXG5cdFx0b3RoZXJDb250ZW50ID0gJCgnLndyaXRlJyksXHJcblx0XHRmbGFnID0gdHJ1ZTtcclxuXHJcblx0Ly8g0L/RgNC4INC60LvQuNC60LUg0L3QsCDQutC90L7Qv9C60YMg0L/QvtC60LDQt9GL0LLQsNGC0Ywg0LjQu9C4INGB0LrRgNGL0LLQsNGC0Ywg0YHQsNC50LTQsdCw0YBcclxuXHRidG4uY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHRpZiAoZmxhZyA9PSB0cnVlKSB7XHJcblx0XHRcdHNpZGViYXIuY3NzKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlWCgxMDAlKScpO1xyXG5cdFx0XHRmbGFnID0gZmFsc2U7XHJcblx0XHR9IGVsc2UgIHtcclxuXHRcdFx0c2lkZWJhci5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG5cdFx0XHRmbGFnID0gdHJ1ZTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0Ly8g0LXRgdC70Lgg0YHQsNC50LTQsdCw0YAg0L/QvtC60LDQt9Cw0L0sINC/0YDQuCDQutC70LjQutC1INC90LAg0LTRgNGD0LPQvtC5INC60L7QvdGC0LXQvdGCINGD0LHRgNCw0YLRjCDRgdCw0LnQtNCx0LDRgFxyXG5cdG90aGVyQ29udGVudC5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdGlmIChmbGFnID09IGZhbHNlKSB7XHJcblx0XHRcdHNpZGViYXIucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuXHRcdFx0ZmxhZyA9IHRydWU7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdC8vINC10YHQu9C4INGB0LDQudC00LHQsNGAINC/0L7QutCw0LfQsNC9LCDQv9GA0Lgg0LrQu9C40LrQtSDQvdCwINC60LvQsNCy0LjRiNGDIEVzYyDRg9Cx0YDQsNGC0Ywg0YHQsNC50LTQsdCw0YBcclxuXHQkKCdib2R5Jykua2V5dXAoZnVuY3Rpb24oZSkge1xyXG5cdFx0aWYoZS53aGljaCA9PSAyNykge1xyXG5cdFx0XHRzaWRlYmFyLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcblx0XHRcdGZsYWcgPSB0cnVlO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHJcblxyXG59KTsiLCIvLyBqcyDRhNCw0LnQuyDQtNC70Y8g0LDQvdC40LzQsNGG0LjQuCDQutGA0YPQs9C+0LIg0YHQutC40LvQu9C+0LJcclxuXHJcbiQoZnVuY3Rpb24oKXtcclxuXHQvLyDQv9C10YDQtdC80LXQvdC90LDRjyDQsdC70L7QutC4INGB0LrQuNC70LvQvtCyXHJcblx0dmFyIGVsZW0gPSAkKCcuc2tpbGxzX19pdGVtcy13cmFwJyk7XHJcblxyXG5cdC8vINC/0YDQvtC80LjRgSDQutC+0YLQvtGA0YvQuSDQsdGD0LTQtdGCINC/0YDQvtCy0LXRgNGP0YLRjCDQvdCw0LvQuNGH0LjQtSDQsdC70L7QutCwINGB0LrQuNC70LvQvtCyXHJcblx0dmFyIHNraWxsc1Byb21pc2UgPSBuZXcgUHJvbWlzZSAoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblx0XHRpZiAoZWxlbS5sZW5ndGgpIHtcclxuXHRcdHJlc29sdmUoKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRyZWplY3QoKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0Ly8g0YTRg9C90LrRhtC40Y8g0L/RgNC4INC90LDQu9C40YfQuNC4INCx0LvQvtC60LAg0YHQutC40LvQu9C+0LJcclxuXHRza2lsbHNQcm9taXNlLnRoZW4oZnVuY3Rpb24oKXtcclxuXHRcdC8vINC/0YDQuCDRgdC60YDQvtC70LvQtSBcclxuXHRcdCQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhciBzY3JvbGxUb3AgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XHJcblxyXG5cdFx0XHQvKiDQtdGB0LvQuCDRhNGD0L3QutGG0LjRjyBjaGVja0Rpc3RhbmNlINCy0LXRgNC90YPQu9CwIHJldHVybiDRgtC+LCDQtNC+0LHQsNCy0LjRgtGMINC60LvQsNGB0YEgLyDQuNC90LDRh9C1INGD0LTQsNC70LjRgtGMICovXHJcblx0XHRcdGlmKGNoZWNrRGlzdGFuY2Uoc2Nyb2xsVG9wKSkge1xyXG5cdFx0XHRcdGVsZW0uYWRkQ2xhc3MoJ2pzX19jaXJjbGUtYW5pbWF0ZScpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGVsZW0ucmVtb3ZlQ2xhc3MoJ2pzX19jaXJjbGUtYW5pbWF0ZScpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9KS5jYXRjaChmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIDtcclxuXHR9KTtcclxuXHJcblx0Ly8g0YTRg9C90LrRhtC40Y8g0LTQu9GPINC/0YDQvtCy0LXRgNC60Lgg0L/QvtC30LjRhtC40Lgg0Y3Qu9C10LzQtdC90YLQsFxyXG5cdHZhciBjaGVja0Rpc3RhbmNlID0gZnVuY3Rpb24oc2Nyb2xsVG9wKSB7XHJcblx0XHR2YXIgb2Zmc2V0ID0gZWxlbS5vZmZzZXQoKS50b3AsXHJcblx0XHRcdHdpbmRvd01hcmdpbiA9IE1hdGguY2VpbCgkKHdpbmRvdykuaGVpZ2h0KCkgLyAzKSxcclxuXHRcdFx0dG9wQm9yZGVyID0gb2Zmc2V0IC0gc2Nyb2xsVG9wIC0gd2luZG93TWFyZ2luIC0gMTAwLFxyXG5cdFx0XHRib3R0b21FZGdlID0gZWxlbS5vdXRlckhlaWdodCh0cnVlKSArIG9mZnNldCxcclxuXHRcdFx0Ym90dG9tQm9yZGVyID0gc2Nyb2xsVG9wICsgd2luZG93TWFyZ2luIC0gYm90dG9tRWRnZTtcclxuXHJcblx0XHRcdHJldHVybiB0b3BCb3JkZXIgPD0gMCAmJiBib3R0b21Cb3JkZXIgPD0gMFxyXG5cdH1cclxuXHJcblxyXG59KTsiLCIvLyBqcyDRhNCw0LnQuyDQtNC70Y8g0LDQvdC40LzQsNGG0LjQuCDQutC+0L3RgtGA0L7Qu9GMINC60L3QvtC/0L7QuiDQsiDRgdC70LDQudC00LXRgNC1XHJcblxyXG4kKGZ1bmN0aW9uKCl7XHJcblxyXG5cdC8vINC/0LXRgNC10LzQtdC90L3Ri9C1XHJcblx0Y29uc3QgYnRuUHJldiA9ICQoJy5zbGlkZXJfX3ByZXYnKTtcclxuXHRjb25zdCBidG5OZXh0ID0gJCgnLnNsaWRlcl9fbmV4dCcpO1xyXG5cdGNvbnN0IGR1cmF0aW9uID0gNTAwO1xyXG5cdGxldCBhY3RpdmUgPSAnc2xpZGVyLWNvbnRyb2xzX19pdGVtLWFjdGl2ZSc7XHJcblx0bGV0IGluUHJvZ3Jlc3MgPSBmYWxzZTtcclxuXHJcblx0Ly8g0YTRg9C90LrRhtC40Y8g0LTQu9GPINC/0LXRgNC10LzQtdGJ0LXQvdC40Y8gXCLQndCw0LfQsNC0XCJcclxuXHRjb25zdCBtb3ZlU2xpZGVzUHJldiA9IChjb250YWluZXIsIGRpcmVjdGlvbikgPT4ge1xyXG5cclxuXHRcdC8vINC/0LXRgNC10LzQtdC90L3Ri9C1XHJcblx0XHRsZXQgaXRlbXMgICAgICAgID0gY29udGFpbmVyLmZpbmQoJy5zbGlkZXItY29udHJvbHNfX2l0ZW0nKTtcclxuXHRcdGxldCBhY3RpdmVJdGVtICAgPSBpdGVtcy5maWx0ZXIoJy5zbGlkZXItY29udHJvbHNfX2l0ZW0tYWN0aXZlJyk7XHJcblx0XHRsZXQgc3RyYWZlUGVyYyAgID0gZGlyZWN0aW9uID09PSAnZG93bicgPyAxMDAgOiAtMTAwO1xyXG5cdFx0bGV0IGNvdW50ZXIgICAgICA9IGFjdGl2ZUl0ZW0uaW5kZXgoKTtcclxuXHJcblx0XHRjb3VudGVyLS07XHJcblxyXG5cdFx0Ly8g0YPRgdC70L7QstC40LUg0YfRgtC+0LHRiyDQt9Cw0YbQuNC60LvQuNGC0Ywg0YHQvNC10L3RgyDRgdC70LDQudC00L7QslxyXG5cdFx0aWYoY291bnRlciA8IDApIGNvdW50ZXIgPSBpdGVtcy5sZW5ndGggLSAxO1xyXG5cclxuXHRcdC8vINGB0L7RhdGA0LDQvdGP0LXQvCDRjdC70LXQvNC10L3RgiDQutC+0YLQvtGA0YvQuSDQtNC+0LvQttC10L0g0L/QvtC60LDQt9Cw0YLRjNGB0Y9cclxuXHRcdGNvbnN0IHJlcUl0ZW0gPSBpdGVtcy5lcShjb3VudGVyKTtcclxuXHJcblx0XHQvLyDRjdC70LXQvNC10L3RgiDQutC+0YLQvtGA0YvQuSDQv9C+0LrQsNC30LDQvSDRgdC60YDRi9GC0YxcclxuXHRcdGFjdGl2ZUl0ZW0uYW5pbWF0ZSh7XHJcblx0XHRcdCd0b3AnOiBgJHtzdHJhZmVQZXJjfSVgLFxyXG5cdFx0fSwgZHVyYXRpb24pXHJcblxyXG5cdFx0Ly8g0L/QvtC60LDQt9Cw0YLRjCDRgdC70LXQtNGD0Y7RidC40Lkg0Y3Qu9C10LzQtdC90YIsINC00L7QsdCw0LLQuNCyINC10LzRgyDQsNC60YLQuNCy0L3Ri9C5INC60LvQsNGB0YFcclxuXHRcdHJlcUl0ZW0uYW5pbWF0ZSh7XHJcblx0XHRcdCd0b3AnOiAnMCcsXHJcblx0XHR9LCBkdXJhdGlvbiwgZnVuY3Rpb24gKCl7XHJcblx0XHRcdGFjdGl2ZUl0ZW0ucmVtb3ZlQ2xhc3MoYWN0aXZlKS5jc3MoJ3RvcCcsIGAkey1zdHJhZmVQZXJjfSVgKTtcclxuXHRcdFx0JCh0aGlzKS5hZGRDbGFzcyhhY3RpdmUpO1xyXG5cclxuXHRcdFx0aW5Qcm9ncmVzcyA9IGZhbHNlO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHQvLyDRhNGD0L3QutGG0LjRjyDQtNC70Y8g0L/QtdGA0LXQvNC10YnQtdC90LjRjyBcItCS0L/QtdGA0LXQtFwiXHJcblx0Y29uc3QgbW92ZVNsaWRlc05leHQgPSAoY29udGFpbmVyLCBkaXJlY3Rpb24pID0+IHtcclxuXHJcblx0XHQvLyDQv9GA0LXQvNC10L3QvdGL0LVcclxuXHRcdGxldCBpdGVtcyAgICAgICAgID0gY29udGFpbmVyLmZpbmQoJy5zbGlkZXItY29udHJvbHNfX2l0ZW0nKTtcclxuXHRcdGxldCBhY3RpdmVJdGVtICAgID0gaXRlbXMuZmlsdGVyKCcuc2xpZGVyLWNvbnRyb2xzX19pdGVtLWFjdGl2ZScpO1xyXG5cdFx0bGV0IHN0cmFmZVBlcmMgICAgPSBkaXJlY3Rpb24gPT09ICdkb3duJyA/IDEwMCA6IC0xMDA7XHJcblx0XHRsZXQgY291bnRlciAgICAgICA9IGFjdGl2ZUl0ZW0uaW5kZXgoKTtcclxuXHJcblx0XHRjb3VudGVyKys7XHJcblxyXG5cdFx0Ly8g0YPRgdC70L7QstC40LUg0YfRgtC+0LHRiyDQt9Cw0YbQuNC60LvQuNGC0Ywg0YHQvNC10L3RgyDRgdC70LDQudC00L7QslxyXG5cdFx0aWYgKGNvdW50ZXIgPj0gaXRlbXMubGVuZ3RoKSBjb3VudGVyID0gMDtcclxuXHJcblx0XHQvLyDRgdC+0YXRgNCw0L3Rj9C10Lwg0Y3Qu9C10LzQtdC90YIg0LrQvtGC0L7RgNGL0Lkg0LTQvtC70LbQtdC9INC/0L7QutCw0LfQsNGC0YzRgdGPXHJcblx0XHRjb25zdCByZXFJdGVtID0gaXRlbXMuZXEoY291bnRlcik7XHJcblxyXG5cdFx0Ly8g0Y3Qu9C10LzQtdC90YIg0LrQvtGC0L7RgNGL0Lkg0L/QvtC60LDQt9Cw0L0g0YHQutGA0YvRgtGMXHJcblx0XHRhY3RpdmVJdGVtLmFuaW1hdGUoe1xyXG5cdFx0XHQndG9wJzogYCR7c3RyYWZlUGVyY30lYFxyXG5cdFx0fSwgZHVyYXRpb24pXHJcblxyXG5cdFx0Ly8g0L/QvtC60LDQt9Cw0YLRjCDRgdC70LXQtNGD0Y7RidC40Lkg0Y3Qu9C10LzQtdC90YIsINC00L7QsdCw0LLQuNCyINC10LzRgyDQsNC60YLQuNCy0L3Ri9C5INC60LvQsNGB0YFcclxuXHRcdHJlcUl0ZW0uYW5pbWF0ZSh7XHJcblx0XHRcdHRvcDogMFxyXG5cdFx0fSwgZHVyYXRpb24sIGZ1bmN0aW9uICgpe1xyXG5cdFx0XHRhY3RpdmVJdGVtLnJlbW92ZUNsYXNzKGFjdGl2ZSkuY3NzKCd0b3AnLCBgJHstc3RyYWZlUGVyY30lYCk7XHJcblx0XHRcdCQodGhpcykuYWRkQ2xhc3MoYWN0aXZlKTtcclxuXHJcblx0XHRcdGluUHJvZ3Jlc3MgPSBmYWxzZTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0Ly8g0L/RgNC4INC60LvQuNC60LUg0L3QsCDQutC90L7Qv9C60YMgXCLQndCw0LfQsNC0XCJcclxuXHRidG5QcmV2Lm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblxyXG5cdFx0aWYgKGluUHJvZ3Jlc3MpIHJldHVybjtcclxuXHRcdGluUHJvZ3Jlc3MgPSB0cnVlO1xyXG5cclxuXHRcdG1vdmVTbGlkZXNQcmV2KGJ0blByZXYsICdkb3duJyk7XHJcblx0XHRtb3ZlU2xpZGVzUHJldihidG5OZXh0LCAndXAnKTtcclxuXHR9KTtcclxuXHJcblx0Ly8g0L/RgNC4INC60LvQuNC60LUg0L3QsCDQutC90L7Qv9C60YMgXCLQktC/0LXRgNC10LRcIlxyXG5cdGJ0bk5leHQub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHJcblx0XHRpZiAoaW5Qcm9ncmVzcykgcmV0dXJuO1xyXG5cdFx0aW5Qcm9ncmVzcyA9IHRydWU7XHJcblxyXG5cdFx0bW92ZVNsaWRlc05leHQoYnRuUHJldiwgJ2Rvd24nKTtcclxuXHRcdG1vdmVTbGlkZXNOZXh0KGJ0bk5leHQsICd1cCcpO1xyXG5cdH0pO1xyXG5cclxufSk7IiwiLy8ganMg0YTQsNC50Lsg0LTQu9GPINCw0L3QuNC80LDRhtC40Lgg0LPQu9Cw0LLQvdC+0LPQviDQtNC40YHQv9C70LXRj1xyXG5cclxuXHJcbiQoZnVuY3Rpb24oKXtcclxuXHJcblx0Ly8g0L/QtdGA0LXQvNC10L3QvdGL0LUg0LrQvdC+0L/QvtC6XHJcblx0Y29uc3QgYnRuUHJldiA9ICQoJy5zbGlkZXJfX3ByZXYnKTtcclxuXHRjb25zdCBidG5OZXh0ID0gJCgnLnNsaWRlcl9fbmV4dCcpO1xyXG5cclxuXHQvLyDRhNGD0L3QutGG0LjRjyDQtNC70Y8g0L/QvtC60LDQt9CwINC90LAg0LPQu9Cw0LLQvdC+0Lwg0LTQuNGB0L/Qu9C10LhcclxuXHRjb25zdCBzbGlkZXJTaG93ID0gZnVuY3Rpb24oY29udGFpbmVyKSB7XHJcblxyXG5cdFx0Ly8g0L/QtdGA0LXQvNC10L3QvdGL0LVcclxuXHRcdGxldCBkaXNwbGF5ID0gY29udGFpbmVyLmNsb3Nlc3QoJy5zbGlkZXItcmlnaHQnKS5maW5kKCcuc2xpZGVyX19kaXNwbGF5LWltZycpLFxyXG5cdFx0XHRwYXRoID0gY29udGFpbmVyLmZpbmQoJy5zbGlkZXItY29udHJvbHNfX2l0ZW0tYWN0aXZlJykuY2hpbGRyZW4oJy5zbGlkZXItY29udHJvbHNfX2ltZycpLmF0dHIoJ3NyYycpLFxyXG5cdFx0XHRmYWRlZE91dCA9ICQuRGVmZXJyZWQoKSxcclxuXHRcdFx0bG9hZGVkID0gJC5EZWZlcnJlZCgpO1xyXG5cclxuXHRcdC8vINCy0LrQu9GO0YfQuNGC0Ywg0YDRi9GH0LDQsyDRgyDQlNC10YTRhNC10YDQtdC0INC+0LHRitC10LrRgtCwXHJcblx0XHRkaXNwbGF5LmZhZGVPdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRmYWRlZE91dC5yZXNvbHZlKCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQvLyDQlNC40YHQv9C70LXRjiDQuNC30LzQtdC90LjRgtGMINC/0YPRgtGMINC6INC60LDRgNGC0LjQvdC60LVcclxuXHRcdGZhZGVkT3V0LmRvbmUoKCkgPT4ge1xyXG5cdFx0XHRkaXNwbGF5LmF0dHIoJ3NyYycsIHBhdGgpLm9uKCdsb2FkJywgKCkgPT4ge1xyXG5cdFx0XHRcdGxvYWRlZC5yZXNvbHZlKCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8g0L/QvtC60LDQt9Cw0YLRjCDQtNC40YHQv9C70LXQuVxyXG5cdFx0bG9hZGVkLmRvbmUoKCkgPT4ge1xyXG5cdFx0XHRkaXNwbGF5LmZhZGVJbig1MDApO1xyXG5cdFx0fSk7XHJcblxyXG5cdH1cclxuXHJcblx0Ly8g0L/RgNC4INC60LvQuNC60LUg0L3QsCDQutC90L7Qv9C60YMgXCLQndCw0LfQsNC0XCJcclxuXHRidG5QcmV2Lm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRzbGlkZXJTaG93KGJ0blByZXYpO1xyXG5cclxuXHR9KTtcclxuXHJcblx0Ly8g0L/RgNC4INC60LvQuNC60LUg0L3QsCDQutC90L7Qv9C60YMgXCLQktC/0LXRgNC10LRcIlxyXG5cdGJ0bk5leHQub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdHNsaWRlclNob3coYnRuTmV4dCk7XHJcblxyXG5cdH0pO1xyXG5cclxufSk7IiwiLy8ganMg0YTQsNC50Lsg0LTQu9GPINCw0L3QuNC80LDRhtC40Lgg0LjQvdGE0L7RgNC80LDRhtC40Lgg0LIg0YHQu9Cw0LnQtNC10YDQtVxyXG5cclxuJChmdW5jdGlvbigpIHtcclxuXHJcblx0Ly8g0LfQvdCw0YfQtdC90LjRj1xyXG5cdGxldCBzbGlkZXJJbmZvID0gW1xyXG5cdFx0e1xyXG5cdFx0XHRcInRpdGxlXCI6IFwi0KHQstC+0Lkg0YHQsNC50YIg0L/QvtGA0YLRhNC+0LvQuNC+XCIsXHJcblx0XHRcdFwidG9vbHNcIjogXCJodG1sLCBjc3MsIGphdmFzY3JpcHRcIixcclxuXHRcdFx0XCJsaW5rXCI6IFwiaW5kZXguaHRtbFwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XHRcInRpdGxlXCI6IFwi0KHRgtCw0YDRi9C5INGB0LDQudGCINC/0L7RgNGC0YTQvtC70LjQvlwiLFxyXG5cdFx0XHRcInRvb2xzXCI6IFwiaHRtbCwgY3NzXCIsXHJcblx0XHRcdFwibGlua1wiOiBcIi4uL3dvcmtzL3BvcnRmb2xpb19faG9tZXIvaW5kZXguaHRtbFwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XHRcInRpdGxlXCI6IFwiR2xhY3kgLSDQvNCw0LPQsNC30LjQvSDQvNC+0YDQvtC20LXQvdC+0LPQvlwiLFxyXG5cdFx0XHRcInRvb2xzXCI6IFwiaHRtbCwgY3NzM1wiLFxyXG5cdFx0XHRcImxpbmtcIjogXCIuLi93b3Jrcy9nbGFjeV9fY29kZS9pbmRleC5odG1sXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcdFwidGl0bGVcIjogXCLQotC10YHRgtC+0LLQvtC1INC30LDQtNCw0L3QuNC1XCIsXHJcblx0XHRcdFwidG9vbHNcIjogXCJodG1sLCBjc3MsIGpxdWVyeVwiLFxyXG5cdFx0XHRcImxpbmtcIjogXCIuLi93b3Jrcy9scy10ZXN0L2luZGV4Lmh0bWxcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFx0XCJ0aXRsZVwiOiBcIkxhbmRpbmcgLSBTRURPTkFcIixcclxuXHRcdFx0XCJ0b29sc1wiOiBcImh0bWwsIGNzcywgamF2YXNjcmlwdCwgYWRhcHRpdlwiLFxyXG5cdFx0XHRcImxpbmtcIjogXCIuLi93b3Jrcy9zZWRvbmEvaW5kZXguaHRtbFwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XHRcInRpdGxlXCI6IFwiTG5hZGluZyAtIEhvc3RlbFwiLFxyXG5cdFx0XHRcInRvb2xzXCI6IFwiaHRtbCwgY3NzLCBhZGFwdGl2XCIsXHJcblx0XHRcdFwibGlua1wiOiBcIi4uL3dvcmtzL2hvc3RlbC9pbmRleC5odG1sXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcdFwidGl0bGVcIjogXCJMbmFkaW5nIC0gS2Vrc2JpXCIsXHJcblx0XHRcdFwidG9vbHNcIjogXCJodG1sLCBjc3MsIGFkYXB0aXZcIixcclxuXHRcdFx0XCJsaW5rXCI6IFwiLi4vd29ya3Mva2Vrc2JpL2luZGV4Lmh0bWxcIlxyXG5cdFx0fVxyXG5cdF1cclxuXHJcblx0Ly8g0L/QtdGA0LXQvNC10L3QvdGL0LVcclxuXHRjb25zdCBidG5QcmV2ICAgICA9ICQoJy5zbGlkZXJfX3ByZXYnKTtcclxuXHRjb25zdCBidG5OZXh0ICAgICA9ICQoJy5zbGlkZXJfX25leHQnKTtcclxuXHRjb25zdCBpbmZvQmxvY2sgICA9ICQoJy5zbGlkZXItbGVmdF9faW5mbycpO1xyXG5cdGxldCBzbGlkZUluZm8gICAgID0gJC5tYWtlQXJyYXkoc2xpZGVySW5mbyk7XHJcblx0bGV0IHRpdGxlICAgICAgICAgPSAkKCcuc2xpZGVyX190aXRsZScpO1xyXG5cdGxldCB0b29scyAgICAgICAgID0gJCgnLnNsaWRlcl9fdG9vbHMnKTtcclxuXHRsZXQgbGluayAgICAgICAgICA9IGluZm9CbG9jay5maW5kKCcuc2xpZGVyX19saW5rJyk7XHJcblxyXG5cclxuXHQvLyDRhNGD0L3QutGG0LjRjyDQtNC70Y8g0YHQvNC10L3RiyDRgdGB0YvQu9C60LhcclxuXHRjb25zdCBzZXRMaW5rID0gKGNvbnRhaW5lcikgPT4ge1xyXG5cclxuXHRcdC8vINC/0LXRgNC10LzQtdC90L3Ri9C1XHJcblx0XHRsZXQgaXRlbXMgICAgICAgID0gY29udGFpbmVyLmZpbmQoJy5zbGlkZXItY29udHJvbHNfX2l0ZW0nKTtcclxuXHRcdGxldCBhY3RpdmVJdGVtICAgPSBpdGVtcy5maWx0ZXIoJy5zbGlkZXItY29udHJvbHNfX2l0ZW0tYWN0aXZlJyk7XHJcblx0XHRsZXQgY291bnRlciAgICAgID0gYWN0aXZlSXRlbS5pbmRleCgpO1xyXG5cclxuXHRcdC8vINCy0YvQsdGA0LDRgtGMINC90YPQttC90YvRg9GOINGB0YHRi9C70LrRg1xyXG5cdFx0Y29uc3QgcmVxTGluayA9IHNsaWRlSW5mb1tjb3VudGVyXS5saW5rO1xyXG5cclxuXHRcdC8vINGB0LzQtdC90LjRgtGMINGB0YHRi9C70LrRgyBcclxuXHRcdGxpbmsuYXR0cignaHJlZicsIHJlcUxpbmspO1xyXG5cclxuXHR9XHJcblxyXG5cdC8vINGE0YPQvdC60YbQuNGPINC00LvRjyDQsNC90LjQvNCw0YbQuNC4INGB0YLRgNC+0LrQuFxyXG5cdGNvbnN0IGFuaW1hdGVSb3cgPSAoc3RyKSA9PiB7XHJcblxyXG5cdFx0Ly8g0L/QtdGA0LXQvNC10L3QvdGL0LVcclxuXHRcdGxldCB0aW1lID0gNTAsXHJcblx0XHRcdGFuaW1hdGUgPSBzdHIuZmluZCgnLmV4YW1wbGUnKS5jaGlsZHJlbignc3BhbicpO1xyXG5cclxuXHRcdC8vINC40LfQvdCw0YfQsNC70YzQvdC+INGB0LrRgNGL0YLRjCDRjdC70LXQvNC10L3RgtGLXHJcblx0XHRhbmltYXRlLmNzcygnb3BhY2l0eScsIDApO1xyXG5cclxuXHRcdC8qINC00LvRjyDQutCw0LbQtNC+0LPQviDRjdC70LXQvNC10L3RgtCwINGBINGA0LDQt9C90L7QuSDRgdC60L7RgNC+0YHRgtGM0Y4g0LTQvtCx0LDQstC40YLRjCDQutC70LDRgdGBINGBINCw0L3QuNC80LDRhtC40LXQuSAqL1xyXG5cdFx0YW5pbWF0ZS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRsZXQgJHRoaXMgPSAkKHRoaXMpO1xyXG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHQkdGhpcy5hZGRDbGFzcygnc2xpZGVyX190ZXh0LS1hbmltYXRlJyk7XHJcblx0XHRcdH0sIHRpbWUpO1xyXG5cdFx0XHR0aW1lID0gdGltZSArIDUwO1xyXG5cdFx0fSk7XHJcblxyXG5cdH07XHJcblxyXG5cdC8vINGE0YPQvdC60YbQuNGPINC00LvRjyDRgdC80LXQvdGLINC+0L/QuNGB0LDQvdC40Y8gXCLQndCw0LfQsNC0XCJcclxuXHRjb25zdCBzcGFuUm93UHJldiA9IChjb250YWluZXIsc3RyLGRhdGEpID0+IHtcclxuXHJcblx0XHQvLyDQv9C10YDQtdC80LXQvdC90YvQtVxyXG5cdFx0bGV0IGl0ZW1zICAgICAgICA9IGNvbnRhaW5lci5maW5kKCcuc2xpZGVyLWNvbnRyb2xzX19pdGVtJyk7XHJcblx0XHRsZXQgYWN0aXZlSXRlbSAgID0gaXRlbXMuZmlsdGVyKCcuc2xpZGVyLWNvbnRyb2xzX19pdGVtLWFjdGl2ZScpO1xyXG5cdFx0bGV0IGNvdW50ZXIgICAgICA9IGFjdGl2ZUl0ZW0uaW5kZXgoKTtcclxuXHRcdGxldCByb3cgICAgICAgICAgPSBkYXRhID09ICd0aXRsZScgPyBzbGlkZXJJbmZvW2NvdW50ZXJdLnRpdGxlIDogc2xpZGVySW5mb1tjb3VudGVyXS50b29sczsgXHJcblx0XHRsZXQgc3BhbiAgICAgICAgID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0bGV0IHRvUm93ICAgICAgICA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuXHRcdCQodG9Sb3cpLmFkZENsYXNzKCdleGFtcGxlJyk7XHJcblxyXG5cdFx0Ly8g0YDQsNC30LHQuNGC0Ywg0YHRgtGA0L7QutGDINC90LAg0YHQv9Cw0L3RiyDQv9C+INC+0LTQvdC+0LzRgyDRgdC40LzQstC+0LvRg1xyXG5cdFx0cm93LnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pe1xyXG5cdFx0XHRzcGFuLmlubmVySFRNTCA9IGl0ZW07XHJcblx0XHRcdGlmIChpdGVtID09PSAnICcpIHNwYW4uc3R5bGUuZGlzcGxheSA9IFwiaW5saW5lXCI7XHJcblx0XHRcdHRvUm93LmFwcGVuZENoaWxkKHNwYW4pO1xyXG5cdFx0XHRzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8g0LfQsNC80LXQvdC40YLRjCDRgtC+INGH0YLQviDQsdGL0LvQviDQvdCwINGC0L4g0YfRgtC+INC/0L7Qu9GD0YfQuNC70L7RgdGMXHJcblx0XHRzdHIuaHRtbCh0b1Jvdyk7XHJcblx0fVxyXG5cclxuXHQvLyDRhNGD0L3QutGG0LjRjyDQtNC70Y8g0YHQvNC10L3RiyDQvtC/0LjRgdCw0L3QuNGPIFwi0JLQv9C10YDQtdC0XCJcclxuXHRjb25zdCBzcGFuUm93TmV4dCA9IChjb250YWluZXIsc3RyLGRhdGEpID0+IHtcclxuXHJcblx0XHQvLyDQv9C10YDQtdC80LXQvdC90YvQtVxyXG5cdFx0bGV0IGl0ZW1zICAgICAgICA9IGNvbnRhaW5lci5maW5kKCcuc2xpZGVyLWNvbnRyb2xzX19pdGVtJyk7XHJcblx0XHRsZXQgYWN0aXZlSXRlbSAgID0gaXRlbXMuZmlsdGVyKCcuc2xpZGVyLWNvbnRyb2xzX19pdGVtLWFjdGl2ZScpO1xyXG5cdFx0bGV0IGNvdW50ZXIgICAgICA9IGFjdGl2ZUl0ZW0uaW5kZXgoKTtcclxuXHRcdGxldCByb3cgICAgICAgICAgPSBkYXRhID09ICd0aXRsZScgPyBzbGlkZXJJbmZvW2NvdW50ZXJdLnRpdGxlIDogc2xpZGVySW5mb1tjb3VudGVyXS50b29sczsgXHJcblx0XHRsZXQgc3BhbiAgICAgICAgID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0bGV0IHRvUm93ICAgICAgICA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuXHRcdCQodG9Sb3cpLmFkZENsYXNzKCdleGFtcGxlJyk7XHJcblxyXG5cdFx0Ly8g0YDQsNC30LHQuNGC0Ywg0YHRgtGA0L7QutGDINC90LAg0YHQv9Cw0L3RiyDQv9C+INC+0LTQvdC+0LzRgyDRgdC40LzQstC+0LvRg1xyXG5cdFx0cm93LnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pe1xyXG5cdFx0XHRzcGFuLmlubmVySFRNTCA9IGl0ZW07XHJcblx0XHRcdGlmIChpdGVtID09PSAnICcpIHNwYW4uc3R5bGUuZGlzcGxheSA9IFwiaW5saW5lXCI7XHJcblx0XHRcdHRvUm93LmFwcGVuZENoaWxkKHNwYW4pO1xyXG5cdFx0XHRzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8g0LfQsNC80LXQvdC40YLRjCDRgtC+INGH0YLQviDQsdGL0LvQviDQvdCwINGC0L4g0YfRgtC+INC/0L7Qu9GD0YfQuNC70L7RgdGMXHJcblx0XHRzdHIuaHRtbCh0b1Jvdyk7XHJcblx0fVxyXG5cclxuXHQvLyDQv9GA0Lgg0LrQu9C40LrQtSDQvdCwINC60L3QvtC/0LrRgyBcItCd0LDQt9Cw0LRcIlxyXG5cdGJ0blByZXYub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdHNwYW5Sb3dQcmV2KGJ0blByZXYsdGl0bGUsICd0aXRsZScpO1xyXG5cdFx0YW5pbWF0ZVJvdyh0aXRsZSk7XHJcblx0XHRzcGFuUm93UHJldihidG5QcmV2LHRvb2xzLCAndG9vbHMnKTtcclxuXHRcdGFuaW1hdGVSb3codG9vbHMpO1xyXG5cdFx0c2V0TGluayhidG5QcmV2KTtcclxuXHR9KTtcclxuXHJcblx0Ly8g0L/RgNC4INC60LvQuNC60LUg0L3QsCDQutC90L7Qv9C60YMgXCLQktC/0LXRgNC10LRcIlxyXG5cdGJ0bk5leHQub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdHNwYW5Sb3dOZXh0KGJ0bk5leHQsdGl0bGUsICd0aXRsZScpO1xyXG5cdFx0YW5pbWF0ZVJvdyh0aXRsZSk7XHJcblx0XHRzcGFuUm93TmV4dChidG5OZXh0LHRvb2xzLCd0b29scycpO1xyXG5cdFx0YW5pbWF0ZVJvdyh0b29scyk7XHJcblx0XHRzZXRMaW5rKGJ0bk5leHQpO1xyXG5cdH0pO1xyXG5cclxuXHJcbn0pOyIsIi8vINCR0LjQsdC70LjQvtGC0LXQutCwIHN2ZzRldmVyeWJvZHkg0LTQu9GPIHN2Z1xyXG5cclxuJChmdW5jdGlvbigpe1xyXG5cdHN2ZzRldmVyeWJvZHkoKTtcclxufSkiLCIvLyBqcyDRhNCw0LnQuyDQtNC70Y8g0LrQsNGA0YLRi1xyXG5cclxuJChmdW5jdGlvbigpIHtcclxuICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZERvbUxpc3RlbmVyKHdpbmRvdywgJ2xvYWQnLCBpbml0KTtcclxuICAgIHZhciBtYXAsIG1hcmtlcnNBcnJheSA9IFtdO1xyXG5cclxuICAgIGZ1bmN0aW9uIGJpbmRJbmZvV2luZG93KG1hcmtlciwgbWFwLCBsb2NhdGlvbikge1xyXG4gICAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1hcmtlciwgJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGNsb3NlKGxvY2F0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5pYi5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgbG9jYXRpb24uaW5mb1dpbmRvd1Zpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uLmliID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGxvY2F0aW9uLmluZm9XaW5kb3dWaXNpYmxlID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBjbG9zZShsb2NhdGlvbik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBtYXJrZXJzQXJyYXkuZm9yRWFjaChmdW5jdGlvbihsb2MsIGluZGV4KXtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobG9jLmliICYmIGxvYy5pYiAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9zZShsb2MpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBib3hUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgICAgICBib3hUZXh0LnN0eWxlLmNzc1RleHQgPSAnYmFja2dyb3VuZDogI2ZmZjsnO1xyXG4gICAgICAgICAgICAgICAgYm94VGV4dC5jbGFzc0xpc3QuYWRkKCdtZC13aGl0ZWZyYW1lLTJkcCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGJ1aWxkUGllY2VzKGxvY2F0aW9uLCBlbCwgcGFydCwgaWNvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsb2NhdGlvbltwYXJ0XSA9PT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobG9jYXRpb24uaXdbcGFydF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoKGVsKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3Bob3RvJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobG9jYXRpb24ucGhvdG8pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzxkaXYgY2xhc3M9XCJpdy1waG90b1wiIHN0eWxlPVwiYmFja2dyb3VuZC1pbWFnZTogdXJsKCcgKyBsb2NhdGlvbi5waG90byArICcpO1wiPjwvZGl2Pic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdpdy10b29sYmFyJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzxkaXYgY2xhc3M9XCJpdy10b29sYmFyXCI+PGgzIGNsYXNzPVwibWQtc3ViaGVhZFwiPicgKyBsb2NhdGlvbi50aXRsZSArICc8L2gzPjwvZGl2Pic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdkaXYnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaChwYXJ0KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZW1haWwnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwiaXctZGV0YWlsc1wiPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIiBzdHlsZT1cImNvbG9yOiM0Mjg1ZjQ7XCI+PGltZyBzcmM9XCIvL2Nkbi5tYXBraXQuaW8vdjEvaWNvbnMvJyArIGljb24gKyAnLnN2Z1wiLz48L2k+PHNwYW4+PGEgaHJlZj1cIm1haWx0bzonICsgbG9jYXRpb24uZW1haWwgKyAnXCIgdGFyZ2V0PVwiX2JsYW5rXCI+JyArIGxvY2F0aW9uLmVtYWlsICsgJzwvYT48L3NwYW4+PC9kaXY+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICd3ZWInOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwiaXctZGV0YWlsc1wiPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIiBzdHlsZT1cImNvbG9yOiM0Mjg1ZjQ7XCI+PGltZyBzcmM9XCIvL2Nkbi5tYXBraXQuaW8vdjEvaWNvbnMvJyArIGljb24gKyAnLnN2Z1wiLz48L2k+PHNwYW4+PGEgaHJlZj1cIicgKyBsb2NhdGlvbi53ZWIgKyAnXCIgdGFyZ2V0PVwiX2JsYW5rXCI+JyArIGxvY2F0aW9uLndlYl9mb3JtYXR0ZWQgKyAnPC9hPjwvc3Bhbj48L2Rpdj4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2Rlc2MnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc8bGFiZWwgY2xhc3M9XCJpdy1kZXNjXCIgZm9yPVwiY2JfZGV0YWlsc1wiPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBpZD1cImNiX2RldGFpbHNcIi8+PGgzIGNsYXNzPVwiaXcteC1kZXRhaWxzXCI+RGV0YWlsczwvaDM+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29ucyB0b2dnbGUtb3Blbi1kZXRhaWxzXCI+PGltZyBzcmM9XCIvL2Nkbi5tYXBraXQuaW8vdjEvaWNvbnMvJyArIGljb24gKyAnLnN2Z1wiLz48L2k+PHAgY2xhc3M9XCJpdy14LWRldGFpbHNcIj4nICsgbG9jYXRpb24uZGVzYyArICc8L3A+PC9sYWJlbD4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzxkaXYgY2xhc3M9XCJpdy1kZXRhaWxzXCI+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPjxpbWcgc3JjPVwiLy9jZG4ubWFwa2l0LmlvL3YxL2ljb25zLycgKyBpY29uICsgJy5zdmdcIi8+PC9pPjxzcGFuPicgKyBsb2NhdGlvbltwYXJ0XSArICc8L3NwYW4+PC9kaXY+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnb3Blbl9ob3Vycyc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW1zID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxvY2F0aW9uLm9wZW5faG91cnMubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbG9jYXRpb24ub3Blbl9ob3Vycy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgIT09IDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zICs9ICc8bGk+PHN0cm9uZz4nICsgbG9jYXRpb24ub3Blbl9ob3Vyc1tpXS5kYXkgKyAnPC9zdHJvbmc+PHN0cm9uZz4nICsgbG9jYXRpb24ub3Blbl9ob3Vyc1tpXS5ob3VycyArJzwvc3Ryb25nPjwvbGk+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmaXJzdCA9ICc8bGk+PGxhYmVsIGZvcj1cImNiX2hvdXJzXCI+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwiY2JfaG91cnNcIi8+PHN0cm9uZz4nICsgbG9jYXRpb24ub3Blbl9ob3Vyc1swXS5kYXkgKyAnPC9zdHJvbmc+PHN0cm9uZz4nICsgbG9jYXRpb24ub3Blbl9ob3Vyc1swXS5ob3VycyArJzwvc3Ryb25nPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgdG9nZ2xlLW9wZW4taG91cnNcIj48aW1nIHNyYz1cIi8vY2RuLm1hcGtpdC5pby92MS9pY29ucy9rZXlib2FyZF9hcnJvd19kb3duLnN2Z1wiLz48L2k+PHVsPicgKyBpdGVtcyArICc8L3VsPjwvbGFiZWw+PC9saT4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnPGRpdiBjbGFzcz1cIml3LWxpc3RcIj48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zIGZpcnN0LW1hdGVyaWFsLWljb25zXCIgc3R5bGU9XCJjb2xvcjojNDI4NWY0O1wiPjxpbWcgc3JjPVwiLy9jZG4ubWFwa2l0LmlvL3YxL2ljb25zLycgKyBpY29uICsgJy5zdmdcIi8+PC9pPjx1bD4nICsgZmlyc3QgKyAnPC91bD48L2Rpdj4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgYm94VGV4dC5pbm5lckhUTUwgPSBcclxuICAgICAgICAgICAgICAgICAgICBidWlsZFBpZWNlcyhsb2NhdGlvbiwgJ3Bob3RvJywgJ3Bob3RvJywgJycpICtcclxuICAgICAgICAgICAgICAgICAgICBidWlsZFBpZWNlcyhsb2NhdGlvbiwgJ2l3LXRvb2xiYXInLCAndGl0bGUnLCAnJykgK1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkUGllY2VzKGxvY2F0aW9uLCAnZGl2JywgJ2FkZHJlc3MnLCAnbG9jYXRpb25fb24nKSArXHJcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRQaWVjZXMobG9jYXRpb24sICdkaXYnLCAnd2ViJywgJ3B1YmxpYycpICtcclxuICAgICAgICAgICAgICAgICAgICBidWlsZFBpZWNlcyhsb2NhdGlvbiwgJ2RpdicsICdlbWFpbCcsICdlbWFpbCcpICtcclxuICAgICAgICAgICAgICAgICAgICBidWlsZFBpZWNlcyhsb2NhdGlvbiwgJ2RpdicsICd0ZWwnLCAncGhvbmUnKSArXHJcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRQaWVjZXMobG9jYXRpb24sICdkaXYnLCAnaW50X3RlbCcsICdwaG9uZScpICtcclxuICAgICAgICAgICAgICAgICAgICBidWlsZFBpZWNlcyhsb2NhdGlvbiwgJ29wZW5faG91cnMnLCAnb3Blbl9ob3VycycsICdhY2Nlc3NfdGltZScpICtcclxuICAgICAgICAgICAgICAgICAgICBidWlsZFBpZWNlcyhsb2NhdGlvbiwgJ2RpdicsICdkZXNjJywgJ2tleWJvYXJkX2Fycm93X2Rvd24nKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgbXlPcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsaWduQm90dG9tOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGJveFRleHQsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZUF1dG9QYW46IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbWF4V2lkdGg6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgcGl4ZWxPZmZzZXQ6IG5ldyBnb29nbGUubWFwcy5TaXplKC0xNDAsIC00MCksXHJcbiAgICAgICAgICAgICAgICAgICAgekluZGV4OiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIGJveFN0eWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnMjgwcHgnXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjbG9zZUJveE1hcmdpbjogJzBweCAwcHggMHB4IDBweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5mb0JveENsZWFyYW5jZTogbmV3IGdvb2dsZS5tYXBzLlNpemUoMSwgMSksXHJcbiAgICAgICAgICAgICAgICAgICAgaXNIaWRkZW46IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhbmU6ICdmbG9hdFBhbmUnLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZUV2ZW50UHJvcGFnYXRpb246IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uLmliID0gbmV3IEluZm9Cb3gobXlPcHRpb25zKTtcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uLmliLm9wZW4obWFwLCBtYXJrZXIpO1xyXG4gICAgICAgICAgICAgICAgbG9jYXRpb24uaW5mb1dpbmRvd1Zpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgICAgICB2YXIgbWFwT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgY2VudGVyOiBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKDU1Ljc0ODM1ODExMjcyMDM3NSw1Mi4zNTQxNzU4ODc0OTk5OCksXHJcbiAgICAgICAgICAgIHpvb206IDEzLFxyXG4gICAgICAgICAgICBnZXN0dXJlSGFuZGxpbmc6ICdjb29wZXJhdGl2ZScsXHJcbiAgICAgICAgICAgIGZ1bGxzY3JlZW5Db250cm9sOiBmYWxzZSxcclxuICAgICAgICAgICAgem9vbUNvbnRyb2w6IHRydWUsXHJcbiAgICAgICAgICAgIGRpc2FibGVEb3VibGVDbGlja1pvb206IHRydWUsXHJcbiAgICAgICAgICAgIG1hcFR5cGVDb250cm9sOiB0cnVlLFxyXG4gICAgICAgICAgICBtYXBUeXBlQ29udHJvbE9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgIHN0eWxlOiBnb29nbGUubWFwcy5NYXBUeXBlQ29udHJvbFN0eWxlLkhPUklaT05UQUxfQkFSLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzY2FsZUNvbnRyb2w6IGZhbHNlLFxyXG4gICAgICAgICAgICBzY3JvbGx3aGVlbDogZmFsc2UsXHJcbiAgICAgICAgICAgIHN0cmVldFZpZXdDb250cm9sOiBmYWxzZSxcclxuICAgICAgICAgICAgZHJhZ2dhYmxlIDogdHJ1ZSxcclxuICAgICAgICAgICAgY2xpY2thYmxlSWNvbnM6IHRydWUsXHJcbiAgICAgICAgICAgIHpvb21Db250cm9sT3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IGdvb2dsZS5tYXBzLkNvbnRyb2xQb3NpdGlvbi5SSUdIVF9DRU5URVJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbWFwVHlwZUNvbnRyb2xPcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogZ29vZ2xlLm1hcHMuQ29udHJvbFBvc2l0aW9uLlJJR0hUX1RPUFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBtYXBUeXBlSWQ6IGdvb2dsZS5tYXBzLk1hcFR5cGVJZC5ST0FETUFQLFxyXG4gICAgICAgICAgICBzdHlsZXM6IFt7XCJmZWF0dXJlVHlwZVwiOlwid2F0ZXJcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiM0NmJjZWNcIn0se1widmlzaWJpbGl0eVwiOlwib25cIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwibGFuZHNjYXBlXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjZjJmMmYyXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInJvYWRcIixcInN0eWxlcnNcIjpbe1wic2F0dXJhdGlvblwiOi0xMDB9LHtcImxpZ2h0bmVzc1wiOjQ1fV19LHtcImZlYXR1cmVUeXBlXCI6XCJyb2FkLmhpZ2h3YXlcIixcInN0eWxlcnNcIjpbe1widmlzaWJpbGl0eVwiOlwic2ltcGxpZmllZFwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJyb2FkLmFydGVyaWFsXCIsXCJlbGVtZW50VHlwZVwiOlwibGFiZWxzLmljb25cIixcInN0eWxlcnNcIjpbe1widmlzaWJpbGl0eVwiOlwib2ZmXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcImFkbWluaXN0cmF0aXZlXCIsXCJlbGVtZW50VHlwZVwiOlwibGFiZWxzLnRleHQuZmlsbFwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiIzQ0NDQ0NFwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJ0cmFuc2l0XCIsXCJzdHlsZXJzXCI6W3tcInZpc2liaWxpdHlcIjpcIm9mZlwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJwb2lcIixcInN0eWxlcnNcIjpbe1widmlzaWJpbGl0eVwiOlwib2ZmXCJ9XX1dXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBtYXBFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcCcpO1xyXG4gICAgICAgIHZhciBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKG1hcEVsZW1lbnQsIG1hcE9wdGlvbnMpO1xyXG4gICAgICAgIHZhciBsb2NhdGlvbnMgPSBbXHJcbiAgICAgICAgICAgIHtcInRpdGxlXCI6XCJBTkRSRVdcIixcInRlbFwiOlwiKzcoOTUxKTg5Ni00Mi00NFwiLFwiZW1haWxcIjpcImthdGFzaGkxMzI4QG1haWwucnVcIixcIndlYlwiOlwiaHR0cHM6Ly9hbmRyZXdsZXlraW4uZ2l0aHViLmlvL3BvcnRmb2xpby9idWlsZC9cIixcIndlYl9mb3JtYXR0ZWRcIjpcImFuZHJld2xleWtpbi5naXRodWIuaW9cIixcImxhdFwiOjU1LjczNDcwNTcwNDU5MjgwNSxcImxuZ1wiOjUyLjM5NzUxNTAyMDc2MjYyNixcInZpY2luaXR5XCI6XCJcIixcIm1hcmtlclwiOntcImZpbGxDb2xvclwiOlwiIzAwQUNDMVwiLFwiZmlsbE9wYWNpdHlcIjoxLFwic3Ryb2tlV2VpZ2h0XCI6MCxcInNjYWxlXCI6MS41LFwicGF0aFwiOlwiTTEwLjIsNy40Yy02LDAtMTAuOSw0LjktMTAuOSwxMC45YzAsNiwxMC45LDE4LjQsMTAuOSwxOC40czEwLjktMTIuMywxMC45LTE4LjRDMjEuMiwxMi4yLDE2LjMsNy40LDEwLjIsNy40eiBNMTAuMiwyMi45Yy0yLjYsMC00LjYtMi4xLTQuNi00LjZzMi4xLTQuNiw0LjYtNC42czQuNiwyLjEsNC42LDQuNlMxMi44LDIyLjksMTAuMiwyMi45elwiLFwiYW5jaG9yXCI6e1wieFwiOjEwLFwieVwiOjMwfSxcIm9yaWdpblwiOntcInhcIjowLFwieVwiOjB9LFwic3R5bGVcIjoxfSxcIml3XCI6e1widGVsXCI6dHJ1ZSxcIndlYlwiOnRydWUsXCJlbWFpbFwiOnRydWV9fVxyXG4gICAgICAgIF07XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGxvY2F0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcclxuICAgICAgICAgICAgICAgIGljb246IGxvY2F0aW9uc1tpXS5tYXJrZXIsXHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhsb2NhdGlvbnNbaV0ubGF0LCBsb2NhdGlvbnNbaV0ubG5nKSxcclxuXHJcbiAgICAgICAgICAgICAgICBtYXA6IG1hcCxcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBsb2NhdGlvbnNbaV0udGl0bGUsXHJcbiAgICAgICAgICAgICAgICBhZGRyZXNzOiBsb2NhdGlvbnNbaV0uYWRkcmVzcyxcclxuICAgICAgICAgICAgICAgIGRlc2M6IGxvY2F0aW9uc1tpXS5kZXNjLFxyXG4gICAgICAgICAgICAgICAgdGVsOiBsb2NhdGlvbnNbaV0udGVsLFxyXG4gICAgICAgICAgICAgICAgaW50X3RlbDogbG9jYXRpb25zW2ldLmludF90ZWwsXHJcbiAgICAgICAgICAgICAgICB2aWNpbml0eTogbG9jYXRpb25zW2ldLnZpY2luaXR5LFxyXG4gICAgICAgICAgICAgICAgb3BlbjogbG9jYXRpb25zW2ldLm9wZW4sXHJcbiAgICAgICAgICAgICAgICBvcGVuX2hvdXJzOiBsb2NhdGlvbnNbaV0ub3Blbl9ob3VycyxcclxuICAgICAgICAgICAgICAgIHBob3RvOiBsb2NhdGlvbnNbaV0ucGhvdG8sXHJcbiAgICAgICAgICAgICAgICB0aW1lOiBsb2NhdGlvbnNbaV0udGltZSxcclxuICAgICAgICAgICAgICAgIGVtYWlsOiBsb2NhdGlvbnNbaV0uZW1haWwsXHJcbiAgICAgICAgICAgICAgICB3ZWI6IGxvY2F0aW9uc1tpXS53ZWIsXHJcbiAgICAgICAgICAgICAgICBpdzogbG9jYXRpb25zW2ldLml3XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBtYXJrZXJzQXJyYXkucHVzaChtYXJrZXIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGxvY2F0aW9uc1tpXS5pdy5lbmFibGUgPT09IHRydWUpe1xyXG4gICAgICAgICAgICAgICAgYmluZEluZm9XaW5kb3cobWFya2VyLCBtYXAsIGxvY2F0aW9uc1tpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbn0pOyBcclxuIl19
