// for farbtastic.js jquery migrate
jQuery.browser = {};
(function () {
    jQuery.browser.msie = false;
    jQuery.browser.version = 0;
    if (navigator.userAgent.match(/MSIE ([0-9]+)./)) {
        jQuery.browser.msie = true;
        jQuery.browser.version = RegExp.$1;
    }
})();

$(function(){
	// AURA SYNC
	var $colorpicker = $('#colorpicker'),
		$color_area = $('#color, #color_a, #color_b'),
		$light_headers = $('#light_headers'),
		$starry_night = $('.starry_night'),
		ani = '';
	$('#lighting_box .hd-controls li').click(function(){
		var $this = $(this),
			style = $this.data('style');

		$this.siblings().removeClass('hd-active');
		$this.addClass('hd-active');

		switch(style){
			case 'static':
			case 'breathing':
			case 'strobing':
            case 'music':
				$colorpicker.fadeIn();
				$starry_night.hide();
				$light_headers.hide();
				$color_area.removeClass();
				break;
			case 'smart':
				$colorpicker.hide();
				$starry_night.hide();
				$light_headers.hide();
				$color_area.removeClass();
				break;
			case 'cycle':
			case 'rainbow':
				$colorpicker.hide();
				$starry_night.hide();
				$light_headers.fadeIn();
				$color_area.removeClass().addClass('hd-'+style);
				break;
			// case 'yoyo':
			// case 'flash':
			// case 'wave':
			case 'comet':
				$colorpicker.fadeIn();
				$starry_night.hide();
				$light_headers.hide();
				$color_area.removeClass().addClass('hd-'+style);
				break;
			case 'starry':
				$colorpicker.hide();
				$starry_night.fadeIn();
				$light_headers.fadeIn();
				$color_area.removeClass().addClass('hd-'+style);
				break;
            case 'dark':
				$colorpicker.hide();
				$starry_night.hide();
				$light_headers.hide();
				$color_area.removeClass().addClass('hd-'+style);
				break;
		}

		ani = $this.data('animate') + ' infinite';
		$color_area.css({'animation': ani })
	})

	// color picker
	$colorpicker.farbtastic({callback:'#color, #color_a, #color_b', width:110});
	var cp = $.farbtastic('#colorpicker');
	cp.setColor("#33d7cf");
	$('#color, #color_a, #color_b').change(function(){
		if(cp.hsl[2] < 0.2){
			$(this).css("background-color","#333333");
		}
	})
})