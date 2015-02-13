<?php
/*
Credits: Bit Repository
URL: http://www.bitrepository.com/
*/

/* Setup your email address to receive emails */
define( 'WEBMASTER_EMAIL', 'username@emailhost.com' );
define( 'EMAIL_SUBJECT', 'New domain bid received!' );


/* Do not edit below this line */

function validate_email($email) {
	$regex = '/([a-z0-9_.-]+)'. # (Name) Letters, Numbers, Dots, Hyphens and Underscores

	'@'. # (@ -at- sign)

	'([a-z0-9.-]+){2,255}'. # Domain) (with possible subdomain(s) ).

	'.'. # (. -period- sign)

	'([a-z]+){2,10}/i'; # (Extension) Letters only (up to 10 (can be increased in the future) characters)

	if($email == '') { 
		return false;
	}
	else {
		$eregi = preg_replace($regex, '', $email);
	}

	return empty($eregi) ? true : false;
}

error_reporting (E_ALL ^ E_NOTICE);

$post = (!empty($_POST)) ? true : false;

if($post)
{

	$name = stripslashes(strip_tags($_POST['name']));
	$email = trim($_POST['email']);
	$subject = EMAIL_SUBJECT;
	$bid = intval(trim($_POST['bid']));
	
	$message = "Hello,\r\n\n";
	$message .= "You have received a new domain bid:\r\n";
	$message .= "Bidder's name: " . $name . "\r\n";
	$message .= "Bidder's email: " . $email . "\r\n";
	$message .= "Bid value: " . $bid . "\r\n\n";
	$message .= "Have a nice day!";

	$error = '';

	// Check name

	if(!$name)
	{
		$error .= 'Please enter your name.<br />';
	}

	// Check email

	if(!$email)
	{
		$error .= 'Please enter an e-mail address.<br />';
	}

	if($email && !validate_email($email))
	{
		$error .= 'Please enter a valid e-mail address.<br />';
	}

	// Check agains bot habit

	if ($name && $email && $name==$email) {
		$error .= 'Name and email cannot be the same.<br />';
	}
	
	// Check subject

	if(!$subject)
	{
		$error .= 'Please enter a subject.<br />';
	}

	// Check bid

	if(!$bid)
	{
		$error .= "Please enter your bid. It should be an integer number.<br />";
	}

	if( !$error )
	{
		$mail = mail( WEBMASTER_EMAIL, $subject, $message,
		 "From: ". $name ." <".$email.">\r\n"
		."Reply-To: ".$email."\r\n"
		."X-Mailer: PHP/" . phpversion() );

		if( $mail ) { echo 'OK'; }

	}
	else { echo $error; }
}
?>