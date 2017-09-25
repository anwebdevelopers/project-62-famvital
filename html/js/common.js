$(function() {

    'use strict';

    //-------------------------------
    //Меню
    //-------------------------------

    var $headerMenuButton = $('.header__nav-button'),
        $headerMenu = $('.header__menu');
    $headerMenuButton.click(function() {
        var $this = $(this);
        if (!$this.hasClass('active')) {
            $this.addClass('active');
            $headerMenu.fadeIn(600).css({'display': 'flex'});
        } else {
            $this.removeClass('active');
            $headerMenu.fadeOut(600);
        }
    });
    //Выключение при клике по ссылке
    $headerMenu.on('click', '.header__menu-container a', function() {
        $headerMenuButton.removeClass('active');
        $headerMenu.fadeOut(600);
    });

    //------------------------------------------------
    // Плавный скролл
    //------------------------------------------------

    $(".scroll").click(function(e) {
        e.preventDefault();
        var thisSect = $($(this).attr('href')).offset().top;
        $('html, body').animate({scrollTop: thisSect }, ((Math.abs(thisSect - $(window).scrollTop()) * 0.1) + 600), 'swing');
    });

    //---------------------------------------------
    //Аккордеон technologi
    //---------------------------------------------
    // var $formulaAccordeon = $('.formula__accordeon'),
    //     //$questionsPoint = $('.questions__point'),
    //     $formulaAccordeonBox = $('.formula__accordeon-box');
    //
    // $formulaAccordeon.not(':first').find($formulaAccordeonBox).hide();
    //
    // $formulaAccordeon.on('click', '.formula__accordeon-title', function() {
    //     $(this).closest($formulaAccordeon).addClass('active').find($formulaAccordeonBox).slideDown(300).end().siblings().removeClass('active').find($formulaAccordeonBox).slideUp(300);
    // });

    //-----------------------------------------------
    //popup
    //-----------------------------------------------

    $('.popup-with-zoom-anim').magnificPopup({
		type: 'inline',
		fixedContentPos: false,
		fixedBgPos: true,
		overflowY: 'auto',
		closeBtnInside: true,
		preloader: false,
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-zoom-in'
	});

    //------------------------------------------------------
    //Chrome Smooth Scroll
    //------------------------------------------------------
    try {
        $.browserSelector();
        if ($('html').hasClass('chrome')) {
            $.smoothScroll();
        }
    } catch (err) {

    };

    $('img, a').on('dragstart', function(event) {
        event.preventDefault();
    });

    //------------------------------------------------------------
    //fullscreen header for IE
    //------------------------------------------------------------

    var $header = $('.header');

    function fullscreen() {
        if($('html').hasClass('ie') || $('html').hasClass('gecko')) {
            $header.removeAttr('style');
            var windowHeight = $(window).height(),
                windowWidth = $(window).width(),
                headerHeight = $header.height();
            if (windowHeight > $header.height() && windowWidth > 640) {
                $header.css({
                    'height' : windowHeight + 'px'
                });
            }
        }
    }

    fullscreen();

    $(window).resize(function() {
        fullscreen();
    });


    //-------------------------------
    // Google Map
    //-------------------------------

    if(typeof google === 'object' && typeof google.maps === 'object' && $('#map').length) {

        var markerPositions = new Array();
        	markerPositions[1] = new google.maps.LatLng(55.761742, 37.593182);
        	markerPositions[2] = new google.maps.LatLng(55.759397, 37.604345);
            markerPositions[3] = new google.maps.LatLng(55.763078, 37.616594);
            markerPositions[4] = new google.maps.LatLng(55.764439, 37.636888);
            markerPositions[5] = new google.maps.LatLng(55.759188, 37.644919);
            markerPositions[6] = new google.maps.LatLng(55.756583, 37.628483);
            markerPositions[7] = new google.maps.LatLng(55.752151, 37.610456);
            markerPositions[8] = new google.maps.LatLng(55.749501, 37.592544);
            markerPositions[9] = new google.maps.LatLng(55.747136, 37.617824);
            markerPositions[10] = new google.maps.LatLng(55.749783, 37.632884);
            markerPositions[11] = new google.maps.LatLng(55.749491, 37.646751);


        function initialMap() {
            var loc, map;

            loc = new google.maps.LatLng(55.756148, 37.620897);

            map = new google.maps.Map(document.getElementById("map_canvas"), {
                 zoom: 14,
                 center: loc,
                 mapTypeId: google.maps.MapTypeId.ROADMAP,
                 scrollwheel: false
            });

            var iconlink = 'img/';
            for(var i in markerPositions) {
              var markerPosition = markerPositions[i];

              var marker = new google.maps.Marker({
                  map: map,
                  position: markerPosition,
                  visible: true,
                  icon: iconlink + 'icon-map.png'
              });
            }

            map.set('styles', [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ccc"},{"lightness":20},{"saturation":-97}]}]);
        }
        initialMap();
        google.maps.event.addDomListener(window, 'load', initialMap);

    }

});
