function SetToolPit(element, offsetX = 0, offsetY = 0){
	var x = element.offset().left;
	var y = element.offset().top;
	var width = element.width();
	var height = element.height();

	offsetX = offsetX + 38;
	offsetY = offsetY + 8;

	var toolpitWidth = $('.tof-toolpit').width();
	var toolpitHeight = $('.tof-toolpit').height();
	var windowWidth = $(window).width();
	var windowHeight = $(window).height();

	var posx = x - offsetX - toolpitWidth;
	var posy = y + offsetY;

	if(posx > toolpitWidth){
		// Move the toolpit to the left
		$('.tof-toolpit').attr('class', 'tof-toolpit left');
	}else if(posx < toolpitWidth){
		if(windowWidth - (x + width) > toolpitWidth){
			// Move the toolpit to the right
			posx = (x + width) - offsetX;
			$('.tof-toolpit').attr('class', 'tof-toolpit right');
		}else{
			posx = x;
			// Move the toolpit to the top
			if(windowHeight - (y + toolpitHeight) > toolpitHeight){
				$('.tof-toolpit').attr('class', 'tof-toolpit top');
			}else{
				$('.tof-toolpit').attr('class', 'tof-toolpit bottom');
			}
		}
	}

	$('.tof-toolpit').css({top : posy, left : posx});
}
$(document).ready(function(){
	/* Show navbar - More Options */
	$('.tof-desktop-navbar-menu').on('click', function(){
		$('.tof-navbar-sidebar').show();
	});
	
	/* Hide Site Loader */
	$('.tof-site-loader').hide();

	$('.tof-mob-navbar-menu').on('click', function(){
		// Open Mobile Sidebar
		$('.tof-dark-overlay').show();
		$('.tof-mobile-sidebar').css('right', '0');
		$('body').css('overflow', 'hidden');
	});

	$('.tof-desktop-navbar-menu, .tof-navbar-sidebar, .tof-mob-navbar-menu, .tof-mobile-sidebar').on('click', function(e){
		e.stopPropagation();
	});

	$('.tof-dark-overlay').on('click', function(){
		$('body').css('overflow', '');
	});

	$('body').on('click', function(){
		$('.tof-navbar-sidebar').hide();
		$('.tof-mobile-sidebar').css('right', '');
		$('.tof-dark-overlay').hide();
	});

	// Theme Toogle/button
	$('.tof-navbar-sidebar-profile-sub-list').on('click', function(){
		$('#tof-theme-checkbox').prop('checked', !$("#tof-theme-checkbox").is(':checked')).trigger('change');
	});
	
	// Active Checkbox if darkmode is enabled
	$('#tof-theme-checkbox').prop('checked', isDarkMode()).trigger('change');
	var daf_themeIcon = (isDarkMode())?'light':'dark';
	$('.tof-mobile-sidebar-link-icon').addClass(daf_themeIcon);

	$("#tof-theme-checkbox").on('change', function(){
		var newTheme = ($(this).is(":checked"))?'dark':'light';
		localStorage.setItem("themeMode", newTheme);
		ToogleTheme();

		(isDarkMode())?$('.tof-mobile-sidebar-link-icon').addClass('light').removeClass('dark'):$('.tof-mobile-sidebar-link-icon').addClass('dark').removeClass('light');
	});

	$('.tof-mob-theme').on('click', function(){
		newTheme = (isDarkMode())?'light':'dark';
		localStorage.setItem("themeMode", newTheme);
		ToogleTheme();

		var isDark = isDarkMode();

		$('#tof-theme-checkbox').prop('checked', isDark).trigger('change');
		(isDark)?$('.tof-mobile-sidebar-link-icon').addClass('light').removeClass('dark'):$('.tof-mobile-sidebar-link-icon').addClass('dark').removeClass('light');
	});


	/**
	 * Tof Range 
	 * Input Range
	 */
	
	$('.tof-range input[type="range"]').on("input", function(){
		var value = $(this).val();
		var reached = value - $(this).attr("min");
		var total = $(this).attr("max") - $(this).attr("min");
		var progress = Math.floor((reached/total)*100);
		$(this).css("background", `linear-gradient(to right, var(--themeColor) ${progress}%, var(--tof-black-color-13) ${progress}%)`);
		$(this).next(".range-value").html(value);
	});

	$('.tof-range input[type="range"]').trigger("input");
});