<?php
    $db_name  = 'pap';
    $hostname = '148.72.232.171:3306';
    $username = 'papuser';
    $password = 'papuser123';

    // connect to the database
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
?>