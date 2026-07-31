// Weather App — logic layer
`strict mode`;
// The HTML/CSS are done. This file is deliberately left mostly empty —
// async/await + fetch + JSON parsing is the actual point of this project,
// so it's worth writing yourself rather than having it handed to you.
// DOM references are wired up below so you can focus purely on the logic.

// let form = document.getElementById("search-form");
// console.log(form);
form = document.querySelector("#search-form");
console.log(form);
const cityInput = document.getElementById("city-input");
const statusEl = document.getElementById("status");

const cityNameEl = document.getElementById("city-name");
const regionNameEl = document.getElementById("region-name");
const temperatureEl = document.getElementById("temperature");
const conditionEl = document.getElementById("condition");
const feelsLikeEl = document.getElementById("feels-like");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");
const pressureEl = document.getElementById("pressure");
const timestampEl = document.getElementById("timestamp");
const sourceEl = document.getElementById("source");

const getPosition = function () {
  let pos;
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position),
      (error) => reject(error),
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      },
    );
  });
  return pos;
};

async function getMyCity() {
  const position = await getPosition();
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
  )
    .then(async (response) => {
      if (!response.ok) throw new Error("Problem getttting weather country");

      return await response.json();
    })
    .then((result) => {
      console.log(result);
      const myCity = result.name;
      fetchData(myCity);
    });
}
const timeout = function (sec) {
  return new Promise((_, reject) => {
    setTimeout(function () {
      reject(new Error("Request took too long!"));
    }, sec * 1000);
  });
};

//extra feature
//Defualt it by using our Current postion
// set response time to 2 second
Promise.race([getMyCity(), timeout(2)]);

//for user Input
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = cityInput.value.trim();
  fetchData(city);
});

async function fetchData(city) {
  if (!city) {
    return;
  }

  // TODO 1 — Loading state
  statusEl.textContent = "Reading…";

  // TODO 1 — Fetch weather for `city`
  //   Pick a provider:
  //     - Open-Meteo (open-meteo.com) — free, no API key, good first pick
  //     - OpenWeatherMap / WeatherAPI — need a free API key
  //   Wrap the call in try/catch.
  //   Note: fetch() only rejects on network failure, not on 404/400 —
  //   check `response.ok` yourself before calling response.json().

  try {
    // first we will fetch the coords of the city
    await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`,
    )
      .then(async (response) => {
        if (!response.ok) throw new Error("Problem getting country");

        return await response.json();
      })
      .then((data) => {
        console.log(data[0]);
        //  let latitude; let longitude ;
        ({ lat, lon } = data[0]);
        console.log(lat);
        console.log(lon);
      })
      .catch((err) => {
        throw new Error("Problem getting location coords data");
      });

    let data;
    await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
    )
      .then(async (response) => {
        if (!response.ok) throw new Error("Problem getttting weather country");

        return await response.json();
      })
      .then((result) => {
        console.log(result);
        data = result;
      })
      .catch((err) => {
        throw new Error("Problem getting location Weather data");
      });

    // TODO 2 — On success, populate the DOM:
    statusEl.textContent = "Reading Completed!";
    cityNameEl.textContent = city.toUpperCase()[0] + city.slice(1);
    //   regionNameEl.textContent = ...

    const {
      main: { temp, feels_like, humidity, pressure },
      weather: [{ main: condition }],
      wind: { speed: windSpeed },
    } = data;

    temperatureEl.textContent = `${Math.round(temp)}°C`;
    conditionEl.textContent = condition;
    feelsLikeEl.textContent = `${Math.round(feels_like)}°C`;
    humidityEl.textContent = `${humidity}%`;
    windEl.textContent = `${windSpeed} m/s`;
    pressureEl.textContent = `${pressure} hPa`;
    timestampEl.textContent = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    sourceEl.textContent = "Openweather";
  } catch (err) {
    statusEl.textContent = "Could not find that location. Try again.";
    console.error(`${err} 💥`);
  }
}
