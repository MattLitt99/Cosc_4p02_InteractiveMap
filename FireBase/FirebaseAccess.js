import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { getDatabase, ref, set, onValue, get, child } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js";

// Your web app's Firebase configuration
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
const database = getDatabase();
const storage = getStorage(app);

//entry functionality

/**
 * Uses the following parameters to create an entry into the "entries" database
 * @param {*} ID ID refrence for the entry
 * @param {string} title 
 * @param {string} date 
 * @param {string} location 
 * @param {string} photoURL
 * @param {string} discription 
 */
export function entryAdd(ID, title, date, location, photoURL, discription) {
	addEntry(ID, title, date, location, photoURL, discription);
}
/**
 * Updates a single field of an entry with some new data
 * @param {*} ID ID refrence for the entry
 * @param {string} fieldToUpdate 
 * @param {string} newData 
 */
export function entryUpdate(ID, fieldToUpdate, newData) {
	updateEntry(ID, fieldToUpdate, newData);
}
/**
 * Updates many fields of an entry with some new data
 * @param {*} ID ID reference for the entry
 * @param {string[]} feildsToUpdate 
 * @param {*} newData 
 */
export function entryUpdateMany(ID, feildsToUpdate, newData) {
	feildsToUpdate.array.forEach((element, index) => {
		updateEntry(ID, element, newData[index]);
	});
}

/**
 * fetches a single entry based on a supplied ID
 * @param {*} ID ID reference for the entry
 * @param {function} callbackFunction a function that will handle the results of a search, typically for displaying the results
 */
export function entrySearch(ID, callbackFunction) {
	searchEntries(ID, callbackFunction);
}
/**
 * Deletes a specified entry
 * @param {*} ID ID referencereferencereferencereferencereference for the entry
 */
export function entryDelete(ID) {
	deleteEntry(ID);
}
function addEntry(id, title, date, location, photoURL, discription) {
	const reference = ref(database);
	get(child(reference, 'entries/' + id)).then((snapshot) => {
		if (snapshot.exists()) {
			alert("Entry Id is currently in use, Please choose a new ID");
		} else {
			const reference = ref(database, 'entries/' + id);
			set(reference, { Title: title, Date: date, Location: location, Photo: photoURL, Disc: discription }).then(() => {
				alert("Entry has been added");
			}).catch((error) => {
				alert("An error occured \n Code:" + error.code);
			});
		}
	});
}
function searchEntries(id, callbackFunction) {
	const reference = ref(database);
	get(child(reference, 'entries/' + id)).then((snapshot) => {
		if (snapshot.exists()) {
			const entry = snapshot.val();
			callbackFunction(id, entry);
		} else {
			alert("No entry is asocatied with Id:" + id);
		}
	}).catch((error) => {
		console.error(error);
	})
}
function updateEntry(ID, fieldToUpdate, newData) {
	const reference = ref(database);
	get(child(reference, 'entries/' + ID)).then((snapshot) => {
		if (snapshot.exists()) {
			const reference = ref(database, 'entries/' + ID + "/" + fieldToUpdate);
			set(reference, newData).then(() => {
				alert("ID:" + ID + " " + fieldToUpdate + " has been updated to: " + newData);
			}).catch((error) => {
				alert("An error occured \n Code:" + error.code);
			});
		} else {
			alert("No entry is asocatied with Id:" + ID);
		}
	});
}
function deleteEntry(ID) {
	const reference = ref(database);
	get(child(reference, 'entries/' + ID)).then((snapshot) => {
		if (snapshot.exists()) {
			const reference = ref(database, "entries/" + id);
			set(reference, null).then(() => {
				alert("Entry with ID:" + id + " has been deleted")
			}).catch((error) => {
				alert("An error occured \n Code:" + error.code);
			})
		} else {
			alert("No entry is asocatied with Id:" + id);
		}
	})
}



// User functionality
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
 * @param {*} newData 
 */
export function userUpdateMany(ID, feildsToUpdate, newData) {
	feildsToUpdate.array.forEach((element, index) => {
		updateUser(ID, element, newData[index]);
	});
}
/**
 * fetches a single user based on a supplied ID
 * @param {*} ID ID reference for the user
 * @param {function} callbackFunction a function that will handle the results of a search, typically for displaying the results
 */
export function userSearch(UID, callbackFunction) {
	searchUsers(UID, callbackFunction);
}
/**
 * Uses the following parameters to create a user into the "users" database
 * @param {*} UID ID reference 
 * @param {string} name 
 * @param {string} al Access level of the user
 * @param {string} password
 */
export function userAdd(UID, name, al, password) {
	addUser(UID, name, al, password);
}
function addUser(id, name, accessLevel, password) {
	const reference = ref(database);
	get(child(reference, 'users/' + id)).then((snapshot) => {
		if (snapshot.exists()) {
			alert("User Id is currently in use, Please choose a new ID");
		} else {
			const reference = ref(database, 'users/' + id);
			set(reference, { Name: name, AccessLevel: accessLevel, Password: password }).then(() => {
				alert("User has been added");
			}).catch((error) => {
				alert("An error occured \n Code:" + error.code);
			});
		}
	});
}
function searchUsers(id, callbackFunction) {
	const reference = ref(database);
	get(child(reference, 'users/' + id)).then((snapshot) => {
		if (snapshot.exists()) {
			const user = snapshot.val();
			callbackFunction(id, user);
		} else {
			alert("No account is asocatied with Id:" + id);
		}
	}).catch((error) => {
		console.error(error);
	})
}
function updateUser(id, fieldToUpdate, newData) {
	const reference = ref(database);
	get(child(reference, 'users/' + id)).then((snapshot) => {
		if (snapshot.exists()) {
			const reference = ref(database, 'users/' + id + "/" + fieldToUpdate)
			set(reference, newData).then(() => {
				alert("ID:" + id + " " + fieldToUpdate + " has been updated to: " + newData);
			}).catch((error) => {
				alert("An error occured \n Code:" + error.code);
			});
		} else {
			alert("No account is asocatied with Id:" + id);
		}
	});
}
function deleteUser(id) {
	const reference = ref(database);
	get(child(reference, 'users/' + id)).then((snapshot) => {
		if (snapshot.exists()) {
			const reference = ref(database, "users/" + id);
			set(reference, null).then(() => {
				alert("User with ID:" + id + " has been deleted")
			}).catch((error) => {
				alert("An error occured \n Code:" + error.code);
			})
		} else {
			alert("No account is asocatied with Id:" + id);
		}
	})
}