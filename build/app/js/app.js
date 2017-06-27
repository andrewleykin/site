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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lbnUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBqcyDQtNC70Y8g0LzQtdC90Y5cclxuXHJcbihmdW5jdGlvbigpIHtcclxuICAndXNlIHN0cmljdCc7XHJcblxyXG4gIHZhciBsaW5rID0gJCgnLmhlYWRlcl9fbWVudScpLFxyXG4gICAgICBsaW5rX19hY3RpdmU9ICdoZWFkZXJfX21lbnVfX2FjdGl2ZScsXHJcbiAgICAgIGxpc3QgPSAkKCcubWFpbi1tZW51X19saXN0JyksXHJcbiAgICAgIGJnID0gJCgnLm1haW4tbWVudScpO1xyXG5cclxuICBsaW5rLmNsaWNrKGZ1bmN0aW9uKGUpIHtcclxuICBcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgXHR2YXIgJHRoaXMgPSAkKHRoaXMpO1xyXG5cclxuICBcdCR0aGlzLnRvZ2dsZUNsYXNzKGxpbmtfX2FjdGl2ZSk7XHJcblxyXG5cclxuICBcdGlmKGxpbmsuaGFzQ2xhc3MobGlua19fYWN0aXZlKSkge1xyXG4gIFx0XHRiZy5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuICBcdH0gZWxzZSB7XHJcbiAgXHRcdGJnLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgXHR9XHJcblxyXG4gIFx0YmcudG9nZ2xlQ2xhc3MoJ21haW4tbWVudV9fYW5pbWF0ZScpO1xyXG5cclxuICBcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICBcdFx0bGlzdC5zbGlkZVRvZ2dsZSgpO1xyXG4gIFx0fSw2MDApO1xyXG5cclxuICB9KTtcclxufSkoKTsiXX0=
