// js файл для валидации форм


(function( $ ){


	$(function(){

		// задаем переменные
		var form       = $('.js__form'),
				input      = form.find('.js__input'),
				btn        = form.find('.js__form-btn'),
				btnReset   = form.find('.js__form-btn--reset'),
				icon       = form.find('.js__form-icon'),
				check      = form.find('.js__check'),
				email      = form.find('.js__form-email'),
				pattern    = /^[a-z0-9_-]+@[a-z0-9-]+\.[a-z]{2,6}$/i,
				valid      = true;

		// функция валидация формы
		var validFunc = function () {

			// проверяем каждый input
			input.each(function(i) {

				// проверяем условие, есть ли в поле что-нидь
				if($(this).val() != '') {
					$(this).css('border', '2px solid #009688'); 
					icon.eq(i).css('color', '#009688');
					btn.removeClass('js__form-no-submit');
				} else {
					$(this).css('border', '2px solid #e44845');
					icon.eq(i).css('color', '#e44845');
					btn.addClass('js__form-no-submit');
				}

			}); // --> заканчиваем проверять инпуты


			// условия наличия чек-инпутов
			if(check) {

				// проверяем каждый чек-инпут
				check.each(function() {

					// проверяем условие, выбран ли инпут
					if($(this).prop("checked")){
						valid = true;
					} else {
						valid = false;
					}
					return valid;
				});

				return valid;
			}


			return valid;
		} // --> validFunc is end


		// функция для проверки email
		var emailFunc= function () {

			// проверяем условие, есть ли что-нидь в нём
			if (email.val() != '') {

					// проверяем, соответствует ли шаблону email
					if(email.val().search(pattern) == 0){
						email.css('border', '2px solid #009688');
						valid = true;
					} else {
						email.css('border', '2px solid #e44845');
						valid = false;
					}
				} else {
					email.css('border', '2px solid #e44845');
					valid = false
				}


			return valid;
		} // --> emailFunc is end


		// функция для email, когда покидашь инпут
		email.blur(function() {

			// проверяем email, на наличие чего-нидь
			if (email.val() != '') {

				// соответствует ли нашему шаблону
				if(email.val().search(pattern) == 0){
					email.css('border', '2px solid #009688');
					valid = true;
				} else {
					email.css('border', '2px solid #e44845');
					valid = false
				}
			} else {
				email.css('border', '2px solid #e44845');
				valid = false
			}

		});


		// проверяем каждый инпут
		input.each(function(i) {

			// для каждого инпута при покидании поля
			$(this).blur(function() {

				// проверяем наличие чего-либо
				if($(this).val() != '') {
					$(this).css('border', '2px solid #009688');
					icon.eq(i).css('color', '#009688');
					btn.removeClass('js__form-no-submit')
				} else {
					$(this).css('border', '2px solid #e44845');
					icon.eq(i).css('color', '#e44845');
					btn.addClass('js__form-no-submit');
				}
			});

		});


		// при клике на кнопку отправки
		btn.click(function(e) {

			e.preventDefault();
			validFunc();

			// если есть email
			if(email) {
				emailFunc();
			}

			// проверять условие есть ли класс
			if(btn.hasClass('js__form-no-submit')) {
				return false;
			} else {
				form.submit();
			}

		});


		// при клике на кнопку "очистить"
		btnReset.click(function() {
			input.add(email).removeAttr('style');
		});


	}); // --> ready end

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