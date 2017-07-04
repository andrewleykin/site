// Flip эффект

$(function(){
	var link = $('.btn-autho__link'),
		box = $('.flip'),
		mainLink = $('.login__link'); 

	link.click(function(e) {
		e.preventDefault(); // отмена стандартных дейсвтйи

		box.toggleClass('js__flip');
	});
	mainLink.click(function(e) {
		e.preventDefault(); // отмена стандартных дейсвтйи

		box.removeClass('js__flip');
	});
});