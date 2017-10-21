/**
 * cbpAnimatedHeader.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
var cbpAnimatedHeader = (function() {
	
	/* Onload call constructor */
	setTimeout( scrollPage, 100 );
	
	var docElem = document.documentElement,
		header = document.querySelector( '.navbar' ),
		//p1Logo = document.querySelector( '.p1-logo' ),
		//p1Circles = document.querySelector( '.p1-circles' ),
		p1Text = document.querySelector( '.p1-text' ),
		didScroll = false,
		changeHeaderOn = 1,
		scrollchange = 1;
		
	var p1Logo = {
		selectClass: document.querySelector( '.p1-logo' ),
		classIn: "fadeIn",
		classOut: "fadeOut"
	};
	var p1Text = {
		selectClass: document.querySelector( '.p1-text' ),
		classIn: "fadeIn",
		classOut: "fadeOut"
	};
	var p1Circles = {
		selectClass: document.querySelector( '.p1-circles' ),
		def: "animate",
		classIn: "fadeIn",
		classOut: "fadeOut"
	};

	function init() {
		window.addEventListener( 'scroll', function( event ) {
			if( !didScroll ) {
				didScroll = true;
				setTimeout( scrollPage, 1 );
			}
		}, false );
	}

	function scrollPage() {
		var sy = scrollY();
		if ( sy >= changeHeaderOn ) {
			// if not on top
			classie.add( p1Circles.selectClass, p1Circles.def );
			classie.remove( p1Circles.selectClass, p1Circles.classOut );
			classie.add( p1Circles.selectClass, p1Circles.classIn );
			classie.remove( p1Text.selectClass, p1Text.classOut );
			classie.add( p1Text.selectClass, p1Text.classIn );
			classie.remove( p1Logo.selectClass, p1Logo.classIn );
			classie.add( p1Logo.selectClass, p1Logo.classOut );
		}
		else {
			// if on top
			classie.add( p1Circles.selectClass, p1Circles.def );
			classie.remove( p1Circles.selectClass, p1Circles.classIn );
			classie.add( p1Circles.selectClass, p1Circles.classOut );
			classie.remove( p1Text.selectClass, p1Text.classIn );
			classie.add( p1Text.selectClass, p1Text.classOut );
			classie.remove( p1Logo.selectClass, p1Logo.classOut );
			classie.add( p1Logo.selectClass, p1Logo.classIn );
		}
		if ( sy < scrollchange){
			scrollchange = sy;
			classie.add( header, 'navbar-page' );
		}
		else if ( sy > scrollchange ) {
			scrollchange = sy;
			classie.remove( header, 'navbar-page' );
		}
		didScroll = false;
	}

	function scrollY() {
		return window.pageYOffset || docElem.scrollTop;
	}

	init();

})();