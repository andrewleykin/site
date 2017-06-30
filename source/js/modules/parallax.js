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

