// js для меню

(function() {
  'use strict';

  var link = $('.header__menu'),
      link__active= 'header__menu__active',
      list = $('.main-menu__list'),
      bg = $('.main-menu');

  link.click(function(e) {
  	e.preventDefault();

  	var $this = $(this);

  	$this.toggleClass(link__active);


  	if(link.hasClass(link__active)) {
  		bg.css('display', 'block');
  	} else {
  		bg.css('display', 'none');
  	}

  	bg.toggleClass('main-menu__animate');

  	setTimeout(function(){
  		list.slideToggle();
  	},600);

  });
})();