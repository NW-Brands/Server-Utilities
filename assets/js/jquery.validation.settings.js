jQuery(document).ready(function($){

	var nameDefault = 'Your name...';
	var emailDefault = 'Your email...';
	var bidDefault = 'Your bid...';
	var messageDefault = 'Your message...';

	// Setting up existing forms

	setupforms();

	function setupforms() {
		// Applying default values
		setupDefaultText('#name',nameDefault);
		setupDefaultText('#email',emailDefault);
		setupDefaultText('#bid',bidDefault);
		setupDefaultText('#message',messageDefault);

		// Focus / Blur check against defaults
		focusField('#name');
		focusField('#email');
		focusField('#bid');
		focusField('#message');
	}

	function setupDefaultText(fieldID,fieldDefault) {
		$(fieldID).val(fieldDefault);
		$(fieldID).attr('data-default', fieldDefault);
	}

	function evalDefault(fieldID) {
		if($(fieldID).val() != $(fieldID).attr('data-default')) {
			return false;
		}
		else { return true; }
	}

	function hasDefaults(formType) {
		switch (formType)
		{
		case "subscribe" :
			if(evalDefault('#email')) { return true; }
			else { return false; }

		case "offer" :
			if(evalDefault('#name') && evalDefault('#email') && evalDefault('#bid')) { return true; }
			else { return false; }

		case "contact" :
			if(evalDefault('#name') && evalDefault('#email') && evalDefault('#message')) { return true; }
			else { return false; }

		default :
			return false;
		}
	}

	function focusField(fieldID) {
		$(fieldID).focus(function(evaluation) {
			if(evalDefault(fieldID)) { $(fieldID).val(''); }
		}).blur(function(evaluation) {
			if(evalDefault(fieldID) || $(fieldID).val() === '') { $(fieldID).val($(fieldID).attr('data-default')); }
		});
	}

	$('.button-submit').click(function(event) {
		event.preventDefault();
	});
	$('#submit-subscribe').bind('click', function(){
		if(!hasDefaults('subscribe')) { $('#form-subscribe').submit(); }
	});
	$('#submit-offer').bind('click', function(){
		if(!hasDefaults('offer')) { $('#form-offer').submit(); }
	});
	$('#submit-contact').bind('click', function(){
		if(!hasDefaults('contact')) { $('#form-contact').submit(); }
	});

	$("#form-subscribe").validate({
		rules: {
			email: {
				required: true,
				email: true
			}
		},
		messages: {
			email: {
				required: "Please enter your email address.",
				email: "This is not a valid email address format."
			}
		}
	});

	$("#form-offer").validate({
		rules: {
			name: {
				required: true,
				minlength: 3
			},
			email: {
				required: true,
				email: true
			},
			bid: {
				required: true,
				digits: true
			}
		},
		messages: {
			name: {
				required: "Please enter your name.",
				minlength: "Name must have at least 3 characters."
			},
			email: {
				required: "Please enter your email address.",
				email: "This is not a valid email address format."
			},
			bid: {
				required: "Please place your bid.",
				digits: "Bid value should be a number."
			}
		}
	});

	$("#form-contact").validate({
		rules: {
			name: {
				required: true,
				minlength: 3
			},
			email: {
				required: true,
				email: true
			},
			message: {
				required: true,
				minlength: 10
			}
		},
		messages: {
			name: {
				required: "Please enter your name.",
				minlength: "Name must have at least 3 characters."
			},
			email: {
				required: "Please enter your email address.",
				email: "This is not a valid email address format."
			},
			message: {
				required: "Please enter a message.",
				minlength: "Message must have at least 10 characters."
			}
		}
	});

	function validateSubscribe() {
		if(!$('#form-subscribe').valid()) { return false; }
		else { return true; }
	}

	function validateOffer() {
		if(!$('#form-offer').valid()) { return false; }
		else { return true; }
	}

	function validateContact() {
		if(!$('#form-contact').valid()) { return false; }
		else { return true; }
	}

	$("#form-subscribe").ajaxForm({
		beforeSubmit: validateSubscribe,
		type: "POST",
		url: "assets/php/subscribe-form-process.php",
		data: $("#form-subscribe").serialize(),
		success: function(msg){
			$("#form-message").ajaxComplete(function(event, request, settings){
				if(msg == 'OK') // Message Sent? Show the 'Thank You' message
				{
					result = '<span class="form-message-success"><i class="icon-thumbs-up"></i> Your request was sent. Thank you!</span>';
					clear = true;
				}
				else
				{
					result = '<span class="form-message-error"><i class="icon-thumbs-down"></i> ' + msg +'</span>';
					clear = false;
				}
				$(this).html(result);

				if(clear == true) {
					$('#email').val('');
				}
			});
		}
	});

	$("#form-offer").ajaxForm({
		beforeSubmit: validateOffer,
		type: "POST",
		url: "assets/php/offer-form-process.php",
		data: $("#form-offer").serialize(),
		success: function(msg){
			$("#form-message").ajaxComplete(function(event, request, settings){
				if(msg == 'OK') // Message Sent? Show the 'Thank You' message
				{
					result = '<span class="form-message-success"><i class="icon-thumbs-up"></i> Your offer was sent. Thank you!</span>';
					clear = true;
				}
				else
				{
					result = '<span class="form-message-error"><i class="icon-thumbs-down"></i> ' + msg +'</span>';
					clear = false;
				}
				$(this).html(result);

				if(clear == true) {
					$('#name').val('');
					$('#email').val('');
					$('#bid').val('');
				}
			});
		}
	});

	$("#form-contact").ajaxForm({
		beforeSubmit: validateContact,
		type: "POST",
		url: "assets/php/contact-form-process.php",
		data: $("#form-contact").serialize(),
		success: function(msg){
			$("#form-message").ajaxComplete(function(event, request, settings){
				if(msg == 'OK') // Message Sent? Show the 'Thank You' message
				{
					result = '<span class="form-message-success"><i class="icon-thumbs-up"></i> Your message was sent. Thank you!</span>';
					clear = true;
				}
				else
				{
					result = '<span class="form-message-error"><i class="icon-thumbs-down"></i> ' + msg +'</span>';
					clear = false;
				}
				$(this).html(result);

				if(clear == true) {
					$('#name').val('');
					$('#email').val('');
					$('#message').val('');
				}
			});
		}
	});
});