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