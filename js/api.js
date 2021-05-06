// Wibracje

let addButtonElement = document.querySelector(".js-button-addTask");

addButtonElement.addEventListener("click", () => {
  vibrate(1000);
})

function vibrate (ms) {
  navigator.vibrate(ms);
}

function vibratePattern () {
  navigator.vibrate([400, 100, 400, 100, 400]);
}
                    
// Geolokacja
function geoFindMe() {

  const status = document.querySelector('#status');
  const mapLink = document.querySelector('#map-link');

  mapLink.href = '';
  mapLink.textContent = '';

  function success(position) {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;

    status.textContent = '';
    mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    mapLink.innerHTML = `Szerokość: ${latitude} ° </br> Wysokość: ${longitude} °`;
  }

  function error() {
    status.textContent = 'Nie znaleziono lokalizacji';
  }

  if(!navigator.geolocation) {
    status.textContent = 'Geolokacja nie jest wspierana przez tę przeglądarkę';
  } else {
    status.textContent = 'Lokalizowanie...';
    navigator.geolocation.getCurrentPosition(success, error);
  }

}

document.querySelector('#find-me').addEventListener('click', geoFindMe);