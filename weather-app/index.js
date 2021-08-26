const apiKey = "c21c760b8ea00d5bbb7be3911b568265";

const temperatureSectionElement = document.querySelector(
  ".temperature-section"
);
const temperatureValueElement = document.querySelector(".temperature-value");
const temperatureUnitElement = document.querySelector(".temperature-unit");
const descriptionElement = document.querySelector(".description");
const locationElement = document.querySelector(".location");
const iconElement = document.querySelector(".icon");

const temperatureUnits = {
  CELSIUS: "C",
  FAHRENHEIT: "F",
};

const weather = {
  temperature: undefined,
  temperatureUnit: temperatureUnits.CELSIUS,
  description: undefined,
  location: undefined,
  icon: "unknown",
};

function kelvinToCelsius(temperature) {
  return Math.floor(temperature - 273.15);
}

function celsiusToFahrenheit(temperature) {
  return Math.floor(temperature * (9 / 5) + 32);
}

temperatureSectionElement.addEventListener("click", () => {
  switch (weather.temperatureUnit) {
    case temperatureUnits.CELSIUS: {
      temperatureValueElement.textContent = celsiusToFahrenheit(
        weather.temperature
      );
      temperatureUnitElement.textContent = temperatureUnits.FAHRENHEIT;
      weather.temperatureUnit = temperatureUnits.FAHRENHEIT;
      break;
    }
    case temperatureUnits.FAHRENHEIT: {
      temperatureValueElement.textContent = weather.temperature;
      temperatureUnitElement.textContent = temperatureUnits.CELSIUS;
      weather.temperatureUnit = temperatureUnits.CELSIUS;
      break;
    }
  }
});

function displayCurrentWeather() {
  temperatureValueElement.textContent = weather.temperature;
  temperatureUnitElement.textContent = weather.temperatureUnit;
  descriptionElement.textContent = weather.description;
  locationElement.textContent = weather.location;
  iconElement.src = `public/icons/${weather.icon}.png`;
}

function getCurrentWeather(latitude, longitude) {
  const api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${apiKey}`;
  fetch(api)
    .then((response) => response.json())
    .then((data) => {
      weather.temperature = kelvinToCelsius(data.main.temp);
      weather.description = data.weather[0].description;
      weather.location = `${data.name}, ${data.sys.country}`;
      weather.icon = data.weather[0].icon;

      displayCurrentWeather();
    });
}

function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  getCurrentWeather(latitude, longitude);
}

function showError(error) {
  console.log(error.message);
}

window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
  } else {
    //browser not support geolocation
  }
});
