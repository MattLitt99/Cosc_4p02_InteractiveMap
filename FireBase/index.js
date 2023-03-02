

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

/**
 * Here is the firebase setup
 */
const firebaseConfig = {
	apiKey: "AIzaSyCm9-YxifpEbVuBYOh3GukLka4cenJYw84",
	authDomain: "cosc4p02-mesuemmap.firebaseapp.com",
	projectId: "cosc4p02-mesuemmap",
	storageBucket: "cosc4p02-mesuemmap.appspot.com",
	messagingSenderId: "235500180144",
	appId: "1:235500180144:web:6b3bf1fb3ff3c50c80a175",
	databaseURL: "https://cosc4p02-mesuemmap-default-rtdb.firebaseio.com/"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
const storage = getStorage(app);

// Set db variable to the roo of the database
const db = getDatabase();


// set f1 to the body of the html document
var f1 = document.getElementById("f1");
// set the currentfloor variable so that it changes every time the user selects a different level
var currentFloor = document.getElementById("currentFloorLevel");
// set the floor 1 variable so that when the user clicks on the h3 element it calls the goToFloor1 function
var floor1 = document.getElementById("Floor1")
// set the floor 2 variable so that when the user clicks on the h3 element it calls the goToFloor2 function
var floor2 = document.getElementById("Floor2");
// set the container variable for the html component that has all of the exhibit buttons
var container = document.getElementById("container");

//var exhibits = document.getElementById("exhibits");
// set the Title variable so that when the user selects a new exhibit the title changes
var Title = document.getElementById("Title");
// set the exPic variable so that when the user selects a new exhibit the picture changes
var exPic = document.getElementById("exPic");
// set the desc variable so that when the user selects a new exhibit the description changes
var desc = document.getElementById("desc");

var insertDiv = document.createElement('div');

// Set the buttons for all exibits on floor 1
var F1EX1 = document.getElementById("F1EX1");
var F1EX2 = document.getElementById("F1EX2");
var F1EX3 = document.getElementById("F1EX3");

// Set the buttons for all exibits on floor 2
var F2EX1 = document.getElementById("F2EX1");
var F2EX2 = document.getElementById("F2EX2");
var F2EX3 = document.getElementById("F2EX3");
var F2EX4 = document.getElementById("F2EX4");



//getFloor1Divs();

// Call the getFloor1Image so that the user is first presented with the floor 1 layout when the page loads
getFloor1Image();


/**
 * When the F1EX1 button is clicked, the button pulls data from Firebase and changes the Title, picture, and description
 */
F1EX1.onclick = function getExData(){
    const titlenName = ref(db, 'Floorplans/Floor1/Exhibits/E1/Title');
    onValue(titlenName, (snapshot) =>{
        Title.innerHTML = snapshot.val();
    })
    const exPicRef = ref(db, 'Floorplans/Floor1/Exhibits/E1/Image');
    onValue(exPicRef, (snapshot) =>{
        const data = snapshot.val();
        exPic.src=data;
    })

    const descRef = ref(db, 'Floorplans/Floor1/Exhibits/E1/Desc');
    onValue(descRef, (snapshot) =>{
        desc.innerHTML = snapshot.val();
    })
}

/**
 * When the F1EX2 button is clicked, the button pulls data from Firebase and changes the Title, picture, and description
 */
F1EX2.onclick = function getExData(){
    const titlenName = ref(db, 'Floorplans/Floor1/Exhibits/E2/Title');
    onValue(titlenName, (snapshot) =>{
        Title.innerHTML = snapshot.val();
    })
    const exPicRef = ref(db, 'Floorplans/Floor1/Exhibits/E2/Image');
    onValue(exPicRef, (snapshot) =>{
        const data = snapshot.val();
        exPic.src=data;
    })

    const descRef = ref(db, 'Floorplans/Floor1/Exhibits/E2/Desc');
    onValue(descRef, (snapshot) =>{
        desc.innerHTML = snapshot.val();
    })
}

/**
 * When the F1EX3 button is clicked, the button pulls data from Firebase and changes the Title, picture, and description
 */
F1EX3.onclick = function getExData(){
    const titlenName = ref(db, 'Floorplans/Floor1/Exhibits/E3/Title');
    onValue(titlenName, (snapshot) =>{
        Title.innerHTML = snapshot.val();
    })
    const exPicRef = ref(db, 'Floorplans/Floor1/Exhibits/E3/Image');
    onValue(exPicRef, (snapshot) =>{
        const data = snapshot.val();
        exPic.src=data;
    })

    const descRef = ref(db, 'Floorplans/Floor1/Exhibits/E3/Desc');
    onValue(descRef, (snapshot) =>{
        desc.innerHTML = snapshot.val();
    })
}

// ----------

/**
 * When the F2EX1 button is clicked, the button pulls data from Firebase and changes the Title, picture, and description
 */
F2EX1.onclick = function getExData(){
    const titlenName = ref(db, 'Floorplans/Floor2/Exhibits/E1/Title');
    onValue(titlenName, (snapshot) =>{
        Title.innerHTML = snapshot.val();
    })
    const exPicRef = ref(db, 'Floorplans/Floor2/Exhibits/E1/Image');
    onValue(exPicRef, (snapshot) =>{
        const data = snapshot.val();
        exPic.src=data;
    })

    const descRef = ref(db, 'Floorplans/Floor2/Exhibits/E1/Desc');
    onValue(descRef, (snapshot) =>{
        desc.innerHTML = snapshot.val();
    })
}

/**
 * When the F2EX2 button is clicked, the button pulls data from Firebase and changes the Title, picture, and description
 */
F2EX2.onclick = function getExData(){
    const titlenName = ref(db, 'Floorplans/Floor2/Exhibits/E2/Title');
    onValue(titlenName, (snapshot) =>{
        Title.innerHTML = snapshot.val();
    })
    const exPicRef = ref(db, 'Floorplans/Floor2/Exhibits/E2/Image');
    onValue(exPicRef, (snapshot) =>{
        const data = snapshot.val();
        exPic.src=data;
    })

    const descRef = ref(db, 'Floorplans/Floor2/Exhibits/E2/Desc');
    onValue(descRef, (snapshot) =>{
        desc.innerHTML = snapshot.val();
    })
}

/**
 * When the F2EX3 button is clicked, the button pulls data from Firebase and changes the Title, picture, and description
 */
F2EX3.onclick = function getExData(){
    const titlenName = ref(db, 'Floorplans/Floor2/Exhibits/E3/Title');
    onValue(titlenName, (snapshot) =>{
        Title.innerHTML = snapshot.val();
    })
    const exPicRef = ref(db, 'Floorplans/Floor2/Exhibits/E3/Image');
    onValue(exPicRef, (snapshot) =>{
        const data = snapshot.val();
        exPic.src=data;
        
    })

    const descRef = ref(db, 'Floorplans/Floor2/Exhibits/E3/Desc');
    onValue(descRef, (snapshot) =>{
        desc.innerHTML = snapshot.val();
    })
}

/**
 * When the F2EX4 button is clicked, the button pulls data from Firebase and changes the Title, picture, and description
 */
F2EX4.onclick = function getExData(){
    const titlenName = ref(db, 'Floorplans/Floor2/Exhibits/E4/Title');
    onValue(titlenName, (snapshot) =>{
        Title.innerHTML = snapshot.val();
    })
    const exPicRef = ref(db, 'Floorplans/Floor2/Exhibits/E4/Image');
    onValue(exPicRef, (snapshot) =>{
        const data = snapshot.val();
        exPic.src=data;
        
    })

    const descRef = ref(db, 'Floorplans/Floor2/Exhibits/E4/Desc');
    onValue(descRef, (snapshot) =>{
        desc.innerHTML = snapshot.val();
    })
}




// When the floor1 h3 element is clicked on the html page, the getFloor1Image funciton is called
floor1.onclick = function goToFloor1() {
    getFloor1Image();
    //getFloor1Divs();
    
}

// When the floor2 h3 element is clicked on the html page, the getFloor2Image funciton is called
floor2.onclick = function goToFloor2() {
    getFloor2Image();
    //getFloor2Divs();

}

/**
 * CURRENTLY NOT USED FUNCTION
 * This is here for future use since I was trying to automate the process of looping through all of the Exibits from the firebase database,
 * I was able to to get the buttons to be displayed (E.x. when Floor 1 is selected the layout image of Floor 1 is shown and only 3 exibit buttons are shown),
 * but I was not able to get the getExData() function to work...
 */

function getFloor1Divs(){
    const num = ref(db, 'Floorplans/Floor1/Exhibits');
    onValue(num, (snapshot) => {
        var count = 0;
        var newLine = "";
        container.innerHTML = newLine;
        snapshot.forEach(element => {
            count++;
            
            newLine = newLine + '<button id="EX'+count+'" onclick="getExData(1,'+count+')">EX'+count+'</button>';
        });
        container.innerHTML = newLine;
        
    });

    
    
  
}

/**
 * CURRENTLY NOT USED FUNCTION
 * This is here for future use since I was trying to automate the process of looping through all of the Exibits from the firebase database,
 * I was able to to get the buttons to be displayed (E.x. when Floor 1 is selected the layout image of Floor 2 is shown and only 4 exibit buttons are shown),
 * but I was not able to get the getExData() function to work...
 */
function getFloor2Divs(){
    const num = ref(db, 'Floorplans/Floor2/Exhibits');
    onValue(num, (snapshot) => {
        var count = 0;
        var newLine = "";
        container.innerHTML = newLine;
        snapshot.forEach(element => {
            count++;
            newLine = newLine + '<button id="EX" onclick="getExData(2,'+count+')">EX'+count+'</button>';

        });
        container.innerHTML = newLine;
    });
}

/**
 * This function is used to retrieve the layout for floor 1 from firebase
 */
function getFloor1Image() {
    const reference = ref(db, 'Floorplans/Floor1/Image');
    onValue(reference, (snapshot) =>{
        const data = snapshot.val();
        var i1 = document.getElementById('floorplan');
        i1.src=data;
        currentFloor.innerHTML = "Floor 1";

    });
}

/**
 * This function is used to retrieve the layout for floor 2 from firebase
 */
function getFloor2Image(){
    const reference = ref(db, 'Floorplans/Floor2/Image');
    onValue(reference, (snapshot) =>{
        const data = snapshot.val();
        var i1 = document.getElementById('floorplan');
        i1.src = data;
        currentFloor.innerHTML = "Floor 2";
    })
}


