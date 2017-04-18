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
	$pwd = $headers['Key'];
	
	$sql = "CALL usp_ValidateUser('".$email."', ".$type.", '".$pwd."')";

	$stmt = $dbh->prepare( $sql );


	$stmt->execute();
	
	
	$result = $stmt->fetchAll( PDO::FETCH_ASSOC );
	
	
	$json = json_encode( $result );
	
		//header("Access-Control-Allow-Origin: *");
		//header('Access-Control-Allow-Headers: X-Requested-With');
		//header('Content-Type: application/json');
	
	echo $json;
	
}else {
	echo json_encode("Access denied.");
}


    



//echo $email;


?>
