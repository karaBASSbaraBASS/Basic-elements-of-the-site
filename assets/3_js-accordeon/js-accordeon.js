$(document).ready(function() {
	$('.js-accordeon__trigger').on('click', function(event) {
		event.preventDefault();
		
		var $this = $(this), //сохраняем в переменные все с чем будем работать
		    item = $this.closest('.accordeon__item'),
		    list = $this.closest('.accordeon__list'), //весь наш список
		    items = list.find('.accordeon__item'), // все ли вехнего уровня
			content = item.find('.accordeon__inner'),// весь внутренний список который будет открыватся
			otherContent = list.find('.accordeon__inner'), // все ли с контентом
			duration = 300; // время за которое пройдет анимация
		
		if (!item.hasClass('active')){   //если у конкретного ли нет активного класса
			items.removeClass('active'); //удалить активные классы у других ли
			item.addClass('active');     //и присвоить актив этому конкретному ли
			otherContent.stop(true, true).slideUp(duration); //свернуть все ли с контентом
			content.stop(true, true).slideDown(duration); //развернуть тот у кого активный класс
		} else {
			content.stop(true, true).slideUp(duration); //свернуть все ли с контентом
			items.removeClass('active');                //убрать активный класс у текущего ли
		}                                               //stop(true, true) - очищает очередь анимации, чтобы не зацыкливалась
	
	});		
});