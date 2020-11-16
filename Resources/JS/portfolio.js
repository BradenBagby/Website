
var skills = {};

window.addEventListener('DOMContentLoaded', async (event) => {
    console.log('DOM fully loaded and parsed');



    /*const skills = document.getElementsByClassName("skill");
    for(var i = 0; i < skills.length; i ++){
        const skill = skills[i];
        skill.style.fontSize = (18 + (Math.random() * 24)) + "px";
        
    }*/


    await getSkills();
    await placeSkills();

    //initially enable all skills
    setAllSkills(true);

    //setup click skill listener
    setupListeners();


});



///SETUP/////////////////
async function getSkills() {
    const response = await fetch('/API/QUERIES/PORTFOLIO/skills');
    const json = await response.json();
    skills = json;
}


function placeSkills() {
    const root = document.getElementById("skillsList");
    skillsList.innerHTML = "";
    for (const [key, value] of Object.entries(skills)) {
        const newSkillElement = skillElement(key);
        skillsList.appendChild(newSkillElement);
    }
}

function isSkillEnabled(skillButton) {
    return
}

function setupListeners() {
    const skills = document.getElementsByClassName("skill");
    for (var i = 0; i < skills.length; i++) {
        const skill = skills[i];
        skill.removeEventListener('click', clickedSkill); //not sure how js would handle du[licate listeners if we ever call this function twice for some reason
        skill.addEventListener('click', clickedSkill);
    }

    const search = document.getElementById('skillSearch');
    search.addEventListener('input', function (evt) {
        filterSkills(this.value);
    });

    const custom = document.getElementById('custom-search');
    custom.addEventListener('click', function (e) {
        flipAll(true);
    });
}



////////////////////ENABLE DISABLE SKILLS

function flipAll(actually) {

    const custom = document.getElementById('custom-search');

    if (actually) {
        //click or unclick all based on current reading
        if (custom.innerHTML == "None") {
            setAllSkills(false);
            custom.innerHTML = "All";
        } else {
            setAllSkills(true);

            custom.innerHTML = "None";
        }


    } else { //just updating the UID
        /*  const skills = document.getElementsByClassName("skill");
          var saw = false;
          for (var i = 0; i < skills.length; i++) {
              const skill = skills[i];
              if (isSkillEnabled(skill)) {
                  saw = true;
              }
          }
  
          if(saw){
          custom.innerHTML = "None";
          }else{
      custom.innerHTML = "All";
          }*/

    }







}

function clickedSkill(e) {
    const skill = this;
    const id = skill.id;
    const enabled = skill.classList.contains("skill-enabled");
    console.log("clicked skill: " + id);

    setSkillEnabled(skill, !enabled);
}


function setAllSkills(on) {
    const skills = document.getElementsByClassName("skill");
    for (var i = 0; i < skills.length; i++) {
        const skill = skills[i];
        setSkillEnabled(skill, !on);
        setSkillEnabled(skill, on);
        setSkillBig(skill, false);
    }
}

function setSkillEnabled(skill, enabled) {
    const remove = enabled ? "skill-disabled" : "skill-enabled";
    const add = enabled ? "skill-enabled" : "skill-disabled";
    skill.classList.remove(remove);
    skill.classList.add(add);

}

function setSkillBig(skill, big) {
    if (big) {
        skill.classList.add("skill-big");
    } else {
        skill.classList.remove("skill-big");

    }
}
/////////////////////////////////////////
//////////////////SEARCH SKILLS///////////////

function filterSkills(filter) {
    filter = filter.toLowerCase();

    ///start by showing all skills
    setAllSkills(true);

    //now if filter is nothing, end
    if (filter == null || filter == "") {
        return;
    }

    //otherwise, loop through all skills and if that skill doesnt contain search query then hide it
    //note: database we may want to add tags to each skill to popup in a search
    for (const [key, value] of Object.entries(skills)) {
        const originalSkill = key;
        const skill = String(key).toLocaleLowerCase();
        if (skill.indexOf(filter) != -1) {
            setSkillBig(document.getElementById(originalSkill), true)

            continue;
        }

        //look in subtags
        if (value != null && value.length > 0) {
            var found = false;
            for (x of value) {
                x = String(x).toLowerCase();
                if (x.indexOf(filter) != -1) {
                    found = true;
                    break;
                }
            }
            if (found) {
                continue;
            }
        }

        setSkillEnabled(document.getElementById(originalSkill), false);
    }
    //also remove capitalizations
}


//////////////UI CREATION

function skillElement(skill) {
    const skillElement = document.createElement('div');
    skillElement.id = skill;
    skillElement.classList.add("skill");
    const spanElement = document.createElement("span");
    spanElement.innerHTML = "" + skill;
    skillElement.appendChild(spanElement);
    return skillElement;
}