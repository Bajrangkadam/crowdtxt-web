
//---- Side Nav ----//

(function($){
  $(function(){

    $(".button-collapse").sideNav();
    $('.parallax').parallax();
	$('.button-collapse').sideNav({menuWidth: 240, edge:'left', closeOnClick: true});
	// Show sideNav
	//$('.button-collapse').sideNav('show');
	// Hide sideNav
	$('.button-collapse').sideNav('hide');
	 

  }); // end of document ready
})(jQuery); // end of jQuery name space

$(document).ready(function(){
    $('.collapsible').collapsible({
      accordion : true // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
  });
      



if ($('#back-to-top').length) {
    var scrollTrigger = 100, // px
        backToTop = function () {
            var scrollTop = $(window).scrollTop();
            if (scrollTop > scrollTrigger) {
                $('#back-to-top').addClass('show');
            } else {
                $('#back-to-top').removeClass('show');
            }
        };
    backToTop();
    $(window).on('scroll', function () {
        backToTop();
    });
    $('#back-to-top').on('click', function (e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: 0
        }, 1200);
    });
}