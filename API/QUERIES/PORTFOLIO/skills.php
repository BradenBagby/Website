
<?php

include '../query.php';


////////////////---------------------------FUNCTIONS
function getAllSkills(){
    $sql = "SELECT name FROM skill";
    $result = query($sql);
    
    $rows = array();
    while($r = mysqli_fetch_assoc($result)) {
        $rows[$r['name']] = array();
    }
    //echo json_encode($rows);
    return $rows;
}

function getTagsForSkill($skill){
    $sql = "SELECT name from tag join skill_tag on skill_tag.tag_name = tag.name where skill_tag.skill_name = '" . $skill . "'";

    $result = query($sql);
    
    $rows = array();
    while($r = mysqli_fetch_assoc($result)) {
        $rows[] = $r['name'];
    }
    return $rows;
}

////////////////---------------------------


//no skill passed in URL? send complete skill list with every tag 
$skills = getAllSkills();

foreach ($skills as $key => $value) {
    $skills[$key] = getTagsForSkill($key);
   }
   echo json_encode($skills);




//skill passed in URL? send just that skills information






?>