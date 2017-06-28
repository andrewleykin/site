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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lbnUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8ganMg0LTQu9GPINC80LXQvdGOXHJcblxyXG4oZnVuY3Rpb24oKSB7XHJcbiAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAvLyDQn9C10YDQtdC80LXQvdC90YvQtVxyXG4gIHZhciBsaW5rID0gJCgnLmhlYWRlcl9fbWVudScpLFxyXG4gICAgICBsaW5rX19hY3RpdmU9ICdoZWFkZXJfX21lbnVfX2FjdGl2ZScsXHJcbiAgICAgIGxpc3QgPSAkKCcubWFpbi1tZW51X19saXN0JyksXHJcbiAgICAgIGJnID0gJCgnLm1haW4tbWVudScpLFxyXG4gICAgICBzb2NpYWwgPSAkKCcuaGVhZGVyX19zb2NpYWwnKSxcclxuICAgICAgYW5pbWF0ZSA9ICdtYWluLW1lbnVfX2FuaW1hdGUnO1xyXG5cclxuICAvLyDQpNGD0L3QutGG0LjRjyDQv9GA0Lgg0L3QsNC20LDRgtC40Lgg0L3QsCDQvNC10L3Rji3RiNCw0LzQsdGD0YDQs9C10YBcclxuICBsaW5rLmNsaWNrKGZ1bmN0aW9uKGUpIHtcclxuICBcdGUucHJldmVudERlZmF1bHQoKTsgLy8g0L7RgtC80LXQvdCwINGB0YLQsNC90LTQsNGA0YLQvdGL0YUg0LTQtdC50YHQstGC0LnQuFxyXG5cclxuICBcdCQodGhpcykudG9nZ2xlQ2xhc3MobGlua19fYWN0aXZlKTsgLy8g0LjQt9C80LXQvdGP0LXQvCDQvdCwINCw0LrRgtC40LLQvdC+0LUg0YHQvtGB0YLQvtGP0L3QuNC1XHJcblxyXG4gIFx0Ly8g0JXRgdC70Lgg0LrQvdC+0L/QutCwINCw0LrRgtC40LLQvdCwINGC0L5cclxuICBcdGlmKGxpbmsuaGFzQ2xhc3MobGlua19fYWN0aXZlKSkge1xyXG4gIFx0XHRiZy5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKS5hZGRDbGFzcyhhbmltYXRlKTsgLy8g0L7RgtC+0LHRgNCw0LfQuNGC0Ywg0LzQtdC90Y4sINC4INC00L7QsdCw0LLQuNGC0Ywg0LrQu9Cw0YHRgSDQsNC90LjQvNCw0YbQuNC4XHJcbiAgXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICBcdFx0XHRzb2NpYWwuY3NzKCdvcGFjaXR5JywgJzAnKTsgLy8g0YfQtdGA0LXQtyAyMDAg0LzQuNC70LjRgdC10LrRg9C90LQg0YHQutGA0YvRgtGMINC40LrQvtC90LrQuFxyXG4gIFx0XHR9LDIwMCk7XHJcbiAgXHR9IGVsc2UgeyAvLyDQldGB0LvQuCDQutC90L7Qv9C60LAg0L3QtSDQsNC60YLQuNCy0L3QsFxyXG4gIFx0XHRiZy5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpLnJlbW92ZUNsYXNzKGFuaW1hdGUpOyAvLyDRgdC60YDRi9GC0Ywg0LzQtdC90Y4sINGD0LTQsNC70LjRgtGMINC60LvQsNGB0YEg0LDQvdC40LzQsNGG0LjQuFxyXG4gIFx0XHRzb2NpYWwuY3NzKCdvcGFjaXR5JywgJzEnKSAvLyDQvtGC0L7QsdGA0LDQt9C40YLRjCDQuNC60L7QvdC60LhcclxuICBcdH1cclxuXHJcbiAgXHQvLyDRh9C10YDQtdC3IDcwMCDQvNC40LvQuNGB0LXQutGD0L3QtCDQvtGC0L7QsdGA0LDQttCw0YLRjCDRgdC/0LjRgdC+0Log0LzQtdC90Y5cclxuICBcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICBcdFx0bGlzdC5zbGlkZVRvZ2dsZSgpO1xyXG4gIFx0fSw3MDApO1xyXG5cclxuICB9KTtcclxufSkoKTsiXX0=
