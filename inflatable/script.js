/* Grabs get params from window location */
var params = {};
location.search
		.substr(1)
		.split("&")
		.forEach(function (item) {
			tmp = item.split("=");
			params[decodeURIComponent(tmp[0])] = decodeURIComponent(tmp[1]);
		});

function processRequests() {
	Object.keys(params).forEach(function(key) {
		var btn = $('.btn-success[data-target="#rental' + key + '"]');
		var amt;
		if(btn.length !== 0 && (amt = parseInt(params [key]))) { // if the item exists
			btn.click();
			var max = parseInt($('#qty_' + key).attr('e'));
			amt = Math.min(max, amt);
			$('#qty_' + key).val(amt).attr({
				'value': amt,
				'oldvalue': Math.min(0, amt - 1)
			})
		}
	});
}

// Clicks the add button and sets the amounts for any products in the url
$(document).ready(function() {
	processRequests();
});

$( document ).ajaxComplete(function() {
	processRequests();
});