// js для параллакс эффекта, на фоне гор
'use sctrict';

$(function(){
	var parallax = (function () {
		var img = document.querySelector('.page-header__img');
		var svgText = document.querySelector('.js__header-text');
		var user = document.querySelector('.user-block__top');

		return {
			move: function(block, windowScroll, strafeAmount) {
				var strafe = windowScroll / -strafeAmount + '%';
				var transformString = 'translate3d(0,' + strafe + ',0)';

				block.style.transform = transformString;
			},
			init: function (wScroll) {
				this.move(img, wScroll, 45);
				this.move(svgText, wScroll, 30);
				this.move(user, wScroll, 10);
			}
		}

		
	}());
	window.onscroll = function () {
		var wScroll = window.pageYOffset;
		parallax.init(wScroll);
	}

})

