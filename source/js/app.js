$(document).ready(function(){

    $("img, video").on("contextmenu",function(e){
       return false;
    });
	
	// Initialize foundation
	$(document).foundation({
		offcanvas : {
			open_method: 'overlap',
			close_on_click: true
		},
		orbit : {
			timer_speed: 4000,
			resume_on_mouseout: true,
			slide_number: true,
			bullets: false,
			stack_on_small: false
		}
	});

    // $('.slide_item').on('click', 'a', function(){
    //     $(this).
    // });

    $('.mm').on('click', function() {
        $('#mobileNav').foundation('reveal', 'close');
    });

	var window_top = $(window).scrollTop() + 12; // the "12" should equal the margin-top value for nav.stick
    var div_top = $('#nav-anchor').offset().top;


	$(window).scroll(function() {
		if ($(this).scrollTop() > 1){  
		    $('.header_container').addClass("fixed");
		  }
		  else{
		    $('.header_container').removeClass("fixed");
		  }
	});

    /** 
     * This part does the "fixed navigation after scroll" functionality
     * We use the jQuery function scroll() to recalculate our variables as the 
     * page is scrolled/
     */
    $(window).scroll(function(){
        var window_top = $(window).scrollTop() + 20; // the "12" should equal the margin-top value for nav.stick
        var div_top = $('#nav-anchor').offset().top;
            if (window_top > div_top) {
                $('nav').addClass('stick');
            } else {
                $('nav').removeClass('stick');
            }
    });

    /**
     * This part causes smooth scrolling using scrollto.js
     * We target all a tags inside the nav, and apply the scrollto.js to it.
     */
    $(".main_nav a").click(function(e){
        e.preventDefault();
        $('html,body').scrollTo(this.hash, this.hash); 
    });


    /**
     * This part handles the highlighting functionality.
     * We use the scroll functionality again, some array creation and 
     * manipulation, class adding and class removing, and conditional testing
     */
    var aChildren = $(".main_nav li").children(); // find the a children of the list items
    var aArray = []; // create the empty aArray
    for (var i=0; i < aChildren.length; i++) {    
        var aChild = aChildren[i];
        var ahref = $(aChild).attr('href');
        aArray.push(ahref);
    } // this for loop fills the aArray with attribute href values

    $(window).scroll(function(){
        var windowPos = $(window).scrollTop() + 20; // get the offset of the window from the top of page
        var windowHeight = $(window).height(); // get the height of the window
        var docHeight = $(document).height();

        for (var i=0; i < aArray.length; i++) {
            var theID = aArray[i];
            var divPos = $(theID).offset().top; // get the offset of the div from the top of page
            var divHeight = $(theID).height(); // get the height of the div in question
            if (windowPos >= divPos && windowPos < (divPos + divHeight)) {
                $("a[href='" + theID + "']").addClass("nav-active");
            } else {
                $("a[href='" + theID + "']").removeClass("nav-active");
            }
        }

        if(windowPos + windowHeight == docHeight) {
            if (!$("nav li:last-child a").hasClass("nav-active")) {
                var navActiveCurrent = $(".nav-active").attr("href");
                $("a[href='" + navActiveCurrent + "']").removeClass("nav-active");
                $("nav li:last-child a").addClass("nav-active");
            }
        }
    });
	
	// Counter
	$('.count').counterUp({
		delay: 10, // the delay time in ms
		time: 1000 // the speed time in ms
	});

	// Skrollr
	function enableSkrollr() {
		console.log('We are on Desktop');

		// Skrollr
	    var s = skrollr.init({
	    	forceHeight: false,
	    	smoothScrolling: false
	    });
	}

	function disableSkrollr() {
		console.log('We are on Mobile');

		// Disabale Skrollr
		var s = skrollr.init();
		s.destroy();
	}

	function enableTubular() {
		$('.off-canvas-wrap').tubular({
	    	videoId: '48ggWg8XBMQ'
	    });
	}

	enquire.register("screen and (min-width: 1025px)", {
		match : function() {
			enableSkrollr();
			enableTubular();
		},
		unmatch : function() {
			disableSkrollr();
		}
	});
    

    // Show in Placeholder
    $('.cat').showInPlaceHolder({
        placeHolderId: 'eduBox',
        eventType: 'hover',
        fitToPlaceHolder: true,
        aniDuration: 500,
        imgTransition: 'flyleft'
    });

    $('.cat_tvl').showInPlaceHolder({ placeHolderId: 'tvlBox', imgTransition: 'flyleft'});
    $('.cat_tsm').showInPlaceHolder({ placeHolderId: 'tsmBox', imgTransition: 'flyleft'});
    $('.cat_hb').showInPlaceHolder({ placeHolderId: 'hbBox', imgTransition: 'flyleft'});

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