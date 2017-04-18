<?php
include 'header.php';

$headers = apache_request_headers(); 
if (array_key_exists("Email",$headers))
{
	try{

    // connect to the database
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
	
	}catch (Exception $e)
	{
		echo $e->getMessage();
		die('Connection could not be established.<br />');
	}
	
	$email = $headers['Email'];
	$type = $headers['Type'];
	$phone = $headers['Phone'];
	$pwd = $headers['Key'];
	
	if($type == 2)//2 == customer
	{
		$sql = "CALL pap.usp_InsertCustomer('','','','".$email."','".$phone."','','".$pwd."')";
		
	}else if($type == 1)//1 == pharmacy
	{
		$sql = "CALL usp_InsertPharmacy('','','".$email."','".$phone."','','".$pwd."','','','','','')";
	}
	

	$stmt = $dbh->prepare( $sql );


	$stmt->execute();
	
	
	$result = $stmt->fetchAll( PDO::FETCH_ASSOC );
	
	
	$json = json_encode( $result );
	
    if(sizeof($result) > 0) 
    {
        //SEND EMAIL 
        $code = $result[0]['RESULT'];
        $to = $email;
        $subject = "Verification code";
        $message = 
        "
        <html>
		<style>
			.heading {
				background-color: orange;
				padding: 2em;
				text-align: center;
			}
		</style>
        <head>
        
        </head>
        <body>
		<div style='heading'>
			<h2>FindAPharma</h2>
		</div>
        <p>Your sign up verification code is: </p>
        <h4>".$code."</h4>
        </body>
        </html>

        ";
        
        // Always set content-type when sending HTML email
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        
        // More headers
        $headers .= 'From: FindAPharma<noreply@findapharma.com>';
        //$headers .= 'From: <webmaster@example.com>' . "\r\n";
        //$headers .= 'Cc: myboss@example.com' . "\r\n";
        
        mail($to,$subject,$message,$headers);
        
            //header("Access-Control-Allow-Origin: *");
            //header('Access-Control-Allow-Headers: X-Requested-With');
            //header('Content-Type: application/json');
        
        
    }
	echo $json;
	
}else {
	echo json_encode("Access denied.");
}


    



//echo $email;


?>
