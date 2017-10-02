$(document).ready(function() {

	wow = new WOW(
		{
		  mobile: false
		}
	)
	wow.init();

	// показ/скрытие меню 
    $('.toogle').on('click', function() {
        $(".header-menu").toggleClass("active");
        $(this).toggleClass('click');
        return false;
    });

	//слайдер в начале страницы
	$('.slider-1').slick({
		dots: true,
		speed: 500,
		fade: true,
		autoplay: false,
		arrows: false,
		cssEase: 'linear',
		slidesToShow: 1,
        slidesToScroll: 1
	});

	//слайдер в блоке Услуги, Партнеры
	$('.slider-service, .slider-partners, .slider-sales, .slider-news, .slider-design').slick({
		dots: false,
		speed: 500,
		fade: true,
		arrows: true,
		autoplay: false,
		cssEase: 'linear',
		slidesToShow: 1,
        slidesToScroll: 1
	});

	//слайдер в блоке Поставщики
	$('.slider-suppliers').slick({
		dots: true,
		speed: 500,
		fade: false,
		arrows: false,
		autoplay: false,
		rows: 2,
		cssEase: 'linear',
		slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
	    {
	      breakpoint: 768,
	      settings: {
	      	arrows: true,
	      	dots: false,
	        slidesToShow: 2,
        	slidesToScroll: 2
	      }
	    }]
	});

	//слайдер в блоке Отзывы
	$('.slider-reviews').slick({
		dots: true,
		speed: 500,
		fade: true,
		arrows: false,
		autoplay: false,
		cssEase: 'linear',
		slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
	    {
	      breakpoint: 768,
	      settings: {
	      	arrows: true,
	      	dots: false
	      }
	    }]
	});

	//слайдер в блоке Партнеры попап
	$('.slider-popap').slick({
		dots: true,
		speed: 500,
		fade: true,
		arrows: false,
		autoplay: false,
		cssEase: 'linear',
		slidesToShow: 1,
        slidesToScroll: 1
	});


	//плавный скрол по странице до якоря
	var lastId,
	    topMenu = $(".header-menu"),
	    topMenuHeight = topMenu.outerHeight()+15,
	    // Все элементы списка
	    menuItems = topMenu.find("a"),
	    // Якоря, соответствующие пункты меню
	    scrollItems = menuItems.map(function(){
	      var item = $($(this).attr("href"));
	      if (item.length) { return item; }
	    });

	// обработчик щелчка по пунктам меню
	menuItems.click(function(e){
	  var href = $(this).attr("href"),
	      offsetTop = href === "#" ? 0 : $(href).offset().top-60;
	  $('html, body').stop().animate({ 
	      scrollTop: offsetTop
	  }, 400);
	  e.preventDefault();
	  $(".header-menu").removeClass("active");
	  $('.toogle').removeClass('click');
	});

	// Bind to scroll
	$(window).scroll(function(){
	   // Get container scroll position
	   var fromTop = $(this).scrollTop()+topMenuHeight;
	   
	   // Get id of current scroll item
	   var cur = scrollItems.map(function(){
	     if ($(this).offset().top < fromTop)
	       return this;
	   });
	   // Get the id of the current element
	   cur = cur[cur.length-1];
	   var id = cur && cur.length ? cur[0].id : "";
	   
	   if (lastId !== id) {
	       lastId = id;
	       // Set/remove active class
	       menuItems
	         .parent().removeClass("active")
	         .end().filter("[href='#"+id+"']").parent().addClass("active");
	   }                   
	});


	// изменение header при скролинге
	if ($(window).width() <= 750 ) {
        $('.logo-mini').addClass('visible');
    }

	$(window).scroll(function()
	{
	    if ($(this).scrollTop() > 20)
	    {
	        $('.header-info, .header-menu, .logo').addClass('scroll');
	        if (!$('.logo-mini').hasClass('visible')) {
	        	$('.logo-mini').show(600);
	        }
	    }

	    if ($(this).scrollTop() < 20)
	    {
	        $('.header-info, .header-menu, .logo').removeClass('scroll');
	        if (!$('.logo-mini').hasClass('visible')) {
	        	$('.logo-mini').hide(600);
	        }
	    }
	});

	//переключение в блоке Преимущества
	 $('.advantages-item').on('click', function() {
	 	var itemId = $(this).data("item");
	 	$('.advantages-item').removeClass('active');
	 	$(this).addClass('active');
	 	$('.advantages-info-item').addClass('active').fadeOut(0);
	 	$('#' + itemId).fadeIn(400);
	 });

	 //переключение в блоке Сотрудники
	 $('.employees-item').on('click', function() {
	 	var itemId = $(this).data("item");
	 	$('.employees-item').removeClass('active');
	 	$(this).addClass('active');
	 	$('.employees-info').addClass('active').fadeOut(0);
	 	$('#' + itemId).fadeIn(400);
	 });

	// движение картинок при скролинге
	$(window).scroll(function(){
		var scrolled = $(window).scrollTop();
	    var h = $(window).height(); 
		var topService = $('.slider-service').offset().top;
		var topPartners = $('.slider-partners').offset().top;
		var topSales = $('.slider-sales').offset().top; 
		var topNews = $('.slider-news').offset().top; 
		var topDesign = $('.slider-design').offset().top; 

		if ($(window).width() > 750 ) { 

			if ( (topService - scrolled) <= h ) {
				$('.slider-service .slider-right img').css('left',((topService - h)*.2-(scrolled*.2))+'px');
			}
			if ( (topPartners - scrolled) <= h ) {
				$('.slider-partners .slider-left img').css('right',((topPartners - h)*.2-(scrolled*.2))+'px');
			}
			if ( (topSales - scrolled) <= h ) {
				$('.slider-sales .slider-left img').css('right',((topSales - h)*.2-(scrolled*.2))+'px');
			}
			if ( (topNews - scrolled) <= h ) {
				$('.slider-news .slider-right img').css('left',((topNews - h)*.2-(scrolled*.2))+'px');
			}
			if ( (topDesign - scrolled) <= h ) {
				$('.slider-design .slider-left img').css('right',((topDesign - h)*.2-(scrolled*.2))+'px');
			}
		}
	});

	//скрытие попапов
	$('.close-popap').on('click', function() {
	 	$('.popap-wrap').removeClass('active');
	});

	//показ попап с новостью
	$('.button-news').on('click', function() {
		var itemNews = $(this).data("news"); 
	 	$('.popap-wrap.news-popap').addClass('active');
	 	$('.popap-wrap.news-popap .popap-item').hide(0);
	 	$('#' + itemNews).show(0);
	});

	//показ попап с проектом партнера
	$('.button-partners').on('click', function() {
		var itemPartners = $(this).data("partners"); 
	 	$('.popap-wrap.partners-popap').addClass('active');
	 	$('.popap-wrap.partners-popap .popap-item').hide(0);
	 	$('#' + itemPartners).show(0);
	 	$(".slider-popap").slick('reinit');
	});

	//показ попап с новостью в мире дизайна
	$('.button-design').on('click', function() {
		var itemNews = $(this).data("design"); 
	 	$('.popap-wrap.design-popap').addClass('active');
	 	$('.popap-wrap.design-popap .popap-item').hide(0);
	 	$('#' + itemNews).show(0);
	});

	//показ попап с формой ОСТАВИТЬ ЗАЯВКУ
	$('.application').on('click', function() {
	 	$('.popap-wrap.application-popap').addClass('active');
	});

	//показ попап с формой ОСТАВИТЬ ОТЗЫВ
	$('.reviews-button').on('click', function() {
	 	$('.popap-wrap.reviews-popap').addClass('active');
	});

	//вывод имя файла при загрузке в форме Оставить отзыв
	$('#uploaded-file').on('change', function() {
		var file = document.getElementById('uploaded-file').value;
		file = file.replace(/\\/g, '/').split('/').pop();
		document.getElementById('file-name').innerHTML = 'Имя файла: ' + file;
	});

});