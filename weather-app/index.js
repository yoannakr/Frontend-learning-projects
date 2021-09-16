const apiKey = config.API_KEY;

const temperatureSectionElement = document.querySelector(
  ".temperature-section"
);
const temperatureValueElement = document.querySelector(".temperature-value");
const temperatureUnitElement = document.querySelector(".temperature-unit");
const descriptionElement = document.querySelector(".description");
const locationElement = document.querySelector(".location");
const iconElement = document.querySelector(".icon");
const notificationSectionElement = document.querySelector(
  ".notification-section"
);
const searchNavBtnElement = document.querySelector(".search-nav-btn");
const searchSectionElement = document.querySelector(".search-section");
const searchButtonElement = document.querySelector(".search-btn");
const cityNameInputElement = document.querySelector(".city-name-input");

let isSearchBarShown = false;

const temperatureUnits = {
  CELSIUS: "C",
  FAHRENHEIT: "F",
};

const weather = {
  temperature: undefined,
  temperatureUnit: temperatureUnits.CELSIUS,
  description: undefined,
  location: undefined,
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
}

function getCurrentWeather(latitude, longitude) {
  const api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${apiKey}`;
  fetch(api)
    .then((response) => response.json())
    .then((data) => {
      weather.temperature = kelvinToCelsius(data.main.temp);
      weather.description = data.weather[0].description;
      weather.location = `${data.name}, ${data.sys.country}`;
      setImage(data);

      displayCurrentWeather();
    });
}

function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  getCurrentWeather(latitude, longitude);
}

function showError(message) {
  notificationSectionElement.style.display = "block";
  notificationSectionElement.textContent = message;

  setInterval(() => {
    notificationSectionElement.style.display = "none";
    notificationSectionElement.textContent = "";
  }, 5000);
}

window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setPosition, (error) => {
      showError(error.message);
    });
  } else {
    showError("Browser doesn't support Geolocation!");
  }
});

function showSearchSection() {
  if (isSearchBarShown) {
    searchSectionElement.classList.remove("slide-in");
    searchSectionElement.classList.add("slide-out");
  } else {
    searchSectionElement.classList.remove("slide-out");
    searchSectionElement.classList.add("slide-in");
    searchSectionElement.style.display = "block";
  }
  isSearchBarShown = !isSearchBarShown;
}

searchNavBtnElement.addEventListener("click", showSearchSection);

function getCityInformation(cityName) {
  const api = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;
  fetch(api)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === "404") {
        showError("City Not found");
      } else {
        getCurrentWeather(data[0].lat, data[0].lon);
      }
    })
    .catch((error) => {
      showError(error.message);
    });
}

searchButtonElement.addEventListener("click", () =>
  getCityInformation(cityNameInputElement.value)
);

setImage = (data) => {
  if (data.weather[0].main === "Clear") {
    iconElement.src = "public/images/sun.svg";
  }

  if (data.weather[0].main === "Snow") {
    iconElement.src = "public/images/snow.svg";
  }

  if (data.weather[0].main === "Thunderstorm") {
    iconElement.src = "public/images/thunderstorm.svg";
  }

  if (
    data.weather[0].main === "Drizzle" ||
    data.weather[0].main === "Mist" ||
    data.weather[0].main === "Smoke" ||
    data.weather[0].main === "Haze" ||
    data.weather[0].main === "Dust" ||
    data.weather[0].main === "Fog" ||
    data.weather[0].main === "Sand" ||
    data.weather[0].main === "Dust" ||
    data.weather[0].main === "Ash" ||
    data.weather[0].main === "Squall" ||
    data.weather[0].main === "Tornado"
  ) {
    iconElement.src = "public/images/drizzle.svg";
  }

  if (data.weather[0].main === "Clouds") {
    if (data.weather[0].description === "few clouds")
      iconElement.src = "public/images/few_clouds.svg";
    else iconElement.src = "public/images/overcast_clouds.svg";
  }

  if (data.weather[0].main === "Rain") {
    iconElement.src = "public/images/light_rain.svg";
  }
};
