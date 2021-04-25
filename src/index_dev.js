let lat=''
let long=''
let map

//delete previous results if present
const deletePreviousResults = () => {
  document.getElementById("error").style.display='none';
  document.getElementById("result-data").style.display='none';
  let values = document.getElementsByClassName("values");
  for (let i = 0; i < values.length; i++) {
    values[i].textContent = "";
  }
}

//render air quality data 
const renderAqi = (res) => {
  if(res.status==="error"){
    return 
  }
  document.getElementById('result-data').style.display='block';
  let aqi=res.data.aqi;
  const city=res.data.city.name;
  document.getElementById("result-city").textContent = city;
  if (aqi>0){
    document.getElementById("aqi").textContent = aqi; 
  }else{
    document.getElementById("aqi").textContent = 'N/A'; 
    document.getElementById("color").style.display='none'
  }
  const dataToCheck=["pm25", "pm10", "no2", "o3"];

  //print data only if provided by API, otherwise print N/A
  for (let x of dataToCheck){
    if (res.data.iaqi.hasOwnProperty(x)){
      document.getElementById(x).textContent = res.data.iaqi[x].v ;
    }else{
     document.getElementById(x).textContent ='N/A';
    }
  }
  let level;
  let color;
  let textColor;
  
    if (aqi<=50 && aqi>=0){
      level='Good'
      color='green'
      textColor='white'
    }
    else if (aqi>50 && aqi<=100){
      level='Moderate'
      color='yellow'
      textColor='black'
    }
    else if (aqi>100 && aqi<=150){
      level='Unhealthy for Sensitive Groups'
      color='orange'
      textColor='black'
    }
    else if (aqi>150 && aqi<=200){
      level='Unhealthy'
      color='red'
      textColor='white'
    }
    else if (aqi>200 && aqi<=300){
      level='Very Unhealthy'
      color='purple'
      textColor='white'
    }
    else if (aqi>300){
      level='Hazardous'
      color='maroon'
      textColor='white'
    }else{
      document.getElementById("color").style.display='none'
    }
  document.getElementById("color").textContent = level;
  document.getElementById("color").style.backgroundColor = color;
  document.getElementById("color").style.color = textColor;

  return res
};

//render map
const renderMap = (res) => {
    let lat=res.data.city.geo[0];
    let lon=res.data.city.geo[1];
  if(map != undefined)
    {
      map.remove();
    }
  map = L.map('map').setView([lat, lon], 12);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
    }).addTo(map);
  L.marker([lat, lon]).addTo(map);
}

//fetch data from API through manual input
const getForecastFromInput = async () => {
  const input = document.getElementById('input-city').value;
  const urlToFetch =  `/.netlify/functions/fetch_air_input?input=${input}`;  
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      console.log(jsonResponse)
      if (jsonResponse.status!='ok'){
            console.log('Error with city name!')
            document.getElementById("error").style.display='block'
            document.getElementById("error").textContent = 'City not found';
            console.log(jsonResponse)
      }
      return jsonResponse;
      
    }
  } catch (error) {
    console.log(error);
    document.getElementById("error").style.display='block'
    document.getElementById("error").textContent = 'Connection issue. Please try again.';
  }
}
//initialize new search through maual input
const searchWithInput = () => {
  deletePreviousResults()
  getForecastFromInput()
  .then(res =>renderAqi(res))
  .then(res =>renderMap(res))
  return false;
}

//fetch data from API through coordinates
const getForecastFromCoord = async () => {
  //lat=-23.54564
  //long=-46.6457547
  const urlToFetch=`/.netlify/functions/fetch_air_coords?lat=${lat}&long=${long}`;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
       const jsonResponse = await response.json();
       console.log( jsonResponse)
    return jsonResponse;
    }
  } catch (error) {
    console.log(error);
  }
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
  getForecastFromCoord()
   .then(res =>renderAqi(res))
   .then(res =>renderMap(res))
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



