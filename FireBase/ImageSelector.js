/**
* the following code allows for images to be uploaded to the site and displayed to the userAgent
* currently does not store the images in the data base 
* TODO: add translation of images to blob url to allow for storage,
* 		find a way to store multiple blob urls in firebase and retrieve them
*/

const output = document.querySelector("output")
const input = document.querySelector("input")
let imagesArray = []

input.addEventListener("change", () => {
	const files = input.files
	for (let i = 0; i < files.length; i++) {
		imagesArray.push(files[i])
	}
	displayImages()
})
/**
* The following funciton displays images that are desired for upload 
* to the database alongside the rest of the entry
*/
export function imageDisplay() {
	displayImages();
}

/**
* Uses the following parameter to delete the desired image from the list of images uploaded 
* @param {index} index contains the respective image to delete from list
*/
export function imageDelete(index) {
	deleteImage(index);
}

function displayImages() {
	let images = ""
	imagesArray.forEach((image, index) => {
		images += '<div class ="image"><img src="${URL.createObjectURL(image)}" alt = "image"><span onclick="deleteImage(${index})">&times;</span></div>'
	})
	output.innerHTML = images
}

function deleteImage(index) {
	imagesArray.splice(index, 1)
	displayImages()
}