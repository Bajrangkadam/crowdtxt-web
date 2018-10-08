new WOW().init();

var whereYouWantYourButtonToAppear = 200;

	$(window).scroll(function(){

		var position = $(window).scrollTop();

			if(position > whereYouWantYourButtonToAppear)
			{
				$('#backToTop').fadeIn();
			}
			else
			{
				$('#backToTop').fadeOut();
			}
	});

	$('#backToTop').on('click', function(){
		$(window).scrollTop(0);
		$(this).fadeOut();
	});
smoothScroll.init({
	speed: 1000,
	easing: 'easeInOutCubic',
	offset: 0,
	updateURL: true,
	callbackBefore: function ( toggle, anchor ) {},
	callbackAfter: function ( toggle, anchor ) {}
});

/*single page nav*/
$('.single-page-nav').singlePageNav({
	offset: $('.single-page-nav').outerHeight(),
	threshold: 200,
	speed: 1000,
	currentClass: 'current',
	easing: 'swing',
	filter: ':not(.external)',
	updateHash: true,
	// up<a href="http://www.jqueryscript.net/time-clock/">date</a>Hash: true,
	beforeStart: function() {
        console.log('begin scrolling');
	},
	onComplete: function() {
        console.log('done scrolling');
	}
});