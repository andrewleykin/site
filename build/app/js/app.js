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
console.log($('body'));
$(function(){
	var parallax = (function () {
		var img = document.querySelector('.welcome__bg__img');
		var svgPortfolio = document.querySelector('.svg-bg__portfolio_header');
		var user = document.querySelector('.user-block__top');

		
		return {
			move: function(block, windowScroll, strafeAmount) {
				var strafe = windowScroll / -strafeAmount + '%';
				var transformString = 'translate3d(0,' + strafe + ',0)';

				block.style.transform = transformString;
			},
			init: function (wScroll) {
				this.move(img, wScroll, 45);
				this.move(svgPortfolio, wScroll, 20);
				this.move(user, wScroll, 5);
			}
		}

	}());
	
	window.onscroll = function () {
		var wScroll = window.pageYOffset;

		parallax.init(wScroll);
	}
})


// js для параллакс эффекта, на фоне гор - страница blog
'use sctrict';

$(function(){
	var parallax = (function () {
		var img = document.querySelector('.welcome__bg__img');
		var user = document.querySelector('.user-block__top');
		var svgBlog = document.querySelector('.svg-bg__blog_header');

		return {
			move: function(block, windowScroll, strafeAmount) {
				var strafe = windowScroll / -strafeAmount + '%';
				var transformString = 'translate3d(0,' + strafe + ',0)';

				block.style.transform = transformString;
			},
			init: function (wScroll) {
				this.move(img, wScroll, 45);
				this.move(svgBlog, wScroll, 15);
				this.move(user, wScroll, 5);
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lbnUuanMiLCJwYXJhbGxheC5qcyIsInBhcmFsbGF4X19mb3JfX2Jsb2cuanMiLCJzdmc0ZXZlcnlib2R5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvQkE7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGpzINC00LvRjyDQvNC10L3RjlxyXG5cclxuKGZ1bmN0aW9uKCkge1xyXG4gICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgLy8g0J/QtdGA0LXQvNC10L3QvdGL0LVcclxuICB2YXIgbGluayA9ICQoJy5oZWFkZXJfX21lbnUnKSxcclxuICAgICAgbGlua19fYWN0aXZlPSAnaGVhZGVyX19tZW51X19hY3RpdmUnLFxyXG4gICAgICBsaXN0ID0gJCgnLm1haW4tbWVudV9fbGlzdCcpLFxyXG4gICAgICBiZyA9ICQoJy5tYWluLW1lbnUnKSxcclxuICAgICAgc29jaWFsID0gJCgnLmhlYWRlcl9fc29jaWFsJyksXHJcbiAgICAgIGFuaW1hdGUgPSAnbWFpbi1tZW51X19hbmltYXRlJztcclxuXHJcbiAgLy8g0KTRg9C90LrRhtC40Y8g0L/RgNC4INC90LDQttCw0YLQuNC4INC90LAg0LzQtdC90Y4t0YjQsNC80LHRg9GA0LPQtdGAXHJcbiAgbGluay5jbGljayhmdW5jdGlvbihlKSB7XHJcbiAgXHRlLnByZXZlbnREZWZhdWx0KCk7IC8vINC+0YLQvNC10L3QsCDRgdGC0LDQvdC00LDRgNGC0L3Ri9GFINC00LXQudGB0LLRgtC50LhcclxuXHJcbiAgXHQkKHRoaXMpLnRvZ2dsZUNsYXNzKGxpbmtfX2FjdGl2ZSk7IC8vINC40LfQvNC10L3Rj9C10Lwg0L3QsCDQsNC60YLQuNCy0L3QvtC1INGB0L7RgdGC0L7Rj9C90LjQtVxyXG5cclxuICBcdC8vINCV0YHQu9C4INC60L3QvtC/0LrQsCDQsNC60YLQuNCy0L3QsCDRgtC+XHJcbiAgXHRpZihsaW5rLmhhc0NsYXNzKGxpbmtfX2FjdGl2ZSkpIHtcclxuICBcdFx0YmcuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJykuYWRkQ2xhc3MoYW5pbWF0ZSk7IC8vINC+0YLQvtCx0YDQsNC30LjRgtGMINC80LXQvdGOLCDQuCDQtNC+0LHQsNCy0LjRgtGMINC60LvQsNGB0YEg0LDQvdC40LzQsNGG0LjQuFxyXG4gIFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgXHRcdFx0c29jaWFsLmNzcygnb3BhY2l0eScsICcwJyk7IC8vINGH0LXRgNC10LcgMjAwINC80LjQu9C40YHQtdC60YPQvdC0INGB0LrRgNGL0YLRjCDQuNC60L7QvdC60LhcclxuICBcdFx0fSwyMDApO1xyXG4gIFx0fSBlbHNlIHsgLy8g0JXRgdC70Lgg0LrQvdC+0L/QutCwINC90LUg0LDQutGC0LjQstC90LBcclxuICBcdFx0YmcuY3NzKCdkaXNwbGF5JywgJ25vbmUnKS5yZW1vdmVDbGFzcyhhbmltYXRlKTsgLy8g0YHQutGA0YvRgtGMINC80LXQvdGOLCDRg9C00LDQu9C40YLRjCDQutC70LDRgdGBINCw0L3QuNC80LDRhtC40LhcclxuICBcdFx0c29jaWFsLmNzcygnb3BhY2l0eScsICcxJykgLy8g0L7RgtC+0LHRgNCw0LfQuNGC0Ywg0LjQutC+0L3QutC4XHJcbiAgXHR9XHJcblxyXG4gIFx0Ly8g0YfQtdGA0LXQtyA3MDAg0LzQuNC70LjRgdC10LrRg9C90LQg0L7RgtC+0LHRgNCw0LbQsNGC0Ywg0YHQv9C40YHQvtC6INC80LXQvdGOXHJcbiAgXHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgXHRcdGxpc3Quc2xpZGVUb2dnbGUoKTtcclxuICBcdH0sNzAwKTtcclxuXHJcbiAgfSk7XHJcbn0pKCk7IiwiLy8ganMg0LTQu9GPINC/0LDRgNCw0LvQu9Cw0LrRgSDRjdGE0YTQtdC60YLQsCwg0L3QsCDRhNC+0L3QtSDQs9C+0YBcclxuJ3VzZSBzY3RyaWN0JztcclxuY29uc29sZS5sb2coJCgnYm9keScpKTtcclxuJChmdW5jdGlvbigpe1xyXG5cdHZhciBwYXJhbGxheCA9IChmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgaW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndlbGNvbWVfX2JnX19pbWcnKTtcclxuXHRcdHZhciBzdmdQb3J0Zm9saW8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3ZnLWJnX19wb3J0Zm9saW9faGVhZGVyJyk7XHJcblx0XHR2YXIgdXNlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51c2VyLWJsb2NrX190b3AnKTtcclxuXHJcblx0XHRcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdG1vdmU6IGZ1bmN0aW9uKGJsb2NrLCB3aW5kb3dTY3JvbGwsIHN0cmFmZUFtb3VudCkge1xyXG5cdFx0XHRcdHZhciBzdHJhZmUgPSB3aW5kb3dTY3JvbGwgLyAtc3RyYWZlQW1vdW50ICsgJyUnO1xyXG5cdFx0XHRcdHZhciB0cmFuc2Zvcm1TdHJpbmcgPSAndHJhbnNsYXRlM2QoMCwnICsgc3RyYWZlICsgJywwKSc7XHJcblxyXG5cdFx0XHRcdGJsb2NrLnN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcclxuXHRcdFx0fSxcclxuXHRcdFx0aW5pdDogZnVuY3Rpb24gKHdTY3JvbGwpIHtcclxuXHRcdFx0XHR0aGlzLm1vdmUoaW1nLCB3U2Nyb2xsLCA0NSk7XHJcblx0XHRcdFx0dGhpcy5tb3ZlKHN2Z1BvcnRmb2xpbywgd1Njcm9sbCwgMjApO1xyXG5cdFx0XHRcdHRoaXMubW92ZSh1c2VyLCB3U2Nyb2xsLCA1KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHR9KCkpO1xyXG5cdFxyXG5cdHdpbmRvdy5vbnNjcm9sbCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciB3U2Nyb2xsID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xyXG5cclxuXHRcdHBhcmFsbGF4LmluaXQod1Njcm9sbCk7XHJcblx0fVxyXG59KVxyXG5cclxuIiwiLy8ganMg0LTQu9GPINC/0LDRgNCw0LvQu9Cw0LrRgSDRjdGE0YTQtdC60YLQsCwg0L3QsCDRhNC+0L3QtSDQs9C+0YAgLSDRgdGC0YDQsNC90LjRhtCwIGJsb2dcclxuJ3VzZSBzY3RyaWN0JztcclxuXHJcbiQoZnVuY3Rpb24oKXtcclxuXHR2YXIgcGFyYWxsYXggPSAoZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIGltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53ZWxjb21lX19iZ19faW1nJyk7XHJcblx0XHR2YXIgdXNlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51c2VyLWJsb2NrX190b3AnKTtcclxuXHRcdHZhciBzdmdCbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN2Zy1iZ19fYmxvZ19oZWFkZXInKTtcclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRtb3ZlOiBmdW5jdGlvbihibG9jaywgd2luZG93U2Nyb2xsLCBzdHJhZmVBbW91bnQpIHtcclxuXHRcdFx0XHR2YXIgc3RyYWZlID0gd2luZG93U2Nyb2xsIC8gLXN0cmFmZUFtb3VudCArICclJztcclxuXHRcdFx0XHR2YXIgdHJhbnNmb3JtU3RyaW5nID0gJ3RyYW5zbGF0ZTNkKDAsJyArIHN0cmFmZSArICcsMCknO1xyXG5cclxuXHRcdFx0XHRibG9jay5zdHlsZS50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1TdHJpbmc7XHJcblx0XHRcdH0sXHJcblx0XHRcdGluaXQ6IGZ1bmN0aW9uICh3U2Nyb2xsKSB7XHJcblx0XHRcdFx0dGhpcy5tb3ZlKGltZywgd1Njcm9sbCwgNDUpO1xyXG5cdFx0XHRcdHRoaXMubW92ZShzdmdCbG9nLCB3U2Nyb2xsLCAxNSk7XHJcblx0XHRcdFx0dGhpcy5tb3ZlKHVzZXIsIHdTY3JvbGwsIDUpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdH0oKSk7XHJcblx0XHJcblx0d2luZG93Lm9uc2Nyb2xsID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIHdTY3JvbGwgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XHJcblxyXG5cdFx0cGFyYWxsYXguaW5pdCh3U2Nyb2xsKTtcclxuXHR9XHJcbn0pXHJcbiIsIiQoZnVuY3Rpb24oKXtcclxuXHRzdmc0ZXZlcnlib2R5KCk7XHJcbn0pIl19
