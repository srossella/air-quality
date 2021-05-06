import _ from 'lodash';
import {getForecastFromInput, getForecastFromCoord} from './js/service-dev.js';
import {deletePreviousResults, renderAqi, renderMap} from './js/view.js';


let lat=''
let long=''

//initialize new search through maual input
const searchWithInput = () => {
  deletePreviousResults()
  getForecastFromInput()
  .then(res =>renderAqi(res))
  .then(res=>renderMap(res))
  return false;
}

//initialize new search through geolocation
const searchWithCoordinates = () => {
  deletePreviousResults()
  navigator.geolocation.getCurrentPosition(success, error, options)
}
const success = (pos) => {
  const crd = pos.coords;
  lat=crd.latitude;
  long=crd.longitude;
  console.log(`Latitude : ${lat}`);
  console.log(`Longitude: ${long}`);
  getForecastFromCoord(lat, long)
   .then(res =>renderAqi(res))
   .then(res=>renderMap(res))
}
const error = (err) => {
  console.warn(`ERROR(${err.code}): ${err.message}`);
  document.getElementById("error").style.display='block';
  document.getElementById("error").textContent = 'Geolocation denied';
} 
const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
}

// event listeners for buttons and keyboard
document.getElementById("button").addEventListener("click", searchWithInput);
document.getElementById("getloc").addEventListener("click", searchWithCoordinates);
document.getElementById('input-city').addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    searchWithInput();
  }
});
