//1.DATE
function currentDate(now) {
  let min = now.getMinutes();
  if (min < 10) {
    min = `0${min}`;
  }
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];
  let year = now.getFullYear();
  let numberdate = now.getDate();
  return `${day} ${numberdate} ${month} ${year}, ${hour}:${min}`;
}
let today = new Date();
let presentDate = document.querySelector("p#date");
presentDate.innerHTML = currentDate(today);

//2.API
let apiKey = "776b500871ef1a663e341e6d765c78f1";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";

//2.1.Weather in the submitted city
function displaySubmittedWeather(response) {
  document.querySelector("#country").innerHTML = response.data.sys.country;
  let actualTemp = document.querySelector("#Temperature");
  let actualPressure = document.querySelector("#Pressure");
  let actualHu = document.querySelector("#Humidity");
  let actualWind = document.querySelector("#Wind");
  let realFeel = document.querySelector("#feeling");
  let temperature = Math.round(response.data.main.temp);
  let pressure = response.data.main.pressure;
  let humidity = response.data.main.humidity;
  let wind = response.data.wind.speed;
  let windDirection = response.data.wind.deg;
  let windGust = response.data.wind.gust;
  console.log(windGust);
  let feelLike = Math.round(response.data.main.feels_like);
  actualTemp.innerHTML = `${temperature}`;
  actualPressure.innerHTML = `<em>Pressure</em>: ${pressure} hPa`;
  actualHu.innerHTML = `<em>Humidity</em>: ${humidity}%`;
  if (response.data.wind.gust !== undefined) {
    actualWind.innerHTML = `<em>Wind</em>: ${wind} m/s, ${windDirection}° <span class="feeling">Gust: ${windGust}m/s</span>`;
  } else {
    actualWind.innerHTML = `<em>Wind</em>: ${wind} m/s, ${windDirection}° <span class="feeling">Gust: N.A.</span>`;
  }
  realFeel.innerHTML = `Real feel: ${feelLike}°C`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function handleSubmit(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#search-city");
  let city = document.querySelector("h1");
  let newCity = searchCity.value;
  city.innerHTML = `${newCity}, <span id="country"> FR </span>`;
  axios
    .get(`${apiUrl}q=${newCity}&appid=${apiKey}&units=metric`)
    .then(displaySubmittedWeather);
}

let searchForm = document.querySelector("form#search-form");
searchForm.addEventListener("submit", handleSubmit);

//2.1.Weather in the current Location
function displayGeolocWeather(response) {
  let actualcity = document.querySelector("h1");
  actualcity.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  let actualTemp = document.querySelector("#Temperature");
  let actualPressure = document.querySelector("#Pressure");
  let actualHu = document.querySelector("#Humidity");
  let actualWind = document.querySelector("#Wind");
  let realFeel = document.querySelector("#feeling");
  let temperature = Math.round(response.data.main.temp);
  let pressure = response.data.main.pressure;
  let humidity = response.data.main.humidity;
  let wind = response.data.wind.speed;
  let windDirection = response.data.wind.deg;
  let windGust = response.data.wind.gust;
  let feelLike = Math.round(response.data.main.feels_like);
  actualTemp.innerHTML = `${temperature}`;
  actualPressure.innerHTML = `<em>Pressure</em>: ${pressure} hPa`;
  actualHu.innerHTML = `<em>Humidity</em>: ${humidity}%`;
  if (response.data.wind.gust !== undefined) {
    actualWind.innerHTML = `<em>Wind</em>: ${wind} m/s, ${windDirection}° <span class="feeling">Gust: ${windGust}m/s</span>`;
  } else {
    actualWind.innerHTML = `<em>Wind</em>: ${wind} m/s, ${windDirection}° <span class="feeling">Gust: N.A.</span>`;
  }
  realFeel.innerHTML = `Real feel: ${feelLike}°C`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}
function handleGeoloc(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  axios
    .get(`${apiUrl}lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`)
    .then(displayGeolocWeather);
}
function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handleGeoloc);
}
document
  .querySelector("#actual_position")
  .addEventListener("click", getPosition);
