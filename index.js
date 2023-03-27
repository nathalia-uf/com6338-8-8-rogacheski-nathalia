const API_KEY = 'e89fac7ae6e0f6ceaf56d0c8424f5ecc'

const form = document.querySelector('#weather-app form')
const input = document.querySelector('#weather-app input')
const errorMsg = document.querySelector('#weather-app #error-msg')
const city = document.querySelector('#weather-app #city')
const country = document.querySelector('#weather-app #country')
const temp = document.querySelector('#weather-app #temp')
const feelsLike = document.querySelector('#weather-app #feels-like')
const condition = document.querySelector('#weather-app #condition')
const icon = document.querySelector('#weather-app img')
const updated = document.querySelector('#weather-app #updated')
const mapLink = document.querySelector('#weather-app a')

form.addEventListener('submit', e => {
  e.preventDefault()
  const query = input.value
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=imperial`)
    .then(res => res.json())
    .then(data => {
      if (data.cod === '404') {
        throw new Error('Location not found')
      }
      const { name, sys: { country }, main: { temp: currentTemp, feels_like: feelsLikeTemp }, weather: [ { description, icon: iconCode } ], dt } = data
      city.textContent = name
      country.textContent = country
      temp.textContent = `${Math.round(currentTemp)}°F`
      feelsLike.textContent = `${Math.round(feelsLikeTemp)}°F`
      condition.textContent = description
      icon.src = `https://openweathermap.org/img/wn/${iconCode}.png`
      icon.alt = description
      updated.textContent = `Updated ${new Date(dt * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' }).toLowerCase()}`
      mapLink.href = `https://www.google.com/maps/search/?api=1&query=${data.coord.lat},${data.coord.lon}`
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
