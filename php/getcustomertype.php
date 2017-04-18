<?php
// $db_name  = 'pap';
//  $hostname = '148.72.232.171:3306';
//  $username = 'deepak';
//  $password = 'Deepak123';

include 'header.php';

$headers = apache_request_headers(); 
if (array_key_exists("Email",$headers))
  {
	//echo json_encode($headers);
	try{

    // connect to the database
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
	
	}catch (Exception $e)
	{
		echo $e->getMessage();
		die('Connection could not be established.<br />');
	}
	
	$sql = 'CALL usp_GetCustomerType';
	//$sql = 'SELECT * FROM pap.tblCustomerType';
	
	
	$stmt = $dbh->prepare( $sql );
	
	
	$stmt->execute();
	
	
	$result = $stmt->fetchAll( PDO::FETCH_ASSOC );
	
	
	$json = json_encode( $result );
	echo $json;
  }
  else
  {
    echo json_encode("Access denied.");
  }

//try{

	//property_exists($headers, 'Email');
//	echo json_encode($headers['Origin']);

//}catch (Exception $e)
//{
//	echo json_encode($e->getMessage());
//}



//try
//{
//  $sql = 'SELECT * FROM pap.tblCustomerType';
//  $query = $dbh->prepare($sql);
//  $query->execute();
//
//  $result = $query->fetchAll(PDO::FETCH_ASSOC);
//}catch (Exception $e)
//{
//   die('Cant fetch rows.');
//}

//foreach ($result as $r)
//{
//  echo json_encode($r); // do what you want here
//}

    


//header("Access-Control-Allow-Origin: http://localhost");
// header('Access-Control-Allow-Headers: X-Requested-With');
//header('Content-Type: application/json');

//header('Access-Control-Allow-Origin: '.$_SERVER['HTTP_ORIGIN']);
//header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
//header('Access-Control-Max-Age: 1000');
//header('Access-Control-Allow-Headers: Content-Type');

//echo $email.$email2;
//echo $json;
//echo $email.$pwd.$type;//$json;

//$yesno = ['hello'];//property_exists($headers, 'Email');
//echo json_encode($yesno);


?>
