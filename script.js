const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
// Using let instead of const because the values in the array will change every time we make a request
let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = 'LRJgHQ4VMZ0ITK0WlPurv9iBH5dJAuWLlidHJVJxD6c';
const apiURL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
	imageLoaded++;
	if (imageLoaded === totalImages) {
		ready = true;
		loader.hidden = true;
	}
}

// Helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
	for (const key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
}

// Create elements for links & photos, add to DOM
function displayPhotos() {
	imageLoaded = 0;
	totalImages = photosArray.length;

	// Run function for each object in photosArray
	photosArray.forEach((photo) => {
		// Create <a> to link to Unsplash
		const item = document.createElement('a');
		// item.setAttribute('href', photo.links.html);
		// item.setAttribute('target', '_blank');
		setAttributes(item, {
			href: photo.links.html,
			target: '_blank',
		});
		// Create <img> for photo
		const img = document.createElement('img');
		// img.setAttribute('src', photo.urls.regular);
		// img.setAttribute('alt', photo.alt_description);
		// img.setAttribute('title', photo.alt_description);
		setAttributes(img, {
			src: photo.urls.regular,
			alt: photo.alt_description,
			title: photo.alt_description,
		});
		// Event listener, check when each is finished loading
		img.addEventListener('load', imageLoaded);

		// put <img> inside <a>, then put both inside imageContainer
		item.appendChild(img);
		imageContainer.appendChild(item);
	});
}

// Get photos from Unsplash API
async function getPhotos() {
	try {
		const response = await fetch(apiURL);
		photosArray = await response.json();

		displayPhotos();
	} catch (error) {
		// Catch Error Here
	}
}

// Check to see if scrolling near bottom of page, Load more photos
window.addEventListener('scroll', () => {
	if (
		window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
		ready
	) {
		ready = false;
		getPhotos();
	}
});

// On Load
getPhotos();
