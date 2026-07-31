// Weather App — logic layer
//
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

let lng;
let lat;

const getPosition = function () {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        console.log(`Latitude: ${lat}, Longitude: ${lng}`);
        resolve(position);
      },
      (error) => {
        console.error(`Error code ${error.code}: ${error.message}`);
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      },
    );
  });
};
// (async function () {
//   try {
//     console.log("start");
//     await getPosition();
//     console.log("end");
//   } catch (err) {
//     console.error(`${err} `);
//   }
// })();

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = cityInput.value.trim();
  if (!city) {
    return;

    // https://api.openweathermap.org/data/4.0/onecall/current?lat={lat}&lon={lon}&appid={API key}
    //we can use the api to get the city here
  }

  // TODO 1 — Loading state
  statusEl.textContent = "Reading…";

  // TODO 2 — Fetch weather for `city`
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

    await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
    )
      .then(async (response) => {
        if (!response.ok) throw new Error("Problem getting country");

        return await response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        throw new Error("Problem getting location Weather data");
      });
  } catch (err) {
    console.error(`${err} 💥`);
  }

  // TODO 3 — On success, populate the DOM:
  //   cityNameEl.textContent   = ...
  //   regionNameEl.textContent = ...
  //   temperatureEl.textContent = `${Math.round(temp)}°`
  //   conditionEl.textContent  = ...
  //   feelsLikeEl.textContent  = ...
  //   humidityEl.textContent   = ...
  //   windEl.textContent       = ...
  //   pressureEl.textContent   = ...
  //   timestampEl.textContent  = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  //   sourceEl.textContent     = 'Open-Meteo'; // or whichever API you used
  //   statusEl.textContent     = '';

  // TODO 4 — On failure (city not found, network error, etc.):
  //   statusEl.textContent = 'Could not find that location. Try again.';
  //   Leave the previous reading in place rather than blanking it.
});
