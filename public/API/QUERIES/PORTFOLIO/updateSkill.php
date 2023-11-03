
<?php

include '../query.php';
include '../constants.php';


if (!$DEV) {
    echo "not dev";
    return;
}

authenticate();

function addSkillTag($skill, $tag)
{

    // check if tag exists. if it doesnt, create it. use lowercase to check. lowercase the tag above.
    //
    $sql = "SELECT COUNT(*) as C from tag where name = '" . $tag . "'";
    $result = query($sql);
    $exists = 0;
    while ($r = mysqli_fetch_assoc($result)) {
        $exists = $r['C'];
    }


    if ($exists <= 0) {
        $sql = "INSERT INTO tag (name) VALUES ('" . $tag . "')";
        query($sql);
    }


    //check if skill exists. if not, create it
    $sql = "SELECT COUNT(*) as C from skill where name = '" . $skill . "'";
    $result = query($sql);
    $exists = 0;
    while ($r = mysqli_fetch_assoc($result)) {
        $exists = $r['C'];
    }


    if ($exists <= 0) {
        $sql = "INSERT INTO skill (name) VALUES ('" . $skill . "')";
        query($sql);
    }




    $sql = "INSERT into skill_tag (skill_name, tag_name) VALUES ('" . $skill . "','" . $tag . "')";


    $result = query($sql);
    echo $sql;
}


$addSkillTag = $_GET['skillTag'];

if (!is_null($addSkillTag)) {

    $pieces = explode("|", $addSkillTag);
    addSkillTag($pieces[0], $pieces[1]);
}


?>