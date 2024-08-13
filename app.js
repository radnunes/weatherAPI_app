// Your API key
const apiKey = "a8e04a8e92aa46afa3b160828242207";

// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Select the form and input elements
    const form = document.getElementById('form');
    const input = document.getElementById('input');
    const weatherInfo = document.getElementById('weather-info');

    // Add a submit event listener to the form
    form.addEventListener('submit', function(event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Get the value of the input field
        const inputText = input.value;

        // Log the input text to the console
        console.log(inputText);

        // Optionally, clear the input field after submission
        input.value = '';

        // Construct the URL with the user's input for forecast (4 days includes current day)
        const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${inputText}&days=4`;

        // Fetch the weather data from the API
        fetch(url).then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        }).then(data => {
            console.log('Weather data:', data);

            const locationName = data.location.name; // e.g., "London"
            const country = data.location.country; // e.g., "United Kingdom"
            const currentTemperature = data.current.temp_c; // Current temperature
            const currentCondition = data.current.condition.text; // Current condition
            const currentIconUrl = data.current.condition.icon; // URL for the current weather icon
            
            // Display current weather
            weatherInfo.innerHTML = `
                <div class="card" style="width: 18rem;">
                    <img src="${currentIconUrl}" class="card-img-top" alt="${currentCondition}">
                    <div class="card-body">
                        <h5 class="card-title">${locationName}, ${country}</h5>
                        <p class="card-text">Current Temperature: ${currentTemperature}°C</p>
                        <p class="card-text">Current Condition: ${currentCondition}</p>
                    </div>
                </div>
            `;

            // Prepare to display forecast data for the current day and the next two days
            const forecastDays = data.forecast.forecastday; // Array of forecast data for the next days
            let forecastHTML = `<h5>3-Day Forecast:</h5><div class="row">`;

            // Loop through forecast data for today and the next two days
            for (let i = 0; i < 3; i++) {
                const day = forecastDays[i]; // Get the forecast for the current day or the next two days
                const date = new Date(day.date).toLocaleDateString(); // Get the date in a readable format
                const maxTemp = day.day.maxtemp_c; // Maximum temperature for the day
                const minTemp = day.day.mintemp_c; // Minimum temperature for the day
                const condition = day.day.condition.text; // Condition description
                const iconUrl = day.day.condition.icon; // URL for the weather icon

                // Append each day's forecast to the forecast HTML
                forecastHTML += `
                    <div class="card" style="width: 10rem; margin: 0 10px;">
                        <img src="${iconUrl}" class="card-img-top" alt="${condition}">
                        <div class="card-body">
                            <h6 class="card-title">${date}</h6>
                            <p class="card-text">Max: ${maxTemp}°C</p>
                            <p class="card-text">Min: ${minTemp}°C</p>
                            <p class="card-text">${condition}</p>
                        </div>
                    </div>
                `;
            }

            forecastHTML += '</div>'; // Close the row div
            weatherInfo.innerHTML += forecastHTML; // Append the forecast to the existing weather info

        }).catch(error => {
            console.error('Error fetching the weather data:', error);
        });
    });
});
