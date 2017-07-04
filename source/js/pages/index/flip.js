// Flip эффект

$(function(){
	var link = $('.btn-autho__link'),
		box = $('.flip'),
		mainLink = $('.login__link'); 


	var flipPromise = new Promise (function(resolve, reject) {
			if (link.length) {
				resolve();
			} else {
				reject();
			}
		});

	flipPromise.then(function() {
		link.click(function(e) {
			e.preventDefault(); // отмена стандартных дейсвтйи

			box.toggleClass('js__flip');
		});
		mainLink.click(function(e) {
			e.preventDefault(); // отмена стандартных дейсвтйи

			box.removeClass('js__flip');
		});
	}).catch(function(){
			console.log('btn-autho__link нету на странице');
		});

});