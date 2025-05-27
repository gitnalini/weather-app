
const button = document.getElementById("search");
const input = document.getElementById("input-button");

const cityTemp = document.getElementById("city-temp");
const cityTime = document.getElementById("city-time");
const cityName = document.getElementById("city-name");
const weatherCondition = document.getElementById("weather-condition"); 

const apiKey = "66347aa7db1b4cca88a214303252402"; 


async function getWeatherByCity(city) {
    const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`
    );
    const data = await response.json();
    displayWeather(data);
}

// Fetch weather by coordinates
async function getWeatherByCoords(lat, lon) {
    const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=yes`
    );
    const data = await response.json();
    displayWeather(data);
}

// Display weather data
function displayWeather(data) {
    cityName.textContent = `${data.location.name}, ${data.location.country}`;
    cityTemp.textContent = `Temperature: ${data.current.temp_c}°C`;
    weatherCondition.textContent = `Condition: ${data.current.condition.text}`;
    cityTime.textContent = `Local Time: ${data.location.localtime}`;
}

// Search button click
button.addEventListener("click", () => {
    const city = input.value.trim();
    if (city !== "") {
        getWeatherByCity(city);
    }
});

// Load current location on page load
window.addEventListener("load", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                getWeatherByCoords(latitude, longitude);
            },
            () => {
                console.warn("Geolocation failed. Please enter city manually.");
            }
        );
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});
