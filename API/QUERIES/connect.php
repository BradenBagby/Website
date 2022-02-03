
<?php

$conn;

function connect()
{

  global $conn;
  $host_name = 'db5001055811.hosting-data.io';
  $database = 'dbs909718';
  $user_name = 'dbu161884';
  $password = 'DATABASE_PASSWORD';

  $conn = new mysqli($host_name, $user_name, $password, $database);

  if ($conn->connect_error) {
    die('{error:"failed to connect to database"}');
  } else {
    // echo '<p>Connection to MySQL server successfully established.</p>';
  }
}

function close()
{
  global $conn;
  $conn->close();
}

function authenticate()
{
  echo 'authenticating';
  // cant connet to database unless we provide the correct password
  $key = $_GET['key'];
  $hashed = hash(
    "sha256",
    $key,
  );

  if ($hashed != "eb72d5fbca2311247a1a4474c622533f7e46733ce2b134822b2cfce28d685530") {
    die('{error: "wrong password. Stop trying to hack me fool",}');
  }
}

?>
