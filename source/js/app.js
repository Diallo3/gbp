$(document).ready(function(){
	
	// Initialize foundation
	$(document).foundation({
		offcanvas : {
			open_method: 'overlap',
			close_on_click: true
		},
		orbit : {
			timer_speed: 2000,
			resume_on_mouseout: true,
			slide_number: false,
			bullets: false
		}
	});

	// header
	$(window).scroll(function() {
		if ($(this).scrollTop() > 1){  
		    $('.header_container').addClass("fixed");
		  }
		  else{
		    $('.header_container').removeClass("fixed");
		  }
	});

	// smooth scroll
	$('.scroll_btn[href*=#]:not([href=#])').click(function() {
	    if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
	      	var target = $(this.hash);
	      	target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	      	if (target.length) {
	        $('html,body').animate({
	          scrollTop: target.offset().top
	        }, 800);
	        return false;
	      }
	    }
	});

	// Viewpoint
	$('.block').viewportChecker({
	    classToAdd: 'active_block', // Class to add to the elements when they are visible
	    // offset: [100 OR 10%], // The offset of the elements (let them appear earlier or later). This can also be percentage based by adding a '%' at the end
	    // invertBottomOffset: true, // Add the offset as a negative number to the element's bottom
	    repeat: true, // Add the possibility to remove the class if the elements are not visible
	    scrollHorizontal: false // Set to true if your website scrolls horizontal instead of vertical.
	});

	// Hamburger
	var toggles = document.querySelectorAll(".c-hamburger");

    for (var i = toggles.length - 1; i >= 0; i--) {
      var toggle = toggles[i];
      toggleHandler(toggle);
    };

    function toggleHandler(toggle) {
      toggle.addEventListener( "click", function(e) {
        e.preventDefault();
        (this.classList.contains("is-active") === true) ? this.classList.remove("is-active") : this.classList.add("is-active");
      });
    }

});