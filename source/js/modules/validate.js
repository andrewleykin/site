// js файл для валидации форм


(function( $ ){

	var form = $('.js__form');

	var formPromise = new Promise (function(resolve, reject) {
		if (form.length) {
				resolve();
			} else {
				reject();
			}
	});

	formPrmise.then(function(){
		$(function(){
			validFunc();
		});
	}).catch(function(){
		return ;
	});



	var validFunc = function(){

		var btn = form.find('.js__form-btn'),
			input = $('.js__input'),
			iconUser = $('.js__form-icon--user'),
			iconPass = $('.js__form-icon--pass'),
			email = form.find('.js__form-email');


	};


})( jQuery );