///LITERALLY JUST DUPLICATE CODE FROM PORTFOLIO.JS NEED TO MAKE A COMMON FILE SOMETIME. BUT IN A RUSH TO GET RESUME OUT

function showAll() {
    const all = document.getElementsByClassName("p-hidden");

    const l = all.length;
    for (var x = 0; x < l; x++) {

        //really weird shit going on here. seems like showChildren is removing its elements when i remove the classlist
        while (x >= all.length) {
            x -= 1;
        }
        if (x < 0) {
            break;
        }
        const el = all[x];

        el.classList.remove("p-hidden");
    }
    const hidden = document.getElementsByClassName("p-hidden-overlay")[0];
    hidden.classList.remove("p-hidden-overlay")
    hidden.id = "hidden-done";
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



window.addEventListener('load', (event) => {
    showAll();
    portfolioSetupGalleries();
});