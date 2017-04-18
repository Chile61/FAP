<?php
//$to = "somebody@example.com, somebodyelse@example.com";
$to = "megharajdeepak@gmail.com";
$subject = "Verification code";
$message = "
<html>
<head>
<title>FindAPharma.com | Your verification code</title>
</head>
<body>
<p>This email contains HTML Tags!</p>

</body>
</html>
";

// Always set content-type when sending HTML email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

// More headers
$headers .= 'From: <noreply@findapharma.com>';
//$headers .= 'From: <webmaster@example.com>' . "\r\n";
//$headers .= 'Cc: myboss@example.com' . "\r\n";

mail($to,$subject,$message,$headers);
?>