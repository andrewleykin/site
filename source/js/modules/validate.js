// js файл для валидации форм


(function( $ ){

$(function(){

	var form = $('.js__form'),
		input = form.find('.js__input'),
		btn = form.find('.js__form-btn'),
		icon = form.find('.js__form-icon');

	var validFunc = function () {

		var valid = true;

		input.each(function(i) {
			if($(this).val() != '') {
				$(this).css('border', '2px solid #009688');
				icon.eq(i).css('color', '#009688');
				btn.addClass('js__form-no-submit');
				valid = false;
			} else {
				$(this).css('border', '2px solid #e44845');
				icon.eq(i).css('color', '#e44845');
				btn.removeClass('js__form-no-submit');

				valid = true;
			}
		});

		return valid;

}

	input.each(function(i) {
		$(this).blur(function() {

			if($(this).val() != '') {
				$(this).css('border', '2px solid #009688');
				icon.eq(i).css('color', '#009688');
			} else {
				$(this).css('border', '2px solid #e44845');
				icon.eq(i).css('color', '#e44845');
				btn.removeClass('js__form-no-submit');
			}

		});
	});


	btn.click(function(e) {
		e.preventDefault();
		validFunc();
		if($(this).hasClass('js__form-no-submit')) {
			return false;
		} else {
			form.submit();
		}
	});

});

})( jQuery );








/*
(function( $ ){

$(function() {

  $('.js__form').each(function(){
    // Объявляем переменные (форма и кнопка отправки)
	var form = $(this),
        btn = form.find('.js__form-btn'),
        icon = form.find('.js__form-icon');

    // Добавляем каждому проверяемому полю, указание что поле пустое
	form.find('.js__input').addClass('empty_field');
	icon.addClass('empty_icon');

    // Функция проверки полей формы
    function checkInput(){
      form.find('.js__input').each(function(i){
        if($(this).val() != ''){
          // Если поле не пустое удаляем класс-указание
		$(this).removeClass('empty_field').css('border', '2px solid green');
		icon.eq(i).removeClass('empty_icon').css('color', 'green');
        } else {
          // Если поле пустое добавляем класс-указание
		$(this).addClass('empty_field');
		icon.eq(i).addClass('empty_icon');
        }
      });
    }

    // Функция подсветки незаполненных полей
    function lightEmpty(){
      form.find('.empty_field').css('border','2px solid red');
      form.find('.empty_icon').css('color', 'red');

      // // Через полсекунды удаляем подсветку
      // setTimeout(function(){
      //   form.find('.empty_field').removeAttr('style');
      //   form.find('.empty_icon').removeAttr('style');
      // },700);

    }

    // Проверка в режиме реального времени
    setInterval(function(){
      // Запускаем функцию проверки полей на заполненность
	  checkInput();
      // Считаем к-во незаполненных полей
      var sizeEmpty = form.find('.empty_field').length;
      // Вешаем условие-тригер на кнопку отправки формы
      if(sizeEmpty > 0){
        if(btn.hasClass('btn__disabled')){
          return false
        } else {
          btn.addClass('btn__disabled')
        }
      } else {
        btn.removeClass('btn__disabled')
      }
    },500);

    // Событие клика по кнопке отправить
    btn.click(function(){
      if($(this).hasClass('btn__disabled')){
        // подсвечиваем незаполненные поля и форму не отправляем, если есть незаполненные поля
		lightEmpty();
        return false
      } else {
        // Все хорошо, все заполнено, отправляем форму
        form.submit();
      }
    });
  });
});

})( jQuery );

*/