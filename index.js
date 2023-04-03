var URL = "https://api.openweathermap.org/data/2.5/weather?q=";
var API_KEY = "e89fac7ae6e0f6ceaf56d0c8424f5ecc";
var weatherContainer = document.getElementById('weather');
var form = document.querySelector('form');

form.onsubmit = function(e) {
  e.preventDefault();
  var userInput = userInput.search.value;
  if (!userInput) return;
  fetch(URL + searchTerm + "&units=imperial" + "&appid=" + API_KEY)
    .then(function(res) {
        return res.json();
    })
    .then(function(data) {
        console.log(data);
        weatherContainer.innerHTML = "";
        var placeName = document.createElement('h2');
        placeName.textContent = weatherObj.place;
        weatherContainer.appendChild(placeName);

        var mapLink = document.createElement('a');
        mapLink.href = `https://www.google.com/maps/search/?api=1&query=${data.coord.lat},${data.coord.lon}`;
        mapLink.target = "_blank";
        mapLink.textContent = `View on Map`;
        weatherContainer.appendChild(mapLink);

        var iconCode = data.weather[0].icon;
        var description = data.weather[0].description;

        var icon = document.createElement('img');
        icon.src = `https://openweathermap.org/img/wn/${iconCode}.png`;
        icon.alt = description;
        weatherContainer.appendChild(icon);

        var condition = document.createElement('p');
        condition.textContent = description;
        weatherContainer.appendChild(condition);

          addBreak()

        var currentTemp = data.main.temp;
        var temp = document.createElement('p');
        temp.textContent = `Current: ${Math.round(currentTemp)}°F`;
        weatherContainer.appendChild(temp);

        var feelsLikeTemp = data.main.feels_like;
        var feelsLike = document.createElement('p');
        feelsLike.textContent = `Feels like: ${Math.round(feelsLikeTemp)}°F`;
        weatherContainer.appendChild(feelsLikeTemp);

          addBreak()

        var updatedAt = data.dt;
        var updatedAt = document.createElement('p');
        updatedAt.textContent = `Last updated: ${new Date(dt * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' }).toLowerCase()}`;
        weatherContainer.appendChild(updatedAt);
    });
