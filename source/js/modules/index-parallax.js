// js для index-parallax

$(function(){
	var parallaxContainer = $('.parallax'),
		layers = $('.parallax__layer');

		console.log(layers);

	var moveLayers = function (e) {
		var initialX = (window.innerWidth / 2) - e.pageX,
			initialY = (window.innerHeight / 2) - e.pageY;

		[].slice.call(layers).forEach(function(layer, index) {
			var divider = index / 100,
				positionX = initialX * divider,
				positionY = initialY * divider,
				bottomPosition = (window.innerHeight / 2) * divider,
				transformString = 'translate(' + positionX + 'px' + ' ' + positionY + 'px)',
				image = layer.firstElementChild;

			layer.style.transform = transformString;
			image.style.bottom = '-' + bottomPosition + 'px';
		});
	};

	window.addEventListener('mousemove', moveLayers);
});