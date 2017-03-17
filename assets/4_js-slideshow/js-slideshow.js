$(document).ready(function() {
	$('.js-slideshow__triger').on('click', function(event) {
		event.preventDefault();
		
		var
			$this = $(this),
			item = $this.closest('.slideshow__item'),
			container = $this.closest('.slideshow'),
			display = container.find('.slideshow__display'),
			path = item.find('img').attr('src'),
			duration = 300;

		if (!item.hasClass('active')) {
			item.addClass('active').siblings().removeClass('active'); // добавим актив класс и удалим его у тех кто рядом

			display.find('img').fadeOut(duration, function() {   // закрываем картинку slideshow__display и запускаем последовательно функцию
				$(this).attr('src', path).fadeIn(duration);	     // меняем атрибут пути slideshow__display на путь картинки, на которую нажали
			});
		};
	});
});