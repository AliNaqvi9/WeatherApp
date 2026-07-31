// Weather App — logic layer
//
// The HTML/CSS are done. This file is deliberately left mostly empty —
// async/await + fetch + JSON parsing is the actual point of this project,
// so it's worth writing yourself rather than having it handed to you.
// DOM references are wired up below so you can focus purely on the logic.

const form = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const statusEl = document.getElementById('status');

const cityNameEl = document.getElementById('city-name');
const regionNameEl = document.getElementById('region-name');
const temperatureEl = document.getElementById('temperature');
const conditionEl = document.getElementById('condition');
const feelsLikeEl = document.getElementById('feels-like');
const humidityEl = document.getElementById('humidity');
const windEl = document.getElementById('wind');
const pressureEl = document.getElementById('pressure');
const timestampEl = document.getElementById('timestamp');
const sourceEl = document.getElementById('source');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const city = cityInput.value.trim();
  if (!city) return;

  // TODO 1 — Loading state
  //   statusEl.textContent = 'Reading…';

  // TODO 2 — Fetch weather for `city`
  //   Pick a provider:
  //     - Open-Meteo (open-meteo.com) — free, no API key, good first pick
  //     - OpenWeatherMap / WeatherAPI — need a free API key
  //   Wrap the call in try/catch.
  //   Note: fetch() only rejects on network failure, not on 404/400 —
  //   check `response.ok` yourself before calling response.json().

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
