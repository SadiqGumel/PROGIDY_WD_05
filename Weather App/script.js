const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key from OpenWeatherMap
const weatherInfoDiv = document.getElementById('weatherInfo');
const locationInput = document.getElementById('locationInput');
const getWeatherButton = document.getElementById('getWeatherButton');

getWeatherButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        getWeather(location);
    } else {
        alert('Please enter a location!');
    }
});

async function getWeather(location) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
    
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Weather data not found');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherInfoDiv.innerHTML = `<p>${error.message}</p>`;
    }
}

function displayWeather(data) {
    const { name } = data;
    const { temp, humidity } = data.main;
    const { description } = data.weather[0];

    weatherInfoDiv.innerHTML = `
        <h2>Weather in ${name}</h2>
        <p>Temperature: ${temp}°C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Condition: ${description.charAt(0).toUpperCase() + description.slice(1)}</p>
    `;
}
