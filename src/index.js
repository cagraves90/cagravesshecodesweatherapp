function getForecast(coordinates) {
  let apiKey = "96fcaeced4ad943f030c75cd01f06f5f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let description = response.data.weather[0].description;
  let currentCityTemp = document.querySelector("#current-temp");
  let currentCityType = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  

  celsiusTemperature = response.data.main.temp;

  currentCityTemp.innerHTML = `${temperature}`;
  currentCityType.innerHTML = `${description}`; 
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  getForecast(response.data.coord);
} 

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

celciusLink.classList.remove("active");
fahrenheitLink.classList.add("active");
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);

celciusLink.classList.add("active");
fahrenheitLink.classList.remove("active");
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  let days = ["Thurs", "Fri", "Sat", "Sun", "Mon"];
  days.forEach(function(day) {
  forecastHTML = forecastHTML + 
  `
              <div class="col-2">
                <div class="forecastDay">
                    ${day}
                </div>
                <img src = "http://openweathermap.org/img/wn/50d@2x.png"
                  alt = ""
                  width = "42"
                  />
                <div class="forecastTemp">
                    19°C
                </div>
            </div>         
  `; 
  

  }
)
  forecastHTML = forecastHTML + `</div>`

  forecastElement.innerHTML = forecastHTML;
}

function search(city) {
  let apiKey = "96fcaeced4ad943f030c75cd01f06f5f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}&appID=${apiKey}`).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let cityInput = document.querySelector("#current-city");
  cityInput.innerHTML = searchInput.value;
  search(searchInput.value);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let now = new Date();

let p = document.querySelector("#current-date");

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();

let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

let month = months[now.getMonth()];

p.innerHTML = `${hours}:${minutes}, ${day} ${month} ${date}, ${year}`;

displayForecast();
