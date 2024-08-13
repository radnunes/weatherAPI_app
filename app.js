// Your API key
const apiKey = "a8e04a8e92aa46afa3b160828242207";


// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Select the form and input elements
    const form = document.getElementById('form');
    const input = document.getElementById('input');
    const weatherInfo = document.getElementById('weather-info')

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

        // Construct the URL with the user's input
        const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${inputText}`;

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
            const temperature = data.current.temp_c; // e.g., 20
            const condition = data.current.condition.text; // e.g., "Partly cloudy"
            const iconUrl = data.current.condition.icon; // URL for the weather icon

            weatherInfo.innerHTML = `
                <div class="card" style="width: 18rem;">
                    <img src="${iconUrl}" class="card-img-top" alt="${condition}">
                    <div class="card-body">
                        <h5 class="card-title">${locationName}, ${country}</h5>
                        <p class="card-text">Temperature: ${temperature}°C</p>
                        <p class="card-text">Condition: ${condition}</p>
                    </div>
                </div>
            `;

        }).catch(error => {
            console.error('Error fetching the weather data:', error);
        });
    });
});
