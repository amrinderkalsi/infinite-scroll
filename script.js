// Unnsplash API

let count = 5;
// const apiKey = 'tyc1TcY_wRIBi8mxmFWnccCP18cADNHGA-H-XMTfKJY'
const apiKey = `XQjQWSmAaZW3b0gHSAAqy6pV4ESop6rGC1y7eKT0wXA`;
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

let photosArray = [];
let imgLoaded = 0;
let totalImages = 0;
let ready = false;
const loader = document.getElementById('loader');

// Helper function to setAttributes on elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function imageLoaded() {
    imgLoaded++
    if (imgLoaded === totalImages) {
        ready = true;
        imgLoaded = 0;
        loader.hidden = true;
        if (totalImages === count) {
            count = 30;
        }
    }
}

// Display Photos Function
function displayPhotos(photosArray) {
    totalImages = photosArray.length;

    const imageContainer = document.getElementById('image-container');
    
    photosArray.map(photo => {
        // Create & Set attributes for item tag
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes(item, {
            'href': photo.links.html,
            'target': '_blank'
        });
        
        // Create & Set attribute for img tag
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.description);
        setAttributes(img, {
            'src': photo.urls.regular,
            'alt': photo.alt_description,
            'title': photo.description != null ? photo.description : ''
        });
        img.addEventListener('load', imageLoaded);

        item.appendChild(img);
        imageContainer.appendChild(item);

    })
}

// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray= await response.json();
        displayPhotos(photosArray);
    } catch (err) {
        console.log(err);
    }
}

// Check to see if the scrolling near the botton of the page, then load more photos
document.addEventListener('scroll',() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        getPhotos();
        ready = false;
    }
})

getPhotos();