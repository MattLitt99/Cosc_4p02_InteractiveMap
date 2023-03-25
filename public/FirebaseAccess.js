import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getFirestore, setDoc, getDoc, getDocs, deleteDoc, doc, updateDoc, arrayUnion, query, collection, where } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
import { getStorage, ref as sRef, uploadBytes, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyCm9-YxifpEbVuBYOh3GukLka4cenJYw84",
    authDomain: "cosc4p02-mesuemmap.firebaseapp.com",
    databaseURL: "https://cosc4p02-mesuemmap-default-rtdb.firebaseio.com",
    projectId: "cosc4p02-mesuemmap",
    storageBucket: "cosc4p02-mesuemmap.appspot.com",
    messagingSenderId: "235500180144",
    appId: "1:235500180144:web:c021f7d72c3d92a380a175"
};


const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const storage = getStorage(app);


//EXHIBIT FUNCTIONALITY
/**
 * Fetches all known keywords for predictive keyword searches
 */
export function getKeywords(callbackFunction) {
    keywordsGet(callbackFunction)
}
/**
 * Fetches all exhibits in the database
 * @param {function} callbackFunction a function that expects an array that is denoted by {exhibit.id:[data],..., exhibit.id:[data]}
 */
export function exhibitGetAll(callbackFunction) {
    getAllExhibits(callbackFunction)
}
/**
 * Queries the Exhibit database based on the provided parameters with a logical OR ; If a parameters is not to be used in the search then set it as null
 * @param {string} title 
 * @param {string} sYear 
 * @param {string} eYear 
 * @param {string} keywords 
 * @param {string} status 
 * @param {int} floor 
 * @param {function} callbackFunction
 */
export function exhibitQuerySearchOR(title, sYear, eYear, keywords, status, floor, callbackFunction) {
    querySearchORExhibit(title, sYear, eYear, keywords, status, floor, callbackFunction)
}
/**
* Queries the Exhibit database based on the provided parameters with a logical AND ; If a parameters is not to be used in the search then set it as null
* @param {string} title 
* @param {string} sYear 
* @param {string} eYear 
* @param {string} keywords 
* @param {string} status 
* @param {int} floor 
* @param {function} callbackFunction
*/
export function exhibitQuerySearchAND(title, sYear, eYear, keywords, status, floor, callbackFunction) {
    querySearchANDExhibit(title, sYear, eYear, keywords, status, floor, callbackFunction)
}
/**
 * Uses the following parameters to create an entry into the "exhibit" database while uploading and link supplied images
 * @param {*} ID
 * @param {string} title 
 * @param {string} date 
 * @param {string} floor 
 * @param {File[]} images
 * @param {string} description 
 * @param {string} status
 * @param {string[]} keywords
 */
export function exhibitAdd(ID, title, date, floor, images, description, status, keywords) {
    addExhibit(ID, title, date, floor, images, description, status, keywords);
}
/**
 * Updates a single field of an exhibit with some new data
 * @param {*} ID ID refrence for the exhibit
 * @param {string} fieldToUpdate 
 * @param {*} newData 
 */
export function exhibitUpdate(ID, fieldToUpdate, newData) {
    updateExhibit(ID, fieldToUpdate, newData);
}
/**
 * Updates many fields of an exhibit with some new data
 * @param {*} ID ID reference for the exhibit
 * @param {string[]} feildsToUpdate 
 * @param {*} newData 
 */
export function exhibitUpdateMany(ID, feildsToUpdate, newData) {
    feildsToUpdate.forEach((element, index) => {
        updateExhibit(ID, element, newData[index]);
    });
    return Promise.resolve("Done");
}
/**
 * fetches a single exhibit based on a supplied ID
 * @param {*} ID ID reference for the exhibit
 * @param {function} callbackFunction a function that will handle the results of a search, typically for displaying the results
 */
export function exhibitSearch(ID, callbackFunction) {
    searchExhibits(ID, callbackFunction);
}
/**
 * Deletes a specified exhibit
 * @param {*} ID ID reference for the entry
 */
export function exhibitDelete(ID) {
    deleteExhibit(ID);
}

async function keywordsGet(callbackFunction) {
    const docRef = doc(database, "Keywords", "Words");
    const snap = await getDoc(docRef);
    if (snap.exists()) {
        callbackFunction(snap.data())
    }
}
async function addKeywords(keywords) {
    const docRef = doc(database, "Keywords", "Words");
    const snap = await getDoc(docRef);
    if (snap.exists()) {
        keywords.forEach(async element => {
            await updateDoc(docRef, {
                Keywords: arrayUnion(element)
            })
        });

    } else {
        //create doc
        await setDoc(docRef, {
            Keywords: keywords
        })
    }
}
async function getAllExhibits(callbackFunction) {
    const snap = await getDocs(collection(database, "Exhibits"));
    const exhibit = new Array();
    snap.forEach((doc) => {
        exhibit[doc.id] = doc.data();
    })
    callbackFunction(exhibit);
}
async function querySearchORExhibit(title, sYear, eYear, keywords, status, floor, callbackFunction) {
    const docRef = collection(database, "Exhibits")
    const results = new Array();

    if (title) {
        title = title.toUpperCase();
        const titleSplit = title.split(' ');
        const q = query(docRef, where("Title_Search", "array-contains-any", titleSplit));
        const snap = await getDocs(q);
        snap.forEach((doc) => {
            results[doc.id] = doc.data();
        })
    }
    if (keywords) {
        keywords = keywords.toUpperCase();
        const keywordSplit = keywords.split(' ');
        const q = query(docRef, where("Keywords", "array-contains-any", keywordSplit));
        const snap = await getDocs(q);
        snap.forEach((doc) => {
            results[doc.id] = doc.data();
        })
    }
    if (sYear && eYear) {
        const q = query(docRef, where("Date", ">=", parseInt(sYear)), where("Date", "<=", parseInt(eYear)));
        const snap = await getDocs(q);
        snap.forEach((doc) => {
            results[doc.id] = doc.data();
        })
    } else if (sYear) {
        const q = query(docRef, where("Date", ">=", parseInt(sYear)));
        const snap = await getDocs(q);
        snap.forEach((doc) => {
            results[doc.id] = doc.data();
        })
    } else if (eYear) {
        const q = query(docRef, where("Date", "<=", parseInt(eYear)));
        const snap = await getDocs(q);
        snap.forEach((doc) => {
            results[doc.id] = doc.data();
        })
    }
    if (status) {
        const q = query(docRef, where("Status", "==", status));
        const snap = await getDocs(q);
        snap.forEach((doc) => {
            results[doc.id] = doc.data();
        })
    }
    if (floor) {
        const q = query(docRef, where("Floor", "==", floor));
        const snap = await getDocs(q);
        snap.forEach((doc) => {
            results[doc.id] = doc.data();
        })
    }
    callbackFunction(results)
}
async function querySearchANDExhibit(title, sYear, eYear, keywords, status, floor, callbackFunction) {
    const docRef = collection(database, "Exhibits");
    const results = [];
    const titleKeyword = [...new Set([...(title?.trim()?.toUpperCase()?.split(" ") ?? []), ...(keywords?.trim()?.toUpperCase()?.match(/\S+/g) ?? [])])];

    const conditions = [];
    if (titleKeyword.length > 0) {
        conditions.push(where("Title_Keyword_Search", "array-contains-any", titleKeyword));
    }
    if (sYear) {
        conditions.push(where("Date", ">=", parseInt(sYear)));
    }
    if (eYear) {
        conditions.push(where("Date", "<=", parseInt(eYear)));
    }
    if (status) {
        conditions.push(where("Status", "==", status));
    }
    if (floor) {
        conditions.push(where("Floor", "==", floor));
    }

    const q = query(docRef, ...conditions);

    // Execute the query and return the results
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        results[doc.id] = doc.data();
    });
    callbackFunction(results);
}

async function addExhibit(ID, title, date, floor, images, description, status, keywords) {
    const docRef = doc(database, "Exhibits", ID);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
        alert("Exhibit Id is currently in use, Please choose a new ID");
    } else {
        //upload images and store names
        const imageNames = [];
        for (let i = 0; i < images.length; i++) {
            const element = images[i];
            imageNames[i] = element.name;
            imageAdd(element);
        }

        title = title.replace('  ', ' ');

        const titleUpper = title.toUpperCase();
        const wordsUpper = new Array()
        keywords.forEach(element => {
            wordsUpper.push(element.toUpperCase());
        });

        const titleArray = titleUpper.split(' ');
        const titleKeyword = titleArray.concat(wordsUpper);
        const titleKeyword2 = [...new Set(titleKeyword)]
        //create exhibit
        await setDoc(docRef, {
            Title: title,
            Title_Search: titleArray,
            Date: parseInt(date),
            Floor: floor,
            Images: imageNames,
            Desc: description,
            Status: status,
            Keywords: wordsUpper,
            Title_Keyword_Search: titleKeyword2
        });
        addKeywords(keywords);

        alert("Exhbit Added");
    }
}
async function searchExhibits(ID, callbackFunction) {
    const docRef = doc(database, "Exhibits", ID);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
        callbackFunction(ID, snap.data());
    } else {
        alert("No exhibit associated with " + ID);
    }
}
async function updateExhibit(ID, fieldToUpdate, newData) {
    const docRef = doc(database, "Exhibits", ID);

    if (fieldToUpdate === "Title") {
        newData = newData.replace('  ', ' ');
        const titleUpper = newData.toUpperCase();
        const titleArray = titleUpper.split(' ');

        setDoc(docRef, { Title: newData, Title_Search: titleArray }, { merge: true })
    }
    if (fieldToUpdate === "Date") {
        setDoc(docRef, { Date: parseInt(newData) }, { merge: true })
    }
    if (fieldToUpdate === "Floor") {
        setDoc(docRef, { Floor: newData }, { merge: true })
    }
    if (fieldToUpdate === "Images") {
        const images = newData;
        if (images.length > 0) {
            const imageNames = [];
            for (let i = 0; i < images.length; i++) {
                const element = images[i];
                imageNames[i] = element.name;
                imageAdd(element);
            }
            setDoc(docRef, { Images: imageNames }, { merge: true })
        }
    }
    if (fieldToUpdate === "Desc") {
        setDoc(docRef, { Desc: newData }, { merge: true })
    }
    if (fieldToUpdate === "Satus") {
        setDoc(docRef, { Status: newData }, { merge: true })
    }

    if (fieldToUpdate === "Keywords") {
        addKeywords(newData);
        const wordsUpper = new Array()
        newData.forEach(element => {
            wordsUpper.push(element.toUpperCase());
        });

        setDoc(docRef, { Keywords: wordsUpper }, { merge: true })
    }
    if (fieldToUpdate == "Title_Keyword") {
        setDoc(docRef, { Title_Keyword_Search: newData }, { merge: true })
    }

}
async function deleteExhibit(ID) {
    const docRef = doc(data, "Exhibits", ID);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
        deleteDoc(docRef);
        alert("Deleted exhibit associated with " + ID);
    } else {
        alert("No exhibit associated with " + ID);
    }
}

//USER FUNCTIONALITY
/**
 * Deletes a specified user
 * @param {*} ID ID referencereference for the user
 */
export function userDeleter(UID) {
    deleteUser(UID);
}
/**
 * Updates a single field of a user with some new data
 * @param {*} ID ID reference for the user
 * @param {string} fieldToUpdate 
 * @param {string} newData 
 */
export function userUpdate(UID, fieldToUpdate, newData) {
    updateUser(UID, fieldToUpdate, newData);
}
/**
 * Updates many fields of a user with some new data
 * @param {*} ID ID refrence for the user
 * @param {string[]} feildsToUpdate 
 * @param {string[]} newData 
 */
export function userUpdateMany(ID, feildsToUpdate, newData) {
    feildsToUpdate.forEach((element, index) => {
        updateUser(ID, element, newData[index]);
    });
}
/**
 * fetches a single user based on a supplied ID
 * @param {*} ID ID reference for the user
 * @param {function} callbackFunction a function that will handle the results of a search, typically for displaying the results
 */
export function userSearch(UID, callbackFunction) {
    searchUser(UID, callbackFunction);
}
/**
 * Uses the following parameters to create a user into the "users" database
 * @param {*} UID ID reference 
 * @param {string} name 
 * @param {string} accessLevel Access level of the user
 * @param {string} password
 */
export function userAdd(UID, name, accessLevel, password) {
    addUser(UID, name, accessLevel, password);
}

async function addUser(UID, name, accessLevel, password) {
    const docRef = doc(database, "users", UID);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
        alert(UID + " Currently in use; Please select a new one")
    } else {
        await setDoc(docRef, {
            Name: name,
            AccessLevel: accessLevel,
            Password: password
        });
        alert("Account Created with " + UID)
    }
}
async function searchUser(UID, callbackfunction) {
    const docRef = doc(database, "users", UID);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
        callbackfunction(UID, snapshot.data());
    } else {
        alert("No account associated with " + UID);
    }
}
async function deleteUser(UID) {
    const docRef = doc(database, "users", UID);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
        deleteDoc(docRef);
        alert("Deleted account associated with " + UID);
    } else {
        alert("No account associated with " + UID);
    }
}
async function updateUser(UID, fieldToUpdate, newData) {
    const docRef = doc(database, "users", UID);
    if (fieldToUpdate === "Name") {
        setDoc(docRef, { Name: newData }, { merge: true });
    }
    if (fieldToUpdate === "AccessLevel") {
        setDoc(docRef, { AccessLevel: newData }, { merge: true })
    }
    if (fieldToUpdate === "Password") {
        setDoc(docRef, { Password: newData }, { merge: true })
    }
}

//IMAGE STORAGE FUNCTIONALITY
/**
 * Uploads a single image to the image storage
 * @param {File} image image to be uploaded
 */
export function addImage(image) {
    imageAdd(image)
}
/**
 * fetches a image, based on supplied name (including '.png' '.jpg' or '.jpeg') and runs a callbackfunction on it
 * @param {string} imageName 
 * @param {function} callbackFunction a function that is expecting a http url which is the link to the requested image
 */
export function getImage(imageName, callbackFunction) {
    imageGet(imageName, callbackFunction);
}
/**
 * deletes a image, based on supplied name (including '.png' '.jpg' or '.jpeg')
 * @param {string} imageName 
 */
export function deleteImage(imageName) {
    Imagedelete(imageName);
}

function Imagedelete(imageName) {
    const imgRef = sRef(storage, "images/" + imageName);
    deleteObject(imgRef).then(() => {
        alert(imageName + " has been deleted")
    }).catch((error) => {
        alert("Error: " + error.code + " has occured, please try again")
    });
}
function imageGet(imageName, callbackFunction) {
    const imgRef = sRef(storage, "images/" + imageName);
    getDownloadURL(imgRef).then((url) => {
        callbackFunction(url);
    })
}
function imageAdd(image) {
    const imageRef = sRef(storage, "images/" + image.name);
    uploadBytes(imageRef, image).then((snapshot) => {
        console.log(image.name + " Uploaded");
    });
}