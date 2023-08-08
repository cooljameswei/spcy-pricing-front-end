$('.btn-request-quote').click(function() {
    $(this).fadeOut()
    $('#generate-quote-form').fadeIn()
    $('.bullet-point').hide()
    $('.form-check-input').fadeIn()

})

$('#generate-quote-form').submit(function(e) {
    e.preventDefault()
    const data1 = {
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
    

    let EventDetails = []
    $('.item').each((t, v) => {
        const date = `${$(this).find('.Date').val()}T00:00:00`
        const startTime = `${$(this).find('.StartTime').val()}:00`
        const endTime = `${$(this).find('.EndTime').val()}:00`
        let locations = []
        $(this).find('.locations .location').each((l, location) => {
            console.log(l, location)
            let Address = $(location).find('.Address').val()
            let IsGta = $(location).find('.IsGta').prop('checked')
            locations.push({Address, IsGta})
        })
        EventDetails.push({date, startTime, endTime, locations})

    }, [])
    let ServiceIds = []
    $('.service').each((idx, s) => {
        console.log($(s))
        if($(s).prop('checked'))
            ServiceIds.push(Number($(s).val()))
    })

    const data = {
        "Name": $('#Name').val(),
        "Email": $('#Email').val(),
        "PhoneNumber": $('#PhoneNumber').val(),
        "AdditionalDetails": $('#AdditionalDetails').val(),
        EventDetails,
        ServiceIds
    }
    
    $.ajax({
		url: "https://spicyvision.com/QuoteService/QuoteRequest",
		method: "POST",
		dataType: "json",
        data: JSON.stringify(data),
        contentType: "application/json",

		success: function (data) {
            
            console.log(data)
		},
		error: function (xhr, status, error) {
		  console.log(xhr.responseText);
		},
	});
})