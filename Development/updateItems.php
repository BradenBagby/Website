<html>

<head>

    <style>
        .exists {
            background-color: green;

        }

        span {
            background-color: red;
            margin: 8px;
        }

        span:hover {
            cursor: pointer;
        }
    </style>
</head>

<body>

    <select name="cars" id="dropdown">
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
    </select>

    <div id="skillsList">


    </div>



</body>


<script>
    var portfolioItems = {};
    var skills = {};
    var items = {};


    window.addEventListener('DOMContentLoaded', async (event) => {

        const dropdown = document.getElementById("dropdown");


        //get all items
        var response = await fetch('/API/QUERIES/PORTFOLIO/items.php');
        var json = await response.json();
        portfolioItems = json;

        response = await fetch('/API/QUERIES/PORTFOLIO/skills');
        json = await response.json();
        skills = json;

        for (const property in portfolioItems) {
            console.log(`${property}`);
            items[property.replace("id_", "")] = portfolioItems[property].name;
        }


        //fill dropdown
        var html = "";
        for (const id in items) {
            const name = items[id];
            var next = "<option value='" + id + "'>" + name + "</option>";
            html = html + next;
        }

        dropdown.innerHTML = html;

        dropdown.addEventListener('change', function() {
            console.log(this.value)
            setup();
        });


        //fill in dropdown
        setup();
    });





    async function setup() {

        const dropdown = document.getElementById("dropdown");

        //get all items
        var response = await fetch('/API/QUERIES/PORTFOLIO/items.php');
        var json = await response.json();
        portfolioItems = json;

        response = await fetch('/API/QUERIES/PORTFOLIO/skills');
        json = await response.json();
        skills = json;

        for (const property in portfolioItems) {
            console.log(`${property}`);
            items[property.replace("id_", "")] = portfolioItems[property].name;
        }

        // console.log("-------")
        // console.log(items)





        const skillsList = document.getElementById("skillsList");
        // console.log(skills)
        var finalHTML = "";
        for (var skill in skills) {

            var n = "<span onclick=\"addSkill('" + skill + "')\" id='skill_" + skill + "'>" + skill + "</span>"
            finalHTML = finalHTML + n;
            // console.log(skill);
        }

        skillsList.innerHTML = finalHTML;



        const selectedSkill = "id_" + document.getElementById("dropdown").value;
        //console.log(selectedSkill)
        const data = portfolioItems[selectedSkill];
        //console.log(data)

        const s = data.skills;

        //clear all
        const all = document.getElementsByTagName("span");
        for (var a of all) {
            a.classList.remove("exists");
        }

        for (skill of s) {
            document.getElementById("skill_" + skill).classList.add("exists");
        }

    }



    async function addSkill(id) {
        console.log("adding skill: " + id);
        const current = document.getElementById("skill_" + id).classList.contains("exists");
        const item = document.getElementById("dropdown").value;
        console.log("add skill: " + id + " to item: " + item);
        //TODO: allow remove. for now not doing it
        //set active or remove
        const url = '/API/QUERIES/PORTFOLIO/updateItem?itemSkill=' + encodeURIComponent(id + "|" + item) + "&remove=" + current;
        console.log(url)
        const response = await fetch(url);
        setup();

    }
</script>


</html>