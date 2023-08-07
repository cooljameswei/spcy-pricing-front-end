$(document).ready(function() {
    $.ajax({
		url: "https://spicyvision.com/QuoteService/ListOfServices",
		method: "GET",
		dataType: "json",
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            'Content-Type':'application/json'
        },
		success: function (data) {
            console.log(data)
        }
    })
})