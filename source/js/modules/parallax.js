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