(function(){
	var btn = $('.js__menu-button'),
		list = $('.js__menu-list'),
		otherContent = $('.container'),
		flag = 0;

	otherContent.click(function() {
		if (flag == 1) {
			list.slideUp(400);
			btn.removeClass('menu__burger--active');
			flag = 0;
		}
	});

	btn.click(function() {
		if (flag == 0) {
			list.stop(true,true).slideToggle(400);
			btn.toggleClass('menu__burger--active');
			setTimeout(function () {
				flag = 1;
			},100);
		}
	});

	$('body').keyup(function(e) {
		if(e.which == 27) {
			list.stop(true, true).slideUp(400);
			btn.removeClass('menu__burger--active');
			flag = true;
		}
	});

})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lbnUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe1xyXG5cdHZhciBidG4gPSAkKCcuanNfX21lbnUtYnV0dG9uJyksXHJcblx0XHRsaXN0ID0gJCgnLmpzX19tZW51LWxpc3QnKSxcclxuXHRcdG90aGVyQ29udGVudCA9ICQoJy5jb250YWluZXInKSxcclxuXHRcdGZsYWcgPSAwO1xyXG5cclxuXHRvdGhlckNvbnRlbnQuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHRpZiAoZmxhZyA9PSAxKSB7XHJcblx0XHRcdGxpc3Quc2xpZGVVcCg0MDApO1xyXG5cdFx0XHRidG4ucmVtb3ZlQ2xhc3MoJ21lbnVfX2J1cmdlci0tYWN0aXZlJyk7XHJcblx0XHRcdGZsYWcgPSAwO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHRidG4uY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHRpZiAoZmxhZyA9PSAwKSB7XHJcblx0XHRcdGxpc3Quc3RvcCh0cnVlLHRydWUpLnNsaWRlVG9nZ2xlKDQwMCk7XHJcblx0XHRcdGJ0bi50b2dnbGVDbGFzcygnbWVudV9fYnVyZ2VyLS1hY3RpdmUnKTtcclxuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0ZmxhZyA9IDE7XHJcblx0XHRcdH0sMTAwKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0JCgnYm9keScpLmtleXVwKGZ1bmN0aW9uKGUpIHtcclxuXHRcdGlmKGUud2hpY2ggPT0gMjcpIHtcclxuXHRcdFx0bGlzdC5zdG9wKHRydWUsIHRydWUpLnNsaWRlVXAoNDAwKTtcclxuXHRcdFx0YnRuLnJlbW92ZUNsYXNzKCdtZW51X19idXJnZXItLWFjdGl2ZScpO1xyXG5cdFx0XHRmbGFnID0gdHJ1ZTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcbn0pKCk7Il19
