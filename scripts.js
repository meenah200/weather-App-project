let now = new Date();
let time = document.querySelector("#time");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

time.innerHTML = `${day} ${hours}:${minutes}`;

//feature #2
let submitCity = document.querySelector("#form-search");
submitCity.addEventListener("submit", search);

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input");
  cityInput.innerHTML = cityInput.value;
  let apiKey = "5a66dc5142bfcd987e8299c75e3b7ea3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function showWeather(response) {
  let cityElement = document.querySelector("h1");
  let currentCity = response.data.name;
  cityElement.innerHTML = `${currentCity}`;
  let temperatureElement = document.querySelector("#temperature");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#current-weather-icon");
  let temperature = Math.round(response.data.main.temp);
  let descriptionElement = document.querySelector("#temp-description");
  temperatureElement.innerHTML = `${temperature}`;
  let humidity = response.data.main.humidity;
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
  let wind = Math.round(response.data.wind.speed);
  windElement.innerHTML = `Wind : ${wind}km/hr`;
  let icon = `<img src="https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png">`;
  iconElement.innerHTML = icon;
  let description = response.data.weather[0].main;
  descriptionElement.innerHTML = `${description}`;
}
let currentLocationButton = document.querySelector("#current-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

function retrievePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "5a66dc5142bfcd987e8299c75e3b7ea3";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}
