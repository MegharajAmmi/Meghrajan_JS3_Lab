// Define your API key and base URL
console.log("welcome city forecast");
const weatherApi = {
  key: "635871fcf96e0daf25cfe3323b9f2d87",
  baseUrl: "https://api.openweathermap.org/data/2.5/weather",
};

// Get DOM elements
const searchInputBox = document.querySelector(".search-box");
const locationCity = document.querySelector(".location .city");
const locationDate = document.querySelector(".location .date");
const currentTemp = document.querySelector(".current .temp");
const weatherStatus = document.querySelector(".current .weather");
const hiLowTemp = document.querySelector(".current .hi-low");
const weatherApp = document.querySelector(".app-wrap");

// Add an event listener for Enter key press for city
searchInputBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      const city = searchInputBox.value;
      getWeatherReport(city);
    }
  });
  
// Get weather report
function getWeatherReport(city) {
  fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then((response) => response.json())
    .then((weather) => {
      showWeatherReport(weather);
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
}

// Show weather report
function showWeatherReport(weather) {
    if (weather.cod === "400") {
      alert("Empty Input", "Please enter any city", "error");
    } else if (weather.cod === "404") {
      alert("Bad Input", "Entered city not found", "warning");
    } else {
      locationCity.textContent = `${weather.name}, ${weather.sys.country}`;
      locationDate.textContent = dateManage(new Date());
      currentTemp.textContent = `${Math.round(weather.main.temp)}°C`;
      weatherStatus.textContent = `${weather.weather[0].main}`;
      hiLowTemp.textContent = `${Math.floor(
        weather.main.temp_min
      )}°C (min) / ${Math.ceil(weather.main.temp_max)}°C (max)`;
      changeBg(weather.weather[0].main);
      reset();
    }
  }
  

// Function to reset the input box
function reset() {
  searchInputBox.value = "";
}

// Function to format the time
function getTime(date) {
  let hour = addZero(date.getHours());
  let minute = addZero(date.getMinutes());
  return `${hour}:${minute}`;
}

// Function to format the date
function dateManage(dateArgument) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
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
  const year = dateArgument.getFullYear();
  const month = months[dateArgument.getMonth()];
  const date = dateArgument.getDate();
  const day = days[dateArgument.getDay()];
  return `${day} ${date} ${month} ${year}`;
}

// Function to change background image based on weather status
function changeBg(status) {
  const body = document.body;
  const imageUrl = getBackgroundImage(status);
  body.style.backgroundImage = `url(${imageUrl})`;
}


// Function to add leading zero to a numbers
function addZero(number) {
  return number < 10 ? `0${number}` : number;
}