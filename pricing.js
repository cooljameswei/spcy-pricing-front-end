$('.btn-request-quote').click(function() {
    $(this).fadeOut()
    $('#generate-quote-form').fadeIn()
    $('.bullet-point').hide()
    $('.form-check-input').fadeIn()

})

$('#generate-quote-form').submit(function(e) {
    e.preventDefault()
    const data = {
        "Name": "Micha uss",
        "Email": "esdds@!dfasdf.ca",
        "PhoneNumber": "234 333 2222",
        "AdditionalDetails": "This will be a wedding event",
        "ServiceIds": [
            1,
            3,
            9
        ],
        "EventDetails": [
            {
                "Date": "2023-11-12T00:00:00",
                "StartTime": "12:30:00",
                "EndTime": "19:00:00",
                "Locations": [
                    {
                        "Address": "23 Ranking ave, toronto",
                        "IsGta": true
                    },
                    {
                        "Address": "7 Windosor Ave",
                        "IsGta": false
                    }
                ]
            },
            {
                "Date": "2023-11-15T00:00:00",
                "StartTime": "11:30:00",
                "EndTime": "17:00:00",
                "Locations": [
                    {
                        "Address": "23 SAttle down, toronto",
                        "IsGta": true
                    },
                    {
                        "Address": "7 Peelie Ave",
                        "IsGta": false
                    }
                ]
            }
        ]
    };
    console.log(data)
    $.ajax({
		url: "https://spicyvision.com/QuoteService/QuoteRequest",
		method: "POST",
		dataType: "json",
        data: JSON.stringify(data),
        contentType: "application/json",

		success: function (data) {
		  console.log(data);
		  roll(data.winner); // call the roll function with the winner data
		},
		error: function (xhr, status, error) {
		  console.log(xhr.responseText);
		},
	});
})