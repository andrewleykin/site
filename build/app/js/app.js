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

  // Функция при нажатии на меню-шамбургер
  link.click(function(e) {
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
  		list.slideToggle();
  	},700);

  });
})();
// js для параллакс эффекта, на фоне гор
'use sctrict';

$(function(){
	var parallax = (function () {
		var img = document.querySelector('.page-header__img');
		var svgText = document.querySelector('.js__header-text');
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


$(function(){
	svg4everybody();
})
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lbnUuanMiLCJwYXJhbGxheC5qcyIsInN2ZzRldmVyeWJvZHkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaENBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBqcyDQtNC70Y8g0LzQtdC90Y5cclxuXHJcbihmdW5jdGlvbigpIHtcclxuICAndXNlIHN0cmljdCc7XHJcblxyXG4gIC8vINCf0LXRgNC10LzQtdC90L3Ri9C1XHJcbiAgdmFyIGxpbmsgPSAkKCcuaGVhZGVyX19tZW51JyksXHJcbiAgICAgIGxpbmtfX2FjdGl2ZT0gJ2hlYWRlcl9fbWVudV9fYWN0aXZlJyxcclxuICAgICAgbGlzdCA9ICQoJy5tYWluLW1lbnVfX2xpc3QnKSxcclxuICAgICAgYmcgPSAkKCcubWFpbi1tZW51JyksXHJcbiAgICAgIHNvY2lhbCA9ICQoJy5oZWFkZXJfX3NvY2lhbCcpLFxyXG4gICAgICBhbmltYXRlID0gJ21haW4tbWVudV9fYW5pbWF0ZSc7XHJcblxyXG4gIC8vINCk0YPQvdC60YbQuNGPINC/0YDQuCDQvdCw0LbQsNGC0LjQuCDQvdCwINC80LXQvdGOLdGI0LDQvNCx0YPRgNCz0LXRgFxyXG4gIGxpbmsuY2xpY2soZnVuY3Rpb24oZSkge1xyXG4gIFx0ZS5wcmV2ZW50RGVmYXVsdCgpOyAvLyDQvtGC0LzQtdC90LAg0YHRgtCw0L3QtNCw0YDRgtC90YvRhSDQtNC10LnRgdCy0YLQudC4XHJcblxyXG4gIFx0JCh0aGlzKS50b2dnbGVDbGFzcyhsaW5rX19hY3RpdmUpOyAvLyDQuNC30LzQtdC90Y/QtdC8INC90LAg0LDQutGC0LjQstC90L7QtSDRgdC+0YHRgtC+0Y/QvdC40LVcclxuXHJcbiAgXHQvLyDQldGB0LvQuCDQutC90L7Qv9C60LAg0LDQutGC0LjQstC90LAg0YLQvlxyXG4gIFx0aWYobGluay5oYXNDbGFzcyhsaW5rX19hY3RpdmUpKSB7XHJcbiAgXHRcdGJnLmNzcygnZGlzcGxheScsICdibG9jaycpLmFkZENsYXNzKGFuaW1hdGUpOyAvLyDQvtGC0L7QsdGA0LDQt9C40YLRjCDQvNC10L3Rjiwg0Lgg0LTQvtCx0LDQstC40YLRjCDQutC70LDRgdGBINCw0L3QuNC80LDRhtC40LhcclxuICBcdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gIFx0XHRcdHNvY2lhbC5jc3MoJ29wYWNpdHknLCAnMCcpOyAvLyDRh9C10YDQtdC3IDIwMCDQvNC40LvQuNGB0LXQutGD0L3QtCDRgdC60YDRi9GC0Ywg0LjQutC+0L3QutC4XHJcbiAgXHRcdH0sMjAwKTtcclxuICBcdH0gZWxzZSB7IC8vINCV0YHQu9C4INC60L3QvtC/0LrQsCDQvdC1INCw0LrRgtC40LLQvdCwXHJcbiAgXHRcdGJnLmNzcygnZGlzcGxheScsICdub25lJykucmVtb3ZlQ2xhc3MoYW5pbWF0ZSk7IC8vINGB0LrRgNGL0YLRjCDQvNC10L3Rjiwg0YPQtNCw0LvQuNGC0Ywg0LrQu9Cw0YHRgSDQsNC90LjQvNCw0YbQuNC4XHJcbiAgXHRcdHNvY2lhbC5jc3MoJ29wYWNpdHknLCAnMScpIC8vINC+0YLQvtCx0YDQsNC30LjRgtGMINC40LrQvtC90LrQuFxyXG4gIFx0fVxyXG5cclxuICBcdC8vINGH0LXRgNC10LcgNzAwINC80LjQu9C40YHQtdC60YPQvdC0INC+0YLQvtCx0YDQsNC20LDRgtGMINGB0L/QuNGB0L7QuiDQvNC10L3RjlxyXG4gIFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gIFx0XHRsaXN0LnNsaWRlVG9nZ2xlKCk7XHJcbiAgXHR9LDcwMCk7XHJcblxyXG4gIH0pO1xyXG59KSgpOyIsIi8vIGpzINC00LvRjyDQv9Cw0YDQsNC70LvQsNC60YEg0Y3RhNGE0LXQutGC0LAsINC90LAg0YTQvtC90LUg0LPQvtGAXHJcbid1c2Ugc2N0cmljdCc7XHJcblxyXG4kKGZ1bmN0aW9uKCl7XHJcblx0dmFyIHBhcmFsbGF4ID0gKGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBpbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFnZS1oZWFkZXJfX2ltZycpO1xyXG5cdFx0dmFyIHN2Z1RleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanNfX2hlYWRlci10ZXh0Jyk7XHJcblx0XHR2YXIgdXNlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51c2VyLWJsb2NrX190b3AnKTtcclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRtb3ZlOiBmdW5jdGlvbihibG9jaywgd2luZG93U2Nyb2xsLCBzdHJhZmVBbW91bnQpIHtcclxuXHRcdFx0XHR2YXIgc3RyYWZlID0gd2luZG93U2Nyb2xsIC8gLXN0cmFmZUFtb3VudCArICclJztcclxuXHRcdFx0XHR2YXIgdHJhbnNmb3JtU3RyaW5nID0gJ3RyYW5zbGF0ZTNkKDAsJyArIHN0cmFmZSArICcsMCknO1xyXG5cclxuXHRcdFx0XHRibG9jay5zdHlsZS50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1TdHJpbmc7XHJcblx0XHRcdH0sXHJcblx0XHRcdGluaXQ6IGZ1bmN0aW9uICh3U2Nyb2xsKSB7XHJcblx0XHRcdFx0dGhpcy5tb3ZlKGltZywgd1Njcm9sbCwgNDUpO1xyXG5cdFx0XHRcdHRoaXMubW92ZShzdmdUZXh0LCB3U2Nyb2xsLCAzMCk7XHJcblx0XHRcdFx0dGhpcy5tb3ZlKHVzZXIsIHdTY3JvbGwsIDEwKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdFxyXG5cdH0oKSk7XHJcblx0d2luZG93Lm9uc2Nyb2xsID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIHdTY3JvbGwgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XHJcblx0XHRwYXJhbGxheC5pbml0KHdTY3JvbGwpO1xyXG5cdH1cclxuXHJcbn0pXHJcblxyXG4iLCIkKGZ1bmN0aW9uKCl7XHJcblx0c3ZnNGV2ZXJ5Ym9keSgpO1xyXG59KSJdfQ==
