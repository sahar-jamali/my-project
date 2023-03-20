// display the current date and time
function showDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednsday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let min = date.getMinutes();
  let hour = date.getHours();
  return `${day}, ${hour}:${min}`;
}
//shw temprature of city
function showTempature(response) {
  let city = document.querySelector("#cityName");
  city.innerHTML = response.data.name;
  let country = document.querySelector("#countryName");
  country.innerHTML = response.data.sys.country;
  let description = response.data.weather[0].description;
  let elementdescription = document.querySelector("#description");
  elementdescription.innerHTML = `${description}`;
  let temprature = Math.round(response.data.main.temp);
  let elementTemp = document.querySelector("#show-temp");
  elementTemp.innerHTML = `${temprature}`;
  let humidity = response.data.main.humidity;
  let elementHumidity = document.querySelector("#humidity");
  elementHumidity.innerHTML = `${humidity}`;
  let wind = Math.round(response.data.wind.speed);
  let elementWind = document.querySelector("#wind");
  elementWind.innerHTML = `${wind}`;
  let currentTime = new Date();
  let dateElement = document.querySelector("#current-time");
  dateElement.innerHTML = showDate(currentTime);
}
//Add a search engine, when searching for a city,
function searchCity(city) {
  let apiKey = "8cd9be374c7c96c39a9fe73f4bf2f055";
  let apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apiKey +
    "&units=metric";
  axios.get(apiUrl).then(showTempature);
}
function handleSomthing(event) {
  event.preventDefault();
  let newCity = document.querySelector("#search-box").value;
  searchCity(newCity);
}
///current location
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "8cd9be374c7c96c39a9fe73f4bf2f055";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTempature);
}
function showCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
//cel to far and far to cel
function changeCelToFar() {
  let cel = document.querySelector("#show-temp");
  let num = cel.innerHTML;
  let far = (num * 9) / 5 + 32;
  cel.innerHTML = Math.round(far);
}
function changeFarToCel() {
  let far = document.querySelector("#show-temp");
  let num = far.innerHTML;
  let cel = ((num - 32) * 5) / 9;
  far.innerHTML = Math.round(cel);
}
let dateElement = document.querySelector("#current-time");
let currentTime = new Date();
dateElement.innerHTML = showDate(currentTime);
let inputCity = document.querySelector("#search-form");
inputCity.addEventListener("submit", handleSomthing);
let current = document.querySelector("#currentBtn");
current.addEventListener("click", showCurrent);
let farDegree = document.querySelector("#farenheit");
farDegree.addEventListener("click", changeCelToFar);
let celDegree = document.querySelector("#clecius");
celDegree.addEventListener("click", changeFarToCel);
searchCity("New york");
