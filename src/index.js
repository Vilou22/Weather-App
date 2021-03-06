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

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}
//2.API
let apiKey = "776b500871ef1a663e341e6d765c78f1";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
let apiForecast = "https://api.openweathermap.org/data/2.5/forecast?";
//2.1.Weather in the submitted city
function displayforecast(response) {}
function displaySubmittedWeather(response) {
  document.querySelector("#country").innerHTML = response.data.sys.country;
  let actualTemp = document.querySelector("#Temperature");
  let actualPressure = document.querySelector("#Pressure");
  let actualHu = document.querySelector("#Humidity");
  let actualWind = document.querySelector("#Wind");
  let realFeel = document.querySelector("#feeling");
  let actualIcon = document.querySelector("#icon");
  celsiusTemperature = Math.round(response.data.main.temp);
  let pressure = response.data.main.pressure;
  let humidity = response.data.main.humidity;
  let wind = response.data.wind.speed;
  let windDirection = response.data.wind.deg;
  let windGust = response.data.wind.gust;
  let weatherIcon = response.data.weather[0].icon;
  feelLike = Math.round(response.data.main.feels_like);
  actualTemp.innerHTML = `${celsiusTemperature}`;
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
  actualIcon.setAttribute("src", `src/image/${weatherIcon}@2x.png`);
}
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecastElementSecond = document.querySelector("#forecastSecond");
  forecastElement.innerHTML = null;
  forecastElementSecond.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 3; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
                <div class="col-4">
                  <p>${formatHours(forecast.dt * 1000)}</p>
                  <img src="src/image/${
                    forecast.weather[0].icon
                  }@2x.png"" alt="cloudy" width="64" />
                  <p>
                  ${Math.round(forecast.main.temp_max)}° 
                  <span class="minimal">
                  ${Math.round(forecast.main.temp_min)}°</span>
                  </p>
                </div>
  `;
  }
  for (let index = 3; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
                <div class="col-4">
                  <p>${formatHours(forecast.dt * 1000)}</p>
                  <img src="src/image/${
                    forecast.weather[0].icon
                  }@2x.png"" alt="cloudy" width="64" />
                  <p>
                  ${Math.round(forecast.main.temp_max)}° 
                  <span class="minimal">
                  ${Math.round(forecast.main.temp_min)}°</span>
                  </p>
                </div>
  `;
  }
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
  axios
    .get(`${apiForecast}q=${newCity}&appid=${apiKey}&units=metric`)
    .then(displayForecast);
}

let searchForm = document.querySelector("form#search-form");
searchForm.addEventListener("submit", handleSubmit);

//2.1.Weather in the current Location
function displayGeolocWeather(response) {
  let actualcity = document.querySelector("h1");
  let actualTemp = document.querySelector("#Temperature");
  let actualPressure = document.querySelector("#Pressure");
  let actualHu = document.querySelector("#Humidity");
  let actualWind = document.querySelector("#Wind");
  let realFeel = document.querySelector("#feeling");
  let actualIcon = document.querySelector("#icon");
  actualcity.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  celsiusTemperature = Math.round(response.data.main.temp);
  feelLike = Math.round(response.data.main.feels_like);
  let pressure = response.data.main.pressure;
  let humidity = response.data.main.humidity;
  let wind = response.data.wind.speed;
  let windDirection = response.data.wind.deg;
  let windGust = response.data.wind.gust;
  let weatherIcon = response.data.weather[0].icon;
  actualTemp.innerHTML = `${celsiusTemperature}`;
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
  actualIcon.setAttribute("src", `src/image/${weatherIcon}@2x.png`);
}
function handleGeoloc(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  axios
    .get(`${apiUrl}lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`)
    .then(displayGeolocWeather);
  axios
    .get(`${apiForecast}lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`)
    .then(displayForecast);
}
function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handleGeoloc);
}
document
  .querySelector("#actual_position")
  .addEventListener("click", getPosition);

//Unit Conversion

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#Temperature");
  let realElement = document.querySelector("#feeling");
  celsiusButton.classList.remove("active");
  fahrenheitButton.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let feelLikeFahrenheit = Math.round((feelLike * 9) / 5 + 32);
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  realElement.innerHTML = `Real feel: ${feelLikeFahrenheit}°F`;
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusButton.classList.add("active");
  fahrenheitButton.classList.remove("active");
  let temperatureElement = document.querySelector("#Temperature");
  let realElement = document.querySelector("#feeling");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  realElement.innerHTML = `Real feel: ${feelLike}°C`;
}

let celsiusTemperature = null;
let feelLike = null;
let fahrenheitButton = document.querySelector("#fahrenheit");
fahrenheitButton.addEventListener("click", displayFahrenheitTemperature);

let celsiusButton = document.querySelector("#celsius");
celsiusButton.addEventListener("click", displayCelsiusTemperature);
