
<?php

include '../query.php';


////////////////---------------------------FUNCTIONS
function getAllItems(){
    $sql = "SELECT name ,id FROM item";
    $result = query($sql);
    
    $rows = array();
    while($r = mysqli_fetch_assoc($result)) {
        $rows['id_'.$r['id']] = array();
        $rows['id_'.$r['id']]['name'] = $r['name'];
        $rows['id_'.$r['id']]['skills'] = array();
        $rows['id_'.$r['id']]['id'] = $r['id'];
    }

    return $rows;
}

function getSkillsForItem($item){

    $sql = "SELECT name from skill join item_skill on item_skill.skill_name = skill.name where item_skill.item_id = '" . $item['id'] . "'";

    $result = query($sql);
    
    $rows = array();
    while($r = mysqli_fetch_assoc($result)) {
        $rows[] = $r['name'];
    }

    
    return $rows;
}

////////////////---------------------------

$itemCheck = $_GET['item'];

if(is_null($itemCheck)){

//no skill passed in URL? send complete skill list with every tag 
$items = getAllItems();

foreach ($items as $key => $value) {
    $items[$key]['skills'] = getSkillsForItem($items[$key]);
   }
   echo json_encode($items);
}else{

    //TODO: return one item with its skills
    //$results = getTagsForSkill($itemCheck);
    //echo json_encode($results);
}










?>