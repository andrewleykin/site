// стили для параллакс эффекта, на фоне гор

$(function(){
	const parallax = (function () {
		var img = document.querySelector('.welcome__bg__img');
		var svgPortfolio = document.querySelector('.svg-bg__portfolio_header');
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
				this.move(user, wScroll, 10);
				this.move(svgPortfolio, wScroll, 25);
				this.move(svgBlog, wScroll, 20);
			}
		}

	}());
	
	window.onscroll = function () {
		var wScroll = window.pageYOffset;

		parallax.init(wScroll);
	}
})

