start()

function start(){
	loadEventListeners();
}






// Establishing map on page
const map = L.map('map').setView([42.355, -71.050], 12);

let initMap = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

initMap.addTo(map);

// Set Marker Array and Search Storage

const markersArray = []
const searches = { 
	lats:[], 
	longs:[]
}

let searchIndex = searches.lats.length;

// Event Listeners

function loadEventListeners() {
    const lat = document.querySelector("#lat");  // assuming the ID of the input is 'lat'
    const long = document.querySelector("#long");  // assuming the ID of the input is 'long'
    const submit = document.querySelector("#submit");  // assuming the ID of the button is 'submit'
	const addMarker = document.querySelector("#addMarker");
	const deleteMarker = document.querySelector("#deleteMarker");
	const previousSearch = document.querySelector('#previous');
	const nextSearch = document.querySelector("#next");

    submit.addEventListener('click', latLongSearch);
	lat.addEventListener('keydown', function(e){
		if (e.which === 13 || e.keyCode === 13){
			e.preventDefault();
			latLongSearch();
		}
	})
	addMarker.addEventListener('click', addMarkerFunc)
	deleteMarker.addEventListener('click', deleteMarkerFunc)


	previousSearch.addEventListener('click', function(){
		searchIndex--
		const previousLatSearch = searches.lats[searchIndex]
		const previousLongSearch = searches.longs[searchIndex]
		if (previousLatSearch.length === 0 || previousLongSearch.length === 0){
			return;
		}
		map.setView([previousLatSearch,previousLongSearch],10)
	})
	
}

function deleteMarkerFunc(){
	const markerToRemove = markersArray[0]; // This example just takes the first marker as an example
	markerToRemove.remove(); // Removes from map
	const index = markersArray.indexOf(markerToRemove);
	if (index > -1) {
    markersArray.splice(index, 1); // Removes from array
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

function latLongSearch(){
	const latValue = parseFloat(lat.value);
	const longValue = parseFloat(long.value);
	if (!isNaN(latValue) && !isNaN(longValue)) {
		map.setView([latValue, longValue],10);
		searches.lats.push(latValue);
		searches.longs.push(longValue);
		lat.value = '';
		long.value = '';
	} else {
		alert("Please enter valid latitude and longitude values.");
	}
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

