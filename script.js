document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('locationForm');
    const input = document.getElementById('locationInput');
    const weatherDisplay = document.getElementById('weatherDisplay');
    const apiKey = '870887df4d2b01335921fe396c69a360';

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const location = input.value;
        if (location) {
            const weatherData = await getWeatherData(location);
            displayWeatherData(weatherData);
        }
    });

    async function getWeatherData(location) {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`);
        if (!response.ok) {
            weatherDisplay.textContent = 'Location not found. Please try again.';
            throw new Error('Location not found');
        }
        const data = await response.json();
        return data;
    }

    function displayWeatherData(data) {
        const { name, main, weather } = data;
        const temperature = main.temp;
        const description = weather[0].description;
        const humidity = main.humidity;
        const windSpeed = data.wind.speed;

        weatherDisplay.innerHTML = `
            <h2>Weather in ${name}</h2>
            <p>Temperature: ${temperature}°C</p>
            <p>Description: ${description}</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind Speed: ${windSpeed} m/s</p>
        `;
    }
});
