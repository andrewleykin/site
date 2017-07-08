// js файл для анимации появления flip


(function(){

	// переменные
	var flip = $('.flip'),
		flipAnimation = 'flip__animation';

	// при загрузке странице
	$(window).on('load',() =>{

		//с задержкой 1 сек
		setTimeout(()=>{

			// добавить класс с анимацией
			flip.addClass(flipAnimation);
		}, 1000);

	});


}());