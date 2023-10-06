const cityMapping = {
  Sanandij: "Sna",
  Kermanshah: "Kermashan",
  Diyarbakır: "Amed",
  "Şanlıurfa Province" : "Riha",
  Javānrūd: "Jwanrro",
  Dehgolan: "Dewlan",
  Paveh: "Pawa",
  Marivan: "Mariwan",
  Erbil: "Hewler(Erbil)",
  "Eslamabad-e-Gharb": "Shabad",
  Qorveh: "Qurwa",
  Adıyaman: "Semsur", 
  Adıyaman: "Semsur",
};
const apiCityMapping = {
  Sanandij: "Sanandaj",
  Javānrūd: "Javanrud",
  Diyarbakır: "Diyarbakir",
};
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
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
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function getForecast(coordinates) {
  let apiKey = "197ef3a642b76eef90e131866f74a0a0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemp(response) {
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)}km/h`;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = `${Math.round(response.data.main.temp)}°C`;
  let cityElement = document.querySelector("#city");
  let originalCityName = response.data.name;
  let lowercaseCityName = originalCityName.toLowerCase();
  if (apiCityMapping[lowercaseCityName]) {
    originalCityName = apiCityMapping[lowercaseCityName];
  }
  if (cityMapping[originalCityName]) {
    cityElement.innerHTML = cityMapping[originalCityName];
  } else {
    cityElement.innerHTML = originalCityName;
  }

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}

function displayForecast(response) {
  let dailyForecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Wed", "Thu", "Fri", "Sat", "Sun", "Mon"];
  dailyForecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
                  <div class="weather-forecast-date">${formatDay(
                    forecastDay.dt
                  )}</div>
                   <img id="forecast-logo"
                src="https://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt="cloudy"
                class="flexbox"
                width="42" />
              <div class="weather-forecast-temp">
    
            <span class="weather-forecast-temp-max"></span>${Math.round(
              forecastDay.temp.max
            )}° <span class="weather-forecast-temp-min">${Math.round(
          forecastDay.temp.min
        )}°</span></div>
            </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function search(city) {
  let apiKey = "a0a183380df8741e35218ccc59e2fe87";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  search(cityInputElement.value);
}
let celsiusTemperatur = null;

function fahToCel(event) {
  event.preventDefault();
  let fahrenheitTemp = Math.round((celsiusTemperatur * 9) / 5 + 32);
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = fahrenheitTemp;
}
function celToFah(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(celsiusTemperatur);
}

let celsiusElement = document.querySelector("#celsius");

let formElement = document.querySelector("#search-form");
formElement.addEventListener("submit", handleSubmit);
let cityInputElement = document.querySelector("#city-input");
let fahrenheitElement = document.querySelector("#fahrenheit");
search("Kermanshah");
