

$(document).ready(function() {
    $('a.btn').on('click', function(event) {
        event.preventDefault();
        let checked = $(this).next('input[type=checkbox]').prop('checked')
        $(this).next('input[type=checkbox]').prop('checked', !checked);

        let pricingDiv = $(this).closest('.pricing-table');
        pricingDiv.toggleClass('active', checked);
    });
});