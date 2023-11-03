
<?php

include '../connect.php';

function query($sql){ 
  global $conn;
    connect();

    $result = $conn->query($sql);

    close();

    return $result; 
  }

?>