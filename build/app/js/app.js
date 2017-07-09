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

			box.toggleClass('js__flip');
		});

		// при клике  на "На главную", удалить класс поворота, тем самым развернув контейнер
		mainLink.click(function(e) {
			e.preventDefault(); // отмена стандартных дейсвтйи

			box.removeClass('js__flip');
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

	// при загрузке странице
	$(window).on('load',() =>{

		//с задержкой 1 сек
		setTimeout(()=>{

			// добавить класс с анимацией
			flip.addClass(flipAnimation);
		}, 1000);

	});


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
// js файл для карты

(function() {
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



})(); 

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
// Библиотека svg4everybody для svg

$(function(){
	svg4everybody();
})
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lbnUuanMiLCJwYXJhbGxheC5qcyIsInByZWxvYWRlci5qcyIsInZhbGlkYXRlLmpzIiwic2Nyb2xsLmpzIiwiaW5kZXgtcGFyYWxsYXguanMiLCJmbGlwLmpzIiwiZmxpcF9fc2hvdy5qcyIsInN0aWNreS1zaWRlYmFyLmpzIiwibmF2LXNpZGViYXIuanMiLCJzaWRlYmFyX19zaG93LmpzIiwiY2lyY2xlLWFuaW1hdGUuanMiLCJtYXAuanMiLCJzbGlkZXJfX2NvbnRyb2xzLmpzIiwic2xpZGVyX19kaXNwbGF5LmpzIiwic3ZnNGV2ZXJ5Ym9keS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGpzINC00LvRjyDQvNC10L3RjlxyXG5cclxuKGZ1bmN0aW9uKCkge1xyXG4gICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgLy8g0J/QtdGA0LXQvNC10L3QvdGL0LVcclxuICB2YXIgbGluayA9ICQoJy5oZWFkZXJfX21lbnUnKSxcclxuICAgICAgbGlua19fYWN0aXZlPSAnaGVhZGVyX19tZW51X19hY3RpdmUnLFxyXG4gICAgICBsaXN0ID0gJCgnLm1haW4tbWVudV9fbGlzdCcpLFxyXG4gICAgICBiZyA9ICQoJy5tYWluLW1lbnUnKSxcclxuICAgICAgc29jaWFsID0gJCgnLmhlYWRlcl9fc29jaWFsJyksXHJcbiAgICAgIGFuaW1hdGUgPSAnbWFpbi1tZW51X19hbmltYXRlJztcclxuXHJcbiAgICAvLyDQv9GA0L7QvNC40YEg0LrQvtGC0L7RgNGL0Lkg0LHRg9C00LXRgiDQv9GA0L7QstC10YDRj9GC0Ywg0L3QsNC70LjRh9C40LUg0YHRgdGL0LvQutC4KNCz0LDQvNCx0YPRgNCz0LXRgNCwKVxyXG4gICAgdmFyIG1lbnVQcm9taXNlID0gbmV3IFByb21pc2UgKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICBpZiAobGluay5sZW5ndGgpIHtcclxuICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVqZWN0KCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vINGE0YPQvdC60YbQuNGPINC/0YDQuCDQvdCw0LvQuNGH0LjQuCDRgdGB0YvQu9C60Lgo0LPQsNC80LHRg9GA0LPQtdGA0LApXHJcbiAgICBtZW51UHJvbWlzZS50aGVuKGZ1bmN0aW9uKCl7XHJcbiAgICAgIGxpbmsub24oJ2NsaWNrJywgY2xpY2tGdW5jdGlvbik7XHJcbiAgICB9KS5jYXRjaChmdW5jdGlvbigpe1xyXG4gICAgICByZXR1cm4gO1xyXG4gICAgfSk7XHJcblxyXG5cclxuXHJcbiAgLy8g0KTRg9C90LrRhtC40Y8g0L/RgNC4INC90LDQttCw0YLQuNC4INC90LAg0LzQtdC90Y4t0YjQsNC80LHRg9GA0LPQtdGAXHJcbiAgdmFyIGNsaWNrRnVuY3Rpb24gPSBmdW5jdGlvbiAoZSkge1xyXG4gIFx0ZS5wcmV2ZW50RGVmYXVsdCgpOyAvLyDQvtGC0LzQtdC90LAg0YHRgtCw0L3QtNCw0YDRgtC90YvRhSDQtNC10LnRgdCy0YLQudC4XHJcblxyXG4gIFx0JCh0aGlzKS50b2dnbGVDbGFzcyhsaW5rX19hY3RpdmUpOyAvLyDQuNC30LzQtdC90Y/QtdC8INC90LAg0LDQutGC0LjQstC90L7QtSDRgdC+0YHRgtC+0Y/QvdC40LVcclxuXHJcbiAgXHQvLyDQldGB0LvQuCDQutC90L7Qv9C60LAg0LDQutGC0LjQstC90LAg0YLQvlxyXG4gIFx0aWYobGluay5oYXNDbGFzcyhsaW5rX19hY3RpdmUpKSB7XHJcbiAgXHRcdGJnLmNzcygnZGlzcGxheScsICdibG9jaycpLmFkZENsYXNzKGFuaW1hdGUpOyAvLyDQvtGC0L7QsdGA0LDQt9C40YLRjCDQvNC10L3Rjiwg0Lgg0LTQvtCx0LDQstC40YLRjCDQutC70LDRgdGBINCw0L3QuNC80LDRhtC40LhcclxuICBcdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gIFx0XHRcdHNvY2lhbC5jc3MoJ29wYWNpdHknLCAnMCcpOyAvLyDRh9C10YDQtdC3IDIwMCDQvNC40LvQuNGB0LXQutGD0L3QtCDRgdC60YDRi9GC0Ywg0LjQutC+0L3QutC4XHJcbiAgXHRcdH0sMjAwKTtcclxuICAgIFx0Ly8g0YfQtdGA0LXQtyA3MDAg0LzQuNC70LjRgdC10LrRg9C90LQg0L7RgtC+0LHRgNCw0LbQsNGC0Ywg0YHQv9C40YHQvtC6INC80LXQvdGOXHJcbiAgICBcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgIFx0XHRsaXN0LmNzcygndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZVkoMCknKTtcclxuICAgIFx0fSw4MDApO1xyXG4gICAgfSBlbHNlIHsgLy8g0JXRgdC70Lgg0LrQvdC+0L/QutCwINC90LUg0LDQutGC0LjQstC90LBcclxuICAgICAgYmcuY3NzKCdkaXNwbGF5JywgJ25vbmUnKS5yZW1vdmVDbGFzcyhhbmltYXRlKTsgLy8g0YHQutGA0YvRgtGMINC80LXQvdGOLCDRg9C00LDQu9C40YLRjCDQutC70LDRgdGBINCw0L3QuNC80LDRhtC40LhcclxuICAgICAgc29jaWFsLmNzcygnb3BhY2l0eScsICcxJykgLy8g0L7RgtC+0LHRgNCw0LfQuNGC0Ywg0LjQutC+0L3QutC4XHJcbiAgICAgIGxpc3QuY3NzKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlWSgtMTAwJSknKTtcclxuICAgIH1cclxuXHJcblxyXG4gIH07XHJcbn0pKCk7IiwiLy8ganMg0LTQu9GPINC/0LDRgNCw0LvQu9Cw0LrRgSDRjdGE0YTQtdC60YLQsCwg0L3QsCDRhNC+0L3QtSDQs9C+0YBcclxuJ3VzZSBzY3RyaWN0JztcclxuXHJcbiQoZnVuY3Rpb24oKXtcclxuXHQvLyDQt9Cw0LTQsNGR0Lwg0L7QsdGJ0YPRjiDQv9C10YDQtdC80LXQvdC90YPRjlxyXG5cdHZhciBzdmdUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzX19oZWFkZXItdGV4dCcpO1xyXG5cclxuXHQvLyDQv9GA0L7QvNC40YEg0LrQvtGC0L7RgNGL0Lkg0LHRg9C00LXRgiDQv9GA0L7QstC10YDRj9GC0Ywg0L3QsNC70LjRh9C40LUgc3ZnVGV4dCDQsiBwYWdlLWhlYWRlclxyXG5cdHZhciBwYXJhbGxheFByb21pc2UgPSBuZXcgUHJvbWlzZSAoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblx0XHRcdGlmIChzdmdUZXh0KSB7XHJcblx0XHRcdFx0cmVzb2x2ZSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblxyXG5cclxuXHQvLyDRhNGD0L3QutGG0LjRjyDQtNC70Y8gcGFyYWxsYXgg0L/RgNC4INGB0LrRgNC+0LvQtVxyXG5cdHZhciBwYXJhbGxheCA9IChmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgaW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2UtaGVhZGVyX19pbWcnKTtcclxuXHRcdHZhciB1c2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnVzZXItYmxvY2tfX3RvcCcpO1xyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdG1vdmU6IGZ1bmN0aW9uKGJsb2NrLCB3aW5kb3dTY3JvbGwsIHN0cmFmZUFtb3VudCkge1xyXG5cdFx0XHRcdHZhciBzdHJhZmUgPSB3aW5kb3dTY3JvbGwgLyAtc3RyYWZlQW1vdW50ICsgJyUnO1xyXG5cdFx0XHRcdHZhciB0cmFuc2Zvcm1TdHJpbmcgPSAndHJhbnNsYXRlM2QoMCwnICsgc3RyYWZlICsgJywwKSc7XHJcblxyXG5cdFx0XHRcdGJsb2NrLnN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcclxuXHRcdFx0fSxcclxuXHRcdFx0aW5pdDogZnVuY3Rpb24gKHdTY3JvbGwpIHtcclxuXHRcdFx0XHR0aGlzLm1vdmUoaW1nLCB3U2Nyb2xsLCA0NSk7XHJcblx0XHRcdFx0dGhpcy5tb3ZlKHN2Z1RleHQsIHdTY3JvbGwsIDMwKTtcclxuXHRcdFx0XHR0aGlzLm1vdmUodXNlciwgd1Njcm9sbCwgMTApO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSgpKTtcclxuXHR3aW5kb3cub25zY3JvbGwgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgd1Njcm9sbCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcclxuXHRcdGlmIChzdmdUZXh0KSB7XHJcblx0XHRcdFx0cGFyYWxsYXguaW5pdCh3U2Nyb2xsKTtcclxuXHRcdFx0fVxyXG5cdFx0Ly8g0YTRg9C90LrRhtC40Y8g0L/RgNC4INC90LDQu9C40YfQuNC4IHN2Z1RleHQg0LIgcGFnZS1oZWFkZXJcclxuXHRcdC8vIHBhcmFsbGF4UHJvbWlzZS50aGVuKGZ1bmN0aW9uKCl7XHJcblx0XHQvLyBcdHBhcmFsbGF4LmluaXQod1Njcm9sbCk7XHJcblx0XHQvLyB9KTtcclxuXHR9XHJcbn0pXHJcblxyXG4iLCIvLyBqcyDRhNCw0LnQuyDQtNC70Y8g0L/RgNC10LvQvtCw0LTQtdGA0LAg0L3QsCDQu9GO0LHRi9GFINGB0YLRgNCw0L3QuNGG0LDRhVxyXG5cclxuXHJcblx0Ly8g0LfQsNC00LDRkdC8INC/0LXRgNC10LzQtdC90L3Ri9C1XHJcblx0dmFyIGltYWdlcyA9ICQoJ2ltZycpLFxyXG5cdFx0aW1hZ2VzVG90YWxDb3VudCA9IGltYWdlcy5sZW5ndGgsXHJcblx0XHRpbWFnZXNMb2FkZWRDb3VudCA9IDAsXHJcblx0XHRwZXJjRGlzcGxheSA9ICQoJy5wcmVsb2FkZXJfX3BlcmNlbnQnKSxcclxuXHRcdHByZWxvYWRlciA9ICQoJy5wcmVsb2FkZXInKSxcclxuXHRcdHJvdW5kcyA9ICQoJy5wcmVsb2FkZXJfX3JvdW5kcycpLFxyXG5cdFx0c3Ryb2tlR2xvYmFsID0gNDUwLFxyXG5cdFx0c3Ryb2tlU3RhcnQgPSA0NTAsXHJcblx0XHRzdHJva2VEYXNob2Zmc2V0O1xyXG5cclxuXHQvLyDQv9GA0L7QvNC40YEg0LrQvtGC0L7RgNGL0Lkg0LHRg9C00LXRgiDQv9GA0L7QstC10YDRj9GC0Ywg0L3QsNC70LjRh9C40LUg0L/RgNC10LvQvtCw0LTQtdGA0LAg0L3QsCDRgdGC0YDQsNC90LjRhtC1XHJcblx0dmFyIHByZWxvYWRlclByb21pc2UgPSBuZXcgUHJvbWlzZSAoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblx0XHRcdGlmIChwcmVsb2FkZXIubGVuZ3RoKSB7XHJcblx0XHRcdFx0cmVzb2x2ZSgpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlamVjdCgpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0Ly8g0YTRg9C90LrRhtC40Y8g0L/RgNC4INC90LDQu9C40YfQuNC4INC/0YDQtdC70L7QsNC00LXRgNCwINC90LAg0YHRgtGA0LDQvdC40YbQtVxyXG5cdHByZWxvYWRlclByb21pc2UudGhlbihmdW5jdGlvbigpe1xyXG5cclxuXHRcdC8vINGG0LjQutC7INC00LvRjyDQv9C10YDQtdCx0LjRgNCw0L3QuNGPINCy0YHQtdGFINC60LDRgNGC0LjQvdC+0LpcclxuXHRcdGZvciAodmFyIGk9MDsgaSA8IGltYWdlc1RvdGFsQ291bnQ7IGkrKykge1xyXG5cdFx0XHRpbWFnZUNsb25lID0gbmV3IEltYWdlKCk7XHJcblx0XHRcdGltYWdlQ2xvbmUub25sb2FkID0gaW1hZ2VMb2FkZWQ7XHJcblx0XHRcdGltYWdlQ2xvbmUub25lcnJvciA9IGltYWdlTG9hZGVkO1xyXG5cdFx0XHRpbWFnZUNsb25lLnNyYyA9IGltYWdlc1tpXS5zcmM7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8g0YTRg9C90LrRhtC40Y8g0LTQu9GPINC/0YDQvtCy0LXRgNC60Lgg0LfQsNCz0YDRg9C30LrQuCDQstGB0LXRhSDQutCw0YDRgtC40L3QvtC6XHJcblx0XHRmdW5jdGlvbiBpbWFnZUxvYWRlZCgpIHtcclxuXHJcblx0XHRcdC8vINGD0LLQtdC70LjRh9C40LLQsNC10Lwg0YfQuNGB0LvQviDQt9Cw0LPRgNGD0LbQtdC90L3Ri9GFINC60LDRgNGC0LjQvdC+0LpcclxuXHRcdFx0aW1hZ2VzTG9hZGVkQ291bnQrKztcclxuXHJcblx0XHRcdC8vINGB0YfQuNGC0LDQtdC8INC/0YDQvtGG0LXQvdGCINC30LDQs9GA0YPQttC10L3QvdGL0YVcclxuXHRcdFx0dmFyIHBlcmMgPSBNYXRoLnJvdW5kKCgoMTAwIC8gaW1hZ2VzVG90YWxDb3VudCkgKiBpbWFnZXNMb2FkZWRDb3VudCkpICsgJyUnO1xyXG5cdFx0XHRcclxuXHRcdFx0Ly8g0LLRi9Cy0L7QtNC40Lwg0L3QsNGI0LUg0LfQvdCw0YfQtdC90LjQtSDQv9GA0L7RhtC10L3RgtC90L7QtVxyXG5cdFx0XHRwZXJjRGlzcGxheS5odG1sKHBlcmMpO1xyXG5cclxuXHRcdFx0Ly8g0YHRh9C40YLQsNC10Lwg0L7RgtC90L7RgdC40YLQtdC70YzQvdC+0LUg0LfQsNC60YDQsNGB0LrRgyDQvtCx0LLQvtC00LrQuCDQutGA0YPQs9CwXHJcblx0XHRcdHN0cm9rZURhc2hvZmZzZXQgPSBzdHJva2VTdGFydCAtIE1hdGgucm91bmQoKHN0cm9rZUdsb2JhbCAvIGltYWdlc1RvdGFsQ291bnQpKTtcclxuXHJcblx0XHRcdC8vINCy0YvRh9C40YLQsNC10Lwg0YHRgtCw0YDRgtC+0LLRi9C5INC+0YLRh9GR0YJcclxuXHRcdFx0c3Ryb2tlU3RhcnQgLT0gKHN0cm9rZUdsb2JhbCAvIGltYWdlc1RvdGFsQ291bnQpO1xyXG5cclxuXHRcdFx0Ly8g0L/RgNC40YHQstCw0LjQstCw0LXQvCDRgtC+INGH0YLQviDQv9C+0YHRh9C40YLQsNC70LgsINC90LDRiNC10LzRgyDQutGA0YPQs9GDINGB0LLQs1xyXG5cdFx0XHRyb3VuZHMuY3NzKCdzdHJva2VEYXNob2Zmc2V0Jywgc3Ryb2tlRGFzaG9mZnNldCk7XHJcblxyXG5cdFx0XHQvLyDQldGB0LvQuCDQstGB0LUg0LrQsNGA0YLQuNC90LrQuCDQt9Cw0LPRgNGD0LbQtdC90L3Riywg0YPQsdGA0LDRgtGMINCx0LvQvtC6INC/0YDQtdC70L7QsNC00LXRgFxyXG5cdFx0XHRpZihpbWFnZXNMb2FkZWRDb3VudCA+PSBpbWFnZXNUb3RhbENvdW50KSB7XHJcblx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0aWYoIXByZWxvYWRlci5oYXNDbGFzcygnZG9uZScpKXtcclxuXHRcdFx0XHRcdFx0cHJlbG9hZGVyLmFkZENsYXNzKCdkb25lJyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSwgMTAwMCk7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYocHJlbG9hZGVyLmhhc0NsYXNzKCdkb25lJykpIHtcclxuXHRcdFx0XHQkKCcuZmxpcCcpLmFkZENsYXNzKCdmbGlwX19hbmltYXRpb24nKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0pLmNhdGNoKGZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4gO1xyXG5cdFx0fSk7XHJcblxyXG5cclxuXHJcbiIsIi8vIGpzINGE0LDQudC7INC00LvRjyDQstCw0LvQuNC00LDRhtC40Lgg0YTQvtGA0LxcclxuXHJcblxyXG4oZnVuY3Rpb24oICQgKXtcclxuXHJcblxyXG5cdCQoZnVuY3Rpb24oKXtcclxuXHJcblx0XHQvLyDQt9Cw0LTQsNC10Lwg0L/QtdGA0LXQvNC10L3QvdGL0LVcclxuXHRcdHZhciBmb3JtICAgICAgID0gJCgnLmpzX19mb3JtJyksXHJcblx0XHRcdFx0aW5wdXQgICAgICA9IGZvcm0uZmluZCgnLmpzX19pbnB1dCcpLFxyXG5cdFx0XHRcdGJ0biAgICAgICAgPSBmb3JtLmZpbmQoJy5qc19fZm9ybS1idG4nKSxcclxuXHRcdFx0XHRidG5SZXNldCAgID0gZm9ybS5maW5kKCcuanNfX2Zvcm0tYnRuLS1yZXNldCcpLFxyXG5cdFx0XHRcdGljb24gICAgICAgPSBmb3JtLmZpbmQoJy5qc19fZm9ybS1pY29uJyksXHJcblx0XHRcdFx0Y2hlY2sgICAgICA9IGZvcm0uZmluZCgnLmpzX19jaGVjaycpLFxyXG5cdFx0XHRcdGVtYWlsICAgICAgPSBmb3JtLmZpbmQoJy5qc19fZm9ybS1lbWFpbCcpLFxyXG5cdFx0XHRcdHBhdHRlcm4gICAgPSAvXlthLXowLTlfLV0rQFthLXowLTktXStcXC5bYS16XXsyLDZ9JC9pLFxyXG5cdFx0XHRcdHZhbGlkICAgICAgPSB0cnVlLFxyXG5cdFx0XHRcdGlucHV0RXJyb3IgPSAnZm9ybV9faW5wdXQtLWVycm9yJyxcclxuXHRcdFx0XHRpbnB1dFN1Y2Nlc3MgPSAnZm9ybV9faW5wdXQtLXN1Y2Nlc3MnLFxyXG5cdFx0XHRcdGljb25FcnJvciAgICA9ICdmb3JtX19pY29uLS1lcnJvcicsXHJcblx0XHRcdFx0aWNvblN1Y2Nlc3MgID0gJ2Zvcm1fX2ljb24tLXN1Y2Nlc3MnO1xyXG5cclxuXHRcdC8vINGE0YPQvdC60YbQuNGPINCy0LDQu9C40LTQsNGG0LjRjyDRhNC+0YDQvNGLXHJcblx0XHR2YXIgdmFsaWRGdW5jID0gZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdFx0Ly8g0L/RgNC+0LLQtdGA0Y/QtdC8INC60LDQttC00YvQuSBpbnB1dFxyXG5cdFx0XHRpbnB1dC5lYWNoKGZ1bmN0aW9uKGkpIHtcclxuXHJcblx0XHRcdFx0Ly8g0L/RgNC+0LLQtdGA0Y/QtdC8INGD0YHQu9C+0LLQuNC1LCDQtdGB0YLRjCDQu9C4INCyINC/0L7Qu9C1INGH0YLQvi3QvdC40LTRjFxyXG5cdFx0XHRcdGlmKCQodGhpcykudmFsKCkgIT0gJycpIHtcclxuXHRcdFx0XHRcdCQodGhpcykuYWRkQ2xhc3MoaW5wdXRTdWNjZXNzKTsgXHJcblx0XHRcdFx0XHRpY29uLmVxKGkpLmFkZENsYXNzKGljb25TdWNjZXNzKTtcclxuXHRcdFx0XHRcdGJ0bi5yZW1vdmVDbGFzcygnanNfX2Zvcm0tbm8tc3VibWl0Jyk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdCQodGhpcykuYWRkQ2xhc3MoaW5wdXRFcnJvcik7XHJcblx0XHRcdFx0XHRpY29uLmVxKGkpLmFkZENsYXNzKGljb25FcnJvcik7XHJcblx0XHRcdFx0XHRidG4uYWRkQ2xhc3MoJ2pzX19mb3JtLW5vLXN1Ym1pdCcpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdH0pOyAvLyAtLT4g0LfQsNC60LDQvdGH0LjQstCw0LXQvCDQv9GA0L7QstC10YDRj9GC0Ywg0LjQvdC/0YPRgtGLXHJcblxyXG5cclxuXHRcdFx0Ly8g0YPRgdC70L7QstC40Y8g0L3QsNC70LjRh9C40Y8g0YfQtdC6LdC40L3Qv9GD0YLQvtCyXHJcblx0XHRcdGlmKGNoZWNrKSB7XHJcblxyXG5cdFx0XHRcdC8vINC/0YDQvtCy0LXRgNGP0LXQvCDQutCw0LbQtNGL0Lkg0YfQtdC6LdC40L3Qv9GD0YJcclxuXHRcdFx0XHRjaGVjay5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0XHRcdC8vINC/0YDQvtCy0LXRgNGP0LXQvCDRg9GB0LvQvtCy0LjQtSwg0LLRi9Cx0YDQsNC9INC70Lgg0LjQvdC/0YPRglxyXG5cdFx0XHRcdFx0aWYoJCh0aGlzKS5wcm9wKFwiY2hlY2tlZFwiKSl7XHJcblx0XHRcdFx0XHRcdHZhbGlkID0gdHJ1ZTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHZhbGlkID0gZmFsc2U7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRyZXR1cm4gdmFsaWQ7XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdHJldHVybiB2YWxpZDtcclxuXHRcdFx0fVxyXG5cclxuXHJcblx0XHRcdHJldHVybiB2YWxpZDtcclxuXHRcdH0gLy8gLS0+IHZhbGlkRnVuYyBpcyBlbmRcclxuXHJcblxyXG5cdFx0Ly8g0YTRg9C90LrRhtC40Y8g0LTQu9GPINC/0YDQvtCy0LXRgNC60LggZW1haWxcclxuXHRcdHZhciBlbWFpbEZ1bmM9IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHRcdC8vINC/0YDQvtCy0LXRgNGP0LXQvCDRg9GB0LvQvtCy0LjQtSwg0LXRgdGC0Ywg0LvQuCDRh9GC0L4t0L3QuNC00Ywg0LIg0L3RkdC8XHJcblx0XHRcdGlmIChlbWFpbC52YWwoKSAhPSAnJykge1xyXG5cclxuXHRcdFx0XHRcdC8vINC/0YDQvtCy0LXRgNGP0LXQvCwg0YHQvtC+0YLQstC10YLRgdGC0LLRg9C10YIg0LvQuCDRiNCw0LHQu9C+0L3RgyBlbWFpbFxyXG5cdFx0XHRcdFx0aWYoZW1haWwudmFsKCkuc2VhcmNoKHBhdHRlcm4pID09IDApe1xyXG5cdFx0XHRcdFx0XHRlbWFpbC5hZGRDbGFzcyhpbnB1dFN1Y2Nlc3MpO1xyXG5cdFx0XHRcdFx0XHR2YWxpZCA9IHRydWU7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRlbWFpbC5hZGRDbGFzcyhpbnB1dEVycm9yKTtcclxuXHRcdFx0XHRcdFx0dmFsaWQgPSBmYWxzZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0ZW1haWwuYWRkQ2xhc3MoaW5wdXRFcnJvcik7XHJcblx0XHRcdFx0XHR2YWxpZCA9IGZhbHNlXHJcblx0XHRcdFx0fVxyXG5cclxuXHJcblx0XHRcdHJldHVybiB2YWxpZDtcclxuXHRcdH0gLy8gLS0+IGVtYWlsRnVuYyBpcyBlbmRcclxuXHJcblxyXG5cdFx0Ly8g0YTRg9C90LrRhtC40Y8g0LTQu9GPIGVtYWlsLCDQutC+0LPQtNCwINC/0L7QutC40LTQsNGI0Ywg0LjQvdC/0YPRglxyXG5cdFx0ZW1haWwuYmx1cihmdW5jdGlvbigpIHtcclxuXHJcblx0XHRcdC8vINC/0YDQvtCy0LXRgNGP0LXQvCBlbWFpbCwg0L3QsCDQvdCw0LvQuNGH0LjQtSDRh9C10LPQvi3QvdC40LTRjFxyXG5cdFx0XHRpZiAoZW1haWwudmFsKCkgIT0gJycpIHtcclxuXHJcblx0XHRcdFx0Ly8g0YHQvtC+0YLQstC10YLRgdGC0LLRg9C10YIg0LvQuCDQvdCw0YjQtdC80YMg0YjQsNCx0LvQvtC90YNcclxuXHRcdFx0XHRpZihlbWFpbC52YWwoKS5zZWFyY2gocGF0dGVybikgPT0gMCl7XHJcblx0XHRcdFx0XHRlbWFpbC5hZGRDbGFzcyhpbnB1dFN1Y2Nlc3MpO1xyXG5cdFx0XHRcdFx0dmFsaWQgPSB0cnVlO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRlbWFpbC5hZGRDbGFzcyhpbnB1dEVycm9yKTtcclxuXHRcdFx0XHRcdHZhbGlkID0gZmFsc2VcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0ZW1haWwuYWRkQ2xhc3MoaW5wdXRFcnJvcik7XHJcblx0XHRcdFx0dmFsaWQgPSBmYWxzZVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fSk7XHJcblxyXG5cclxuXHRcdC8vINC/0YDQvtCy0LXRgNGP0LXQvCDQutCw0LbQtNGL0Lkg0LjQvdC/0YPRglxyXG5cdFx0aW5wdXQuZWFjaChmdW5jdGlvbihpKSB7XHJcblxyXG5cdFx0XHQvLyDQtNC70Y8g0LrQsNC20LTQvtCz0L4g0LjQvdC/0YPRgtCwINC/0YDQuCDQv9C+0LrQuNC00LDQvdC40Lgg0L/QvtC70Y9cclxuXHRcdFx0JCh0aGlzKS5ibHVyKGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0XHQvLyDQv9GA0L7QstC10YDRj9C10Lwg0L3QsNC70LjRh9C40LUg0YfQtdCz0L4t0LvQuNCx0L5cclxuXHRcdFx0XHRpZigkKHRoaXMpLnZhbCgpICE9ICcnKSB7XHJcblx0XHRcdFx0XHQkKHRoaXMpLmFkZENsYXNzKGlucHV0U3VjY2Vzcyk7XHJcblx0XHRcdFx0XHRpY29uLmVxKGkpLmFkZENsYXNzKGljb25TdWNjZXNzKTtcclxuXHRcdFx0XHRcdGJ0bi5yZW1vdmVDbGFzcygnanNfX2Zvcm0tbm8tc3VibWl0JylcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0JCh0aGlzKS5hZGRDbGFzcyhpbnB1dEVycm9yKTtcclxuXHRcdFx0XHRcdGljb24uZXEoaSkuYWRkQ2xhc3MoaWNvbkVycm9yKTtcclxuXHRcdFx0XHRcdGJ0bi5hZGRDbGFzcygnanNfX2Zvcm0tbm8tc3VibWl0Jyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHR9KTtcclxuXHJcblxyXG5cdFx0Ly8g0L/RgNC4INC60LvQuNC60LUg0L3QsCDQutC90L7Qv9C60YMg0L7RgtC/0YDQsNCy0LrQuFxyXG5cdFx0YnRuLmNsaWNrKGZ1bmN0aW9uKGUpIHtcclxuXHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0dmFsaWRGdW5jKCk7XHJcblxyXG5cdFx0XHQvLyDQtdGB0LvQuCDQtdGB0YLRjCBlbWFpbFxyXG5cdFx0XHRpZihlbWFpbCkge1xyXG5cdFx0XHRcdGVtYWlsRnVuYygpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyDQv9GA0L7QstC10YDRj9GC0Ywg0YPRgdC70L7QstC40LUg0LXRgdGC0Ywg0LvQuCDQutC70LDRgdGBXHJcblx0XHRcdGlmKGJ0bi5oYXNDbGFzcygnanNfX2Zvcm0tbm8tc3VibWl0JykpIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Zm9ybS5zdWJtaXQoKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdH0pO1xyXG5cclxuXHJcblx0XHQvLyDQv9GA0Lgg0LrQu9C40LrQtSDQvdCwINC60L3QvtC/0LrRgyBcItC+0YfQuNGB0YLQuNGC0YxcIlxyXG5cdFx0YnRuUmVzZXQuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHRcdGlucHV0LmFkZChlbWFpbCkucmVtb3ZlQ2xhc3MoaW5wdXRFcnJvciwgaW5wdXRTdWNjZXNzKTtcclxuXHRcdFx0aWNvbi5yZW1vdmVDbGFzcyhpY29uRXJyb3IsIGljb25TdWNjZXNzKTtcclxuXHRcdH0pO1xyXG5cclxuXHJcblx0fSk7IC8vIC0tPiByZWFkeSBlbmRcclxuXHJcbn0pKCBqUXVlcnkgKTsiLCIvLyBqcyDQtNC70Y8g0YHQutGA0L7Qu9C70LAg0LLQvdC40Lcg0LjQu9C4INCy0LLQtdGA0YVcclxuJ3VzZSBzY3RyaWN0JztcclxuXHJcbiQoZnVuY3Rpb24gKCl7XHJcblxyXG5cdC8vINC30LDQtNCw0ZHQvCDQv9C10YDQtdC80LXQvdC90YvQtVxyXG5cdHZhciBib2R5ID0gJCgnYm9keSwgaHRtbCcpLFxyXG5cdFx0YXJyb3dEb3duID0gJCgnLmpzX19hcnJvdy1kb3duJyksXHJcblx0XHRhcnJvd1VwID0gJCgnLmpzX19hcnJvdy11cCcpLFxyXG5cdFx0aGVhZGVySGVpZ2h0ID0gJCgnLmpzX19oZWFkZXInKS5oZWlnaHQoKTtcclxuXHJcblx0Ly8g0L/RgNC+0LLQtdGA0Y/QtdC8INC90LDQu9C40YfQuNC1INGB0YLRgNC10LvQutC4IC0tINCy0L3QuNC3XHJcblx0aWYoYXJyb3dEb3duKXtcclxuXHRcdC8vINGE0YPQvdC60YbQuNGPINC/0YDQuCDQvdCw0LbQsNGC0LjQuFxyXG5cdFx0YXJyb3dEb3duLmNsaWNrKGZ1bmN0aW9uKCl7XHJcblx0XHRcdC8vINCw0L3QuNC80LDRhtC40Y8g0YHQutGA0L7Qu9C70LBcclxuXHRcdFx0Ym9keS5hbmltYXRlKHtzY3JvbGxUb3A6IGhlYWRlckhlaWdodH0sIDE1MDApO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHQvLyDQv9GA0L7QstC10YDRj9C10Lwg0L3QsNC70LjRh9C1INGB0YLRgNC10LvQutC4IC0tINCy0LLQtdGA0YVcclxuXHRpZihhcnJvd1VwKSB7XHJcblx0XHQvLyDRhNGD0L3QutGG0LjRjyDQv9GA0Lgg0L3QsNC20LDRgtC40LhcclxuXHRcdGFycm93VXAuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHRcdC8vINCw0L3QuNC80LDRhtC40Y8g0YHQutGA0L7Qu9C70LBcclxuXHRcdFx0Ym9keS5hbmltYXRlKHtzY3JvbGxUb3A6IDB9LCAyNTAwKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcbn0pO1xyXG4iLCIvLyBqcyDQtNC70Y8gaW5kZXgtcGFyYWxsYXhcclxuXHJcbiQoZnVuY3Rpb24oKXtcclxuXHJcblx0Ly8g0LfQsNC00LDRkdC8INC/0LXRgNC10LzQtdC90L3Ri9C1XHJcblx0dmFyIHBhcmFsbGF4Q29udGFpbmVyID0gJCgnLnBhcmFsbGF4JyksXHJcblx0XHRsYXllcnMgPSAkKCcucGFyYWxsYXhfX2xheWVyJyk7XHJcblxyXG5cclxuXHQvLyDQv9GA0L7QvNC40YEg0LrQvtGC0L7RgNGL0Lkg0LHRg9C00LXRgiDQv9GA0L7QstC10YDRj9GC0Ywg0L3QsNC70LjRh9C40LUg0JPQu9Cw0LLQvdC+0LPQviDQv9Cw0YDQsNC70LvQsNC60YHQsCDQvdCwINGB0YLRgNCw0L3QuNGG0LVcclxuXHR2YXIgcGFyYWxsYXhQcm9taXNlID0gbmV3IFByb21pc2UgKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cdFx0XHRpZiAocGFyYWxsYXhDb250YWluZXIubGVuZ3RoKSB7XHJcblx0XHRcdFx0cmVzb2x2ZSgpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlamVjdCgpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0Ly8g0YTRg9C90LrRhtC40Y8g0L/RgNC4INC90LDQu9C40YfQuNC4INCz0LvQsNCy0L3QvtCz0L4g0L/QsNGA0LDQu9C70LDQutGB0LBcclxuXHRwYXJhbGxheFByb21pc2UudGhlbihmdW5jdGlvbigpe1xyXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG1vdmVMYXllcnMpO1xyXG5cdH0pLmNhdGNoKGZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4gO1xyXG5cdFx0fSk7XHJcblxyXG5cdC8vINGE0YPQvdC60YbQuNGPINC00LvRjyDQtNCy0LjQttC10L3QuNGPINGB0LvQvtGR0LJcclxuXHR2YXIgbW92ZUxheWVycyA9IGZ1bmN0aW9uIChlKSB7XHJcblx0XHR2YXIgaW5pdGlhbFggPSAod2luZG93LmlubmVyV2lkdGggLyAyKSAtIGUucGFnZVgsXHJcblx0XHRcdGluaXRpYWxZID0gKHdpbmRvdy5pbm5lckhlaWdodCAvIDIpIC0gZS5wYWdlWTtcclxuXHJcblx0XHRbXS5zbGljZS5jYWxsKGxheWVycykuZm9yRWFjaChmdW5jdGlvbihsYXllciwgaW5kZXgpIHtcclxuXHRcdFx0dmFyIGRpdmlkZXIgPSBpbmRleCAvIDEwMCxcclxuXHRcdFx0XHRwb3NpdGlvblggPSBpbml0aWFsWCAqIGRpdmlkZXIsXHJcblx0XHRcdFx0cG9zaXRpb25ZID0gaW5pdGlhbFkgKiBkaXZpZGVyLFxyXG5cdFx0XHRcdHRyYW5zZm9ybVN0cmluZyA9ICd0cmFuc2xhdGUoJyArIHBvc2l0aW9uWCArICdweCwnICsgcG9zaXRpb25ZICsgJ3B4KSc7XHJcblxyXG5cdFx0XHRsYXllci5zdHlsZS50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1TdHJpbmc7XHJcblx0XHR9KTtcclxuXHR9O1xyXG59KTsiLCIvLyBGbGlwINGN0YTRhNC10LrRglxyXG5cclxuJChmdW5jdGlvbigpe1xyXG5cclxuXHQvLyDQt9Cw0LTQsNGR0Lwg0L/QtdGA0LXQvNC10L3QvdGL0LVcclxuXHR2YXIgbGluayA9ICQoJy5idG4tYXV0aG9fX2xpbmsnKSxcclxuXHRcdGJveCA9ICQoJy5mbGlwJyksXHJcblx0XHRtYWluTGluayA9ICQoJy5sb2dpbl9fbGluaycpOyBcclxuXHJcblx0Ly8g0L/RgNC+0LzQuNGBINC60L7RgtC+0YDRi9C5INCx0YPQtNC10YIg0L/RgNC+0LLQtdGA0Y/RgtGMINC90LDQu9C40YfQuNC1INGE0LvQuNC/INC60L7RgtC10LnQvdC10YDQsCDQvdCwINGB0YLRgNCw0L3QuNGG0LVcclxuXHR2YXIgZmxpcFByb21pc2UgPSBuZXcgUHJvbWlzZSAoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblx0XHRcdGlmIChib3gubGVuZ3RoKSB7XHJcblx0XHRcdFx0cmVzb2x2ZSgpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlamVjdCgpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0Ly8g0YTRg9C90LrRhtC40Y8g0L/RgNC4INC90LDQu9C40YfQuNC4INGE0LvQuNC/INC60L7QvdGC0LXQudC90LXRgNC1XHJcblx0ZmxpcFByb21pc2UudGhlbihmdW5jdGlvbigpIHtcclxuXHJcblx0XHQvLyDQv9GA0Lgg0LrQu9C40LrQtSwg0YTQu9C40L8g0LrQvtC90YLQtdC90LXQudGA0YMg0LTQvtCx0LDQstC40YLRjCDQutC70LDRgdGBINGBINC/0L7QstC+0YDQvtGC0L7QvFxyXG5cdFx0bGluay5jbGljayhmdW5jdGlvbihlKSB7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTsgLy8g0L7RgtC80LXQvdCwINGB0YLQsNC90LTQsNGA0YLQvdGL0YUg0LTQtdC50YHQstGC0LnQuFxyXG5cclxuXHRcdFx0Ym94LnRvZ2dsZUNsYXNzKCdqc19fZmxpcCcpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8g0L/RgNC4INC60LvQuNC60LUgINC90LAgXCLQndCwINCz0LvQsNCy0L3Rg9GOXCIsINGD0LTQsNC70LjRgtGMINC60LvQsNGB0YEg0L/QvtCy0L7RgNC+0YLQsCwg0YLQtdC8INGB0LDQvNGL0Lwg0YDQsNC30LLQtdGA0L3Rg9CyINC60L7QvdGC0LXQudC90LXRgFxyXG5cdFx0bWFpbkxpbmsuY2xpY2soZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7IC8vINC+0YLQvNC10L3QsCDRgdGC0LDQvdC00LDRgNGC0L3Ri9GFINC00LXQudGB0LLRgtC50LhcclxuXHJcblx0XHRcdGJveC5yZW1vdmVDbGFzcygnanNfX2ZsaXAnKTtcclxuXHRcdH0pO1xyXG5cdH0pLmNhdGNoKGZ1bmN0aW9uKCl7XHJcblx0XHRcdHJldHVybiA7XHJcblx0XHR9KTtcclxuXHJcbn0pOyIsIi8vIGpzINGE0LDQudC7INC00LvRjyDQsNC90LjQvNCw0YbQuNC4INC/0L7Rj9Cy0LvQtdC90LjRjyBmbGlwXHJcblxyXG5cclxuKGZ1bmN0aW9uKCl7XHJcblxyXG5cdC8vINC/0LXRgNC10LzQtdC90L3Ri9C1XHJcblx0dmFyIGZsaXAgPSAkKCcuZmxpcCcpLFxyXG5cdFx0ZmxpcEFuaW1hdGlvbiA9ICdmbGlwX19hbmltYXRpb24nO1xyXG5cclxuXHQvLyDQv9GA0Lgg0LfQsNCz0YDRg9C30LrQtSDRgdGC0YDQsNC90LjRhtC1XHJcblx0JCh3aW5kb3cpLm9uKCdsb2FkJywoKSA9PntcclxuXHJcblx0XHQvL9GBINC30LDQtNC10YDQttC60L7QuSAxINGB0LXQulxyXG5cdFx0c2V0VGltZW91dCgoKT0+e1xyXG5cclxuXHRcdFx0Ly8g0LTQvtCx0LDQstC40YLRjCDQutC70LDRgdGBINGBINCw0L3QuNC80LDRhtC40LXQuVxyXG5cdFx0XHRmbGlwLmFkZENsYXNzKGZsaXBBbmltYXRpb24pO1xyXG5cdFx0fSwgMTAwMCk7XHJcblxyXG5cdH0pO1xyXG5cclxuXHJcbn0oKSk7IiwiLy8ganMg0LTQu9GPINCb0LjQv9C60L7Qs9C+INGB0LDQudC00LHQsNGA0LAg0L3QsCDRgdGC0YDQsNC90LjRhtC1INCR0LvQvtCzXHJcblxyXG4oZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgLy8g0LfQsNC00LDQtdC8INC/0LXRgNC10LzQtdC90L3Ri9C1XHJcbiAgICB2YXIgc2lkZWJhciA9ICQoJy5zaWRlYmFyJyksXHJcbiAgICAgICAgc2lkZWJhckZpeCA9ICdzaWRlYmFyX19maXhlZCcsXHJcbiAgICAgICAgYnRuU2lkZWJhciA9ICQoJy5zaWRlYmFyX19zaG93JyksXHJcbiAgICAgICAgYnRuU2lkZWJhclNob3cgPSAnanNfX3NpZGViYXItc2hvdycsXHJcbiAgICAgICAgc2Nyb2xsSGVpZ2h0ID0gNjIwO1xyXG5cclxuICAgIC8vINC/0YDQvtC80LjRgSDQutC+0YLQvtGA0YvQuSDQsdGD0LTQtdGCINC/0YDQvtCy0LXRgNGP0YLRjCDQvdCw0LvQuNGH0LjQtSDQodCw0LnQtNCx0LDRgNCwINC90LAg0YHRgtGA0LDQvdC40YbQtVxyXG4gICAgdmFyIHNpZGViYXJQcm9taXNlID0gbmV3IFByb21pc2UgKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGlmIChzaWRlYmFyLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVqZWN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8g0YTRg9C90LrRhtC40Y8g0L/RgNC4INC90LDQu9C40YfQuNC4INGB0LDQudC00LHQsNGA0LBcclxuICAgIHNpZGViYXJQcm9taXNlLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAvKiDQtdGB0LvQuCDRgdC60YDQvtC70Lsg0LHQvtC70YzRiNC1INC30LDQtNCw0L3QvdC+0Lkg0LLRi9GB0L7RgtGLLCDRgtC+INC00L7QsdCw0LLQuNGC0Ywg0LrQu9Cw0YHRgSAqL1xyXG4gICAgICAgICAgICBpZigkKHRoaXMpLnNjcm9sbFRvcCgpID4gc2Nyb2xsSGVpZ2h0KXtcclxuICAgICAgICAgICAgICAgIHNpZGViYXIuYWRkQ2xhc3Moc2lkZWJhckZpeCk7XHJcbiAgICAgICAgICAgICAgICBidG5TaWRlYmFyLmFkZENsYXNzKGJ0blNpZGViYXJTaG93KTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpIDwgc2Nyb2xsSGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICBzaWRlYmFyLnJlbW92ZUNsYXNzKHNpZGViYXJGaXgpO1xyXG4gICAgICAgICAgICAgICAgYnRuU2lkZWJhci5yZW1vdmVDbGFzcyhidG5TaWRlYmFyU2hvdyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pLmNhdGNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcmV0dXJuIDtcclxuICAgIH0pO1xyXG5cclxufSkoKTsiLCIvLyBqcyDQtNC70Y8g0L3QsNCy0LjQs9Cw0YbQuNC4INC90LAg0YHRgtGA0LDQvdC40YbQtSDQkdC70L7Qs1xyXG5cclxuKGZ1bmN0aW9uKCkge1xyXG5cclxuXHQvLyDQv9C10YDQtdC80LXQvdC90YvQtVxyXG5cdHZhciBsaW5rID0gJCgnLnNpZGViYXJfX2xpbmsnKSxcclxuXHRcdGl0ZW0gPSAkKCcud3JpdGVfX2l0ZW0nKTtcclxuXHJcblx0JChmdW5jdGlvbigpe1xyXG5cclxuXHRcdC8vINC/0YDQvtC80LjRgSDQutC+0YLQvtGA0YvQuSDQsdGD0LTQtdGCINC/0YDQvtCy0LXRgNGP0YLRjCDQvdCw0LvQuNGH0LjQtSDQodCw0LnQtNCx0LDRgNCwINC90LAg0YHRgtGA0LDQvdC40YbQtVxyXG5cdFx0dmFyIG5hdlNpZGViYXJQcm9taXNlID0gbmV3IFByb21pc2UgKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cdFx0XHRpZiAobGluay5sZW5ndGgpIHtcclxuXHRcdFx0XHRyZXNvbHZlKCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmVqZWN0KCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vINGE0YPQvdC60YbQuNGPINC/0YDQuCDQvdCw0LvQuNGH0LjQuCDRgdCw0LnQtNCx0LDRgNCwXHJcblx0XHRuYXZTaWRlYmFyUHJvbWlzZS50aGVuKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRsaW5rLmNsaWNrKGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0XHRcdHNob3dBcnRpY2xlKCQodGhpcykuYXR0cignaHJlZicpLCB0cnVlKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KS5jYXRjaChmdW5jdGlvbigpe1xyXG5cdFx0XHRyZXR1cm4gO1xyXG5cdFx0fSk7XHJcblxyXG5cclxuXHR9KTtcclxuXHJcblx0Ly8g0L/RgNC4INGB0LrRgNC+0LvQu9C1INCy0YvQt9GL0LLQsNGC0Ywg0YTRg9C90LrRhtC40Y4gY2hlY2tBcnRpY2xlXHJcblx0JCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcclxuXHRcdGNoZWNrQXJ0aWNsZSgpO1xyXG5cdH0pO1xyXG5cclxuXHJcblx0Ly8g0YTRg9C90LrRhtC40Y8g0LTQu9GPINGB0LrRgNC+0LvQu9CwINC6INC90YPQttC90L7QvNGDINGN0LvQtdC80LXQvdGC0YNcclxuXHRmdW5jdGlvbiBzaG93QXJ0aWNsZShhcnRpY2xlLCBpc0FuaW1hdGUpIHtcclxuXHRcdHZhciBkaXJlY3Rpb24gPSBhcnRpY2xlLnJlcGxhY2UoLyMvLCAnJyksXHJcblx0XHRcdHJlcUFydGljbGUgPSBpdGVtLmZpbHRlcignW2RhdGEtYXJ0aWNsZT1cIicgKyBkaXJlY3Rpb24gKyAnXCJdJyksXHJcblx0XHRcdHJlcUFydGljbGVQb3MgPSByZXFBcnRpY2xlLm9mZnNldCgpLnRvcDtcclxuXHJcblx0XHRpZiAoaXNBbmltYXRlKSB7XHJcblx0XHRcdCQoJ2JvZHksIGh0bWwnKS5hbmltYXRlKHtzY3JvbGxUb3A6IHJlcUFydGljbGVQb3N9LCA1MDApO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Ly8g0YTRg9C90LrRhtC40Y8g0LTQu9GPINCw0LLRgtC+0LzQsNGC0LjRh9C10YHQutC10LPQviDQv9C10YDQtdC60LvRjtGH0LXQvdC40Y8g0LrQu9Cw0YHRgdCwIGFjdGl2ZSDRgyDRgdGB0YvQu9C+0LpcclxuXHRmdW5jdGlvbiBjaGVja0FydGljbGUoKSB7XHJcblx0XHRpdGVtLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhciAkdGhpcyA9ICQodGhpcyksXHJcblx0XHRcdFx0dG9wRWRnZSA9ICR0aGlzLm9mZnNldCgpLnRvcCAtIDE1MCxcclxuXHRcdFx0XHRib3R0b21FZGdlID0gdG9wRWRnZSArICR0aGlzLmhlaWdodCgpLFxyXG5cdFx0XHRcdHdTY3JvbGwgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XHJcblxyXG5cdFx0XHRpZiAodG9wRWRnZSA8IHdTY3JvbGwgJiYgYm90dG9tRWRnZSA+IHdTY3JvbGwpIHtcclxuXHRcdFx0XHR2YXIgY3VycmVudElkID0gJHRoaXMuZGF0YSgnYXJ0aWNsZScpLFxyXG5cdFx0XHRcdFx0cmVxTGluayA9IGxpbmsuZmlsdGVyKCdbaHJlZj1cIiMnICsgY3VycmVudElkICsgJ1wiXScpO1xyXG5cclxuXHRcdFx0XHRcdGxpbmsucmVtb3ZlQ2xhc3MoJ3NpZGViYXJfX2xpbmstLWFjdGl2ZScpO1xyXG5cdFx0XHRcdFx0cmVxTGluay5hZGRDbGFzcygnc2lkZWJhcl9fbGluay0tYWN0aXZlJyk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblxyXG59KSgpOyAiLCIvLyBqcyDRhNGD0L3QutGG0LjRjyDQtNC70Y8g0L/QvtC60LDQt9CwIHNpZGViYXJcclxuXHJcblxyXG4kKGZ1bmN0aW9uICgpIHtcclxuXHJcblx0Ly8g0L/QtdGA0LXQvNC10L3QvdGL0LVcclxuXHR2YXIgYnRuID0gJCgnLmpzX19idG4tc2lkZWJhcicpLFxyXG5cdFx0c2lkZWJhciA9ICQoJy5zaWRlYmFyJyksXHJcblx0XHRvdGhlckNvbnRlbnQgPSAkKCcud3JpdGUnKSxcclxuXHRcdGZsYWcgPSB0cnVlO1xyXG5cclxuXHQvLyDQv9GA0Lgg0LrQu9C40LrQtSDQvdCwINC60L3QvtC/0LrRgyDQv9C+0LrQsNC30YvQstCw0YLRjCDQuNC70Lgg0YHQutGA0YvQstCw0YLRjCDRgdCw0LnQtNCx0LDRgFxyXG5cdGJ0bi5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdGlmIChmbGFnID09IHRydWUpIHtcclxuXHRcdFx0c2lkZWJhci5jc3MoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGVYKDEwMCUpJyk7XHJcblx0XHRcdGZsYWcgPSBmYWxzZTtcclxuXHRcdH0gZWxzZSAge1xyXG5cdFx0XHRzaWRlYmFyLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcblx0XHRcdGZsYWcgPSB0cnVlO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQvLyDQtdGB0LvQuCDRgdCw0LnQtNCx0LDRgCDQv9C+0LrQsNC30LDQvSwg0L/RgNC4INC60LvQuNC60LUg0L3QsCDQtNGA0YPQs9C+0Lkg0LrQvtC90YLQtdC90YIg0YPQsdGA0LDRgtGMINGB0LDQudC00LHQsNGAXHJcblx0b3RoZXJDb250ZW50LmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0aWYgKGZsYWcgPT0gZmFsc2UpIHtcclxuXHRcdFx0c2lkZWJhci5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG5cdFx0XHRmbGFnID0gdHJ1ZTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0Ly8g0LXRgdC70Lgg0YHQsNC50LTQsdCw0YAg0L/QvtC60LDQt9Cw0L0sINC/0YDQuCDQutC70LjQutC1INC90LAg0LrQu9Cw0LLQuNGI0YMgRXNjINGD0LHRgNCw0YLRjCDRgdCw0LnQtNCx0LDRgFxyXG5cdCQoJ2JvZHknKS5rZXl1cChmdW5jdGlvbihlKSB7XHJcblx0XHRpZihlLndoaWNoID09IDI3KSB7XHJcblx0XHRcdHNpZGViYXIucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuXHRcdFx0ZmxhZyA9IHRydWU7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cclxuXHJcbn0pOyIsIi8vIGpzINGE0LDQudC7INC00LvRjyDQsNC90LjQvNCw0YbQuNC4INC60YDRg9Cz0L7QsiDRgdC60LjQu9C70L7QslxyXG5cclxuJChmdW5jdGlvbigpe1xyXG5cdC8vINC/0LXRgNC10LzQtdC90L3QsNGPINCx0LvQvtC60Lgg0YHQutC40LvQu9C+0LJcclxuXHR2YXIgZWxlbSA9ICQoJy5za2lsbHNfX2l0ZW1zLXdyYXAnKTtcclxuXHJcblx0Ly8g0L/RgNC+0LzQuNGBINC60L7RgtC+0YDRi9C5INCx0YPQtNC10YIg0L/RgNC+0LLQtdGA0Y/RgtGMINC90LDQu9C40YfQuNC1INCx0LvQvtC60LAg0YHQutC40LvQu9C+0LJcclxuXHR2YXIgc2tpbGxzUHJvbWlzZSA9IG5ldyBQcm9taXNlIChmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHRcdGlmIChlbGVtLmxlbmd0aCkge1xyXG5cdFx0cmVzb2x2ZSgpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdHJlamVjdCgpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQvLyDRhNGD0L3QutGG0LjRjyDQv9GA0Lgg0L3QsNC70LjRh9C40Lgg0LHQu9C+0LrQsCDRgdC60LjQu9C70L7QslxyXG5cdHNraWxsc1Byb21pc2UudGhlbihmdW5jdGlvbigpe1xyXG5cdFx0Ly8g0L/RgNC4INGB0LrRgNC+0LvQu9C1IFxyXG5cdFx0JCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyIHNjcm9sbFRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcclxuXHJcblx0XHRcdC8qINC10YHQu9C4INGE0YPQvdC60YbQuNGPIGNoZWNrRGlzdGFuY2Ug0LLQtdGA0L3Rg9C70LAgcmV0dXJuINGC0L4sINC00L7QsdCw0LLQuNGC0Ywg0LrQu9Cw0YHRgSAvINC40L3QsNGH0LUg0YPQtNCw0LvQuNGC0YwgKi9cclxuXHRcdFx0aWYoY2hlY2tEaXN0YW5jZShzY3JvbGxUb3ApKSB7XHJcblx0XHRcdFx0ZWxlbS5hZGRDbGFzcygnanNfX2NpcmNsZS1hbmltYXRlJyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0ZWxlbS5yZW1vdmVDbGFzcygnanNfX2NpcmNsZS1hbmltYXRlJyk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH0pLmNhdGNoKGZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4gO1xyXG5cdH0pO1xyXG5cclxuXHQvLyDRhNGD0L3QutGG0LjRjyDQtNC70Y8g0L/RgNC+0LLQtdGA0LrQuCDQv9C+0LfQuNGG0LjQuCDRjdC70LXQvNC10L3RgtCwXHJcblx0dmFyIGNoZWNrRGlzdGFuY2UgPSBmdW5jdGlvbihzY3JvbGxUb3ApIHtcclxuXHRcdHZhciBvZmZzZXQgPSBlbGVtLm9mZnNldCgpLnRvcCxcclxuXHRcdFx0d2luZG93TWFyZ2luID0gTWF0aC5jZWlsKCQod2luZG93KS5oZWlnaHQoKSAvIDMpLFxyXG5cdFx0XHR0b3BCb3JkZXIgPSBvZmZzZXQgLSBzY3JvbGxUb3AgLSB3aW5kb3dNYXJnaW4gLSAxMDAsXHJcblx0XHRcdGJvdHRvbUVkZ2UgPSBlbGVtLm91dGVySGVpZ2h0KHRydWUpICsgb2Zmc2V0LFxyXG5cdFx0XHRib3R0b21Cb3JkZXIgPSBzY3JvbGxUb3AgKyB3aW5kb3dNYXJnaW4gLSBib3R0b21FZGdlO1xyXG5cclxuXHRcdFx0cmV0dXJuIHRvcEJvcmRlciA8PSAwICYmIGJvdHRvbUJvcmRlciA8PSAwXHJcblx0fVxyXG5cclxuXHJcbn0pOyIsIi8vIGpzINGE0LDQudC7INC00LvRjyDQutCw0YDRgtGLXHJcblxyXG4oZnVuY3Rpb24oKSB7XHJcbiAgICBnb29nbGUubWFwcy5ldmVudC5hZGREb21MaXN0ZW5lcih3aW5kb3csICdsb2FkJywgaW5pdCk7XHJcbiAgICB2YXIgbWFwLCBtYXJrZXJzQXJyYXkgPSBbXTtcclxuXHJcbiAgICBmdW5jdGlvbiBiaW5kSW5mb1dpbmRvdyhtYXJrZXIsIG1hcCwgbG9jYXRpb24pIHtcclxuICAgICAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXIsICdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBjbG9zZShsb2NhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgbG9jYXRpb24uaWIuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uLmluZm9XaW5kb3dWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5pYiA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChsb2NhdGlvbi5pbmZvV2luZG93VmlzaWJsZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgY2xvc2UobG9jYXRpb24pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbWFya2Vyc0FycmF5LmZvckVhY2goZnVuY3Rpb24obG9jLCBpbmRleCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxvYy5pYiAmJiBsb2MuaWIgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2UobG9jKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgYm94VGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICAgICAgYm94VGV4dC5zdHlsZS5jc3NUZXh0ID0gJ2JhY2tncm91bmQ6ICNmZmY7JztcclxuICAgICAgICAgICAgICAgIGJveFRleHQuY2xhc3NMaXN0LmFkZCgnbWQtd2hpdGVmcmFtZS0yZHAnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBidWlsZFBpZWNlcyhsb2NhdGlvbiwgZWwsIHBhcnQsIGljb24pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobG9jYXRpb25bcGFydF0gPT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGxvY2F0aW9uLml3W3BhcnRdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaChlbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdwaG90byc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxvY2F0aW9uLnBob3RvKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwiaXctcGhvdG9cIiBzdHlsZT1cImJhY2tncm91bmQtaW1hZ2U6IHVybCgnICsgbG9jYXRpb24ucGhvdG8gKyAnKTtcIj48L2Rpdj4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnaXctdG9vbGJhcic6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwiaXctdG9vbGJhclwiPjxoMyBjbGFzcz1cIm1kLXN1YmhlYWRcIj4nICsgbG9jYXRpb24udGl0bGUgKyAnPC9oMz48L2Rpdj4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZGl2JzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2gocGFydCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2VtYWlsJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnPGRpdiBjbGFzcz1cIml3LWRldGFpbHNcIj48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCIgc3R5bGU9XCJjb2xvcjojNDI4NWY0O1wiPjxpbWcgc3JjPVwiLy9jZG4ubWFwa2l0LmlvL3YxL2ljb25zLycgKyBpY29uICsgJy5zdmdcIi8+PC9pPjxzcGFuPjxhIGhyZWY9XCJtYWlsdG86JyArIGxvY2F0aW9uLmVtYWlsICsgJ1wiIHRhcmdldD1cIl9ibGFua1wiPicgKyBsb2NhdGlvbi5lbWFpbCArICc8L2E+PC9zcGFuPjwvZGl2Pic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnd2ViJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnPGRpdiBjbGFzcz1cIml3LWRldGFpbHNcIj48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCIgc3R5bGU9XCJjb2xvcjojNDI4NWY0O1wiPjxpbWcgc3JjPVwiLy9jZG4ubWFwa2l0LmlvL3YxL2ljb25zLycgKyBpY29uICsgJy5zdmdcIi8+PC9pPjxzcGFuPjxhIGhyZWY9XCInICsgbG9jYXRpb24ud2ViICsgJ1wiIHRhcmdldD1cIl9ibGFua1wiPicgKyBsb2NhdGlvbi53ZWJfZm9ybWF0dGVkICsgJzwvYT48L3NwYW4+PC9kaXY+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdkZXNjJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnPGxhYmVsIGNsYXNzPVwiaXctZGVzY1wiIGZvcj1cImNiX2RldGFpbHNcIj48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCJjYl9kZXRhaWxzXCIvPjxoMyBjbGFzcz1cIml3LXgtZGV0YWlsc1wiPkRldGFpbHM8L2gzPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgdG9nZ2xlLW9wZW4tZGV0YWlsc1wiPjxpbWcgc3JjPVwiLy9jZG4ubWFwa2l0LmlvL3YxL2ljb25zLycgKyBpY29uICsgJy5zdmdcIi8+PC9pPjxwIGNsYXNzPVwiaXcteC1kZXRhaWxzXCI+JyArIGxvY2F0aW9uLmRlc2MgKyAnPC9wPjwvbGFiZWw+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwiaXctZGV0YWlsc1wiPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj48aW1nIHNyYz1cIi8vY2RuLm1hcGtpdC5pby92MS9pY29ucy8nICsgaWNvbiArICcuc3ZnXCIvPjwvaT48c3Bhbj4nICsgbG9jYXRpb25bcGFydF0gKyAnPC9zcGFuPjwvZGl2Pic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ29wZW5faG91cnMnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpdGVtcyA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsb2NhdGlvbi5vcGVuX2hvdXJzLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxvY2F0aW9uLm9wZW5faG91cnMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpICE9PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtcyArPSAnPGxpPjxzdHJvbmc+JyArIGxvY2F0aW9uLm9wZW5faG91cnNbaV0uZGF5ICsgJzwvc3Ryb25nPjxzdHJvbmc+JyArIGxvY2F0aW9uLm9wZW5faG91cnNbaV0uaG91cnMgKyc8L3N0cm9uZz48L2xpPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmlyc3QgPSAnPGxpPjxsYWJlbCBmb3I9XCJjYl9ob3Vyc1wiPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBpZD1cImNiX2hvdXJzXCIvPjxzdHJvbmc+JyArIGxvY2F0aW9uLm9wZW5faG91cnNbMF0uZGF5ICsgJzwvc3Ryb25nPjxzdHJvbmc+JyArIGxvY2F0aW9uLm9wZW5faG91cnNbMF0uaG91cnMgKyc8L3N0cm9uZz48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zIHRvZ2dsZS1vcGVuLWhvdXJzXCI+PGltZyBzcmM9XCIvL2Nkbi5tYXBraXQuaW8vdjEvaWNvbnMva2V5Ym9hcmRfYXJyb3dfZG93bi5zdmdcIi8+PC9pPjx1bD4nICsgaXRlbXMgKyAnPC91bD48L2xhYmVsPjwvbGk+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzxkaXYgY2xhc3M9XCJpdy1saXN0XCI+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29ucyBmaXJzdC1tYXRlcmlhbC1pY29uc1wiIHN0eWxlPVwiY29sb3I6IzQyODVmNDtcIj48aW1nIHNyYz1cIi8vY2RuLm1hcGtpdC5pby92MS9pY29ucy8nICsgaWNvbiArICcuc3ZnXCIvPjwvaT48dWw+JyArIGZpcnN0ICsgJzwvdWw+PC9kaXY+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGJveFRleHQuaW5uZXJIVE1MID0gXHJcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRQaWVjZXMobG9jYXRpb24sICdwaG90bycsICdwaG90bycsICcnKSArXHJcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRQaWVjZXMobG9jYXRpb24sICdpdy10b29sYmFyJywgJ3RpdGxlJywgJycpICtcclxuICAgICAgICAgICAgICAgICAgICBidWlsZFBpZWNlcyhsb2NhdGlvbiwgJ2RpdicsICdhZGRyZXNzJywgJ2xvY2F0aW9uX29uJykgK1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkUGllY2VzKGxvY2F0aW9uLCAnZGl2JywgJ3dlYicsICdwdWJsaWMnKSArXHJcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRQaWVjZXMobG9jYXRpb24sICdkaXYnLCAnZW1haWwnLCAnZW1haWwnKSArXHJcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRQaWVjZXMobG9jYXRpb24sICdkaXYnLCAndGVsJywgJ3Bob25lJykgK1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkUGllY2VzKGxvY2F0aW9uLCAnZGl2JywgJ2ludF90ZWwnLCAncGhvbmUnKSArXHJcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRQaWVjZXMobG9jYXRpb24sICdvcGVuX2hvdXJzJywgJ29wZW5faG91cnMnLCAnYWNjZXNzX3RpbWUnKSArXHJcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRQaWVjZXMobG9jYXRpb24sICdkaXYnLCAnZGVzYycsICdrZXlib2FyZF9hcnJvd19kb3duJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIG15T3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgICAgICBhbGlnbkJvdHRvbTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBib3hUZXh0LFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVBdXRvUGFuOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1heFdpZHRoOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIHBpeGVsT2Zmc2V0OiBuZXcgZ29vZ2xlLm1hcHMuU2l6ZSgtMTQwLCAtNDApLFxyXG4gICAgICAgICAgICAgICAgICAgIHpJbmRleDogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICBib3hTdHlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzI4MHB4J1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VCb3hNYXJnaW46ICcwcHggMHB4IDBweCAwcHgnLFxyXG4gICAgICAgICAgICAgICAgICAgIGluZm9Cb3hDbGVhcmFuY2U6IG5ldyBnb29nbGUubWFwcy5TaXplKDEsIDEpLFxyXG4gICAgICAgICAgICAgICAgICAgIGlzSGlkZGVuOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBwYW5lOiAnZmxvYXRQYW5lJyxcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVFdmVudFByb3BhZ2F0aW9uOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5pYiA9IG5ldyBJbmZvQm94KG15T3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5pYi5vcGVuKG1hcCwgbWFya2VyKTtcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uLmluZm9XaW5kb3dWaXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICAgICAgdmFyIG1hcE9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIGNlbnRlcjogbmV3IGdvb2dsZS5tYXBzLkxhdExuZyg1NS43NDgzNTgxMTI3MjAzNzUsNTIuMzU0MTc1ODg3NDk5OTgpLFxyXG4gICAgICAgICAgICB6b29tOiAxMyxcclxuICAgICAgICAgICAgZ2VzdHVyZUhhbmRsaW5nOiAnY29vcGVyYXRpdmUnLFxyXG4gICAgICAgICAgICBmdWxsc2NyZWVuQ29udHJvbDogZmFsc2UsXHJcbiAgICAgICAgICAgIHpvb21Db250cm9sOiB0cnVlLFxyXG4gICAgICAgICAgICBkaXNhYmxlRG91YmxlQ2xpY2tab29tOiB0cnVlLFxyXG4gICAgICAgICAgICBtYXBUeXBlQ29udHJvbDogdHJ1ZSxcclxuICAgICAgICAgICAgbWFwVHlwZUNvbnRyb2xPcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICBzdHlsZTogZ29vZ2xlLm1hcHMuTWFwVHlwZUNvbnRyb2xTdHlsZS5IT1JJWk9OVEFMX0JBUixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2NhbGVDb250cm9sOiBmYWxzZSxcclxuICAgICAgICAgICAgc2Nyb2xsd2hlZWw6IGZhbHNlLFxyXG4gICAgICAgICAgICBzdHJlZXRWaWV3Q29udHJvbDogZmFsc2UsXHJcbiAgICAgICAgICAgIGRyYWdnYWJsZSA6IHRydWUsXHJcbiAgICAgICAgICAgIGNsaWNrYWJsZUljb25zOiB0cnVlLFxyXG4gICAgICAgICAgICB6b29tQ29udHJvbE9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBnb29nbGUubWFwcy5Db250cm9sUG9zaXRpb24uUklHSFRfQ0VOVEVSXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG1hcFR5cGVDb250cm9sT3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IGdvb2dsZS5tYXBzLkNvbnRyb2xQb3NpdGlvbi5SSUdIVF9UT1BcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbWFwVHlwZUlkOiBnb29nbGUubWFwcy5NYXBUeXBlSWQuUk9BRE1BUCxcclxuICAgICAgICAgICAgc3R5bGVzOiBbe1wiZmVhdHVyZVR5cGVcIjpcIndhdGVyXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjNDZiY2VjXCJ9LHtcInZpc2liaWxpdHlcIjpcIm9uXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcImxhbmRzY2FwZVwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiI2YyZjJmMlwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJyb2FkXCIsXCJzdHlsZXJzXCI6W3tcInNhdHVyYXRpb25cIjotMTAwfSx7XCJsaWdodG5lc3NcIjo0NX1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicm9hZC5oaWdod2F5XCIsXCJzdHlsZXJzXCI6W3tcInZpc2liaWxpdHlcIjpcInNpbXBsaWZpZWRcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicm9hZC5hcnRlcmlhbFwiLFwiZWxlbWVudFR5cGVcIjpcImxhYmVscy5pY29uXCIsXCJzdHlsZXJzXCI6W3tcInZpc2liaWxpdHlcIjpcIm9mZlwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJhZG1pbmlzdHJhdGl2ZVwiLFwiZWxlbWVudFR5cGVcIjpcImxhYmVscy50ZXh0LmZpbGxcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiM0NDQ0NDRcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwidHJhbnNpdFwiLFwic3R5bGVyc1wiOlt7XCJ2aXNpYmlsaXR5XCI6XCJvZmZcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicG9pXCIsXCJzdHlsZXJzXCI6W3tcInZpc2liaWxpdHlcIjpcIm9mZlwifV19XVxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbWFwRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAnKTtcclxuICAgICAgICB2YXIgbWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChtYXBFbGVtZW50LCBtYXBPcHRpb25zKTtcclxuICAgICAgICB2YXIgbG9jYXRpb25zID0gW1xyXG4gICAgICAgICAgICB7XCJ0aXRsZVwiOlwiQU5EUkVXXCIsXCJ0ZWxcIjpcIis3KDk1MSk4OTYtNDItNDRcIixcImVtYWlsXCI6XCJrYXRhc2hpMTMyOEBtYWlsLnJ1XCIsXCJ3ZWJcIjpcImh0dHBzOi8vYW5kcmV3bGV5a2luLmdpdGh1Yi5pby9wb3J0Zm9saW8vYnVpbGQvXCIsXCJ3ZWJfZm9ybWF0dGVkXCI6XCJhbmRyZXdsZXlraW4uZ2l0aHViLmlvXCIsXCJsYXRcIjo1NS43MzQ3MDU3MDQ1OTI4MDUsXCJsbmdcIjo1Mi4zOTc1MTUwMjA3NjI2MjYsXCJ2aWNpbml0eVwiOlwiXCIsXCJtYXJrZXJcIjp7XCJmaWxsQ29sb3JcIjpcIiMwMEFDQzFcIixcImZpbGxPcGFjaXR5XCI6MSxcInN0cm9rZVdlaWdodFwiOjAsXCJzY2FsZVwiOjEuNSxcInBhdGhcIjpcIk0xMC4yLDcuNGMtNiwwLTEwLjksNC45LTEwLjksMTAuOWMwLDYsMTAuOSwxOC40LDEwLjksMTguNHMxMC45LTEyLjMsMTAuOS0xOC40QzIxLjIsMTIuMiwxNi4zLDcuNCwxMC4yLDcuNHogTTEwLjIsMjIuOWMtMi42LDAtNC42LTIuMS00LjYtNC42czIuMS00LjYsNC42LTQuNnM0LjYsMi4xLDQuNiw0LjZTMTIuOCwyMi45LDEwLjIsMjIuOXpcIixcImFuY2hvclwiOntcInhcIjoxMCxcInlcIjozMH0sXCJvcmlnaW5cIjp7XCJ4XCI6MCxcInlcIjowfSxcInN0eWxlXCI6MX0sXCJpd1wiOntcInRlbFwiOnRydWUsXCJ3ZWJcIjp0cnVlLFwiZW1haWxcIjp0cnVlfX1cclxuICAgICAgICBdO1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsb2NhdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XHJcbiAgICAgICAgICAgICAgICBpY29uOiBsb2NhdGlvbnNbaV0ubWFya2VyLFxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IG5ldyBnb29nbGUubWFwcy5MYXRMbmcobG9jYXRpb25zW2ldLmxhdCwgbG9jYXRpb25zW2ldLmxuZyksXHJcblxyXG4gICAgICAgICAgICAgICAgbWFwOiBtYXAsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogbG9jYXRpb25zW2ldLnRpdGxlLFxyXG4gICAgICAgICAgICAgICAgYWRkcmVzczogbG9jYXRpb25zW2ldLmFkZHJlc3MsXHJcbiAgICAgICAgICAgICAgICBkZXNjOiBsb2NhdGlvbnNbaV0uZGVzYyxcclxuICAgICAgICAgICAgICAgIHRlbDogbG9jYXRpb25zW2ldLnRlbCxcclxuICAgICAgICAgICAgICAgIGludF90ZWw6IGxvY2F0aW9uc1tpXS5pbnRfdGVsLFxyXG4gICAgICAgICAgICAgICAgdmljaW5pdHk6IGxvY2F0aW9uc1tpXS52aWNpbml0eSxcclxuICAgICAgICAgICAgICAgIG9wZW46IGxvY2F0aW9uc1tpXS5vcGVuLFxyXG4gICAgICAgICAgICAgICAgb3Blbl9ob3VyczogbG9jYXRpb25zW2ldLm9wZW5faG91cnMsXHJcbiAgICAgICAgICAgICAgICBwaG90bzogbG9jYXRpb25zW2ldLnBob3RvLFxyXG4gICAgICAgICAgICAgICAgdGltZTogbG9jYXRpb25zW2ldLnRpbWUsXHJcbiAgICAgICAgICAgICAgICBlbWFpbDogbG9jYXRpb25zW2ldLmVtYWlsLFxyXG4gICAgICAgICAgICAgICAgd2ViOiBsb2NhdGlvbnNbaV0ud2ViLFxyXG4gICAgICAgICAgICAgICAgaXc6IGxvY2F0aW9uc1tpXS5pd1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbWFya2Vyc0FycmF5LnB1c2gobWFya2VyKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChsb2NhdGlvbnNbaV0uaXcuZW5hYmxlID09PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgIGJpbmRJbmZvV2luZG93KG1hcmtlciwgbWFwLCBsb2NhdGlvbnNbaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG59KSgpOyBcclxuIiwiLy8ganMg0YTQsNC50Lsg0LTQu9GPINCw0L3QuNC80LDRhtC40Lgg0LrQvtC90YLRgNC+0LvRjCDQutC90L7Qv9C+0Log0LIg0YHQu9Cw0LnQtNC10YDQtVxyXG5cclxuXHJcbiQoZnVuY3Rpb24oKXtcclxuXHJcblx0Y29uc3QgYnRuUHJldiA9ICQoJy5zbGlkZXJfX3ByZXYnKTtcclxuXHRjb25zdCBidG5OZXh0ID0gJCgnLnNsaWRlcl9fbmV4dCcpO1xyXG5cdGNvbnN0IGR1cmF0aW9uID0gNTAwO1xyXG5cdGxldCBhY3RpdmUgPSAnc2xpZGVyLWNvbnRyb2xzX19pdGVtLWFjdGl2ZSc7XHJcblx0bGV0IGluUHJvZ3Jlc3MgPSBmYWxzZTtcclxuXHJcblx0Y29uc3QgbW92ZVNsaWRlc1ByZXYgPSAoY29udGFpbmVyLCBkaXJlY3Rpb24pID0+IHtcclxuXHRcdGxldCBpdGVtcyAgICAgICAgPSBjb250YWluZXIuZmluZCgnLnNsaWRlci1jb250cm9sc19faXRlbScpO1xyXG5cdFx0bGV0IGFjdGl2ZUl0ZW0gICA9IGl0ZW1zLmZpbHRlcignLnNsaWRlci1jb250cm9sc19faXRlbS1hY3RpdmUnKTtcclxuXHRcdGxldCBzdHJhZmVQZXJjICAgPSBkaXJlY3Rpb24gPT09ICdkb3duJyA/IDEwMCA6IC0xMDA7XHJcblx0XHRsZXQgY291bnRlciAgICAgID0gYWN0aXZlSXRlbS5pbmRleCgpO1xyXG5cclxuXHRcdGNvdW50ZXItLTtcclxuXHJcblx0XHRpZihjb3VudGVyIDwgMCkgY291bnRlciA9IGl0ZW1zLmxlbmd0aCAtIDE7XHJcblxyXG5cdFx0Y29uc3QgcmVxSXRlbSA9IGl0ZW1zLmVxKGNvdW50ZXIpO1xyXG5cclxuXHRcdGFjdGl2ZUl0ZW0uYW5pbWF0ZSh7XHJcblx0XHRcdCd0b3AnOiBgJHtzdHJhZmVQZXJjfSVgLFxyXG5cdFx0fSwgZHVyYXRpb24pXHJcblxyXG5cdFx0cmVxSXRlbS5hbmltYXRlKHtcclxuXHRcdFx0J3RvcCc6ICcwJyxcclxuXHRcdH0sIGR1cmF0aW9uLCBmdW5jdGlvbiAoKXtcclxuXHRcdFx0YWN0aXZlSXRlbS5yZW1vdmVDbGFzcyhhY3RpdmUpLmNzcygndG9wJywgYCR7LXN0cmFmZVBlcmN9JWApO1xyXG5cdFx0XHQkKHRoaXMpLmFkZENsYXNzKGFjdGl2ZSk7XHJcblxyXG5cdFx0XHRpblByb2dyZXNzID0gZmFsc2U7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGNvbnN0IG1vdmVTbGlkZXNOZXh0ID0gKGNvbnRhaW5lciwgZGlyZWN0aW9uKSA9PiB7XHJcblx0XHRsZXQgaXRlbXMgICAgICAgICA9IGNvbnRhaW5lci5maW5kKCcuc2xpZGVyLWNvbnRyb2xzX19pdGVtJyk7XHJcblx0XHRsZXQgYWN0aXZlSXRlbSAgICA9IGl0ZW1zLmZpbHRlcignLnNsaWRlci1jb250cm9sc19faXRlbS1hY3RpdmUnKTtcclxuXHRcdGxldCBzdHJhZmVQZXJjICAgID0gZGlyZWN0aW9uID09PSAnZG93bicgPyAxMDAgOiAtMTAwO1xyXG5cdFx0bGV0IGNvdW50ZXIgICAgICAgPSBhY3RpdmVJdGVtLmluZGV4KCk7XHJcblxyXG5cdFx0Y291bnRlcisrO1xyXG5cclxuXHRcdGlmIChjb3VudGVyID49IGl0ZW1zLmxlbmd0aCkgY291bnRlciA9IDA7XHJcblxyXG5cdFx0Y29uc3QgcmVxSXRlbSA9IGl0ZW1zLmVxKGNvdW50ZXIpO1xyXG5cclxuXHRcdGFjdGl2ZUl0ZW0uYW5pbWF0ZSh7XHJcblx0XHRcdCd0b3AnOiBgJHtzdHJhZmVQZXJjfSVgXHJcblx0XHR9LCBkdXJhdGlvbilcclxuXHJcblx0XHRyZXFJdGVtLmFuaW1hdGUoe1xyXG5cdFx0XHR0b3A6IDBcclxuXHRcdH0sIGR1cmF0aW9uLCBmdW5jdGlvbiAoKXtcclxuXHRcdFx0YWN0aXZlSXRlbS5yZW1vdmVDbGFzcyhhY3RpdmUpLmNzcygndG9wJywgYCR7LXN0cmFmZVBlcmN9JWApO1xyXG5cdFx0XHQkKHRoaXMpLmFkZENsYXNzKGFjdGl2ZSk7XHJcblxyXG5cdFx0XHRpblByb2dyZXNzID0gZmFsc2U7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGJ0blByZXYub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHJcblx0XHRpZiAoaW5Qcm9ncmVzcykgcmV0dXJuO1xyXG5cdFx0aW5Qcm9ncmVzcyA9IHRydWU7XHJcblxyXG5cdFx0bW92ZVNsaWRlc1ByZXYoYnRuUHJldiwgJ2Rvd24nKTtcclxuXHRcdG1vdmVTbGlkZXNQcmV2KGJ0bk5leHQsICd1cCcpO1xyXG5cdH0pO1xyXG5cclxuXHRidG5OZXh0Lm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblxyXG5cdFx0aWYgKGluUHJvZ3Jlc3MpIHJldHVybjtcclxuXHRcdGluUHJvZ3Jlc3MgPSB0cnVlO1xyXG5cclxuXHRcdG1vdmVTbGlkZXNOZXh0KGJ0blByZXYsICdkb3duJyk7XHJcblx0XHRtb3ZlU2xpZGVzTmV4dChidG5OZXh0LCAndXAnKTtcclxuXHR9KTtcclxuXHJcbn0pOyIsIi8vIGpzINGE0LDQudC7INC00LvRjyDQsNC90LjQvNCw0YbQuNC4INCz0LvQsNCy0L3QvtCz0L4g0LTQuNGB0L/Qu9C10Y9cclxuXHJcblxyXG4kKGZ1bmN0aW9uKCl7XHJcblxyXG5cdGNvbnN0IGJ0blByZXYgPSAkKCcuc2xpZGVyX19wcmV2Jyk7XHJcblx0Y29uc3QgYnRuTmV4dCA9ICQoJy5zbGlkZXJfX25leHQnKTtcclxuXHJcblxyXG5cdGNvbnN0IHNsaWRlclNob3cgPSBmdW5jdGlvbihjb250YWluZXIpIHtcclxuXHRcdGxldCBkaXNwbGF5ID0gY29udGFpbmVyLmNsb3Nlc3QoJy5zbGlkZXItcmlnaHQnKS5maW5kKCcuc2xpZGVyX19kaXNwbGF5LWltZycpLFxyXG5cdFx0XHRwYXRoID0gY29udGFpbmVyLmZpbmQoJy5zbGlkZXItY29udHJvbHNfX2l0ZW0tYWN0aXZlJykuY2hpbGRyZW4oJy5zbGlkZXItY29udHJvbHNfX2ltZycpLmF0dHIoJ3NyYycpLFxyXG5cdFx0XHRmYWRlZE91dCA9ICQuRGVmZXJyZWQoKSxcclxuXHRcdFx0bG9hZGVkID0gJC5EZWZlcnJlZCgpO1xyXG5cclxuXHRkaXNwbGF5LmZhZGVPdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0ZmFkZWRPdXQucmVzb2x2ZSgpO1xyXG5cdH0pO1xyXG5cclxuXHRmYWRlZE91dC5kb25lKCgpID0+IHtcclxuXHRcdGRpc3BsYXkuYXR0cignc3JjJywgcGF0aCkub24oJ2xvYWQnLCAoKSA9PiB7XHJcblx0XHRcdGxvYWRlZC5yZXNvbHZlKCk7XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0bG9hZGVkLmRvbmUoKCkgPT4ge1xyXG5cdFx0ZGlzcGxheS5mYWRlSW4oNTAwKTtcclxuXHR9KTtcclxuXHJcbn1cclxuXHJcblx0YnRuUHJldi5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0c2xpZGVyU2hvdyhidG5QcmV2KTtcclxuXHJcblx0fSk7XHJcblxyXG5cdGJ0bk5leHQub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdHNsaWRlclNob3coYnRuTmV4dCk7XHJcblxyXG5cdH0pO1xyXG5cclxufSk7IiwiLy8g0JHQuNCx0LvQuNC+0YLQtdC60LAgc3ZnNGV2ZXJ5Ym9keSDQtNC70Y8gc3ZnXHJcblxyXG4kKGZ1bmN0aW9uKCl7XHJcblx0c3ZnNGV2ZXJ5Ym9keSgpO1xyXG59KSJdfQ==
