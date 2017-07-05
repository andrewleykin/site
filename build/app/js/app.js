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
  	} else { // Если кнопка не активна
  		bg.css('display', 'none').removeClass(animate); // скрыть меню, удалить класс анимации
  		social.css('opacity', '1') // отобразить иконки
  	}

  	// через 700 милисекунд отображать список меню
  	setTimeout(function(){
  		list.slideToggle().stop(true, true);
  	},700);

  };
})();
// js для параллакс эффекта, на фоне гор
'use sctrict';

$(function(){
	// задаём общую переменную
	var svgText = document.querySelector('.js__header-text');

	// промис который будет проверять наличие svgText в page-header
	var parallaxPromise = new Promise (function(resolve, reject) {
			if (svgText.length) {
				resolve();
			} else {
				reject();
			}
		});

	// функция при наличии svgText в page-header
	parallaxPromise.then(function(){
		parallax();
	}).catch(function(){
		return ;
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
		parallax.init(wScroll);
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
				elem.addClass('js-circle-animate');
			} else {
				elem.removeClass('js-circle-animate');
			}
		});
	}).catch(function(){
		return ;
	});

	// функция для проверки позиции элемента
	var checkDistance = function(scrollTop) {
		var offset = elem.offset().top,
			windowMargin = Math.ceil($(window).height() / 3),
			topBorder = offset - scrollTop - windowMargin,
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lbnUuanMiLCJwYXJhbGxheC5qcyIsInByZWxvYWRlci5qcyIsImluZGV4LXBhcmFsbGF4LmpzIiwiZmxpcC5qcyIsInN0aWNreS1zaWRlYmFyLmpzIiwibmF2LXNpZGViYXIuanMiLCJjaXJjbGUtYW5pbWF0ZS5qcyIsIm1hcC5qcyIsInN2ZzRldmVyeWJvZHkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGpzINC00LvRjyDQvNC10L3RjlxyXG5cclxuKGZ1bmN0aW9uKCkge1xyXG4gICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgLy8g0J/QtdGA0LXQvNC10L3QvdGL0LVcclxuICB2YXIgbGluayA9ICQoJy5oZWFkZXJfX21lbnUnKSxcclxuICAgICAgbGlua19fYWN0aXZlPSAnaGVhZGVyX19tZW51X19hY3RpdmUnLFxyXG4gICAgICBsaXN0ID0gJCgnLm1haW4tbWVudV9fbGlzdCcpLFxyXG4gICAgICBiZyA9ICQoJy5tYWluLW1lbnUnKSxcclxuICAgICAgc29jaWFsID0gJCgnLmhlYWRlcl9fc29jaWFsJyksXHJcbiAgICAgIGFuaW1hdGUgPSAnbWFpbi1tZW51X19hbmltYXRlJztcclxuXHJcbiAgICAvLyDQv9GA0L7QvNC40YEg0LrQvtGC0L7RgNGL0Lkg0LHRg9C00LXRgiDQv9GA0L7QstC10YDRj9GC0Ywg0L3QsNC70LjRh9C40LUg0YHRgdGL0LvQutC4KNCz0LDQvNCx0YPRgNCz0LXRgNCwKVxyXG4gICAgdmFyIG1lbnVQcm9taXNlID0gbmV3IFByb21pc2UgKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICBpZiAobGluay5sZW5ndGgpIHtcclxuICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVqZWN0KCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vINGE0YPQvdC60YbQuNGPINC/0YDQuCDQvdCw0LvQuNGH0LjQuCDRgdGB0YvQu9C60Lgo0LPQsNC80LHRg9GA0LPQtdGA0LApXHJcbiAgICBtZW51UHJvbWlzZS50aGVuKGZ1bmN0aW9uKCl7XHJcbiAgICAgIGxpbmsub24oJ2NsaWNrJywgY2xpY2tGdW5jdGlvbik7XHJcbiAgICB9KS5jYXRjaChmdW5jdGlvbigpe1xyXG4gICAgICByZXR1cm4gO1xyXG4gICAgfSk7XHJcblxyXG5cclxuICAvLyDQpNGD0L3QutGG0LjRjyDQv9GA0Lgg0L3QsNC20LDRgtC40Lgg0L3QsCDQvNC10L3Rji3RiNCw0LzQsdGD0YDQs9C10YBcclxuICB2YXIgY2xpY2tGdW5jdGlvbiA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgXHRlLnByZXZlbnREZWZhdWx0KCk7IC8vINC+0YLQvNC10L3QsCDRgdGC0LDQvdC00LDRgNGC0L3Ri9GFINC00LXQudGB0LLRgtC50LhcclxuXHJcbiAgXHQkKHRoaXMpLnRvZ2dsZUNsYXNzKGxpbmtfX2FjdGl2ZSk7IC8vINC40LfQvNC10L3Rj9C10Lwg0L3QsCDQsNC60YLQuNCy0L3QvtC1INGB0L7RgdGC0L7Rj9C90LjQtVxyXG5cclxuICBcdC8vINCV0YHQu9C4INC60L3QvtC/0LrQsCDQsNC60YLQuNCy0L3QsCDRgtC+XHJcbiAgXHRpZihsaW5rLmhhc0NsYXNzKGxpbmtfX2FjdGl2ZSkpIHtcclxuICBcdFx0YmcuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJykuYWRkQ2xhc3MoYW5pbWF0ZSk7IC8vINC+0YLQvtCx0YDQsNC30LjRgtGMINC80LXQvdGOLCDQuCDQtNC+0LHQsNCy0LjRgtGMINC60LvQsNGB0YEg0LDQvdC40LzQsNGG0LjQuFxyXG4gIFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgXHRcdFx0c29jaWFsLmNzcygnb3BhY2l0eScsICcwJyk7IC8vINGH0LXRgNC10LcgMjAwINC80LjQu9C40YHQtdC60YPQvdC0INGB0LrRgNGL0YLRjCDQuNC60L7QvdC60LhcclxuICBcdFx0fSwyMDApO1xyXG4gIFx0fSBlbHNlIHsgLy8g0JXRgdC70Lgg0LrQvdC+0L/QutCwINC90LUg0LDQutGC0LjQstC90LBcclxuICBcdFx0YmcuY3NzKCdkaXNwbGF5JywgJ25vbmUnKS5yZW1vdmVDbGFzcyhhbmltYXRlKTsgLy8g0YHQutGA0YvRgtGMINC80LXQvdGOLCDRg9C00LDQu9C40YLRjCDQutC70LDRgdGBINCw0L3QuNC80LDRhtC40LhcclxuICBcdFx0c29jaWFsLmNzcygnb3BhY2l0eScsICcxJykgLy8g0L7RgtC+0LHRgNCw0LfQuNGC0Ywg0LjQutC+0L3QutC4XHJcbiAgXHR9XHJcblxyXG4gIFx0Ly8g0YfQtdGA0LXQtyA3MDAg0LzQuNC70LjRgdC10LrRg9C90LQg0L7RgtC+0LHRgNCw0LbQsNGC0Ywg0YHQv9C40YHQvtC6INC80LXQvdGOXHJcbiAgXHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgXHRcdGxpc3Quc2xpZGVUb2dnbGUoKS5zdG9wKHRydWUsIHRydWUpO1xyXG4gIFx0fSw3MDApO1xyXG5cclxuICB9O1xyXG59KSgpOyIsIi8vIGpzINC00LvRjyDQv9Cw0YDQsNC70LvQsNC60YEg0Y3RhNGE0LXQutGC0LAsINC90LAg0YTQvtC90LUg0LPQvtGAXHJcbid1c2Ugc2N0cmljdCc7XHJcblxyXG4kKGZ1bmN0aW9uKCl7XHJcblx0Ly8g0LfQsNC00LDRkdC8INC+0LHRidGD0Y4g0L/QtdGA0LXQvNC10L3QvdGD0Y5cclxuXHR2YXIgc3ZnVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qc19faGVhZGVyLXRleHQnKTtcclxuXHJcblx0Ly8g0L/RgNC+0LzQuNGBINC60L7RgtC+0YDRi9C5INCx0YPQtNC10YIg0L/RgNC+0LLQtdGA0Y/RgtGMINC90LDQu9C40YfQuNC1IHN2Z1RleHQg0LIgcGFnZS1oZWFkZXJcclxuXHR2YXIgcGFyYWxsYXhQcm9taXNlID0gbmV3IFByb21pc2UgKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cdFx0XHRpZiAoc3ZnVGV4dC5sZW5ndGgpIHtcclxuXHRcdFx0XHRyZXNvbHZlKCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmVqZWN0KCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHQvLyDRhNGD0L3QutGG0LjRjyDQv9GA0Lgg0L3QsNC70LjRh9C40Lggc3ZnVGV4dCDQsiBwYWdlLWhlYWRlclxyXG5cdHBhcmFsbGF4UHJvbWlzZS50aGVuKGZ1bmN0aW9uKCl7XHJcblx0XHRwYXJhbGxheCgpO1xyXG5cdH0pLmNhdGNoKGZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4gO1xyXG5cdFx0fSk7XHJcblxyXG5cdC8vINGE0YPQvdC60YbQuNGPINC00LvRjyBwYXJhbGxheCDQv9GA0Lgg0YHQutGA0L7Qu9C1XHJcblx0dmFyIHBhcmFsbGF4ID0gKGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBpbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFnZS1oZWFkZXJfX2ltZycpO1xyXG5cdFx0dmFyIHVzZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudXNlci1ibG9ja19fdG9wJyk7XHJcblxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0bW92ZTogZnVuY3Rpb24oYmxvY2ssIHdpbmRvd1Njcm9sbCwgc3RyYWZlQW1vdW50KSB7XHJcblx0XHRcdFx0dmFyIHN0cmFmZSA9IHdpbmRvd1Njcm9sbCAvIC1zdHJhZmVBbW91bnQgKyAnJSc7XHJcblx0XHRcdFx0dmFyIHRyYW5zZm9ybVN0cmluZyA9ICd0cmFuc2xhdGUzZCgwLCcgKyBzdHJhZmUgKyAnLDApJztcclxuXHJcblx0XHRcdFx0YmxvY2suc3R5bGUudHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRpbml0OiBmdW5jdGlvbiAod1Njcm9sbCkge1xyXG5cdFx0XHRcdHRoaXMubW92ZShpbWcsIHdTY3JvbGwsIDQ1KTtcclxuXHRcdFx0XHR0aGlzLm1vdmUoc3ZnVGV4dCwgd1Njcm9sbCwgMzApO1xyXG5cdFx0XHRcdHRoaXMubW92ZSh1c2VyLCB3U2Nyb2xsLCAxMCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9KCkpO1xyXG5cdHdpbmRvdy5vbnNjcm9sbCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciB3U2Nyb2xsID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xyXG5cdFx0cGFyYWxsYXguaW5pdCh3U2Nyb2xsKTtcclxuXHR9XHJcbn0pXHJcblxyXG4iLCIvLyBqcyDRhNCw0LnQuyDQtNC70Y8g0L/RgNC10LvQvtCw0LTQtdGA0LAg0L3QsCDQu9GO0LHRi9GFINGB0YLRgNCw0L3QuNGG0LDRhVxyXG5cclxuXHQvLyDQt9Cw0LTQsNGR0Lwg0L/QtdGA0LXQvNC10L3QvdGL0LVcclxuXHR2YXIgaW1hZ2VzID0gJCgnaW1nJyksXHJcblx0XHRpbWFnZXNUb3RhbENvdW50ID0gaW1hZ2VzLmxlbmd0aCxcclxuXHRcdGltYWdlc0xvYWRlZENvdW50ID0gMCxcclxuXHRcdHBlcmNEaXNwbGF5ID0gJCgnLnByZWxvYWRlcl9fcGVyY2VudCcpLFxyXG5cdFx0cHJlbG9hZGVyID0gJCgnLnByZWxvYWRlcicpLFxyXG5cdFx0cm91bmRzID0gJCgnLnByZWxvYWRlcl9fcm91bmRzJyksXHJcblx0XHRzdHJva2VHbG9iYWwgPSA0NTAsXHJcblx0XHRzdHJva2VTdGFydCA9IDQ1MCxcclxuXHRcdHN0cm9rZURhc2hvZmZzZXQ7XHJcblxyXG5cdC8vINC/0YDQvtC80LjRgSDQutC+0YLQvtGA0YvQuSDQsdGD0LTQtdGCINC/0YDQvtCy0LXRgNGP0YLRjCDQvdCw0LvQuNGH0LjQtSDQv9GA0LXQu9C+0LDQtNC10YDQsCDQvdCwINGB0YLRgNCw0L3QuNGG0LVcclxuXHR2YXIgcHJlbG9hZGVyUHJvbWlzZSA9IG5ldyBQcm9taXNlIChmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHRcdFx0aWYgKHByZWxvYWRlci5sZW5ndGgpIHtcclxuXHRcdFx0XHRyZXNvbHZlKCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmVqZWN0KCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHQvLyDRhNGD0L3QutGG0LjRjyDQv9GA0Lgg0L3QsNC70LjRh9C40Lgg0L/RgNC10LvQvtCw0LTQtdGA0LAg0L3QsCDRgdGC0YDQsNC90LjRhtC1XHJcblx0cHJlbG9hZGVyUHJvbWlzZS50aGVuKGZ1bmN0aW9uKCl7XHJcblxyXG5cdFx0Ly8g0YbQuNC60Lsg0LTQu9GPINC/0LXRgNC10LHQuNGA0LDQvdC40Y8g0LLRgdC10YUg0LrQsNGA0YLQuNC90L7QulxyXG5cdFx0Zm9yICh2YXIgaT0wOyBpIDwgaW1hZ2VzVG90YWxDb3VudDsgaSsrKSB7XHJcblx0XHRcdGltYWdlQ2xvbmUgPSBuZXcgSW1hZ2UoKTtcclxuXHRcdFx0aW1hZ2VDbG9uZS5vbmxvYWQgPSBpbWFnZUxvYWRlZDtcclxuXHRcdFx0aW1hZ2VDbG9uZS5vbmVycm9yID0gaW1hZ2VMb2FkZWQ7XHJcblx0XHRcdGltYWdlQ2xvbmUuc3JjID0gaW1hZ2VzW2ldLnNyYztcclxuXHRcdH1cclxuXHJcblx0XHQvLyDRhNGD0L3QutGG0LjRjyDQtNC70Y8g0L/RgNC+0LLQtdGA0LrQuCDQt9Cw0LPRgNGD0LfQutC4INCy0YHQtdGFINC60LDRgNGC0LjQvdC+0LpcclxuXHRcdGZ1bmN0aW9uIGltYWdlTG9hZGVkKCkge1xyXG5cclxuXHRcdFx0Ly8g0YPQstC10LvQuNGH0LjQstCw0LXQvCDRh9C40YHQu9C+INC30LDQs9GA0YPQttC10L3QvdGL0YUg0LrQsNGA0YLQuNC90L7QulxyXG5cdFx0XHRpbWFnZXNMb2FkZWRDb3VudCsrO1xyXG5cclxuXHRcdFx0Ly8g0YHRh9C40YLQsNC10Lwg0L/RgNC+0YbQtdC90YIg0LfQsNCz0YDRg9C20LXQvdC90YvRhVxyXG5cdFx0XHR2YXIgcGVyYyA9IE1hdGgucm91bmQoKCgxMDAgLyBpbWFnZXNUb3RhbENvdW50KSAqIGltYWdlc0xvYWRlZENvdW50KSkgKyAnJSc7XHJcblx0XHRcdFxyXG5cdFx0XHQvLyDQstGL0LLQvtC00LjQvCDQvdCw0YjQtSDQt9C90LDRh9C10L3QuNC1INC/0YDQvtGG0LXQvdGC0L3QvtC1XHJcblx0XHRcdHBlcmNEaXNwbGF5Lmh0bWwocGVyYyk7XHJcblxyXG5cdFx0XHQvLyDRgdGH0LjRgtCw0LXQvCDQvtGC0L3QvtGB0LjRgtC10LvRjNC90L7QtSDQt9Cw0LrRgNCw0YHQutGDINC+0LHQstC+0LTQutC4INC60YDRg9Cz0LBcclxuXHRcdFx0c3Ryb2tlRGFzaG9mZnNldCA9IHN0cm9rZVN0YXJ0IC0gTWF0aC5yb3VuZCgoc3Ryb2tlR2xvYmFsIC8gaW1hZ2VzVG90YWxDb3VudCkpO1xyXG5cclxuXHRcdFx0Ly8g0LLRi9GH0LjRgtCw0LXQvCDRgdGC0LDRgNGC0L7QstGL0Lkg0L7RgtGH0ZHRglxyXG5cdFx0XHRzdHJva2VTdGFydCAtPSAoc3Ryb2tlR2xvYmFsIC8gaW1hZ2VzVG90YWxDb3VudCk7XHJcblxyXG5cdFx0XHQvLyDQv9GA0LjRgdCy0LDQuNCy0LDQtdC8INGC0L4g0YfRgtC+INC/0L7RgdGH0LjRgtCw0LvQuCwg0L3QsNGI0LXQvNGDINC60YDRg9Cz0YMg0YHQstCzXHJcblx0XHRcdHJvdW5kcy5jc3MoJ3N0cm9rZURhc2hvZmZzZXQnLCBzdHJva2VEYXNob2Zmc2V0KTtcclxuXHJcblx0XHRcdC8vINCV0YHQu9C4INCy0YHQtSDQutCw0YDRgtC40L3QutC4INC30LDQs9GA0YPQttC10L3QvdGLLCDRg9Cx0YDQsNGC0Ywg0LHQu9C+0Log0L/RgNC10LvQvtCw0LTQtdGAXHJcblx0XHRcdGlmKGltYWdlc0xvYWRlZENvdW50ID49IGltYWdlc1RvdGFsQ291bnQpIHtcclxuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRpZighcHJlbG9hZGVyLmhhc0NsYXNzKCdkb25lJykpe1xyXG5cdFx0XHRcdFx0XHRwcmVsb2FkZXIuYWRkQ2xhc3MoJ2RvbmUnKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LCAxMDAwKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0pLmNhdGNoKGZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4gO1xyXG5cdFx0fSk7XHJcblxyXG5cclxuIiwiLy8ganMg0LTQu9GPIGluZGV4LXBhcmFsbGF4XHJcblxyXG4kKGZ1bmN0aW9uKCl7XHJcblxyXG5cdC8vINC30LDQtNCw0ZHQvCDQv9C10YDQtdC80LXQvdC90YvQtVxyXG5cdHZhciBwYXJhbGxheENvbnRhaW5lciA9ICQoJy5wYXJhbGxheCcpLFxyXG5cdFx0bGF5ZXJzID0gJCgnLnBhcmFsbGF4X19sYXllcicpO1xyXG5cclxuXHJcblx0Ly8g0L/RgNC+0LzQuNGBINC60L7RgtC+0YDRi9C5INCx0YPQtNC10YIg0L/RgNC+0LLQtdGA0Y/RgtGMINC90LDQu9C40YfQuNC1INCT0LvQsNCy0L3QvtCz0L4g0L/QsNGA0LDQu9C70LDQutGB0LAg0L3QsCDRgdGC0YDQsNC90LjRhtC1XHJcblx0dmFyIHBhcmFsbGF4UHJvbWlzZSA9IG5ldyBQcm9taXNlIChmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHRcdFx0aWYgKHBhcmFsbGF4Q29udGFpbmVyLmxlbmd0aCkge1xyXG5cdFx0XHRcdHJlc29sdmUoKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZWplY3QoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdC8vINGE0YPQvdC60YbQuNGPINC/0YDQuCDQvdCw0LvQuNGH0LjQuCDQs9C70LDQstC90L7Qs9C+INC/0LDRgNCw0LvQu9Cw0LrRgdCwXHJcblx0cGFyYWxsYXhQcm9taXNlLnRoZW4oZnVuY3Rpb24oKXtcclxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBtb3ZlTGF5ZXJzKTtcclxuXHR9KS5jYXRjaChmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIDtcclxuXHRcdH0pO1xyXG5cclxuXHQvLyDRhNGD0L3QutGG0LjRjyDQtNC70Y8g0LTQstC40LbQtdC90LjRjyDRgdC70L7RkdCyXHJcblx0dmFyIG1vdmVMYXllcnMgPSBmdW5jdGlvbiAoZSkge1xyXG5cdFx0dmFyIGluaXRpYWxYID0gKHdpbmRvdy5pbm5lcldpZHRoIC8gMikgLSBlLnBhZ2VYLFxyXG5cdFx0XHRpbml0aWFsWSA9ICh3aW5kb3cuaW5uZXJIZWlnaHQgLyAyKSAtIGUucGFnZVk7XHJcblxyXG5cdFx0W10uc2xpY2UuY2FsbChsYXllcnMpLmZvckVhY2goZnVuY3Rpb24obGF5ZXIsIGluZGV4KSB7XHJcblx0XHRcdHZhciBkaXZpZGVyID0gaW5kZXggLyAxMDAsXHJcblx0XHRcdFx0cG9zaXRpb25YID0gaW5pdGlhbFggKiBkaXZpZGVyLFxyXG5cdFx0XHRcdHBvc2l0aW9uWSA9IGluaXRpYWxZICogZGl2aWRlcixcclxuXHRcdFx0XHR0cmFuc2Zvcm1TdHJpbmcgPSAndHJhbnNsYXRlKCcgKyBwb3NpdGlvblggKyAncHgsJyArIHBvc2l0aW9uWSArICdweCknO1xyXG5cclxuXHRcdFx0bGF5ZXIuc3R5bGUudHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nO1xyXG5cdFx0fSk7XHJcblx0fTtcclxufSk7IiwiLy8gRmxpcCDRjdGE0YTQtdC60YJcclxuXHJcbiQoZnVuY3Rpb24oKXtcclxuXHJcblx0Ly8g0LfQsNC00LDRkdC8INC/0LXRgNC10LzQtdC90L3Ri9C1XHJcblx0dmFyIGxpbmsgPSAkKCcuYnRuLWF1dGhvX19saW5rJyksXHJcblx0XHRib3ggPSAkKCcuZmxpcCcpLFxyXG5cdFx0bWFpbkxpbmsgPSAkKCcubG9naW5fX2xpbmsnKTsgXHJcblxyXG5cdC8vINC/0YDQvtC80LjRgSDQutC+0YLQvtGA0YvQuSDQsdGD0LTQtdGCINC/0YDQvtCy0LXRgNGP0YLRjCDQvdCw0LvQuNGH0LjQtSDRhNC70LjQvyDQutC+0YLQtdC50L3QtdGA0LAg0L3QsCDRgdGC0YDQsNC90LjRhtC1XHJcblx0dmFyIGZsaXBQcm9taXNlID0gbmV3IFByb21pc2UgKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cdFx0XHRpZiAoYm94Lmxlbmd0aCkge1xyXG5cdFx0XHRcdHJlc29sdmUoKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZWplY3QoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdC8vINGE0YPQvdC60YbQuNGPINC/0YDQuCDQvdCw0LvQuNGH0LjQuCDRhNC70LjQvyDQutC+0L3RgtC10LnQvdC10YDQtVxyXG5cdGZsaXBQcm9taXNlLnRoZW4oZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0Ly8g0L/RgNC4INC60LvQuNC60LUsINGE0LvQuNC/INC60L7QvdGC0LXQvdC10LnRgNGDINC00L7QsdCw0LLQuNGC0Ywg0LrQu9Cw0YHRgSDRgSDQv9C+0LLQvtGA0L7RgtC+0LxcclxuXHRcdGxpbmsuY2xpY2soZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7IC8vINC+0YLQvNC10L3QsCDRgdGC0LDQvdC00LDRgNGC0L3Ri9GFINC00LXQudGB0LLRgtC50LhcclxuXHJcblx0XHRcdGJveC50b2dnbGVDbGFzcygnanNfX2ZsaXAnKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vINC/0YDQuCDQutC70LjQutC1ICDQvdCwIFwi0J3QsCDQs9C70LDQstC90YPRjlwiLCDRg9C00LDQu9C40YLRjCDQutC70LDRgdGBINC/0L7QstC+0YDQvtGC0LAsINGC0LXQvCDRgdCw0LzRi9C8INGA0LDQt9Cy0LXRgNC90YPQsiDQutC+0L3RgtC10LnQvdC10YBcclxuXHRcdG1haW5MaW5rLmNsaWNrKGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpOyAvLyDQvtGC0LzQtdC90LAg0YHRgtCw0L3QtNCw0YDRgtC90YvRhSDQtNC10LnRgdCy0YLQudC4XHJcblxyXG5cdFx0XHRib3gucmVtb3ZlQ2xhc3MoJ2pzX19mbGlwJyk7XHJcblx0XHR9KTtcclxuXHR9KS5jYXRjaChmdW5jdGlvbigpe1xyXG5cdFx0XHRyZXR1cm4gO1xyXG5cdFx0fSk7XHJcblxyXG59KTsiLCIvLyBqcyDQtNC70Y8g0JvQuNC/0LrQvtCz0L4g0YHQsNC50LTQsdCw0YDQsCDQvdCwINGB0YLRgNCw0L3QuNGG0LUg0JHQu9C+0LNcclxuXHJcbihmdW5jdGlvbigpIHtcclxuXHJcbiAgICAvLyDQt9Cw0LTQsNC10Lwg0L/QtdGA0LXQvNC10L3QvdGL0LVcclxuICAgIHZhciBzaWRlYmFyID0gJCgnLnNpZGViYXInKSxcclxuICAgICAgICBzaWRlYmFyRml4ID0gJ3NpZGViYXJfX2ZpeGVkJyxcclxuICAgICAgICBzY3JvbGxIZWlnaHQgPSA2NTA7XHJcblxyXG4gICAgLy8g0L/RgNC+0LzQuNGBINC60L7RgtC+0YDRi9C5INCx0YPQtNC10YIg0L/RgNC+0LLQtdGA0Y/RgtGMINC90LDQu9C40YfQuNC1INCh0LDQudC00LHQsNGA0LAg0L3QsCDRgdGC0YDQsNC90LjRhtC1XHJcbiAgICB2YXIgc2lkZWJhclByb21pc2UgPSBuZXcgUHJvbWlzZSAoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgaWYgKHNpZGViYXIubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZWplY3QoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyDRhNGD0L3QutGG0LjRjyDQv9GA0Lgg0L3QsNC70LjRh9C40Lgg0YHQsNC50LTQsdCw0YDQsFxyXG4gICAgc2lkZWJhclByb21pc2UudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIC8qINC10YHQu9C4INGB0LrRgNC+0LvQuyDQsdC+0LvRjNGI0LUg0LfQsNC00LDQvdC90L7QuSDQstGL0YHQvtGC0YssINGC0L4g0LTQvtCx0LDQstC40YLRjCDQutC70LDRgdGBICovXHJcbiAgICAgICAgICAgIGlmKCQodGhpcykuc2Nyb2xsVG9wKCkgPiBzY3JvbGxIZWlnaHQpe1xyXG4gICAgICAgICAgICAgICAgc2lkZWJhci5hZGRDbGFzcyhzaWRlYmFyRml4KTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpIDwgc2Nyb2xsSGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICBzaWRlYmFyLnJlbW92ZUNsYXNzKHNpZGViYXJGaXgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KS5jYXRjaChmdW5jdGlvbigpe1xyXG4gICAgICAgIHJldHVybiA7XHJcbiAgICB9KTtcclxuXHJcbn0pKCk7IiwiLy8ganMg0LTQu9GPINC90LDQstC40LPQsNGG0LjQuCDQvdCwINGB0YLRgNCw0L3QuNGG0LUg0JHQu9C+0LNcclxuXHJcbihmdW5jdGlvbigpIHtcclxuXHJcblx0Ly8g0L/QtdGA0LXQvNC10L3QvdGL0LVcclxuXHR2YXIgbGluayA9ICQoJy5zaWRlYmFyX19saW5rJyksXHJcblx0XHRpdGVtID0gJCgnLndyaXRlX19pdGVtJyk7XHJcblxyXG5cdCQoZnVuY3Rpb24oKXtcclxuXHJcblx0XHQvLyDQv9GA0L7QvNC40YEg0LrQvtGC0L7RgNGL0Lkg0LHRg9C00LXRgiDQv9GA0L7QstC10YDRj9GC0Ywg0L3QsNC70LjRh9C40LUg0KHQsNC50LTQsdCw0YDQsCDQvdCwINGB0YLRgNCw0L3QuNGG0LVcclxuXHRcdHZhciBuYXZTaWRlYmFyUHJvbWlzZSA9IG5ldyBQcm9taXNlIChmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHRcdFx0aWYgKGxpbmsubGVuZ3RoKSB7XHJcblx0XHRcdFx0cmVzb2x2ZSgpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlamVjdCgpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHQvLyDRhNGD0L3QutGG0LjRjyDQv9GA0Lgg0L3QsNC70LjRh9C40Lgg0YHQsNC50LTQsdCw0YDQsFxyXG5cdFx0bmF2U2lkZWJhclByb21pc2UudGhlbihmdW5jdGlvbigpIHtcclxuXHRcdFx0bGluay5jbGljayhmdW5jdGlvbihlKSB7XHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdFx0XHRzaG93QXJ0aWNsZSgkKHRoaXMpLmF0dHIoJ2hyZWYnKSwgdHJ1ZSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSkuY2F0Y2goZnVuY3Rpb24oKXtcclxuXHRcdFx0cmV0dXJuIDtcclxuXHRcdH0pO1xyXG5cclxuXHJcblx0fSk7XHJcblxyXG5cdC8vINC/0YDQuCDRgdC60YDQvtC70LvQtSDQstGL0LfRi9Cy0LDRgtGMINGE0YPQvdC60YbQuNGOIGNoZWNrQXJ0aWNsZVxyXG5cdCQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XHJcblx0XHRjaGVja0FydGljbGUoKTtcclxuXHR9KTtcclxuXHJcblxyXG5cdC8vINGE0YPQvdC60YbQuNGPINC00LvRjyDRgdC60YDQvtC70LvQsCDQuiDQvdGD0LbQvdC+0LzRgyDRjdC70LXQvNC10L3RgtGDXHJcblx0ZnVuY3Rpb24gc2hvd0FydGljbGUoYXJ0aWNsZSwgaXNBbmltYXRlKSB7XHJcblx0XHR2YXIgZGlyZWN0aW9uID0gYXJ0aWNsZS5yZXBsYWNlKC8jLywgJycpLFxyXG5cdFx0XHRyZXFBcnRpY2xlID0gaXRlbS5maWx0ZXIoJ1tkYXRhLWFydGljbGU9XCInICsgZGlyZWN0aW9uICsgJ1wiXScpLFxyXG5cdFx0XHRyZXFBcnRpY2xlUG9zID0gcmVxQXJ0aWNsZS5vZmZzZXQoKS50b3A7XHJcblxyXG5cdFx0aWYgKGlzQW5pbWF0ZSkge1xyXG5cdFx0XHQkKCdib2R5LCBodG1sJykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiByZXFBcnRpY2xlUG9zfSwgNTAwKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8vINGE0YPQvdC60YbQuNGPINC00LvRjyDQsNCy0YLQvtC80LDRgtC40YfQtdGB0LrQtdCz0L4g0L/QtdGA0LXQutC70Y7Rh9C10L3QuNGPINC60LvQsNGB0YHQsCBhY3RpdmUg0YMg0YHRgdGL0LvQvtC6XHJcblx0ZnVuY3Rpb24gY2hlY2tBcnRpY2xlKCkge1xyXG5cdFx0aXRlbS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgJHRoaXMgPSAkKHRoaXMpLFxyXG5cdFx0XHRcdHRvcEVkZ2UgPSAkdGhpcy5vZmZzZXQoKS50b3AgLSAxNTAsXHJcblx0XHRcdFx0Ym90dG9tRWRnZSA9IHRvcEVkZ2UgKyAkdGhpcy5oZWlnaHQoKSxcclxuXHRcdFx0XHR3U2Nyb2xsID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xyXG5cclxuXHRcdFx0aWYgKHRvcEVkZ2UgPCB3U2Nyb2xsICYmIGJvdHRvbUVkZ2UgPiB3U2Nyb2xsKSB7XHJcblx0XHRcdFx0dmFyIGN1cnJlbnRJZCA9ICR0aGlzLmRhdGEoJ2FydGljbGUnKSxcclxuXHRcdFx0XHRcdHJlcUxpbmsgPSBsaW5rLmZpbHRlcignW2hyZWY9XCIjJyArIGN1cnJlbnRJZCArICdcIl0nKTtcclxuXHJcblx0XHRcdFx0XHRsaW5rLnJlbW92ZUNsYXNzKCdzaWRlYmFyX19saW5rLS1hY3RpdmUnKTtcclxuXHRcdFx0XHRcdHJlcUxpbmsuYWRkQ2xhc3MoJ3NpZGViYXJfX2xpbmstLWFjdGl2ZScpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cclxufSkoKTsgIiwiLy8ganMg0YTQsNC50Lsg0LTQu9GPINCw0L3QuNC80LDRhtC40Lgg0LrRgNGD0LPQvtCyINGB0LrQuNC70LvQvtCyXHJcblxyXG4kKGZ1bmN0aW9uKCl7XHJcblx0Ly8g0L/QtdGA0LXQvNC10L3QvdCw0Y8g0LHQu9C+0LrQuCDRgdC60LjQu9C70L7QslxyXG5cdHZhciBlbGVtID0gJCgnLnNraWxsc19faXRlbXMtd3JhcCcpO1xyXG5cclxuXHQvLyDQv9GA0L7QvNC40YEg0LrQvtGC0L7RgNGL0Lkg0LHRg9C00LXRgiDQv9GA0L7QstC10YDRj9GC0Ywg0L3QsNC70LjRh9C40LUg0LHQu9C+0LrQsCDRgdC60LjQu9C70L7QslxyXG5cdHZhciBza2lsbHNQcm9taXNlID0gbmV3IFByb21pc2UgKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cdFx0aWYgKGVsZW0ubGVuZ3RoKSB7XHJcblx0XHRyZXNvbHZlKCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0cmVqZWN0KCk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdC8vINGE0YPQvdC60YbQuNGPINC/0YDQuCDQvdCw0LvQuNGH0LjQuCDQsdC70L7QutCwINGB0LrQuNC70LvQvtCyXHJcblx0c2tpbGxzUHJvbWlzZS50aGVuKGZ1bmN0aW9uKCl7XHJcblx0XHQvLyDQv9GA0Lgg0YHQutGA0L7Qu9C70LUgXHJcblx0XHQkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgc2Nyb2xsVG9wID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xyXG5cclxuXHRcdFx0Lyog0LXRgdC70Lgg0YTRg9C90LrRhtC40Y8gY2hlY2tEaXN0YW5jZSDQstC10YDQvdGD0LvQsCByZXR1cm4g0YLQviwg0LTQvtCx0LDQstC40YLRjCDQutC70LDRgdGBIC8g0LjQvdCw0YfQtSDRg9C00LDQu9C40YLRjCAqL1xyXG5cdFx0XHRpZihjaGVja0Rpc3RhbmNlKHNjcm9sbFRvcCkpIHtcclxuXHRcdFx0XHRlbGVtLmFkZENsYXNzKCdqcy1jaXJjbGUtYW5pbWF0ZScpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGVsZW0ucmVtb3ZlQ2xhc3MoJ2pzLWNpcmNsZS1hbmltYXRlJyk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH0pLmNhdGNoKGZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4gO1xyXG5cdH0pO1xyXG5cclxuXHQvLyDRhNGD0L3QutGG0LjRjyDQtNC70Y8g0L/RgNC+0LLQtdGA0LrQuCDQv9C+0LfQuNGG0LjQuCDRjdC70LXQvNC10L3RgtCwXHJcblx0dmFyIGNoZWNrRGlzdGFuY2UgPSBmdW5jdGlvbihzY3JvbGxUb3ApIHtcclxuXHRcdHZhciBvZmZzZXQgPSBlbGVtLm9mZnNldCgpLnRvcCxcclxuXHRcdFx0d2luZG93TWFyZ2luID0gTWF0aC5jZWlsKCQod2luZG93KS5oZWlnaHQoKSAvIDMpLFxyXG5cdFx0XHR0b3BCb3JkZXIgPSBvZmZzZXQgLSBzY3JvbGxUb3AgLSB3aW5kb3dNYXJnaW4sXHJcblx0XHRcdGJvdHRvbUVkZ2UgPSBlbGVtLm91dGVySGVpZ2h0KHRydWUpICsgb2Zmc2V0LFxyXG5cdFx0XHRib3R0b21Cb3JkZXIgPSBzY3JvbGxUb3AgKyB3aW5kb3dNYXJnaW4gLSBib3R0b21FZGdlO1xyXG5cclxuXHRcdFx0cmV0dXJuIHRvcEJvcmRlciA8PSAwICYmIGJvdHRvbUJvcmRlciA8PSAwXHJcblx0fVxyXG5cclxuXHJcbn0pOyIsIi8vIGpzINGE0LDQudC7INC00LvRjyDQutCw0YDRgtGLXHJcblxyXG4oZnVuY3Rpb24oKSB7XHJcbiAgICBnb29nbGUubWFwcy5ldmVudC5hZGREb21MaXN0ZW5lcih3aW5kb3csICdsb2FkJywgaW5pdCk7XHJcbiAgICB2YXIgbWFwLCBtYXJrZXJzQXJyYXkgPSBbXTtcclxuXHJcbiAgICBmdW5jdGlvbiBiaW5kSW5mb1dpbmRvdyhtYXJrZXIsIG1hcCwgbG9jYXRpb24pIHtcclxuICAgICAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXIsICdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBjbG9zZShsb2NhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgbG9jYXRpb24uaWIuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uLmluZm9XaW5kb3dWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5pYiA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChsb2NhdGlvbi5pbmZvV2luZG93VmlzaWJsZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgY2xvc2UobG9jYXRpb24pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbWFya2Vyc0FycmF5LmZvckVhY2goZnVuY3Rpb24obG9jLCBpbmRleCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxvYy5pYiAmJiBsb2MuaWIgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2UobG9jKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgYm94VGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICAgICAgYm94VGV4dC5zdHlsZS5jc3NUZXh0ID0gJ2JhY2tncm91bmQ6ICNmZmY7JztcclxuICAgICAgICAgICAgICAgIGJveFRleHQuY2xhc3NMaXN0LmFkZCgnbWQtd2hpdGVmcmFtZS0yZHAnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBidWlsZFBpZWNlcyhsb2NhdGlvbiwgZWwsIHBhcnQsIGljb24pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobG9jYXRpb25bcGFydF0gPT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGxvY2F0aW9uLml3W3BhcnRdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaChlbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdwaG90byc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxvY2F0aW9uLnBob3RvKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwiaXctcGhvdG9cIiBzdHlsZT1cImJhY2tncm91bmQtaW1hZ2U6IHVybCgnICsgbG9jYXRpb24ucGhvdG8gKyAnKTtcIj48L2Rpdj4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnaXctdG9vbGJhcic6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwiaXctdG9vbGJhclwiPjxoMyBjbGFzcz1cIm1kLXN1YmhlYWRcIj4nICsgbG9jYXRpb24udGl0bGUgKyAnPC9oMz48L2Rpdj4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZGl2JzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2gocGFydCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2VtYWlsJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnPGRpdiBjbGFzcz1cIml3LWRldGFpbHNcIj48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCIgc3R5bGU9XCJjb2xvcjojNDI4NWY0O1wiPjxpbWcgc3JjPVwiLy9jZG4ubWFwa2l0LmlvL3YxL2ljb25zLycgKyBpY29uICsgJy5zdmdcIi8+PC9pPjxzcGFuPjxhIGhyZWY9XCJtYWlsdG86JyArIGxvY2F0aW9uLmVtYWlsICsgJ1wiIHRhcmdldD1cIl9ibGFua1wiPicgKyBsb2NhdGlvbi5lbWFpbCArICc8L2E+PC9zcGFuPjwvZGl2Pic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnd2ViJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnPGRpdiBjbGFzcz1cIml3LWRldGFpbHNcIj48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCIgc3R5bGU9XCJjb2xvcjojNDI4NWY0O1wiPjxpbWcgc3JjPVwiLy9jZG4ubWFwa2l0LmlvL3YxL2ljb25zLycgKyBpY29uICsgJy5zdmdcIi8+PC9pPjxzcGFuPjxhIGhyZWY9XCInICsgbG9jYXRpb24ud2ViICsgJ1wiIHRhcmdldD1cIl9ibGFua1wiPicgKyBsb2NhdGlvbi53ZWJfZm9ybWF0dGVkICsgJzwvYT48L3NwYW4+PC9kaXY+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdkZXNjJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnPGxhYmVsIGNsYXNzPVwiaXctZGVzY1wiIGZvcj1cImNiX2RldGFpbHNcIj48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCJjYl9kZXRhaWxzXCIvPjxoMyBjbGFzcz1cIml3LXgtZGV0YWlsc1wiPkRldGFpbHM8L2gzPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgdG9nZ2xlLW9wZW4tZGV0YWlsc1wiPjxpbWcgc3JjPVwiLy9jZG4ubWFwa2l0LmlvL3YxL2ljb25zLycgKyBpY29uICsgJy5zdmdcIi8+PC9pPjxwIGNsYXNzPVwiaXcteC1kZXRhaWxzXCI+JyArIGxvY2F0aW9uLmRlc2MgKyAnPC9wPjwvbGFiZWw+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwiaXctZGV0YWlsc1wiPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj48aW1nIHNyYz1cIi8vY2RuLm1hcGtpdC5pby92MS9pY29ucy8nICsgaWNvbiArICcuc3ZnXCIvPjwvaT48c3Bhbj4nICsgbG9jYXRpb25bcGFydF0gKyAnPC9zcGFuPjwvZGl2Pic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ29wZW5faG91cnMnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpdGVtcyA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsb2NhdGlvbi5vcGVuX2hvdXJzLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxvY2F0aW9uLm9wZW5faG91cnMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpICE9PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtcyArPSAnPGxpPjxzdHJvbmc+JyArIGxvY2F0aW9uLm9wZW5faG91cnNbaV0uZGF5ICsgJzwvc3Ryb25nPjxzdHJvbmc+JyArIGxvY2F0aW9uLm9wZW5faG91cnNbaV0uaG91cnMgKyc8L3N0cm9uZz48L2xpPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmlyc3QgPSAnPGxpPjxsYWJlbCBmb3I9XCJjYl9ob3Vyc1wiPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBpZD1cImNiX2hvdXJzXCIvPjxzdHJvbmc+JyArIGxvY2F0aW9uLm9wZW5faG91cnNbMF0uZGF5ICsgJzwvc3Ryb25nPjxzdHJvbmc+JyArIGxvY2F0aW9uLm9wZW5faG91cnNbMF0uaG91cnMgKyc8L3N0cm9uZz48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zIHRvZ2dsZS1vcGVuLWhvdXJzXCI+PGltZyBzcmM9XCIvL2Nkbi5tYXBraXQuaW8vdjEvaWNvbnMva2V5Ym9hcmRfYXJyb3dfZG93bi5zdmdcIi8+PC9pPjx1bD4nICsgaXRlbXMgKyAnPC91bD48L2xhYmVsPjwvbGk+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzxkaXYgY2xhc3M9XCJpdy1saXN0XCI+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29ucyBmaXJzdC1tYXRlcmlhbC1pY29uc1wiIHN0eWxlPVwiY29sb3I6IzQyODVmNDtcIj48aW1nIHNyYz1cIi8vY2RuLm1hcGtpdC5pby92MS9pY29ucy8nICsgaWNvbiArICcuc3ZnXCIvPjwvaT48dWw+JyArIGZpcnN0ICsgJzwvdWw+PC9kaXY+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGJveFRleHQuaW5uZXJIVE1MID0gXHJcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRQaWVjZXMobG9jYXRpb24sICdwaG90bycsICdwaG90bycsICcnKSArXHJcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRQaWVjZXMobG9jYXRpb24sICdpdy10b29sYmFyJywgJ3RpdGxlJywgJycpICtcclxuICAgICAgICAgICAgICAgICAgICBidWlsZFBpZWNlcyhsb2NhdGlvbiwgJ2RpdicsICdhZGRyZXNzJywgJ2xvY2F0aW9uX29uJykgK1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkUGllY2VzKGxvY2F0aW9uLCAnZGl2JywgJ3dlYicsICdwdWJsaWMnKSArXHJcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRQaWVjZXMobG9jYXRpb24sICdkaXYnLCAnZW1haWwnLCAnZW1haWwnKSArXHJcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRQaWVjZXMobG9jYXRpb24sICdkaXYnLCAndGVsJywgJ3Bob25lJykgK1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkUGllY2VzKGxvY2F0aW9uLCAnZGl2JywgJ2ludF90ZWwnLCAncGhvbmUnKSArXHJcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRQaWVjZXMobG9jYXRpb24sICdvcGVuX2hvdXJzJywgJ29wZW5faG91cnMnLCAnYWNjZXNzX3RpbWUnKSArXHJcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRQaWVjZXMobG9jYXRpb24sICdkaXYnLCAnZGVzYycsICdrZXlib2FyZF9hcnJvd19kb3duJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIG15T3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgICAgICBhbGlnbkJvdHRvbTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBib3hUZXh0LFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVBdXRvUGFuOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1heFdpZHRoOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIHBpeGVsT2Zmc2V0OiBuZXcgZ29vZ2xlLm1hcHMuU2l6ZSgtMTQwLCAtNDApLFxyXG4gICAgICAgICAgICAgICAgICAgIHpJbmRleDogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICBib3hTdHlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzI4MHB4J1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VCb3hNYXJnaW46ICcwcHggMHB4IDBweCAwcHgnLFxyXG4gICAgICAgICAgICAgICAgICAgIGluZm9Cb3hDbGVhcmFuY2U6IG5ldyBnb29nbGUubWFwcy5TaXplKDEsIDEpLFxyXG4gICAgICAgICAgICAgICAgICAgIGlzSGlkZGVuOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBwYW5lOiAnZmxvYXRQYW5lJyxcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVFdmVudFByb3BhZ2F0aW9uOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5pYiA9IG5ldyBJbmZvQm94KG15T3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5pYi5vcGVuKG1hcCwgbWFya2VyKTtcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uLmluZm9XaW5kb3dWaXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICAgICAgdmFyIG1hcE9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIGNlbnRlcjogbmV3IGdvb2dsZS5tYXBzLkxhdExuZyg1NS43NDgzNTgxMTI3MjAzNzUsNTIuMzU0MTc1ODg3NDk5OTgpLFxyXG4gICAgICAgICAgICB6b29tOiAxMyxcclxuICAgICAgICAgICAgZ2VzdHVyZUhhbmRsaW5nOiAnY29vcGVyYXRpdmUnLFxyXG4gICAgICAgICAgICBmdWxsc2NyZWVuQ29udHJvbDogZmFsc2UsXHJcbiAgICAgICAgICAgIHpvb21Db250cm9sOiB0cnVlLFxyXG4gICAgICAgICAgICBkaXNhYmxlRG91YmxlQ2xpY2tab29tOiB0cnVlLFxyXG4gICAgICAgICAgICBtYXBUeXBlQ29udHJvbDogdHJ1ZSxcclxuICAgICAgICAgICAgbWFwVHlwZUNvbnRyb2xPcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICBzdHlsZTogZ29vZ2xlLm1hcHMuTWFwVHlwZUNvbnRyb2xTdHlsZS5IT1JJWk9OVEFMX0JBUixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2NhbGVDb250cm9sOiBmYWxzZSxcclxuICAgICAgICAgICAgc2Nyb2xsd2hlZWw6IGZhbHNlLFxyXG4gICAgICAgICAgICBzdHJlZXRWaWV3Q29udHJvbDogZmFsc2UsXHJcbiAgICAgICAgICAgIGRyYWdnYWJsZSA6IHRydWUsXHJcbiAgICAgICAgICAgIGNsaWNrYWJsZUljb25zOiB0cnVlLFxyXG4gICAgICAgICAgICB6b29tQ29udHJvbE9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBnb29nbGUubWFwcy5Db250cm9sUG9zaXRpb24uUklHSFRfQ0VOVEVSXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG1hcFR5cGVDb250cm9sT3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IGdvb2dsZS5tYXBzLkNvbnRyb2xQb3NpdGlvbi5SSUdIVF9UT1BcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbWFwVHlwZUlkOiBnb29nbGUubWFwcy5NYXBUeXBlSWQuUk9BRE1BUCxcclxuICAgICAgICAgICAgc3R5bGVzOiBbe1wiZmVhdHVyZVR5cGVcIjpcIndhdGVyXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjNDZiY2VjXCJ9LHtcInZpc2liaWxpdHlcIjpcIm9uXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcImxhbmRzY2FwZVwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiI2YyZjJmMlwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJyb2FkXCIsXCJzdHlsZXJzXCI6W3tcInNhdHVyYXRpb25cIjotMTAwfSx7XCJsaWdodG5lc3NcIjo0NX1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicm9hZC5oaWdod2F5XCIsXCJzdHlsZXJzXCI6W3tcInZpc2liaWxpdHlcIjpcInNpbXBsaWZpZWRcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicm9hZC5hcnRlcmlhbFwiLFwiZWxlbWVudFR5cGVcIjpcImxhYmVscy5pY29uXCIsXCJzdHlsZXJzXCI6W3tcInZpc2liaWxpdHlcIjpcIm9mZlwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJhZG1pbmlzdHJhdGl2ZVwiLFwiZWxlbWVudFR5cGVcIjpcImxhYmVscy50ZXh0LmZpbGxcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiM0NDQ0NDRcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwidHJhbnNpdFwiLFwic3R5bGVyc1wiOlt7XCJ2aXNpYmlsaXR5XCI6XCJvZmZcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicG9pXCIsXCJzdHlsZXJzXCI6W3tcInZpc2liaWxpdHlcIjpcIm9mZlwifV19XVxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbWFwRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAnKTtcclxuICAgICAgICB2YXIgbWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChtYXBFbGVtZW50LCBtYXBPcHRpb25zKTtcclxuICAgICAgICB2YXIgbG9jYXRpb25zID0gW1xyXG4gICAgICAgICAgICB7XCJ0aXRsZVwiOlwiQU5EUkVXXCIsXCJ0ZWxcIjpcIis3KDk1MSk4OTYtNDItNDRcIixcImVtYWlsXCI6XCJrYXRhc2hpMTMyOEBtYWlsLnJ1XCIsXCJ3ZWJcIjpcImh0dHBzOi8vYW5kcmV3bGV5a2luLmdpdGh1Yi5pby9wb3J0Zm9saW8vYnVpbGQvXCIsXCJ3ZWJfZm9ybWF0dGVkXCI6XCJhbmRyZXdsZXlraW4uZ2l0aHViLmlvXCIsXCJsYXRcIjo1NS43MzQ3MDU3MDQ1OTI4MDUsXCJsbmdcIjo1Mi4zOTc1MTUwMjA3NjI2MjYsXCJ2aWNpbml0eVwiOlwiXCIsXCJtYXJrZXJcIjp7XCJmaWxsQ29sb3JcIjpcIiMwMEFDQzFcIixcImZpbGxPcGFjaXR5XCI6MSxcInN0cm9rZVdlaWdodFwiOjAsXCJzY2FsZVwiOjEuNSxcInBhdGhcIjpcIk0xMC4yLDcuNGMtNiwwLTEwLjksNC45LTEwLjksMTAuOWMwLDYsMTAuOSwxOC40LDEwLjksMTguNHMxMC45LTEyLjMsMTAuOS0xOC40QzIxLjIsMTIuMiwxNi4zLDcuNCwxMC4yLDcuNHogTTEwLjIsMjIuOWMtMi42LDAtNC42LTIuMS00LjYtNC42czIuMS00LjYsNC42LTQuNnM0LjYsMi4xLDQuNiw0LjZTMTIuOCwyMi45LDEwLjIsMjIuOXpcIixcImFuY2hvclwiOntcInhcIjoxMCxcInlcIjozMH0sXCJvcmlnaW5cIjp7XCJ4XCI6MCxcInlcIjowfSxcInN0eWxlXCI6MX0sXCJpd1wiOntcInRlbFwiOnRydWUsXCJ3ZWJcIjp0cnVlLFwiZW1haWxcIjp0cnVlfX1cclxuICAgICAgICBdO1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsb2NhdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XHJcbiAgICAgICAgICAgICAgICBpY29uOiBsb2NhdGlvbnNbaV0ubWFya2VyLFxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IG5ldyBnb29nbGUubWFwcy5MYXRMbmcobG9jYXRpb25zW2ldLmxhdCwgbG9jYXRpb25zW2ldLmxuZyksXHJcblxyXG4gICAgICAgICAgICAgICAgbWFwOiBtYXAsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogbG9jYXRpb25zW2ldLnRpdGxlLFxyXG4gICAgICAgICAgICAgICAgYWRkcmVzczogbG9jYXRpb25zW2ldLmFkZHJlc3MsXHJcbiAgICAgICAgICAgICAgICBkZXNjOiBsb2NhdGlvbnNbaV0uZGVzYyxcclxuICAgICAgICAgICAgICAgIHRlbDogbG9jYXRpb25zW2ldLnRlbCxcclxuICAgICAgICAgICAgICAgIGludF90ZWw6IGxvY2F0aW9uc1tpXS5pbnRfdGVsLFxyXG4gICAgICAgICAgICAgICAgdmljaW5pdHk6IGxvY2F0aW9uc1tpXS52aWNpbml0eSxcclxuICAgICAgICAgICAgICAgIG9wZW46IGxvY2F0aW9uc1tpXS5vcGVuLFxyXG4gICAgICAgICAgICAgICAgb3Blbl9ob3VyczogbG9jYXRpb25zW2ldLm9wZW5faG91cnMsXHJcbiAgICAgICAgICAgICAgICBwaG90bzogbG9jYXRpb25zW2ldLnBob3RvLFxyXG4gICAgICAgICAgICAgICAgdGltZTogbG9jYXRpb25zW2ldLnRpbWUsXHJcbiAgICAgICAgICAgICAgICBlbWFpbDogbG9jYXRpb25zW2ldLmVtYWlsLFxyXG4gICAgICAgICAgICAgICAgd2ViOiBsb2NhdGlvbnNbaV0ud2ViLFxyXG4gICAgICAgICAgICAgICAgaXc6IGxvY2F0aW9uc1tpXS5pd1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbWFya2Vyc0FycmF5LnB1c2gobWFya2VyKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChsb2NhdGlvbnNbaV0uaXcuZW5hYmxlID09PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgIGJpbmRJbmZvV2luZG93KG1hcmtlciwgbWFwLCBsb2NhdGlvbnNbaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG59KSgpOyBcclxuIiwiLy8g0JHQuNCx0LvQuNC+0YLQtdC60LAgc3ZnNGV2ZXJ5Ym9keSDQtNC70Y8gc3ZnXHJcblxyXG4kKGZ1bmN0aW9uKCl7XHJcblx0c3ZnNGV2ZXJ5Ym9keSgpO1xyXG59KSJdfQ==
