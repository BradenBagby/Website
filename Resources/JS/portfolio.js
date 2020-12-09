var skills = {};
var firstClick = true;

window.addEventListener('DOMContentLoaded', async(event) => {




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
    await portfolioSetupGalleries();

    setAllSkills(false);

    //setup click skill listener
    setupListeners();

    //now reveal everythin and remove loader
    showWhenDoneLoading()


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
    search.addEventListener('input', function(evt) {
        filterSkills(this.value);
        filterItems();
    });

    const custom = document.getElementById('custom-search');
    custom.addEventListener('click', function(e) {
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

    //first click we want to select the click
    if (firstClick) {
        console.log("first click");
        setAllSkills(false);
        firstClick = false;
    }

    const skill = this;
    const id = skill.id;
    const enabled = skill.classList.contains("skill-enabled");
    console.log("clicked skill: " + id);

    setSkillEnabled(skill, !enabled);
    filterItems();
}


function setAllSkills(on) {
    const skills = document.getElementsByClassName("skill");
    for (var i = 0; i < skills.length; i++) {
        const skill = skills[i];
        setSkillEnabled(skill, !on);
        setSkillEnabled(skill, on);
        setSkillBig(skill, false);
    }
    filterItems();
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
        setAllSkills(false); //default to nothing now
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

function filterItems() {



    ///now we need to filter visible items
    //get all skills
    const allSkills = document.getElementsByClassName("skill");
    var enabledSkills = [];
    for (const s of allSkills) {
        if (s.classList.contains("skill-big") || s.classList.contains("skill-enabled")) {
            enabledSkills.push(s.id);
        }
    }



    //get all portfolio tiles and enable all of them
    const ports = document.getElementsByClassName("portfolio-tile");
    for (const port of ports) {
        const itemId = port.id.replace("id_", "");

        const pskills = portfolioItems["id_" + itemId].skills;



        var found = false;
        for (const enabledSkill of enabledSkills) {

            if (pskills.includes(enabledSkill)) {
                found = true;
                break;
            }
        }

        if (found) {
            port.classList.remove("d-none");
        } else {
            port.classList.add("d-none");
        }

    }
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


function portfolioElementFromId(portfolio_id) {
    if (portfolioTiles[portfolio_id] == null) {
        return null;
    }
    const el = document.createElement("div");
    el.classList.add("portfolio-tile");
    el.classList.add("col-12");
    el.id = portfolio_id;
    el.innerHTML = portfolioTiles[portfolio_id];
    return el;
}


function nextPage(imageID, folder, page = null, next = false) {
    console.log("next page image id: " + imageID + " folder: " + folder + " Page: " + page);
    //if page i null use next.
    var nextImageURL = "";
    const imgEl = document.getElementById(imageID);

    const items = portfolioGalleries[folder];

    if (page == null) {

        //find current index
        const currentLink = imgEl.src;

        for (var i = 0; i < items.length; i++) {

            //url becomes reformatted from img element 
            var item = items[i];
            const slash = item.lastIndexOf("/");
            item = item.substring(slash);

            if (currentLink.includes(item)) {
                break;
            }
        }



        i += next ? 1 : -1;
        if (i >= items.length) {
            i = 0;
        }

        if (i < 0) {
            i = items.length - 1;
        }



        nextImageURL = items[i];

    } else {

        nextImageURL = items[page];


    }

    imgEl.src = nextImageURL;

}

function galleryFullscreen(id) {

    console.log("go fullscreen: " + id);
    const doc = document.getElementById(id);
    console.log(doc)
    const isFull = doc.classList.contains("title-gallery-fullscreen");
    console.log(isFull);
    if (!isFull) {
        doc.classList.add("title-gallery-fullscreen");
    } else {
        doc.classList.remove("title-gallery-fullscreen");
    }
}

function galleryElement(size, folder, id) {
    //create gallery with correct navigation for this size
    const nav = document.createElement("nav");
    const ul = document.createElement("ul");
    ul.classList.add("pagination");
    nav.appendChild(ul);

    //create next
    const next = document.createElement("li");
    next.classList.add("page-item");
    const a = document.createElement("a");
    a.classList.add("page-link");

    a.innerHTML = "Next";
    a.addEventListener("click", function() { nextPage(id, folder, null, true); });
    next.appendChild(a);


    //create previous
    const previous = document.createElement("li");
    previous.classList.add("page-item");
    const ap = document.createElement("a");
    ap.classList.add("page-link");
    ap.innerHTML = "Previous";
    ap.addEventListener("click", function() { nextPage(id, folder, null, false); });
    previous.appendChild(ap);


    //append previous first
    ul.appendChild(previous);

    //now create up to 3 in betweeners
    console.log("size: " + size)
    for (var i = 0; i < size; i++) {


        var dots = null; //we want dots in between 1 and 3 if theres 3
        if (i == 1 && size >= 3) {
            dots = "...";
        }



        if (i >= 3) {
            break;
        }

        if (i == 2 && size >= 3) {
            i = size - 1;
        }

        //create previous
        const mid = document.createElement("li");
        mid.classList.add("page-item");
        const am = document.createElement("a");
        am.classList.add("page-link");
        am.innerHTML = dots == null ? ("" + (i + 1)) : dots;
        if (dots == null) {
            const newPage = i;
            am.addEventListener("click", function() {
                //alert("page " + newPage + " " + folder + " chagne to id: " + id);
                nextPage(id, folder, newPage, false);
            });
        }
        mid.appendChild(am);
        ul.appendChild(mid);
    }


    ul.appendChild(next);

    return nav;

}


var portfolioGalleries = {};
async function portfolioSetupGalleries() {
    const galleries = document.getElementsByClassName("tile-pagination");
    for (var gallery of galleries) {
        try {
            const galleryFolder = gallery.getAttribute('data-folder');
            const imageID = gallery.getAttribute('data-imgID');

            const galURL = '/API/QUERIES/PORTFOLIO/getGallery.php?folder=' + galleryFolder;
            console.log(galURL)
            var response = await fetch(galURL);
            var json = await response.json();
            if (json == null || json.length < 1) {
                return;
            }
            portfolioGalleries[galleryFolder] = json;
            const size = json.length;
            console.log(galleryFolder + ": " + size);
            const galleryEl = galleryElement(size, galleryFolder, imageID);
            gallery.appendChild(galleryEl);
            //fill in first image
            const imageElement = document.getElementById(imageID);
            if (json.length > 0) {
                imageElement.src = json[0];
            }

        } catch (ex) {
            console.log("Creating gallery error: " + galleryFolder + " - " + ex);
        }
    }



    ///setup expandeers

    const hiddens = document.getElementsByClassName("p-hidden-overlay");

    const totalLength = hiddens.length;
    for (var i = 0; i < totalLength; i++) {

        //really weird shit going on here. seems like hiddens is removing its elements when i remove the classlist
        while (i >= hiddens.length) {
            i -= 1;
        }
        if (i < 0) {
            break;
        }


        const hidden = hiddens[i];

        hidden.classList.remove("p-hidden-overlay")
        const overlayer = hidden.parentElement;


        const showChildren = overlayer.getElementsByClassName("p-hidden");


        if (showChildren.length > 0) {

            //show overlay on hover
            overlayer.addEventListener("mouseover", function(event) {
                var e = event.toElement || event.relatedTarget;
                if (e == null || e.parentNode == this || e == this || hidden.id == "hidden-done") {
                    return;
                }
                if (hidden.classList.contains("p-hidden-overly") == false) {
                    hidden.classList.add("p-hidden-overlay");
                }
            }, false);

            //remove overlay on exit
            overlayer.addEventListener("mouseleave", function(event) {
                var e = event.toElement || event.relatedTarget;
                if (e == null || e.parentNode == this || e == this || hidden.id == "hidden-done") {
                    return;
                }
                hidden.classList.remove("p-hidden-overlay");

            }, false);


            //expand on click
            overlayer.addEventListener("click", function(event) {

                console.log("should expand")
                console.log(showChildren)
                const l = showChildren.length;
                for (var x = 0; x < l; x++) {

                    //really weird shit going on here. seems like showChildren is removing its elements when i remove the classlist
                    while (x >= showChildren.length) {
                        x -= 1;
                    }
                    if (x < 0) {
                        break;
                    }
                    const el = showChildren[x];

                    el.classList.remove("p-hidden");
                }

                hidden.classList.remove("p-hidden-overlay")
                hidden.id = "hidden-done";

            }, false);
        }
    }
}

function showWhenDoneLoading() {
    const loader = document.getElementById("loaderElement"); //remove loadr

    if (loader != null) {
        loader.classList.remove("loader");
        loader.innerHTML = "";
        document.getElementById("portfolio-tiles").classList.remove("d-none");
        document.getElementById("skillsList").classList.remove("d-none");
    }


}

async function updatePortfolioUI() {
    const enabledSkills = getSelectedSkills();

    var newElements = [];


    for (var portfolio_id in portfolioItems) {
        const portfolio = portfolioItems[portfolio_id]
            //check if portfolio has a skill in the enabled skills
        var has = false;
        if (portfolio.skills != null) {
            for (var i = 0; i < portfolio.skills.length; i++) {
                const skill = portfolio.skills[i];
                if (enabledSkills.includes(skill)) {
                    has = true;
                    break;
                }
            }
        }
        if (has) {
            //show this item
            // console.log("showing: " + portfolio_id + " - " + portfolio.name)
            if (portfolioTiles[portfolio_id] != null) {
                newElements.push(portfolioElementFromId(portfolio_id));
            }
        } else {
            // console.log("not showing: " + portfolio_id + " - " + portfolio.name)
        }




    }

    // console.log(newElements);

    ///add each element to correct spot
    const root = document.getElementById("portfolio-tiles");
    for (var i = 0; i < newElements.length; i++) {
        const el = newElements[i];
        const id = el.id;
        root.appendChild(el);

        //using a timeout to give root time to parse element before setting the sklils
        setTimeout(function() {

            const skillList = document.getElementById(id).getElementsByClassName("tile-skills-list")[0];
            const skills = portfolioItems[id].skills;
            for (skill of skills) {
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

    //console.log(portfolioItems);



}