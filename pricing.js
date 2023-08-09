$('.btn-request-quote').click(function() {
    $(this).fadeOut()
    $('#generate-quote-form').fadeIn()
    $('.bullet-point').hide()
    $('.form-check-input').fadeIn()

})

$('#generate-quote-form').submit(function(e) {
    e.preventDefault()

    let EventDetails = []
    $('.item').each((t, v) => {
        const date = `${$(this).find('.Date').val()}T00:00:00`
        const startTime = `${$(this).find('.StartTime').val()}:00`
        const endTime = `${$(this).find('.EndTime').val()}:00`
        let locations = []
        $(this).find('.locations .location').each((l, location) => {
            let Address = $(location).find('.Address').val()
            let IsGta = $(location).find('.IsGta').prop('checked')
            locations.push({Address, IsGta})
        })
        EventDetails.push({date, startTime, endTime, locations})

    }, [])
    let ServiceIds = []
    $('.service').each((idx, s) => {
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
            const { CalculatedPrice, Message, BreakDown, WillAddAdditionalCost } = data
            $('#result').html(`
            <div class="alert alert-success" role="alert">
                ${Message}
                <hr>
                <div>
                    <p><h4 class="alert-heading">CalculatedPrice: $${CalculatedPrice}</h4></p>
                    <ul>
                        ${
                            Object.keys(BreakDown).reduce((t,v) => 
                                `${t}<li>
                                    <div class="d-flex justify-content-between">
                                        <div>${v}</div>
                                        <div>$${BreakDown[v]}</div>
                                    </div>
                                </li>`
                            , "")
                        }
                    </ul>
                </div>
            </div>
            `)
            
		},
		error: function (xhr, status, error) {
		  console.log(xhr.responseText);
		},
	});
})

$('.card-1 .form-check-input').click(function() {
    const groupName = $(this).data('group')
    if(groupName) {
        $(`.card-1 input[data-group=${groupName}]`).prop('checked',false)
        $(this).prop('checked', true)
    }
})