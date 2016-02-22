$(document).ready(function(){
	// Breakpoints
	$(window).setBreakpoints({
		// use only largest available vs use all available
		distinct: true,
		// array of widths in pixels where breakpoints should be triggered
		breakpoints: [320, 480, 768, 1024]
	});
	$(window).setBreakpoints();
	

	// Use cookies to check is user arrives to 'articulo' from 'politicas' or 'resumen'
	if ($('body').hasClass('body-summary')) {
		$.cookie('resumen', 1);

	} else if ($('body').hasClass('body-policies')) {
		var cookie = $.cookie('resumen');
		if( cookie && cookie === '1' ){
			$('.history-back a').attr('href', getOverviewLink()).html('← Volver');
			$.removeCookie('resumen');
		}

	} else {
		$.removeCookie('resumen');
	}

	// Initialice tooltips at Budget Indicators
	$('#totals-panel .icon-question').tooltip();

	// Support a 'chrome-less' mode to improve the look of the site when embedded via iframe.
	// Just add a query parameter 'embedded', with any value, and the chrome-less model will be
	// enabled. A cookie is set for the remainder of the session so we don't have to pollute
	// all the app links to carry the query parameter around.
	queryParameters = $.deparam.querystring();
	if ( typeof queryParameters.embedded != 'undefined' ) {
		$.cookie('embedded', 1);	// Set a cookie to remember we are embedded
	}
	if ( $.cookie('embedded')==='1' ) {
		$('.hide-when-embedded').hide();
	}


	// iPhone Safari Viewport Scaling Bug
	(function(doc) {
		var addEvent = 'addEventListener',
				type = 'gesturestart',
				qsa = 'querySelectorAll',
				scales = [1, 1],
				meta = qsa in doc ? doc[qsa]('meta[name=viewport]') : [];

		function fix() {
			meta.content = 'width=device-width,minimum-scale=' + scales[0] + ',maximum-scale=' + scales[1];
			doc.removeEventListener(type, fix, true);
		}

		if ((meta = meta[meta.length - 1]) && addEvent in doc) {
			fix();
			scales = [.25, 1.6];
			doc[addEvent](type, fix, true);
		}

	}(document));

});
