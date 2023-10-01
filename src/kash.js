function displayTemp(response) {
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
}
let apiKey = "a0a183380df8741e35218ccc59e2fe87";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Diyarbakır&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemp);
