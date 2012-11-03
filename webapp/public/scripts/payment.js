			var publicStripeApiKey = 'pk_test_cNwSqcfNOvklkSh2sDOfrHps';
			var publicStripeApiKeyTesting = 'pk_test_cNwSqcfNOvklkSh2sDOfrHps';

			Stripe.setPublishableKey(publicStripeApiKey);

			function stripeResponseHandler(status, response) {
			    if (response.error) {
			        // show the errors on the form
			        $(".errors").text(response.error.message);
			        $(".submit-button").removeAttr("disabled");
			    } else {
			        var form$ = $("#payment-form");
			        // token contains id, last4, and card type
			        var token = response['id'];
			        // insert the token into the form so it gets submitted to the server
			        form$.append("<input type='hidden' name='stripeToken' value='" + token + "'/>");
			        // and submit
			        form$.get(0).submit();
			    }
			}

			$(document).ready(function() {
			  $("#payment-form").submit(function(event) {
			    // disable the submit button to prevent repeated clicks
			    $('.submit-button').attr("disabled", "disabled");
			    var total="1000";
			    Stripe.createToken({
			        number: $('.card-number').val(),
			        cvc: $('.card-cvc').val(),
			        exp_month: $('.card-expiry-month').val(),
			        exp_year: $('.card-expiry-year').val(),
			        type: $('#card-type').val()
			    }, stripeResponseHandler);

			    // prevent the form from submitting with the default action
			    return false;
			  });
			});