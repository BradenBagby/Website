
<?php

include '../query.php';
include '../constants.php';


if (!$DEV) {
    echo "not dev";
    return;
}

authenticate();

$addSkillTag = $_GET['itemSkill']; //skillName|skillId
$r = $_GET['remove'];

function addSkillTag($skill, $tag, $remove)
{



    $sql = "";
    if ($remove == 'true') {
        $sql = "DELETE FROM `item_skill` WHERE item_id = '" . $tag . "' and skill_name = '" . $skill . "'";
    } else {
        $sql = "INSERT into item_skill (skill_name, item_id) VALUES ('" . $skill . "','" . $tag . "')";
    }



    $result = query($sql);
    echo $sql;
}



if (!is_null($addSkillTag)) {

    $pieces = explode("|", $addSkillTag);
    addSkillTag($pieces[0], $pieces[1], $r);
}


?>