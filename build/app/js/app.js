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
				valid      = true;

		// функция валидация формы
		var validFunc = function () {

			// проверяем каждый input
			input.each(function(i) {

				// проверяем условие, есть ли в поле что-нидь
				if($(this).val() != '') {
					$(this).css('border', '2px solid #009688'); 
					icon.eq(i).css('color', '#009688');
					btn.removeClass('js__form-no-submit');
				} else {
					$(this).css('border', '2px solid #e44845');
					icon.eq(i).css('color', '#e44845');
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
						email.css('border', '2px solid #009688');
						valid = true;
					} else {
						email.css('border', '2px solid #e44845');
						valid = false;
					}
				} else {
					email.css('border', '2px solid #e44845');
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
					email.css('border', '2px solid #009688');
					valid = true;
				} else {
					email.css('border', '2px solid #e44845');
					valid = false
				}
			} else {
				email.css('border', '2px solid #e44845');
				valid = false
			}

		});


		// проверяем каждый инпут
		input.each(function(i) {

			// для каждого инпута при покидании поля
			$(this).blur(function() {

				// проверяем наличие чего-либо
				if($(this).val() != '') {
					$(this).css('border', '2px solid #009688');
					icon.eq(i).css('color', '#009688');
					btn.removeClass('js__form-no-submit')
				} else {
					$(this).css('border', '2px solid #e44845');
					icon.eq(i).css('color', '#e44845');
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
			input.add(email).removeAttr('style');
		});


	}); // --> ready end

})( jQuery );








/*
(function( $ ){

$(function() {

  $('.js__form').each(function(){
    // Объявляем переменные (форма и кнопка отправки)
	var form = $(this),
        btn = form.find('.js__form-btn'),
        icon = form.find('.js__form-icon');

    // Добавляем каждому проверяемому полю, указание что поле пустое
	form.find('.js__input').addClass('empty_field');
	icon.addClass('empty_icon');

    // Функция проверки полей формы
    function checkInput(){
      form.find('.js__input').each(function(i){
        if($(this).val() != ''){
          // Если поле не пустое удаляем класс-указание
		$(this).removeClass('empty_field').css('border', '2px solid green');
		icon.eq(i).removeClass('empty_icon').css('color', 'green');
        } else {
          // Если поле пустое добавляем класс-указание
		$(this).addClass('empty_field');
		icon.eq(i).addClass('empty_icon');
        }
      });
    }

    // Функция подсветки незаполненных полей
    function lightEmpty(){
      form.find('.empty_field').css('border','2px solid red');
      form.find('.empty_icon').css('color', 'red');

      // // Через полсекунды удаляем подсветку
      // setTimeout(function(){
      //   form.find('.empty_field').removeAttr('style');
      //   form.find('.empty_icon').removeAttr('style');
      // },700);

    }

    // Проверка в режиме реального времени
    setInterval(function(){
      // Запускаем функцию проверки полей на заполненность
	  checkInput();
      // Считаем к-во незаполненных полей
      var sizeEmpty = form.find('.empty_field').length;
      // Вешаем условие-тригер на кнопку отправки формы
      if(sizeEmpty > 0){
        if(btn.hasClass('btn__disabled')){
          return false
        } else {
          btn.addClass('btn__disabled')
        }
      } else {
        btn.removeClass('btn__disabled')
      }
    },500);

    // Событие клика по кнопке отправить
    btn.click(function(){
      if($(this).hasClass('btn__disabled')){
        // подсвечиваем незаполненные поля и форму не отправляем, если есть незаполненные поля
		lightEmpty();
        return false
      } else {
        // Все хорошо, все заполнено, отправляем форму
        form.submit();
      }
    });
  });
});

})( jQuery );

*/
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lbnUuanMiLCJwYXJhbGxheC5qcyIsInByZWxvYWRlci5qcyIsInZhbGlkYXRlLmpzIiwic2Nyb2xsLmpzIiwiaW5kZXgtcGFyYWxsYXguanMiLCJmbGlwLmpzIiwic3RpY2t5LXNpZGViYXIuanMiLCJuYXYtc2lkZWJhci5qcyIsImNpcmNsZS1hbmltYXRlLmpzIiwibWFwLmpzIiwic3ZnNGV2ZXJ5Ym9keS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGpzINC00LvRjyDQvNC10L3RjlxyXG5cclxuKGZ1bmN0aW9uKCkge1xyXG4gICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgLy8g0J/QtdGA0LXQvNC10L3QvdGL0LVcclxuICB2YXIgbGluayA9ICQoJy5oZWFkZXJfX21lbnUnKSxcclxuICAgICAgbGlua19fYWN0aXZlPSAnaGVhZGVyX19tZW51X19hY3RpdmUnLFxyXG4gICAgICBsaXN0ID0gJCgnLm1haW4tbWVudV9fbGlzdCcpLFxyXG4gICAgICBiZyA9ICQoJy5tYWluLW1lbnUnKSxcclxuICAgICAgc29jaWFsID0gJCgnLmhlYWRlcl9fc29jaWFsJyksXHJcbiAgICAgIGFuaW1hdGUgPSAnbWFpbi1tZW51X19hbmltYXRlJztcclxuXHJcbiAgICAvLyDQv9GA0L7QvNC40YEg0LrQvtGC0L7RgNGL0Lkg0LHRg9C00LXRgiDQv9GA0L7QstC10YDRj9GC0Ywg0L3QsNC70LjRh9C40LUg0YHRgdGL0LvQutC4KNCz0LDQvNCx0YPRgNCz0LXRgNCwKVxyXG4gICAgdmFyIG1lbnVQcm9taXNlID0gbmV3IFByb21pc2UgKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICBpZiAobGluay5sZW5ndGgpIHtcclxuICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVqZWN0KCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vINGE0YPQvdC60YbQuNGPINC/0YDQuCDQvdCw0LvQuNGH0LjQuCDRgdGB0YvQu9C60Lgo0LPQsNC80LHRg9GA0LPQtdGA0LApXHJcbiAgICBtZW51UHJvbWlzZS50aGVuKGZ1bmN0aW9uKCl7XHJcbiAgICAgIGxpbmsub24oJ2NsaWNrJywgY2xpY2tGdW5jdGlvbik7XHJcbiAgICB9KS5jYXRjaChmdW5jdGlvbigpe1xyXG4gICAgICByZXR1cm4gO1xyXG4gICAgfSk7XHJcblxyXG5cclxuXHJcbiAgLy8g0KTRg9C90LrRhtC40Y8g0L/RgNC4INC90LDQttCw0YLQuNC4INC90LAg0LzQtdC90Y4t0YjQsNC80LHRg9GA0LPQtdGAXHJcbiAgdmFyIGNsaWNrRnVuY3Rpb24gPSBmdW5jdGlvbiAoZSkge1xyXG4gIFx0ZS5wcmV2ZW50RGVmYXVsdCgpOyAvLyDQvtGC0LzQtdC90LAg0YHRgtCw0L3QtNCw0YDRgtC90YvRhSDQtNC10LnRgdCy0YLQudC4XHJcblxyXG4gIFx0JCh0aGlzKS50b2dnbGVDbGFzcyhsaW5rX19hY3RpdmUpOyAvLyDQuNC30LzQtdC90Y/QtdC8INC90LAg0LDQutGC0LjQstC90L7QtSDRgdC+0YHRgtC+0Y/QvdC40LVcclxuXHJcbiAgXHQvLyDQldGB0LvQuCDQutC90L7Qv9C60LAg0LDQutGC0LjQstC90LAg0YLQvlxyXG4gIFx0aWYobGluay5oYXNDbGFzcyhsaW5rX19hY3RpdmUpKSB7XHJcbiAgXHRcdGJnLmNzcygnZGlzcGxheScsICdibG9jaycpLmFkZENsYXNzKGFuaW1hdGUpOyAvLyDQvtGC0L7QsdGA0LDQt9C40YLRjCDQvNC10L3Rjiwg0Lgg0LTQvtCx0LDQstC40YLRjCDQutC70LDRgdGBINCw0L3QuNC80LDRhtC40LhcclxuICBcdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gIFx0XHRcdHNvY2lhbC5jc3MoJ29wYWNpdHknLCAnMCcpOyAvLyDRh9C10YDQtdC3IDIwMCDQvNC40LvQuNGB0LXQutGD0L3QtCDRgdC60YDRi9GC0Ywg0LjQutC+0L3QutC4XHJcbiAgXHRcdH0sMjAwKTtcclxuICAgIFx0Ly8g0YfQtdGA0LXQtyA3MDAg0LzQuNC70LjRgdC10LrRg9C90LQg0L7RgtC+0LHRgNCw0LbQsNGC0Ywg0YHQv9C40YHQvtC6INC80LXQvdGOXHJcbiAgICBcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgIFx0XHRsaXN0LmNzcygndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZVkoMCknKTtcclxuICAgIFx0fSw4MDApO1xyXG4gICAgfSBlbHNlIHsgLy8g0JXRgdC70Lgg0LrQvdC+0L/QutCwINC90LUg0LDQutGC0LjQstC90LBcclxuICAgICAgYmcuY3NzKCdkaXNwbGF5JywgJ25vbmUnKS5yZW1vdmVDbGFzcyhhbmltYXRlKTsgLy8g0YHQutGA0YvRgtGMINC80LXQvdGOLCDRg9C00LDQu9C40YLRjCDQutC70LDRgdGBINCw0L3QuNC80LDRhtC40LhcclxuICAgICAgc29jaWFsLmNzcygnb3BhY2l0eScsICcxJykgLy8g0L7RgtC+0LHRgNCw0LfQuNGC0Ywg0LjQutC+0L3QutC4XHJcbiAgICAgIGxpc3QuY3NzKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlWSgtMTAwJSknKTtcclxuICAgIH1cclxuXHJcblxyXG4gIH07XHJcbn0pKCk7IiwiLy8ganMg0LTQu9GPINC/0LDRgNCw0LvQu9Cw0LrRgSDRjdGE0YTQtdC60YLQsCwg0L3QsCDRhNC+0L3QtSDQs9C+0YBcclxuJ3VzZSBzY3RyaWN0JztcclxuXHJcbiQoZnVuY3Rpb24oKXtcclxuXHQvLyDQt9Cw0LTQsNGR0Lwg0L7QsdGJ0YPRjiDQv9C10YDQtdC80LXQvdC90YPRjlxyXG5cdHZhciBzdmdUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzX19oZWFkZXItdGV4dCcpO1xyXG5cclxuXHQvLyDQv9GA0L7QvNC40YEg0LrQvtGC0L7RgNGL0Lkg0LHRg9C00LXRgiDQv9GA0L7QstC10YDRj9GC0Ywg0L3QsNC70LjRh9C40LUgc3ZnVGV4dCDQsiBwYWdlLWhlYWRlclxyXG5cdHZhciBwYXJhbGxheFByb21pc2UgPSBuZXcgUHJvbWlzZSAoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblx0XHRcdGlmIChzdmdUZXh0KSB7XHJcblx0XHRcdFx0cmVzb2x2ZSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblxyXG5cclxuXHQvLyDRhNGD0L3QutGG0LjRjyDQtNC70Y8gcGFyYWxsYXgg0L/RgNC4INGB0LrRgNC+0LvQtVxyXG5cdHZhciBwYXJhbGxheCA9IChmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgaW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2UtaGVhZGVyX19pbWcnKTtcclxuXHRcdHZhciB1c2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnVzZXItYmxvY2tfX3RvcCcpO1xyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdG1vdmU6IGZ1bmN0aW9uKGJsb2NrLCB3aW5kb3dTY3JvbGwsIHN0cmFmZUFtb3VudCkge1xyXG5cdFx0XHRcdHZhciBzdHJhZmUgPSB3aW5kb3dTY3JvbGwgLyAtc3RyYWZlQW1vdW50ICsgJyUnO1xyXG5cdFx0XHRcdHZhciB0cmFuc2Zvcm1TdHJpbmcgPSAndHJhbnNsYXRlM2QoMCwnICsgc3RyYWZlICsgJywwKSc7XHJcblxyXG5cdFx0XHRcdGJsb2NrLnN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcclxuXHRcdFx0fSxcclxuXHRcdFx0aW5pdDogZnVuY3Rpb24gKHdTY3JvbGwpIHtcclxuXHRcdFx0XHR0aGlzLm1vdmUoaW1nLCB3U2Nyb2xsLCA0NSk7XHJcblx0XHRcdFx0dGhpcy5tb3ZlKHN2Z1RleHQsIHdTY3JvbGwsIDMwKTtcclxuXHRcdFx0XHR0aGlzLm1vdmUodXNlciwgd1Njcm9sbCwgMTApO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSgpKTtcclxuXHR3aW5kb3cub25zY3JvbGwgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgd1Njcm9sbCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcclxuXHRcdGlmIChzdmdUZXh0KSB7XHJcblx0XHRcdFx0cGFyYWxsYXguaW5pdCh3U2Nyb2xsKTtcclxuXHRcdFx0fVxyXG5cdFx0Ly8g0YTRg9C90LrRhtC40Y8g0L/RgNC4INC90LDQu9C40YfQuNC4IHN2Z1RleHQg0LIgcGFnZS1oZWFkZXJcclxuXHRcdC8vIHBhcmFsbGF4UHJvbWlzZS50aGVuKGZ1bmN0aW9uKCl7XHJcblx0XHQvLyBcdHBhcmFsbGF4LmluaXQod1Njcm9sbCk7XHJcblx0XHQvLyB9KTtcclxuXHR9XHJcbn0pXHJcblxyXG4iLCIvLyBqcyDRhNCw0LnQuyDQtNC70Y8g0L/RgNC10LvQvtCw0LTQtdGA0LAg0L3QsCDQu9GO0LHRi9GFINGB0YLRgNCw0L3QuNGG0LDRhVxyXG5cclxuXHQvLyDQt9Cw0LTQsNGR0Lwg0L/QtdGA0LXQvNC10L3QvdGL0LVcclxuXHR2YXIgaW1hZ2VzID0gJCgnaW1nJyksXHJcblx0XHRpbWFnZXNUb3RhbENvdW50ID0gaW1hZ2VzLmxlbmd0aCxcclxuXHRcdGltYWdlc0xvYWRlZENvdW50ID0gMCxcclxuXHRcdHBlcmNEaXNwbGF5ID0gJCgnLnByZWxvYWRlcl9fcGVyY2VudCcpLFxyXG5cdFx0cHJlbG9hZGVyID0gJCgnLnByZWxvYWRlcicpLFxyXG5cdFx0cm91bmRzID0gJCgnLnByZWxvYWRlcl9fcm91bmRzJyksXHJcblx0XHRzdHJva2VHbG9iYWwgPSA0NTAsXHJcblx0XHRzdHJva2VTdGFydCA9IDQ1MCxcclxuXHRcdHN0cm9rZURhc2hvZmZzZXQ7XHJcblxyXG5cdC8vINC/0YDQvtC80LjRgSDQutC+0YLQvtGA0YvQuSDQsdGD0LTQtdGCINC/0YDQvtCy0LXRgNGP0YLRjCDQvdCw0LvQuNGH0LjQtSDQv9GA0LXQu9C+0LDQtNC10YDQsCDQvdCwINGB0YLRgNCw0L3QuNGG0LVcclxuXHR2YXIgcHJlbG9hZGVyUHJvbWlzZSA9IG5ldyBQcm9taXNlIChmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHRcdFx0aWYgKHByZWxvYWRlci5sZW5ndGgpIHtcclxuXHRcdFx0XHRyZXNvbHZlKCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmVqZWN0KCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHQvLyDRhNGD0L3QutGG0LjRjyDQv9GA0Lgg0L3QsNC70LjRh9C40Lgg0L/RgNC10LvQvtCw0LTQtdGA0LAg0L3QsCDRgdGC0YDQsNC90LjRhtC1XHJcblx0cHJlbG9hZGVyUHJvbWlzZS50aGVuKGZ1bmN0aW9uKCl7XHJcblxyXG5cdFx0Ly8g0YbQuNC60Lsg0LTQu9GPINC/0LXRgNC10LHQuNGA0LDQvdC40Y8g0LLRgdC10YUg0LrQsNGA0YLQuNC90L7QulxyXG5cdFx0Zm9yICh2YXIgaT0wOyBpIDwgaW1hZ2VzVG90YWxDb3VudDsgaSsrKSB7XHJcblx0XHRcdGltYWdlQ2xvbmUgPSBuZXcgSW1hZ2UoKTtcclxuXHRcdFx0aW1hZ2VDbG9uZS5vbmxvYWQgPSBpbWFnZUxvYWRlZDtcclxuXHRcdFx0aW1hZ2VDbG9uZS5vbmVycm9yID0gaW1hZ2VMb2FkZWQ7XHJcblx0XHRcdGltYWdlQ2xvbmUuc3JjID0gaW1hZ2VzW2ldLnNyYztcclxuXHRcdH1cclxuXHJcblx0XHQvLyDRhNGD0L3QutGG0LjRjyDQtNC70Y8g0L/RgNC+0LLQtdGA0LrQuCDQt9Cw0LPRgNGD0LfQutC4INCy0YHQtdGFINC60LDRgNGC0LjQvdC+0LpcclxuXHRcdGZ1bmN0aW9uIGltYWdlTG9hZGVkKCkge1xyXG5cclxuXHRcdFx0Ly8g0YPQstC10LvQuNGH0LjQstCw0LXQvCDRh9C40YHQu9C+INC30LDQs9GA0YPQttC10L3QvdGL0YUg0LrQsNGA0YLQuNC90L7QulxyXG5cdFx0XHRpbWFnZXNMb2FkZWRDb3VudCsrO1xyXG5cclxuXHRcdFx0Ly8g0YHRh9C40YLQsNC10Lwg0L/RgNC+0YbQtdC90YIg0LfQsNCz0YDRg9C20LXQvdC90YvRhVxyXG5cdFx0XHR2YXIgcGVyYyA9IE1hdGgucm91bmQoKCgxMDAgLyBpbWFnZXNUb3RhbENvdW50KSAqIGltYWdlc0xvYWRlZENvdW50KSkgKyAnJSc7XHJcblx0XHRcdFxyXG5cdFx0XHQvLyDQstGL0LLQvtC00LjQvCDQvdCw0YjQtSDQt9C90LDRh9C10L3QuNC1INC/0YDQvtGG0LXQvdGC0L3QvtC1XHJcblx0XHRcdHBlcmNEaXNwbGF5Lmh0bWwocGVyYyk7XHJcblxyXG5cdFx0XHQvLyDRgdGH0LjRgtCw0LXQvCDQvtGC0L3QvtGB0LjRgtC10LvRjNC90L7QtSDQt9Cw0LrRgNCw0YHQutGDINC+0LHQstC+0LTQutC4INC60YDRg9Cz0LBcclxuXHRcdFx0c3Ryb2tlRGFzaG9mZnNldCA9IHN0cm9rZVN0YXJ0IC0gTWF0aC5yb3VuZCgoc3Ryb2tlR2xvYmFsIC8gaW1hZ2VzVG90YWxDb3VudCkpO1xyXG5cclxuXHRcdFx0Ly8g0LLRi9GH0LjRgtCw0LXQvCDRgdGC0LDRgNGC0L7QstGL0Lkg0L7RgtGH0ZHRglxyXG5cdFx0XHRzdHJva2VTdGFydCAtPSAoc3Ryb2tlR2xvYmFsIC8gaW1hZ2VzVG90YWxDb3VudCk7XHJcblxyXG5cdFx0XHQvLyDQv9GA0LjRgdCy0LDQuNCy0LDQtdC8INGC0L4g0YfRgtC+INC/0L7RgdGH0LjRgtCw0LvQuCwg0L3QsNGI0LXQvNGDINC60YDRg9Cz0YMg0YHQstCzXHJcblx0XHRcdHJvdW5kcy5jc3MoJ3N0cm9rZURhc2hvZmZzZXQnLCBzdHJva2VEYXNob2Zmc2V0KTtcclxuXHJcblx0XHRcdC8vINCV0YHQu9C4INCy0YHQtSDQutCw0YDRgtC40L3QutC4INC30LDQs9GA0YPQttC10L3QvdGLLCDRg9Cx0YDQsNGC0Ywg0LHQu9C+0Log0L/RgNC10LvQvtCw0LTQtdGAXHJcblx0XHRcdGlmKGltYWdlc0xvYWRlZENvdW50ID49IGltYWdlc1RvdGFsQ291bnQpIHtcclxuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRpZighcHJlbG9hZGVyLmhhc0NsYXNzKCdkb25lJykpe1xyXG5cdFx0XHRcdFx0XHRwcmVsb2FkZXIuYWRkQ2xhc3MoJ2RvbmUnKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LCAxMDAwKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0pLmNhdGNoKGZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4gO1xyXG5cdFx0fSk7XHJcblxyXG5cclxuIiwiLy8ganMg0YTQsNC50Lsg0LTQu9GPINCy0LDQu9C40LTQsNGG0LjQuCDRhNC+0YDQvFxyXG5cclxuXHJcbihmdW5jdGlvbiggJCApe1xyXG5cclxuXHJcblx0JChmdW5jdGlvbigpe1xyXG5cclxuXHRcdC8vINC30LDQtNCw0LXQvCDQv9C10YDQtdC80LXQvdC90YvQtVxyXG5cdFx0dmFyIGZvcm0gICAgICAgPSAkKCcuanNfX2Zvcm0nKSxcclxuXHRcdFx0XHRpbnB1dCAgICAgID0gZm9ybS5maW5kKCcuanNfX2lucHV0JyksXHJcblx0XHRcdFx0YnRuICAgICAgICA9IGZvcm0uZmluZCgnLmpzX19mb3JtLWJ0bicpLFxyXG5cdFx0XHRcdGJ0blJlc2V0ICAgPSBmb3JtLmZpbmQoJy5qc19fZm9ybS1idG4tLXJlc2V0JyksXHJcblx0XHRcdFx0aWNvbiAgICAgICA9IGZvcm0uZmluZCgnLmpzX19mb3JtLWljb24nKSxcclxuXHRcdFx0XHRjaGVjayAgICAgID0gZm9ybS5maW5kKCcuanNfX2NoZWNrJyksXHJcblx0XHRcdFx0ZW1haWwgICAgICA9IGZvcm0uZmluZCgnLmpzX19mb3JtLWVtYWlsJyksXHJcblx0XHRcdFx0cGF0dGVybiAgICA9IC9eW2EtejAtOV8tXStAW2EtejAtOS1dK1xcLlthLXpdezIsNn0kL2ksXHJcblx0XHRcdFx0dmFsaWQgICAgICA9IHRydWU7XHJcblxyXG5cdFx0Ly8g0YTRg9C90LrRhtC40Y8g0LLQsNC70LjQtNCw0YbQuNGPINGE0L7RgNC80YtcclxuXHRcdHZhciB2YWxpZEZ1bmMgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0XHQvLyDQv9GA0L7QstC10YDRj9C10Lwg0LrQsNC20LTRi9C5IGlucHV0XHJcblx0XHRcdGlucHV0LmVhY2goZnVuY3Rpb24oaSkge1xyXG5cclxuXHRcdFx0XHQvLyDQv9GA0L7QstC10YDRj9C10Lwg0YPRgdC70L7QstC40LUsINC10YHRgtGMINC70Lgg0LIg0L/QvtC70LUg0YfRgtC+LdC90LjQtNGMXHJcblx0XHRcdFx0aWYoJCh0aGlzKS52YWwoKSAhPSAnJykge1xyXG5cdFx0XHRcdFx0JCh0aGlzKS5jc3MoJ2JvcmRlcicsICcycHggc29saWQgIzAwOTY4OCcpOyBcclxuXHRcdFx0XHRcdGljb24uZXEoaSkuY3NzKCdjb2xvcicsICcjMDA5Njg4Jyk7XHJcblx0XHRcdFx0XHRidG4ucmVtb3ZlQ2xhc3MoJ2pzX19mb3JtLW5vLXN1Ym1pdCcpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQkKHRoaXMpLmNzcygnYm9yZGVyJywgJzJweCBzb2xpZCAjZTQ0ODQ1Jyk7XHJcblx0XHRcdFx0XHRpY29uLmVxKGkpLmNzcygnY29sb3InLCAnI2U0NDg0NScpO1xyXG5cdFx0XHRcdFx0YnRuLmFkZENsYXNzKCdqc19fZm9ybS1uby1zdWJtaXQnKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHR9KTsgLy8gLS0+INC30LDQutCw0L3Rh9C40LLQsNC10Lwg0L/RgNC+0LLQtdGA0Y/RgtGMINC40L3Qv9GD0YLRi1xyXG5cclxuXHJcblx0XHRcdC8vINGD0YHQu9C+0LLQuNGPINC90LDQu9C40YfQuNGPINGH0LXQui3QuNC90L/Rg9GC0L7QslxyXG5cdFx0XHRpZihjaGVjaykge1xyXG5cclxuXHRcdFx0XHQvLyDQv9GA0L7QstC10YDRj9C10Lwg0LrQsNC20LTRi9C5INGH0LXQui3QuNC90L/Rg9GCXHJcblx0XHRcdFx0Y2hlY2suZWFjaChmdW5jdGlvbigpIHtcclxuXHJcblx0XHRcdFx0XHQvLyDQv9GA0L7QstC10YDRj9C10Lwg0YPRgdC70L7QstC40LUsINCy0YvQsdGA0LDQvSDQu9C4INC40L3Qv9GD0YJcclxuXHRcdFx0XHRcdGlmKCQodGhpcykucHJvcChcImNoZWNrZWRcIikpe1xyXG5cdFx0XHRcdFx0XHR2YWxpZCA9IHRydWU7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHR2YWxpZCA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0cmV0dXJuIHZhbGlkO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gdmFsaWQ7XHJcblx0XHRcdH1cclxuXHJcblxyXG5cdFx0XHRyZXR1cm4gdmFsaWQ7XHJcblx0XHR9IC8vIC0tPiB2YWxpZEZ1bmMgaXMgZW5kXHJcblxyXG5cclxuXHRcdC8vINGE0YPQvdC60YbQuNGPINC00LvRjyDQv9GA0L7QstC10YDQutC4IGVtYWlsXHJcblx0XHR2YXIgZW1haWxGdW5jPSBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0XHQvLyDQv9GA0L7QstC10YDRj9C10Lwg0YPRgdC70L7QstC40LUsINC10YHRgtGMINC70Lgg0YfRgtC+LdC90LjQtNGMINCyINC90ZHQvFxyXG5cdFx0XHRpZiAoZW1haWwudmFsKCkgIT0gJycpIHtcclxuXHJcblx0XHRcdFx0XHQvLyDQv9GA0L7QstC10YDRj9C10LwsINGB0L7QvtGC0LLQtdGC0YHRgtCy0YPQtdGCINC70Lgg0YjQsNCx0LvQvtC90YMgZW1haWxcclxuXHRcdFx0XHRcdGlmKGVtYWlsLnZhbCgpLnNlYXJjaChwYXR0ZXJuKSA9PSAwKXtcclxuXHRcdFx0XHRcdFx0ZW1haWwuY3NzKCdib3JkZXInLCAnMnB4IHNvbGlkICMwMDk2ODgnKTtcclxuXHRcdFx0XHRcdFx0dmFsaWQgPSB0cnVlO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0ZW1haWwuY3NzKCdib3JkZXInLCAnMnB4IHNvbGlkICNlNDQ4NDUnKTtcclxuXHRcdFx0XHRcdFx0dmFsaWQgPSBmYWxzZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0ZW1haWwuY3NzKCdib3JkZXInLCAnMnB4IHNvbGlkICNlNDQ4NDUnKTtcclxuXHRcdFx0XHRcdHZhbGlkID0gZmFsc2VcclxuXHRcdFx0XHR9XHJcblxyXG5cclxuXHRcdFx0cmV0dXJuIHZhbGlkO1xyXG5cdFx0fSAvLyAtLT4gZW1haWxGdW5jIGlzIGVuZFxyXG5cclxuXHJcblx0XHQvLyDRhNGD0L3QutGG0LjRjyDQtNC70Y8gZW1haWwsINC60L7Qs9C00LAg0L/QvtC60LjQtNCw0YjRjCDQuNC90L/Rg9GCXHJcblx0XHRlbWFpbC5ibHVyKGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0Ly8g0L/RgNC+0LLQtdGA0Y/QtdC8IGVtYWlsLCDQvdCwINC90LDQu9C40YfQuNC1INGH0LXQs9C+LdC90LjQtNGMXHJcblx0XHRcdGlmIChlbWFpbC52YWwoKSAhPSAnJykge1xyXG5cclxuXHRcdFx0XHQvLyDRgdC+0L7RgtCy0LXRgtGB0YLQstGD0LXRgiDQu9C4INC90LDRiNC10LzRgyDRiNCw0LHQu9C+0L3Rg1xyXG5cdFx0XHRcdGlmKGVtYWlsLnZhbCgpLnNlYXJjaChwYXR0ZXJuKSA9PSAwKXtcclxuXHRcdFx0XHRcdGVtYWlsLmNzcygnYm9yZGVyJywgJzJweCBzb2xpZCAjMDA5Njg4Jyk7XHJcblx0XHRcdFx0XHR2YWxpZCA9IHRydWU7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGVtYWlsLmNzcygnYm9yZGVyJywgJzJweCBzb2xpZCAjZTQ0ODQ1Jyk7XHJcblx0XHRcdFx0XHR2YWxpZCA9IGZhbHNlXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGVtYWlsLmNzcygnYm9yZGVyJywgJzJweCBzb2xpZCAjZTQ0ODQ1Jyk7XHJcblx0XHRcdFx0dmFsaWQgPSBmYWxzZVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fSk7XHJcblxyXG5cclxuXHRcdC8vINC/0YDQvtCy0LXRgNGP0LXQvCDQutCw0LbQtNGL0Lkg0LjQvdC/0YPRglxyXG5cdFx0aW5wdXQuZWFjaChmdW5jdGlvbihpKSB7XHJcblxyXG5cdFx0XHQvLyDQtNC70Y8g0LrQsNC20LTQvtCz0L4g0LjQvdC/0YPRgtCwINC/0YDQuCDQv9C+0LrQuNC00LDQvdC40Lgg0L/QvtC70Y9cclxuXHRcdFx0JCh0aGlzKS5ibHVyKGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0XHQvLyDQv9GA0L7QstC10YDRj9C10Lwg0L3QsNC70LjRh9C40LUg0YfQtdCz0L4t0LvQuNCx0L5cclxuXHRcdFx0XHRpZigkKHRoaXMpLnZhbCgpICE9ICcnKSB7XHJcblx0XHRcdFx0XHQkKHRoaXMpLmNzcygnYm9yZGVyJywgJzJweCBzb2xpZCAjMDA5Njg4Jyk7XHJcblx0XHRcdFx0XHRpY29uLmVxKGkpLmNzcygnY29sb3InLCAnIzAwOTY4OCcpO1xyXG5cdFx0XHRcdFx0YnRuLnJlbW92ZUNsYXNzKCdqc19fZm9ybS1uby1zdWJtaXQnKVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQkKHRoaXMpLmNzcygnYm9yZGVyJywgJzJweCBzb2xpZCAjZTQ0ODQ1Jyk7XHJcblx0XHRcdFx0XHRpY29uLmVxKGkpLmNzcygnY29sb3InLCAnI2U0NDg0NScpO1xyXG5cdFx0XHRcdFx0YnRuLmFkZENsYXNzKCdqc19fZm9ybS1uby1zdWJtaXQnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdH0pO1xyXG5cclxuXHJcblx0XHQvLyDQv9GA0Lgg0LrQu9C40LrQtSDQvdCwINC60L3QvtC/0LrRgyDQvtGC0L/RgNCw0LLQutC4XHJcblx0XHRidG4uY2xpY2soZnVuY3Rpb24oZSkge1xyXG5cclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR2YWxpZEZ1bmMoKTtcclxuXHJcblx0XHRcdC8vINC10YHQu9C4INC10YHRgtGMIGVtYWlsXHJcblx0XHRcdGlmKGVtYWlsKSB7XHJcblx0XHRcdFx0ZW1haWxGdW5jKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vINC/0YDQvtCy0LXRgNGP0YLRjCDRg9GB0LvQvtCy0LjQtSDQtdGB0YLRjCDQu9C4INC60LvQsNGB0YFcclxuXHRcdFx0aWYoYnRuLmhhc0NsYXNzKCdqc19fZm9ybS1uby1zdWJtaXQnKSkge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRmb3JtLnN1Ym1pdCgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0fSk7XHJcblxyXG5cclxuXHRcdC8vINC/0YDQuCDQutC70LjQutC1INC90LAg0LrQvdC+0L/QutGDIFwi0L7Rh9C40YHRgtC40YLRjFwiXHJcblx0XHRidG5SZXNldC5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdFx0aW5wdXQuYWRkKGVtYWlsKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG5cdFx0fSk7XHJcblxyXG5cclxuXHR9KTsgLy8gLS0+IHJlYWR5IGVuZFxyXG5cclxufSkoIGpRdWVyeSApO1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbi8qXHJcbihmdW5jdGlvbiggJCApe1xyXG5cclxuJChmdW5jdGlvbigpIHtcclxuXHJcbiAgJCgnLmpzX19mb3JtJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgLy8g0J7QsdGK0Y/QstC70Y/QtdC8INC/0LXRgNC10LzQtdC90L3Ri9C1ICjRhNC+0YDQvNCwINC4INC60L3QvtC/0LrQsCDQvtGC0L/RgNCw0LLQutC4KVxyXG5cdHZhciBmb3JtID0gJCh0aGlzKSxcclxuICAgICAgICBidG4gPSBmb3JtLmZpbmQoJy5qc19fZm9ybS1idG4nKSxcclxuICAgICAgICBpY29uID0gZm9ybS5maW5kKCcuanNfX2Zvcm0taWNvbicpO1xyXG5cclxuICAgIC8vINCU0L7QsdCw0LLQu9GP0LXQvCDQutCw0LbQtNC+0LzRgyDQv9GA0L7QstC10YDRj9C10LzQvtC80YMg0L/QvtC70Y4sINGD0LrQsNC30LDQvdC40LUg0YfRgtC+INC/0L7Qu9C1INC/0YPRgdGC0L7QtVxyXG5cdGZvcm0uZmluZCgnLmpzX19pbnB1dCcpLmFkZENsYXNzKCdlbXB0eV9maWVsZCcpO1xyXG5cdGljb24uYWRkQ2xhc3MoJ2VtcHR5X2ljb24nKTtcclxuXHJcbiAgICAvLyDQpNGD0L3QutGG0LjRjyDQv9GA0L7QstC10YDQutC4INC/0L7Qu9C10Lkg0YTQvtGA0LzRi1xyXG4gICAgZnVuY3Rpb24gY2hlY2tJbnB1dCgpe1xyXG4gICAgICBmb3JtLmZpbmQoJy5qc19faW5wdXQnKS5lYWNoKGZ1bmN0aW9uKGkpe1xyXG4gICAgICAgIGlmKCQodGhpcykudmFsKCkgIT0gJycpe1xyXG4gICAgICAgICAgLy8g0JXRgdC70Lgg0L/QvtC70LUg0L3QtSDQv9GD0YHRgtC+0LUg0YPQtNCw0LvRj9C10Lwg0LrQu9Cw0YHRgS3Rg9C60LDQt9Cw0L3QuNC1XHJcblx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKCdlbXB0eV9maWVsZCcpLmNzcygnYm9yZGVyJywgJzJweCBzb2xpZCBncmVlbicpO1xyXG5cdFx0aWNvbi5lcShpKS5yZW1vdmVDbGFzcygnZW1wdHlfaWNvbicpLmNzcygnY29sb3InLCAnZ3JlZW4nKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8g0JXRgdC70Lgg0L/QvtC70LUg0L/Rg9GB0YLQvtC1INC00L7QsdCw0LLQu9GP0LXQvCDQutC70LDRgdGBLdGD0LrQsNC30LDQvdC40LVcclxuXHRcdCQodGhpcykuYWRkQ2xhc3MoJ2VtcHR5X2ZpZWxkJyk7XHJcblx0XHRpY29uLmVxKGkpLmFkZENsYXNzKCdlbXB0eV9pY29uJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDQpNGD0L3QutGG0LjRjyDQv9C+0LTRgdCy0LXRgtC60Lgg0L3QtdC30LDQv9C+0LvQvdC10L3QvdGL0YUg0L/QvtC70LXQuVxyXG4gICAgZnVuY3Rpb24gbGlnaHRFbXB0eSgpe1xyXG4gICAgICBmb3JtLmZpbmQoJy5lbXB0eV9maWVsZCcpLmNzcygnYm9yZGVyJywnMnB4IHNvbGlkIHJlZCcpO1xyXG4gICAgICBmb3JtLmZpbmQoJy5lbXB0eV9pY29uJykuY3NzKCdjb2xvcicsICdyZWQnKTtcclxuXHJcbiAgICAgIC8vIC8vINCn0LXRgNC10Lcg0L/QvtC70YHQtdC60YPQvdC00Ysg0YPQtNCw0LvRj9C10Lwg0L/QvtC00YHQstC10YLQutGDXHJcbiAgICAgIC8vIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgLy8gICBmb3JtLmZpbmQoJy5lbXB0eV9maWVsZCcpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgIC8vICAgZm9ybS5maW5kKCcuZW1wdHlfaWNvbicpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgIC8vIH0sNzAwKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy8g0J/RgNC+0LLQtdGA0LrQsCDQsiDRgNC10LbQuNC80LUg0YDQtdCw0LvRjNC90L7Qs9C+INCy0YDQtdC80LXQvdC4XHJcbiAgICBzZXRJbnRlcnZhbChmdW5jdGlvbigpe1xyXG4gICAgICAvLyDQl9Cw0L/Rg9GB0LrQsNC10Lwg0YTRg9C90LrRhtC40Y4g0L/RgNC+0LLQtdGA0LrQuCDQv9C+0LvQtdC5INC90LAg0LfQsNC/0L7Qu9C90LXQvdC90L7RgdGC0YxcclxuXHQgIGNoZWNrSW5wdXQoKTtcclxuICAgICAgLy8g0KHRh9C40YLQsNC10Lwg0Lot0LLQviDQvdC10LfQsNC/0L7Qu9C90LXQvdC90YvRhSDQv9C+0LvQtdC5XHJcbiAgICAgIHZhciBzaXplRW1wdHkgPSBmb3JtLmZpbmQoJy5lbXB0eV9maWVsZCcpLmxlbmd0aDtcclxuICAgICAgLy8g0JLQtdGI0LDQtdC8INGD0YHQu9C+0LLQuNC1LdGC0YDQuNCz0LXRgCDQvdCwINC60L3QvtC/0LrRgyDQvtGC0L/RgNCw0LLQutC4INGE0L7RgNC80YtcclxuICAgICAgaWYoc2l6ZUVtcHR5ID4gMCl7XHJcbiAgICAgICAgaWYoYnRuLmhhc0NsYXNzKCdidG5fX2Rpc2FibGVkJykpe1xyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGJ0bi5hZGRDbGFzcygnYnRuX19kaXNhYmxlZCcpXHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGJ0bi5yZW1vdmVDbGFzcygnYnRuX19kaXNhYmxlZCcpXHJcbiAgICAgIH1cclxuICAgIH0sNTAwKTtcclxuXHJcbiAgICAvLyDQodC+0LHRi9GC0LjQtSDQutC70LjQutCwINC/0L4g0LrQvdC+0L/QutC1INC+0YLQv9GA0LDQstC40YLRjFxyXG4gICAgYnRuLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgIGlmKCQodGhpcykuaGFzQ2xhc3MoJ2J0bl9fZGlzYWJsZWQnKSl7XHJcbiAgICAgICAgLy8g0L/QvtC00YHQstC10YfQuNCy0LDQtdC8INC90LXQt9Cw0L/QvtC70L3QtdC90L3Ri9C1INC/0L7Qu9GPINC4INGE0L7RgNC80YMg0L3QtSDQvtGC0L/RgNCw0LLQu9GP0LXQvCwg0LXRgdC70Lgg0LXRgdGC0Ywg0L3QtdC30LDQv9C+0LvQvdC10L3QvdGL0LUg0L/QvtC70Y9cclxuXHRcdGxpZ2h0RW1wdHkoKTtcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyDQktGB0LUg0YXQvtGA0L7RiNC+LCDQstGB0LUg0LfQsNC/0L7Qu9C90LXQvdC+LCDQvtGC0L/RgNCw0LLQu9GP0LXQvCDRhNC+0YDQvNGDXHJcbiAgICAgICAgZm9ybS5zdWJtaXQoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn0pO1xyXG5cclxufSkoIGpRdWVyeSApO1xyXG5cclxuKi8iLCIvLyBqcyDQtNC70Y8g0YHQutGA0L7Qu9C70LAg0LLQvdC40Lcg0LjQu9C4INCy0LLQtdGA0YVcclxuJ3VzZSBzY3RyaWN0JztcclxuXHJcbiQoZnVuY3Rpb24gKCl7XHJcblxyXG5cdC8vINC30LDQtNCw0ZHQvCDQv9C10YDQtdC80LXQvdC90YvQtVxyXG5cdHZhciBib2R5ID0gJCgnYm9keSwgaHRtbCcpLFxyXG5cdFx0YXJyb3dEb3duID0gJCgnLmpzX19hcnJvdy1kb3duJyksXHJcblx0XHRhcnJvd1VwID0gJCgnLmpzX19hcnJvdy11cCcpLFxyXG5cdFx0aGVhZGVySGVpZ2h0ID0gJCgnLmpzX19oZWFkZXInKS5oZWlnaHQoKTtcclxuXHJcblx0Ly8g0L/RgNC+0LLQtdGA0Y/QtdC8INC90LDQu9C40YfQuNC1INGB0YLRgNC10LvQutC4IC0tINCy0L3QuNC3XHJcblx0aWYoYXJyb3dEb3duKXtcclxuXHRcdC8vINGE0YPQvdC60YbQuNGPINC/0YDQuCDQvdCw0LbQsNGC0LjQuFxyXG5cdFx0YXJyb3dEb3duLmNsaWNrKGZ1bmN0aW9uKCl7XHJcblx0XHRcdC8vINCw0L3QuNC80LDRhtC40Y8g0YHQutGA0L7Qu9C70LBcclxuXHRcdFx0Ym9keS5hbmltYXRlKHtzY3JvbGxUb3A6IGhlYWRlckhlaWdodH0sIDE1MDApO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHQvLyDQv9GA0L7QstC10YDRj9C10Lwg0L3QsNC70LjRh9C1INGB0YLRgNC10LvQutC4IC0tINCy0LLQtdGA0YVcclxuXHRpZihhcnJvd1VwKSB7XHJcblx0XHQvLyDRhNGD0L3QutGG0LjRjyDQv9GA0Lgg0L3QsNC20LDRgtC40LhcclxuXHRcdGFycm93VXAuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHRcdC8vINCw0L3QuNC80LDRhtC40Y8g0YHQutGA0L7Qu9C70LBcclxuXHRcdFx0Ym9keS5hbmltYXRlKHtzY3JvbGxUb3A6IDB9LCAyNTAwKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcbn0pO1xyXG4iLCIvLyBqcyDQtNC70Y8gaW5kZXgtcGFyYWxsYXhcclxuXHJcbiQoZnVuY3Rpb24oKXtcclxuXHJcblx0Ly8g0LfQsNC00LDRkdC8INC/0LXRgNC10LzQtdC90L3Ri9C1XHJcblx0dmFyIHBhcmFsbGF4Q29udGFpbmVyID0gJCgnLnBhcmFsbGF4JyksXHJcblx0XHRsYXllcnMgPSAkKCcucGFyYWxsYXhfX2xheWVyJyk7XHJcblxyXG5cclxuXHQvLyDQv9GA0L7QvNC40YEg0LrQvtGC0L7RgNGL0Lkg0LHRg9C00LXRgiDQv9GA0L7QstC10YDRj9GC0Ywg0L3QsNC70LjRh9C40LUg0JPQu9Cw0LLQvdC+0LPQviDQv9Cw0YDQsNC70LvQsNC60YHQsCDQvdCwINGB0YLRgNCw0L3QuNGG0LVcclxuXHR2YXIgcGFyYWxsYXhQcm9taXNlID0gbmV3IFByb21pc2UgKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cdFx0XHRpZiAocGFyYWxsYXhDb250YWluZXIubGVuZ3RoKSB7XHJcblx0XHRcdFx0cmVzb2x2ZSgpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlamVjdCgpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0Ly8g0YTRg9C90LrRhtC40Y8g0L/RgNC4INC90LDQu9C40YfQuNC4INCz0LvQsNCy0L3QvtCz0L4g0L/QsNGA0LDQu9C70LDQutGB0LBcclxuXHRwYXJhbGxheFByb21pc2UudGhlbihmdW5jdGlvbigpe1xyXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG1vdmVMYXllcnMpO1xyXG5cdH0pLmNhdGNoKGZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4gO1xyXG5cdFx0fSk7XHJcblxyXG5cdC8vINGE0YPQvdC60YbQuNGPINC00LvRjyDQtNCy0LjQttC10L3QuNGPINGB0LvQvtGR0LJcclxuXHR2YXIgbW92ZUxheWVycyA9IGZ1bmN0aW9uIChlKSB7XHJcblx0XHR2YXIgaW5pdGlhbFggPSAod2luZG93LmlubmVyV2lkdGggLyAyKSAtIGUucGFnZVgsXHJcblx0XHRcdGluaXRpYWxZID0gKHdpbmRvdy5pbm5lckhlaWdodCAvIDIpIC0gZS5wYWdlWTtcclxuXHJcblx0XHRbXS5zbGljZS5jYWxsKGxheWVycykuZm9yRWFjaChmdW5jdGlvbihsYXllciwgaW5kZXgpIHtcclxuXHRcdFx0dmFyIGRpdmlkZXIgPSBpbmRleCAvIDEwMCxcclxuXHRcdFx0XHRwb3NpdGlvblggPSBpbml0aWFsWCAqIGRpdmlkZXIsXHJcblx0XHRcdFx0cG9zaXRpb25ZID0gaW5pdGlhbFkgKiBkaXZpZGVyLFxyXG5cdFx0XHRcdHRyYW5zZm9ybVN0cmluZyA9ICd0cmFuc2xhdGUoJyArIHBvc2l0aW9uWCArICdweCwnICsgcG9zaXRpb25ZICsgJ3B4KSc7XHJcblxyXG5cdFx0XHRsYXllci5zdHlsZS50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1TdHJpbmc7XHJcblx0XHR9KTtcclxuXHR9O1xyXG59KTsiLCIvLyBGbGlwINGN0YTRhNC10LrRglxyXG5cclxuJChmdW5jdGlvbigpe1xyXG5cclxuXHQvLyDQt9Cw0LTQsNGR0Lwg0L/QtdGA0LXQvNC10L3QvdGL0LVcclxuXHR2YXIgbGluayA9ICQoJy5idG4tYXV0aG9fX2xpbmsnKSxcclxuXHRcdGJveCA9ICQoJy5mbGlwJyksXHJcblx0XHRtYWluTGluayA9ICQoJy5sb2dpbl9fbGluaycpOyBcclxuXHJcblx0Ly8g0L/RgNC+0LzQuNGBINC60L7RgtC+0YDRi9C5INCx0YPQtNC10YIg0L/RgNC+0LLQtdGA0Y/RgtGMINC90LDQu9C40YfQuNC1INGE0LvQuNC/INC60L7RgtC10LnQvdC10YDQsCDQvdCwINGB0YLRgNCw0L3QuNGG0LVcclxuXHR2YXIgZmxpcFByb21pc2UgPSBuZXcgUHJvbWlzZSAoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblx0XHRcdGlmIChib3gubGVuZ3RoKSB7XHJcblx0XHRcdFx0cmVzb2x2ZSgpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlamVjdCgpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0Ly8g0YTRg9C90LrRhtC40Y8g0L/RgNC4INC90LDQu9C40YfQuNC4INGE0LvQuNC/INC60L7QvdGC0LXQudC90LXRgNC1XHJcblx0ZmxpcFByb21pc2UudGhlbihmdW5jdGlvbigpIHtcclxuXHJcblx0XHQvLyDQv9GA0Lgg0LrQu9C40LrQtSwg0YTQu9C40L8g0LrQvtC90YLQtdC90LXQudGA0YMg0LTQvtCx0LDQstC40YLRjCDQutC70LDRgdGBINGBINC/0L7QstC+0YDQvtGC0L7QvFxyXG5cdFx0bGluay5jbGljayhmdW5jdGlvbihlKSB7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTsgLy8g0L7RgtC80LXQvdCwINGB0YLQsNC90LTQsNGA0YLQvdGL0YUg0LTQtdC50YHQstGC0LnQuFxyXG5cclxuXHRcdFx0Ym94LnRvZ2dsZUNsYXNzKCdqc19fZmxpcCcpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8g0L/RgNC4INC60LvQuNC60LUgINC90LAgXCLQndCwINCz0LvQsNCy0L3Rg9GOXCIsINGD0LTQsNC70LjRgtGMINC60LvQsNGB0YEg0L/QvtCy0L7RgNC+0YLQsCwg0YLQtdC8INGB0LDQvNGL0Lwg0YDQsNC30LLQtdGA0L3Rg9CyINC60L7QvdGC0LXQudC90LXRgFxyXG5cdFx0bWFpbkxpbmsuY2xpY2soZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7IC8vINC+0YLQvNC10L3QsCDRgdGC0LDQvdC00LDRgNGC0L3Ri9GFINC00LXQudGB0LLRgtC50LhcclxuXHJcblx0XHRcdGJveC5yZW1vdmVDbGFzcygnanNfX2ZsaXAnKTtcclxuXHRcdH0pO1xyXG5cdH0pLmNhdGNoKGZ1bmN0aW9uKCl7XHJcblx0XHRcdHJldHVybiA7XHJcblx0XHR9KTtcclxuXHJcbn0pOyIsIi8vIGpzINC00LvRjyDQm9C40L/QutC+0LPQviDRgdCw0LnQtNCx0LDRgNCwINC90LAg0YHRgtGA0LDQvdC40YbQtSDQkdC70L7Qs1xyXG5cclxuKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIC8vINC30LDQtNCw0LXQvCDQv9C10YDQtdC80LXQvdC90YvQtVxyXG4gICAgdmFyIHNpZGViYXIgPSAkKCcuc2lkZWJhcicpLFxyXG4gICAgICAgIHNpZGViYXJGaXggPSAnc2lkZWJhcl9fZml4ZWQnLFxyXG4gICAgICAgIHNjcm9sbEhlaWdodCA9IDY1MDtcclxuXHJcbiAgICAvLyDQv9GA0L7QvNC40YEg0LrQvtGC0L7RgNGL0Lkg0LHRg9C00LXRgiDQv9GA0L7QstC10YDRj9GC0Ywg0L3QsNC70LjRh9C40LUg0KHQsNC50LTQsdCw0YDQsCDQvdCwINGB0YLRgNCw0L3QuNGG0LVcclxuICAgIHZhciBzaWRlYmFyUHJvbWlzZSA9IG5ldyBQcm9taXNlIChmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBpZiAoc2lkZWJhci5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlamVjdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vINGE0YPQvdC60YbQuNGPINC/0YDQuCDQvdCw0LvQuNGH0LjQuCDRgdCw0LnQtNCx0LDRgNCwXHJcbiAgICBzaWRlYmFyUHJvbWlzZS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgLyog0LXRgdC70Lgg0YHQutGA0L7Qu9C7INCx0L7Qu9GM0YjQtSDQt9Cw0LTQsNC90L3QvtC5INCy0YvRgdC+0YLRiywg0YLQviDQtNC+0LHQsNCy0LjRgtGMINC60LvQsNGB0YEgKi9cclxuICAgICAgICAgICAgaWYoJCh0aGlzKS5zY3JvbGxUb3AoKSA+IHNjcm9sbEhlaWdodCl7XHJcbiAgICAgICAgICAgICAgICBzaWRlYmFyLmFkZENsYXNzKHNpZGViYXJGaXgpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPCBzY3JvbGxIZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgIHNpZGViYXIucmVtb3ZlQ2xhc3Moc2lkZWJhckZpeCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pLmNhdGNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcmV0dXJuIDtcclxuICAgIH0pO1xyXG5cclxufSkoKTsiLCIvLyBqcyDQtNC70Y8g0L3QsNCy0LjQs9Cw0YbQuNC4INC90LAg0YHRgtGA0LDQvdC40YbQtSDQkdC70L7Qs1xyXG5cclxuKGZ1bmN0aW9uKCkge1xyXG5cclxuXHQvLyDQv9C10YDQtdC80LXQvdC90YvQtVxyXG5cdHZhciBsaW5rID0gJCgnLnNpZGViYXJfX2xpbmsnKSxcclxuXHRcdGl0ZW0gPSAkKCcud3JpdGVfX2l0ZW0nKTtcclxuXHJcblx0JChmdW5jdGlvbigpe1xyXG5cclxuXHRcdC8vINC/0YDQvtC80LjRgSDQutC+0YLQvtGA0YvQuSDQsdGD0LTQtdGCINC/0YDQvtCy0LXRgNGP0YLRjCDQvdCw0LvQuNGH0LjQtSDQodCw0LnQtNCx0LDRgNCwINC90LAg0YHRgtGA0LDQvdC40YbQtVxyXG5cdFx0dmFyIG5hdlNpZGViYXJQcm9taXNlID0gbmV3IFByb21pc2UgKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cdFx0XHRpZiAobGluay5sZW5ndGgpIHtcclxuXHRcdFx0XHRyZXNvbHZlKCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmVqZWN0KCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vINGE0YPQvdC60YbQuNGPINC/0YDQuCDQvdCw0LvQuNGH0LjQuCDRgdCw0LnQtNCx0LDRgNCwXHJcblx0XHRuYXZTaWRlYmFyUHJvbWlzZS50aGVuKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRsaW5rLmNsaWNrKGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0XHRcdHNob3dBcnRpY2xlKCQodGhpcykuYXR0cignaHJlZicpLCB0cnVlKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KS5jYXRjaChmdW5jdGlvbigpe1xyXG5cdFx0XHRyZXR1cm4gO1xyXG5cdFx0fSk7XHJcblxyXG5cclxuXHR9KTtcclxuXHJcblx0Ly8g0L/RgNC4INGB0LrRgNC+0LvQu9C1INCy0YvQt9GL0LLQsNGC0Ywg0YTRg9C90LrRhtC40Y4gY2hlY2tBcnRpY2xlXHJcblx0JCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcclxuXHRcdGNoZWNrQXJ0aWNsZSgpO1xyXG5cdH0pO1xyXG5cclxuXHJcblx0Ly8g0YTRg9C90LrRhtC40Y8g0LTQu9GPINGB0LrRgNC+0LvQu9CwINC6INC90YPQttC90L7QvNGDINGN0LvQtdC80LXQvdGC0YNcclxuXHRmdW5jdGlvbiBzaG93QXJ0aWNsZShhcnRpY2xlLCBpc0FuaW1hdGUpIHtcclxuXHRcdHZhciBkaXJlY3Rpb24gPSBhcnRpY2xlLnJlcGxhY2UoLyMvLCAnJyksXHJcblx0XHRcdHJlcUFydGljbGUgPSBpdGVtLmZpbHRlcignW2RhdGEtYXJ0aWNsZT1cIicgKyBkaXJlY3Rpb24gKyAnXCJdJyksXHJcblx0XHRcdHJlcUFydGljbGVQb3MgPSByZXFBcnRpY2xlLm9mZnNldCgpLnRvcDtcclxuXHJcblx0XHRpZiAoaXNBbmltYXRlKSB7XHJcblx0XHRcdCQoJ2JvZHksIGh0bWwnKS5hbmltYXRlKHtzY3JvbGxUb3A6IHJlcUFydGljbGVQb3N9LCA1MDApO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Ly8g0YTRg9C90LrRhtC40Y8g0LTQu9GPINCw0LLRgtC+0LzQsNGC0LjRh9C10YHQutC10LPQviDQv9C10YDQtdC60LvRjtGH0LXQvdC40Y8g0LrQu9Cw0YHRgdCwIGFjdGl2ZSDRgyDRgdGB0YvQu9C+0LpcclxuXHRmdW5jdGlvbiBjaGVja0FydGljbGUoKSB7XHJcblx0XHRpdGVtLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhciAkdGhpcyA9ICQodGhpcyksXHJcblx0XHRcdFx0dG9wRWRnZSA9ICR0aGlzLm9mZnNldCgpLnRvcCAtIDE1MCxcclxuXHRcdFx0XHRib3R0b21FZGdlID0gdG9wRWRnZSArICR0aGlzLmhlaWdodCgpLFxyXG5cdFx0XHRcdHdTY3JvbGwgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XHJcblxyXG5cdFx0XHRpZiAodG9wRWRnZSA8IHdTY3JvbGwgJiYgYm90dG9tRWRnZSA+IHdTY3JvbGwpIHtcclxuXHRcdFx0XHR2YXIgY3VycmVudElkID0gJHRoaXMuZGF0YSgnYXJ0aWNsZScpLFxyXG5cdFx0XHRcdFx0cmVxTGluayA9IGxpbmsuZmlsdGVyKCdbaHJlZj1cIiMnICsgY3VycmVudElkICsgJ1wiXScpO1xyXG5cclxuXHRcdFx0XHRcdGxpbmsucmVtb3ZlQ2xhc3MoJ3NpZGViYXJfX2xpbmstLWFjdGl2ZScpO1xyXG5cdFx0XHRcdFx0cmVxTGluay5hZGRDbGFzcygnc2lkZWJhcl9fbGluay0tYWN0aXZlJyk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblxyXG59KSgpOyAiLCIvLyBqcyDRhNCw0LnQuyDQtNC70Y8g0LDQvdC40LzQsNGG0LjQuCDQutGA0YPQs9C+0LIg0YHQutC40LvQu9C+0LJcclxuXHJcbiQoZnVuY3Rpb24oKXtcclxuXHQvLyDQv9C10YDQtdC80LXQvdC90LDRjyDQsdC70L7QutC4INGB0LrQuNC70LvQvtCyXHJcblx0dmFyIGVsZW0gPSAkKCcuc2tpbGxzX19pdGVtcy13cmFwJyk7XHJcblxyXG5cdC8vINC/0YDQvtC80LjRgSDQutC+0YLQvtGA0YvQuSDQsdGD0LTQtdGCINC/0YDQvtCy0LXRgNGP0YLRjCDQvdCw0LvQuNGH0LjQtSDQsdC70L7QutCwINGB0LrQuNC70LvQvtCyXHJcblx0dmFyIHNraWxsc1Byb21pc2UgPSBuZXcgUHJvbWlzZSAoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblx0XHRpZiAoZWxlbS5sZW5ndGgpIHtcclxuXHRcdHJlc29sdmUoKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRyZWplY3QoKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0Ly8g0YTRg9C90LrRhtC40Y8g0L/RgNC4INC90LDQu9C40YfQuNC4INCx0LvQvtC60LAg0YHQutC40LvQu9C+0LJcclxuXHRza2lsbHNQcm9taXNlLnRoZW4oZnVuY3Rpb24oKXtcclxuXHRcdC8vINC/0YDQuCDRgdC60YDQvtC70LvQtSBcclxuXHRcdCQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhciBzY3JvbGxUb3AgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XHJcblxyXG5cdFx0XHQvKiDQtdGB0LvQuCDRhNGD0L3QutGG0LjRjyBjaGVja0Rpc3RhbmNlINCy0LXRgNC90YPQu9CwIHJldHVybiDRgtC+LCDQtNC+0LHQsNCy0LjRgtGMINC60LvQsNGB0YEgLyDQuNC90LDRh9C1INGD0LTQsNC70LjRgtGMICovXHJcblx0XHRcdGlmKGNoZWNrRGlzdGFuY2Uoc2Nyb2xsVG9wKSkge1xyXG5cdFx0XHRcdGVsZW0uYWRkQ2xhc3MoJ2pzX19jaXJjbGUtYW5pbWF0ZScpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGVsZW0ucmVtb3ZlQ2xhc3MoJ2pzX19jaXJjbGUtYW5pbWF0ZScpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9KS5jYXRjaChmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIDtcclxuXHR9KTtcclxuXHJcblx0Ly8g0YTRg9C90LrRhtC40Y8g0LTQu9GPINC/0YDQvtCy0LXRgNC60Lgg0L/QvtC30LjRhtC40Lgg0Y3Qu9C10LzQtdC90YLQsFxyXG5cdHZhciBjaGVja0Rpc3RhbmNlID0gZnVuY3Rpb24oc2Nyb2xsVG9wKSB7XHJcblx0XHR2YXIgb2Zmc2V0ID0gZWxlbS5vZmZzZXQoKS50b3AsXHJcblx0XHRcdHdpbmRvd01hcmdpbiA9IE1hdGguY2VpbCgkKHdpbmRvdykuaGVpZ2h0KCkgLyAzKSxcclxuXHRcdFx0dG9wQm9yZGVyID0gb2Zmc2V0IC0gc2Nyb2xsVG9wIC0gd2luZG93TWFyZ2luIC0gMTAwLFxyXG5cdFx0XHRib3R0b21FZGdlID0gZWxlbS5vdXRlckhlaWdodCh0cnVlKSArIG9mZnNldCxcclxuXHRcdFx0Ym90dG9tQm9yZGVyID0gc2Nyb2xsVG9wICsgd2luZG93TWFyZ2luIC0gYm90dG9tRWRnZTtcclxuXHJcblx0XHRcdHJldHVybiB0b3BCb3JkZXIgPD0gMCAmJiBib3R0b21Cb3JkZXIgPD0gMFxyXG5cdH1cclxuXHJcblxyXG59KTsiLCIvLyBqcyDRhNCw0LnQuyDQtNC70Y8g0LrQsNGA0YLRi1xyXG5cclxuKGZ1bmN0aW9uKCkge1xyXG4gICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkRG9tTGlzdGVuZXIod2luZG93LCAnbG9hZCcsIGluaXQpO1xyXG4gICAgdmFyIG1hcCwgbWFya2Vyc0FycmF5ID0gW107XHJcblxyXG4gICAgZnVuY3Rpb24gYmluZEluZm9XaW5kb3cobWFya2VyLCBtYXAsIGxvY2F0aW9uKSB7XHJcbiAgICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIobWFya2VyLCAnY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZnVuY3Rpb24gY2xvc2UobG9jYXRpb24pIHtcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uLmliLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5pbmZvV2luZG93VmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgbG9jYXRpb24uaWIgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAobG9jYXRpb24uaW5mb1dpbmRvd1Zpc2libGUgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIGNsb3NlKGxvY2F0aW9uKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1hcmtlcnNBcnJheS5mb3JFYWNoKGZ1bmN0aW9uKGxvYywgaW5kZXgpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsb2MuaWIgJiYgbG9jLmliICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlKGxvYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGJveFRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgICAgIGJveFRleHQuc3R5bGUuY3NzVGV4dCA9ICdiYWNrZ3JvdW5kOiAjZmZmOyc7XHJcbiAgICAgICAgICAgICAgICBib3hUZXh0LmNsYXNzTGlzdC5hZGQoJ21kLXdoaXRlZnJhbWUtMmRwJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gYnVpbGRQaWVjZXMobG9jYXRpb24sIGVsLCBwYXJ0LCBpY29uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxvY2F0aW9uW3BhcnRdID09PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChsb2NhdGlvbi5pd1twYXJ0XSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2goZWwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncGhvdG8nOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsb2NhdGlvbi5waG90byl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnPGRpdiBjbGFzcz1cIml3LXBob3RvXCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJyArIGxvY2F0aW9uLnBob3RvICsgJyk7XCI+PC9kaXY+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2l3LXRvb2xiYXInOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnPGRpdiBjbGFzcz1cIml3LXRvb2xiYXJcIj48aDMgY2xhc3M9XCJtZC1zdWJoZWFkXCI+JyArIGxvY2F0aW9uLnRpdGxlICsgJzwvaDM+PC9kaXY+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2Rpdic6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoKHBhcnQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdlbWFpbCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzxkaXYgY2xhc3M9XCJpdy1kZXRhaWxzXCI+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiIHN0eWxlPVwiY29sb3I6IzQyODVmNDtcIj48aW1nIHNyYz1cIi8vY2RuLm1hcGtpdC5pby92MS9pY29ucy8nICsgaWNvbiArICcuc3ZnXCIvPjwvaT48c3Bhbj48YSBocmVmPVwibWFpbHRvOicgKyBsb2NhdGlvbi5lbWFpbCArICdcIiB0YXJnZXQ9XCJfYmxhbmtcIj4nICsgbG9jYXRpb24uZW1haWwgKyAnPC9hPjwvc3Bhbj48L2Rpdj4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3dlYic6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzxkaXYgY2xhc3M9XCJpdy1kZXRhaWxzXCI+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiIHN0eWxlPVwiY29sb3I6IzQyODVmNDtcIj48aW1nIHNyYz1cIi8vY2RuLm1hcGtpdC5pby92MS9pY29ucy8nICsgaWNvbiArICcuc3ZnXCIvPjwvaT48c3Bhbj48YSBocmVmPVwiJyArIGxvY2F0aW9uLndlYiArICdcIiB0YXJnZXQ9XCJfYmxhbmtcIj4nICsgbG9jYXRpb24ud2ViX2Zvcm1hdHRlZCArICc8L2E+PC9zcGFuPjwvZGl2Pic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZGVzYyc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzxsYWJlbCBjbGFzcz1cIml3LWRlc2NcIiBmb3I9XCJjYl9kZXRhaWxzXCI+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwiY2JfZGV0YWlsc1wiLz48aDMgY2xhc3M9XCJpdy14LWRldGFpbHNcIj5EZXRhaWxzPC9oMz48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zIHRvZ2dsZS1vcGVuLWRldGFpbHNcIj48aW1nIHNyYz1cIi8vY2RuLm1hcGtpdC5pby92MS9pY29ucy8nICsgaWNvbiArICcuc3ZnXCIvPjwvaT48cCBjbGFzcz1cIml3LXgtZGV0YWlsc1wiPicgKyBsb2NhdGlvbi5kZXNjICsgJzwvcD48L2xhYmVsPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnPGRpdiBjbGFzcz1cIml3LWRldGFpbHNcIj48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+PGltZyBzcmM9XCIvL2Nkbi5tYXBraXQuaW8vdjEvaWNvbnMvJyArIGljb24gKyAnLnN2Z1wiLz48L2k+PHNwYW4+JyArIGxvY2F0aW9uW3BhcnRdICsgJzwvc3Bhbj48L2Rpdj4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdvcGVuX2hvdXJzJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbXMgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobG9jYXRpb24ub3Blbl9ob3Vycy5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsb2NhdGlvbi5vcGVuX2hvdXJzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSAhPT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXMgKz0gJzxsaT48c3Ryb25nPicgKyBsb2NhdGlvbi5vcGVuX2hvdXJzW2ldLmRheSArICc8L3N0cm9uZz48c3Ryb25nPicgKyBsb2NhdGlvbi5vcGVuX2hvdXJzW2ldLmhvdXJzICsnPC9zdHJvbmc+PC9saT4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZpcnN0ID0gJzxsaT48bGFiZWwgZm9yPVwiY2JfaG91cnNcIj48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCJjYl9ob3Vyc1wiLz48c3Ryb25nPicgKyBsb2NhdGlvbi5vcGVuX2hvdXJzWzBdLmRheSArICc8L3N0cm9uZz48c3Ryb25nPicgKyBsb2NhdGlvbi5vcGVuX2hvdXJzWzBdLmhvdXJzICsnPC9zdHJvbmc+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29ucyB0b2dnbGUtb3Blbi1ob3Vyc1wiPjxpbWcgc3JjPVwiLy9jZG4ubWFwa2l0LmlvL3YxL2ljb25zL2tleWJvYXJkX2Fycm93X2Rvd24uc3ZnXCIvPjwvaT48dWw+JyArIGl0ZW1zICsgJzwvdWw+PC9sYWJlbD48L2xpPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwiaXctbGlzdFwiPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgZmlyc3QtbWF0ZXJpYWwtaWNvbnNcIiBzdHlsZT1cImNvbG9yOiM0Mjg1ZjQ7XCI+PGltZyBzcmM9XCIvL2Nkbi5tYXBraXQuaW8vdjEvaWNvbnMvJyArIGljb24gKyAnLnN2Z1wiLz48L2k+PHVsPicgKyBmaXJzdCArICc8L3VsPjwvZGl2Pic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBib3hUZXh0LmlubmVySFRNTCA9IFxyXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkUGllY2VzKGxvY2F0aW9uLCAncGhvdG8nLCAncGhvdG8nLCAnJykgK1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkUGllY2VzKGxvY2F0aW9uLCAnaXctdG9vbGJhcicsICd0aXRsZScsICcnKSArXHJcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRQaWVjZXMobG9jYXRpb24sICdkaXYnLCAnYWRkcmVzcycsICdsb2NhdGlvbl9vbicpICtcclxuICAgICAgICAgICAgICAgICAgICBidWlsZFBpZWNlcyhsb2NhdGlvbiwgJ2RpdicsICd3ZWInLCAncHVibGljJykgK1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkUGllY2VzKGxvY2F0aW9uLCAnZGl2JywgJ2VtYWlsJywgJ2VtYWlsJykgK1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkUGllY2VzKGxvY2F0aW9uLCAnZGl2JywgJ3RlbCcsICdwaG9uZScpICtcclxuICAgICAgICAgICAgICAgICAgICBidWlsZFBpZWNlcyhsb2NhdGlvbiwgJ2RpdicsICdpbnRfdGVsJywgJ3Bob25lJykgK1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkUGllY2VzKGxvY2F0aW9uLCAnb3Blbl9ob3VycycsICdvcGVuX2hvdXJzJywgJ2FjY2Vzc190aW1lJykgK1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkUGllY2VzKGxvY2F0aW9uLCAnZGl2JywgJ2Rlc2MnLCAna2V5Ym9hcmRfYXJyb3dfZG93bicpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBteU9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxpZ25Cb3R0b206IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogYm94VGV4dCxcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlQXV0b1BhbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBtYXhXaWR0aDogMCxcclxuICAgICAgICAgICAgICAgICAgICBwaXhlbE9mZnNldDogbmV3IGdvb2dsZS5tYXBzLlNpemUoLTE0MCwgLTQwKSxcclxuICAgICAgICAgICAgICAgICAgICB6SW5kZXg6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgYm94U3R5bGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICcyODBweCdcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlQm94TWFyZ2luOiAnMHB4IDBweCAwcHggMHB4JyxcclxuICAgICAgICAgICAgICAgICAgICBpbmZvQm94Q2xlYXJhbmNlOiBuZXcgZ29vZ2xlLm1hcHMuU2l6ZSgxLCAxKSxcclxuICAgICAgICAgICAgICAgICAgICBpc0hpZGRlbjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFuZTogJ2Zsb2F0UGFuZScsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlRXZlbnRQcm9wYWdhdGlvbjogZmFsc2VcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgbG9jYXRpb24uaWIgPSBuZXcgSW5mb0JveChteU9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgbG9jYXRpb24uaWIub3BlbihtYXAsIG1hcmtlcik7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5pbmZvV2luZG93VmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgICAgIHZhciBtYXBPcHRpb25zID0ge1xyXG4gICAgICAgICAgICBjZW50ZXI6IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoNTUuNzQ4MzU4MTEyNzIwMzc1LDUyLjM1NDE3NTg4NzQ5OTk4KSxcclxuICAgICAgICAgICAgem9vbTogMTMsXHJcbiAgICAgICAgICAgIGdlc3R1cmVIYW5kbGluZzogJ2Nvb3BlcmF0aXZlJyxcclxuICAgICAgICAgICAgZnVsbHNjcmVlbkNvbnRyb2w6IGZhbHNlLFxyXG4gICAgICAgICAgICB6b29tQ29udHJvbDogdHJ1ZSxcclxuICAgICAgICAgICAgZGlzYWJsZURvdWJsZUNsaWNrWm9vbTogdHJ1ZSxcclxuICAgICAgICAgICAgbWFwVHlwZUNvbnRyb2w6IHRydWUsXHJcbiAgICAgICAgICAgIG1hcFR5cGVDb250cm9sT3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgc3R5bGU6IGdvb2dsZS5tYXBzLk1hcFR5cGVDb250cm9sU3R5bGUuSE9SSVpPTlRBTF9CQVIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNjYWxlQ29udHJvbDogZmFsc2UsXHJcbiAgICAgICAgICAgIHNjcm9sbHdoZWVsOiBmYWxzZSxcclxuICAgICAgICAgICAgc3RyZWV0Vmlld0NvbnRyb2w6IGZhbHNlLFxyXG4gICAgICAgICAgICBkcmFnZ2FibGUgOiB0cnVlLFxyXG4gICAgICAgICAgICBjbGlja2FibGVJY29uczogdHJ1ZSxcclxuICAgICAgICAgICAgem9vbUNvbnRyb2xPcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogZ29vZ2xlLm1hcHMuQ29udHJvbFBvc2l0aW9uLlJJR0hUX0NFTlRFUlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBtYXBUeXBlQ29udHJvbE9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBnb29nbGUubWFwcy5Db250cm9sUG9zaXRpb24uUklHSFRfVE9QXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG1hcFR5cGVJZDogZ29vZ2xlLm1hcHMuTWFwVHlwZUlkLlJPQURNQVAsXHJcbiAgICAgICAgICAgIHN0eWxlczogW3tcImZlYXR1cmVUeXBlXCI6XCJ3YXRlclwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiIzQ2YmNlY1wifSx7XCJ2aXNpYmlsaXR5XCI6XCJvblwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJsYW5kc2NhcGVcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiNmMmYyZjJcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicm9hZFwiLFwic3R5bGVyc1wiOlt7XCJzYXR1cmF0aW9uXCI6LTEwMH0se1wibGlnaHRuZXNzXCI6NDV9XX0se1wiZmVhdHVyZVR5cGVcIjpcInJvYWQuaGlnaHdheVwiLFwic3R5bGVyc1wiOlt7XCJ2aXNpYmlsaXR5XCI6XCJzaW1wbGlmaWVkXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInJvYWQuYXJ0ZXJpYWxcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHMuaWNvblwiLFwic3R5bGVyc1wiOlt7XCJ2aXNpYmlsaXR5XCI6XCJvZmZcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwiYWRtaW5pc3RyYXRpdmVcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHMudGV4dC5maWxsXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjNDQ0NDQ0XCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInRyYW5zaXRcIixcInN0eWxlcnNcIjpbe1widmlzaWJpbGl0eVwiOlwib2ZmXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInBvaVwiLFwic3R5bGVyc1wiOlt7XCJ2aXNpYmlsaXR5XCI6XCJvZmZcIn1dfV1cclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG1hcEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwJyk7XHJcbiAgICAgICAgdmFyIG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAobWFwRWxlbWVudCwgbWFwT3B0aW9ucyk7XHJcbiAgICAgICAgdmFyIGxvY2F0aW9ucyA9IFtcclxuICAgICAgICAgICAge1widGl0bGVcIjpcIkFORFJFV1wiLFwidGVsXCI6XCIrNyg5NTEpODk2LTQyLTQ0XCIsXCJlbWFpbFwiOlwia2F0YXNoaTEzMjhAbWFpbC5ydVwiLFwid2ViXCI6XCJodHRwczovL2FuZHJld2xleWtpbi5naXRodWIuaW8vcG9ydGZvbGlvL2J1aWxkL1wiLFwid2ViX2Zvcm1hdHRlZFwiOlwiYW5kcmV3bGV5a2luLmdpdGh1Yi5pb1wiLFwibGF0XCI6NTUuNzM0NzA1NzA0NTkyODA1LFwibG5nXCI6NTIuMzk3NTE1MDIwNzYyNjI2LFwidmljaW5pdHlcIjpcIlwiLFwibWFya2VyXCI6e1wiZmlsbENvbG9yXCI6XCIjMDBBQ0MxXCIsXCJmaWxsT3BhY2l0eVwiOjEsXCJzdHJva2VXZWlnaHRcIjowLFwic2NhbGVcIjoxLjUsXCJwYXRoXCI6XCJNMTAuMiw3LjRjLTYsMC0xMC45LDQuOS0xMC45LDEwLjljMCw2LDEwLjksMTguNCwxMC45LDE4LjRzMTAuOS0xMi4zLDEwLjktMTguNEMyMS4yLDEyLjIsMTYuMyw3LjQsMTAuMiw3LjR6IE0xMC4yLDIyLjljLTIuNiwwLTQuNi0yLjEtNC42LTQuNnMyLjEtNC42LDQuNi00LjZzNC42LDIuMSw0LjYsNC42UzEyLjgsMjIuOSwxMC4yLDIyLjl6XCIsXCJhbmNob3JcIjp7XCJ4XCI6MTAsXCJ5XCI6MzB9LFwib3JpZ2luXCI6e1wieFwiOjAsXCJ5XCI6MH0sXCJzdHlsZVwiOjF9LFwiaXdcIjp7XCJ0ZWxcIjp0cnVlLFwid2ViXCI6dHJ1ZSxcImVtYWlsXCI6dHJ1ZX19XHJcbiAgICAgICAgXTtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbG9jYXRpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xyXG4gICAgICAgICAgICAgICAgaWNvbjogbG9jYXRpb25zW2ldLm1hcmtlcixcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKGxvY2F0aW9uc1tpXS5sYXQsIGxvY2F0aW9uc1tpXS5sbmcpLFxyXG5cclxuICAgICAgICAgICAgICAgIG1hcDogbWFwLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IGxvY2F0aW9uc1tpXS50aXRsZSxcclxuICAgICAgICAgICAgICAgIGFkZHJlc3M6IGxvY2F0aW9uc1tpXS5hZGRyZXNzLFxyXG4gICAgICAgICAgICAgICAgZGVzYzogbG9jYXRpb25zW2ldLmRlc2MsXHJcbiAgICAgICAgICAgICAgICB0ZWw6IGxvY2F0aW9uc1tpXS50ZWwsXHJcbiAgICAgICAgICAgICAgICBpbnRfdGVsOiBsb2NhdGlvbnNbaV0uaW50X3RlbCxcclxuICAgICAgICAgICAgICAgIHZpY2luaXR5OiBsb2NhdGlvbnNbaV0udmljaW5pdHksXHJcbiAgICAgICAgICAgICAgICBvcGVuOiBsb2NhdGlvbnNbaV0ub3BlbixcclxuICAgICAgICAgICAgICAgIG9wZW5faG91cnM6IGxvY2F0aW9uc1tpXS5vcGVuX2hvdXJzLFxyXG4gICAgICAgICAgICAgICAgcGhvdG86IGxvY2F0aW9uc1tpXS5waG90byxcclxuICAgICAgICAgICAgICAgIHRpbWU6IGxvY2F0aW9uc1tpXS50aW1lLFxyXG4gICAgICAgICAgICAgICAgZW1haWw6IGxvY2F0aW9uc1tpXS5lbWFpbCxcclxuICAgICAgICAgICAgICAgIHdlYjogbG9jYXRpb25zW2ldLndlYixcclxuICAgICAgICAgICAgICAgIGl3OiBsb2NhdGlvbnNbaV0uaXdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG1hcmtlcnNBcnJheS5wdXNoKG1hcmtlcik7XHJcblxyXG4gICAgICAgICAgICBpZiAobG9jYXRpb25zW2ldLml3LmVuYWJsZSA9PT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICBiaW5kSW5mb1dpbmRvdyhtYXJrZXIsIG1hcCwgbG9jYXRpb25zW2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG5cclxufSkoKTsgXHJcbiIsIi8vINCR0LjQsdC70LjQvtGC0LXQutCwIHN2ZzRldmVyeWJvZHkg0LTQu9GPIHN2Z1xyXG5cclxuJChmdW5jdGlvbigpe1xyXG5cdHN2ZzRldmVyeWJvZHkoKTtcclxufSkiXX0=
