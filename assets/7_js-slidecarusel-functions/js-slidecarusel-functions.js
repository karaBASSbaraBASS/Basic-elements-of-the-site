var slider = (function(){

	//private переменные и функции

	return {
		// события и то что нужно по задачам
		init: function (){
			var
				_this = this;

				// создаем точки для каждого слада
				_this.createDots();

				$('.slider__controls-button').on('click', function(event) {
					event.preventDefault();
					
					var
						$this = $(this),
						slides = $this.closest('.slider').find('.slider__item'),
						activeSlide = slides.filter('.active'),
						nextSlide = activeSlide.next(),
						prevSlide = activeSlide.prev(),
						firstSlide = slides.first(),
						lastSlide = slides.last();

					if ($this.hasClass('slider__controls-button_next')) {
						
						if (nextSlide.length) {
							_this.moveSlide(nextSlide, 'forward');
						} else {
							_this.moveSlide(firstSlide, 'forward');
						}

					} else {
						
						if (prevSlide.length) {
							_this.moveSlide(prevSlide, 'backward');
						} else {
							_this.moveSlide(lastSlide, 'backward');
						}

					}
				});
		},

		moveSlide: function(slide, direction) {
			var
				_this = this,
				container = slide.closest('.slider'),
				slides = container.find('.slider__item'),
				activeSlide = slides.filter('active'),
				slideWidth = slides.width(),
				duration = 500,
				reqCssPosition = 0,
				reqSlideStrafe = 0;

			if (direction === 'forward') {
				reqCssPosition = slideWidth;
				reqSlideStrafe = -slideWidth;
			} else if (direction === 'backward') {
				reqCssPosition = -slideWidth;
				reqSlideStrafe = slideWidth;
			}

			slide.css('left', reqCssPosition).addClass('inslide');
			
			var moveableSlide = slides.filter('.inslide');
			
			activeSlide.animate({left: reqSlideStrafe}, duration);
			
			moveableSlide.animate({left: 0}, duration, function(){
				var $this = $(this);
				slides.css('left', '0').removeClass('active');
				$this.toggleClass('inslide active');

			//_this.setActiveDot(container.find('.slider__dots'));

			});

		},

		createDots: function() {
			var
				_this = this,
				container = $('.slider');
			var 
				dotMarkup = '<li class="slider__dots-item"> \
								<a href="#" class="slider__dots-link"></a> \
							</li>';

			container.each(function(){
				var
					$this = $(this),
					slides = $this.find('.slider__item'),
					dotContainer = $this.find('.slider__dots'); 

				for (var i = 0; i < slides.length; i++) {
					dotContainer.append(dotMarkup);

				}
				// передадим метод активных точек в каждую созданную точку
				_this.setActiveDot(dotContainer); 

			});
		},

		setActiveDot: function(container){
			var	
				slides = container.closest('.slider__list--wrap').find('slider__item');

			container
				.find('.slider__dots-item')
				.eq(slides.filter('.active').index())
				.addClass('active')
				.siblings()
				.removeClass('active');
		}

	}
}());

$(document).ready(function() {
	if ($('.slider').length) {
		slider.init();
	}
}); // вызываем написанный ранее модуль