$('.add-event').click(function() {
    $('.items').append(`
        <div class="flex-column item" style="display:flex">
            <div class="d-flex flex-column flex-lg-row mt-4 mb-4 justify-content-md-between">
                <div class="timepicker-wrapper d-flex flex-1 flex-column flex-lg-row align-items-lg-center">
                    <label class="w-md-100">Date</label> <input type="date" class="datetime text-center Date" required/>
                </div>
                <div class="d-flex flex-column flex-lg-row justify-content-between gap-lg-5">
                    <div class="timepicker-wrapper d-flex justify-content-lg-center flex-column flex-lg-row">
                        <label class="ml-lg-1">From</label> <input class="datetime text-center StartTime" type="time" name="from" required>
                    </div>
                    <div class="timepicker-wrapper d-flex justify-content-lg-center flex-column flex-lg-row">
                        <label class="">To</label> <input class="ml-1 datetime text-center EndTime" type="time" name="to" required>
                    </div>
                </div>
            </div>
            <div class="locations-header d-flex align-items-center justify-content-between">
                <h4>Locations</h4>  
                <div class="text-primary text-center add add-location"><i class="fa fa-plus"></i> Add Location</div>
            </div>

            <ul class="list-group list-group-flush locations">
                <li class="list-group-item location pt-4 pb-4 d-flex flex-column gap-4">
                    <div class="location-address">
                        <label for="address" class="form-label text-white">Location Address</label>
                        <input type="text" class="form-control datetime Address" required>
                    </div>
                    <div class="d-flex justify-content-between align-items-center flex-column flex-sm-row gap-3">
                        <div class="form-check d-flex align-items-center gap-3">
                            <input type="checkbox" class="form-check-input text-white IsGta" style="display: inline-block;" checked>
                            <label class="form-check-label ml-4 text-white">Within GTA?</label>
                        </div>

                        <div class="text-danger text-center add remove-location" onclick="$(this).closest('.location').remove()"><i class="fa fa-minus"></i> Remove This Location</div>
                    </div>
                </li>
            </ul>
            <button class="btn btn-danger remove-event" type="button"><i class="fa fa-minus"></i> Remove This Event</button>

        </div>
    `)
    if($('.item').length > 1)
        $('.remove-event').show()
})

$(document).on('click', '.add-location', function() {
    $(this).parent().siblings('.locations').append(
        `<li class="list-group-item location pt-4 pb-4 d-flex flex-column gap-4">
            <div class="location-address">
                <label for="address" class="form-label text-white">Location Address</label>
                <input type="text" class="form-control datetime Address" required>
            </div>
            <div class="d-flex justify-content-between align-items-center flex-column flex-sm-row gap-3">
                <div class="form-check d-flex align-items-center gap-3">
                    <input type="checkbox" class="form-check-input text-white IsGta" style="display: inline-block;" checked>
                    <label class="form-check-label ml-4 text-white">Within GTA?</label>
                </div>

                <div class="text-danger text-center add remove-location" onclick="$(this).closest('.location').remove()"><i class="fa fa-minus"></i> Remove This Location</div>
            </div>
        </li>`
    )
});

$(document).on('click', '.remove-event', function() {
    const item = $(this).closest('.item')
    item.fadeOut()
    item.remove()

    if($('.item').length == 1)
        $('.remove-event').hide()
})
$('.show-more').click(function() {
    let active = !$(this).data('active')
    $(this).data('active', active)
    let salesDescription = $(this).closest('.list-group-item').find('.sales-description')
    if(active){
        $(this).find('img').attr('src', './images/info-active.png')
        salesDescription.css({"maxHeight": "800px"})
    }
    else{
        $(this).find('img').attr('src', './images/info.png')
        salesDescription.css({"maxHeight": 0})
    }
})

var RequestId = 0;

$('.btn-request-quote').click(function() {
    $(this).fadeOut()
    $('#generate-quote-form').fadeIn()
    $('.bullet-point').hide()
    $('.form-check-input[disabled="disabled"]').closest('li').removeClass('d-flex').addClass('d-none');
    $('.form-check-input').fadeIn()
})

$('#generate-quote-form').submit(function(e) {
    e.preventDefault()

    $('.loading-icon').css('display', 'inline-block')
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
            RequestId = data.RequestId
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
               <hr class="question-panel">
               <div class="text-center justify-content-around flex-sm-row flex-column gap-4 question-panel" style="display:flex">
                    <span>Are you okay with this price and booking me?</span>
                    <div class="text-center">
                        <button class="btn btn-success btn-yes">Yes</button>
                        <button class="btn btn-light btn-no">No</button>
                    </div>
                </div>
                <div class="negotiate-budget">
                    <hr>
                    <form method="POST" id="form-negotiate">
                     <label class="mt-0 mt-sm-2 font-weight-bold">Oh! Ok, I can customize my service to meet your budget so please feel free to let me know best price you are willing to pay.</label>   
                    <div class="my-3 form-group d-flex align-items-center">
                            <label class="m-3" for="budget">Your budget:</label>
                            <input type="number" id="budget" class="form-control ml-3 mt-2 mb-2 m-sm-0" style="max-width: 140px;max-height:40px;" required/> $
                        </div>
                        
                        <div class="text-center mt-2"><button type="submit" class="btn btn-primary btn-submit">Submit</button></div>
                    </form>
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

$(document).on('click', '.btn-yes', function() {
    const data = {
        RequestId,
        Agreed: true
    }
    
    $.ajax({
        url: "https://spicyvision.com/QuoteService/UpdateCustomerResponse",
		method: "POST",
		dataType: "json",
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function(response) {
            $('#result').html(
                `<div class="alert alert-primary" role="alert">
                    ${response.Message}
                </div>`
            )
        }
    })
})

$(document).on('click', '.btn-no', function() {
    let negotiateBudget = $('.negotiate-budget')
    negotiateBudget.css({ maxHeight: 400 })
    $('.question-panel').hide();
    $(this).prop('disabled', true)
});

$(document).on('submit', '#form-negotiate', function(e) {
    e.preventDefault()
    let Budget = $('#budget').val()
    Budget = Number(Budget)
    const data = {
        RequestId,
        Agreed: false,
        WantsToNegotiate: true,
        Budget
    }
    $.ajax({
        url: "https://spicyvision.com/QuoteService/UpdateCustomerResponse",
		method: "POST",
		dataType: "json",
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function(response) {
            $('#result').html(
                `<div class="alert alert-primary" role="alert">
                    ${response.Message}
                </div>`
            )
        }
    })
    
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