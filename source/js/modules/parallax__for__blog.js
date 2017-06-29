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
