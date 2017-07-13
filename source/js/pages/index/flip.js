// Flip эффект

$(function(){

	// задаём переменные
	var link = $('.btn-autho__link'),
		box = $('.flip'),
		mainLink = $('.login__link'); 

	// промис который будет проверять наличие флип котейнера на странице
	var flipPromise = new Promise (function(resolve, reject) {
			if (box.length) {
				resolve();
			} else {
				reject();
			}
		});

	// функция при наличии флип контейнере
	flipPromise.then(function() {

		// при клике, флип контенейру добавить класс с поворотом
		link.click(function(e) {
			e.preventDefault(); // отмена стандартных дейсвтйи

			link.css('opacity', '0');
			box.toggleClass('js__flip');
		});

		// при клике  на "На главную", удалить класс поворота, тем самым развернув контейнер
		mainLink.click(function(e) {
			e.preventDefault(); // отмена стандартных дейсвтйи

			link.css('opacity', '1');
			box.removeClass('js__flip');
		});

		// разворачивать блок при нажатии на Esc
		$('body').keyup(function(e) {
			if(box.hasClass('js__flip')) {
				if(e.which==27) {
					link.css('opacity', '1');
					box.removeClass('js__flip');
				}
			}
		});

		// при клике на область вокруг блока, разворачивать блок
		$('.parallax').click(function() {
			if(box.hasClass('js__flip')) {
				link.css('opacity', '1');
				box.removeClass('js__flip');
			}
		});
	}).catch(function(){
			return ;
		});

});