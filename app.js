const API_KEY = 'c4b469446da64a62a7455412241903'; // API Key
const BASE_URL = 'https://api.weatherapi.com/v1/current.json'; // Base URL for API

const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');

// Referencing output fields
const cityName = document.getElementById('city-name');
const countryName = document.getElementById('countryName');
const localTime = document.getElementById('loc-time');
const temp = document.getElementById('temp');
const sup = document.getElementById('sup');
const weatherIcon = document.getElementById('weather-icon');

// Function to fetch weather data from the API
async function getWeatherData(city) {
    try {
        const response = await fetch(`${BASE_URL}?key=${API_KEY}&q=${city}&aqi=yes`);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Error fetching weather data. Please try again.');
    }
}

// Event listener for the search button
searchBtn.addEventListener('click', async () => {
    const city = cityInput.value.trim(); // Get and trim the city input value

    if (city === '') {
        alert('Please enter a city name.');
        return;
    }

    document.getElementById('outputCard').style.visibility = 'visible'; // Show output card

    const weatherData = await getWeatherData(city); // Fetch weather data

    if (weatherData) {
        // Update the UI with weather data
        cityName.innerText = `${weatherData.location.name}, ${weatherData.location.region}`;
        countryName.innerText = weatherData.location.country;
        temp.innerText = weatherData.current.temp_c;
        sup.innerText = '°C';
        localTime.innerText = weatherData.location.localtime;

        // Set weather icon based on condition
        const conditionText = weatherData.current.condition.text.toLowerCase();
        if (conditionText.includes('sunny')) {
            weatherIcon.innerText = 'wb_sunny';
            weatherIcon.style.color = '#ffeb3b';
        } else if (conditionText.includes('cloud')) {
            weatherIcon.innerText = 'cloud';
            weatherIcon.style.color = '#90a4ae';
        } else if (conditionText.includes('rain')) {
            weatherIcon.innerText = 'umbrella';
            weatherIcon.style.color = '#42a5f5';
        } else {
            weatherIcon.innerText = 'wb_sunny'; // Default icon
            weatherIcon.style.color = '#ffeb3b';
        }
    }
});
