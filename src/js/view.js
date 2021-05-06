// dom manipulation & user interaction 
//
//

// delete previous results

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
  let aqi= _.get(res, 'data.aqi',0)
  let city= _.get(res, 'data.city.name',  'N/A')
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
      if (res.data.iaqi.hasOwnProperty(x) && res.data.iaqi && res.data){
        document.getElementById(x).textContent = res.data.iaqi[x].v ;
      }else{
        document.getElementById(x).textContent ='N/A';
      }
}

  let level;
  let color;
  let textColor;
  
    if (aqi<=50 && aqi>0){
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

let map;
//render map
const renderMap = (res) => {
  let lat=res.data.city.geo[0];
  let lon=res.data.city.geo[1];
  if(map != undefined )
    {
      map.remove();
    }

// document.getElementById('map').innerHTML = "<div id='map'></div>";
  map = L.map('map').setView([lat, lon], 12);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
    }).addTo(map);
  L.marker([lat, lon]).addTo(map);
}


export {deletePreviousResults, renderAqi, renderMap};
