
function search(city) {
  let apiKey = "96fcaeced4ad943f030c75cd01f06f5f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}&appID=${apiKey}`).then(displayWeather);
}

function displayWeather(response) {

  let temperature = Math.round(response.data.main.temp);
  let description = response.data.weather[0].description;
  let currentCityTemp = document.querySelector("#current-temp");
  let currentCityType = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");
  let dateElement = document.querySelector("#current-date")
  dateElement.innerHTML = formatDate(response.data.dt);
  
  celsiusTemperature = response.data.main.temp;

  currentCityTemp.innerHTML = `${temperature}`;
  currentCityType.innerHTML = `${description}`; 
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
 
  getForecast(response.data.coord);
} 



function getForecast(coordinates) {
  let apiKey = "96fcaeced4ad943f030c75cd01f06f5f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {

  let forecast = response.data.daily; 
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  
  forecast.forEach(function(forecastDay, index) {

    if (index < 6) {
  forecastHTML = forecastHTML + 
  `
              <div class="col-2">
                <div class="forecastDay">
                    ${formatForecastDay(forecastDay.dt)}
                </div>
                <img src = "http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
                  alt = ""
                  width = "42"
                  />
                <div class="forecastTemp">
                <span class = "forecast-temp-min">
                    ${Math.round(forecastDay.temp.max)}°C
                    </span>
                    <span class = "forecast-temp-max">
                    ${Math.round(forecastDay.temp.min)}°C
                    </span>
                </div>
            </div>         
  `; 
  }

});

  forecastHTML = forecastHTML + `</div>`

  forecastElement.innerHTML = forecastHTML;
}


function formatForecastDay (timestamp) {

let date = new Date (timestamp * 1000);
let day = date.getDay();

let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

return days[day]; 
}


function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let cityInput = document.querySelector("#current-city");
  cityInput.innerHTML = searchInput.value;
  search(searchInput.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);


function formatDate(timestamp) {

let date = new Date(timestamp * 1000);

let hours = date.getHours();
let minutes = date.getMinutes();
let weekDay = date.getDay();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

return `${hours}:${minutes}, ${days[weekDay]} ${months[month]} ${day}, ${year}`; 

}


