// external calls to API
//
//
//fetch data from API through manual input
const getForecastFromInput = async () => {
  const input = document.getElementById('input-city').value;
  const API_SECRET =process.env.API_SECRET;
  const urlToFetch =  `https://api.waqi.info/feed/${input}/?token=${API_SECRET}`;  
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

//fetch data from API through coordinates
const getForecastFromCoord = async (lat, long) => {
  //lat=-23.54564
  //long=-46.6457547
  const API_SECRET =process.env.API_SECRET;
  const urlToFetch=`https://api.waqi.info/feed/geo:${lat};${long}/?token=${API_SECRET}`;

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


export {getForecastFromInput, getForecastFromCoord};

