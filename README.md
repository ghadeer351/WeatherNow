# WeatherNow

A lightweight weather web app that lets users search for a city and view its current weather conditions.

## Features

- Search for a city by name
- Resolve city coordinates using the Open-Meteo Geocoding API
- Display current temperature
- Display relative humidity and wind speed
- Show a weather icon based on the returned weather code
- Handle empty searches, missing cities, and failed API requests

## Built With

- HTML5
- CSS3
- Vanilla JavaScript
- Fetch API and async/await
- [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api)
- [Open-Meteo Forecast API](https://open-meteo.com/en/docs)

## Getting Started

1. Clone or download this repository.
2. Open the project folder in your editor.
3. Open `index.html` in a browser, or run it with a local development server.
4. Enter a city name and submit the search form.

No API key is required for the Open-Meteo endpoints used by this project.

## How It Works

1. The app sends the entered city name to the geocoding endpoint.
2. It uses the first matching result's latitude and longitude.
3. It requests current weather data for those coordinates.
4. The interface displays the city, temperature, humidity, wind speed, and a matching icon.

## Project Structure

- `index.html` — page structure
- `style.css` — layout and visual styling
- `script.js` — geocoding, weather requests, and UI updates

## Author

**Ghadeer Debo** — [GitHub](https://github.com/ghadeer351)
