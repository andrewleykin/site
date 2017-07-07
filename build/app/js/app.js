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
// js для Липкого сайдбара на странице Блог

(function() {

    // задаем переменные
    var sidebar = $('.sidebar'),
        sidebarFix = 'sidebar__fixed',
        scrollHeight = 650;

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
            } else if ($(this).scrollTop() < scrollHeight) {
                sidebar.removeClass(sidebarFix);
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

// Библиотека svg4everybody для svg

$(function(){
	svg4everybody();
})
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lbnUuanMiLCJwYXJhbGxheC5qcyIsInByZWxvYWRlci5qcyIsInZhbGlkYXRlLmpzIiwic2Nyb2xsLmpzIiwiaW5kZXgtcGFyYWxsYXguanMiLCJmbGlwLmpzIiwic3RpY2t5LXNpZGViYXIuanMiLCJuYXYtc2lkZWJhci5qcyIsImNpcmNsZS1hbmltYXRlLmpzIiwibWFwLmpzIiwic3ZnNGV2ZXJ5Ym9keS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25LQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGpzINC00LvRjyDQvNC10L3RjlxyXG5cclxuKGZ1bmN0aW9uKCkge1xyXG4gICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgLy8g0J/QtdGA0LXQvNC10L3QvdGL0LVcclxuICB2YXIgbGluayA9ICQoJy5oZWFkZXJfX21lbnUnKSxcclxuICAgICAgbGlua19fYWN0aXZlPSAnaGVhZGVyX19tZW51X19hY3RpdmUnLFxyXG4gICAgICBsaXN0ID0gJCgnLm1haW4tbWVudV9fbGlzdCcpLFxyXG4gICAgICBiZyA9ICQoJy5tYWluLW1lbnUnKSxcclxuICAgICAgc29jaWFsID0gJCgnLmhlYWRlcl9fc29jaWFsJyksXHJcbiAgICAgIGFuaW1hdGUgPSAnbWFpbi1tZW51X19hbmltYXRlJztcclxuXHJcbiAgICAvLyDQv9GA0L7QvNC40YEg0LrQvtGC0L7RgNGL0Lkg0LHRg9C00LXRgiDQv9GA0L7QstC10YDRj9GC0Ywg0L3QsNC70LjRh9C40LUg0YHRgdGL0LvQutC4KNCz0LDQvNCx0YPRgNCz0LXRgNCwKVxyXG4gICAgdmFyIG1lbnVQcm9taXNlID0gbmV3IFByb21pc2UgKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICBpZiAobGluay5sZW5ndGgpIHtcclxuICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVqZWN0KCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vINGE0YPQvdC60YbQuNGPINC/0YDQuCDQvdCw0LvQuNGH0LjQuCDRgdGB0YvQu9C60Lgo0LPQsNC80LHRg9GA0LPQtdGA0LApXHJcbiAgICBtZW51UHJvbWlzZS50aGVuKGZ1bmN0aW9uKCl7XHJcbiAgICAgIGxpbmsub24oJ2NsaWNrJywgY2xpY2tGdW5jdGlvbik7XHJcbiAgICB9KS5jYXRjaChmdW5jdGlvbigpe1xyXG4gICAgICByZXR1cm4gO1xyXG4gICAgfSk7XHJcblxyXG5cclxuXHJcbiAgLy8g0KTRg9C90LrRhtC40Y8g0L/RgNC4INC90LDQttCw0YLQuNC4INC90LAg0LzQtdC90Y4t0YjQsNC80LHRg9GA0LPQtdGAXHJcbiAgdmFyIGNsaWNrRnVuY3Rpb24gPSBmdW5jdGlvbiAoZSkge1xyXG4gIFx0ZS5wcmV2ZW50RGVmYXVsdCgpOyAvLyDQvtGC0LzQtdC90LAg0YHRgtCw0L3QtNCw0YDRgtC90YvRhSDQtNC10LnRgdCy0YLQudC4XHJcblxyXG4gIFx0JCh0aGlzKS50b2dnbGVDbGFzcyhsaW5rX19hY3RpdmUpOyAvLyDQuNC30LzQtdC90Y/QtdC8INC90LAg0LDQutGC0LjQstC90L7QtSDRgdC+0YHRgtC+0Y/QvdC40LVcclxuXHJcbiAgXHQvLyDQldGB0LvQuCDQutC90L7Qv9C60LAg0LDQutGC0LjQstC90LAg0YLQvlxyXG4gIFx0aWYobGluay5oYXNDbGFzcyhsaW5rX19hY3RpdmUpKSB7XHJcbiAgXHRcdGJnLmNzcygnZGlzcGxheScsICdibG9jaycpLmFkZENsYXNzKGFuaW1hdGUpOyAvLyDQvtGC0L7QsdGA0LDQt9C40YLRjCDQvNC10L3Rjiwg0Lgg0LTQvtCx0LDQstC40YLRjCDQutC70LDRgdGBINCw0L3QuNC80LDRhtC40LhcclxuICBcdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gIFx0XHRcdHNvY2lhbC5jc3MoJ29wYWNpdHknLCAnMCcpOyAvLyDRh9C10YDQtdC3IDIwMCDQvNC40LvQuNGB0LXQutGD0L3QtCDRgdC60YDRi9GC0Ywg0LjQutC+0L3QutC4XHJcbiAgXHRcdH0sMjAwKTtcclxuICAgIFx0Ly8g0YfQtdGA0LXQtyA3MDAg0LzQuNC70LjRgdC10LrRg9C90LQg0L7RgtC+0LHRgNCw0LbQsNGC0Ywg0YHQv9C40YHQvtC6INC80LXQvdGOXHJcbiAgICBcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgIFx0XHRsaXN0LmNzcygndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZVkoMCknKTtcclxuICAgIFx0fSw4MDApO1xyXG4gICAgfSBlbHNlIHsgLy8g0JXRgdC70Lgg0LrQvdC+0L/QutCwINC90LUg0LDQutGC0LjQstC90LBcclxuICAgICAgYmcuY3NzKCdkaXNwbGF5JywgJ25vbmUnKS5yZW1vdmVDbGFzcyhhbmltYXRlKTsgLy8g0YHQutGA0YvRgtGMINC80LXQvdGOLCDRg9C00LDQu9C40YLRjCDQutC70LDRgdGBINCw0L3QuNC80LDRhtC40LhcclxuICAgICAgc29jaWFsLmNzcygnb3BhY2l0eScsICcxJykgLy8g0L7RgtC+0LHRgNCw0LfQuNGC0Ywg0LjQutC+0L3QutC4XHJcbiAgICAgIGxpc3QuY3NzKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlWSgtMTAwJSknKTtcclxuICAgIH1cclxuXHJcblxyXG4gIH07XHJcbn0pKCk7IiwiLy8ganMg0LTQu9GPINC/0LDRgNCw0LvQu9Cw0LrRgSDRjdGE0YTQtdC60YLQsCwg0L3QsCDRhNC+0L3QtSDQs9C+0YBcclxuJ3VzZSBzY3RyaWN0JztcclxuXHJcbiQoZnVuY3Rpb24oKXtcclxuXHQvLyDQt9Cw0LTQsNGR0Lwg0L7QsdGJ0YPRjiDQv9C10YDQtdC80LXQvdC90YPRjlxyXG5cdHZhciBzdmdUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzX19oZWFkZXItdGV4dCcpO1xyXG5cclxuXHQvLyDQv9GA0L7QvNC40YEg0LrQvtGC0L7RgNGL0Lkg0LHRg9C00LXRgiDQv9GA0L7QstC10YDRj9GC0Ywg0L3QsNC70LjRh9C40LUgc3ZnVGV4dCDQsiBwYWdlLWhlYWRlclxyXG5cdHZhciBwYXJhbGxheFByb21pc2UgPSBuZXcgUHJvbWlzZSAoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblx0XHRcdGlmIChzdmdUZXh0KSB7XHJcblx0XHRcdFx0cmVzb2x2ZSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblxyXG5cclxuXHQvLyDRhNGD0L3QutGG0LjRjyDQtNC70Y8gcGFyYWxsYXgg0L/RgNC4INGB0LrRgNC+0LvQtVxyXG5cdHZhciBwYXJhbGxheCA9IChmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgaW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2UtaGVhZGVyX19pbWcnKTtcclxuXHRcdHZhciB1c2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnVzZXItYmxvY2tfX3RvcCcpO1xyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdG1vdmU6IGZ1bmN0aW9uKGJsb2NrLCB3aW5kb3dTY3JvbGwsIHN0cmFmZUFtb3VudCkge1xyXG5cdFx0XHRcdHZhciBzdHJhZmUgPSB3aW5kb3dTY3JvbGwgLyAtc3RyYWZlQW1vdW50ICsgJyUnO1xyXG5cdFx0XHRcdHZhciB0cmFuc2Zvcm1TdHJpbmcgPSAndHJhbnNsYXRlM2QoMCwnICsgc3RyYWZlICsgJywwKSc7XHJcblxyXG5cdFx0XHRcdGJsb2NrLnN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcclxuXHRcdFx0fSxcclxuXHRcdFx0aW5pdDogZnVuY3Rpb24gKHdTY3JvbGwpIHtcclxuXHRcdFx0XHR0aGlzLm1vdmUoaW1nLCB3U2Nyb2xsLCA0NSk7XHJcblx0XHRcdFx0dGhpcy5tb3ZlKHN2Z1RleHQsIHdTY3JvbGwsIDMwKTtcclxuXHRcdFx0XHR0aGlzLm1vdmUodXNlciwgd1Njcm9sbCwgMTApO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSgpKTtcclxuXHR3aW5kb3cub25zY3JvbGwgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgd1Njcm9sbCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcclxuXHRcdGlmIChzdmdUZXh0KSB7XHJcblx0XHRcdFx0cGFyYWxsYXguaW5pdCh3U2Nyb2xsKTtcclxuXHRcdFx0fVxyXG5cdFx0Ly8g0YTRg9C90LrRhtC40Y8g0L/RgNC4INC90LDQu9C40YfQuNC4IHN2Z1RleHQg0LIgcGFnZS1oZWFkZXJcclxuXHRcdC8vIHBhcmFsbGF4UHJvbWlzZS50aGVuKGZ1bmN0aW9uKCl7XHJcblx0XHQvLyBcdHBhcmFsbGF4LmluaXQod1Njcm9sbCk7XHJcblx0XHQvLyB9KTtcclxuXHR9XHJcbn0pXHJcblxyXG4iLCIvLyBqcyDRhNCw0LnQuyDQtNC70Y8g0L/RgNC10LvQvtCw0LTQtdGA0LAg0L3QsCDQu9GO0LHRi9GFINGB0YLRgNCw0L3QuNGG0LDRhVxyXG5cclxuXHQvLyDQt9Cw0LTQsNGR0Lwg0L/QtdGA0LXQvNC10L3QvdGL0LVcclxuXHR2YXIgaW1hZ2VzID0gJCgnaW1nJyksXHJcblx0XHRpbWFnZXNUb3RhbENvdW50ID0gaW1hZ2VzLmxlbmd0aCxcclxuXHRcdGltYWdlc0xvYWRlZENvdW50ID0gMCxcclxuXHRcdHBlcmNEaXNwbGF5ID0gJCgnLnByZWxvYWRlcl9fcGVyY2VudCcpLFxyXG5cdFx0cHJlbG9hZGVyID0gJCgnLnByZWxvYWRlcicpLFxyXG5cdFx0cm91bmRzID0gJCgnLnByZWxvYWRlcl9fcm91bmRzJyksXHJcblx0XHRzdHJva2VHbG9iYWwgPSA0NTAsXHJcblx0XHRzdHJva2VTdGFydCA9IDQ1MCxcclxuXHRcdHN0cm9rZURhc2hvZmZzZXQ7XHJcblxyXG5cdC8vINC/0YDQvtC80LjRgSDQutC+0YLQvtGA0YvQuSDQsdGD0LTQtdGCINC/0YDQvtCy0LXRgNGP0YLRjCDQvdCw0LvQuNGH0LjQtSDQv9GA0LXQu9C+0LDQtNC10YDQsCDQvdCwINGB0YLRgNCw0L3QuNGG0LVcclxuXHR2YXIgcHJlbG9hZGVyUHJvbWlzZSA9IG5ldyBQcm9taXNlIChmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHRcdFx0aWYgKHByZWxvYWRlci5sZW5ndGgpIHtcclxuXHRcdFx0XHRyZXNvbHZlKCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmVqZWN0KCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHQvLyDRhNGD0L3QutGG0LjRjyDQv9GA0Lgg0L3QsNC70LjRh9C40Lgg0L/RgNC10LvQvtCw0LTQtdGA0LAg0L3QsCDRgdGC0YDQsNC90LjRhtC1XHJcblx0cHJlbG9hZGVyUHJvbWlzZS50aGVuKGZ1bmN0aW9uKCl7XHJcblxyXG5cdFx0Ly8g0YbQuNC60Lsg0LTQu9GPINC/0LXRgNC10LHQuNGA0LDQvdC40Y8g0LLRgdC10YUg0LrQsNGA0YLQuNC90L7QulxyXG5cdFx0Zm9yICh2YXIgaT0wOyBpIDwgaW1hZ2VzVG90YWxDb3VudDsgaSsrKSB7XHJcblx0XHRcdGltYWdlQ2xvbmUgPSBuZXcgSW1hZ2UoKTtcclxuXHRcdFx0aW1hZ2VDbG9uZS5vbmxvYWQgPSBpbWFnZUxvYWRlZDtcclxuXHRcdFx0aW1hZ2VDbG9uZS5vbmVycm9yID0gaW1hZ2VMb2FkZWQ7XHJcblx0XHRcdGltYWdlQ2xvbmUuc3JjID0gaW1hZ2VzW2ldLnNyYztcclxuXHRcdH1cclxuXHJcblx0XHQvLyDRhNGD0L3QutGG0LjRjyDQtNC70Y8g0L/RgNC+0LLQtdGA0LrQuCDQt9Cw0LPRgNGD0LfQutC4INCy0YHQtdGFINC60LDRgNGC0LjQvdC+0LpcclxuXHRcdGZ1bmN0aW9uIGltYWdlTG9hZGVkKCkge1xyXG5cclxuXHRcdFx0Ly8g0YPQstC10LvQuNGH0LjQstCw0LXQvCDRh9C40YHQu9C+INC30LDQs9GA0YPQttC10L3QvdGL0YUg0LrQsNGA0YLQuNC90L7QulxyXG5cdFx0XHRpbWFnZXNMb2FkZWRDb3VudCsrO1xyXG5cclxuXHRcdFx0Ly8g0YHRh9C40YLQsNC10Lwg0L/RgNC+0YbQtdC90YIg0LfQsNCz0YDRg9C20LXQvdC90YvRhVxyXG5cdFx0XHR2YXIgcGVyYyA9IE1hdGgucm91bmQoKCgxMDAgLyBpbWFnZXNUb3RhbENvdW50KSAqIGltYWdlc0xvYWRlZENvdW50KSkgKyAnJSc7XHJcblx0XHRcdFxyXG5cdFx0XHQvLyDQstGL0LLQvtC00LjQvCDQvdCw0YjQtSDQt9C90LDRh9C10L3QuNC1INC/0YDQvtGG0LXQvdGC0L3QvtC1XHJcblx0XHRcdHBlcmNEaXNwbGF5Lmh0bWwocGVyYyk7XHJcblxyXG5cdFx0XHQvLyDRgdGH0LjRgtCw0LXQvCDQvtGC0L3QvtGB0LjRgtC10LvRjNC90L7QtSDQt9Cw0LrRgNCw0YHQutGDINC+0LHQstC+0LTQutC4INC60YDRg9Cz0LBcclxuXHRcdFx0c3Ryb2tlRGFzaG9mZnNldCA9IHN0cm9rZVN0YXJ0IC0gTWF0aC5yb3VuZCgoc3Ryb2tlR2xvYmFsIC8gaW1hZ2VzVG90YWxDb3VudCkpO1xyXG5cclxuXHRcdFx0Ly8g0LLRi9GH0LjRgtCw0LXQvCDRgdGC0LDRgNGC0L7QstGL0Lkg0L7RgtGH0ZHRglxyXG5cdFx0XHRzdHJva2VTdGFydCAtPSAoc3Ryb2tlR2xvYmFsIC8gaW1hZ2VzVG90YWxDb3VudCk7XHJcblxyXG5cdFx0XHQvLyDQv9GA0LjRgdCy0LDQuNCy0LDQtdC8INGC0L4g0YfRgtC+INC/0L7RgdGH0LjRgtCw0LvQuCwg0L3QsNGI0LXQvNGDINC60YDRg9Cz0YMg0YHQstCzXHJcblx0XHRcdHJvdW5kcy5jc3MoJ3N0cm9rZURhc2hvZmZzZXQnLCBzdHJva2VEYXNob2Zmc2V0KTtcclxuXHJcblx0XHRcdC8vINCV0YHQu9C4INCy0YHQtSDQutCw0YDRgtC40L3QutC4INC30LDQs9GA0YPQttC10L3QvdGLLCDRg9Cx0YDQsNGC0Ywg0LHQu9C+0Log0L/RgNC10LvQvtCw0LTQtdGAXHJcblx0XHRcdGlmKGltYWdlc0xvYWRlZENvdW50ID49IGltYWdlc1RvdGFsQ291bnQpIHtcclxuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRpZighcHJlbG9hZGVyLmhhc0NsYXNzKCdkb25lJykpe1xyXG5cdFx0XHRcdFx0XHRwcmVsb2FkZXIuYWRkQ2xhc3MoJ2RvbmUnKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LCAxMDAwKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0pLmNhdGNoKGZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4gO1xyXG5cdFx0fSk7XHJcblxyXG5cclxuIiwiLy8ganMg0YTQsNC50Lsg0LTQu9GPINCy0LDQu9C40LTQsNGG0LjQuCDRhNC+0YDQvFxyXG5cclxuXHJcbihmdW5jdGlvbiggJCApe1xyXG5cclxuXHJcblx0JChmdW5jdGlvbigpe1xyXG5cclxuXHRcdC8vINC30LDQtNCw0LXQvCDQv9C10YDQtdC80LXQvdC90YvQtVxyXG5cdFx0dmFyIGZvcm0gICAgICAgPSAkKCcuanNfX2Zvcm0nKSxcclxuXHRcdFx0XHRpbnB1dCAgICAgID0gZm9ybS5maW5kKCcuanNfX2lucHV0JyksXHJcblx0XHRcdFx0YnRuICAgICAgICA9IGZvcm0uZmluZCgnLmpzX19mb3JtLWJ0bicpLFxyXG5cdFx0XHRcdGJ0blJlc2V0ICAgPSBmb3JtLmZpbmQoJy5qc19fZm9ybS1idG4tLXJlc2V0JyksXHJcblx0XHRcdFx0aWNvbiAgICAgICA9IGZvcm0uZmluZCgnLmpzX19mb3JtLWljb24nKSxcclxuXHRcdFx0XHRjaGVjayAgICAgID0gZm9ybS5maW5kKCcuanNfX2NoZWNrJyksXHJcblx0XHRcdFx0ZW1haWwgICAgICA9IGZvcm0uZmluZCgnLmpzX19mb3JtLWVtYWlsJyksXHJcblx0XHRcdFx0cGF0dGVybiAgICA9IC9eW2EtejAtOV8tXStAW2EtejAtOS1dK1xcLlthLXpdezIsNn0kL2ksXHJcblx0XHRcdFx0dmFsaWQgICAgICA9IHRydWUsXHJcblx0XHRcdFx0aW5wdXRFcnJvciA9ICdmb3JtX19pbnB1dC0tZXJyb3InLFxyXG5cdFx0XHRcdGlucHV0U3VjY2VzcyA9ICdmb3JtX19pbnB1dC0tc3VjY2VzcycsXHJcblx0XHRcdFx0aWNvbkVycm9yICAgID0gJ2Zvcm1fX2ljb24tLWVycm9yJyxcclxuXHRcdFx0XHRpY29uU3VjY2VzcyAgPSAnZm9ybV9faWNvbi0tc3VjY2Vzcyc7XHJcblxyXG5cdFx0Ly8g0YTRg9C90LrRhtC40Y8g0LLQsNC70LjQtNCw0YbQuNGPINGE0L7RgNC80YtcclxuXHRcdHZhciB2YWxpZEZ1bmMgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0XHQvLyDQv9GA0L7QstC10YDRj9C10Lwg0LrQsNC20LTRi9C5IGlucHV0XHJcblx0XHRcdGlucHV0LmVhY2goZnVuY3Rpb24oaSkge1xyXG5cclxuXHRcdFx0XHQvLyDQv9GA0L7QstC10YDRj9C10Lwg0YPRgdC70L7QstC40LUsINC10YHRgtGMINC70Lgg0LIg0L/QvtC70LUg0YfRgtC+LdC90LjQtNGMXHJcblx0XHRcdFx0aWYoJCh0aGlzKS52YWwoKSAhPSAnJykge1xyXG5cdFx0XHRcdFx0JCh0aGlzKS5hZGRDbGFzcyhpbnB1dFN1Y2Nlc3MpOyBcclxuXHRcdFx0XHRcdGljb24uZXEoaSkuYWRkQ2xhc3MoaWNvblN1Y2Nlc3MpO1xyXG5cdFx0XHRcdFx0YnRuLnJlbW92ZUNsYXNzKCdqc19fZm9ybS1uby1zdWJtaXQnKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0JCh0aGlzKS5hZGRDbGFzcyhpbnB1dEVycm9yKTtcclxuXHRcdFx0XHRcdGljb24uZXEoaSkuYWRkQ2xhc3MoaWNvbkVycm9yKTtcclxuXHRcdFx0XHRcdGJ0bi5hZGRDbGFzcygnanNfX2Zvcm0tbm8tc3VibWl0Jyk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0fSk7IC8vIC0tPiDQt9Cw0LrQsNC90YfQuNCy0LDQtdC8INC/0YDQvtCy0LXRgNGP0YLRjCDQuNC90L/Rg9GC0YtcclxuXHJcblxyXG5cdFx0XHQvLyDRg9GB0LvQvtCy0LjRjyDQvdCw0LvQuNGH0LjRjyDRh9C10Lot0LjQvdC/0YPRgtC+0LJcclxuXHRcdFx0aWYoY2hlY2spIHtcclxuXHJcblx0XHRcdFx0Ly8g0L/RgNC+0LLQtdGA0Y/QtdC8INC60LDQttC00YvQuSDRh9C10Lot0LjQvdC/0YPRglxyXG5cdFx0XHRcdGNoZWNrLmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0XHRcdFx0Ly8g0L/RgNC+0LLQtdGA0Y/QtdC8INGD0YHQu9C+0LLQuNC1LCDQstGL0LHRgNCw0L0g0LvQuCDQuNC90L/Rg9GCXHJcblx0XHRcdFx0XHRpZigkKHRoaXMpLnByb3AoXCJjaGVja2VkXCIpKXtcclxuXHRcdFx0XHRcdFx0dmFsaWQgPSB0cnVlO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0dmFsaWQgPSBmYWxzZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHJldHVybiB2YWxpZDtcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0cmV0dXJuIHZhbGlkO1xyXG5cdFx0XHR9XHJcblxyXG5cclxuXHRcdFx0cmV0dXJuIHZhbGlkO1xyXG5cdFx0fSAvLyAtLT4gdmFsaWRGdW5jIGlzIGVuZFxyXG5cclxuXHJcblx0XHQvLyDRhNGD0L3QutGG0LjRjyDQtNC70Y8g0L/RgNC+0LLQtdGA0LrQuCBlbWFpbFxyXG5cdFx0dmFyIGVtYWlsRnVuYz0gZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdFx0Ly8g0L/RgNC+0LLQtdGA0Y/QtdC8INGD0YHQu9C+0LLQuNC1LCDQtdGB0YLRjCDQu9C4INGH0YLQvi3QvdC40LTRjCDQsiDQvdGR0LxcclxuXHRcdFx0aWYgKGVtYWlsLnZhbCgpICE9ICcnKSB7XHJcblxyXG5cdFx0XHRcdFx0Ly8g0L/RgNC+0LLQtdGA0Y/QtdC8LCDRgdC+0L7RgtCy0LXRgtGB0YLQstGD0LXRgiDQu9C4INGI0LDQsdC70L7QvdGDIGVtYWlsXHJcblx0XHRcdFx0XHRpZihlbWFpbC52YWwoKS5zZWFyY2gocGF0dGVybikgPT0gMCl7XHJcblx0XHRcdFx0XHRcdGVtYWlsLmFkZENsYXNzKGlucHV0U3VjY2Vzcyk7XHJcblx0XHRcdFx0XHRcdHZhbGlkID0gdHJ1ZTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdGVtYWlsLmFkZENsYXNzKGlucHV0RXJyb3IpO1xyXG5cdFx0XHRcdFx0XHR2YWxpZCA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRlbWFpbC5hZGRDbGFzcyhpbnB1dEVycm9yKTtcclxuXHRcdFx0XHRcdHZhbGlkID0gZmFsc2VcclxuXHRcdFx0XHR9XHJcblxyXG5cclxuXHRcdFx0cmV0dXJuIHZhbGlkO1xyXG5cdFx0fSAvLyAtLT4gZW1haWxGdW5jIGlzIGVuZFxyXG5cclxuXHJcblx0XHQvLyDRhNGD0L3QutGG0LjRjyDQtNC70Y8gZW1haWwsINC60L7Qs9C00LAg0L/QvtC60LjQtNCw0YjRjCDQuNC90L/Rg9GCXHJcblx0XHRlbWFpbC5ibHVyKGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0Ly8g0L/RgNC+0LLQtdGA0Y/QtdC8IGVtYWlsLCDQvdCwINC90LDQu9C40YfQuNC1INGH0LXQs9C+LdC90LjQtNGMXHJcblx0XHRcdGlmIChlbWFpbC52YWwoKSAhPSAnJykge1xyXG5cclxuXHRcdFx0XHQvLyDRgdC+0L7RgtCy0LXRgtGB0YLQstGD0LXRgiDQu9C4INC90LDRiNC10LzRgyDRiNCw0LHQu9C+0L3Rg1xyXG5cdFx0XHRcdGlmKGVtYWlsLnZhbCgpLnNlYXJjaChwYXR0ZXJuKSA9PSAwKXtcclxuXHRcdFx0XHRcdGVtYWlsLmFkZENsYXNzKGlucHV0U3VjY2Vzcyk7XHJcblx0XHRcdFx0XHR2YWxpZCA9IHRydWU7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGVtYWlsLmFkZENsYXNzKGlucHV0RXJyb3IpO1xyXG5cdFx0XHRcdFx0dmFsaWQgPSBmYWxzZVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRlbWFpbC5hZGRDbGFzcyhpbnB1dEVycm9yKTtcclxuXHRcdFx0XHR2YWxpZCA9IGZhbHNlXHJcblx0XHRcdH1cclxuXHJcblx0XHR9KTtcclxuXHJcblxyXG5cdFx0Ly8g0L/RgNC+0LLQtdGA0Y/QtdC8INC60LDQttC00YvQuSDQuNC90L/Rg9GCXHJcblx0XHRpbnB1dC5lYWNoKGZ1bmN0aW9uKGkpIHtcclxuXHJcblx0XHRcdC8vINC00LvRjyDQutCw0LbQtNC+0LPQviDQuNC90L/Rg9GC0LAg0L/RgNC4INC/0L7QutC40LTQsNC90LjQuCDQv9C+0LvRj1xyXG5cdFx0XHQkKHRoaXMpLmJsdXIoZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0XHRcdC8vINC/0YDQvtCy0LXRgNGP0LXQvCDQvdCw0LvQuNGH0LjQtSDRh9C10LPQvi3Qu9C40LHQvlxyXG5cdFx0XHRcdGlmKCQodGhpcykudmFsKCkgIT0gJycpIHtcclxuXHRcdFx0XHRcdCQodGhpcykuYWRkQ2xhc3MoaW5wdXRTdWNjZXNzKTtcclxuXHRcdFx0XHRcdGljb24uZXEoaSkuYWRkQ2xhc3MoaWNvblN1Y2Nlc3MpO1xyXG5cdFx0XHRcdFx0YnRuLnJlbW92ZUNsYXNzKCdqc19fZm9ybS1uby1zdWJtaXQnKVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQkKHRoaXMpLmFkZENsYXNzKGlucHV0RXJyb3IpO1xyXG5cdFx0XHRcdFx0aWNvbi5lcShpKS5hZGRDbGFzcyhpY29uRXJyb3IpO1xyXG5cdFx0XHRcdFx0YnRuLmFkZENsYXNzKCdqc19fZm9ybS1uby1zdWJtaXQnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdH0pO1xyXG5cclxuXHJcblx0XHQvLyDQv9GA0Lgg0LrQu9C40LrQtSDQvdCwINC60L3QvtC/0LrRgyDQvtGC0L/RgNCw0LLQutC4XHJcblx0XHRidG4uY2xpY2soZnVuY3Rpb24oZSkge1xyXG5cclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR2YWxpZEZ1bmMoKTtcclxuXHJcblx0XHRcdC8vINC10YHQu9C4INC10YHRgtGMIGVtYWlsXHJcblx0XHRcdGlmKGVtYWlsKSB7XHJcblx0XHRcdFx0ZW1haWxGdW5jKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vINC/0YDQvtCy0LXRgNGP0YLRjCDRg9GB0LvQvtCy0LjQtSDQtdGB0YLRjCDQu9C4INC60LvQsNGB0YFcclxuXHRcdFx0aWYoYnRuLmhhc0NsYXNzKCdqc19fZm9ybS1uby1zdWJtaXQnKSkge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRmb3JtLnN1Ym1pdCgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0fSk7XHJcblxyXG5cclxuXHRcdC8vINC/0YDQuCDQutC70LjQutC1INC90LAg0LrQvdC+0L/QutGDIFwi0L7Rh9C40YHRgtC40YLRjFwiXHJcblx0XHRidG5SZXNldC5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdFx0aW5wdXQuYWRkKGVtYWlsKS5yZW1vdmVDbGFzcyhpbnB1dEVycm9yLCBpbnB1dFN1Y2Nlc3MpO1xyXG5cdFx0XHRpY29uLnJlbW92ZUNsYXNzKGljb25FcnJvciwgaWNvblN1Y2Nlc3MpO1xyXG5cdFx0fSk7XHJcblxyXG5cclxuXHR9KTsgLy8gLS0+IHJlYWR5IGVuZFxyXG5cclxufSkoIGpRdWVyeSApOyIsIi8vIGpzINC00LvRjyDRgdC60YDQvtC70LvQsCDQstC90LjQtyDQuNC70Lgg0LLQstC10YDRhVxyXG4ndXNlIHNjdHJpY3QnO1xyXG5cclxuJChmdW5jdGlvbiAoKXtcclxuXHJcblx0Ly8g0LfQsNC00LDRkdC8INC/0LXRgNC10LzQtdC90L3Ri9C1XHJcblx0dmFyIGJvZHkgPSAkKCdib2R5LCBodG1sJyksXHJcblx0XHRhcnJvd0Rvd24gPSAkKCcuanNfX2Fycm93LWRvd24nKSxcclxuXHRcdGFycm93VXAgPSAkKCcuanNfX2Fycm93LXVwJyksXHJcblx0XHRoZWFkZXJIZWlnaHQgPSAkKCcuanNfX2hlYWRlcicpLmhlaWdodCgpO1xyXG5cclxuXHQvLyDQv9GA0L7QstC10YDRj9C10Lwg0L3QsNC70LjRh9C40LUg0YHRgtGA0LXQu9C60LggLS0g0LLQvdC40LdcclxuXHRpZihhcnJvd0Rvd24pe1xyXG5cdFx0Ly8g0YTRg9C90LrRhtC40Y8g0L/RgNC4INC90LDQttCw0YLQuNC4XHJcblx0XHRhcnJvd0Rvd24uY2xpY2soZnVuY3Rpb24oKXtcclxuXHRcdFx0Ly8g0LDQvdC40LzQsNGG0LjRjyDRgdC60YDQvtC70LvQsFxyXG5cdFx0XHRib2R5LmFuaW1hdGUoe3Njcm9sbFRvcDogaGVhZGVySGVpZ2h0fSwgMTUwMCk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdC8vINC/0YDQvtCy0LXRgNGP0LXQvCDQvdCw0LvQuNGH0LUg0YHRgtGA0LXQu9C60LggLS0g0LLQstC10YDRhVxyXG5cdGlmKGFycm93VXApIHtcclxuXHRcdC8vINGE0YPQvdC60YbQuNGPINC/0YDQuCDQvdCw0LbQsNGC0LjQuFxyXG5cdFx0YXJyb3dVcC5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdFx0Ly8g0LDQvdC40LzQsNGG0LjRjyDRgdC60YDQvtC70LvQsFxyXG5cdFx0XHRib2R5LmFuaW1hdGUoe3Njcm9sbFRvcDogMH0sIDI1MDApO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxufSk7XHJcbiIsIi8vIGpzINC00LvRjyBpbmRleC1wYXJhbGxheFxyXG5cclxuJChmdW5jdGlvbigpe1xyXG5cclxuXHQvLyDQt9Cw0LTQsNGR0Lwg0L/QtdGA0LXQvNC10L3QvdGL0LVcclxuXHR2YXIgcGFyYWxsYXhDb250YWluZXIgPSAkKCcucGFyYWxsYXgnKSxcclxuXHRcdGxheWVycyA9ICQoJy5wYXJhbGxheF9fbGF5ZXInKTtcclxuXHJcblxyXG5cdC8vINC/0YDQvtC80LjRgSDQutC+0YLQvtGA0YvQuSDQsdGD0LTQtdGCINC/0YDQvtCy0LXRgNGP0YLRjCDQvdCw0LvQuNGH0LjQtSDQk9C70LDQstC90L7Qs9C+INC/0LDRgNCw0LvQu9Cw0LrRgdCwINC90LAg0YHRgtGA0LDQvdC40YbQtVxyXG5cdHZhciBwYXJhbGxheFByb21pc2UgPSBuZXcgUHJvbWlzZSAoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblx0XHRcdGlmIChwYXJhbGxheENvbnRhaW5lci5sZW5ndGgpIHtcclxuXHRcdFx0XHRyZXNvbHZlKCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmVqZWN0KCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHQvLyDRhNGD0L3QutGG0LjRjyDQv9GA0Lgg0L3QsNC70LjRh9C40Lgg0LPQu9Cw0LLQvdC+0LPQviDQv9Cw0YDQsNC70LvQsNC60YHQsFxyXG5cdHBhcmFsbGF4UHJvbWlzZS50aGVuKGZ1bmN0aW9uKCl7XHJcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgbW92ZUxheWVycyk7XHJcblx0fSkuY2F0Y2goZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiA7XHJcblx0XHR9KTtcclxuXHJcblx0Ly8g0YTRg9C90LrRhtC40Y8g0LTQu9GPINC00LLQuNC20LXQvdC40Y8g0YHQu9C+0ZHQslxyXG5cdHZhciBtb3ZlTGF5ZXJzID0gZnVuY3Rpb24gKGUpIHtcclxuXHRcdHZhciBpbml0aWFsWCA9ICh3aW5kb3cuaW5uZXJXaWR0aCAvIDIpIC0gZS5wYWdlWCxcclxuXHRcdFx0aW5pdGlhbFkgPSAod2luZG93LmlubmVySGVpZ2h0IC8gMikgLSBlLnBhZ2VZO1xyXG5cclxuXHRcdFtdLnNsaWNlLmNhbGwobGF5ZXJzKS5mb3JFYWNoKGZ1bmN0aW9uKGxheWVyLCBpbmRleCkge1xyXG5cdFx0XHR2YXIgZGl2aWRlciA9IGluZGV4IC8gMTAwLFxyXG5cdFx0XHRcdHBvc2l0aW9uWCA9IGluaXRpYWxYICogZGl2aWRlcixcclxuXHRcdFx0XHRwb3NpdGlvblkgPSBpbml0aWFsWSAqIGRpdmlkZXIsXHJcblx0XHRcdFx0dHJhbnNmb3JtU3RyaW5nID0gJ3RyYW5zbGF0ZSgnICsgcG9zaXRpb25YICsgJ3B4LCcgKyBwb3NpdGlvblkgKyAncHgpJztcclxuXHJcblx0XHRcdGxheWVyLnN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcclxuXHRcdH0pO1xyXG5cdH07XHJcbn0pOyIsIi8vIEZsaXAg0Y3RhNGE0LXQutGCXHJcblxyXG4kKGZ1bmN0aW9uKCl7XHJcblxyXG5cdC8vINC30LDQtNCw0ZHQvCDQv9C10YDQtdC80LXQvdC90YvQtVxyXG5cdHZhciBsaW5rID0gJCgnLmJ0bi1hdXRob19fbGluaycpLFxyXG5cdFx0Ym94ID0gJCgnLmZsaXAnKSxcclxuXHRcdG1haW5MaW5rID0gJCgnLmxvZ2luX19saW5rJyk7IFxyXG5cclxuXHQvLyDQv9GA0L7QvNC40YEg0LrQvtGC0L7RgNGL0Lkg0LHRg9C00LXRgiDQv9GA0L7QstC10YDRj9GC0Ywg0L3QsNC70LjRh9C40LUg0YTQu9C40L8g0LrQvtGC0LXQudC90LXRgNCwINC90LAg0YHRgtGA0LDQvdC40YbQtVxyXG5cdHZhciBmbGlwUHJvbWlzZSA9IG5ldyBQcm9taXNlIChmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHRcdFx0aWYgKGJveC5sZW5ndGgpIHtcclxuXHRcdFx0XHRyZXNvbHZlKCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmVqZWN0KCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHQvLyDRhNGD0L3QutGG0LjRjyDQv9GA0Lgg0L3QsNC70LjRh9C40Lgg0YTQu9C40L8g0LrQvtC90YLQtdC50L3QtdGA0LVcclxuXHRmbGlwUHJvbWlzZS50aGVuKGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdC8vINC/0YDQuCDQutC70LjQutC1LCDRhNC70LjQvyDQutC+0L3RgtC10L3QtdC50YDRgyDQtNC+0LHQsNCy0LjRgtGMINC60LvQsNGB0YEg0YEg0L/QvtCy0L7RgNC+0YLQvtC8XHJcblx0XHRsaW5rLmNsaWNrKGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpOyAvLyDQvtGC0LzQtdC90LAg0YHRgtCw0L3QtNCw0YDRgtC90YvRhSDQtNC10LnRgdCy0YLQudC4XHJcblxyXG5cdFx0XHRib3gudG9nZ2xlQ2xhc3MoJ2pzX19mbGlwJyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQvLyDQv9GA0Lgg0LrQu9C40LrQtSAg0L3QsCBcItCd0LAg0LPQu9Cw0LLQvdGD0Y5cIiwg0YPQtNCw0LvQuNGC0Ywg0LrQu9Cw0YHRgSDQv9C+0LLQvtGA0L7RgtCwLCDRgtC10Lwg0YHQsNC80YvQvCDRgNCw0LfQstC10YDQvdGD0LIg0LrQvtC90YLQtdC50L3QtdGAXHJcblx0XHRtYWluTGluay5jbGljayhmdW5jdGlvbihlKSB7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTsgLy8g0L7RgtC80LXQvdCwINGB0YLQsNC90LTQsNGA0YLQvdGL0YUg0LTQtdC50YHQstGC0LnQuFxyXG5cclxuXHRcdFx0Ym94LnJlbW92ZUNsYXNzKCdqc19fZmxpcCcpO1xyXG5cdFx0fSk7XHJcblx0fSkuY2F0Y2goZnVuY3Rpb24oKXtcclxuXHRcdFx0cmV0dXJuIDtcclxuXHRcdH0pO1xyXG5cclxufSk7IiwiLy8ganMg0LTQu9GPINCb0LjQv9C60L7Qs9C+INGB0LDQudC00LHQsNGA0LAg0L3QsCDRgdGC0YDQsNC90LjRhtC1INCR0LvQvtCzXHJcblxyXG4oZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgLy8g0LfQsNC00LDQtdC8INC/0LXRgNC10LzQtdC90L3Ri9C1XHJcbiAgICB2YXIgc2lkZWJhciA9ICQoJy5zaWRlYmFyJyksXHJcbiAgICAgICAgc2lkZWJhckZpeCA9ICdzaWRlYmFyX19maXhlZCcsXHJcbiAgICAgICAgc2Nyb2xsSGVpZ2h0ID0gNjUwO1xyXG5cclxuICAgIC8vINC/0YDQvtC80LjRgSDQutC+0YLQvtGA0YvQuSDQsdGD0LTQtdGCINC/0YDQvtCy0LXRgNGP0YLRjCDQvdCw0LvQuNGH0LjQtSDQodCw0LnQtNCx0LDRgNCwINC90LAg0YHRgtGA0LDQvdC40YbQtVxyXG4gICAgdmFyIHNpZGViYXJQcm9taXNlID0gbmV3IFByb21pc2UgKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGlmIChzaWRlYmFyLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVqZWN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8g0YTRg9C90LrRhtC40Y8g0L/RgNC4INC90LDQu9C40YfQuNC4INGB0LDQudC00LHQsNGA0LBcclxuICAgIHNpZGViYXJQcm9taXNlLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAvKiDQtdGB0LvQuCDRgdC60YDQvtC70Lsg0LHQvtC70YzRiNC1INC30LDQtNCw0L3QvdC+0Lkg0LLRi9GB0L7RgtGLLCDRgtC+INC00L7QsdCw0LLQuNGC0Ywg0LrQu9Cw0YHRgSAqL1xyXG4gICAgICAgICAgICBpZigkKHRoaXMpLnNjcm9sbFRvcCgpID4gc2Nyb2xsSGVpZ2h0KXtcclxuICAgICAgICAgICAgICAgIHNpZGViYXIuYWRkQ2xhc3Moc2lkZWJhckZpeCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA8IHNjcm9sbEhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgc2lkZWJhci5yZW1vdmVDbGFzcyhzaWRlYmFyRml4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSkuY2F0Y2goZnVuY3Rpb24oKXtcclxuICAgICAgICByZXR1cm4gO1xyXG4gICAgfSk7XHJcblxyXG59KSgpOyIsIi8vIGpzINC00LvRjyDQvdCw0LLQuNCz0LDRhtC40Lgg0L3QsCDRgdGC0YDQsNC90LjRhtC1INCR0LvQvtCzXHJcblxyXG4oZnVuY3Rpb24oKSB7XHJcblxyXG5cdC8vINC/0LXRgNC10LzQtdC90L3Ri9C1XHJcblx0dmFyIGxpbmsgPSAkKCcuc2lkZWJhcl9fbGluaycpLFxyXG5cdFx0aXRlbSA9ICQoJy53cml0ZV9faXRlbScpO1xyXG5cclxuXHQkKGZ1bmN0aW9uKCl7XHJcblxyXG5cdFx0Ly8g0L/RgNC+0LzQuNGBINC60L7RgtC+0YDRi9C5INCx0YPQtNC10YIg0L/RgNC+0LLQtdGA0Y/RgtGMINC90LDQu9C40YfQuNC1INCh0LDQudC00LHQsNGA0LAg0L3QsCDRgdGC0YDQsNC90LjRhtC1XHJcblx0XHR2YXIgbmF2U2lkZWJhclByb21pc2UgPSBuZXcgUHJvbWlzZSAoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblx0XHRcdGlmIChsaW5rLmxlbmd0aCkge1xyXG5cdFx0XHRcdHJlc29sdmUoKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZWplY3QoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8g0YTRg9C90LrRhtC40Y8g0L/RgNC4INC90LDQu9C40YfQuNC4INGB0LDQudC00LHQsNGA0LBcclxuXHRcdG5hdlNpZGViYXJQcm9taXNlLnRoZW4oZnVuY3Rpb24oKSB7XHJcblx0XHRcdGxpbmsuY2xpY2soZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdFx0c2hvd0FydGljbGUoJCh0aGlzKS5hdHRyKCdocmVmJyksIHRydWUpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pLmNhdGNoKGZ1bmN0aW9uKCl7XHJcblx0XHRcdHJldHVybiA7XHJcblx0XHR9KTtcclxuXHJcblxyXG5cdH0pO1xyXG5cclxuXHQvLyDQv9GA0Lgg0YHQutGA0L7Qu9C70LUg0LLRi9C30YvQstCw0YLRjCDRhNGD0L3QutGG0LjRjiBjaGVja0FydGljbGVcclxuXHQkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xyXG5cdFx0Y2hlY2tBcnRpY2xlKCk7XHJcblx0fSk7XHJcblxyXG5cclxuXHQvLyDRhNGD0L3QutGG0LjRjyDQtNC70Y8g0YHQutGA0L7Qu9C70LAg0Log0L3Rg9C20L3QvtC80YMg0Y3Qu9C10LzQtdC90YLRg1xyXG5cdGZ1bmN0aW9uIHNob3dBcnRpY2xlKGFydGljbGUsIGlzQW5pbWF0ZSkge1xyXG5cdFx0dmFyIGRpcmVjdGlvbiA9IGFydGljbGUucmVwbGFjZSgvIy8sICcnKSxcclxuXHRcdFx0cmVxQXJ0aWNsZSA9IGl0ZW0uZmlsdGVyKCdbZGF0YS1hcnRpY2xlPVwiJyArIGRpcmVjdGlvbiArICdcIl0nKSxcclxuXHRcdFx0cmVxQXJ0aWNsZVBvcyA9IHJlcUFydGljbGUub2Zmc2V0KCkudG9wO1xyXG5cclxuXHRcdGlmIChpc0FuaW1hdGUpIHtcclxuXHRcdFx0JCgnYm9keSwgaHRtbCcpLmFuaW1hdGUoe3Njcm9sbFRvcDogcmVxQXJ0aWNsZVBvc30sIDUwMCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvLyDRhNGD0L3QutGG0LjRjyDQtNC70Y8g0LDQstGC0L7QvNCw0YLQuNGH0LXRgdC60LXQs9C+INC/0LXRgNC10LrQu9GO0YfQtdC90LjRjyDQutC70LDRgdGB0LAgYWN0aXZlINGDINGB0YHRi9C70L7QulxyXG5cdGZ1bmN0aW9uIGNoZWNrQXJ0aWNsZSgpIHtcclxuXHRcdGl0ZW0uZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyICR0aGlzID0gJCh0aGlzKSxcclxuXHRcdFx0XHR0b3BFZGdlID0gJHRoaXMub2Zmc2V0KCkudG9wIC0gMTUwLFxyXG5cdFx0XHRcdGJvdHRvbUVkZ2UgPSB0b3BFZGdlICsgJHRoaXMuaGVpZ2h0KCksXHJcblx0XHRcdFx0d1Njcm9sbCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcclxuXHJcblx0XHRcdGlmICh0b3BFZGdlIDwgd1Njcm9sbCAmJiBib3R0b21FZGdlID4gd1Njcm9sbCkge1xyXG5cdFx0XHRcdHZhciBjdXJyZW50SWQgPSAkdGhpcy5kYXRhKCdhcnRpY2xlJyksXHJcblx0XHRcdFx0XHRyZXFMaW5rID0gbGluay5maWx0ZXIoJ1tocmVmPVwiIycgKyBjdXJyZW50SWQgKyAnXCJdJyk7XHJcblxyXG5cdFx0XHRcdFx0bGluay5yZW1vdmVDbGFzcygnc2lkZWJhcl9fbGluay0tYWN0aXZlJyk7XHJcblx0XHRcdFx0XHRyZXFMaW5rLmFkZENsYXNzKCdzaWRlYmFyX19saW5rLS1hY3RpdmUnKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHJcbn0pKCk7ICIsIi8vIGpzINGE0LDQudC7INC00LvRjyDQsNC90LjQvNCw0YbQuNC4INC60YDRg9Cz0L7QsiDRgdC60LjQu9C70L7QslxyXG5cclxuJChmdW5jdGlvbigpe1xyXG5cdC8vINC/0LXRgNC10LzQtdC90L3QsNGPINCx0LvQvtC60Lgg0YHQutC40LvQu9C+0LJcclxuXHR2YXIgZWxlbSA9ICQoJy5za2lsbHNfX2l0ZW1zLXdyYXAnKTtcclxuXHJcblx0Ly8g0L/RgNC+0LzQuNGBINC60L7RgtC+0YDRi9C5INCx0YPQtNC10YIg0L/RgNC+0LLQtdGA0Y/RgtGMINC90LDQu9C40YfQuNC1INCx0LvQvtC60LAg0YHQutC40LvQu9C+0LJcclxuXHR2YXIgc2tpbGxzUHJvbWlzZSA9IG5ldyBQcm9taXNlIChmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHRcdGlmIChlbGVtLmxlbmd0aCkge1xyXG5cdFx0cmVzb2x2ZSgpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdHJlamVjdCgpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQvLyDRhNGD0L3QutGG0LjRjyDQv9GA0Lgg0L3QsNC70LjRh9C40Lgg0LHQu9C+0LrQsCDRgdC60LjQu9C70L7QslxyXG5cdHNraWxsc1Byb21pc2UudGhlbihmdW5jdGlvbigpe1xyXG5cdFx0Ly8g0L/RgNC4INGB0LrRgNC+0LvQu9C1IFxyXG5cdFx0JCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyIHNjcm9sbFRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcclxuXHJcblx0XHRcdC8qINC10YHQu9C4INGE0YPQvdC60YbQuNGPIGNoZWNrRGlzdGFuY2Ug0LLQtdGA0L3Rg9C70LAgcmV0dXJuINGC0L4sINC00L7QsdCw0LLQuNGC0Ywg0LrQu9Cw0YHRgSAvINC40L3QsNGH0LUg0YPQtNCw0LvQuNGC0YwgKi9cclxuXHRcdFx0aWYoY2hlY2tEaXN0YW5jZShzY3JvbGxUb3ApKSB7XHJcblx0XHRcdFx0ZWxlbS5hZGRDbGFzcygnanNfX2NpcmNsZS1hbmltYXRlJyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0ZWxlbS5yZW1vdmVDbGFzcygnanNfX2NpcmNsZS1hbmltYXRlJyk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH0pLmNhdGNoKGZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4gO1xyXG5cdH0pO1xyXG5cclxuXHQvLyDRhNGD0L3QutGG0LjRjyDQtNC70Y8g0L/RgNC+0LLQtdGA0LrQuCDQv9C+0LfQuNGG0LjQuCDRjdC70LXQvNC10L3RgtCwXHJcblx0dmFyIGNoZWNrRGlzdGFuY2UgPSBmdW5jdGlvbihzY3JvbGxUb3ApIHtcclxuXHRcdHZhciBvZmZzZXQgPSBlbGVtLm9mZnNldCgpLnRvcCxcclxuXHRcdFx0d2luZG93TWFyZ2luID0gTWF0aC5jZWlsKCQod2luZG93KS5oZWlnaHQoKSAvIDMpLFxyXG5cdFx0XHR0b3BCb3JkZXIgPSBvZmZzZXQgLSBzY3JvbGxUb3AgLSB3aW5kb3dNYXJnaW4gLSAxMDAsXHJcblx0XHRcdGJvdHRvbUVkZ2UgPSBlbGVtLm91dGVySGVpZ2h0KHRydWUpICsgb2Zmc2V0LFxyXG5cdFx0XHRib3R0b21Cb3JkZXIgPSBzY3JvbGxUb3AgKyB3aW5kb3dNYXJnaW4gLSBib3R0b21FZGdlO1xyXG5cclxuXHRcdFx0cmV0dXJuIHRvcEJvcmRlciA8PSAwICYmIGJvdHRvbUJvcmRlciA8PSAwXHJcblx0fVxyXG5cclxuXHJcbn0pOyIsIi8vIGpzINGE0LDQudC7INC00LvRjyDQutCw0YDRgtGLXHJcblxyXG4oZnVuY3Rpb24oKSB7XHJcbiAgICBnb29nbGUubWFwcy5ldmVudC5hZGREb21MaXN0ZW5lcih3aW5kb3csICdsb2FkJywgaW5pdCk7XHJcbiAgICB2YXIgbWFwLCBtYXJrZXJzQXJyYXkgPSBbXTtcclxuXHJcbiAgICBmdW5jdGlvbiBiaW5kSW5mb1dpbmRvdyhtYXJrZXIsIG1hcCwgbG9jYXRpb24pIHtcclxuICAgICAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXIsICdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBjbG9zZShsb2NhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgbG9jYXRpb24uaWIuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uLmluZm9XaW5kb3dWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5pYiA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChsb2NhdGlvbi5pbmZvV2luZG93VmlzaWJsZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgY2xvc2UobG9jYXRpb24pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbWFya2Vyc0FycmF5LmZvckVhY2goZnVuY3Rpb24obG9jLCBpbmRleCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxvYy5pYiAmJiBsb2MuaWIgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2UobG9jKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgYm94VGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICAgICAgYm94VGV4dC5zdHlsZS5jc3NUZXh0ID0gJ2JhY2tncm91bmQ6ICNmZmY7JztcclxuICAgICAgICAgICAgICAgIGJveFRleHQuY2xhc3NMaXN0LmFkZCgnbWQtd2hpdGVmcmFtZS0yZHAnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBidWlsZFBpZWNlcyhsb2NhdGlvbiwgZWwsIHBhcnQsIGljb24pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobG9jYXRpb25bcGFydF0gPT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGxvY2F0aW9uLml3W3BhcnRdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaChlbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdwaG90byc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxvY2F0aW9uLnBob3RvKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwiaXctcGhvdG9cIiBzdHlsZT1cImJhY2tncm91bmQtaW1hZ2U6IHVybCgnICsgbG9jYXRpb24ucGhvdG8gKyAnKTtcIj48L2Rpdj4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnaXctdG9vbGJhcic6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwiaXctdG9vbGJhclwiPjxoMyBjbGFzcz1cIm1kLXN1YmhlYWRcIj4nICsgbG9jYXRpb24udGl0bGUgKyAnPC9oMz48L2Rpdj4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZGl2JzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2gocGFydCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2VtYWlsJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnPGRpdiBjbGFzcz1cIml3LWRldGFpbHNcIj48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCIgc3R5bGU9XCJjb2xvcjojNDI4NWY0O1wiPjxpbWcgc3JjPVwiLy9jZG4ubWFwa2l0LmlvL3YxL2ljb25zLycgKyBpY29uICsgJy5zdmdcIi8+PC9pPjxzcGFuPjxhIGhyZWY9XCJtYWlsdG86JyArIGxvY2F0aW9uLmVtYWlsICsgJ1wiIHRhcmdldD1cIl9ibGFua1wiPicgKyBsb2NhdGlvbi5lbWFpbCArICc8L2E+PC9zcGFuPjwvZGl2Pic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnd2ViJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnPGRpdiBjbGFzcz1cIml3LWRldGFpbHNcIj48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCIgc3R5bGU9XCJjb2xvcjojNDI4NWY0O1wiPjxpbWcgc3JjPVwiLy9jZG4ubWFwa2l0LmlvL3YxL2ljb25zLycgKyBpY29uICsgJy5zdmdcIi8+PC9pPjxzcGFuPjxhIGhyZWY9XCInICsgbG9jYXRpb24ud2ViICsgJ1wiIHRhcmdldD1cIl9ibGFua1wiPicgKyBsb2NhdGlvbi53ZWJfZm9ybWF0dGVkICsgJzwvYT48L3NwYW4+PC9kaXY+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdkZXNjJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnPGxhYmVsIGNsYXNzPVwiaXctZGVzY1wiIGZvcj1cImNiX2RldGFpbHNcIj48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCJjYl9kZXRhaWxzXCIvPjxoMyBjbGFzcz1cIml3LXgtZGV0YWlsc1wiPkRldGFpbHM8L2gzPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgdG9nZ2xlLW9wZW4tZGV0YWlsc1wiPjxpbWcgc3JjPVwiLy9jZG4ubWFwa2l0LmlvL3YxL2ljb25zLycgKyBpY29uICsgJy5zdmdcIi8+PC9pPjxwIGNsYXNzPVwiaXcteC1kZXRhaWxzXCI+JyArIGxvY2F0aW9uLmRlc2MgKyAnPC9wPjwvbGFiZWw+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwiaXctZGV0YWlsc1wiPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj48aW1nIHNyYz1cIi8vY2RuLm1hcGtpdC5pby92MS9pY29ucy8nICsgaWNvbiArICcuc3ZnXCIvPjwvaT48c3Bhbj4nICsgbG9jYXRpb25bcGFydF0gKyAnPC9zcGFuPjwvZGl2Pic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ29wZW5faG91cnMnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpdGVtcyA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsb2NhdGlvbi5vcGVuX2hvdXJzLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxvY2F0aW9uLm9wZW5faG91cnMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpICE9PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtcyArPSAnPGxpPjxzdHJvbmc+JyArIGxvY2F0aW9uLm9wZW5faG91cnNbaV0uZGF5ICsgJzwvc3Ryb25nPjxzdHJvbmc+JyArIGxvY2F0aW9uLm9wZW5faG91cnNbaV0uaG91cnMgKyc8L3N0cm9uZz48L2xpPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmlyc3QgPSAnPGxpPjxsYWJlbCBmb3I9XCJjYl9ob3Vyc1wiPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBpZD1cImNiX2hvdXJzXCIvPjxzdHJvbmc+JyArIGxvY2F0aW9uLm9wZW5faG91cnNbMF0uZGF5ICsgJzwvc3Ryb25nPjxzdHJvbmc+JyArIGxvY2F0aW9uLm9wZW5faG91cnNbMF0uaG91cnMgKyc8L3N0cm9uZz48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zIHRvZ2dsZS1vcGVuLWhvdXJzXCI+PGltZyBzcmM9XCIvL2Nkbi5tYXBraXQuaW8vdjEvaWNvbnMva2V5Ym9hcmRfYXJyb3dfZG93bi5zdmdcIi8+PC9pPjx1bD4nICsgaXRlbXMgKyAnPC91bD48L2xhYmVsPjwvbGk+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzxkaXYgY2xhc3M9XCJpdy1saXN0XCI+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29ucyBmaXJzdC1tYXRlcmlhbC1pY29uc1wiIHN0eWxlPVwiY29sb3I6IzQyODVmNDtcIj48aW1nIHNyYz1cIi8vY2RuLm1hcGtpdC5pby92MS9pY29ucy8nICsgaWNvbiArICcuc3ZnXCIvPjwvaT48dWw+JyArIGZpcnN0ICsgJzwvdWw+PC9kaXY+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGJveFRleHQuaW5uZXJIVE1MID0gXHJcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRQaWVjZXMobG9jYXRpb24sICdwaG90bycsICdwaG90bycsICcnKSArXHJcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRQaWVjZXMobG9jYXRpb24sICdpdy10b29sYmFyJywgJ3RpdGxlJywgJycpICtcclxuICAgICAgICAgICAgICAgICAgICBidWlsZFBpZWNlcyhsb2NhdGlvbiwgJ2RpdicsICdhZGRyZXNzJywgJ2xvY2F0aW9uX29uJykgK1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkUGllY2VzKGxvY2F0aW9uLCAnZGl2JywgJ3dlYicsICdwdWJsaWMnKSArXHJcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRQaWVjZXMobG9jYXRpb24sICdkaXYnLCAnZW1haWwnLCAnZW1haWwnKSArXHJcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRQaWVjZXMobG9jYXRpb24sICdkaXYnLCAndGVsJywgJ3Bob25lJykgK1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkUGllY2VzKGxvY2F0aW9uLCAnZGl2JywgJ2ludF90ZWwnLCAncGhvbmUnKSArXHJcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRQaWVjZXMobG9jYXRpb24sICdvcGVuX2hvdXJzJywgJ29wZW5faG91cnMnLCAnYWNjZXNzX3RpbWUnKSArXHJcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRQaWVjZXMobG9jYXRpb24sICdkaXYnLCAnZGVzYycsICdrZXlib2FyZF9hcnJvd19kb3duJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIG15T3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgICAgICBhbGlnbkJvdHRvbTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBib3hUZXh0LFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVBdXRvUGFuOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1heFdpZHRoOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIHBpeGVsT2Zmc2V0OiBuZXcgZ29vZ2xlLm1hcHMuU2l6ZSgtMTQwLCAtNDApLFxyXG4gICAgICAgICAgICAgICAgICAgIHpJbmRleDogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICBib3hTdHlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzI4MHB4J1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VCb3hNYXJnaW46ICcwcHggMHB4IDBweCAwcHgnLFxyXG4gICAgICAgICAgICAgICAgICAgIGluZm9Cb3hDbGVhcmFuY2U6IG5ldyBnb29nbGUubWFwcy5TaXplKDEsIDEpLFxyXG4gICAgICAgICAgICAgICAgICAgIGlzSGlkZGVuOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBwYW5lOiAnZmxvYXRQYW5lJyxcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVFdmVudFByb3BhZ2F0aW9uOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5pYiA9IG5ldyBJbmZvQm94KG15T3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5pYi5vcGVuKG1hcCwgbWFya2VyKTtcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uLmluZm9XaW5kb3dWaXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICAgICAgdmFyIG1hcE9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIGNlbnRlcjogbmV3IGdvb2dsZS5tYXBzLkxhdExuZyg1NS43NDgzNTgxMTI3MjAzNzUsNTIuMzU0MTc1ODg3NDk5OTgpLFxyXG4gICAgICAgICAgICB6b29tOiAxMyxcclxuICAgICAgICAgICAgZ2VzdHVyZUhhbmRsaW5nOiAnY29vcGVyYXRpdmUnLFxyXG4gICAgICAgICAgICBmdWxsc2NyZWVuQ29udHJvbDogZmFsc2UsXHJcbiAgICAgICAgICAgIHpvb21Db250cm9sOiB0cnVlLFxyXG4gICAgICAgICAgICBkaXNhYmxlRG91YmxlQ2xpY2tab29tOiB0cnVlLFxyXG4gICAgICAgICAgICBtYXBUeXBlQ29udHJvbDogdHJ1ZSxcclxuICAgICAgICAgICAgbWFwVHlwZUNvbnRyb2xPcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICBzdHlsZTogZ29vZ2xlLm1hcHMuTWFwVHlwZUNvbnRyb2xTdHlsZS5IT1JJWk9OVEFMX0JBUixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2NhbGVDb250cm9sOiBmYWxzZSxcclxuICAgICAgICAgICAgc2Nyb2xsd2hlZWw6IGZhbHNlLFxyXG4gICAgICAgICAgICBzdHJlZXRWaWV3Q29udHJvbDogZmFsc2UsXHJcbiAgICAgICAgICAgIGRyYWdnYWJsZSA6IHRydWUsXHJcbiAgICAgICAgICAgIGNsaWNrYWJsZUljb25zOiB0cnVlLFxyXG4gICAgICAgICAgICB6b29tQ29udHJvbE9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBnb29nbGUubWFwcy5Db250cm9sUG9zaXRpb24uUklHSFRfQ0VOVEVSXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG1hcFR5cGVDb250cm9sT3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IGdvb2dsZS5tYXBzLkNvbnRyb2xQb3NpdGlvbi5SSUdIVF9UT1BcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbWFwVHlwZUlkOiBnb29nbGUubWFwcy5NYXBUeXBlSWQuUk9BRE1BUCxcclxuICAgICAgICAgICAgc3R5bGVzOiBbe1wiZmVhdHVyZVR5cGVcIjpcIndhdGVyXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjNDZiY2VjXCJ9LHtcInZpc2liaWxpdHlcIjpcIm9uXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcImxhbmRzY2FwZVwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiI2YyZjJmMlwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJyb2FkXCIsXCJzdHlsZXJzXCI6W3tcInNhdHVyYXRpb25cIjotMTAwfSx7XCJsaWdodG5lc3NcIjo0NX1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicm9hZC5oaWdod2F5XCIsXCJzdHlsZXJzXCI6W3tcInZpc2liaWxpdHlcIjpcInNpbXBsaWZpZWRcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicm9hZC5hcnRlcmlhbFwiLFwiZWxlbWVudFR5cGVcIjpcImxhYmVscy5pY29uXCIsXCJzdHlsZXJzXCI6W3tcInZpc2liaWxpdHlcIjpcIm9mZlwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJhZG1pbmlzdHJhdGl2ZVwiLFwiZWxlbWVudFR5cGVcIjpcImxhYmVscy50ZXh0LmZpbGxcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiM0NDQ0NDRcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwidHJhbnNpdFwiLFwic3R5bGVyc1wiOlt7XCJ2aXNpYmlsaXR5XCI6XCJvZmZcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicG9pXCIsXCJzdHlsZXJzXCI6W3tcInZpc2liaWxpdHlcIjpcIm9mZlwifV19XVxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbWFwRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAnKTtcclxuICAgICAgICB2YXIgbWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChtYXBFbGVtZW50LCBtYXBPcHRpb25zKTtcclxuICAgICAgICB2YXIgbG9jYXRpb25zID0gW1xyXG4gICAgICAgICAgICB7XCJ0aXRsZVwiOlwiQU5EUkVXXCIsXCJ0ZWxcIjpcIis3KDk1MSk4OTYtNDItNDRcIixcImVtYWlsXCI6XCJrYXRhc2hpMTMyOEBtYWlsLnJ1XCIsXCJ3ZWJcIjpcImh0dHBzOi8vYW5kcmV3bGV5a2luLmdpdGh1Yi5pby9wb3J0Zm9saW8vYnVpbGQvXCIsXCJ3ZWJfZm9ybWF0dGVkXCI6XCJhbmRyZXdsZXlraW4uZ2l0aHViLmlvXCIsXCJsYXRcIjo1NS43MzQ3MDU3MDQ1OTI4MDUsXCJsbmdcIjo1Mi4zOTc1MTUwMjA3NjI2MjYsXCJ2aWNpbml0eVwiOlwiXCIsXCJtYXJrZXJcIjp7XCJmaWxsQ29sb3JcIjpcIiMwMEFDQzFcIixcImZpbGxPcGFjaXR5XCI6MSxcInN0cm9rZVdlaWdodFwiOjAsXCJzY2FsZVwiOjEuNSxcInBhdGhcIjpcIk0xMC4yLDcuNGMtNiwwLTEwLjksNC45LTEwLjksMTAuOWMwLDYsMTAuOSwxOC40LDEwLjksMTguNHMxMC45LTEyLjMsMTAuOS0xOC40QzIxLjIsMTIuMiwxNi4zLDcuNCwxMC4yLDcuNHogTTEwLjIsMjIuOWMtMi42LDAtNC42LTIuMS00LjYtNC42czIuMS00LjYsNC42LTQuNnM0LjYsMi4xLDQuNiw0LjZTMTIuOCwyMi45LDEwLjIsMjIuOXpcIixcImFuY2hvclwiOntcInhcIjoxMCxcInlcIjozMH0sXCJvcmlnaW5cIjp7XCJ4XCI6MCxcInlcIjowfSxcInN0eWxlXCI6MX0sXCJpd1wiOntcInRlbFwiOnRydWUsXCJ3ZWJcIjp0cnVlLFwiZW1haWxcIjp0cnVlfX1cclxuICAgICAgICBdO1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsb2NhdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XHJcbiAgICAgICAgICAgICAgICBpY29uOiBsb2NhdGlvbnNbaV0ubWFya2VyLFxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IG5ldyBnb29nbGUubWFwcy5MYXRMbmcobG9jYXRpb25zW2ldLmxhdCwgbG9jYXRpb25zW2ldLmxuZyksXHJcblxyXG4gICAgICAgICAgICAgICAgbWFwOiBtYXAsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogbG9jYXRpb25zW2ldLnRpdGxlLFxyXG4gICAgICAgICAgICAgICAgYWRkcmVzczogbG9jYXRpb25zW2ldLmFkZHJlc3MsXHJcbiAgICAgICAgICAgICAgICBkZXNjOiBsb2NhdGlvbnNbaV0uZGVzYyxcclxuICAgICAgICAgICAgICAgIHRlbDogbG9jYXRpb25zW2ldLnRlbCxcclxuICAgICAgICAgICAgICAgIGludF90ZWw6IGxvY2F0aW9uc1tpXS5pbnRfdGVsLFxyXG4gICAgICAgICAgICAgICAgdmljaW5pdHk6IGxvY2F0aW9uc1tpXS52aWNpbml0eSxcclxuICAgICAgICAgICAgICAgIG9wZW46IGxvY2F0aW9uc1tpXS5vcGVuLFxyXG4gICAgICAgICAgICAgICAgb3Blbl9ob3VyczogbG9jYXRpb25zW2ldLm9wZW5faG91cnMsXHJcbiAgICAgICAgICAgICAgICBwaG90bzogbG9jYXRpb25zW2ldLnBob3RvLFxyXG4gICAgICAgICAgICAgICAgdGltZTogbG9jYXRpb25zW2ldLnRpbWUsXHJcbiAgICAgICAgICAgICAgICBlbWFpbDogbG9jYXRpb25zW2ldLmVtYWlsLFxyXG4gICAgICAgICAgICAgICAgd2ViOiBsb2NhdGlvbnNbaV0ud2ViLFxyXG4gICAgICAgICAgICAgICAgaXc6IGxvY2F0aW9uc1tpXS5pd1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbWFya2Vyc0FycmF5LnB1c2gobWFya2VyKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChsb2NhdGlvbnNbaV0uaXcuZW5hYmxlID09PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgIGJpbmRJbmZvV2luZG93KG1hcmtlciwgbWFwLCBsb2NhdGlvbnNbaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG59KSgpOyBcclxuIiwiLy8g0JHQuNCx0LvQuNC+0YLQtdC60LAgc3ZnNGV2ZXJ5Ym9keSDQtNC70Y8gc3ZnXHJcblxyXG4kKGZ1bmN0aW9uKCl7XHJcblx0c3ZnNGV2ZXJ5Ym9keSgpO1xyXG59KSJdfQ==
