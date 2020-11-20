<?php $out = array();


$START_INDICATOR = '<!--START_ITEM_ID_';
$END_INDICATOR = '<!--END_ITEM-->';


//get all filenames
foreach (glob('../../..//Portfolio/Items/*.html') as $filename) {
    $p = pathinfo($filename);

    $out[] = $p['dirname'] . '/'.$p['basename'];
}

//read all files and pull out ID
$results = [];

//echo print_r($out);
foreach ($out as $filename){
//echo $filename;
  $myfile = fopen($filename, "r");
$contents = fread($myfile,filesize($filename));
fclose($myfile);


$start = strpos($contents,$START_INDICATOR) + strlen($START_INDICATOR);
$length = strpos($contents,$END_INDICATOR) - $start;
$contents = substr($contents,$start,$length);
$idEnd = strpos($contents,'-->');
$id = substr($contents,0,$idEnd);
$contents = substr($contents,$idEnd + 3);

/*echo "<pre>";
echo $contents;
echo "</pre>";
echo "id: " . $id;*/
$results['id_'.$id] = $contents;
//echo $contents;
}




echo json_encode($results); 


?>