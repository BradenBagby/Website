
<?php

$conn;

function connect(){

    global $conn;
$host_name = 'db5001055811.hosting-data.io';
$database = 'dbs909718';
$user_name = 'dbu161884';
$password = '122333BradenPortfolioYayoo!';

$conn = new mysqli($host_name, $user_name, $password, $database);

if ($conn->connect_error) {
  die('{error:"failed to connect to database"}');
} else {
// echo '<p>Connection to MySQL server successfully established.</p>';
}
}

function close(){
    global $conn;
    $conn->close();
}

?>