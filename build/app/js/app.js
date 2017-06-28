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

  var parallax = (function () {
  var bg = $('.welcome__bg__img');
  var user = $('.user-block');
  var svgPortfolio = $('.svg-bg__portfolio_header');
  var svgBlog = $('.svg-bg__blog_header');

  return {
    move: function(block, windowScroll, strafeAmount) {
      var strafe = windowScroll / -strafeAmount + '%';
      var transformString = 'translate3d(0,' + strafe + ',0)';
      
      block.css.transform = transformString;

      console.log(block.css.transform);
    },
    init: function (wScroll) {
      this.move(bg, wScroll, 45);
      this.move(svgPortfolio, wScroll, 15);
      this.move(svgBlog, wScroll, 15);
      this.move(user, wScroll, 2);
    }
  }

}());

window.onscroll = function () {
  var wScroll = window.pageYOffset;

  parallax.init(wScroll);
}
})();
var parallax = (function () {
	var bg = $('.welcome__bg__img');
	var user = $('.user-block');
	var svgPortfolio = $('.svg-bg__portfolio_header');
	var svgBlog = $('.svg-bg__blog_header');

	return {
		move: function(block, windowScroll, strafeAmount) {
			var strafe = windowScroll / -strafeAmount + '%';
			var transformString = 'translate3d(0,' + strafe + ',0)';
			
			var style = block.style;

			style.transform = transformString;
		},
		init: function (wScroll) {
			this.move(bg, wScroll, 45);
			this.move(svgPortfolio, wScroll, 15);
			this.move(svgBlog, wScroll, 15);
			this.move(user, wScroll, 2);
		}
	}

}());

window.onscroll = function () {
	var wScroll = window.pageYOffset;

	parallax.init(wScroll);
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lbnUuanMiLCJwYXJhbGxheC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBqcyDQtNC70Y8g0LzQtdC90Y5cclxuXHJcbihmdW5jdGlvbigpIHtcclxuICAndXNlIHN0cmljdCc7XHJcblxyXG4gIC8vINCf0LXRgNC10LzQtdC90L3Ri9C1XHJcbiAgdmFyIGxpbmsgPSAkKCcuaGVhZGVyX19tZW51JyksXHJcbiAgICAgIGxpbmtfX2FjdGl2ZT0gJ2hlYWRlcl9fbWVudV9fYWN0aXZlJyxcclxuICAgICAgbGlzdCA9ICQoJy5tYWluLW1lbnVfX2xpc3QnKSxcclxuICAgICAgYmcgPSAkKCcubWFpbi1tZW51JyksXHJcbiAgICAgIHNvY2lhbCA9ICQoJy5oZWFkZXJfX3NvY2lhbCcpLFxyXG4gICAgICBhbmltYXRlID0gJ21haW4tbWVudV9fYW5pbWF0ZSc7XHJcblxyXG4gIC8vINCk0YPQvdC60YbQuNGPINC/0YDQuCDQvdCw0LbQsNGC0LjQuCDQvdCwINC80LXQvdGOLdGI0LDQvNCx0YPRgNCz0LXRgFxyXG4gIGxpbmsuY2xpY2soZnVuY3Rpb24oZSkge1xyXG4gIFx0ZS5wcmV2ZW50RGVmYXVsdCgpOyAvLyDQvtGC0LzQtdC90LAg0YHRgtCw0L3QtNCw0YDRgtC90YvRhSDQtNC10LnRgdCy0YLQudC4XHJcblxyXG4gIFx0JCh0aGlzKS50b2dnbGVDbGFzcyhsaW5rX19hY3RpdmUpOyAvLyDQuNC30LzQtdC90Y/QtdC8INC90LAg0LDQutGC0LjQstC90L7QtSDRgdC+0YHRgtC+0Y/QvdC40LVcclxuXHJcbiAgXHQvLyDQldGB0LvQuCDQutC90L7Qv9C60LAg0LDQutGC0LjQstC90LAg0YLQvlxyXG4gIFx0aWYobGluay5oYXNDbGFzcyhsaW5rX19hY3RpdmUpKSB7XHJcbiAgXHRcdGJnLmNzcygnZGlzcGxheScsICdibG9jaycpLmFkZENsYXNzKGFuaW1hdGUpOyAvLyDQvtGC0L7QsdGA0LDQt9C40YLRjCDQvNC10L3Rjiwg0Lgg0LTQvtCx0LDQstC40YLRjCDQutC70LDRgdGBINCw0L3QuNC80LDRhtC40LhcclxuICBcdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gIFx0XHRcdHNvY2lhbC5jc3MoJ29wYWNpdHknLCAnMCcpOyAvLyDRh9C10YDQtdC3IDIwMCDQvNC40LvQuNGB0LXQutGD0L3QtCDRgdC60YDRi9GC0Ywg0LjQutC+0L3QutC4XHJcbiAgXHRcdH0sMjAwKTtcclxuICBcdH0gZWxzZSB7IC8vINCV0YHQu9C4INC60L3QvtC/0LrQsCDQvdC1INCw0LrRgtC40LLQvdCwXHJcbiAgXHRcdGJnLmNzcygnZGlzcGxheScsICdub25lJykucmVtb3ZlQ2xhc3MoYW5pbWF0ZSk7IC8vINGB0LrRgNGL0YLRjCDQvNC10L3Rjiwg0YPQtNCw0LvQuNGC0Ywg0LrQu9Cw0YHRgSDQsNC90LjQvNCw0YbQuNC4XHJcbiAgXHRcdHNvY2lhbC5jc3MoJ29wYWNpdHknLCAnMScpIC8vINC+0YLQvtCx0YDQsNC30LjRgtGMINC40LrQvtC90LrQuFxyXG4gIFx0fVxyXG5cclxuICBcdC8vINGH0LXRgNC10LcgNzAwINC80LjQu9C40YHQtdC60YPQvdC0INC+0YLQvtCx0YDQsNC20LDRgtGMINGB0L/QuNGB0L7QuiDQvNC10L3RjlxyXG4gIFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gIFx0XHRsaXN0LnNsaWRlVG9nZ2xlKCk7XHJcbiAgXHR9LDcwMCk7XHJcblxyXG4gIH0pO1xyXG5cclxuICB2YXIgcGFyYWxsYXggPSAoZnVuY3Rpb24gKCkge1xyXG4gIHZhciBiZyA9ICQoJy53ZWxjb21lX19iZ19faW1nJyk7XHJcbiAgdmFyIHVzZXIgPSAkKCcudXNlci1ibG9jaycpO1xyXG4gIHZhciBzdmdQb3J0Zm9saW8gPSAkKCcuc3ZnLWJnX19wb3J0Zm9saW9faGVhZGVyJyk7XHJcbiAgdmFyIHN2Z0Jsb2cgPSAkKCcuc3ZnLWJnX19ibG9nX2hlYWRlcicpO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgbW92ZTogZnVuY3Rpb24oYmxvY2ssIHdpbmRvd1Njcm9sbCwgc3RyYWZlQW1vdW50KSB7XHJcbiAgICAgIHZhciBzdHJhZmUgPSB3aW5kb3dTY3JvbGwgLyAtc3RyYWZlQW1vdW50ICsgJyUnO1xyXG4gICAgICB2YXIgdHJhbnNmb3JtU3RyaW5nID0gJ3RyYW5zbGF0ZTNkKDAsJyArIHN0cmFmZSArICcsMCknO1xyXG4gICAgICBcclxuICAgICAgYmxvY2suY3NzLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcclxuXHJcbiAgICAgIGNvbnNvbGUubG9nKGJsb2NrLmNzcy50cmFuc2Zvcm0pO1xyXG4gICAgfSxcclxuICAgIGluaXQ6IGZ1bmN0aW9uICh3U2Nyb2xsKSB7XHJcbiAgICAgIHRoaXMubW92ZShiZywgd1Njcm9sbCwgNDUpO1xyXG4gICAgICB0aGlzLm1vdmUoc3ZnUG9ydGZvbGlvLCB3U2Nyb2xsLCAxNSk7XHJcbiAgICAgIHRoaXMubW92ZShzdmdCbG9nLCB3U2Nyb2xsLCAxNSk7XHJcbiAgICAgIHRoaXMubW92ZSh1c2VyLCB3U2Nyb2xsLCAyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG59KCkpO1xyXG5cclxud2luZG93Lm9uc2Nyb2xsID0gZnVuY3Rpb24gKCkge1xyXG4gIHZhciB3U2Nyb2xsID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xyXG5cclxuICBwYXJhbGxheC5pbml0KHdTY3JvbGwpO1xyXG59XHJcbn0pKCk7IiwidmFyIHBhcmFsbGF4ID0gKGZ1bmN0aW9uICgpIHtcclxuXHR2YXIgYmcgPSAkKCcud2VsY29tZV9fYmdfX2ltZycpO1xyXG5cdHZhciB1c2VyID0gJCgnLnVzZXItYmxvY2snKTtcclxuXHR2YXIgc3ZnUG9ydGZvbGlvID0gJCgnLnN2Zy1iZ19fcG9ydGZvbGlvX2hlYWRlcicpO1xyXG5cdHZhciBzdmdCbG9nID0gJCgnLnN2Zy1iZ19fYmxvZ19oZWFkZXInKTtcclxuXHJcblx0cmV0dXJuIHtcclxuXHRcdG1vdmU6IGZ1bmN0aW9uKGJsb2NrLCB3aW5kb3dTY3JvbGwsIHN0cmFmZUFtb3VudCkge1xyXG5cdFx0XHR2YXIgc3RyYWZlID0gd2luZG93U2Nyb2xsIC8gLXN0cmFmZUFtb3VudCArICclJztcclxuXHRcdFx0dmFyIHRyYW5zZm9ybVN0cmluZyA9ICd0cmFuc2xhdGUzZCgwLCcgKyBzdHJhZmUgKyAnLDApJztcclxuXHRcdFx0XHJcblx0XHRcdHZhciBzdHlsZSA9IGJsb2NrLnN0eWxlO1xyXG5cclxuXHRcdFx0c3R5bGUudHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nO1xyXG5cdFx0fSxcclxuXHRcdGluaXQ6IGZ1bmN0aW9uICh3U2Nyb2xsKSB7XHJcblx0XHRcdHRoaXMubW92ZShiZywgd1Njcm9sbCwgNDUpO1xyXG5cdFx0XHR0aGlzLm1vdmUoc3ZnUG9ydGZvbGlvLCB3U2Nyb2xsLCAxNSk7XHJcblx0XHRcdHRoaXMubW92ZShzdmdCbG9nLCB3U2Nyb2xsLCAxNSk7XHJcblx0XHRcdHRoaXMubW92ZSh1c2VyLCB3U2Nyb2xsLCAyKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG59KCkpO1xyXG5cclxud2luZG93Lm9uc2Nyb2xsID0gZnVuY3Rpb24gKCkge1xyXG5cdHZhciB3U2Nyb2xsID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xyXG5cclxuXHRwYXJhbGxheC5pbml0KHdTY3JvbGwpO1xyXG59Il19
