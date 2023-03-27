var URL = "https://openweathermap.org/current"
var weatherDiv = document.getElementById('search')
var form = document.querySelector('form')

form.onsubmit = function(e) {
  e.preventDefault()
  var searchTerm = this.search.value
  if (!searchTerm) return
  fetch(URL + searchTerm)
    .then(function(res) {
        return res.json()
    })
    .then(function(data) {
        weatherDiv.innerHTML = ""
        form.weatherDiv.value = ""
        var h2 = document.createElement('h2')
        h2.textContent = search.toUpperCase()
        weatherDiv.appendChild(h2)

        var icon = document.createElement('icon')
        icon.src = `https://openweathermap.org/img/wn/${iconCode}.png`
        icon.alt = description
        weatherDiv.appendChild(h2)

        var temp = document.createElement('p')
        temp.textContent = `${Math.round(currentTemp)}°F`
        weatherDiv.appendChild(temp)

        var feelsLike = document.createElement('p')
        feelsLike.textContent = `${Math.round(feelsLikeTemp)}°F`
        weatherDiv.appendChild(feelsLike)

        var condition = document.createElement('p')
        condition.textContent = description
        weatherDiv.appendChild(condition)

        var updated = document.createElement('p')
        updated.textContent = `Updated ${new Date(dt * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' }).toLowerCase()}`
        weatherDiv.appendChild(updated)

        var mapLink = document.createElement('p')
        mapLink.href = `https://www.google.com/maps/search/?api=1&query=${data.coord.lat},${data.coord.lon}`
        weatherDiv.appendChild(mapLink)
    })
}

      const { name, sys: { country }, main: { temp: currentTemp, feels_like: feelsLikeTemp }, weather: [ { description, icon: iconCode } ], dt } = data
      city.textContent = name
      country.textContent = country
      errorMsg.textContent = ''
    })

    .catch(err => {
      errorMsg.textContent = err.message
      city.textContent = ''
      country.textContent = ''
      temp.textContent = ''
      feelsLike.textContent = ''
      condition.textContent = ''
      icon.src = ''
      icon.alt = ''
      updated.textContent = ''
      mapLink.href = ''
    })
  input.value = ''
})
