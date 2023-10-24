start()

function start(){
	loadEventListeners();
}






// Establishing map on page
const map = L.map('map').setView([42.355, -71.050], 12);

let Stadia_AlidadeSmoothDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}', {
	minZoom: 0,
	maxZoom: 20,
	attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	ext: 'png'
});

Stadia_AlidadeSmoothDark.addTo(map);

// Set Marker Array

const markersArray = []

// Event Listeners

function loadEventListeners() {
    const lat = document.querySelector("#lat");  // assuming the ID of the input is 'lat'
    const long = document.querySelector("#long");  // assuming the ID of the input is 'long'
    const submit = document.querySelector("#submit");  // assuming the ID of the button is 'submit'
	const addMarker = document.querySelector("#addMarker");
	const deleteMarker = document.querySelector("#deleteMarker");

    submit.addEventListener('click', latLongSearch);
	addMarker.addEventListener('click', addMarkerFunc)
	
}


function latLongSearch(){
	const latValue = parseFloat(lat.value);
	const longValue = parseFloat(long.value);
	if (!isNaN(latValue) && !isNaN(longValue)) {
		map.setView([latValue, longValue],10);
	} else {
		alert("Please enter valid latitude and longitude values.");
	}
}

function addMarkerFunc(){
	addMarker.classList.toggle('active');
	map.once('click', function(e) { // Use "once" so that the event listener is removed after the first click
		let newMarker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
		markersArray.push(newMarker)
		addMarker.classList.toggle('active');
	});
}




map.on('mousemove', latLongDisplay);

function latLongDisplay(event){let latDisplay = document.getElementById("latDisplay");
let longDisplay = document.getElementById('longDisplay');
var latlng = event.latlng;

// Here you have the latitude and longitude under the mouse pointer
var latitude = latlng.lat;
var longitude = latlng.lng;

// For demonstration, let's log it to the console
latDisplay.textContent = `Latitude: ${latitude.toFixed(3)}`
longDisplay.textContent = `Longitude: ${longitude.toFixed(3)}`
}

