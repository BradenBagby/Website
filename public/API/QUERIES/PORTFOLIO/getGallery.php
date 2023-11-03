<?php $out = array();


$folder = $_GET['folder'];

$path = '../../../Portfolio/Resources/Images/'. $folder.'/*.*';


//get all filenames
foreach (glob($path) as $filename) {
    $p = pathinfo($filename);

    $out[] = $p['dirname'] . '/'.$p['basename'];
}



echo json_encode($out); 


?>