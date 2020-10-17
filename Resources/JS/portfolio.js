window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');



    /*const skills = document.getElementsByClassName("skill");
    for(var i = 0; i < skills.length; i ++){
        const skill = skills[i];
        skill.style.fontSize = (18 + (Math.random() * 24)) + "px";
        
    }*/

    //initially enable all skills
    enableAllSkills();

    //setup click skill listener
    setupSkillClickListener();


});








////////////////////ENABLE DISABLE SKILLS
function setupSkillClickListener() {
    const skills = document.getElementsByClassName("skill");
    for (var i = 0; i < skills.length; i++) {
        const skill = skills[i];
        skill.removeEventListener('click', clickedSkill); //not sure how js would handle du[licate listeners if we ever call this function twice for some reason
        skill.addEventListener('click', clickedSkill);

    }
}

function clickedSkill(e) {
    const skill = this;
    const id = skill.id;
    const enabled = skill.classList.contains("skill-enabled");
    console.log("clicked skill: " + id);

    setSkillEnabled(skill,!enabled);
}


function enableAllSkills() {
    const skills = document.getElementsByClassName("skill");
    for (var i = 0; i < skills.length; i++) {
        const skill = skills[i];
       setSkillEnabled(skill,true);
    }
}

function setSkillEnabled(skill,enabled){
    const remove = enabled ?  "skill-disabled" : "skill-enabled";
    const add = enabled ? "skill-enabled" : "skill-disabled";
    skill.classList.remove(remove);
    skill.classList.add(add);

}
/////////////////////////////////////////
//////////////////SEARCH SKILLS///////////////

function filterSkills(filter){
 ///start by showing all skills

 //now if filter is nothing, end

 //otherwise, loop through all skills and if that skill doesnt contain search query then hide it
 //note: database we may want to add tags to each skill to popup in a search
 //also remove capitalizations
}