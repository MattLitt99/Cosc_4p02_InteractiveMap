
// Changes closes the viewing part of page and replaces it with form to edit
function openEditor() {
    console.log("We have clicked edit exhibit");
    document.getElementById("viewContainer").style.display = "none";
    document.getElementById("editContainer").style.display = "block";
}

function viewLoad(id, exhibit) {
    // Creates object to get filler content from
    console.log("View page has loaded");

    //Write the information from the javascript object to the HTML document
    document.getElementById("exhibitHeadline").innerHTML = exhibit.Title;
    document.getElementById("idDisplay").innerHTML = '<span class="bold"> Exhibit Room Number: </span> ' + id;
    document.getElementById("exhibitDescription").innerHTML = exhibit.Desc;
    document.getElementById("roomNumberDisplay").innerHTML = '<span class="bold"> Floor: </span> ' + exhibit.Floor;
    const t = exhibit.Status;

    if (t == "inactive-cleaning") {
        document.getElementById("statusHolder").innerHTML = "Inactive: Cleaning";
    } else if (t == "inactive-viewing") {
        document.getElementById("statusHolder").innerHTML = "Inactive: Private Viewing";
    } else if (t == "inactive-closed") {
        document.getElementById("statusHolder").innerHTML = "Closed";
    } else {
        document.getElementById("statusHolder").innerHTML = "Active";
    }



    document.getElementById("status").selectedIndex = exhibit.Status;
    document.getElementById("yearDisplay").innerHTML = '<span class="bold"> Year: </span> ' + exhibit.Date;
    document.getElementById("exhibitKeyWords").innerHTML = exhibit.Keywords.toString().replaceAll(',', ', ');
    document.getElementById("imgNameHolder").innerHTML = exhibit.Images[0];

    //populates name field
    document.getElementById("exhibitNameField").value = exhibit.Title;

    //populates room number field
    document.getElementById("roomNumField").value = exhibit.Floor;

    //populates room number field
    document.getElementById("yearField").value = exhibit.Date;

    //Populates status dropdown field
    if (exhibit.status == "0") {
        document.getElementById("status").selectedIndex = 0;
    }
    else if (exhibit.status == "1") {
        document.getElementById("status").selectedIndex = 1;
    }
    else if (exhibit.status == "2") {
        document.getElementById("status").selectedIndex = 2;
    }
    else {
        document.getElementById("status").selectedIndex = 3;
    }

    //Populates description
    document.getElementById("descriptionTextarea").value = exhibit.Desc;
    document.getElementById("keywordsTextarea").value = exhibit.Keywords.toString().replaceAll(',', ', ');

}

//Handles functionality for searching in the navBar
function navSearch() {
    var temp;

    temp = document.getElementById("navSearchBar");
    var temp1 = document.getElementById("advSearch");
    // If the search textbox is invisible then make it visible
    if (temp.style.display == "") {
        temp.style.display = "inline-block";
        temp1.style.display = "inline-block";
    }
    //if searchbar has no text in it and icon is clicked, make searchbar invisible
    else if (temp.value == "") {
        temp.style.display = "";
        temp1.style.display = "";
    }
    // If searchbar is visible and has text complete the search
    else {
        var toSearch = temp.value;
        window.location.replace("search.html?search=" + toSearch);
    }
}

//Creates table to display exhibits
function loadExhibitsList(exhibits) {
    var table, row;
    // Each iteration creates one row of the tabele
    for (const [ID, exhibit] of Object.entries(exhibits)) {
        row = document.createElement("tr");
        var tds = [];
        //creates and populates array of td HTML elements
        for (var i = 0; i < 5; i++) {
            tds[i] = document.createElement("td");
        }
        //So the Name of the exhibit is a link
        aName = document.createElement("a");
        aName.innerHTML = exhibit.Title;
        aName.href = "viewExhibit.html?ID=" + ID;
        //creates and populates array of the exhibits attributes
        var data = [];
        data[0] = document.createTextNode(ID);
        //skip data[1]
        data[2] = document.createTextNode(exhibit.Date);
        data[3] = document.createTextNode(exhibit.Status);
        data[4] = document.createTextNode(exhibit.Floor);
        // adds each attribute to a td object
        for (var i = 0; i < 5; i++) {
            // use link element if it's the name
            if (i == 1) {
                tds[i].appendChild(aName);
            }
            else {
                tds[i].appendChild(data[i]);
            }
        }
        //adds the td objects to one row
        for (var i = 0; i < 5; i++) {
            row.appendChild(tds[i]);
        }

        //adds the row to the table
        table = document.getElementById("viewExhibitsTable");
        table.appendChild(row);
    }
}

// Added code below
function checkUserStatus(){
    if(document.cookie != "///" && document.cookie.length > 0){
        let decodedCookie = decodeURIComponent(document.cookie);
        let userInfo = decodedCookie.split('/');
        var UID = userInfo[0];
        var name = userInfo[1];
        var accessLevel = userInfo[2];

        const listItem = document.createElement("li");
        const refLink = document.createElement("a");
        const imageLink = document.createElement("img");

        const text = document.createTextNode(name);
        refLink.href = "accountoverview.html";
        imageLink.className = "navUser navIcon";
        imageLink.src = "images/user.png";
        refLink.appendChild(text);
        refLink.appendChild(imageLink);
        listItem.appendChild(refLink);
        const element = document.getElementById("navLinksContainer");
        element.appendChild(listItem);



    } else if (document.cookie.length == 0 || document.cookie == "///") {
        const listItem = document.createElement("li");
        const refLink = document.createElement("a");
        const imageLink = document.createElement("img");

        const loginText = document.createTextNode("Login");
        refLink.href = "login.html";
        imageLink.className = "navUser navIcon";
        imageLink.src = "images/user.png";
        refLink.appendChild(loginText);
        refLink.appendChild(imageLink);
        listItem.appendChild(refLink);
        const element = document.getElementById("navLinksContainer");
        element.appendChild(listItem);
    }

}

function checkUserStatusExhibitList(){
    if(document.cookie != "///" && document.cookie.length > 0){
        let decodedCookie = decodeURIComponent(document.cookie);
        let userInfo = decodedCookie.split('/');
        var UID = userInfo[0];
        var name = userInfo[1];
        var accessLevel = userInfo[2];
        var uidNum = userInfo[3];

        const listItem = document.createElement("li");
        const refLink = document.createElement("a");
        const imageLink = document.createElement("img");

        const text = document.createTextNode(name);
        refLink.href = "accountoverview.html";
        imageLink.className = "navUser navIcon";
        imageLink.src = "images/user.png";
        refLink.appendChild(text);
        refLink.appendChild(imageLink);
        listItem.appendChild(refLink);
        const element = document.getElementById("navLinksContainer");
        element.appendChild(listItem);

        if(accessLevel == "Curator" || accessLevel == "Admin"){
          const addEx = document.createElement("a");
          const element2 = document.getElementById("AddExhibitContainer");
          addEx.href = "addExhibit.html";
          addEx.id = "addExhibit";
          addEx.className = "button solid";
          const exText = document.createTextNode("Add Exhibit");
          addEx.appendChild(exText);
          element2.appendChild(addEx);
        }
        




    } else if (document.cookie.length == 0 || document.cookie == "///") {
        const listItem = document.createElement("li");
        const refLink = document.createElement("a");
        const imageLink = document.createElement("img");

        const text = document.createTextNode("Login");
        refLink.href = "login.html";
        imageLink.className = "navUser navIcon";
        imageLink.src = "images/user.png";
        refLink.appendChild(text);
        refLink.appendChild(imageLink);
        listItem.appendChild(refLink);
        const element = document.getElementById("navLinksContainer");
        element.appendChild(listItem);
    }
}

function checkUserStatusViewExhibit(){
    if(document.cookie != "///" && document.cookie.length > 0){
        let decodedCookie = decodeURIComponent(document.cookie);
        let userInfo = decodedCookie.split('/');
        var UID = userInfo[0];
        var name = userInfo[1];
        var accessLevel = userInfo[2];

        const listItem = document.createElement("li");
        const refLink = document.createElement("a");
        const imageLink = document.createElement("img");

        const text = document.createTextNode(name);
        refLink.href = "accountoverview.html";
        imageLink.className = "navUser navIcon";
        imageLink.src = "images/user.png";
        refLink.appendChild(text);
        refLink.appendChild(imageLink);
        listItem.appendChild(refLink);
        const element = document.getElementById("navLinksContainer");
        element.appendChild(listItem);

        if(accessLevel == "Curator" || accessLevel == "Admin"){
          const editEx = document.createElement("a");
          const element2 = document.getElementById("editor");
          editEx.className = "button outlined";
          editEx.setAttribute("onclick","openEditor()");
          const exText = document.createTextNode("Edit Exhibit");
          editEx.appendChild(exText);
          element2.appendChild(editEx);
        }
        




    } else if (document.cookie.length == 0 || document.cookie == "///") {
        const listItem = document.createElement("li");
        const refLink = document.createElement("a");
        const imageLink = document.createElement("img");

        const text = document.createTextNode("Login");
        refLink.href = "login.html";
        imageLink.className = "navUser navIcon";
        imageLink.src = "images/user.png";
        refLink.appendChild(text);
        refLink.appendChild(imageLink);
        listItem.appendChild(refLink);
        const element = document.getElementById("navLinksContainer");
        element.appendChild(listItem);
    }
}

function checkUserStatusAccountView(){
    if(document.cookie != "///" && document.cookie.length > 0){
        let decodedCookie = decodeURIComponent(document.cookie);
        let userInfo = decodedCookie.split('/');
        var UID = userInfo[0];
        var name = userInfo[1];
        var accessLevel = userInfo[2];
        var uidNum = userInfo[3];

        const listItem = document.createElement("li");
        const refLink = document.createElement("a");
        const imageLink = document.createElement("img");

        const text = document.createTextNode(name);
        refLink.href = "accountoverview.html";
        imageLink.className = "navUser navIcon";
        imageLink.src = "images/user.png";
        refLink.appendChild(text);
        refLink.appendChild(imageLink);
        listItem.appendChild(refLink);
        const element = document.getElementById("navLinksContainer");
        element.appendChild(listItem);

        const nameItem = document.createElement("td");
        const uidItem = document.createElement("td");
        const accesslevelItem = document.createElement("td");

        const nameText = document.createTextNode(name);
        const uidText = document.createTextNode(uidNum);
        const accesslevelText = document.createTextNode(accessLevel);

        const userName = document.getElementById("userName");
        const userID = document.getElementById("userID");
        const userAccessLevel = document.getElementById("userAccessLevel");

        nameItem.appendChild(nameText);
        userName.appendChild(nameItem);

        uidItem.appendChild(uidText);
        userID.appendChild(uidItem);

        accesslevelItem.appendChild(accesslevelText);
        userAccessLevel.appendChild(accesslevelItem);

    } else if (document.cookie.length == 0 || document.cookie == "///") {
        const listItem = document.createElement("li");
        const refLink = document.createElement("a");
        const imageLink = document.createElement("img");

        const text = document.createTextNode("Login");
        refLink.href = "login.html";
        imageLink.className = "navUser navIcon";
        imageLink.src = "images/user.png";
        refLink.appendChild(text);
        refLink.appendChild(imageLink);
        listItem.appendChild(refLink);
        const element = document.getElementById("navLinksContainer");
        element.appendChild(listItem);
    }
}

