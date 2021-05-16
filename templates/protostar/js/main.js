(function ($) {

    "use strict";

    /*=============================================
    =       Menu sticky & Scroll to top          =
    =============================================*/
    var windows = $(window);
    var screenSize = windows.width();
    var sticky = $('.header-sticky');
    var $html = $('html');
    var $body = $('body');

    windows.on('scroll', function () {
        var scroll = windows.scrollTop();
        var headerHeight = sticky.height();

        if (screenSize >= 320) {
            if (scroll < headerHeight) {
                sticky.removeClass('is-sticky');
            } else {
                sticky.addClass('is-sticky');
            }
        }

    });


    /*----------  Scroll to top  ----------*/
    function scrollToTop() {
        var $scrollUp = $('#scroll-top'),
            $lastScrollTop = 0,
            $window = $(window);

        $window.on('scroll', function () {
            var st = $(this).scrollTop();
            if (st > $lastScrollTop) {
                $scrollUp.removeClass('show');
            } else {
                if ($window.scrollTop() > 200) {
                    $scrollUp.addClass('show');
                } else {
                    $scrollUp.removeClass('show');
                }
            }
            $lastScrollTop = st;
        });

        $scrollUp.on('click', function (evt) {
            $('html, body').animate({ scrollTop: 0 }, 600);
            evt.preventDefault();
        });
    }
    scrollToTop();


    /*===========================================
    =            Submenu viewport position      =
    =============================================*/

    if ($(".has-children--multilevel-submenu").find('.submenu').length) {
        var elm = $(".has-children--multilevel-submenu").find('.submenu');

        elm.each(function () {
            var off = $(this).offset();
            var l = off.left;
            var w = $(this).width();
            var docH = windows.height();
            var docW = windows.width() - 10;
            var isEntirelyVisible = (l + w <= docW);

            if (!isEntirelyVisible) {
                $(this).addClass('left');
            }
        });
    }
    /*==========================================
    =            mobile menu active            =
    ============================================*/

    $("#mobile-menu-trigger").on('click', function () {
        $("#mobile-menu-overlay").addClass("active");
        $body.addClass('no-overflow');
    });

    $("#mobile-menu-close-trigger").on('click', function () {
        $("#mobile-menu-overlay").removeClass("active");
        $body.removeClass('no-overflow');
    });

    $(".offcanvas-navigation--onepage ul li a").on('click', function () {
        $("#mobile-menu-overlay").removeClass("active");
        $body.removeClass('no-overflow');
    });

    /*Close When Click Outside*/
    $body.on('click', function (e) {
        var $target = e.target;
        if (!$($target).is('.mobile-menu-overlay__inner') && !$($target).parents().is('.mobile-menu-overlay__inner') && !$($target).is('#mobile-menu-trigger') && !$($target).is('#mobile-menu-trigger i')) {
            $("#mobile-menu-overlay").removeClass("active");
            $body.removeClass('no-overflow');
        }
        if (!$($target).is('.search-overlay__inner') && !$($target).parents().is('.search-overlay__inner') && !$($target).is('#search-overlay-trigger') && !$($target).is('#search-overlay-trigger i')) {
            $("#search-overlay").removeClass("active");
            $body.removeClass('no-overflow');
        }

    });


    /*===================================
    =           Menu Activeion          =
    ===================================*/
    var cururl = window.location.pathname;
    var curpage = cururl.substr(cururl.lastIndexOf('/') + 1);
    var hash = window.location.hash.substr(1);
    if ((curpage == "" || curpage == "/" || curpage == "admin") && hash == "") {
        //$("nav .navbar-nav > li:first-child").addClass("active");
    } else {
        $(".navigation-menu li").each(function () {
            $(this).removeClass("active");
        });
        if (hash != "")
            $(".navigation-menu li a[href*='" + hash + "']").parents("li").addClass("active");
        else
            $(".navigation-menu li a[href*='" + curpage + "']").parents("li").addClass("active");
    }


    /*=========================================
    =             open menu Active            =
    ===========================================*/
    $('.openmenu-trigger').on('click', function (e) {
        e.preventDefault();
        $('.open-menuberger-wrapper').addClass('is-visiable');
    });

    $('.page-close').on('click', function (e) {
        e.preventDefault();
        $('.open-menuberger-wrapper').removeClass('is-visiable');
    });


    /*=========================================
    =             open menu Active            =
    ===========================================*/
    $("#open-off-sidebar-trigger").on('click', function () {
        $("#page-oppen-off-sidebar-overlay").addClass("active");
        $body.addClass('no-overflow');
    });

    $("#menu-close-trigger").on('click', function () {
        $("#page-oppen-off-sidebar-overlay").removeClass("active");
        $body.removeClass('no-overflow');
    });

    /*=============================================
    =            search overlay active            =
    =============================================*/

    $("#search-overlay-trigger").on('click', function () {
        $("#search-overlay").addClass("active");
        $body.addClass('no-overflow');
    });

    $("#search-overlay-trigger2").on('click', function () {
        $("#search-overlay2").addClass("active");
        $body.addClass('no-overflow');
    });

    $("#search-close-trigger").on('click', function () {
        $("#search-overlay").removeClass("active");
        $body.removeClass('no-overflow');
    });
    $("#search-close-trigger2").on('click', function () {
        $("#search-overlay2").removeClass("active");
        $body.removeClass('no-overflow');
    });


    /*=========================================
    =             open menu Active            =
    ===========================================*/
    $('.share-icon').on('click', function (e) {
        e.preventDefault();
        $('.entry-post-share').toggleClass('opened');
    });

    $body.on("click", function () {
        $(".entry-post-share").removeClass('opened');
    });
    // Prevent closing dropdown upon clicking inside the dropdown
    $(".entry-post-share").on("click", function (e) {
        e.stopPropagation();
    });

    /*=============================================
    =            offcanvas mobile menu            =
    =============================================*/
    var $offCanvasNav = $('.offcanvas-navigation'),
        $offCanvasNavSubMenu = $offCanvasNav.find('.sub-menu');

    /*Add Toggle Button With Off Canvas Sub Menu*/
    $offCanvasNavSubMenu.parent().prepend('<span class="menu-expand"><i></i></span>');

    /*Close Off Canvas Sub Menu*/
    $offCanvasNavSubMenu.slideUp();

    /*Category Sub Menu Toggle*/
    $offCanvasNav.on('click', 'li a, li .menu-expand', function (e) {
        var $this = $(this);
        if (($this.parent().attr('class').match(/\b(menu-item-has-children|has-children|has-sub-menu)\b/)) && ($this.attr('href') === '#' || $this.hasClass('menu-expand'))) {
            e.preventDefault();
            if ($this.siblings('ul:visible').length) {
                $this.parent('li').removeClass('active');
                $this.siblings('ul').slideUp();
            } else {
                $this.parent('li').addClass('active');
                $this.closest('li').siblings('li').removeClass('active').find('li').removeClass('active');
                $this.closest('li').siblings('li').find('ul:visible').slideUp();
                $this.siblings('ul').slideDown();
            }
        }
    });

    //Youtube background
    /*
    This script is based on the iframeResize-Pen (https://codepen.io/Codepalm/pen/XLzbrO) and adds the align-Plugin for jQuery
    */
    (function ($) {

        $(document).ready(function () {
            $(window).resize(function () {
                iframeResize();
            });
            iframeResize();
        });

        function iframeResize() {
            var iframes = $('iframe[data-scaling="true"]');
            if (iframes.exists()) {
                iframes.each(function () {
                    let iframe = $(this);
                    let videoFormat = '16:9';
                    if (typeof iframe.attr('data-format') !== "undefined" && iframe.attr('data-format').includes(':'))
                        videoFormat = iframe.attr('data-format');
                    iframe.rescale(videoFormat);
                    iframe.iframeCenterAlign();

                });
            }
        }

        $.fn.iframeCenterAlign = function () {

            var wrapperWidth = this.parent().width();
            var iframeWidth = this.width();
            var leftMargin = (wrapperWidth - iframeWidth) / 2;

            var wrapperHeight = this.parent().height();
            var iframeHeight = this.height();
            var topMargin = (wrapperHeight - iframeHeight) / 2;

            this.parent().css({ 'left': leftMargin + 'px', 'top': topMargin + 'px' });

        }
        $.fn.rescale = function (format) {
            let formatWidth = parseInt(format.split(':')[0]);
            let formatHeight = parseInt(format.split(':')[1]);
            let formatRatio = formatHeight / formatWidth;

            let currentWidth = this.width();
            let newHeight = formatRatio * currentWidth;

            this.height(Math.round(newHeight));
        };
        $.fn.exists = function () {
            return this.length > 0;
        };

    })(jQuery);


    //About grey slider
    $('.defaultslide').owlCarousel({
        loop: false,
        nav: false,
        dots: true,
        autoplayHoverPause: true,
        autoplay: true,
        margin: 30,
        responsive: {
            0: {
                items: 1,
            },
            1200: {
                items: 1,
            }
        }
    });

    //Home banner
    $('.home-banner-holder').owlCarousel({
        loop: false,
        nav: false,
        dots: true,
        margin: 30,
        autoplay: false,
        smartSpeed: 1000,
        autoplayHoverPause: true,
        animateOut: 'fadeOut',
        responsive: {
            0: {
                items: 1,
                rtl: false,
            },
            1200: {
                items: 1,
            }
        }
    });

    //LightBox / Fancybox
    $('.lightbox-image').fancybox({
        openEffect: 'fade',
        closeEffect: 'fade',
        helpers: {
            media: {}
        }
    });

    //get started
    $('.slidesthree').owlCarousel({
        loop: false,
        nav: false,
        dots: true,
        autoplayHoverPause: true,
        autoplay: true,
        margin: 20,
        responsive: {
            0: {
                items: 1,
            },
            576: {
                items: 2,
            },
            768: {
                items: 2,
            },
            992: {
                items: 3,
            },
            1200: {
                items: 3,
            }
        }
    });

    //quick Links
    $('.quicklinks').owlCarousel({
        loop: false,
        nav: false,
        dots: true,
        autoplayHoverPause: true,
        autoplay: false,
        margin: 20,
        responsive: {
            0: {
                items: 1,
                autoplay: true,
                loop: true,
            },
            576: {
                items: 2,
                autoplay: true,
                loop: true,
            },
            992: {
                items: 3,
            },
            1200: {
                items: 4,
            }
        }
    });

    $('.autowidth').owlCarousel({
        loop: false,
        nav: false,
        dots: true,
        autoplayHoverPause: true,
        autoplay: false,
        margin: 15,
        responsive: {
            0: {
                autoWidth: false,
                items: 1,
            },
            601: {
                autoWidth: false,
                items: 2,
            },
            962: {
                autoWidth: false,
                items: 2,
            },
            1000: {
                autoWidth: false,
                items: 3,
            },
            1100: {
                autoWidth: true,
            }
        }
    });

    // Portfolio Slides
    $('.card-slides').owlCarousel({
        loop: false,
        nav: false,
        dots: true,
        autoplayHoverPause: true,
        autoplay: true,
        margin: 30,
        responsive: {
            0: {
                items: 1,
            },
            576: {
                items: 2,
            },
            768: {
                items: 2,
            },
            992: {
                items: 3,
            },
            1200: {
                items: 3,
            }
        }
    });
    $('.card-slide').owlCarousel({
        loop: false,
        nav: false,
        dots: true,
        autoplayHoverPause: true,
        autoplay: true,
        margin: 30,
        responsive: {
            0: {
                items: 1,
            },
            576: {
                items: 2,
            },
            768: {
                items: 2,
            },
            992: {
                items: 3,
            },
            1200: {
                items: 3,
            }
        }
    });
    //Promo Inside
    $('#promoinside').owlCarousel({
        loop: false,
        nav: true,
        dots: true,
        autoplayHoverPause: true,
        autoplay: true,
        margin: 30,
        responsive: {
            0: {
                items: 1,
            },
            576: {
                items: 2,
            },
            768: {
                items: 3,
            },
            992: {
                items: 4,
            },
            1200: {
                items: 5,
            }
        }
    });
    //About grey slider
    $('.ad-items').owlCarousel({
        loop: true,
        nav: false,
        dots: false,
        autoplayHoverPause: true,
        autoplay: true,
        margin: 0,
        slideSpeed: 300,
        paginationSpeed: 500,
        singleItem: true,
        navigation: true,
        scrollPerPage: true,
        responsive: {
            0: {
                items: 1,
            },
            1200: {
                items: 1,
            }
        }
    });
    $('#promoinside2').owlCarousel({
        loop: false,
        nav: false,
        dots: true,
        autoplayHoverPause: true,
        autoplay: true,
        margin: 30,
        responsive: {
            0: {
                items: 1,
            },
            576: {
                items: 2,
            },
            768: {
                items: 3,
            },
            992: {
                items: 4,
            },
            1200: {
                items: 5,
            }
        }
    });
    $('.hero-slider').owlCarousel({
        items: 1,
        loop: true,
        margin: 0,
        nav: false,
        dots: true,
        autoplay: true,
        smartSpeed: 1000,
        autoplayHoverPause: true,
        animateOut: 'fadeOut',
        navText: ["<i class='flaticon-left-arrow'></i>", "<i class='flaticon-next'></i>",],
    });

    $("#ratesbtn").click(function () {
        $("#network-toggle").slideToggle();
    });

    //Rates Button
    $("#ratesbtn-2").click(function () {
        $("#network-toggle-2").slideToggle();
    });

    $('#helpfull').modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();




})(window.jQuery);


jQuery(window).on('load', function () {






});

jQuery(document).ready(function ($) {
    var pathArray = window.location.pathname.split('/');
    var secondLevelLocation = pathArray[1];
    var thirdLevelLocation = pathArray[2];
    var fourthLevelLocation = pathArray[3];

    if (pathArray.length == 3) {
        if ($.cookie("home_page") == null) {
            // setTimeout(function(){
            //     jQuery('#adModal').modal('show');
            //     jQuery('.modal-backdrop').removeClass("modal-backdrop");


            // }, 3000);
            setTimeout(function () {
                jQuery('#adModal').modal('show');
                jQuery('.modal-backdrop').removeClass("modal-backdrop");


            }, 3000);
            $.cookie("home_page", "2");
        }
        //without cookie, for testing purposes


        var html = "<section class='zuri whatsnew'><a title='modal' href='#adModal' rel='lightbox' data-toggle='modal' data-target='#adModal' data-backdrop='false'><img src='images/whatsnew.png' alt='Safaricom Neo' /></a></section>";
        jQuery("#whats_new_overlay").empty().append(html);

    }//endif

    if (thirdLevelLocation == "voice" & fourthLevelLocation == "tariffs") {

        if ($.cookie("voice_page") == null) {
            // setTimeout(function(){
            //     jQuery('#adModal2').modal('show');
            //     jQuery('.modal-backdrop').removeClass("modal-backdrop");


            // }, 3000);
            setTimeout(function () {
                jQuery('#adModal2').modal('show');
                jQuery('.modal-backdrop').removeClass("modal-backdrop");


            }, 3000);
            $.cookie("voice_page", "2");
        }

        //without cookie, for testing purposes
        var html = "<section class='zuri whatsnew'><a title='modal' href='#adModal2' rel='lightbox' data-toggle='modal' data-target='#adModal2' data-backdrop='false'><img src='images/whatsnew.png' alt='Safaricom Neo' /></a></section>";
        jQuery("#whats_new_overlay").empty().append(html);



    }//endif 

    if (thirdLevelLocation == "voice" & fourthLevelLocation == "promotions-offers") {

        if ($.cookie("voice-promotions-offers") == null) {
            // setTimeout(function(){
            //     jQuery('#adModal2').modal('show');
            //     jQuery('.modal-backdrop').removeClass("modal-backdrop");


            // }, 3000);
            setTimeout(function () {
                jQuery('#adModal6').modal('show');
                jQuery('.modal-backdrop').removeClass("modal-backdrop");


            }, 3000);
            $.cookie("voice-promotions-offers", "2");
        }

        //without cookie, for testing purposes

        var html = "<section class='zuri whatsnew'><a title='modal' href='#adModal6' rel='lightbox' data-toggle='modal' data-target='#adModal6' data-backdrop='false'><img src='images/whatsnew.png' alt='Safaricom Neo' /></a></section>";
        jQuery("#whats_new_overlay").empty().append(html);



    }//endif 

    if (thirdLevelLocation == "data" & fourthLevelLocation == "tariffs") {
        //set cookie
        //cookie is working

        if ($.cookie("data-tariffs") == null) {
            // setTimeout(function(){
            //     jQuery('#adModal3').modal('show');
            //     jQuery('.modal-backdrop').removeClass("modal-backdrop");


            // }, 3000);
            setTimeout(function () {
                jQuery('#adModal3').modal('show');
                jQuery('.modal-backdrop').removeClass("modal-backdrop");


            }, 3000);
            $.cookie("data-tariffs", "2");
        }

        //without cookie, for testing purposes
        var html = "<section class='zuri whatsnew'><a title='modal' href='#adModal3' rel='lightbox' data-toggle='modal' data-target='#adModal3' data-backdrop='false'><img src='images/whatsnew.png' alt='Safaricom Neo' /></a></section>";
        jQuery("#whats_new_overlay").empty().append(html);



    }//close if


    if (thirdLevelLocation == "data" & fourthLevelLocation == "promotions-offers") {
        //set cookie
        //cookie is working

        if ($.cookie("data-promotions-offers") == null) {
            //   setTimeout(function(){
            //       jQuery('#adModal3').modal('show');
            //       jQuery('.modal-backdrop').removeClass("modal-backdrop");


            //   }, 3000);
            setTimeout(function () {
                jQuery('#adModal7').modal('show');
                jQuery('.modal-backdrop').removeClass("modal-backdrop");


            }, 3000);

            $.cookie("data-promotions-offers", "2");
        }

        //without cookie, for testing purposes
        var html = "<section class='zuri whatsnew'><a title='modal' href='#adModal7' rel='lightbox' data-toggle='modal' data-target='#adModal7' data-backdrop='false'><img src='images/whatsnew.png' alt='Safaricom Neo' /></a></section>";
        jQuery("#whats_new_overlay").empty().append(html);


    }//close if

    if (thirdLevelLocation == "data" & fourthLevelLocation == "internet-tools") {
        //set cookie
        //cookie is working

        if ($.cookie("data-internet-tools") == null) {

            setTimeout(function () {
                jQuery('#adModal5').modal('show');
                jQuery('.modal-backdrop').removeClass("modal-backdrop");


            }, 3000);
            $.cookie("data-internet-tools", "2");
        }

        //without cookie, for testing purposes
        var html = "<section class='zuri whatsnew'><a title='modal' href='#adModal5' rel='lightbox' data-toggle='modal' data-target='#adModal5' data-backdrop='false'><img src='images/whatsnew.png' alt='Safaricom Neo' /></a></section>";
        jQuery("#whats_new_overlay").empty().append(html);



    }//close if



    //set the index counter
    var i = 0;

    //convert all .nav-tabs, except those with the class .keep-tabs
    $('.nav-tabs').not(".keep-tabs").each(function () {

        //init variables
        var $select,
            c = 0,
            $select = $('<select class="mobile-nav-tabs-' + i + ' mobile-tab-headings "></select>');

        //add unique class to nav-tabs, so each select works independently
        $(this).addClass('nav-tabs-index-' + i);

        //loop though each <li>, building each into an <option>, getting the text from the a href
        $(this).children('li').each(function () {
            $select.append('<option value="' + c + '">' + $(this).text() + '</option>');
            c++;
        });

        //insert new <select> above <ul nav-tabs>
        $(this).before($select);

        //increase index counter
        i++
    });

    //on changing <select> element
    $('[class^=mobile-nav-tabs]').on('change', function (e) {

        //get index from selected option
        classArray = $(this).attr('class').split(" ");
        tabIndexArray = classArray[0].split("mobile-nav-tabs-")
        tabIndex = tabIndexArray[1];

        //using boostrap tabs, show the selected option tab
        $('.nav-tabs-index-' + tabIndex + ' li a').eq($(this).val()).tab('show');
    });


    $("#country").change(function () {
        let country = jQuery("#country option:selected").text();
        // jQuery("#overlay").show();
        let id = jQuery('#country').val();


        //set country flag and image
        //set the continent
        var select_box = jQuery("#continent");
        select_box.empty();
        jQuery.ajax({
            url: "/personal/includes/api/continent.php",
            type: 'POST',
            data:
            {
                id: id,

            },
            success: function (msg) {

                let data = JSON.parse(msg);

                for (var i = 0; i < data.length; i++) {
                    // Iterate over numeric indexes from 0 to 5, as everyone expects.
                    let val = data[i].continent_id;
                    if (val == 1) {
                        select_box.append(jQuery("<option />").val(val).text("Africa"));
                    } else if (val == 2) {
                        select_box.append(jQuery("<option />").val(val).text("Antarctis"));
                    } else if (val == 3) {
                        select_box.append(jQuery("<option />").val(val).text("Asia"));
                    } else if (val == 4) {
                        select_box.append(jQuery("<option />").val(val).text("Australia and Oceania"));
                    } else if (val == 5) {
                        select_box.append(jQuery("<option />").val(val).text("Europe"));
                    } else if (val == 6) {
                        select_box.append(jQuery("<option />").val(val).text("North America"));
                    } else if (val == 7) {
                        select_box.append(jQuery("<option />").val(val).text("South America"));
                    } else {
                        select_box.append(jQuery("<option />").val("").text("Select (Optional)"));
                    }


                }
            }
        });


        //get rates
        getrates(id, country);

    });


    function getrates(id, country) {
        jQuery("#pref-tabs").empty();
        jQuery.ajax({
            url: "/personal/includes/api/getrates.php",
            type: 'POST',
            data:
            {
                id: id,

            },
            success: function (msg) {

                let data = JSON.parse(msg);
                //   console.log(data);
                for (var i = 0; i < data.length; i++) {
                    // Iterate over numeric indexes from 0 to 5, as everyone expects.
                    let html = '<table class="col-md-12 table table-condensed cf"><tbody><tr><td data-title="Action">Calls made within' + " " + country + '</td><td class="numeric" data-title="Charges" id="callsto">Ksh<strong>' + data[i].calls_made_within + '/min</strong></td></tr><tr><td data-title="Action">Calls to Kenya</td><td class="numeric" data-title="Charges" id="callstokenya">Ksh<strong>' + data[i].calls_to_kenya + '/min</strong></td></tr><tr><td data-title="Action">Calls to other countries</td><td class="numeric" data-title="Charges" id="callstoother">Ksh<strong>' + data[i].calls_to_others + '/min</strong></td></tr><tr><td data-title="Action">Calls to satelite networks</td><td class="numeric" data-title="Charges" id="callstosatelite">Ksh<strong>' + data[i].calls_to_satellite + '/min</strong></td></tr><tr><td data-title="Action">Recieving voice calls</td><td class="numeric" data-title="Charges" id="receivevoice">Ksh<strong>' + data[i].recieving_voice_call + '/min</strong></td></tr><tr><td data-title="Action">SMS to all destinations</td><td class="numeric" data-title="Charges" id="sms">Ksh<strong>' + data[i].sms_rate_others + '/min</strong></td></tr><tr><td data-title="Action">Data charges</td><td class="numeric" data-title="Charges" >Ksh<strong>' + data[i].gprs_pref + '/min</strong></td></tr> </tbody></table>';
                    jQuery("#pref-tabs").append(`<li class="nav-item"><a class="nav-link active" href="#tabs-1" data-toggle="tab">Other Network</a></li>`);

                    jQuery("#rates-title").empty();
                    jQuery("#rates-title").append('<h2>Life Charges in' + " " + country + '</h2>');
                    jQuery("#no-more-tables").empty();
                    jQuery("#no-more-tables").append(html);

                    getpref(id, country)

                }
                if ($("#network-toggle").is(":visible")) {
                    // toggled down
                }
                if ($("#network-toggle").is(":hidden")) {
                    $("#network-toggle").slideToggle('open');
                }


            }
        });

    }

    function getpref(id, country) {


        jQuery.ajax({
            url: "/personal/includes/api/getpref.php",
            type: 'POST',
            data:
            {
                id: id,

            },
            success: function (msg) {

                // console.log(JSON.parse(msg));
                let data = JSON.parse(msg);
                // console.log("message");

                for (var i = 0; i < data.length; i++) {

                    // console.log(data[i]);
                    let id = i + 2;
                    jQuery("#pref-tabs").append(`<li class="nav-item"><a class="nav-link" href="#tabs-${id}" data-toggle="tab">${data[i].pref_network}</a></li>`);
                    jQuery("#tab-content").append(`<div id="tabs-${id}" class="tab-pane"><div class="text-center data-tab-area"><div class="row mb-1 align-items-center justify-content-center"><div class="col-lg-12"><div class="text-left"><div class="title-network color-black"><h2>${data[i].pref_network} Charges in ${country}</h2></div><div id="no-more-tables"><table class="col-md-12 table table-condensed cf"><tbody><tr><td data-title="Action">Calls made within ${country}</td><td class="numeric" data-title="Charges">Ksh<strong>${data[i].local_calls}/min</strong></td></tr><tr><td data-title="Action">Calls to Kenya</td><td class="numeric" data-title="Charges">Ksh<strong>${data[i].calls_to_kenya}/min</strong></td></tr><tr><td data-title="Action">Calls to other countries</td><td class="numeric" data-title="Charges">Ksh<strong>${data[i].calls_to_others}/min</strong></td></tr><tr><td data-title="Action">Calls to satelite networks</td><td class="numeric" data-title="Charges">Ksh<strong>${data[i].calls_to_satellite}/min</strong></td></tr><tr><td data-title="Action">Recieving voice calls</td><td class="numeric" data-title="Charges">Ksh<strong>${data[i].receiving_roaming_calls}/min</strong></td></tr><tr><td data-title="Action">SMS to all destinations</td><td class="numeric" data-title="Charges">Ksh<strong>${data[i].sms_rate}/min</strong></td></tr><tr><td data-title="Action">Data charges</td><td class="numeric" data-title="Charges">Ksh<strong>${data[i].gprs_per_mb}/min</strong></td></tr></tbody></table></div></div></div></div></div></div>`);

                }


            }




        });

    }

    //country selection code
    $("#continent").change(function () {

        let id = jQuery("#continent").val();
        var select_box = jQuery("#country");
        select_box.empty();
        select_box.append(jQuery("<option selected='selected'/>").val("").text("Select Country"));

        jQuery.ajax({
            url: "/personal/includes/api/country.php",
            type: 'POST',
            data:
            {
                id: id,

            },
            success: function (msg) {

                let data = JSON.parse(msg);
                for (var i = 0; i < data.length; i++) {
                    // Iterate over numeric indexes from 0 to 5, as everyone expects.

                    select_box.append(jQuery("<option />").val(data[i].id).text(data[i].country_name));

                }
            }
        });

    });

    jQuery("#country2").change(function () {
        let id = jQuery("#country2").val();
        jQuery.ajax({
            url: "/personal/includes/api/getrates.php",
            type: 'POST',
            data:
            {
                id: id,

            },
            success: function (msg) {

                let data = JSON.parse(msg);
                //  console.log(data);
                for (var i = 0; i < data.length; i++) {
                    // Iterate over numeric indexes from 0 to 5, as everyone expects.
                    //   jQuery("#quickratespickercountryarea").text("Calls to "+jQuery("#quickratespicker option:selected").text());
                    let contryname = jQuery("#country option:selected").text();
                    let contryname2 = jQuery("#country2 option:selected").text();

                    let h2 = '<h2>Calling ' + contryname2 + ' from Kenya will cost you:</h2>';
                    jQuery("#rates-header").empty();
                    jQuery("#rates-header").append(h2);
                    let html = '<table class="col-md-12 table table-condensed cf"><tbody><tr><td data-title="Action">Calls made within ' + contryname2 + '</td><td class="numeric" data-title="Charges">Ksh<strong>' + data[i].calls_made_within + '/min</strong></td></tr><tr><td data-title="Action">Calls to Kenya</td><td class="numeric" data-title="Charges">Ksh<strong>' + data[i].calls_to_kenya + '/min</strong></td></tr></tbody></table>';
                    jQuery("#no-more-tables-rates").empty();
                    jQuery("#no-more-tables-rates").append(html);


                    if ($("#network-toggle-2").is(":visible")) {
                        // toggled down
                    }
                    if ($("#network-toggle-2").is(":hidden")) {
                        $("#network-toggle-2").slideToggle('open');
                    }


                }
            }
        });

    })
    jQuery("#modal_country").change(function () {

        let id2 = jQuery("#modal_country").val();
        jQuery.ajax({
            url: "/personal/includes/api/getrates.php",
            type: 'POST',
            data:
            {
                id: id2,

            },
            success: function (msg) {

                let data = JSON.parse(msg);
                // console.log(data);
                for (var i = 0; i < data.length; i++) {
                    // Iterate over numeric indexes from 0 to 5, as everyone expects.
                    //   jQuery("#quickratespickercountryarea").text("Calls to "+jQuery("#quickratespicker option:selected").text());

                    let contryname3 = jQuery("#modal_country option:selected").text();
                    jQuery("#modal_placeholder").empty();
                    jQuery("#modal_placeholder").attr('placeholder', '' + contryname3 + ":Ksh." + " " + data[i].calls_made_within + "/- per minute");
                    //   append("<strong>"+ data[i].calls_made_within +" per minute</strong>");


                }
            }
        });

    });


    //get SMS


    jQuery("#sms_select").keyup(function () {

        let amount = jQuery("#sms_select").val();


        let minutes = minutescalculator(amount);

        jQuery("#minutes_area").empty();
        jQuery("#minutes_area").attr('placeholder', `Your Minutes: ${minutes} Minutes`);

    });
    jQuery("#minutes_select_tarrifs_page").keyup(function () {

        let amount = jQuery("#minutes_select_tarrifs_page").val();


        let minutes = minutescalculator(amount);

        jQuery("#minutes_select_tarrifs_page_placeholder").empty();
        jQuery("#minutes_select_tarrifs_page_placeholder").attr('placeholder', `Your Minutes: ${minutes} Minutes`);

    });

    jQuery("#minutes_select_tarrifs_page2").keyup(function () {

        let amount = jQuery("#minutes_select_tarrifs_page2").val();


        let minutes = minutescalculator(amount);

        jQuery("#minutes_select_tarrifs_page_placeholder2").empty();
        jQuery("#minutes_select_tarrifs_page_placeholder2").attr('placeholder', `Your Minutes: ${minutes} Minutes`);

    });
    jQuery("#minutes_calculator_promotion").keyup(function () {

        let amount = jQuery("#minutes_calculator_promotion").val();


        let minutes = minutescalculator(amount);

        jQuery("#minutes_calculator_promotion_placeholder").empty();
        jQuery("#minutes_calculator_promotion_placeholder").attr('placeholder', `${minutes} Minutes`);

    });

    jQuery("#data_select").change(function () {

        let id2 = jQuery("#data_select").val();
        jQuery.ajax({
            url: "/personal/includes/api/getbundles.php",
            type: 'POST',
            data:
            {
                id: id2,

            },
            success: function (msg) {

                let data = JSON.parse(msg);
                //  console.log(data);
                for (var i = 0; i < data.length; i++) {

                    jQuery("#attach_bundles").empty();
                    jQuery("#attach_bundles").attr('placeholder', 'Your Data: ' + data[i].onpeak);


                }
            }
        });

    });
    jQuery("#validity_period").change(function () {

        let id2 = jQuery("#validity_period").val();
        jQuery.ajax({
            url: "/personal/includes/api/getbundles.php",
            type: 'POST',
            data:
            {
                id: id2,

            },
            success: function (msg) {

                let data = JSON.parse(msg);
                //  console.log(data);
                for (var i = 0; i < data.length; i++) {

                    jQuery("#validity_period_placeholder").empty();
                    jQuery("#validity_period_placeholder").attr('placeholder', 'Your Data: ' + data[i].onpeak);


                }
            }
        });

    });
    jQuery("#data_smart_tools").change(function () {

        let id2 = jQuery("#data_smart_tools").val();
        jQuery.ajax({
            url: "/personal/includes/api/getbundles.php",
            type: 'POST',
            data:
            {
                id: id2,

            },
            success: function (msg) {

                let data = JSON.parse(msg);
                //  console.log(data);
                for (var i = 0; i < data.length; i++) {

                    jQuery("#data_smart_tools_placeholder").empty();
                    jQuery("#data_smart_tools_placeholder").attr('placeholder', 'Your Data: ' + data[i].onpeak);


                }
            }
        });

    });


    jQuery("#mpesa_rates_select").change(function () {

        let min_amount = jQuery("#mpesa_rates_select").val();

        if (min_amount == 0) {
            jQuery("#bundle_append_area").empty();
            jQuery("#bundle_append_area").append("Ksh");
        }
        jQuery.ajax({
            url: "/personal/includes/api/mpesacalculator.php",
            type: 'POST',
            data:
            {
                amount: min_amount,

            },
            success: function (msg) {

                let data = JSON.parse(msg);
                //  console.log(data);
                for (var i = 0; i < data.length; i++) {

                    jQuery("#bundle_append_area").empty();
                    jQuery("#bundle_append_area").append("Ksh " + data[i].charges);


                }
            }
        });

    });


    jQuery("#mpesa_rates_atm_select").change(function () {

        let min_amount = jQuery("#mpesa_rates_atm_select").val();
        if (min_amount == 0) {
            jQuery("#bundle_append_area").empty();
            jQuery("#bundle_append_area").append("Ksh");
        }

        jQuery.ajax({
            url: "/personal/includes/api/getatmmpesarates.php",
            type: 'POST',
            data:
            {
                amount: min_amount,

            },
            success: function (msg) {

                let data = JSON.parse(msg);
                //  console.log(data);
                for (var i = 0; i < data.length; i++) {

                    jQuery("#bundle_append_area").empty();
                    jQuery("#bundle_append_area").append("Ksh " + data[i].charges);


                }
            }
        });

    });


    jQuery("#mpesa_rates_type").change(function () {
        $val = jQuery("#mpesa_rates_type").val();
        jQuery("#bundle_append_area").empty();
        jQuery("#bundle_append_area").append("Ksh");


        if ($val == 2) {
            jQuery("#mpesa_rates_select").hide()
            jQuery("#mpesa_rates_atm_select").show();
        } else if ($val == 1) {

            jQuery("#mpesa_rates_atm_select").css("display", "none");
            jQuery("#mpesa_rates_select").css("display", "block");

        }



    });


    let id;
    var select_box = jQuery("#country");
    var select_box2 = jQuery("#country2");
    var select_box3 = jQuery("#sms_select");
    var select_box4 = jQuery("#data_select");
    var select_box5 = jQuery("#mpesa_rates_select");
    var select_box6 = jQuery("#mpesa_rates_atm_select");
    var select_box7 = jQuery("#validity_period");
    var select_box8 = jQuery("#data_smart_tools");
    select_box.append(jQuery("<option selected='selected'/>").val("").text("Select Country"));
    select_box2.append(jQuery("<option selected='selected'/>").val("").text("Select Country"));
    select_box3.append(jQuery("<option selected='selected'/>").val("0").text("Select Amount"));
    select_box4.append(jQuery("<option selected='selected'/>").val("0").text("Select Amount"));
    select_box5.append(jQuery("<option selected='selected'/>").val("0").text("Select Amount Range"));
    select_box6.append(jQuery("<option selected='selected'/>").val("0").text("Select Amount Range"));
    //    select_box7.append(jQuery("<option selected='selected'/>").val("0").text("Validity period"));
    //    select_box8.append(jQuery("<option selected='selected'/>").val("0").text("Select amount you wish to spend"));

    jQuery.ajax({
        url: "/personal/includes/api/country.php",
        type: 'POST',
        data:
        {
            id: id,

        },
        success: function (msg) {

            let data = JSON.parse(msg);
            for (var i = 0; i < data.length; i++) {
                // Iterate over numeric indexes from 0 to 5, as everyone expects.

                select_box.append(jQuery("<option />").val(data[i].id).text(data[i].country_name));
                select_box2.append(jQuery("<option />").val(data[i].id).text(data[i].country_name));

            }
        }
    });
    //    $('#country').select2();

    // $('#modal_country').select2();

    let timezone = jQuery("#timezone");
    jQuery.ajax({
        url: "https://worldtimeapi.org/api/timezone",
        type: 'Get',
        success: function (data) {


            //   console.log(data);
            for (var i = 0; i < data.length; i++) {

                //  console.log(data[i]);
                timezone.append(jQuery("<option />").val(data[i]).text(data[i]));




            }
        }
    });

    //set data options


    jQuery.ajax({
        url: "/personal/includes/api/getsms.php",
        type: 'POST',
        success: function (msg) {

            let data = JSON.parse(msg);
            //   console.log(data);
            for (var i = 0; i < data.length; i++) {
                // Iterate over numeric indexes from 0 to 5, as everyone expects.

                select_box3.append(jQuery("<option />").val(data[i].price).text("Ksh " + data[i].price));

            }
        }
    });

    jQuery.ajax({
        url: "/personal/includes/api/getbundles.php",
        type: 'POST',
        success: function (msg) {

            let data = JSON.parse(msg);
            //   console.log(data);
            for (var i = 0; i < data.length; i++) {
                // Iterate over numeric indexes from 0 to 5, as everyone expects.

                select_box4.append(jQuery("<option />").val(data[i].price).text("Ksh" + data[i].price));
                select_box8.append(jQuery("<option />").val(data[i].price).text("Ksh" + data[i].price));
                select_box7.append(jQuery("<option />").val(data[i].price).text(data[i].validityperiod + " " + "at Ksh " + data[i].price));

            }
        }
    });




    jQuery.ajax({
        url: "/personal/includes/api/mpesacalculator.php",
        type: 'POST',
        success: function (msg) {

            let data = JSON.parse(msg);
            //   console.log(data);
            for (var i = 0; i < data.length; i++) {
                // Iterate over numeric indexes from 0 to 5, as everyone expects.

                select_box5.append(jQuery("<option />").val(data[i].min).text("Ksh" + " " + data[i].min + "-" + data[i].max));

            }
        }
    });

    jQuery.ajax({
        url: "/personal/includes/api/getatmmpesarates.php",
        type: 'POST',
        success: function (msg) {

            let data = JSON.parse(msg);
            //   console.log(data);
            for (var i = 0; i < data.length; i++) {
                // Iterate over numeric indexes from 0 to 5, as everyone expects.

                select_box6.append(jQuery("<option />").val(data[i].min).text("Ksh" + " " + data[i].min + "-" + data[i].max));

            }
        }
    });







    $("#get_minutes").click(function () {

        let amount = jQuery("#minutes_input").val();
        jQuery("#minutes_area").empty();
        jQuery("#minutes_area").attr('placeholder', 'Your Data: 300Mbs');



    });
    $("#minutes_input_homepage").keyup(function () {



        let amount = jQuery("#minutes_input_homepage").val();

        let data = datacalculator(amount);

        jQuery("#minutes_area2").attr('placeholder', `Your Data: ${data} Mbs`);

    });
    $("#data_calc").keyup(function () {



        let amount = jQuery("#data_calc").val();

        let data = datacalculator(amount);
        jQuery("#data_calc_placeholder").empty();
        jQuery("#data_calc_placeholder").attr('placeholder', `Your Data: ${data} Mbs`);

    });

    $("#data_calc2").keyup(function () {



        let amount = jQuery("#data_calc2").val();

        let data = datacalculator(amount);
        jQuery("#data_calc2_placeholder").empty();
        jQuery("#data_calc2_placeholder").attr('placeholder', `Your Data: ${data} Mbs`);

    });

    $("#data_calc_promo").keyup(function () {



        let amount = jQuery("#data_calc_promo").val();

        let data = datacalculator(amount);
        jQuery("#data_calc_promo_placeholder").empty();
        jQuery("#data_calc_promo_placeholder").attr('placeholder', `Your Data: ${data} Mbs`);

    });

    function datacalculator(amount) {

        //algo
        //if its less than 10

        let data;

        if (amount <= 10) {

            data = Math.floor(amount / 0.50);

        } else if (amount <= 50 & amount > 10) {

            data = Math.floor(amount / 0.29);

        } else if (amount > 51) {

            data = Math.floor(amount / 0.20);
        }

        return data
    }

    function minutescalculator(amount) {

        //algo
        //if its less than 10

        let minutes = (amount * 150) / 100;



        return minutes;
    }
    //contact form email validation

    jQuery(".rapid_email").change(function () {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var str = jQuery('.rapid_email').val();

        //console.log(regex.test(str));
        //isNumeric("-10")
        if (regex.test(str) == false) {
            swal({
                icon: "error",
                title: "Validation Error",
                text: "Please a valid email address to continue.",
            }).then(function () {
                jQuery('.rapid_email').val("");
            });
        } else {
            jQuery(".rapid_subject").prop('disabled', false);
        }
    });

    jQuery(".rapid_subject").keyup(function () {
        //value.replace(/[^A-Z0-9]+/i, '')
        var hasNumber = /\d/;
        var str = jQuery('.rapid_subject').val();
        //console.log(hasNumber.test(str));
        if (/^[a-zA-Z0-9- ]*$/.test(str) == false || hasNumber.test(str) == true) {
            swal({
                icon: "error",
                title: "Validation Error",
                text: "Please only enter letters of the alphabet.",
            }).then(function () {
                jQuery('.rapid_subject').val("");
            });
        } else {
            jQuery(".rapid_message").prop('disabled', false);
        }
    });

    jQuery(".rapid_message").keyup(function () {

        var str = jQuery('.rapid_message').val();
        //console.log(hasNumber.test(str));
        if (str == "") {
            swal({
                icon: "error",
                title: "Validation Error",
                text: "Message cannot be empty.",
            }).then(function () {
                jQuery('.rapid_message').val("");
            });
        } else {
            jQuery(".rapid_submit").prop('disabled', false);
        }
    });

    jQuery(".rapid_submit").click(function () {

        var str = jQuery('.rapid_message').val();
        //console.log(hasNumber.test(str));
        if (str == "") {
            swal({
                icon: "error",
                title: "Validation Error",
                text: "Message cannot be empty.",
            }).then(function () {
                jQuery('.rapid_message').val("");
            });
        } else {
            swal({
                icon: "success",
                title: "Submited!",
                text: "Your Feedback has been Received.",
            })
        }
    });

});
