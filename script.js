const city = document.querySelector(".city");
const temperature = document.querySelector(".temp");
const description = document.querySelector(".description");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const pressure = document.querySelector(".pressure");
const visibility = document.querySelector(".visibility");
const icon = document.querySelector(".icon img");
const uv = document.querySelector(".uv");
const error = document.querySelector(".error");
const mainDiv = document.querySelector(".main");

const searchValue = document.querySelector("#searchBar");
const searchBtn = document.querySelector("#searchBtn");

const appid = "8095a4c8cf967aa06daa863d3d60ea47";

navigator.geolocation.getCurrentPosition(
  async (pos) => {
    error.classList.contains("active") && error.classList.remove("active");
    const currentLatitude = pos.coords.latitude;
    const currentLongitude = pos.coords.longitude;
    let currentWeather = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lon=${currentLongitude}&lat=${currentLatitude}&units=metric&appid=${appid}`
    );
    currentWeather = await currentWeather.json();
    city.innerHTML = currentWeather.name;
    temperature.innerHTML = currentWeather.main.temp + "°C";
    description.innerHTML = currentWeather.weather[0].description;
    humidity.innerHTML = currentWeather.main.humidity + "%";
    wind.innerHTML = currentWeather.wind.speed + "m/s";
    pressure.innerHTML = currentWeather.main.pressure + "hPa";
    visibility.innerHTML = currentWeather.visibility + "m";
    icon.src = `http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`;
    uv.innerHTML = currentWeather.weather[0].description;
  },
  () => {
    error.classList.add("active");
    error.innerHTML = `<i class="fa-regular fa-circle-exclamation"></i> Please allow the location to get Current Weather`;
  }
);
const getSearchedWeather = async () => {
  error.classList.contains("active") && error.classList.remove("active");
  let searchedWeather = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${searchValue.value}&units=metric&appid=${appid}`
  );
  searchedWeather = await searchedWeather.json();
  if (searchedWeather.cod === "404") {
    error.classList.add("active");
    mainDiv.style.display = "none";
    error.innerHTML = `<i class="fa-regular fa-circle-exclamation"></i> Location not found!`;
  } else {
    mainDiv.style.display = "block";
    city.innerHTML = searchedWeather.name;
    temperature.innerHTML = searchedWeather.main.temp + "°C";
    description.innerHTML = searchedWeather.weather[0].description;
    humidity.innerHTML = searchedWeather.main.humidity + "%";
    wind.innerHTML = searchedWeather.wind.speed + "m/s";
    pressure.innerHTML = searchedWeather.main.pressure + "hPa";
    visibility.innerHTML = searchedWeather.visibility + "m";
    icon.src = `http://openweathermap.org/img/wn/${searchedWeather.weather[0].icon}@2x.png`;
  }
};
searchBtn.addEventListener("click", getSearchedWeather);
