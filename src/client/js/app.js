/* add my API key and user as global variables */
const GeoNames_user = "sisisasa";
const weatherBitKpi = "37312b9b3eac4ba3a484c04a78ae844c";
const pixabayKey = "19823186-6d0fc87f33685ba4372bd9385";

const getFromGeoN = async (city) => {
    const url = `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${GeoNames_user}`;
    const res = await fetch(url);
    try {
      const data = await res.json();
      return data;
    } catch (error) {
      alert("GeoNames error!", error);
    }
  };
  
  const getFromW_Bit = async (lat, lng) => {
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=${weatherBitKpi}`;
    const res = await fetch(url);
    try {
      const data = await res.json();
      return data;
    } catch (error) {
      alert("WeatherBit error!", error);
    }
  };
  
  const getFromPbay = async (city) => {
    const url = `https://pixabay.com/api/?key=${pixabayKey}&q=${city}&image_type=photo`;
    const res = await fetch(url);
    try {
      const data = await res.json();
      return data;
    } catch (error) {
      alert("Pixabay error!", error);
    }
  };
  
const performAction = async () => {
  // save city and dates values in variables 
  const city = document.getElementById("city").value;
  const departureDate = document.getElementsByClassName("dates")[0].value;
  const returnDate = document.getElementsByClassName("dates")[1].value;
  // Calculations : Trip length and days till traveling
  let NewDate = new Date();
  const daysToLeave = Math.floor((new Date(departureDate).getTime() - NewDate.getTime())/(1000 * 3600 * 24));
  const TripLength = Math.ceil((new Date(returnDate).getTime() - new Date(departureDate).getTime())/(1000 * 3600 * 24));
  const tripInformation = `${city} trip is in ${daysToLeave} days from now <br> You'll be traveling for ${TripLength} days`;
  document.getElementById("tripInfo").innerHTML = tripInformation;
  getFromGeoN(city)
    .then((data) => {
      return postData("http://localhost:7777/geonames", {
        latitude: data.geonames[0].lat,
        longitude: data.geonames[0].lng,
      });
    })
    .then((res) => {
      const lat = res[res.length - 1].latitude;
      const lng = res[res.length - 1].longitude;
      return { lat, lng };
    })
    .then(({ lat, lng }) => {
      return getFromW_Bit(lat, lng);
    })
    .then((weatherData) => {
      return postData("http://localhost:7777/weatherbit", {
        high: weatherData.data[0].high_temp,
        low: weatherData.data[0].low_temp,
        description: weatherData.data[0].weather.description,
      });
    })
    .then(() => {
      return getFromPbay(city);
    })
    .then((data) => {
      return postData("http://localhost:7777/pixabay", {
        image: data.hits[0].webformatURL,
      }).then(updateUI());
    });
};


const updateUI = async () => {
  const res = await fetch("http://localhost:7777/data");
  try {
    const allData = await res.json();
    document.getElementById("details").innerHTML = `<strong>Weather Forecast </strong> <br> High temprature: ${allData[allData.length - 2].high}, Low temprature: ${allData[allData.length - 2].low} <br> ${allData[allData.length - 2].description}<br> `;
    document.getElementById("image").src = allData[allData.length - 1].image;
  } catch (error) {
    console.log(error);
  }
};

const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {"Content-Type": "application/json",},
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const button_submit = document.getElementById("done");
  button_submit.addEventListener("click", performAction);
});

export {
    getFromGeoN,
    getFromW_Bit,
    getFromPbay,
    performAction,
    updateUI,
    postData,
};
