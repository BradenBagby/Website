
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
    await loadInitial();

    //initially enable all skills
    setAllSkills(true);

    //setup initial portfolio
    await updatePortfolioUI();

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


function getSelectedSkills() {
    const skills = document.getElementsByClassName("skill");
    var final = [];
    for (var i = 0; i < skills.length; i++) {
        const skill = skills[i];
        if (skill.classList.contains("skill-enabled")) {
            final.push(skill.id);
        }
    }
    return final;
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



///////////////FILL IN PORTFOLIO

var portfolioTiles = {}; //[itemID : HTML]
var portfolioItems = {}; //item : [skills]


function portfolioElementFromId(portfolio_id){
    if(portfolioTiles[portfolio_id] == null){
        return null;
    }
    const el = document.createElement("div");
    el.classList.add("portfolio-tile");
    el.classList.add("col-12");
    el.id = portfolio_id;
    el.innerHTML = portfolioTiles[portfolio_id];
    return el;
}

async function updatePortfolioUI() {
    const enabledSkills = getSelectedSkills();

    var newElements = [];

    console.log(portfolioItems)
    for (var portfolio_id in portfolioItems) {
        const portfolio = portfolioItems[portfolio_id]
        //check if portfolio has a skill in the enabled skills
        var has = false;
        if (portfolio.skills != null) {
            for (var i = 0; i < portfolio.skills.length; i++) {
                const skill = portfolio.skills[i];
                if(enabledSkills.includes(skill)){
                    has = true;
                    break;
                }
            }
        }
        if(has){
            //show this item
            console.log("showing: " + portfolio_id + " - " + portfolio.name)
            if(portfolioTiles[portfolio_id] != null){
                newElements.push(portfolioElementFromId(portfolio_id));
            }
        }else{
            console.log("not showing: " + portfolio_id + " - " + portfolio.name)
        }
    }

    console.log(newElements);

    ///add each element to correct spot
    const root = document.getElementById("portfolio-tiles");
    for(var i = 0; i< newElements.length; i ++){
        const el = newElements[i];
        const id = el.id;
        root.appendChild(el);

        //using a timeout to give root time to parse element before setting the sklils
        setTimeout(function(){ 

            const skillList =  document.getElementById(id).getElementsByClassName("tile-skills-list")[0];
            const skills = portfolioItems[id].skills;
            for(skill of skills){
                const span = document.createElement("span");
                span.innerHTML = skill;
                skillList.appendChild(span);
            }
    }, 500);
    }


}

async function loadInitial() {

    //get all skill displays
    var response = await fetch('/API/QUERIES/PORTFOLIO/getPages.php');
    var json = await response.json();
    portfolioTiles = json;

    //get all items
    response = await fetch('/API/QUERIES/PORTFOLIO/items.php');
    json = await response.json();
    portfolioItems = json;

    console.log(portfolioItems);



}