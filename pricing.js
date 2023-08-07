$(document).ready(function() {
    $.ajax({
		url: "https://spicyvision.com/QuoteService/ListOfServices",
		method: "GET",
		dataType: "json",
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
		success: function (data) {
            console.log(data)
        }
    })
})