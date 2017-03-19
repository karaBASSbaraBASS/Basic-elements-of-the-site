var slider = (function(){

	//private переменные и функции

	var flag = true,
		timerDuration = 3000,
		timer = 0;

	return {
		// события и то что нужно по задачам
		init: function (){
			var
				_this = this;

				// создаем точки для каждого слайда
				_this.createDots();

				// включим автопереключение
				_this.autoSwitch();

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

					_this.clearTimer();

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

				// Клик по точкам
				$('.slider__dots-link').on('click', function(event) {
					event.preventDefault();
					/* Act on the event */
					var
						$this = $(this),
						dots = $this.closest('.slider__dots').find('.slider__dots-item'),
						activeDot = dots.filter('.active'),
						dot = $this.closest('.slider__dots-item'),
						curDotNum = dot.index(),
						direction = (activeDot.index() < curDotNum) ? 'forward' : 'backward';
						reqSlide = $this.closest('.slider').find('.slider__item').eq(curDotNum);

					if (!dot.hasClass('active')) {
						_this.clearTimer();
						_this.moveSlide(reqSlide, direction);
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

			if (flag) {

				flag = false;

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

					_this.setActiveDot(container.find('.slider__dots'));

					flag = true;

				});
			}	

			

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
		},

		autoSwitch: function(){
			var
				_this = this;

			timer = setInterval(function(){
				var
					slides = $('.slider__list .slider__item'),
					activeSlide = slides.filter('.active'),
					nextSlide = activeSlide.next(),
					firstSlide = slides.first();

				if (nextSlide.length) {
					_this.moveSlide(nextSlide, 'forward');
				} else {
					_this.moveSlide(firstSlide, 'forward');
				}	

			}, timerDuration);
		},

		clearTimer: function(){
			if (timer) {
				clearInterval(timer);
				this.autoSwitch();
			}
		}

	}
}());

$(document).ready(function() {
	if ($('.slider').length) {
		slider.init();
	}
}); // вызываем написанный ранее модуль