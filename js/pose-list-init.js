$(function() {
	$('.affix-panel').affix({
		offset: {
			top: $('.affix-panel').offset().top
		}
	}).width($('.affix-panel').width());
});