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

    $('.header__menu-list a, .scroll').click(function(e) {
        e.preventDefault();
        var thisSect = $($(this).attr('href')).offset().top;
        $('html, body').animate({scrollTop: thisSect }, ((Math.abs(thisSect - $(window).scrollTop()) * 0.1) + 600), 'swing');
    });

    //---------------------------------------------
    //accordeon
    //---------------------------------------------
    var $accordeon = $('.accordeon'),
        $accordeonBox = $('.accordeon__box');
    $accordeon.each(function() {
        var $this = $(this);
        $this.is(':first-child') ? $this.addClass('active') : $this.find($accordeonBox).hide();
    });
    $accordeon.on('click', '.accordeon__title', function() {
        $(this).closest($accordeon).addClass('active').find($accordeonBox).slideDown(300).end().siblings().removeClass('active').find($accordeonBox).slideUp(300);
    });


    //---------------------------------------------
    //formula images
    //---------------------------------------------

    $('.formula__box').each(function() {
        var $this = $(this),
            $formula__item = $(this).find('.formula__item');
        $this.prepend('<div class="formula__img"><img src="' + $formula__item.first().attr('data-src') + '"></div><div class="formula__content"></div>');
        $formula__item.each(function() {
            var $this = $(this);
            $this.appendTo($this.closest('.formula__box').find('.formula__content'));
        });
    });

    $('.formula__content').on('click', '.formula__item', function() {
        var $this = $(this),
            url = $this.attr('data-src'),
            $img = $this.closest('.formula__box').find('.formula__img img');
        $img.css({'opacity' : '0','transform' : 'scale(0)'});
        setTimeout(function() {
            $img.attr('src', url).css({'opacity' : '1','transform' : 'scale(1)'});
        }, 300);
    });



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


    //---------------------------------------------
    //preload images
    //---------------------------------------------

    $.fn.preload = function() {
        this.each(function(){
            $('<img/>')[0].src = this;
        });
    }
    var preloadImages = [];
    $('.formula__item').each(function(){
        preloadImages.push($(this).attr('data-src'));
    });
    $(preloadImages).preload();


    //-------------------------------
    // Google Map
    //-------------------------------

    if(typeof google === 'object' && typeof google.maps === 'object' && $('#map').length) {

        var markerPositions = new Array();
        	markerPositions[1] = new google.maps.LatLng(57.695551, 39.783253);
        	markerPositions[2] = new google.maps.LatLng(57.641033, 39.783253);
            markerPositions[3] = new google.maps.LatLng(57.643823, 39.853336);
            markerPositions[4] = new google.maps.LatLng(57.665205, 39.928052);
            markerPositions[5] = new google.maps.LatLng(57.619947, 39.878820);


        function initialMap() {
            var loc, map;

            loc = new google.maps.LatLng(57.661197, 39.856271);

            map = new google.maps.Map(document.getElementById('map'), {
                 zoom: 11,
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

            map.set('styles', [{'featureType':'landscape','stylers':[{'saturation':-100},{'lightness':65},{'visibility':'on'}]},{'featureType':'poi','stylers':[{'saturation':-100},{'lightness':51},{'visibility':'simplified'}]},{'featureType':'road.highway','stylers':[{'saturation':-100},{'visibility':'simplified'}]},{'featureType':'road.arterial','stylers':[{'saturation':-100},{'lightness':30},{'visibility':'on'}]},{'featureType':'road.local','stylers':[{'saturation':-100},{'lightness':40},{'visibility':'on'}]},{'featureType':'transit','stylers':[{'saturation':-100},{'visibility':'simplified'}]},{'featureType':'administrative.province','stylers':[{'visibility':'off'}]},{'featureType':'water','elementType':'labels','stylers':[{'visibility':'on'},{'lightness':-25},{'saturation':-100}]},{'featureType':'water','elementType':'geometry','stylers':[{'hue':'#ccc'},{'lightness':20},{'saturation':-97}]}]);
        }
        initialMap();
        google.maps.event.addDomListener(window, 'load', initialMap);

    }

});
