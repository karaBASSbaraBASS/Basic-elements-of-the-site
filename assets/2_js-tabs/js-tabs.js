$(document).ready(function(){

	$('.tabs__control-link').on('click', function(e){
		e.preventDefault(); // запрет дефолтного действия элемента

		var item = $(this).closest('.tabs__controls-item'),
			contentItem = $('.tabs__item')
			itemPosition = item.data('class'); // покажет порядковый номер элемента в наборе	

			contentItem.filter('.js-tabs__item_' + itemPosition) // найдем номер позиции .eq
				.add(item)               // добавить паралельное выполнение поледующих команд для item
				.addClass('active')
				.siblings()              // всем остальнім
				.removeClass('active');  // удалить класс актив
					
	});

// пример переключения табов, когда табы и описания к ним идут по порядку

	/*$('.tabs__control-link').on('click', function(e){
		e.preventDefault(); // запрет дефолтного действия элемента

		var item = $(this).closest('.tabs__controls-item'),
			contentItem = $('.tabs__item')
			itemPosition = item.index(); // покажет порядковый номер элемента в наборе	
		// console.log(itemPosition); -- тест вывод номера кнопки в журнал браузера	

			contentItem.eq(itemPosition) // найдем номер позиции .eq
				.add(item)               // добавить паралельное выполнение поледующих команд для item
				.addClass('active')

				.siblings()              // всем остальнім
				.removeClass('active');  // удалить класс актив

			
	});*/

});