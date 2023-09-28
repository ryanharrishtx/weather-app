let apiKey = `edbaf6e2b9460b3c26ac3c51f405ea14`;

// Current Day Weather
let searchBtn = document.querySelector("#submit");   
searchBtn.addEventListener("click", function() { 
        let cityInput = document.querySelector("#city-input");
        let city = cityInput.value;
        let getLatLon = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;
        fetch(getLatLon)
            .then(function (response) {
                return(response.json([0]));
            })
            .then(function (data) {
                console.log(data[0]);
                let lat = data[0].lat;
                let lon = data[0].lon;
                let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
                fetch(apiURL)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        console.log(data);
                        let date = new Date(data.dt * 1000);
                        document.getElementById("current-card-header").innerHTML = `${data.name} (${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()})`;
                        var iconcode = data.weather[0].icon;
                        var iconurl = `<img src="http://openweathermap.org/img/w/${iconcode}.png" />`;
                        document.getElementById("current-card-title").innerHTML = `${iconurl} ${data.main.temp}°F`;
                        document.getElementById("current-card-text").innerHTML = `Wind Speed: ${data.wind.speed}MPH, Humidity: ${data.main.humidity}%`;
                    })
            })
    }
);

// We need to be able to save the city they searched for in local storage

// Then we need to be save that search in a "Recent Searches" bar

// Then we need to do the same thing for the next 5 days in the 5 secondary cards below the current day
