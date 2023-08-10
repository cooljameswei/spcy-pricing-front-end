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
                    <p><h4 class="alert-heading">Calculated Price: $${CalculatedPrice.toFixed(2)}</h4></p>
                    <ul>
                        ${
                            Object.keys(BreakDown).reduce((t,v) => 
                                `${t}<li>
                                    <div class="d-flex justify-content-between">
                                        <div>${v}</div>
                                        <div>$${BreakDown[v].toFixed(2)}</div>
                                    </div>
                                </li>`
                            , "")
                        }
                    </ul>
                </div>
                <hr>
                <div class="text-center d-flex justify-content-around flex-sm-row flex-column gap-4">
                    <span>Are you okay with this price and booking me?</span>
                    <div class="text-center">
                        <button class="btn btn-success">Yes</button>
                        <button class="btn btn-light btn-no">No</button>
                    </div>
                </div>
                <div class="negotiate-budget">
                    <hr>
                    <div class="form-group d-flex justify-content-between flex-sm-row flex-column">
                        <label for="budget">Please let me know your budget</label>
                        <input type="number" id="budget" class="form-control mt-2 mb-2 m-sm-0" style="max-width: 240px;"/>
                    </div>
                    
                    <label class="mt-0 mt-sm-2">I can customize my service to meet your budget so please feel free to let me know best price you are willing to pay.</label>
                    <div class="text-center mt-2"><button class="btn btn-primary">Submit</button></div>
                </div>
            </div>
            `)
            $('.services').fadeOut()
            
		},
		error: function (xhr, status, error) {
		  console.log(xhr.responseText);
		},
	});
})

$(document).on('click', '.btn-no', function() {
    let negotiateBudget = $('.negotiate-budget')
    console.log(negotiateBudget)
    negotiateBudget.css({maxHeight: 240})
    $(this).prop('disabled', true)
});

$('.card-1 .form-check-input').click(function() {
    const groupName = $(this).data('group')
    const isChecked = $(this).prop('checked')
    if(groupName) {
        $(`.card-1 input[data-group=${groupName}]`).prop('checked',false)
        if(isChecked)
        $(this).prop('checked', true)
    }
})