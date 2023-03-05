// Filler data for the front end 

exhibit = 
{ 
    name:"Lives of the Gods: Divinity in Maya Art",
    status:"1", 
    roomNumber:"303",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
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
    document.getElementById("exhibitDescription").innerHTML = exhibit.description;
    document.getElementById("roomNumberDisplay").innerHTML = '<span class="bold"> Room Number: </span> '+exhibit.roomNumber;
    document.getElementById("status").selectedIndex = exhibit.status;

    //populates name field
    document.getElementById("exhibitNameField").value=exhibit.name;

    //populates room number field
    document.getElementById("roomNumField").value=exhibit.roomNumber;

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

    temp = document.getElementById("descriptionTextarea");
    exhibit.description = temp.value;
    console.log(exhibit);

    document.getElementById("viewContainer").style.display = "block";
    document.getElementById("editContainer").style.display = "none";

    viewLoad();
}