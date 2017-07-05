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

$(function(){

	var images = $('img'),
		imagesTotalCount = images.length,
		imagesLoadedCount = 0,
		percDisplay = $('.preloader__percent'),
		preloader = $('.preloader'),
		rounds = $('.preloader__rounds'),
		strokeGlobal = 450,
		strokeStart = 450,
		mainStroke;



	for (var i=0; i < imagesTotalCount; i++) {
		imageClone = new Image();
		imageClone.onload = imageLoaded;
		imageClone.onerror = imageLoaded;
		imageClone.src = images[i].src;
	}

	function imageLoaded() {
		imagesLoadedCount++;
		var perc = Math.round(((100 / imagesTotalCount) * imagesLoadedCount)) + '%';
		mainStroke = strokeStart - Math.round((strokeGlobal / imagesTotalCount));
		strokeStart -= (strokeGlobal / imagesTotalCount);

		console.log(mainStroke);
		rounds.css('strokeDashoffset', mainStroke);

		percDisplay.html(perc);
		
		if(imagesLoadedCount >= imagesTotalCount) {
			setTimeout(function(){
				if(!preloader.hasClass('done')){
					preloader.addClass('done');
				}
			}, 1000);
		}
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lbnUuanMiLCJwYXJhbGxheC5qcyIsInByZWxvYWRlci5qcyIsImluZGV4LXBhcmFsbGF4LmpzIiwiZmxpcC5qcyIsInN0aWNreS1zaWRlYmFyLmpzIiwibmF2LXNpZGViYXIuanMiLCJjaXJjbGUtYW5pbWF0ZS5qcyIsIm1hcC5qcyIsInN2ZzRldmVyeWJvZHkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBqcyDQtNC70Y8g0LzQtdC90Y5cclxuXHJcbihmdW5jdGlvbigpIHtcclxuICAndXNlIHN0cmljdCc7XHJcblxyXG4gIC8vINCf0LXRgNC10LzQtdC90L3Ri9C1XHJcbiAgdmFyIGxpbmsgPSAkKCcuaGVhZGVyX19tZW51JyksXHJcbiAgICAgIGxpbmtfX2FjdGl2ZT0gJ2hlYWRlcl9fbWVudV9fYWN0aXZlJyxcclxuICAgICAgbGlzdCA9ICQoJy5tYWluLW1lbnVfX2xpc3QnKSxcclxuICAgICAgYmcgPSAkKCcubWFpbi1tZW51JyksXHJcbiAgICAgIHNvY2lhbCA9ICQoJy5oZWFkZXJfX3NvY2lhbCcpLFxyXG4gICAgICBhbmltYXRlID0gJ21haW4tbWVudV9fYW5pbWF0ZSc7XHJcblxyXG4gICAgLy8g0L/RgNC+0LzQuNGBINC60L7RgtC+0YDRi9C5INCx0YPQtNC10YIg0L/RgNC+0LLQtdGA0Y/RgtGMINC90LDQu9C40YfQuNC1INGB0YHRi9C70LrQuCjQs9Cw0LzQsdGD0YDQs9C10YDQsClcclxuICAgIHZhciBtZW51UHJvbWlzZSA9IG5ldyBQcm9taXNlIChmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgaWYgKGxpbmsubGVuZ3RoKSB7XHJcbiAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlamVjdCgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyDRhNGD0L3QutGG0LjRjyDQv9GA0Lgg0L3QsNC70LjRh9C40Lgg0YHRgdGL0LvQutC4KNCz0LDQvNCx0YPRgNCz0LXRgNCwKVxyXG4gICAgbWVudVByb21pc2UudGhlbihmdW5jdGlvbigpe1xyXG4gICAgICBsaW5rLm9uKCdjbGljaycsIGNsaWNrRnVuY3Rpb24pO1xyXG4gICAgfSkuY2F0Y2goZnVuY3Rpb24oKXtcclxuICAgICAgcmV0dXJuIDtcclxuICAgIH0pO1xyXG5cclxuXHJcbiAgLy8g0KTRg9C90LrRhtC40Y8g0L/RgNC4INC90LDQttCw0YLQuNC4INC90LAg0LzQtdC90Y4t0YjQsNC80LHRg9GA0LPQtdGAXHJcbiAgdmFyIGNsaWNrRnVuY3Rpb24gPSBmdW5jdGlvbiAoZSkge1xyXG4gIFx0ZS5wcmV2ZW50RGVmYXVsdCgpOyAvLyDQvtGC0LzQtdC90LAg0YHRgtCw0L3QtNCw0YDRgtC90YvRhSDQtNC10LnRgdCy0YLQudC4XHJcblxyXG4gIFx0JCh0aGlzKS50b2dnbGVDbGFzcyhsaW5rX19hY3RpdmUpOyAvLyDQuNC30LzQtdC90Y/QtdC8INC90LAg0LDQutGC0LjQstC90L7QtSDRgdC+0YHRgtC+0Y/QvdC40LVcclxuXHJcbiAgXHQvLyDQldGB0LvQuCDQutC90L7Qv9C60LAg0LDQutGC0LjQstC90LAg0YLQvlxyXG4gIFx0aWYobGluay5oYXNDbGFzcyhsaW5rX19hY3RpdmUpKSB7XHJcbiAgXHRcdGJnLmNzcygnZGlzcGxheScsICdibG9jaycpLmFkZENsYXNzKGFuaW1hdGUpOyAvLyDQvtGC0L7QsdGA0LDQt9C40YLRjCDQvNC10L3Rjiwg0Lgg0LTQvtCx0LDQstC40YLRjCDQutC70LDRgdGBINCw0L3QuNC80LDRhtC40LhcclxuICBcdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gIFx0XHRcdHNvY2lhbC5jc3MoJ29wYWNpdHknLCAnMCcpOyAvLyDRh9C10YDQtdC3IDIwMCDQvNC40LvQuNGB0LXQutGD0L3QtCDRgdC60YDRi9GC0Ywg0LjQutC+0L3QutC4XHJcbiAgXHRcdH0sMjAwKTtcclxuICBcdH0gZWxzZSB7IC8vINCV0YHQu9C4INC60L3QvtC/0LrQsCDQvdC1INCw0LrRgtC40LLQvdCwXHJcbiAgXHRcdGJnLmNzcygnZGlzcGxheScsICdub25lJykucmVtb3ZlQ2xhc3MoYW5pbWF0ZSk7IC8vINGB0LrRgNGL0YLRjCDQvNC10L3Rjiwg0YPQtNCw0LvQuNGC0Ywg0LrQu9Cw0YHRgSDQsNC90LjQvNCw0YbQuNC4XHJcbiAgXHRcdHNvY2lhbC5jc3MoJ29wYWNpdHknLCAnMScpIC8vINC+0YLQvtCx0YDQsNC30LjRgtGMINC40LrQvtC90LrQuFxyXG4gIFx0fVxyXG5cclxuICBcdC8vINGH0LXRgNC10LcgNzAwINC80LjQu9C40YHQtdC60YPQvdC0INC+0YLQvtCx0YDQsNC20LDRgtGMINGB0L/QuNGB0L7QuiDQvNC10L3RjlxyXG4gIFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gIFx0XHRsaXN0LnNsaWRlVG9nZ2xlKCkuc3RvcCh0cnVlLCB0cnVlKTtcclxuICBcdH0sNzAwKTtcclxuXHJcbiAgfTtcclxufSkoKTsiLCIvLyBqcyDQtNC70Y8g0L/QsNGA0LDQu9C70LDQutGBINGN0YTRhNC10LrRgtCwLCDQvdCwINGE0L7QvdC1INCz0L7RgFxyXG4ndXNlIHNjdHJpY3QnO1xyXG5cclxuJChmdW5jdGlvbigpe1xyXG5cdC8vINC30LDQtNCw0ZHQvCDQvtCx0YnRg9GOINC/0LXRgNC10LzQtdC90L3Rg9GOXHJcblx0dmFyIHN2Z1RleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanNfX2hlYWRlci10ZXh0Jyk7XHJcblxyXG5cdC8vINC/0YDQvtC80LjRgSDQutC+0YLQvtGA0YvQuSDQsdGD0LTQtdGCINC/0YDQvtCy0LXRgNGP0YLRjCDQvdCw0LvQuNGH0LjQtSBzdmdUZXh0INCyIHBhZ2UtaGVhZGVyXHJcblx0dmFyIHBhcmFsbGF4UHJvbWlzZSA9IG5ldyBQcm9taXNlIChmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHRcdFx0aWYgKHN2Z1RleHQubGVuZ3RoKSB7XHJcblx0XHRcdFx0cmVzb2x2ZSgpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlamVjdCgpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0Ly8g0YTRg9C90LrRhtC40Y8g0L/RgNC4INC90LDQu9C40YfQuNC4IHN2Z1RleHQg0LIgcGFnZS1oZWFkZXJcclxuXHRwYXJhbGxheFByb21pc2UudGhlbihmdW5jdGlvbigpe1xyXG5cdFx0cGFyYWxsYXgoKTtcclxuXHR9KS5jYXRjaChmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIDtcclxuXHRcdH0pO1xyXG5cclxuXHQvLyDRhNGD0L3QutGG0LjRjyDQtNC70Y8gcGFyYWxsYXgg0L/RgNC4INGB0LrRgNC+0LvQtVxyXG5cdHZhciBwYXJhbGxheCA9IChmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgaW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2UtaGVhZGVyX19pbWcnKTtcclxuXHRcdHZhciB1c2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnVzZXItYmxvY2tfX3RvcCcpO1xyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdG1vdmU6IGZ1bmN0aW9uKGJsb2NrLCB3aW5kb3dTY3JvbGwsIHN0cmFmZUFtb3VudCkge1xyXG5cdFx0XHRcdHZhciBzdHJhZmUgPSB3aW5kb3dTY3JvbGwgLyAtc3RyYWZlQW1vdW50ICsgJyUnO1xyXG5cdFx0XHRcdHZhciB0cmFuc2Zvcm1TdHJpbmcgPSAndHJhbnNsYXRlM2QoMCwnICsgc3RyYWZlICsgJywwKSc7XHJcblxyXG5cdFx0XHRcdGJsb2NrLnN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcclxuXHRcdFx0fSxcclxuXHRcdFx0aW5pdDogZnVuY3Rpb24gKHdTY3JvbGwpIHtcclxuXHRcdFx0XHR0aGlzLm1vdmUoaW1nLCB3U2Nyb2xsLCA0NSk7XHJcblx0XHRcdFx0dGhpcy5tb3ZlKHN2Z1RleHQsIHdTY3JvbGwsIDMwKTtcclxuXHRcdFx0XHR0aGlzLm1vdmUodXNlciwgd1Njcm9sbCwgMTApO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSgpKTtcclxuXHR3aW5kb3cub25zY3JvbGwgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgd1Njcm9sbCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcclxuXHRcdHBhcmFsbGF4LmluaXQod1Njcm9sbCk7XHJcblx0fVxyXG59KVxyXG5cclxuIiwiLy8ganMg0YTQsNC50Lsg0LTQu9GPINC/0YDQtdC70L7QsNC00LXRgNCwINC90LAg0LvRjtCx0YvRhSDRgdGC0YDQsNC90LjRhtCw0YVcclxuXHJcbiQoZnVuY3Rpb24oKXtcclxuXHJcblx0dmFyIGltYWdlcyA9ICQoJ2ltZycpLFxyXG5cdFx0aW1hZ2VzVG90YWxDb3VudCA9IGltYWdlcy5sZW5ndGgsXHJcblx0XHRpbWFnZXNMb2FkZWRDb3VudCA9IDAsXHJcblx0XHRwZXJjRGlzcGxheSA9ICQoJy5wcmVsb2FkZXJfX3BlcmNlbnQnKSxcclxuXHRcdHByZWxvYWRlciA9ICQoJy5wcmVsb2FkZXInKSxcclxuXHRcdHJvdW5kcyA9ICQoJy5wcmVsb2FkZXJfX3JvdW5kcycpLFxyXG5cdFx0c3Ryb2tlR2xvYmFsID0gNDUwLFxyXG5cdFx0c3Ryb2tlU3RhcnQgPSA0NTAsXHJcblx0XHRtYWluU3Ryb2tlO1xyXG5cclxuXHJcblxyXG5cdGZvciAodmFyIGk9MDsgaSA8IGltYWdlc1RvdGFsQ291bnQ7IGkrKykge1xyXG5cdFx0aW1hZ2VDbG9uZSA9IG5ldyBJbWFnZSgpO1xyXG5cdFx0aW1hZ2VDbG9uZS5vbmxvYWQgPSBpbWFnZUxvYWRlZDtcclxuXHRcdGltYWdlQ2xvbmUub25lcnJvciA9IGltYWdlTG9hZGVkO1xyXG5cdFx0aW1hZ2VDbG9uZS5zcmMgPSBpbWFnZXNbaV0uc3JjO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gaW1hZ2VMb2FkZWQoKSB7XHJcblx0XHRpbWFnZXNMb2FkZWRDb3VudCsrO1xyXG5cdFx0dmFyIHBlcmMgPSBNYXRoLnJvdW5kKCgoMTAwIC8gaW1hZ2VzVG90YWxDb3VudCkgKiBpbWFnZXNMb2FkZWRDb3VudCkpICsgJyUnO1xyXG5cdFx0bWFpblN0cm9rZSA9IHN0cm9rZVN0YXJ0IC0gTWF0aC5yb3VuZCgoc3Ryb2tlR2xvYmFsIC8gaW1hZ2VzVG90YWxDb3VudCkpO1xyXG5cdFx0c3Ryb2tlU3RhcnQgLT0gKHN0cm9rZUdsb2JhbCAvIGltYWdlc1RvdGFsQ291bnQpO1xyXG5cclxuXHRcdGNvbnNvbGUubG9nKG1haW5TdHJva2UpO1xyXG5cdFx0cm91bmRzLmNzcygnc3Ryb2tlRGFzaG9mZnNldCcsIG1haW5TdHJva2UpO1xyXG5cclxuXHRcdHBlcmNEaXNwbGF5Lmh0bWwocGVyYyk7XHJcblx0XHRcclxuXHRcdGlmKGltYWdlc0xvYWRlZENvdW50ID49IGltYWdlc1RvdGFsQ291bnQpIHtcclxuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xyXG5cdFx0XHRcdGlmKCFwcmVsb2FkZXIuaGFzQ2xhc3MoJ2RvbmUnKSl7XHJcblx0XHRcdFx0XHRwcmVsb2FkZXIuYWRkQ2xhc3MoJ2RvbmUnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sIDEwMDApO1xyXG5cdFx0fVxyXG5cdH1cclxufSk7XHJcbiIsIi8vIGpzINC00LvRjyBpbmRleC1wYXJhbGxheFxyXG5cclxuJChmdW5jdGlvbigpe1xyXG5cclxuXHQvLyDQt9Cw0LTQsNGR0Lwg0L/QtdGA0LXQvNC10L3QvdGL0LVcclxuXHR2YXIgcGFyYWxsYXhDb250YWluZXIgPSAkKCcucGFyYWxsYXgnKSxcclxuXHRcdGxheWVycyA9ICQoJy5wYXJhbGxheF9fbGF5ZXInKTtcclxuXHJcblxyXG5cdC8vINC/0YDQvtC80LjRgSDQutC+0YLQvtGA0YvQuSDQsdGD0LTQtdGCINC/0YDQvtCy0LXRgNGP0YLRjCDQvdCw0LvQuNGH0LjQtSDQk9C70LDQstC90L7Qs9C+INC/0LDRgNCw0LvQu9Cw0LrRgdCwINC90LAg0YHRgtGA0LDQvdC40YbQtVxyXG5cdHZhciBwYXJhbGxheFByb21pc2UgPSBuZXcgUHJvbWlzZSAoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblx0XHRcdGlmIChwYXJhbGxheENvbnRhaW5lci5sZW5ndGgpIHtcclxuXHRcdFx0XHRyZXNvbHZlKCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmVqZWN0KCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHQvLyDRhNGD0L3QutGG0LjRjyDQv9GA0Lgg0L3QsNC70LjRh9C40Lgg0LPQu9Cw0LLQvdC+0LPQviDQv9Cw0YDQsNC70LvQsNC60YHQsFxyXG5cdHBhcmFsbGF4UHJvbWlzZS50aGVuKGZ1bmN0aW9uKCl7XHJcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgbW92ZUxheWVycyk7XHJcblx0fSkuY2F0Y2goZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiA7XHJcblx0XHR9KTtcclxuXHJcblx0Ly8g0YTRg9C90LrRhtC40Y8g0LTQu9GPINC00LLQuNC20LXQvdC40Y8g0YHQu9C+0ZHQslxyXG5cdHZhciBtb3ZlTGF5ZXJzID0gZnVuY3Rpb24gKGUpIHtcclxuXHRcdHZhciBpbml0aWFsWCA9ICh3aW5kb3cuaW5uZXJXaWR0aCAvIDIpIC0gZS5wYWdlWCxcclxuXHRcdFx0aW5pdGlhbFkgPSAod2luZG93LmlubmVySGVpZ2h0IC8gMikgLSBlLnBhZ2VZO1xyXG5cclxuXHRcdFtdLnNsaWNlLmNhbGwobGF5ZXJzKS5mb3JFYWNoKGZ1bmN0aW9uKGxheWVyLCBpbmRleCkge1xyXG5cdFx0XHR2YXIgZGl2aWRlciA9IGluZGV4IC8gMTAwLFxyXG5cdFx0XHRcdHBvc2l0aW9uWCA9IGluaXRpYWxYICogZGl2aWRlcixcclxuXHRcdFx0XHRwb3NpdGlvblkgPSBpbml0aWFsWSAqIGRpdmlkZXIsXHJcblx0XHRcdFx0dHJhbnNmb3JtU3RyaW5nID0gJ3RyYW5zbGF0ZSgnICsgcG9zaXRpb25YICsgJ3B4LCcgKyBwb3NpdGlvblkgKyAncHgpJztcclxuXHJcblx0XHRcdGxheWVyLnN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcclxuXHRcdH0pO1xyXG5cdH07XHJcbn0pOyIsIi8vIEZsaXAg0Y3RhNGE0LXQutGCXHJcblxyXG4kKGZ1bmN0aW9uKCl7XHJcblxyXG5cdC8vINC30LDQtNCw0ZHQvCDQv9C10YDQtdC80LXQvdC90YvQtVxyXG5cdHZhciBsaW5rID0gJCgnLmJ0bi1hdXRob19fbGluaycpLFxyXG5cdFx0Ym94ID0gJCgnLmZsaXAnKSxcclxuXHRcdG1haW5MaW5rID0gJCgnLmxvZ2luX19saW5rJyk7IFxyXG5cclxuXHQvLyDQv9GA0L7QvNC40YEg0LrQvtGC0L7RgNGL0Lkg0LHRg9C00LXRgiDQv9GA0L7QstC10YDRj9GC0Ywg0L3QsNC70LjRh9C40LUg0YTQu9C40L8g0LrQvtGC0LXQudC90LXRgNCwINC90LAg0YHRgtGA0LDQvdC40YbQtVxyXG5cdHZhciBmbGlwUHJvbWlzZSA9IG5ldyBQcm9taXNlIChmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHRcdFx0aWYgKGJveC5sZW5ndGgpIHtcclxuXHRcdFx0XHRyZXNvbHZlKCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmVqZWN0KCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHQvLyDRhNGD0L3QutGG0LjRjyDQv9GA0Lgg0L3QsNC70LjRh9C40Lgg0YTQu9C40L8g0LrQvtC90YLQtdC50L3QtdGA0LVcclxuXHRmbGlwUHJvbWlzZS50aGVuKGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdC8vINC/0YDQuCDQutC70LjQutC1LCDRhNC70LjQvyDQutC+0L3RgtC10L3QtdC50YDRgyDQtNC+0LHQsNCy0LjRgtGMINC60LvQsNGB0YEg0YEg0L/QvtCy0L7RgNC+0YLQvtC8XHJcblx0XHRsaW5rLmNsaWNrKGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpOyAvLyDQvtGC0LzQtdC90LAg0YHRgtCw0L3QtNCw0YDRgtC90YvRhSDQtNC10LnRgdCy0YLQudC4XHJcblxyXG5cdFx0XHRib3gudG9nZ2xlQ2xhc3MoJ2pzX19mbGlwJyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQvLyDQv9GA0Lgg0LrQu9C40LrQtSAg0L3QsCBcItCd0LAg0LPQu9Cw0LLQvdGD0Y5cIiwg0YPQtNCw0LvQuNGC0Ywg0LrQu9Cw0YHRgSDQv9C+0LLQvtGA0L7RgtCwLCDRgtC10Lwg0YHQsNC80YvQvCDRgNCw0LfQstC10YDQvdGD0LIg0LrQvtC90YLQtdC50L3QtdGAXHJcblx0XHRtYWluTGluay5jbGljayhmdW5jdGlvbihlKSB7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTsgLy8g0L7RgtC80LXQvdCwINGB0YLQsNC90LTQsNGA0YLQvdGL0YUg0LTQtdC50YHQstGC0LnQuFxyXG5cclxuXHRcdFx0Ym94LnJlbW92ZUNsYXNzKCdqc19fZmxpcCcpO1xyXG5cdFx0fSk7XHJcblx0fSkuY2F0Y2goZnVuY3Rpb24oKXtcclxuXHRcdFx0cmV0dXJuIDtcclxuXHRcdH0pO1xyXG5cclxufSk7IiwiLy8ganMg0LTQu9GPINCb0LjQv9C60L7Qs9C+INGB0LDQudC00LHQsNGA0LAg0L3QsCDRgdGC0YDQsNC90LjRhtC1INCR0LvQvtCzXHJcblxyXG4oZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgLy8g0LfQsNC00LDQtdC8INC/0LXRgNC10LzQtdC90L3Ri9C1XHJcbiAgICB2YXIgc2lkZWJhciA9ICQoJy5zaWRlYmFyJyksXHJcbiAgICAgICAgc2lkZWJhckZpeCA9ICdzaWRlYmFyX19maXhlZCcsXHJcbiAgICAgICAgc2Nyb2xsSGVpZ2h0ID0gNjUwO1xyXG5cclxuICAgIC8vINC/0YDQvtC80LjRgSDQutC+0YLQvtGA0YvQuSDQsdGD0LTQtdGCINC/0YDQvtCy0LXRgNGP0YLRjCDQvdCw0LvQuNGH0LjQtSDQodCw0LnQtNCx0LDRgNCwINC90LAg0YHRgtGA0LDQvdC40YbQtVxyXG4gICAgdmFyIHNpZGViYXJQcm9taXNlID0gbmV3IFByb21pc2UgKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGlmIChzaWRlYmFyLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVqZWN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8g0YTRg9C90LrRhtC40Y8g0L/RgNC4INC90LDQu9C40YfQuNC4INGB0LDQudC00LHQsNGA0LBcclxuICAgIHNpZGViYXJQcm9taXNlLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAvKiDQtdGB0LvQuCDRgdC60YDQvtC70Lsg0LHQvtC70YzRiNC1INC30LDQtNCw0L3QvdC+0Lkg0LLRi9GB0L7RgtGLLCDRgtC+INC00L7QsdCw0LLQuNGC0Ywg0LrQu9Cw0YHRgSAqL1xyXG4gICAgICAgICAgICBpZigkKHRoaXMpLnNjcm9sbFRvcCgpID4gc2Nyb2xsSGVpZ2h0KXtcclxuICAgICAgICAgICAgICAgIHNpZGViYXIuYWRkQ2xhc3Moc2lkZWJhckZpeCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA8IHNjcm9sbEhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgc2lkZWJhci5yZW1vdmVDbGFzcyhzaWRlYmFyRml4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSkuY2F0Y2goZnVuY3Rpb24oKXtcclxuICAgICAgICByZXR1cm4gO1xyXG4gICAgfSk7XHJcblxyXG59KSgpOyIsIi8vIGpzINC00LvRjyDQvdCw0LLQuNCz0LDRhtC40Lgg0L3QsCDRgdGC0YDQsNC90LjRhtC1INCR0LvQvtCzXHJcblxyXG4oZnVuY3Rpb24oKSB7XHJcblxyXG5cdC8vINC/0LXRgNC10LzQtdC90L3Ri9C1XHJcblx0dmFyIGxpbmsgPSAkKCcuc2lkZWJhcl9fbGluaycpLFxyXG5cdFx0aXRlbSA9ICQoJy53cml0ZV9faXRlbScpO1xyXG5cclxuXHQkKGZ1bmN0aW9uKCl7XHJcblxyXG5cdFx0Ly8g0L/RgNC+0LzQuNGBINC60L7RgtC+0YDRi9C5INCx0YPQtNC10YIg0L/RgNC+0LLQtdGA0Y/RgtGMINC90LDQu9C40YfQuNC1INCh0LDQudC00LHQsNGA0LAg0L3QsCDRgdGC0YDQsNC90LjRhtC1XHJcblx0XHR2YXIgbmF2U2lkZWJhclByb21pc2UgPSBuZXcgUHJvbWlzZSAoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblx0XHRcdGlmIChsaW5rLmxlbmd0aCkge1xyXG5cdFx0XHRcdHJlc29sdmUoKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZWplY3QoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8g0YTRg9C90LrRhtC40Y8g0L/RgNC4INC90LDQu9C40YfQuNC4INGB0LDQudC00LHQsNGA0LBcclxuXHRcdG5hdlNpZGViYXJQcm9taXNlLnRoZW4oZnVuY3Rpb24oKSB7XHJcblx0XHRcdGxpbmsuY2xpY2soZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdFx0c2hvd0FydGljbGUoJCh0aGlzKS5hdHRyKCdocmVmJyksIHRydWUpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pLmNhdGNoKGZ1bmN0aW9uKCl7XHJcblx0XHRcdHJldHVybiA7XHJcblx0XHR9KTtcclxuXHJcblxyXG5cdH0pO1xyXG5cclxuXHQvLyDQv9GA0Lgg0YHQutGA0L7Qu9C70LUg0LLRi9C30YvQstCw0YLRjCDRhNGD0L3QutGG0LjRjiBjaGVja0FydGljbGVcclxuXHQkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xyXG5cdFx0Y2hlY2tBcnRpY2xlKCk7XHJcblx0fSk7XHJcblxyXG5cclxuXHQvLyDRhNGD0L3QutGG0LjRjyDQtNC70Y8g0YHQutGA0L7Qu9C70LAg0Log0L3Rg9C20L3QvtC80YMg0Y3Qu9C10LzQtdC90YLRg1xyXG5cdGZ1bmN0aW9uIHNob3dBcnRpY2xlKGFydGljbGUsIGlzQW5pbWF0ZSkge1xyXG5cdFx0dmFyIGRpcmVjdGlvbiA9IGFydGljbGUucmVwbGFjZSgvIy8sICcnKSxcclxuXHRcdFx0cmVxQXJ0aWNsZSA9IGl0ZW0uZmlsdGVyKCdbZGF0YS1hcnRpY2xlPVwiJyArIGRpcmVjdGlvbiArICdcIl0nKSxcclxuXHRcdFx0cmVxQXJ0aWNsZVBvcyA9IHJlcUFydGljbGUub2Zmc2V0KCkudG9wO1xyXG5cclxuXHRcdGlmIChpc0FuaW1hdGUpIHtcclxuXHRcdFx0JCgnYm9keSwgaHRtbCcpLmFuaW1hdGUoe3Njcm9sbFRvcDogcmVxQXJ0aWNsZVBvc30sIDUwMCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvLyDRhNGD0L3QutGG0LjRjyDQtNC70Y8g0LDQstGC0L7QvNCw0YLQuNGH0LXRgdC60LXQs9C+INC/0LXRgNC10LrQu9GO0YfQtdC90LjRjyDQutC70LDRgdGB0LAgYWN0aXZlINGDINGB0YHRi9C70L7QulxyXG5cdGZ1bmN0aW9uIGNoZWNrQXJ0aWNsZSgpIHtcclxuXHRcdGl0ZW0uZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyICR0aGlzID0gJCh0aGlzKSxcclxuXHRcdFx0XHR0b3BFZGdlID0gJHRoaXMub2Zmc2V0KCkudG9wIC0gMTUwLFxyXG5cdFx0XHRcdGJvdHRvbUVkZ2UgPSB0b3BFZGdlICsgJHRoaXMuaGVpZ2h0KCksXHJcblx0XHRcdFx0d1Njcm9sbCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcclxuXHJcblx0XHRcdGlmICh0b3BFZGdlIDwgd1Njcm9sbCAmJiBib3R0b21FZGdlID4gd1Njcm9sbCkge1xyXG5cdFx0XHRcdHZhciBjdXJyZW50SWQgPSAkdGhpcy5kYXRhKCdhcnRpY2xlJyksXHJcblx0XHRcdFx0XHRyZXFMaW5rID0gbGluay5maWx0ZXIoJ1tocmVmPVwiIycgKyBjdXJyZW50SWQgKyAnXCJdJyk7XHJcblxyXG5cdFx0XHRcdFx0bGluay5yZW1vdmVDbGFzcygnc2lkZWJhcl9fbGluay0tYWN0aXZlJyk7XHJcblx0XHRcdFx0XHRyZXFMaW5rLmFkZENsYXNzKCdzaWRlYmFyX19saW5rLS1hY3RpdmUnKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHJcbn0pKCk7ICIsIi8vIGpzINGE0LDQudC7INC00LvRjyDQsNC90LjQvNCw0YbQuNC4INC60YDRg9Cz0L7QsiDRgdC60LjQu9C70L7QslxyXG5cclxuJChmdW5jdGlvbigpe1xyXG5cdC8vINC/0LXRgNC10LzQtdC90L3QsNGPINCx0LvQvtC60Lgg0YHQutC40LvQu9C+0LJcclxuXHR2YXIgZWxlbSA9ICQoJy5za2lsbHNfX2l0ZW1zLXdyYXAnKTtcclxuXHJcblx0Ly8g0L/RgNC+0LzQuNGBINC60L7RgtC+0YDRi9C5INCx0YPQtNC10YIg0L/RgNC+0LLQtdGA0Y/RgtGMINC90LDQu9C40YfQuNC1INCx0LvQvtC60LAg0YHQutC40LvQu9C+0LJcclxuXHR2YXIgc2tpbGxzUHJvbWlzZSA9IG5ldyBQcm9taXNlIChmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHRcdGlmIChlbGVtLmxlbmd0aCkge1xyXG5cdFx0cmVzb2x2ZSgpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdHJlamVjdCgpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQvLyDRhNGD0L3QutGG0LjRjyDQv9GA0Lgg0L3QsNC70LjRh9C40Lgg0LHQu9C+0LrQsCDRgdC60LjQu9C70L7QslxyXG5cdHNraWxsc1Byb21pc2UudGhlbihmdW5jdGlvbigpe1xyXG5cdFx0Ly8g0L/RgNC4INGB0LrRgNC+0LvQu9C1IFxyXG5cdFx0JCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyIHNjcm9sbFRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcclxuXHJcblx0XHRcdC8qINC10YHQu9C4INGE0YPQvdC60YbQuNGPIGNoZWNrRGlzdGFuY2Ug0LLQtdGA0L3Rg9C70LAgcmV0dXJuINGC0L4sINC00L7QsdCw0LLQuNGC0Ywg0LrQu9Cw0YHRgSAvINC40L3QsNGH0LUg0YPQtNCw0LvQuNGC0YwgKi9cclxuXHRcdFx0aWYoY2hlY2tEaXN0YW5jZShzY3JvbGxUb3ApKSB7XHJcblx0XHRcdFx0ZWxlbS5hZGRDbGFzcygnanMtY2lyY2xlLWFuaW1hdGUnKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRlbGVtLnJlbW92ZUNsYXNzKCdqcy1jaXJjbGUtYW5pbWF0ZScpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9KS5jYXRjaChmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIDtcclxuXHR9KTtcclxuXHJcblx0Ly8g0YTRg9C90LrRhtC40Y8g0LTQu9GPINC/0YDQvtCy0LXRgNC60Lgg0L/QvtC30LjRhtC40Lgg0Y3Qu9C10LzQtdC90YLQsFxyXG5cdHZhciBjaGVja0Rpc3RhbmNlID0gZnVuY3Rpb24oc2Nyb2xsVG9wKSB7XHJcblx0XHR2YXIgb2Zmc2V0ID0gZWxlbS5vZmZzZXQoKS50b3AsXHJcblx0XHRcdHdpbmRvd01hcmdpbiA9IE1hdGguY2VpbCgkKHdpbmRvdykuaGVpZ2h0KCkgLyAzKSxcclxuXHRcdFx0dG9wQm9yZGVyID0gb2Zmc2V0IC0gc2Nyb2xsVG9wIC0gd2luZG93TWFyZ2luLFxyXG5cdFx0XHRib3R0b21FZGdlID0gZWxlbS5vdXRlckhlaWdodCh0cnVlKSArIG9mZnNldCxcclxuXHRcdFx0Ym90dG9tQm9yZGVyID0gc2Nyb2xsVG9wICsgd2luZG93TWFyZ2luIC0gYm90dG9tRWRnZTtcclxuXHJcblx0XHRcdHJldHVybiB0b3BCb3JkZXIgPD0gMCAmJiBib3R0b21Cb3JkZXIgPD0gMFxyXG5cdH1cclxuXHJcblxyXG59KTsiLCIvLyBqcyDRhNCw0LnQuyDQtNC70Y8g0LrQsNGA0YLRi1xyXG5cclxuKGZ1bmN0aW9uKCkge1xyXG4gICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkRG9tTGlzdGVuZXIod2luZG93LCAnbG9hZCcsIGluaXQpO1xyXG4gICAgdmFyIG1hcCwgbWFya2Vyc0FycmF5ID0gW107XHJcblxyXG4gICAgZnVuY3Rpb24gYmluZEluZm9XaW5kb3cobWFya2VyLCBtYXAsIGxvY2F0aW9uKSB7XHJcbiAgICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIobWFya2VyLCAnY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZnVuY3Rpb24gY2xvc2UobG9jYXRpb24pIHtcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uLmliLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5pbmZvV2luZG93VmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgbG9jYXRpb24uaWIgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAobG9jYXRpb24uaW5mb1dpbmRvd1Zpc2libGUgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIGNsb3NlKGxvY2F0aW9uKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1hcmtlcnNBcnJheS5mb3JFYWNoKGZ1bmN0aW9uKGxvYywgaW5kZXgpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsb2MuaWIgJiYgbG9jLmliICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlKGxvYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGJveFRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgICAgIGJveFRleHQuc3R5bGUuY3NzVGV4dCA9ICdiYWNrZ3JvdW5kOiAjZmZmOyc7XHJcbiAgICAgICAgICAgICAgICBib3hUZXh0LmNsYXNzTGlzdC5hZGQoJ21kLXdoaXRlZnJhbWUtMmRwJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gYnVpbGRQaWVjZXMobG9jYXRpb24sIGVsLCBwYXJ0LCBpY29uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxvY2F0aW9uW3BhcnRdID09PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChsb2NhdGlvbi5pd1twYXJ0XSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2goZWwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncGhvdG8nOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsb2NhdGlvbi5waG90byl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnPGRpdiBjbGFzcz1cIml3LXBob3RvXCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJyArIGxvY2F0aW9uLnBob3RvICsgJyk7XCI+PC9kaXY+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2l3LXRvb2xiYXInOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnPGRpdiBjbGFzcz1cIml3LXRvb2xiYXJcIj48aDMgY2xhc3M9XCJtZC1zdWJoZWFkXCI+JyArIGxvY2F0aW9uLnRpdGxlICsgJzwvaDM+PC9kaXY+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2Rpdic6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoKHBhcnQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdlbWFpbCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzxkaXYgY2xhc3M9XCJpdy1kZXRhaWxzXCI+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiIHN0eWxlPVwiY29sb3I6IzQyODVmNDtcIj48aW1nIHNyYz1cIi8vY2RuLm1hcGtpdC5pby92MS9pY29ucy8nICsgaWNvbiArICcuc3ZnXCIvPjwvaT48c3Bhbj48YSBocmVmPVwibWFpbHRvOicgKyBsb2NhdGlvbi5lbWFpbCArICdcIiB0YXJnZXQ9XCJfYmxhbmtcIj4nICsgbG9jYXRpb24uZW1haWwgKyAnPC9hPjwvc3Bhbj48L2Rpdj4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3dlYic6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzxkaXYgY2xhc3M9XCJpdy1kZXRhaWxzXCI+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiIHN0eWxlPVwiY29sb3I6IzQyODVmNDtcIj48aW1nIHNyYz1cIi8vY2RuLm1hcGtpdC5pby92MS9pY29ucy8nICsgaWNvbiArICcuc3ZnXCIvPjwvaT48c3Bhbj48YSBocmVmPVwiJyArIGxvY2F0aW9uLndlYiArICdcIiB0YXJnZXQ9XCJfYmxhbmtcIj4nICsgbG9jYXRpb24ud2ViX2Zvcm1hdHRlZCArICc8L2E+PC9zcGFuPjwvZGl2Pic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZGVzYyc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzxsYWJlbCBjbGFzcz1cIml3LWRlc2NcIiBmb3I9XCJjYl9kZXRhaWxzXCI+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwiY2JfZGV0YWlsc1wiLz48aDMgY2xhc3M9XCJpdy14LWRldGFpbHNcIj5EZXRhaWxzPC9oMz48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zIHRvZ2dsZS1vcGVuLWRldGFpbHNcIj48aW1nIHNyYz1cIi8vY2RuLm1hcGtpdC5pby92MS9pY29ucy8nICsgaWNvbiArICcuc3ZnXCIvPjwvaT48cCBjbGFzcz1cIml3LXgtZGV0YWlsc1wiPicgKyBsb2NhdGlvbi5kZXNjICsgJzwvcD48L2xhYmVsPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnPGRpdiBjbGFzcz1cIml3LWRldGFpbHNcIj48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+PGltZyBzcmM9XCIvL2Nkbi5tYXBraXQuaW8vdjEvaWNvbnMvJyArIGljb24gKyAnLnN2Z1wiLz48L2k+PHNwYW4+JyArIGxvY2F0aW9uW3BhcnRdICsgJzwvc3Bhbj48L2Rpdj4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdvcGVuX2hvdXJzJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbXMgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobG9jYXRpb24ub3Blbl9ob3Vycy5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsb2NhdGlvbi5vcGVuX2hvdXJzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSAhPT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXMgKz0gJzxsaT48c3Ryb25nPicgKyBsb2NhdGlvbi5vcGVuX2hvdXJzW2ldLmRheSArICc8L3N0cm9uZz48c3Ryb25nPicgKyBsb2NhdGlvbi5vcGVuX2hvdXJzW2ldLmhvdXJzICsnPC9zdHJvbmc+PC9saT4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZpcnN0ID0gJzxsaT48bGFiZWwgZm9yPVwiY2JfaG91cnNcIj48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCJjYl9ob3Vyc1wiLz48c3Ryb25nPicgKyBsb2NhdGlvbi5vcGVuX2hvdXJzWzBdLmRheSArICc8L3N0cm9uZz48c3Ryb25nPicgKyBsb2NhdGlvbi5vcGVuX2hvdXJzWzBdLmhvdXJzICsnPC9zdHJvbmc+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29ucyB0b2dnbGUtb3Blbi1ob3Vyc1wiPjxpbWcgc3JjPVwiLy9jZG4ubWFwa2l0LmlvL3YxL2ljb25zL2tleWJvYXJkX2Fycm93X2Rvd24uc3ZnXCIvPjwvaT48dWw+JyArIGl0ZW1zICsgJzwvdWw+PC9sYWJlbD48L2xpPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwiaXctbGlzdFwiPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgZmlyc3QtbWF0ZXJpYWwtaWNvbnNcIiBzdHlsZT1cImNvbG9yOiM0Mjg1ZjQ7XCI+PGltZyBzcmM9XCIvL2Nkbi5tYXBraXQuaW8vdjEvaWNvbnMvJyArIGljb24gKyAnLnN2Z1wiLz48L2k+PHVsPicgKyBmaXJzdCArICc8L3VsPjwvZGl2Pic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBib3hUZXh0LmlubmVySFRNTCA9IFxyXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkUGllY2VzKGxvY2F0aW9uLCAncGhvdG8nLCAncGhvdG8nLCAnJykgK1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkUGllY2VzKGxvY2F0aW9uLCAnaXctdG9vbGJhcicsICd0aXRsZScsICcnKSArXHJcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRQaWVjZXMobG9jYXRpb24sICdkaXYnLCAnYWRkcmVzcycsICdsb2NhdGlvbl9vbicpICtcclxuICAgICAgICAgICAgICAgICAgICBidWlsZFBpZWNlcyhsb2NhdGlvbiwgJ2RpdicsICd3ZWInLCAncHVibGljJykgK1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkUGllY2VzKGxvY2F0aW9uLCAnZGl2JywgJ2VtYWlsJywgJ2VtYWlsJykgK1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkUGllY2VzKGxvY2F0aW9uLCAnZGl2JywgJ3RlbCcsICdwaG9uZScpICtcclxuICAgICAgICAgICAgICAgICAgICBidWlsZFBpZWNlcyhsb2NhdGlvbiwgJ2RpdicsICdpbnRfdGVsJywgJ3Bob25lJykgK1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkUGllY2VzKGxvY2F0aW9uLCAnb3Blbl9ob3VycycsICdvcGVuX2hvdXJzJywgJ2FjY2Vzc190aW1lJykgK1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkUGllY2VzKGxvY2F0aW9uLCAnZGl2JywgJ2Rlc2MnLCAna2V5Ym9hcmRfYXJyb3dfZG93bicpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBteU9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxpZ25Cb3R0b206IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogYm94VGV4dCxcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlQXV0b1BhbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBtYXhXaWR0aDogMCxcclxuICAgICAgICAgICAgICAgICAgICBwaXhlbE9mZnNldDogbmV3IGdvb2dsZS5tYXBzLlNpemUoLTE0MCwgLTQwKSxcclxuICAgICAgICAgICAgICAgICAgICB6SW5kZXg6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgYm94U3R5bGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICcyODBweCdcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlQm94TWFyZ2luOiAnMHB4IDBweCAwcHggMHB4JyxcclxuICAgICAgICAgICAgICAgICAgICBpbmZvQm94Q2xlYXJhbmNlOiBuZXcgZ29vZ2xlLm1hcHMuU2l6ZSgxLCAxKSxcclxuICAgICAgICAgICAgICAgICAgICBpc0hpZGRlbjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFuZTogJ2Zsb2F0UGFuZScsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlRXZlbnRQcm9wYWdhdGlvbjogZmFsc2VcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgbG9jYXRpb24uaWIgPSBuZXcgSW5mb0JveChteU9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgbG9jYXRpb24uaWIub3BlbihtYXAsIG1hcmtlcik7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5pbmZvV2luZG93VmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgICAgIHZhciBtYXBPcHRpb25zID0ge1xyXG4gICAgICAgICAgICBjZW50ZXI6IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoNTUuNzQ4MzU4MTEyNzIwMzc1LDUyLjM1NDE3NTg4NzQ5OTk4KSxcclxuICAgICAgICAgICAgem9vbTogMTMsXHJcbiAgICAgICAgICAgIGdlc3R1cmVIYW5kbGluZzogJ2Nvb3BlcmF0aXZlJyxcclxuICAgICAgICAgICAgZnVsbHNjcmVlbkNvbnRyb2w6IGZhbHNlLFxyXG4gICAgICAgICAgICB6b29tQ29udHJvbDogdHJ1ZSxcclxuICAgICAgICAgICAgZGlzYWJsZURvdWJsZUNsaWNrWm9vbTogdHJ1ZSxcclxuICAgICAgICAgICAgbWFwVHlwZUNvbnRyb2w6IHRydWUsXHJcbiAgICAgICAgICAgIG1hcFR5cGVDb250cm9sT3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgc3R5bGU6IGdvb2dsZS5tYXBzLk1hcFR5cGVDb250cm9sU3R5bGUuSE9SSVpPTlRBTF9CQVIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNjYWxlQ29udHJvbDogZmFsc2UsXHJcbiAgICAgICAgICAgIHNjcm9sbHdoZWVsOiBmYWxzZSxcclxuICAgICAgICAgICAgc3RyZWV0Vmlld0NvbnRyb2w6IGZhbHNlLFxyXG4gICAgICAgICAgICBkcmFnZ2FibGUgOiB0cnVlLFxyXG4gICAgICAgICAgICBjbGlja2FibGVJY29uczogdHJ1ZSxcclxuICAgICAgICAgICAgem9vbUNvbnRyb2xPcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogZ29vZ2xlLm1hcHMuQ29udHJvbFBvc2l0aW9uLlJJR0hUX0NFTlRFUlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBtYXBUeXBlQ29udHJvbE9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBnb29nbGUubWFwcy5Db250cm9sUG9zaXRpb24uUklHSFRfVE9QXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG1hcFR5cGVJZDogZ29vZ2xlLm1hcHMuTWFwVHlwZUlkLlJPQURNQVAsXHJcbiAgICAgICAgICAgIHN0eWxlczogW3tcImZlYXR1cmVUeXBlXCI6XCJ3YXRlclwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiIzQ2YmNlY1wifSx7XCJ2aXNpYmlsaXR5XCI6XCJvblwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJsYW5kc2NhcGVcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiNmMmYyZjJcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicm9hZFwiLFwic3R5bGVyc1wiOlt7XCJzYXR1cmF0aW9uXCI6LTEwMH0se1wibGlnaHRuZXNzXCI6NDV9XX0se1wiZmVhdHVyZVR5cGVcIjpcInJvYWQuaGlnaHdheVwiLFwic3R5bGVyc1wiOlt7XCJ2aXNpYmlsaXR5XCI6XCJzaW1wbGlmaWVkXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInJvYWQuYXJ0ZXJpYWxcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHMuaWNvblwiLFwic3R5bGVyc1wiOlt7XCJ2aXNpYmlsaXR5XCI6XCJvZmZcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwiYWRtaW5pc3RyYXRpdmVcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHMudGV4dC5maWxsXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjNDQ0NDQ0XCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInRyYW5zaXRcIixcInN0eWxlcnNcIjpbe1widmlzaWJpbGl0eVwiOlwib2ZmXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInBvaVwiLFwic3R5bGVyc1wiOlt7XCJ2aXNpYmlsaXR5XCI6XCJvZmZcIn1dfV1cclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG1hcEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwJyk7XHJcbiAgICAgICAgdmFyIG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAobWFwRWxlbWVudCwgbWFwT3B0aW9ucyk7XHJcbiAgICAgICAgdmFyIGxvY2F0aW9ucyA9IFtcclxuICAgICAgICAgICAge1widGl0bGVcIjpcIkFORFJFV1wiLFwidGVsXCI6XCIrNyg5NTEpODk2LTQyLTQ0XCIsXCJlbWFpbFwiOlwia2F0YXNoaTEzMjhAbWFpbC5ydVwiLFwid2ViXCI6XCJodHRwczovL2FuZHJld2xleWtpbi5naXRodWIuaW8vcG9ydGZvbGlvL2J1aWxkL1wiLFwid2ViX2Zvcm1hdHRlZFwiOlwiYW5kcmV3bGV5a2luLmdpdGh1Yi5pb1wiLFwibGF0XCI6NTUuNzM0NzA1NzA0NTkyODA1LFwibG5nXCI6NTIuMzk3NTE1MDIwNzYyNjI2LFwidmljaW5pdHlcIjpcIlwiLFwibWFya2VyXCI6e1wiZmlsbENvbG9yXCI6XCIjMDBBQ0MxXCIsXCJmaWxsT3BhY2l0eVwiOjEsXCJzdHJva2VXZWlnaHRcIjowLFwic2NhbGVcIjoxLjUsXCJwYXRoXCI6XCJNMTAuMiw3LjRjLTYsMC0xMC45LDQuOS0xMC45LDEwLjljMCw2LDEwLjksMTguNCwxMC45LDE4LjRzMTAuOS0xMi4zLDEwLjktMTguNEMyMS4yLDEyLjIsMTYuMyw3LjQsMTAuMiw3LjR6IE0xMC4yLDIyLjljLTIuNiwwLTQuNi0yLjEtNC42LTQuNnMyLjEtNC42LDQuNi00LjZzNC42LDIuMSw0LjYsNC42UzEyLjgsMjIuOSwxMC4yLDIyLjl6XCIsXCJhbmNob3JcIjp7XCJ4XCI6MTAsXCJ5XCI6MzB9LFwib3JpZ2luXCI6e1wieFwiOjAsXCJ5XCI6MH0sXCJzdHlsZVwiOjF9LFwiaXdcIjp7XCJ0ZWxcIjp0cnVlLFwid2ViXCI6dHJ1ZSxcImVtYWlsXCI6dHJ1ZX19XHJcbiAgICAgICAgXTtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbG9jYXRpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xyXG4gICAgICAgICAgICAgICAgaWNvbjogbG9jYXRpb25zW2ldLm1hcmtlcixcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKGxvY2F0aW9uc1tpXS5sYXQsIGxvY2F0aW9uc1tpXS5sbmcpLFxyXG5cclxuICAgICAgICAgICAgICAgIG1hcDogbWFwLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IGxvY2F0aW9uc1tpXS50aXRsZSxcclxuICAgICAgICAgICAgICAgIGFkZHJlc3M6IGxvY2F0aW9uc1tpXS5hZGRyZXNzLFxyXG4gICAgICAgICAgICAgICAgZGVzYzogbG9jYXRpb25zW2ldLmRlc2MsXHJcbiAgICAgICAgICAgICAgICB0ZWw6IGxvY2F0aW9uc1tpXS50ZWwsXHJcbiAgICAgICAgICAgICAgICBpbnRfdGVsOiBsb2NhdGlvbnNbaV0uaW50X3RlbCxcclxuICAgICAgICAgICAgICAgIHZpY2luaXR5OiBsb2NhdGlvbnNbaV0udmljaW5pdHksXHJcbiAgICAgICAgICAgICAgICBvcGVuOiBsb2NhdGlvbnNbaV0ub3BlbixcclxuICAgICAgICAgICAgICAgIG9wZW5faG91cnM6IGxvY2F0aW9uc1tpXS5vcGVuX2hvdXJzLFxyXG4gICAgICAgICAgICAgICAgcGhvdG86IGxvY2F0aW9uc1tpXS5waG90byxcclxuICAgICAgICAgICAgICAgIHRpbWU6IGxvY2F0aW9uc1tpXS50aW1lLFxyXG4gICAgICAgICAgICAgICAgZW1haWw6IGxvY2F0aW9uc1tpXS5lbWFpbCxcclxuICAgICAgICAgICAgICAgIHdlYjogbG9jYXRpb25zW2ldLndlYixcclxuICAgICAgICAgICAgICAgIGl3OiBsb2NhdGlvbnNbaV0uaXdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG1hcmtlcnNBcnJheS5wdXNoKG1hcmtlcik7XHJcblxyXG4gICAgICAgICAgICBpZiAobG9jYXRpb25zW2ldLml3LmVuYWJsZSA9PT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICBiaW5kSW5mb1dpbmRvdyhtYXJrZXIsIG1hcCwgbG9jYXRpb25zW2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG5cclxufSkoKTsgXHJcbiIsIi8vINCR0LjQsdC70LjQvtGC0LXQutCwIHN2ZzRldmVyeWJvZHkg0LTQu9GPIHN2Z1xyXG5cclxuJChmdW5jdGlvbigpe1xyXG5cdHN2ZzRldmVyeWJvZHkoKTtcclxufSkiXX0=
