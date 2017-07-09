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
// js файл для анимации главного дисплея
// Библиотека svg4everybody для svg

$(function(){
	svg4everybody();
})
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lbnUuanMiLCJwYXJhbGxheC5qcyIsInByZWxvYWRlci5qcyIsInZhbGlkYXRlLmpzIiwic2Nyb2xsLmpzIiwiaW5kZXgtcGFyYWxsYXguanMiLCJmbGlwLmpzIiwiZmxpcF9fc2hvdy5qcyIsInN0aWNreS1zaWRlYmFyLmpzIiwibmF2LXNpZGViYXIuanMiLCJzaWRlYmFyX19zaG93LmpzIiwiY2lyY2xlLWFuaW1hdGUuanMiLCJtYXAuanMiLCJzbGlkZXJfX2NvbnRyb2xzLmpzIiwic2xpZGVyX19kaXNwbGF5LmpzIiwic3ZnNGV2ZXJ5Ym9keS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlDQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8ganMg0LTQu9GPINC80LXQvdGOXHJcblxyXG4oZnVuY3Rpb24oKSB7XHJcbiAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAvLyDQn9C10YDQtdC80LXQvdC90YvQtVxyXG4gIHZhciBsaW5rID0gJCgnLmhlYWRlcl9fbWVudScpLFxyXG4gICAgICBsaW5rX19hY3RpdmU9ICdoZWFkZXJfX21lbnVfX2FjdGl2ZScsXHJcbiAgICAgIGxpc3QgPSAkKCcubWFpbi1tZW51X19saXN0JyksXHJcbiAgICAgIGJnID0gJCgnLm1haW4tbWVudScpLFxyXG4gICAgICBzb2NpYWwgPSAkKCcuaGVhZGVyX19zb2NpYWwnKSxcclxuICAgICAgYW5pbWF0ZSA9ICdtYWluLW1lbnVfX2FuaW1hdGUnO1xyXG5cclxuICAgIC8vINC/0YDQvtC80LjRgSDQutC+0YLQvtGA0YvQuSDQsdGD0LTQtdGCINC/0YDQvtCy0LXRgNGP0YLRjCDQvdCw0LvQuNGH0LjQtSDRgdGB0YvQu9C60Lgo0LPQsNC80LHRg9GA0LPQtdGA0LApXHJcbiAgICB2YXIgbWVudVByb21pc2UgPSBuZXcgUHJvbWlzZSAoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgIGlmIChsaW5rLmxlbmd0aCkge1xyXG4gICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZWplY3QoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8g0YTRg9C90LrRhtC40Y8g0L/RgNC4INC90LDQu9C40YfQuNC4INGB0YHRi9C70LrQuCjQs9Cw0LzQsdGD0YDQs9C10YDQsClcclxuICAgIG1lbnVQcm9taXNlLnRoZW4oZnVuY3Rpb24oKXtcclxuICAgICAgbGluay5vbignY2xpY2snLCBjbGlja0Z1bmN0aW9uKTtcclxuICAgIH0pLmNhdGNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgIHJldHVybiA7XHJcbiAgICB9KTtcclxuXHJcblxyXG5cclxuICAvLyDQpNGD0L3QutGG0LjRjyDQv9GA0Lgg0L3QsNC20LDRgtC40Lgg0L3QsCDQvNC10L3Rji3RiNCw0LzQsdGD0YDQs9C10YBcclxuICB2YXIgY2xpY2tGdW5jdGlvbiA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgXHRlLnByZXZlbnREZWZhdWx0KCk7IC8vINC+0YLQvNC10L3QsCDRgdGC0LDQvdC00LDRgNGC0L3Ri9GFINC00LXQudGB0LLRgtC50LhcclxuXHJcbiAgXHQkKHRoaXMpLnRvZ2dsZUNsYXNzKGxpbmtfX2FjdGl2ZSk7IC8vINC40LfQvNC10L3Rj9C10Lwg0L3QsCDQsNC60YLQuNCy0L3QvtC1INGB0L7RgdGC0L7Rj9C90LjQtVxyXG5cclxuICBcdC8vINCV0YHQu9C4INC60L3QvtC/0LrQsCDQsNC60YLQuNCy0L3QsCDRgtC+XHJcbiAgXHRpZihsaW5rLmhhc0NsYXNzKGxpbmtfX2FjdGl2ZSkpIHtcclxuICBcdFx0YmcuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJykuYWRkQ2xhc3MoYW5pbWF0ZSk7IC8vINC+0YLQvtCx0YDQsNC30LjRgtGMINC80LXQvdGOLCDQuCDQtNC+0LHQsNCy0LjRgtGMINC60LvQsNGB0YEg0LDQvdC40LzQsNGG0LjQuFxyXG4gIFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgXHRcdFx0c29jaWFsLmNzcygnb3BhY2l0eScsICcwJyk7IC8vINGH0LXRgNC10LcgMjAwINC80LjQu9C40YHQtdC60YPQvdC0INGB0LrRgNGL0YLRjCDQuNC60L7QvdC60LhcclxuICBcdFx0fSwyMDApO1xyXG4gICAgXHQvLyDRh9C10YDQtdC3IDcwMCDQvNC40LvQuNGB0LXQutGD0L3QtCDQvtGC0L7QsdGA0LDQttCw0YLRjCDRgdC/0LjRgdC+0Log0LzQtdC90Y5cclxuICAgIFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgXHRcdGxpc3QuY3NzKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlWSgwKScpO1xyXG4gICAgXHR9LDgwMCk7XHJcbiAgICB9IGVsc2UgeyAvLyDQldGB0LvQuCDQutC90L7Qv9C60LAg0L3QtSDQsNC60YLQuNCy0L3QsFxyXG4gICAgICBiZy5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpLnJlbW92ZUNsYXNzKGFuaW1hdGUpOyAvLyDRgdC60YDRi9GC0Ywg0LzQtdC90Y4sINGD0LTQsNC70LjRgtGMINC60LvQsNGB0YEg0LDQvdC40LzQsNGG0LjQuFxyXG4gICAgICBzb2NpYWwuY3NzKCdvcGFjaXR5JywgJzEnKSAvLyDQvtGC0L7QsdGA0LDQt9C40YLRjCDQuNC60L7QvdC60LhcclxuICAgICAgbGlzdC5jc3MoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGVZKC0xMDAlKScpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgfTtcclxufSkoKTsiLCIvLyBqcyDQtNC70Y8g0L/QsNGA0LDQu9C70LDQutGBINGN0YTRhNC10LrRgtCwLCDQvdCwINGE0L7QvdC1INCz0L7RgFxyXG4ndXNlIHNjdHJpY3QnO1xyXG5cclxuJChmdW5jdGlvbigpe1xyXG5cdC8vINC30LDQtNCw0ZHQvCDQvtCx0YnRg9GOINC/0LXRgNC10LzQtdC90L3Rg9GOXHJcblx0dmFyIHN2Z1RleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanNfX2hlYWRlci10ZXh0Jyk7XHJcblxyXG5cdC8vINC/0YDQvtC80LjRgSDQutC+0YLQvtGA0YvQuSDQsdGD0LTQtdGCINC/0YDQvtCy0LXRgNGP0YLRjCDQvdCw0LvQuNGH0LjQtSBzdmdUZXh0INCyIHBhZ2UtaGVhZGVyXHJcblx0dmFyIHBhcmFsbGF4UHJvbWlzZSA9IG5ldyBQcm9taXNlIChmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHRcdFx0aWYgKHN2Z1RleHQpIHtcclxuXHRcdFx0XHRyZXNvbHZlKCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHJcblxyXG5cdC8vINGE0YPQvdC60YbQuNGPINC00LvRjyBwYXJhbGxheCDQv9GA0Lgg0YHQutGA0L7Qu9C1XHJcblx0dmFyIHBhcmFsbGF4ID0gKGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBpbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFnZS1oZWFkZXJfX2ltZycpO1xyXG5cdFx0dmFyIHVzZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudXNlci1ibG9ja19fdG9wJyk7XHJcblxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0bW92ZTogZnVuY3Rpb24oYmxvY2ssIHdpbmRvd1Njcm9sbCwgc3RyYWZlQW1vdW50KSB7XHJcblx0XHRcdFx0dmFyIHN0cmFmZSA9IHdpbmRvd1Njcm9sbCAvIC1zdHJhZmVBbW91bnQgKyAnJSc7XHJcblx0XHRcdFx0dmFyIHRyYW5zZm9ybVN0cmluZyA9ICd0cmFuc2xhdGUzZCgwLCcgKyBzdHJhZmUgKyAnLDApJztcclxuXHJcblx0XHRcdFx0YmxvY2suc3R5bGUudHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRpbml0OiBmdW5jdGlvbiAod1Njcm9sbCkge1xyXG5cdFx0XHRcdHRoaXMubW92ZShpbWcsIHdTY3JvbGwsIDQ1KTtcclxuXHRcdFx0XHR0aGlzLm1vdmUoc3ZnVGV4dCwgd1Njcm9sbCwgMzApO1xyXG5cdFx0XHRcdHRoaXMubW92ZSh1c2VyLCB3U2Nyb2xsLCAxMCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9KCkpO1xyXG5cdHdpbmRvdy5vbnNjcm9sbCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciB3U2Nyb2xsID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xyXG5cdFx0aWYgKHN2Z1RleHQpIHtcclxuXHRcdFx0XHRwYXJhbGxheC5pbml0KHdTY3JvbGwpO1xyXG5cdFx0XHR9XHJcblx0XHQvLyDRhNGD0L3QutGG0LjRjyDQv9GA0Lgg0L3QsNC70LjRh9C40Lggc3ZnVGV4dCDQsiBwYWdlLWhlYWRlclxyXG5cdFx0Ly8gcGFyYWxsYXhQcm9taXNlLnRoZW4oZnVuY3Rpb24oKXtcclxuXHRcdC8vIFx0cGFyYWxsYXguaW5pdCh3U2Nyb2xsKTtcclxuXHRcdC8vIH0pO1xyXG5cdH1cclxufSlcclxuXHJcbiIsIi8vIGpzINGE0LDQudC7INC00LvRjyDQv9GA0LXQu9C+0LDQtNC10YDQsCDQvdCwINC70Y7QsdGL0YUg0YHRgtGA0LDQvdC40YbQsNGFXHJcblxyXG5cclxuXHQvLyDQt9Cw0LTQsNGR0Lwg0L/QtdGA0LXQvNC10L3QvdGL0LVcclxuXHR2YXIgaW1hZ2VzID0gJCgnaW1nJyksXHJcblx0XHRpbWFnZXNUb3RhbENvdW50ID0gaW1hZ2VzLmxlbmd0aCxcclxuXHRcdGltYWdlc0xvYWRlZENvdW50ID0gMCxcclxuXHRcdHBlcmNEaXNwbGF5ID0gJCgnLnByZWxvYWRlcl9fcGVyY2VudCcpLFxyXG5cdFx0cHJlbG9hZGVyID0gJCgnLnByZWxvYWRlcicpLFxyXG5cdFx0cm91bmRzID0gJCgnLnByZWxvYWRlcl9fcm91bmRzJyksXHJcblx0XHRzdHJva2VHbG9iYWwgPSA0NTAsXHJcblx0XHRzdHJva2VTdGFydCA9IDQ1MCxcclxuXHRcdHN0cm9rZURhc2hvZmZzZXQ7XHJcblxyXG5cdC8vINC/0YDQvtC80LjRgSDQutC+0YLQvtGA0YvQuSDQsdGD0LTQtdGCINC/0YDQvtCy0LXRgNGP0YLRjCDQvdCw0LvQuNGH0LjQtSDQv9GA0LXQu9C+0LDQtNC10YDQsCDQvdCwINGB0YLRgNCw0L3QuNGG0LVcclxuXHR2YXIgcHJlbG9hZGVyUHJvbWlzZSA9IG5ldyBQcm9taXNlIChmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHRcdFx0aWYgKHByZWxvYWRlci5sZW5ndGgpIHtcclxuXHRcdFx0XHRyZXNvbHZlKCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmVqZWN0KCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHQvLyDRhNGD0L3QutGG0LjRjyDQv9GA0Lgg0L3QsNC70LjRh9C40Lgg0L/RgNC10LvQvtCw0LTQtdGA0LAg0L3QsCDRgdGC0YDQsNC90LjRhtC1XHJcblx0cHJlbG9hZGVyUHJvbWlzZS50aGVuKGZ1bmN0aW9uKCl7XHJcblxyXG5cdFx0Ly8g0YbQuNC60Lsg0LTQu9GPINC/0LXRgNC10LHQuNGA0LDQvdC40Y8g0LLRgdC10YUg0LrQsNGA0YLQuNC90L7QulxyXG5cdFx0Zm9yICh2YXIgaT0wOyBpIDwgaW1hZ2VzVG90YWxDb3VudDsgaSsrKSB7XHJcblx0XHRcdGltYWdlQ2xvbmUgPSBuZXcgSW1hZ2UoKTtcclxuXHRcdFx0aW1hZ2VDbG9uZS5vbmxvYWQgPSBpbWFnZUxvYWRlZDtcclxuXHRcdFx0aW1hZ2VDbG9uZS5vbmVycm9yID0gaW1hZ2VMb2FkZWQ7XHJcblx0XHRcdGltYWdlQ2xvbmUuc3JjID0gaW1hZ2VzW2ldLnNyYztcclxuXHRcdH1cclxuXHJcblx0XHQvLyDRhNGD0L3QutGG0LjRjyDQtNC70Y8g0L/RgNC+0LLQtdGA0LrQuCDQt9Cw0LPRgNGD0LfQutC4INCy0YHQtdGFINC60LDRgNGC0LjQvdC+0LpcclxuXHRcdGZ1bmN0aW9uIGltYWdlTG9hZGVkKCkge1xyXG5cclxuXHRcdFx0Ly8g0YPQstC10LvQuNGH0LjQstCw0LXQvCDRh9C40YHQu9C+INC30LDQs9GA0YPQttC10L3QvdGL0YUg0LrQsNGA0YLQuNC90L7QulxyXG5cdFx0XHRpbWFnZXNMb2FkZWRDb3VudCsrO1xyXG5cclxuXHRcdFx0Ly8g0YHRh9C40YLQsNC10Lwg0L/RgNC+0YbQtdC90YIg0LfQsNCz0YDRg9C20LXQvdC90YvRhVxyXG5cdFx0XHR2YXIgcGVyYyA9IE1hdGgucm91bmQoKCgxMDAgLyBpbWFnZXNUb3RhbENvdW50KSAqIGltYWdlc0xvYWRlZENvdW50KSkgKyAnJSc7XHJcblx0XHRcdFxyXG5cdFx0XHQvLyDQstGL0LLQvtC00LjQvCDQvdCw0YjQtSDQt9C90LDRh9C10L3QuNC1INC/0YDQvtGG0LXQvdGC0L3QvtC1XHJcblx0XHRcdHBlcmNEaXNwbGF5Lmh0bWwocGVyYyk7XHJcblxyXG5cdFx0XHQvLyDRgdGH0LjRgtCw0LXQvCDQvtGC0L3QvtGB0LjRgtC10LvRjNC90L7QtSDQt9Cw0LrRgNCw0YHQutGDINC+0LHQstC+0LTQutC4INC60YDRg9Cz0LBcclxuXHRcdFx0c3Ryb2tlRGFzaG9mZnNldCA9IHN0cm9rZVN0YXJ0IC0gTWF0aC5yb3VuZCgoc3Ryb2tlR2xvYmFsIC8gaW1hZ2VzVG90YWxDb3VudCkpO1xyXG5cclxuXHRcdFx0Ly8g0LLRi9GH0LjRgtCw0LXQvCDRgdGC0LDRgNGC0L7QstGL0Lkg0L7RgtGH0ZHRglxyXG5cdFx0XHRzdHJva2VTdGFydCAtPSAoc3Ryb2tlR2xvYmFsIC8gaW1hZ2VzVG90YWxDb3VudCk7XHJcblxyXG5cdFx0XHQvLyDQv9GA0LjRgdCy0LDQuNCy0LDQtdC8INGC0L4g0YfRgtC+INC/0L7RgdGH0LjRgtCw0LvQuCwg0L3QsNGI0LXQvNGDINC60YDRg9Cz0YMg0YHQstCzXHJcblx0XHRcdHJvdW5kcy5jc3MoJ3N0cm9rZURhc2hvZmZzZXQnLCBzdHJva2VEYXNob2Zmc2V0KTtcclxuXHJcblx0XHRcdC8vINCV0YHQu9C4INCy0YHQtSDQutCw0YDRgtC40L3QutC4INC30LDQs9GA0YPQttC10L3QvdGLLCDRg9Cx0YDQsNGC0Ywg0LHQu9C+0Log0L/RgNC10LvQvtCw0LTQtdGAXHJcblx0XHRcdGlmKGltYWdlc0xvYWRlZENvdW50ID49IGltYWdlc1RvdGFsQ291bnQpIHtcclxuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRpZighcHJlbG9hZGVyLmhhc0NsYXNzKCdkb25lJykpe1xyXG5cdFx0XHRcdFx0XHRwcmVsb2FkZXIuYWRkQ2xhc3MoJ2RvbmUnKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LCAxMDAwKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZihwcmVsb2FkZXIuaGFzQ2xhc3MoJ2RvbmUnKSkge1xyXG5cdFx0XHRcdCQoJy5mbGlwJykuYWRkQ2xhc3MoJ2ZsaXBfX2FuaW1hdGlvbicpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSkuY2F0Y2goZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiA7XHJcblx0XHR9KTtcclxuXHJcblxyXG5cclxuIiwiLy8ganMg0YTQsNC50Lsg0LTQu9GPINCy0LDQu9C40LTQsNGG0LjQuCDRhNC+0YDQvFxyXG5cclxuXHJcbihmdW5jdGlvbiggJCApe1xyXG5cclxuXHJcblx0JChmdW5jdGlvbigpe1xyXG5cclxuXHRcdC8vINC30LDQtNCw0LXQvCDQv9C10YDQtdC80LXQvdC90YvQtVxyXG5cdFx0dmFyIGZvcm0gICAgICAgPSAkKCcuanNfX2Zvcm0nKSxcclxuXHRcdFx0XHRpbnB1dCAgICAgID0gZm9ybS5maW5kKCcuanNfX2lucHV0JyksXHJcblx0XHRcdFx0YnRuICAgICAgICA9IGZvcm0uZmluZCgnLmpzX19mb3JtLWJ0bicpLFxyXG5cdFx0XHRcdGJ0blJlc2V0ICAgPSBmb3JtLmZpbmQoJy5qc19fZm9ybS1idG4tLXJlc2V0JyksXHJcblx0XHRcdFx0aWNvbiAgICAgICA9IGZvcm0uZmluZCgnLmpzX19mb3JtLWljb24nKSxcclxuXHRcdFx0XHRjaGVjayAgICAgID0gZm9ybS5maW5kKCcuanNfX2NoZWNrJyksXHJcblx0XHRcdFx0ZW1haWwgICAgICA9IGZvcm0uZmluZCgnLmpzX19mb3JtLWVtYWlsJyksXHJcblx0XHRcdFx0cGF0dGVybiAgICA9IC9eW2EtejAtOV8tXStAW2EtejAtOS1dK1xcLlthLXpdezIsNn0kL2ksXHJcblx0XHRcdFx0dmFsaWQgICAgICA9IHRydWUsXHJcblx0XHRcdFx0aW5wdXRFcnJvciA9ICdmb3JtX19pbnB1dC0tZXJyb3InLFxyXG5cdFx0XHRcdGlucHV0U3VjY2VzcyA9ICdmb3JtX19pbnB1dC0tc3VjY2VzcycsXHJcblx0XHRcdFx0aWNvbkVycm9yICAgID0gJ2Zvcm1fX2ljb24tLWVycm9yJyxcclxuXHRcdFx0XHRpY29uU3VjY2VzcyAgPSAnZm9ybV9faWNvbi0tc3VjY2Vzcyc7XHJcblxyXG5cdFx0Ly8g0YTRg9C90LrRhtC40Y8g0LLQsNC70LjQtNCw0YbQuNGPINGE0L7RgNC80YtcclxuXHRcdHZhciB2YWxpZEZ1bmMgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0XHQvLyDQv9GA0L7QstC10YDRj9C10Lwg0LrQsNC20LTRi9C5IGlucHV0XHJcblx0XHRcdGlucHV0LmVhY2goZnVuY3Rpb24oaSkge1xyXG5cclxuXHRcdFx0XHQvLyDQv9GA0L7QstC10YDRj9C10Lwg0YPRgdC70L7QstC40LUsINC10YHRgtGMINC70Lgg0LIg0L/QvtC70LUg0YfRgtC+LdC90LjQtNGMXHJcblx0XHRcdFx0aWYoJCh0aGlzKS52YWwoKSAhPSAnJykge1xyXG5cdFx0XHRcdFx0JCh0aGlzKS5hZGRDbGFzcyhpbnB1dFN1Y2Nlc3MpOyBcclxuXHRcdFx0XHRcdGljb24uZXEoaSkuYWRkQ2xhc3MoaWNvblN1Y2Nlc3MpO1xyXG5cdFx0XHRcdFx0YnRuLnJlbW92ZUNsYXNzKCdqc19fZm9ybS1uby1zdWJtaXQnKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0JCh0aGlzKS5hZGRDbGFzcyhpbnB1dEVycm9yKTtcclxuXHRcdFx0XHRcdGljb24uZXEoaSkuYWRkQ2xhc3MoaWNvbkVycm9yKTtcclxuXHRcdFx0XHRcdGJ0bi5hZGRDbGFzcygnanNfX2Zvcm0tbm8tc3VibWl0Jyk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0fSk7IC8vIC0tPiDQt9Cw0LrQsNC90YfQuNCy0LDQtdC8INC/0YDQvtCy0LXRgNGP0YLRjCDQuNC90L/Rg9GC0YtcclxuXHJcblxyXG5cdFx0XHQvLyDRg9GB0LvQvtCy0LjRjyDQvdCw0LvQuNGH0LjRjyDRh9C10Lot0LjQvdC/0YPRgtC+0LJcclxuXHRcdFx0aWYoY2hlY2spIHtcclxuXHJcblx0XHRcdFx0Ly8g0L/RgNC+0LLQtdGA0Y/QtdC8INC60LDQttC00YvQuSDRh9C10Lot0LjQvdC/0YPRglxyXG5cdFx0XHRcdGNoZWNrLmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0XHRcdFx0Ly8g0L/RgNC+0LLQtdGA0Y/QtdC8INGD0YHQu9C+0LLQuNC1LCDQstGL0LHRgNCw0L0g0LvQuCDQuNC90L/Rg9GCXHJcblx0XHRcdFx0XHRpZigkKHRoaXMpLnByb3AoXCJjaGVja2VkXCIpKXtcclxuXHRcdFx0XHRcdFx0dmFsaWQgPSB0cnVlO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0dmFsaWQgPSBmYWxzZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHJldHVybiB2YWxpZDtcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0cmV0dXJuIHZhbGlkO1xyXG5cdFx0XHR9XHJcblxyXG5cclxuXHRcdFx0cmV0dXJuIHZhbGlkO1xyXG5cdFx0fSAvLyAtLT4gdmFsaWRGdW5jIGlzIGVuZFxyXG5cclxuXHJcblx0XHQvLyDRhNGD0L3QutGG0LjRjyDQtNC70Y8g0L/RgNC+0LLQtdGA0LrQuCBlbWFpbFxyXG5cdFx0dmFyIGVtYWlsRnVuYz0gZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdFx0Ly8g0L/RgNC+0LLQtdGA0Y/QtdC8INGD0YHQu9C+0LLQuNC1LCDQtdGB0YLRjCDQu9C4INGH0YLQvi3QvdC40LTRjCDQsiDQvdGR0LxcclxuXHRcdFx0aWYgKGVtYWlsLnZhbCgpICE9ICcnKSB7XHJcblxyXG5cdFx0XHRcdFx0Ly8g0L/RgNC+0LLQtdGA0Y/QtdC8LCDRgdC+0L7RgtCy0LXRgtGB0YLQstGD0LXRgiDQu9C4INGI0LDQsdC70L7QvdGDIGVtYWlsXHJcblx0XHRcdFx0XHRpZihlbWFpbC52YWwoKS5zZWFyY2gocGF0dGVybikgPT0gMCl7XHJcblx0XHRcdFx0XHRcdGVtYWlsLmFkZENsYXNzKGlucHV0U3VjY2Vzcyk7XHJcblx0XHRcdFx0XHRcdHZhbGlkID0gdHJ1ZTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdGVtYWlsLmFkZENsYXNzKGlucHV0RXJyb3IpO1xyXG5cdFx0XHRcdFx0XHR2YWxpZCA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRlbWFpbC5hZGRDbGFzcyhpbnB1dEVycm9yKTtcclxuXHRcdFx0XHRcdHZhbGlkID0gZmFsc2VcclxuXHRcdFx0XHR9XHJcblxyXG5cclxuXHRcdFx0cmV0dXJuIHZhbGlkO1xyXG5cdFx0fSAvLyAtLT4gZW1haWxGdW5jIGlzIGVuZFxyXG5cclxuXHJcblx0XHQvLyDRhNGD0L3QutGG0LjRjyDQtNC70Y8gZW1haWwsINC60L7Qs9C00LAg0L/QvtC60LjQtNCw0YjRjCDQuNC90L/Rg9GCXHJcblx0XHRlbWFpbC5ibHVyKGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0Ly8g0L/RgNC+0LLQtdGA0Y/QtdC8IGVtYWlsLCDQvdCwINC90LDQu9C40YfQuNC1INGH0LXQs9C+LdC90LjQtNGMXHJcblx0XHRcdGlmIChlbWFpbC52YWwoKSAhPSAnJykge1xyXG5cclxuXHRcdFx0XHQvLyDRgdC+0L7RgtCy0LXRgtGB0YLQstGD0LXRgiDQu9C4INC90LDRiNC10LzRgyDRiNCw0LHQu9C+0L3Rg1xyXG5cdFx0XHRcdGlmKGVtYWlsLnZhbCgpLnNlYXJjaChwYXR0ZXJuKSA9PSAwKXtcclxuXHRcdFx0XHRcdGVtYWlsLmFkZENsYXNzKGlucHV0U3VjY2Vzcyk7XHJcblx0XHRcdFx0XHR2YWxpZCA9IHRydWU7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGVtYWlsLmFkZENsYXNzKGlucHV0RXJyb3IpO1xyXG5cdFx0XHRcdFx0dmFsaWQgPSBmYWxzZVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRlbWFpbC5hZGRDbGFzcyhpbnB1dEVycm9yKTtcclxuXHRcdFx0XHR2YWxpZCA9IGZhbHNlXHJcblx0XHRcdH1cclxuXHJcblx0XHR9KTtcclxuXHJcblxyXG5cdFx0Ly8g0L/RgNC+0LLQtdGA0Y/QtdC8INC60LDQttC00YvQuSDQuNC90L/Rg9GCXHJcblx0XHRpbnB1dC5lYWNoKGZ1bmN0aW9uKGkpIHtcclxuXHJcblx0XHRcdC8vINC00LvRjyDQutCw0LbQtNC+0LPQviDQuNC90L/Rg9GC0LAg0L/RgNC4INC/0L7QutC40LTQsNC90LjQuCDQv9C+0LvRj1xyXG5cdFx0XHQkKHRoaXMpLmJsdXIoZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0XHRcdC8vINC/0YDQvtCy0LXRgNGP0LXQvCDQvdCw0LvQuNGH0LjQtSDRh9C10LPQvi3Qu9C40LHQvlxyXG5cdFx0XHRcdGlmKCQodGhpcykudmFsKCkgIT0gJycpIHtcclxuXHRcdFx0XHRcdCQodGhpcykuYWRkQ2xhc3MoaW5wdXRTdWNjZXNzKTtcclxuXHRcdFx0XHRcdGljb24uZXEoaSkuYWRkQ2xhc3MoaWNvblN1Y2Nlc3MpO1xyXG5cdFx0XHRcdFx0YnRuLnJlbW92ZUNsYXNzKCdqc19fZm9ybS1uby1zdWJtaXQnKVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQkKHRoaXMpLmFkZENsYXNzKGlucHV0RXJyb3IpO1xyXG5cdFx0XHRcdFx0aWNvbi5lcShpKS5hZGRDbGFzcyhpY29uRXJyb3IpO1xyXG5cdFx0XHRcdFx0YnRuLmFkZENsYXNzKCdqc19fZm9ybS1uby1zdWJtaXQnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdH0pO1xyXG5cclxuXHJcblx0XHQvLyDQv9GA0Lgg0LrQu9C40LrQtSDQvdCwINC60L3QvtC/0LrRgyDQvtGC0L/RgNCw0LLQutC4XHJcblx0XHRidG4uY2xpY2soZnVuY3Rpb24oZSkge1xyXG5cclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR2YWxpZEZ1bmMoKTtcclxuXHJcblx0XHRcdC8vINC10YHQu9C4INC10YHRgtGMIGVtYWlsXHJcblx0XHRcdGlmKGVtYWlsKSB7XHJcblx0XHRcdFx0ZW1haWxGdW5jKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vINC/0YDQvtCy0LXRgNGP0YLRjCDRg9GB0LvQvtCy0LjQtSDQtdGB0YLRjCDQu9C4INC60LvQsNGB0YFcclxuXHRcdFx0aWYoYnRuLmhhc0NsYXNzKCdqc19fZm9ybS1uby1zdWJtaXQnKSkge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRmb3JtLnN1Ym1pdCgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0fSk7XHJcblxyXG5cclxuXHRcdC8vINC/0YDQuCDQutC70LjQutC1INC90LAg0LrQvdC+0L/QutGDIFwi0L7Rh9C40YHRgtC40YLRjFwiXHJcblx0XHRidG5SZXNldC5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdFx0aW5wdXQuYWRkKGVtYWlsKS5yZW1vdmVDbGFzcyhpbnB1dEVycm9yLCBpbnB1dFN1Y2Nlc3MpO1xyXG5cdFx0XHRpY29uLnJlbW92ZUNsYXNzKGljb25FcnJvciwgaWNvblN1Y2Nlc3MpO1xyXG5cdFx0fSk7XHJcblxyXG5cclxuXHR9KTsgLy8gLS0+IHJlYWR5IGVuZFxyXG5cclxufSkoIGpRdWVyeSApOyIsIi8vIGpzINC00LvRjyDRgdC60YDQvtC70LvQsCDQstC90LjQtyDQuNC70Lgg0LLQstC10YDRhVxyXG4ndXNlIHNjdHJpY3QnO1xyXG5cclxuJChmdW5jdGlvbiAoKXtcclxuXHJcblx0Ly8g0LfQsNC00LDRkdC8INC/0LXRgNC10LzQtdC90L3Ri9C1XHJcblx0dmFyIGJvZHkgPSAkKCdib2R5LCBodG1sJyksXHJcblx0XHRhcnJvd0Rvd24gPSAkKCcuanNfX2Fycm93LWRvd24nKSxcclxuXHRcdGFycm93VXAgPSAkKCcuanNfX2Fycm93LXVwJyksXHJcblx0XHRoZWFkZXJIZWlnaHQgPSAkKCcuanNfX2hlYWRlcicpLmhlaWdodCgpO1xyXG5cclxuXHQvLyDQv9GA0L7QstC10YDRj9C10Lwg0L3QsNC70LjRh9C40LUg0YHRgtGA0LXQu9C60LggLS0g0LLQvdC40LdcclxuXHRpZihhcnJvd0Rvd24pe1xyXG5cdFx0Ly8g0YTRg9C90LrRhtC40Y8g0L/RgNC4INC90LDQttCw0YLQuNC4XHJcblx0XHRhcnJvd0Rvd24uY2xpY2soZnVuY3Rpb24oKXtcclxuXHRcdFx0Ly8g0LDQvdC40LzQsNGG0LjRjyDRgdC60YDQvtC70LvQsFxyXG5cdFx0XHRib2R5LmFuaW1hdGUoe3Njcm9sbFRvcDogaGVhZGVySGVpZ2h0fSwgMTUwMCk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdC8vINC/0YDQvtCy0LXRgNGP0LXQvCDQvdCw0LvQuNGH0LUg0YHRgtGA0LXQu9C60LggLS0g0LLQstC10YDRhVxyXG5cdGlmKGFycm93VXApIHtcclxuXHRcdC8vINGE0YPQvdC60YbQuNGPINC/0YDQuCDQvdCw0LbQsNGC0LjQuFxyXG5cdFx0YXJyb3dVcC5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdFx0Ly8g0LDQvdC40LzQsNGG0LjRjyDRgdC60YDQvtC70LvQsFxyXG5cdFx0XHRib2R5LmFuaW1hdGUoe3Njcm9sbFRvcDogMH0sIDI1MDApO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxufSk7XHJcbiIsIi8vIGpzINC00LvRjyBpbmRleC1wYXJhbGxheFxyXG5cclxuJChmdW5jdGlvbigpe1xyXG5cclxuXHQvLyDQt9Cw0LTQsNGR0Lwg0L/QtdGA0LXQvNC10L3QvdGL0LVcclxuXHR2YXIgcGFyYWxsYXhDb250YWluZXIgPSAkKCcucGFyYWxsYXgnKSxcclxuXHRcdGxheWVycyA9ICQoJy5wYXJhbGxheF9fbGF5ZXInKTtcclxuXHJcblxyXG5cdC8vINC/0YDQvtC80LjRgSDQutC+0YLQvtGA0YvQuSDQsdGD0LTQtdGCINC/0YDQvtCy0LXRgNGP0YLRjCDQvdCw0LvQuNGH0LjQtSDQk9C70LDQstC90L7Qs9C+INC/0LDRgNCw0LvQu9Cw0LrRgdCwINC90LAg0YHRgtGA0LDQvdC40YbQtVxyXG5cdHZhciBwYXJhbGxheFByb21pc2UgPSBuZXcgUHJvbWlzZSAoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblx0XHRcdGlmIChwYXJhbGxheENvbnRhaW5lci5sZW5ndGgpIHtcclxuXHRcdFx0XHRyZXNvbHZlKCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmVqZWN0KCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHQvLyDRhNGD0L3QutGG0LjRjyDQv9GA0Lgg0L3QsNC70LjRh9C40Lgg0LPQu9Cw0LLQvdC+0LPQviDQv9Cw0YDQsNC70LvQsNC60YHQsFxyXG5cdHBhcmFsbGF4UHJvbWlzZS50aGVuKGZ1bmN0aW9uKCl7XHJcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgbW92ZUxheWVycyk7XHJcblx0fSkuY2F0Y2goZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiA7XHJcblx0XHR9KTtcclxuXHJcblx0Ly8g0YTRg9C90LrRhtC40Y8g0LTQu9GPINC00LLQuNC20LXQvdC40Y8g0YHQu9C+0ZHQslxyXG5cdHZhciBtb3ZlTGF5ZXJzID0gZnVuY3Rpb24gKGUpIHtcclxuXHRcdHZhciBpbml0aWFsWCA9ICh3aW5kb3cuaW5uZXJXaWR0aCAvIDIpIC0gZS5wYWdlWCxcclxuXHRcdFx0aW5pdGlhbFkgPSAod2luZG93LmlubmVySGVpZ2h0IC8gMikgLSBlLnBhZ2VZO1xyXG5cclxuXHRcdFtdLnNsaWNlLmNhbGwobGF5ZXJzKS5mb3JFYWNoKGZ1bmN0aW9uKGxheWVyLCBpbmRleCkge1xyXG5cdFx0XHR2YXIgZGl2aWRlciA9IGluZGV4IC8gMTAwLFxyXG5cdFx0XHRcdHBvc2l0aW9uWCA9IGluaXRpYWxYICogZGl2aWRlcixcclxuXHRcdFx0XHRwb3NpdGlvblkgPSBpbml0aWFsWSAqIGRpdmlkZXIsXHJcblx0XHRcdFx0dHJhbnNmb3JtU3RyaW5nID0gJ3RyYW5zbGF0ZSgnICsgcG9zaXRpb25YICsgJ3B4LCcgKyBwb3NpdGlvblkgKyAncHgpJztcclxuXHJcblx0XHRcdGxheWVyLnN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcclxuXHRcdH0pO1xyXG5cdH07XHJcbn0pOyIsIi8vIEZsaXAg0Y3RhNGE0LXQutGCXHJcblxyXG4kKGZ1bmN0aW9uKCl7XHJcblxyXG5cdC8vINC30LDQtNCw0ZHQvCDQv9C10YDQtdC80LXQvdC90YvQtVxyXG5cdHZhciBsaW5rID0gJCgnLmJ0bi1hdXRob19fbGluaycpLFxyXG5cdFx0Ym94ID0gJCgnLmZsaXAnKSxcclxuXHRcdG1haW5MaW5rID0gJCgnLmxvZ2luX19saW5rJyk7IFxyXG5cclxuXHQvLyDQv9GA0L7QvNC40YEg0LrQvtGC0L7RgNGL0Lkg0LHRg9C00LXRgiDQv9GA0L7QstC10YDRj9GC0Ywg0L3QsNC70LjRh9C40LUg0YTQu9C40L8g0LrQvtGC0LXQudC90LXRgNCwINC90LAg0YHRgtGA0LDQvdC40YbQtVxyXG5cdHZhciBmbGlwUHJvbWlzZSA9IG5ldyBQcm9taXNlIChmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHRcdFx0aWYgKGJveC5sZW5ndGgpIHtcclxuXHRcdFx0XHRyZXNvbHZlKCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmVqZWN0KCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHQvLyDRhNGD0L3QutGG0LjRjyDQv9GA0Lgg0L3QsNC70LjRh9C40Lgg0YTQu9C40L8g0LrQvtC90YLQtdC50L3QtdGA0LVcclxuXHRmbGlwUHJvbWlzZS50aGVuKGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdC8vINC/0YDQuCDQutC70LjQutC1LCDRhNC70LjQvyDQutC+0L3RgtC10L3QtdC50YDRgyDQtNC+0LHQsNCy0LjRgtGMINC60LvQsNGB0YEg0YEg0L/QvtCy0L7RgNC+0YLQvtC8XHJcblx0XHRsaW5rLmNsaWNrKGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpOyAvLyDQvtGC0LzQtdC90LAg0YHRgtCw0L3QtNCw0YDRgtC90YvRhSDQtNC10LnRgdCy0YLQudC4XHJcblxyXG5cdFx0XHRib3gudG9nZ2xlQ2xhc3MoJ2pzX19mbGlwJyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQvLyDQv9GA0Lgg0LrQu9C40LrQtSAg0L3QsCBcItCd0LAg0LPQu9Cw0LLQvdGD0Y5cIiwg0YPQtNCw0LvQuNGC0Ywg0LrQu9Cw0YHRgSDQv9C+0LLQvtGA0L7RgtCwLCDRgtC10Lwg0YHQsNC80YvQvCDRgNCw0LfQstC10YDQvdGD0LIg0LrQvtC90YLQtdC50L3QtdGAXHJcblx0XHRtYWluTGluay5jbGljayhmdW5jdGlvbihlKSB7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTsgLy8g0L7RgtC80LXQvdCwINGB0YLQsNC90LTQsNGA0YLQvdGL0YUg0LTQtdC50YHQstGC0LnQuFxyXG5cclxuXHRcdFx0Ym94LnJlbW92ZUNsYXNzKCdqc19fZmxpcCcpO1xyXG5cdFx0fSk7XHJcblx0fSkuY2F0Y2goZnVuY3Rpb24oKXtcclxuXHRcdFx0cmV0dXJuIDtcclxuXHRcdH0pO1xyXG5cclxufSk7IiwiLy8ganMg0YTQsNC50Lsg0LTQu9GPINCw0L3QuNC80LDRhtC40Lgg0L/QvtGP0LLQu9C10L3QuNGPIGZsaXBcclxuXHJcblxyXG4oZnVuY3Rpb24oKXtcclxuXHJcblx0Ly8g0L/QtdGA0LXQvNC10L3QvdGL0LVcclxuXHR2YXIgZmxpcCA9ICQoJy5mbGlwJyksXHJcblx0XHRmbGlwQW5pbWF0aW9uID0gJ2ZsaXBfX2FuaW1hdGlvbic7XHJcblxyXG5cdC8vINC/0YDQuCDQt9Cw0LPRgNGD0LfQutC1INGB0YLRgNCw0L3QuNGG0LVcclxuXHQkKHdpbmRvdykub24oJ2xvYWQnLCgpID0+e1xyXG5cclxuXHRcdC8v0YEg0LfQsNC00LXRgNC20LrQvtC5IDEg0YHQtdC6XHJcblx0XHRzZXRUaW1lb3V0KCgpPT57XHJcblxyXG5cdFx0XHQvLyDQtNC+0LHQsNCy0LjRgtGMINC60LvQsNGB0YEg0YEg0LDQvdC40LzQsNGG0LjQtdC5XHJcblx0XHRcdGZsaXAuYWRkQ2xhc3MoZmxpcEFuaW1hdGlvbik7XHJcblx0XHR9LCAxMDAwKTtcclxuXHJcblx0fSk7XHJcblxyXG5cclxufSgpKTsiLCIvLyBqcyDQtNC70Y8g0JvQuNC/0LrQvtCz0L4g0YHQsNC50LTQsdCw0YDQsCDQvdCwINGB0YLRgNCw0L3QuNGG0LUg0JHQu9C+0LNcclxuXHJcbihmdW5jdGlvbigpIHtcclxuXHJcbiAgICAvLyDQt9Cw0LTQsNC10Lwg0L/QtdGA0LXQvNC10L3QvdGL0LVcclxuICAgIHZhciBzaWRlYmFyID0gJCgnLnNpZGViYXInKSxcclxuICAgICAgICBzaWRlYmFyRml4ID0gJ3NpZGViYXJfX2ZpeGVkJyxcclxuICAgICAgICBidG5TaWRlYmFyID0gJCgnLnNpZGViYXJfX3Nob3cnKSxcclxuICAgICAgICBidG5TaWRlYmFyU2hvdyA9ICdqc19fc2lkZWJhci1zaG93JyxcclxuICAgICAgICBzY3JvbGxIZWlnaHQgPSA2MjA7XHJcblxyXG4gICAgLy8g0L/RgNC+0LzQuNGBINC60L7RgtC+0YDRi9C5INCx0YPQtNC10YIg0L/RgNC+0LLQtdGA0Y/RgtGMINC90LDQu9C40YfQuNC1INCh0LDQudC00LHQsNGA0LAg0L3QsCDRgdGC0YDQsNC90LjRhtC1XHJcbiAgICB2YXIgc2lkZWJhclByb21pc2UgPSBuZXcgUHJvbWlzZSAoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgaWYgKHNpZGViYXIubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZWplY3QoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyDRhNGD0L3QutGG0LjRjyDQv9GA0Lgg0L3QsNC70LjRh9C40Lgg0YHQsNC50LTQsdCw0YDQsFxyXG4gICAgc2lkZWJhclByb21pc2UudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIC8qINC10YHQu9C4INGB0LrRgNC+0LvQuyDQsdC+0LvRjNGI0LUg0LfQsNC00LDQvdC90L7QuSDQstGL0YHQvtGC0YssINGC0L4g0LTQvtCx0LDQstC40YLRjCDQutC70LDRgdGBICovXHJcbiAgICAgICAgICAgIGlmKCQodGhpcykuc2Nyb2xsVG9wKCkgPiBzY3JvbGxIZWlnaHQpe1xyXG4gICAgICAgICAgICAgICAgc2lkZWJhci5hZGRDbGFzcyhzaWRlYmFyRml4KTtcclxuICAgICAgICAgICAgICAgIGJ0blNpZGViYXIuYWRkQ2xhc3MoYnRuU2lkZWJhclNob3cpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPCBzY3JvbGxIZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgIHNpZGViYXIucmVtb3ZlQ2xhc3Moc2lkZWJhckZpeCk7XHJcbiAgICAgICAgICAgICAgICBidG5TaWRlYmFyLnJlbW92ZUNsYXNzKGJ0blNpZGViYXJTaG93KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSkuY2F0Y2goZnVuY3Rpb24oKXtcclxuICAgICAgICByZXR1cm4gO1xyXG4gICAgfSk7XHJcblxyXG59KSgpOyIsIi8vIGpzINC00LvRjyDQvdCw0LLQuNCz0LDRhtC40Lgg0L3QsCDRgdGC0YDQsNC90LjRhtC1INCR0LvQvtCzXHJcblxyXG4oZnVuY3Rpb24oKSB7XHJcblxyXG5cdC8vINC/0LXRgNC10LzQtdC90L3Ri9C1XHJcblx0dmFyIGxpbmsgPSAkKCcuc2lkZWJhcl9fbGluaycpLFxyXG5cdFx0aXRlbSA9ICQoJy53cml0ZV9faXRlbScpO1xyXG5cclxuXHQkKGZ1bmN0aW9uKCl7XHJcblxyXG5cdFx0Ly8g0L/RgNC+0LzQuNGBINC60L7RgtC+0YDRi9C5INCx0YPQtNC10YIg0L/RgNC+0LLQtdGA0Y/RgtGMINC90LDQu9C40YfQuNC1INCh0LDQudC00LHQsNGA0LAg0L3QsCDRgdGC0YDQsNC90LjRhtC1XHJcblx0XHR2YXIgbmF2U2lkZWJhclByb21pc2UgPSBuZXcgUHJvbWlzZSAoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblx0XHRcdGlmIChsaW5rLmxlbmd0aCkge1xyXG5cdFx0XHRcdHJlc29sdmUoKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZWplY3QoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8g0YTRg9C90LrRhtC40Y8g0L/RgNC4INC90LDQu9C40YfQuNC4INGB0LDQudC00LHQsNGA0LBcclxuXHRcdG5hdlNpZGViYXJQcm9taXNlLnRoZW4oZnVuY3Rpb24oKSB7XHJcblx0XHRcdGxpbmsuY2xpY2soZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdFx0c2hvd0FydGljbGUoJCh0aGlzKS5hdHRyKCdocmVmJyksIHRydWUpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pLmNhdGNoKGZ1bmN0aW9uKCl7XHJcblx0XHRcdHJldHVybiA7XHJcblx0XHR9KTtcclxuXHJcblxyXG5cdH0pO1xyXG5cclxuXHQvLyDQv9GA0Lgg0YHQutGA0L7Qu9C70LUg0LLRi9C30YvQstCw0YLRjCDRhNGD0L3QutGG0LjRjiBjaGVja0FydGljbGVcclxuXHQkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xyXG5cdFx0Y2hlY2tBcnRpY2xlKCk7XHJcblx0fSk7XHJcblxyXG5cclxuXHQvLyDRhNGD0L3QutGG0LjRjyDQtNC70Y8g0YHQutGA0L7Qu9C70LAg0Log0L3Rg9C20L3QvtC80YMg0Y3Qu9C10LzQtdC90YLRg1xyXG5cdGZ1bmN0aW9uIHNob3dBcnRpY2xlKGFydGljbGUsIGlzQW5pbWF0ZSkge1xyXG5cdFx0dmFyIGRpcmVjdGlvbiA9IGFydGljbGUucmVwbGFjZSgvIy8sICcnKSxcclxuXHRcdFx0cmVxQXJ0aWNsZSA9IGl0ZW0uZmlsdGVyKCdbZGF0YS1hcnRpY2xlPVwiJyArIGRpcmVjdGlvbiArICdcIl0nKSxcclxuXHRcdFx0cmVxQXJ0aWNsZVBvcyA9IHJlcUFydGljbGUub2Zmc2V0KCkudG9wO1xyXG5cclxuXHRcdGlmIChpc0FuaW1hdGUpIHtcclxuXHRcdFx0JCgnYm9keSwgaHRtbCcpLmFuaW1hdGUoe3Njcm9sbFRvcDogcmVxQXJ0aWNsZVBvc30sIDUwMCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvLyDRhNGD0L3QutGG0LjRjyDQtNC70Y8g0LDQstGC0L7QvNCw0YLQuNGH0LXRgdC60LXQs9C+INC/0LXRgNC10LrQu9GO0YfQtdC90LjRjyDQutC70LDRgdGB0LAgYWN0aXZlINGDINGB0YHRi9C70L7QulxyXG5cdGZ1bmN0aW9uIGNoZWNrQXJ0aWNsZSgpIHtcclxuXHRcdGl0ZW0uZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyICR0aGlzID0gJCh0aGlzKSxcclxuXHRcdFx0XHR0b3BFZGdlID0gJHRoaXMub2Zmc2V0KCkudG9wIC0gMTUwLFxyXG5cdFx0XHRcdGJvdHRvbUVkZ2UgPSB0b3BFZGdlICsgJHRoaXMuaGVpZ2h0KCksXHJcblx0XHRcdFx0d1Njcm9sbCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcclxuXHJcblx0XHRcdGlmICh0b3BFZGdlIDwgd1Njcm9sbCAmJiBib3R0b21FZGdlID4gd1Njcm9sbCkge1xyXG5cdFx0XHRcdHZhciBjdXJyZW50SWQgPSAkdGhpcy5kYXRhKCdhcnRpY2xlJyksXHJcblx0XHRcdFx0XHRyZXFMaW5rID0gbGluay5maWx0ZXIoJ1tocmVmPVwiIycgKyBjdXJyZW50SWQgKyAnXCJdJyk7XHJcblxyXG5cdFx0XHRcdFx0bGluay5yZW1vdmVDbGFzcygnc2lkZWJhcl9fbGluay0tYWN0aXZlJyk7XHJcblx0XHRcdFx0XHRyZXFMaW5rLmFkZENsYXNzKCdzaWRlYmFyX19saW5rLS1hY3RpdmUnKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHJcbn0pKCk7ICIsIi8vIGpzINGE0YPQvdC60YbQuNGPINC00LvRjyDQv9C+0LrQsNC30LAgc2lkZWJhclxyXG5cclxuXHJcbiQoZnVuY3Rpb24gKCkge1xyXG5cclxuXHQvLyDQv9C10YDQtdC80LXQvdC90YvQtVxyXG5cdHZhciBidG4gPSAkKCcuanNfX2J0bi1zaWRlYmFyJyksXHJcblx0XHRzaWRlYmFyID0gJCgnLnNpZGViYXInKSxcclxuXHRcdG90aGVyQ29udGVudCA9ICQoJy53cml0ZScpLFxyXG5cdFx0ZmxhZyA9IHRydWU7XHJcblxyXG5cdC8vINC/0YDQuCDQutC70LjQutC1INC90LAg0LrQvdC+0L/QutGDINC/0L7QutCw0LfRi9Cy0LDRgtGMINC40LvQuCDRgdC60YDRi9Cy0LDRgtGMINGB0LDQudC00LHQsNGAXHJcblx0YnRuLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0aWYgKGZsYWcgPT0gdHJ1ZSkge1xyXG5cdFx0XHRzaWRlYmFyLmNzcygndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZVgoMTAwJSknKTtcclxuXHRcdFx0ZmxhZyA9IGZhbHNlO1xyXG5cdFx0fSBlbHNlICB7XHJcblx0XHRcdHNpZGViYXIucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuXHRcdFx0ZmxhZyA9IHRydWU7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdC8vINC10YHQu9C4INGB0LDQudC00LHQsNGAINC/0L7QutCw0LfQsNC9LCDQv9GA0Lgg0LrQu9C40LrQtSDQvdCwINC00YDRg9Cz0L7QuSDQutC+0L3RgtC10L3RgiDRg9Cx0YDQsNGC0Ywg0YHQsNC50LTQsdCw0YBcclxuXHRvdGhlckNvbnRlbnQuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHRpZiAoZmxhZyA9PSBmYWxzZSkge1xyXG5cdFx0XHRzaWRlYmFyLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcblx0XHRcdGZsYWcgPSB0cnVlO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQvLyDQtdGB0LvQuCDRgdCw0LnQtNCx0LDRgCDQv9C+0LrQsNC30LDQvSwg0L/RgNC4INC60LvQuNC60LUg0L3QsCDQutC70LDQstC40YjRgyBFc2Mg0YPQsdGA0LDRgtGMINGB0LDQudC00LHQsNGAXHJcblx0JCgnYm9keScpLmtleXVwKGZ1bmN0aW9uKGUpIHtcclxuXHRcdGlmKGUud2hpY2ggPT0gMjcpIHtcclxuXHRcdFx0c2lkZWJhci5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG5cdFx0XHRmbGFnID0gdHJ1ZTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblxyXG5cclxufSk7IiwiLy8ganMg0YTQsNC50Lsg0LTQu9GPINCw0L3QuNC80LDRhtC40Lgg0LrRgNGD0LPQvtCyINGB0LrQuNC70LvQvtCyXHJcblxyXG4kKGZ1bmN0aW9uKCl7XHJcblx0Ly8g0L/QtdGA0LXQvNC10L3QvdCw0Y8g0LHQu9C+0LrQuCDRgdC60LjQu9C70L7QslxyXG5cdHZhciBlbGVtID0gJCgnLnNraWxsc19faXRlbXMtd3JhcCcpO1xyXG5cclxuXHQvLyDQv9GA0L7QvNC40YEg0LrQvtGC0L7RgNGL0Lkg0LHRg9C00LXRgiDQv9GA0L7QstC10YDRj9GC0Ywg0L3QsNC70LjRh9C40LUg0LHQu9C+0LrQsCDRgdC60LjQu9C70L7QslxyXG5cdHZhciBza2lsbHNQcm9taXNlID0gbmV3IFByb21pc2UgKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cdFx0aWYgKGVsZW0ubGVuZ3RoKSB7XHJcblx0XHRyZXNvbHZlKCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0cmVqZWN0KCk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdC8vINGE0YPQvdC60YbQuNGPINC/0YDQuCDQvdCw0LvQuNGH0LjQuCDQsdC70L7QutCwINGB0LrQuNC70LvQvtCyXHJcblx0c2tpbGxzUHJvbWlzZS50aGVuKGZ1bmN0aW9uKCl7XHJcblx0XHQvLyDQv9GA0Lgg0YHQutGA0L7Qu9C70LUgXHJcblx0XHQkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgc2Nyb2xsVG9wID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xyXG5cclxuXHRcdFx0Lyog0LXRgdC70Lgg0YTRg9C90LrRhtC40Y8gY2hlY2tEaXN0YW5jZSDQstC10YDQvdGD0LvQsCByZXR1cm4g0YLQviwg0LTQvtCx0LDQstC40YLRjCDQutC70LDRgdGBIC8g0LjQvdCw0YfQtSDRg9C00LDQu9C40YLRjCAqL1xyXG5cdFx0XHRpZihjaGVja0Rpc3RhbmNlKHNjcm9sbFRvcCkpIHtcclxuXHRcdFx0XHRlbGVtLmFkZENsYXNzKCdqc19fY2lyY2xlLWFuaW1hdGUnKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRlbGVtLnJlbW92ZUNsYXNzKCdqc19fY2lyY2xlLWFuaW1hdGUnKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fSkuY2F0Y2goZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiA7XHJcblx0fSk7XHJcblxyXG5cdC8vINGE0YPQvdC60YbQuNGPINC00LvRjyDQv9GA0L7QstC10YDQutC4INC/0L7Qt9C40YbQuNC4INGN0LvQtdC80LXQvdGC0LBcclxuXHR2YXIgY2hlY2tEaXN0YW5jZSA9IGZ1bmN0aW9uKHNjcm9sbFRvcCkge1xyXG5cdFx0dmFyIG9mZnNldCA9IGVsZW0ub2Zmc2V0KCkudG9wLFxyXG5cdFx0XHR3aW5kb3dNYXJnaW4gPSBNYXRoLmNlaWwoJCh3aW5kb3cpLmhlaWdodCgpIC8gMyksXHJcblx0XHRcdHRvcEJvcmRlciA9IG9mZnNldCAtIHNjcm9sbFRvcCAtIHdpbmRvd01hcmdpbiAtIDEwMCxcclxuXHRcdFx0Ym90dG9tRWRnZSA9IGVsZW0ub3V0ZXJIZWlnaHQodHJ1ZSkgKyBvZmZzZXQsXHJcblx0XHRcdGJvdHRvbUJvcmRlciA9IHNjcm9sbFRvcCArIHdpbmRvd01hcmdpbiAtIGJvdHRvbUVkZ2U7XHJcblxyXG5cdFx0XHRyZXR1cm4gdG9wQm9yZGVyIDw9IDAgJiYgYm90dG9tQm9yZGVyIDw9IDBcclxuXHR9XHJcblxyXG5cclxufSk7IiwiLy8ganMg0YTQsNC50Lsg0LTQu9GPINC60LDRgNGC0YtcclxuXHJcbihmdW5jdGlvbigpIHtcclxuICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZERvbUxpc3RlbmVyKHdpbmRvdywgJ2xvYWQnLCBpbml0KTtcclxuICAgIHZhciBtYXAsIG1hcmtlcnNBcnJheSA9IFtdO1xyXG5cclxuICAgIGZ1bmN0aW9uIGJpbmRJbmZvV2luZG93KG1hcmtlciwgbWFwLCBsb2NhdGlvbikge1xyXG4gICAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1hcmtlciwgJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGNsb3NlKGxvY2F0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5pYi5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgbG9jYXRpb24uaW5mb1dpbmRvd1Zpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uLmliID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGxvY2F0aW9uLmluZm9XaW5kb3dWaXNpYmxlID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBjbG9zZShsb2NhdGlvbik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBtYXJrZXJzQXJyYXkuZm9yRWFjaChmdW5jdGlvbihsb2MsIGluZGV4KXtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobG9jLmliICYmIGxvYy5pYiAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9zZShsb2MpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBib3hUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgICAgICBib3hUZXh0LnN0eWxlLmNzc1RleHQgPSAnYmFja2dyb3VuZDogI2ZmZjsnO1xyXG4gICAgICAgICAgICAgICAgYm94VGV4dC5jbGFzc0xpc3QuYWRkKCdtZC13aGl0ZWZyYW1lLTJkcCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGJ1aWxkUGllY2VzKGxvY2F0aW9uLCBlbCwgcGFydCwgaWNvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsb2NhdGlvbltwYXJ0XSA9PT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobG9jYXRpb24uaXdbcGFydF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoKGVsKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3Bob3RvJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobG9jYXRpb24ucGhvdG8pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzxkaXYgY2xhc3M9XCJpdy1waG90b1wiIHN0eWxlPVwiYmFja2dyb3VuZC1pbWFnZTogdXJsKCcgKyBsb2NhdGlvbi5waG90byArICcpO1wiPjwvZGl2Pic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdpdy10b29sYmFyJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzxkaXYgY2xhc3M9XCJpdy10b29sYmFyXCI+PGgzIGNsYXNzPVwibWQtc3ViaGVhZFwiPicgKyBsb2NhdGlvbi50aXRsZSArICc8L2gzPjwvZGl2Pic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdkaXYnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaChwYXJ0KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZW1haWwnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwiaXctZGV0YWlsc1wiPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIiBzdHlsZT1cImNvbG9yOiM0Mjg1ZjQ7XCI+PGltZyBzcmM9XCIvL2Nkbi5tYXBraXQuaW8vdjEvaWNvbnMvJyArIGljb24gKyAnLnN2Z1wiLz48L2k+PHNwYW4+PGEgaHJlZj1cIm1haWx0bzonICsgbG9jYXRpb24uZW1haWwgKyAnXCIgdGFyZ2V0PVwiX2JsYW5rXCI+JyArIGxvY2F0aW9uLmVtYWlsICsgJzwvYT48L3NwYW4+PC9kaXY+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICd3ZWInOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwiaXctZGV0YWlsc1wiPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIiBzdHlsZT1cImNvbG9yOiM0Mjg1ZjQ7XCI+PGltZyBzcmM9XCIvL2Nkbi5tYXBraXQuaW8vdjEvaWNvbnMvJyArIGljb24gKyAnLnN2Z1wiLz48L2k+PHNwYW4+PGEgaHJlZj1cIicgKyBsb2NhdGlvbi53ZWIgKyAnXCIgdGFyZ2V0PVwiX2JsYW5rXCI+JyArIGxvY2F0aW9uLndlYl9mb3JtYXR0ZWQgKyAnPC9hPjwvc3Bhbj48L2Rpdj4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2Rlc2MnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc8bGFiZWwgY2xhc3M9XCJpdy1kZXNjXCIgZm9yPVwiY2JfZGV0YWlsc1wiPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBpZD1cImNiX2RldGFpbHNcIi8+PGgzIGNsYXNzPVwiaXcteC1kZXRhaWxzXCI+RGV0YWlsczwvaDM+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29ucyB0b2dnbGUtb3Blbi1kZXRhaWxzXCI+PGltZyBzcmM9XCIvL2Nkbi5tYXBraXQuaW8vdjEvaWNvbnMvJyArIGljb24gKyAnLnN2Z1wiLz48L2k+PHAgY2xhc3M9XCJpdy14LWRldGFpbHNcIj4nICsgbG9jYXRpb24uZGVzYyArICc8L3A+PC9sYWJlbD4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzxkaXYgY2xhc3M9XCJpdy1kZXRhaWxzXCI+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPjxpbWcgc3JjPVwiLy9jZG4ubWFwa2l0LmlvL3YxL2ljb25zLycgKyBpY29uICsgJy5zdmdcIi8+PC9pPjxzcGFuPicgKyBsb2NhdGlvbltwYXJ0XSArICc8L3NwYW4+PC9kaXY+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnb3Blbl9ob3Vycyc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW1zID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxvY2F0aW9uLm9wZW5faG91cnMubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbG9jYXRpb24ub3Blbl9ob3Vycy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgIT09IDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zICs9ICc8bGk+PHN0cm9uZz4nICsgbG9jYXRpb24ub3Blbl9ob3Vyc1tpXS5kYXkgKyAnPC9zdHJvbmc+PHN0cm9uZz4nICsgbG9jYXRpb24ub3Blbl9ob3Vyc1tpXS5ob3VycyArJzwvc3Ryb25nPjwvbGk+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmaXJzdCA9ICc8bGk+PGxhYmVsIGZvcj1cImNiX2hvdXJzXCI+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwiY2JfaG91cnNcIi8+PHN0cm9uZz4nICsgbG9jYXRpb24ub3Blbl9ob3Vyc1swXS5kYXkgKyAnPC9zdHJvbmc+PHN0cm9uZz4nICsgbG9jYXRpb24ub3Blbl9ob3Vyc1swXS5ob3VycyArJzwvc3Ryb25nPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgdG9nZ2xlLW9wZW4taG91cnNcIj48aW1nIHNyYz1cIi8vY2RuLm1hcGtpdC5pby92MS9pY29ucy9rZXlib2FyZF9hcnJvd19kb3duLnN2Z1wiLz48L2k+PHVsPicgKyBpdGVtcyArICc8L3VsPjwvbGFiZWw+PC9saT4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnPGRpdiBjbGFzcz1cIml3LWxpc3RcIj48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zIGZpcnN0LW1hdGVyaWFsLWljb25zXCIgc3R5bGU9XCJjb2xvcjojNDI4NWY0O1wiPjxpbWcgc3JjPVwiLy9jZG4ubWFwa2l0LmlvL3YxL2ljb25zLycgKyBpY29uICsgJy5zdmdcIi8+PC9pPjx1bD4nICsgZmlyc3QgKyAnPC91bD48L2Rpdj4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgYm94VGV4dC5pbm5lckhUTUwgPSBcclxuICAgICAgICAgICAgICAgICAgICBidWlsZFBpZWNlcyhsb2NhdGlvbiwgJ3Bob3RvJywgJ3Bob3RvJywgJycpICtcclxuICAgICAgICAgICAgICAgICAgICBidWlsZFBpZWNlcyhsb2NhdGlvbiwgJ2l3LXRvb2xiYXInLCAndGl0bGUnLCAnJykgK1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkUGllY2VzKGxvY2F0aW9uLCAnZGl2JywgJ2FkZHJlc3MnLCAnbG9jYXRpb25fb24nKSArXHJcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRQaWVjZXMobG9jYXRpb24sICdkaXYnLCAnd2ViJywgJ3B1YmxpYycpICtcclxuICAgICAgICAgICAgICAgICAgICBidWlsZFBpZWNlcyhsb2NhdGlvbiwgJ2RpdicsICdlbWFpbCcsICdlbWFpbCcpICtcclxuICAgICAgICAgICAgICAgICAgICBidWlsZFBpZWNlcyhsb2NhdGlvbiwgJ2RpdicsICd0ZWwnLCAncGhvbmUnKSArXHJcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRQaWVjZXMobG9jYXRpb24sICdkaXYnLCAnaW50X3RlbCcsICdwaG9uZScpICtcclxuICAgICAgICAgICAgICAgICAgICBidWlsZFBpZWNlcyhsb2NhdGlvbiwgJ29wZW5faG91cnMnLCAnb3Blbl9ob3VycycsICdhY2Nlc3NfdGltZScpICtcclxuICAgICAgICAgICAgICAgICAgICBidWlsZFBpZWNlcyhsb2NhdGlvbiwgJ2RpdicsICdkZXNjJywgJ2tleWJvYXJkX2Fycm93X2Rvd24nKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgbXlPcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsaWduQm90dG9tOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGJveFRleHQsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZUF1dG9QYW46IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbWF4V2lkdGg6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgcGl4ZWxPZmZzZXQ6IG5ldyBnb29nbGUubWFwcy5TaXplKC0xNDAsIC00MCksXHJcbiAgICAgICAgICAgICAgICAgICAgekluZGV4OiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIGJveFN0eWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnMjgwcHgnXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjbG9zZUJveE1hcmdpbjogJzBweCAwcHggMHB4IDBweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5mb0JveENsZWFyYW5jZTogbmV3IGdvb2dsZS5tYXBzLlNpemUoMSwgMSksXHJcbiAgICAgICAgICAgICAgICAgICAgaXNIaWRkZW46IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhbmU6ICdmbG9hdFBhbmUnLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZUV2ZW50UHJvcGFnYXRpb246IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uLmliID0gbmV3IEluZm9Cb3gobXlPcHRpb25zKTtcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uLmliLm9wZW4obWFwLCBtYXJrZXIpO1xyXG4gICAgICAgICAgICAgICAgbG9jYXRpb24uaW5mb1dpbmRvd1Zpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgICAgICB2YXIgbWFwT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgY2VudGVyOiBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKDU1Ljc0ODM1ODExMjcyMDM3NSw1Mi4zNTQxNzU4ODc0OTk5OCksXHJcbiAgICAgICAgICAgIHpvb206IDEzLFxyXG4gICAgICAgICAgICBnZXN0dXJlSGFuZGxpbmc6ICdjb29wZXJhdGl2ZScsXHJcbiAgICAgICAgICAgIGZ1bGxzY3JlZW5Db250cm9sOiBmYWxzZSxcclxuICAgICAgICAgICAgem9vbUNvbnRyb2w6IHRydWUsXHJcbiAgICAgICAgICAgIGRpc2FibGVEb3VibGVDbGlja1pvb206IHRydWUsXHJcbiAgICAgICAgICAgIG1hcFR5cGVDb250cm9sOiB0cnVlLFxyXG4gICAgICAgICAgICBtYXBUeXBlQ29udHJvbE9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgIHN0eWxlOiBnb29nbGUubWFwcy5NYXBUeXBlQ29udHJvbFN0eWxlLkhPUklaT05UQUxfQkFSLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzY2FsZUNvbnRyb2w6IGZhbHNlLFxyXG4gICAgICAgICAgICBzY3JvbGx3aGVlbDogZmFsc2UsXHJcbiAgICAgICAgICAgIHN0cmVldFZpZXdDb250cm9sOiBmYWxzZSxcclxuICAgICAgICAgICAgZHJhZ2dhYmxlIDogdHJ1ZSxcclxuICAgICAgICAgICAgY2xpY2thYmxlSWNvbnM6IHRydWUsXHJcbiAgICAgICAgICAgIHpvb21Db250cm9sT3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IGdvb2dsZS5tYXBzLkNvbnRyb2xQb3NpdGlvbi5SSUdIVF9DRU5URVJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbWFwVHlwZUNvbnRyb2xPcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogZ29vZ2xlLm1hcHMuQ29udHJvbFBvc2l0aW9uLlJJR0hUX1RPUFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBtYXBUeXBlSWQ6IGdvb2dsZS5tYXBzLk1hcFR5cGVJZC5ST0FETUFQLFxyXG4gICAgICAgICAgICBzdHlsZXM6IFt7XCJmZWF0dXJlVHlwZVwiOlwid2F0ZXJcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiM0NmJjZWNcIn0se1widmlzaWJpbGl0eVwiOlwib25cIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwibGFuZHNjYXBlXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjZjJmMmYyXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInJvYWRcIixcInN0eWxlcnNcIjpbe1wic2F0dXJhdGlvblwiOi0xMDB9LHtcImxpZ2h0bmVzc1wiOjQ1fV19LHtcImZlYXR1cmVUeXBlXCI6XCJyb2FkLmhpZ2h3YXlcIixcInN0eWxlcnNcIjpbe1widmlzaWJpbGl0eVwiOlwic2ltcGxpZmllZFwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJyb2FkLmFydGVyaWFsXCIsXCJlbGVtZW50VHlwZVwiOlwibGFiZWxzLmljb25cIixcInN0eWxlcnNcIjpbe1widmlzaWJpbGl0eVwiOlwib2ZmXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcImFkbWluaXN0cmF0aXZlXCIsXCJlbGVtZW50VHlwZVwiOlwibGFiZWxzLnRleHQuZmlsbFwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiIzQ0NDQ0NFwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJ0cmFuc2l0XCIsXCJzdHlsZXJzXCI6W3tcInZpc2liaWxpdHlcIjpcIm9mZlwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJwb2lcIixcInN0eWxlcnNcIjpbe1widmlzaWJpbGl0eVwiOlwib2ZmXCJ9XX1dXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBtYXBFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcCcpO1xyXG4gICAgICAgIHZhciBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKG1hcEVsZW1lbnQsIG1hcE9wdGlvbnMpO1xyXG4gICAgICAgIHZhciBsb2NhdGlvbnMgPSBbXHJcbiAgICAgICAgICAgIHtcInRpdGxlXCI6XCJBTkRSRVdcIixcInRlbFwiOlwiKzcoOTUxKTg5Ni00Mi00NFwiLFwiZW1haWxcIjpcImthdGFzaGkxMzI4QG1haWwucnVcIixcIndlYlwiOlwiaHR0cHM6Ly9hbmRyZXdsZXlraW4uZ2l0aHViLmlvL3BvcnRmb2xpby9idWlsZC9cIixcIndlYl9mb3JtYXR0ZWRcIjpcImFuZHJld2xleWtpbi5naXRodWIuaW9cIixcImxhdFwiOjU1LjczNDcwNTcwNDU5MjgwNSxcImxuZ1wiOjUyLjM5NzUxNTAyMDc2MjYyNixcInZpY2luaXR5XCI6XCJcIixcIm1hcmtlclwiOntcImZpbGxDb2xvclwiOlwiIzAwQUNDMVwiLFwiZmlsbE9wYWNpdHlcIjoxLFwic3Ryb2tlV2VpZ2h0XCI6MCxcInNjYWxlXCI6MS41LFwicGF0aFwiOlwiTTEwLjIsNy40Yy02LDAtMTAuOSw0LjktMTAuOSwxMC45YzAsNiwxMC45LDE4LjQsMTAuOSwxOC40czEwLjktMTIuMywxMC45LTE4LjRDMjEuMiwxMi4yLDE2LjMsNy40LDEwLjIsNy40eiBNMTAuMiwyMi45Yy0yLjYsMC00LjYtMi4xLTQuNi00LjZzMi4xLTQuNiw0LjYtNC42czQuNiwyLjEsNC42LDQuNlMxMi44LDIyLjksMTAuMiwyMi45elwiLFwiYW5jaG9yXCI6e1wieFwiOjEwLFwieVwiOjMwfSxcIm9yaWdpblwiOntcInhcIjowLFwieVwiOjB9LFwic3R5bGVcIjoxfSxcIml3XCI6e1widGVsXCI6dHJ1ZSxcIndlYlwiOnRydWUsXCJlbWFpbFwiOnRydWV9fVxyXG4gICAgICAgIF07XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGxvY2F0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcclxuICAgICAgICAgICAgICAgIGljb246IGxvY2F0aW9uc1tpXS5tYXJrZXIsXHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhsb2NhdGlvbnNbaV0ubGF0LCBsb2NhdGlvbnNbaV0ubG5nKSxcclxuXHJcbiAgICAgICAgICAgICAgICBtYXA6IG1hcCxcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBsb2NhdGlvbnNbaV0udGl0bGUsXHJcbiAgICAgICAgICAgICAgICBhZGRyZXNzOiBsb2NhdGlvbnNbaV0uYWRkcmVzcyxcclxuICAgICAgICAgICAgICAgIGRlc2M6IGxvY2F0aW9uc1tpXS5kZXNjLFxyXG4gICAgICAgICAgICAgICAgdGVsOiBsb2NhdGlvbnNbaV0udGVsLFxyXG4gICAgICAgICAgICAgICAgaW50X3RlbDogbG9jYXRpb25zW2ldLmludF90ZWwsXHJcbiAgICAgICAgICAgICAgICB2aWNpbml0eTogbG9jYXRpb25zW2ldLnZpY2luaXR5LFxyXG4gICAgICAgICAgICAgICAgb3BlbjogbG9jYXRpb25zW2ldLm9wZW4sXHJcbiAgICAgICAgICAgICAgICBvcGVuX2hvdXJzOiBsb2NhdGlvbnNbaV0ub3Blbl9ob3VycyxcclxuICAgICAgICAgICAgICAgIHBob3RvOiBsb2NhdGlvbnNbaV0ucGhvdG8sXHJcbiAgICAgICAgICAgICAgICB0aW1lOiBsb2NhdGlvbnNbaV0udGltZSxcclxuICAgICAgICAgICAgICAgIGVtYWlsOiBsb2NhdGlvbnNbaV0uZW1haWwsXHJcbiAgICAgICAgICAgICAgICB3ZWI6IGxvY2F0aW9uc1tpXS53ZWIsXHJcbiAgICAgICAgICAgICAgICBpdzogbG9jYXRpb25zW2ldLml3XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBtYXJrZXJzQXJyYXkucHVzaChtYXJrZXIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGxvY2F0aW9uc1tpXS5pdy5lbmFibGUgPT09IHRydWUpe1xyXG4gICAgICAgICAgICAgICAgYmluZEluZm9XaW5kb3cobWFya2VyLCBtYXAsIGxvY2F0aW9uc1tpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbn0pKCk7IFxyXG4iLCIvLyBqcyDRhNCw0LnQuyDQtNC70Y8g0LDQvdC40LzQsNGG0LjQuCDQutC+0L3RgtGA0L7Qu9GMINC60L3QvtC/0L7QuiDQsiDRgdC70LDQudC00LXRgNC1XHJcblxyXG5cclxuJChmdW5jdGlvbigpe1xyXG5cclxuXHRjb25zdCBkdXJhdGlvbiA9IDUwMDtcclxuXHRsZXQgY291bnRlciAgICA9IDE7XHJcblx0bGV0IGluUHJvZ3Jlc3MgPSBmYWxzZTtcclxuXHJcblx0Y29uc3QgbW92ZVNsaWRlcyA9IChjb250YWluZXIsIGRpcmVjdGlvbikgPT4ge1xyXG5cdFx0bGV0IGl0ZW1zICAgICAgPSBjb250YWluZXIuZmluZCgnLnNsaWRlci1jb250cm9sc19faXRlbScpO1xyXG5cdFx0bGV0IGFjdGl2ZUl0ZW0gPSBpdGVtcy5maWx0ZXIoJy5hY3RpdmUnKTtcclxuXHRcdGxldCBzdHJhZmVQZXJjID0gZGlyZWN0aW9uID09PSAnZG93bicgPyAxMDAgOiAtMTAwO1xyXG5cclxuXHRcdGNvbnNvbGUubG9nKGl0ZW1zKTtcclxuXHRcdGlmIChjb3VudGVyID49IGl0ZW1zLmxlbmd0aCkgY291bnRlciA9IDA7XHJcblxyXG5cdFx0Y29uc3QgcmVxSXRlbSA9IGl0ZW1zLmVxKGNvdW50ZXIpO1xyXG5cclxuXHRcdGFjdGl2ZUl0ZW0uYW5pbWF0ZSh7XHJcblx0XHRcdCd0b3AnOiBgJHtzdHJhZmVQZXJjfSVgXHJcblx0XHR9LCBkdXJhdGlvbilcclxuXHJcblx0XHRyZXFJdGVtLmFuaW1hdGUoe1xyXG5cdFx0XHR0b3A6IDBcclxuXHRcdH0sIGR1cmF0aW9uLCBmdW5jdGlvbiAoKXtcclxuXHRcdFx0YWN0aXZlSXRlbS5yZW1vdmVDbGFzcygnYWN0aXZlJykuY3NzKCd0b3AnLCBgJHstc3RyYWZlUGVyY30lYCk7XHJcblx0XHRcdCQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cclxuXHRcdFx0aW5Qcm9ncmVzcyA9IGZhbHNlO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHQkKCcuanNfX3NsaWRlci1jb250cm9scycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblxyXG5cdFx0aWYgKGluUHJvZ3Jlc3MpIHJldHVybjtcclxuXHJcblx0XHRpblByb2dyZXNzID0gdHJ1ZTtcclxuXHJcblx0XHRtb3ZlU2xpZGVzKCQoJy5zbGlkZXJfX3ByZXYnKSwgJ2Rvd24nKTtcclxuXHRcdG1vdmVTbGlkZXMoJCgnLnNsaWRlcl9fbmV4dCcpLCAndXAnKTtcclxuXHRcdGNvdW50ZXIrKztcclxuXHR9KTtcclxuXHJcbn0pOyIsIi8vIGpzINGE0LDQudC7INC00LvRjyDQsNC90LjQvNCw0YbQuNC4INCz0LvQsNCy0L3QvtCz0L4g0LTQuNGB0L/Qu9C10Y8iLCIvLyDQkdC40LHQu9C40L7RgtC10LrQsCBzdmc0ZXZlcnlib2R5INC00LvRjyBzdmdcclxuXHJcbiQoZnVuY3Rpb24oKXtcclxuXHRzdmc0ZXZlcnlib2R5KCk7XHJcbn0pIl19
