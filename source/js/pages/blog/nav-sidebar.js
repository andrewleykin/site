// js для навигации на странице Блог

(function() {

	var link = $('.sidebar__link');
	$(function(){

		var navSidebarPromise = new Promise (function(resolve, reject) {
			if (link.length) {
				resolve();
			} else {
				reject();
			}
		});

		navSidebarPromise.then(function() {
			link.click(function(e) {
				e.preventDefault();

				showArticle($(this).attr('href'), true);
			});
		}).catch(function(){
			console.log('sidebar__link нету на странице');
		});


	});

	$(window).scroll(function() {
		checkArticle();
	});


	function showArticle(article, isAnimate) {
		var direction = article.replace(/#/, ''),
			reqArticle = $('.write__item').filter('[data-article="' + direction + '"]'),
			reqArticlePos = reqArticle.offset().top;

		if (isAnimate) {
			$('body, html').animate({scrollTop: reqArticlePos}, 500);
		} else {
			$('body, html').scrollTop(reqArticlePos);
		}
	}


	function checkArticle() {
		$('.write__item').each(function() {
			var $this = $(this),
				topEdge = $this.offset().top - 150,
				bottomEdge = topEdge + $this.height(),
				wScroll = $(window).scrollTop();

			if (topEdge < wScroll && bottomEdge > wScroll) {
				var currentId = $this.data('article'),
					reqLink = link.filter('[href="#' + currentId + '"]');

					link.removeClass('sidebar__link--active');
					reqLink.addClass('sidebar__link--active');

			}
		});
	}


})(); 