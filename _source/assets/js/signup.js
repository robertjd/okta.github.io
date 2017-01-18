$(function () {

    var email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        is_processing = false,
        has_tried = false,
        form_valid = false,
        signup_form = '#developer_signup',
        api_url = 'http://okta.com.dev/developerapi';

    // Update form location information
    var geo_error = function(error) {
        return;
    };
    var geo_success = function(geoipResponse) {
        $(signup_form + ' #Country').val(geoipResponse.country.names.en);
        if (geoipResponse.subdivisions[0] != '') {
            $(signup_form + ' #State').val(geoipResponse.subdivisions[0].names.en);
            $(signup_form + ' #Province').val(geoipResponse.subdivisions[0].names.en);
        }

        // show opt-in for non US registrations
        if (geoipResponse.country.names.en == 'Canada') {
            $(signup_form + ' .casl-inputs').show();
        }
    };
    geoip2.city(geo_success, geo_error);

    // Update form ip address
    $.ajax({
        url: api_url + '/ip_address/',
        method: 'get'
    })
    .done(function(resp) {
        $(signup_form + ' .request_ip').val(resp.ip_address.toString());
    });

    // process form submission
    $(signup_form).submit(function(e){
        e.preventDefault;
        has_tried = true;

        if (! is_processing) {
            form_processing(true);

            form_valid = true;

            $(signup_form + ' .required').each(function(){
                validate_input($(this));
            });

            if (form_valid) {
                // update submission timestamp
                $(signup_form + ' #CASL_Time_Stamp__c').val(Date.now());

                $.ajax({
                    url: api_url + '/create/',
                    cache: false,
                    method: 'get',
                    dataType: 'json',
                    data: $(signup_form).serializeArray()
                })
                .done(function(resp) {
                    var url = window.location.toString(),
                        thank_you_url = window.location.protocol.toString().concat('//', window.location.host, window.location.pathname, 'thank-you/');

                    // preserve query string
                    if (url.indexOf('?') > 0) {
                        thank_you_url = thank_you_url.concat(url.substr(url.indexOf('?'), url.length));
                    }
                    // preserve hash
                    else if (window.location.hash != '') {
                        thank_you_url = thank_you_url.concat(window.location.hash.toString());
                    }

                    window.location.href = thank_you_url;
                })
                .fail(function(resp) {
                    // if response has error message display it
                    if (resp.responseJSON.error_msg != undefined) {
                        $(signup_form + ' .global-error').html(resp.responseJSON.error_msg.toString()).show();
                    }

                    // if response has invalid inputs highlight them
                    if (resp.responseJSON.invalid_inputs != undefined) {

                        $(signup_form + ' :input').each(function(){
                            if ($.inArray($(this).attr('name'), resp.responseJSON.invalid_inputs) >= 0) {
                                $(this).parent('div').removeClass('is-valid')
                                $(this).parent('div').addClass('is-invalid')
                            }
                        });
                    }
                })
                .always(function(resp){
                    form_processing(false);
                });
            }
            else {
                form_processing(false);
            }
        }

        return false;
    });

    // validate changes as they're made after a submission attempt
    $(signup_form + ' .required').keyup(function(){
        if (has_tried) {
            validate_input($(this));
        }
    });

    /**
     * Change form processing state, when processing submission requests not processed and
     * submit button text changes to spinner graphic
     *
     * @param status            boolean form processing status
     */
    function form_processing(status) {
        if (status) {
            is_processing = true;
            $('.OccForm-submit').addClass('is-processing');
        }
        else {
            is_processing = false;
            $('.OccForm-submit').removeClass('is-processing');
        }
    }

    /**
     * Validate provided input value, updates parent div styles based on value provided
     *
     * @param which             form input element
     */
    function validate_input(which) {
        which.parent('div').removeClass('is-valid');

        // field missing value
        if (which.val() == '') {
            form_valid = false;
            which.parent('div').addClass('is-invalid');
        }
        // email field has invalid address format
        else if (which.hasClass('valid-email') && ! email_regex.test(which.val())) {
            form_valid = false;
            which.parent('div').addClass('is-invalid');
        }
        // input appears valid
        else {
            which.parent('div').removeClass('is-invalid');
            which.parent('div').addClass('is-valid');
        }
    }

});
