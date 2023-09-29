// API Key
let apiKey = `edbaf6e2b9460b3c26ac3c51f405ea14`;

// Selecting Search Button from HTML
let searchBtn = document.querySelector("#search");

// Adding Event Listener to Search Button
searchBtn.addEventListener("click", function() { 

        // Grabbing input from search bar
        const cityInput = document.querySelector("#city-input");
        const city = cityInput.value;

        const saveInput = localStorage.setItem("city", city);

        function setSavedInput() {
            document.createElement("p");
            let p = document.querySelectorAll("p");
            let input = localStorage.getItem("city");
            p.innerText = input;
            document.getElementById("recent-searches-display").appendChild(p);
        }
        


        // Establishing URL to fetch data based on city
        let getLatLon = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;

        // Fetching API based on city to get lat and lon to use in next API call
        fetch(getLatLon)
            .then(function (response) {
                return(response.json([0]));
            })
            .then(function (data) {
                console.log(data[0]);
                let lat = data[0].lat;
                let lon = data[0].lon;

                // Current Day Card
                let todayAPIURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
                fetch(todayAPIURL)
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
                let futureAPIURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
                fetch(futureAPIURL)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        console.log(data);
                        let futureData = data.list;
                        for (let i = 0; i < futureData.length; i++) {
                            if (futureData[i].dt_txt.includes("12:00:00")) {
                                futureData = futureData[i];
                                let futureTemp = futureData.main.temp;
                                let futureHumidity = futureData.main.humidity;
                                let futureWind = futureData.wind.speed;
                                let futureIcon = futureData.weather[0].icon;
                                let futureIconURL = `<img src="http://openweathermap.org/img/w/${futureIcon}.png" />`;
                                document.getElementById(`card-title`).innerHTML = `${futureIconURL} ${futureTemp}°F`;
                                document.getElementById(`card-text`).innerText = `Wind Speed: ${futureWind}MPH, Humidity: ${futureHumidity}%`;


                            }
                            }
                            let futureDate = new Date(futureData.dt_txt);
                            document.getElementById("future-card-header").innerText = `${data.city.name} (${futureDate.getMonth() + 1}/${futureDate.getDate()}/${futureDate.getFullYear()})`;
                        // var iconcode = data.list[0].weather[0].icon;
                        // console.log(iconcode);
                        // var iconurl = `<img src="http://openweathermap.org/img/w/${iconcode}.png" />`;
                        // console.log(iconurl);
                        // let futureCard = document.getElementById("card-title");
                        // futureCard.innerHTML = `${iconurl} ${data.list[0].weather[0].main.temp}°F`;
                        // document.getElementById("card-text").innerHTML = `Wind Speed: ${data.wind.speed}MPH, Humidity: ${data.main.humidity}%`;
                    })
            })
    }
);

setSavedInput();

// We need to be able to save the city they searched for in local storage

// Then we need to be save that search in a "Recent Searches" bar

// Then we need to do the same thing for the next 5 days in the 5 secondary cards below the current day card
