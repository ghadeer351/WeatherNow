const UI = {
    cityInput: document.getElementById('city-input'),
    searchButton: document.getElementById('search-button'),
    cityName: document.getElementById('city-name'),
    weatherIcon: document.getElementById('weather-icon'),
    temperature: document.getElementById('temperature'),
    humidity: document.getElementById('humidity'),
    windSpeed: document.getElementById('wind-speed'),
    searchForm: document.getElementById("search-form")
};

UI.searchForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const city = UI.cityInput.value.trim();
    if(city ===""){
       alert("please enter a city name","error")
       UI.cityInput.focus();
        return;
    }
searchCity(city);
});

async function searchCity(city){
    try{
        const location=await getCoordinates(city);
        const weather=await getWeather(location.latitude, location.longitude);
        renderWeather(location, weather);
    }
    catch(error){
        console.error("Error searching for city:", error);
        alert("Error searching for city. Please try again.");
    }
}

async function getCoordinates(city) 
{
const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=5&language=en&format=json`;

const response=await fetch(url);

if(!response.ok){
throw new Error("Failed to fetch coordinates");
}

const data=await response.json();

if(!data.results || data.results.length === 0){
throw new Error("City not found");
}
const city1=data.results[0];

return {
name: city1.name,
country: city1.country,
latitude: city1.latitude,
longitude: city1.longitude
}
}
async function getWeather(latitude, longitude) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();

    return data.current;
}

function renderWeather(location, weather) {
    UI.cityName.textContent = `${location.name}, ${location.country}`;

    UI.temperature.textContent = `${weather.temperature_2m}°C`;

    UI.humidity.textContent =
        `Humidity: ${weather.relative_humidity_2m}%`;

    UI.windSpeed.textContent =
        `Wind Speed: ${weather.wind_speed_10m} km/h`;

       const weatherStyle = getWeatherStyle(weather.weather_code);

       UI.weatherIcon.className = `fas ${weatherStyle.icon}`;
       UI.weatherIcon.style.color = weatherStyle.color;
}
function getWeatherStyle(code) {
    if (code === 0) {
        return {
            icon: "fa-sun",
            color: "#fbbf24"
        };
    }

    if (code === 1 || code === 2) {
        return {
            icon: "fa-cloud-sun",
            color: "#f59e0b"
        };
    }

    if (code === 3) {
        return {
            icon: "fa-cloud",
            color: "#94a3b8"
        };
    }

    if ([45, 48].includes(code)) {
        return {
            icon: "fa-smog",
            color: "#94a3b8"
        };
    }

    if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
        return {
            icon: "fa-cloud-showers-heavy",
            color: "#60a5fa"
        };
    }

    if ([71, 73, 75, 77, 85, 86].includes(code)) {
        return {
            icon: "fa-snowflake",
            color: "#38bdf8"
        };
    }

    if ([95, 96, 99].includes(code)) {
        return {
            icon: "fa-cloud-bolt",
            color: "#a78bfa"
        };
    }

    return {
        icon: "fa-cloud",
        color: "#94a3b8"
    };
}