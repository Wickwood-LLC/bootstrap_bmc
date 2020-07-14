(function($) {
    /**
     * Sticky header
     */
    Drupal.behaviors.stickyHeader = {
        attach: function(context, settings) {
            var stickyTop;
            var menuWidth;
            var menuHeight;
            var headerHeight;
            var windowTop;
            var currentPosition;
            var $contact;
            var $menu;
            var topSpacing;

            $contact = $('#block-contactinfo');
            $menu = $('#block-bootstrap-bmc-mainmenu-2');

            $(document).ready(sticky);
            $(window).on("resize mresize", sticky);

            function sticky() {
                topSpacing = $('body').css('padding-top');
                menuHeight = $menu.outerHeight(); // gets the height of our menu
                stickyTop = $contact.offset().top; // tells how far our target element is from the top of the page
                windowTop = $(window).scrollTop(); // tells how far our screen is currently from the top of the page
                currentPosition = stickyTop + menuHeight - windowTop - topSpacing; // tells how far our target element is from where our screen is currently

                //console.log("Top spacing is " + topSpacing);

                if ($('sticky-header')) {
                    $menu.removeClass('sticky-header');
                }

                if ((window.matchMedia("(max-width: 480px)").matches) || (currentPosition < 0)) {
                    $menu.addClass('sticky-menu');
                    $menu.append($('#block-contactinfo'));
                    if ($('#toolbar-administration').length) {
                        $menu.css({
                            'top': topSpacing,
                        });
                    } else {
                        $menu.css({
                            'top': '0',
                        });
                    }
                } else {
                    $menu.removeClass('sticky-menu');
                    $('.header-right > div').append($('#block-contactinfo'));
                    $menu.css({
                        'top': '',
                    });
                }
            }

            $(window).scroll(function() { // scroll event
                if (window.matchMedia("(min-width: 481px)").matches) {
                    windowTop = $(window).scrollTop(); // tells how far our screen is currently from the top of the page
                    currentPosition = stickyTop + menuHeight - windowTop - topSpacing; // tells how far our target element is from where our screen is currently

                    if (currentPosition < 0) {
                        $menu.addClass('sticky-menu');
                    	if ($('#toolbar-administration').length) {
                            $menu.css({
                                'top': topSpacing,
                            });
                        } else {
                            $menu.css({
                                'top': '0',
                            });
                        }
                        $menu.append($('#block-contactinfo'));
                    } else {
                        $menu.removeClass('sticky-menu');
                        $menu.css({
                        	'top': '',
                        });
                        $('.header-right > div').append($('#block-contactinfo'));
                    }
                }
                // console.log('Distance from top of page: ' + stickyTop);
                // console.log('Current position: ' + currentPosition);
            });
        }
    };
}(jQuery));