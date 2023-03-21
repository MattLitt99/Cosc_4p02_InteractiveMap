// Filler data for the front end 
exhibit = 
{ 
    id: 1,
    name:"Lives of the Gods: Divinity in Maya Art",
    status:"0", 
    roomNumber:"303",
    year:"500 B.C",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    keywords:["one", "two", "three"],
    images:["img1","img2", "img3"]
};

var exhibits = [];
exhibits[0] = { 
    id: 1,
    name:"Lives of the Gods: Divinity in Maya Art",
    status:"0", 
    roomNumber:"303",
    year:"500 B.C",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    keywords:["one", "two", "three"],
    images:["img1","img2", "img3"]
};
exhibits[1] = { 
    id: 2,
    name:"African Religion from 400 A.D.",
    status:"0", 
    roomNumber:"107",
    year:"400 A.D",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    keywords:["one", "two", "three"],
    images:["img1","img2", "img3"]
};
exhibits[2] = { 
    id: 3,
    name:"Along the Water Front",
    status:"0", 
    roomNumber:"226",
    year:"1200",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    keywords:["one", "two", "three"],
    images:["img1","img2", "img3"]
};
exhibits[3] = { 
    id: 4,
    name:"Google Arts and Culture",
    status:"0", 
    roomNumber:"130",
    year:"500 B.C",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    keywords:["one", "two", "three"],
    images:["img1","img2", "img3"]
};


// Changes closes the viewing part of page and replaces it with form to edit
function openEditor(){
    console.log("We have clicked edit exhibit");
    viewLoad();
    document.getElementById("viewContainer").style.display = "none";
    document.getElementById("editContainer").style.display = "block";
}

function viewLoad(){
    // Creates object to get filler content from
    console.log("View page has loaded");

    //Write the information from the javascript object to the HTML document
    document.getElementById("exhibitHeadline").innerHTML = exhibit.name;
    document.getElementById("idDisplay").innerHTML = '<span class="bold"> Exhibit ID: </span> '+exhibit.id;
    document.getElementById("exhibitDescription").innerHTML = exhibit.description;
    document.getElementById("roomNumberDisplay").innerHTML = '<span class="bold"> Room Number: </span> '+exhibit.roomNumber;
    document.getElementById("status").selectedIndex = exhibit.status;
    document.getElementById("yearDisplay").innerHTML = '<span class="bold"> Year: </span> '+exhibit.year;

    //populates name field
    document.getElementById("exhibitNameField").value=exhibit.name;

    //populates room number field
    document.getElementById("roomNumField").value=exhibit.roomNumber;

    //populates room number field
    document.getElementById("yearField").value=exhibit.year;

    //Populates status dropdown field
    if ( exhibit.status == "0" ) {
        document.getElementById("status").selectedIndex = 0;
    }
    else if (exhibit.status == "1") {
        document.getElementById("status").selectedIndex = 1;
    }
    else if (exhibit.status == "2"){
        document.getElementById("status").selectedIndex = 2;
    }
    else {
        document.getElementById("status").selectedIndex = 3;
    }

    //Populates description
    document.getElementById("descriptionTextarea").value=exhibit.description;
}

// Gets data from the form and saves them to object attributes
function saveExhibit() {
    var temp;

    temp = document.getElementById("exhibitNameField");
    exhibit.name = temp.value;

    temp = document.getElementById("status");
    exhibit.status = temp.selectedIndex;

    temp = document.getElementById("roomNumField");
    exhibit.roomNumber = temp.value;

    temp = document.getElementById("yearField");
    exhibit.year = temp.value;

    temp = document.getElementById("descriptionTextarea");
    exhibit.description = temp.value;
    console.log(exhibit);

    document.getElementById("viewContainer").style.display = "block";
    document.getElementById("editContainer").style.display = "none";

    viewLoad();
}

//Handles functionality for searching in the navBar
function navSearch(){
    var temp;
    temp = document.getElementById("navSearchBar");
    // If the search textbox is invisible then make it visible
    if ( temp.style.display == "" ) {
        temp.style.display = "inline-block";
    }
    //if searchbar has no text in it and icon is clicked, make searchbar invisible
    else if ( temp.value == "" ) {
        temp.style.display = "";
    }
    // If searchbar is visible and has text complete the search
    else {
        console.log("Search for "+temp.value);
    }
}

//Creates table to display exhibits
function loadExhibitsList(){
    var table, row;
    // Each iteration creates one row of the tabele
     for (let m = 0; m < exhibits.length; m++ ){
        row = document.createElement("tr");
        var tds = [];
        //creates and populates array of td HTML elements
        for ( var i = 0; i < 5; i++ ) {
            tds[i] = document.createElement("td");
        }
        //So the Name of the exhibit is a link
        aName = document.createElement("a");
        aName.innerHTML = exhibits[m].name;
        aName.href="viewExhibit.html";

        //creates and populates array of the exhibits attributes
        var data = [];
        data[0] = document.createTextNode(exhibits[m].id);
        //skip data[1]
        data[2] = document.createTextNode(exhibits[m].year);
        data[3] = document.createTextNode(exhibits[m].status);
        data[4] = document.createTextNode(exhibits[m].roomNumber);

        // adds each attribute to a td object
        for ( var i = 0; i < 5; i++ ) {
            // use link element if it's the name
            if ( i == 1) {
                tds[i].appendChild(aName);
            }
            else {
                tds[i].appendChild(data[i]);
            }
        }
        
        //adds the td objects to one row
        for ( var i = 0; i < 5; i++ ) {
            row.appendChild(tds[i]);
        }

        //adds the row to the table
        table = document.getElementById("viewExhibitsTable");
        table.appendChild(row);
     }
}

function addExhibit(){
    //code for adding exhibit the database and linking to the viewExhibit page populated with that data
}