<html>

<body>

<form action="/action_page.php">
  <label for="fname">Skill:</label>
  <input type="text" id="skill" name="fname"><br><br>
  <label for="lname">New Tag:</label>
  <input type="text" id="tag" name="lname"><br><br>
</form>

<button id="go" onClick="go();">Go</button>

<p id="current"></p>

<hr>
<p id="skills"></p>

<script>

var currentTags = [];
window.addEventListener('load', (event) => {
  console.log('page is fully loaded');
  getSkills();
});

async function getSkills(){
    const response = await fetch('/API/QUERIES/PORTFOLIO/skills');
    const json = await response.json();
    skills = json;
    var finalString="";//JSON.stringify(skills);
    finalString = finalString + "<br>";
    console.log(skills);
    for (const [key, value] of Object.entries(skills)) {
  finalString = finalString + `<h3 style='display:inline;'>${key}:</h3><p style='display:inline'>`;
  for(var i =0; i < value.length; i ++){
      const tag = value[i];
      finalString = finalString + " " +tag + ",";
  }
  
  finalString = finalString + `</p><br>`;

}
    document.getElementById("skills").innerHTML = finalString;
}

async function getTags(s){
    const url = '/API/QUERIES/PORTFOLIO/skills.php?skill=' + s;
        console.log(url)
        const response = await fetch(url);
    const json = await response.json();
    currentTags = json;
    document.getElementById("current").innerHTML = JSON.stringify(json);
}

async function addTag(s,t){
 
    const url = '/API/QUERIES/PORTFOLIO/updateSkill.php?skillTag=' + encodeURIComponent(s + "|"+t);
    console.log(url);
    const response = await fetch(url);
    const json = await response.text();
    console.log(json);
    getTags(s);
        getSkills();
}

async function go(){
    const skill = document.getElementById("skill");
    const tag = document.getElementById("tag");
    const s = skill.value;
    const t = tag.value;

    if(t == ""){ //load skill
getTags(s);
    return;
    }else{
        //add skill
        console.log("add tag: " + tag);

addTag(s,t);
      
    }
}
</script>
</body>
</html>