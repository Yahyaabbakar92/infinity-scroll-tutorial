// Unsplash API
const count = 10;
const apiKey = 'LRJgHQ4VMZ0ITK0WlPurv9iBH5dJAuWLlidHJVJxD6c';
const apiURL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// Get photos from Unsplash API
async function getPhotos() {
	try {
		const response = await fetch(apiURL);
		const data = response.json();
		console.log(data);
	} catch (error) {
		// Catch Error Here
	}
}

// On Load
getPhotos();
