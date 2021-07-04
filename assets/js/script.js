// use moment.js to get the dates for displaying the weather on today AND the five day forcast
// const elem = document.createElement("div");
// const elemText = document.createTextNode("This is a div");

// elem.appendChild(elemText);

// document.body.appendChild(elem);

// elem.classList.add("heading");
// elem.id = "newDiv";
// elem.setAttribute("option", "test");
const currentDate = moment();
const dayOne = moment().add(1, "day");
const dayTwo = moment().add(2, "day");
const dayThree = moment().add(3, "day");
const dayFour = moment().add(4, "day");
const dayFive = moment().add(5, "day");

var city = "";

// document.getElementById("currentDate").innerHTML =
//   currentDate.format("[ (]MM/DD/YYYY[)]");

document.getElementById("day-one").innerHTML = dayOne.format("MM/DD/YYYY");
document.getElementById("day-two").innerHTML = dayTwo.format("MM/DD/YYYY");
document.getElementById("day-three").innerHTML = dayThree.format("MM/DD/YYYY");
document.getElementById("day-four").innerHTML = dayFour.format("MM/DD/YYYY");
document.getElementById("day-five").innerHTML = dayFive.format("MM/DD/YYYY");

let weather = {
  apiKey: "6e6ec74027adce6a58ed16bac77822ab",
  fetchWeather: function (x) {
    // (x) Parameter
    fetch(
      "http://api.openweathermap.org/data/2.5/weather?q=" +
        x +
        "&units=imperial&appid=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    this.displayTodaysWeather(data);

    forecast.fetchForecast(data.coord.lat, data.coord.lon);
  },

  displayTodaysWeather: function (data) {
    const { name } = data;
    const { icon } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = name;

    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".temp").innerText = "Temp: " + temp + "°F";
    document.querySelector(".wind").innerText = "Wind speed: " + speed + "MPH";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
  },
};

var searchButton = document.querySelector(".search-btn");

function searchHandler(clickEvent) {
  clickEvent.preventDefault();
  var city = document.getElementById("city-name").value;
  weather.fetchWeather(city); // city is an argument

  document.getElementById("currentDate").innerHTML =
    currentDate.format("[ (]MM/DD/YYYY[)]");
}

// line 64 is a better way to write functions. the name is to the right of 'function' rather than below, it's attached to a variable
// var searchHandler = function (clickEvent) {};

var searchForm = document.querySelector("#search");

let forecast = {
  apiKey: "6e6ec74027adce6a58ed16bac77822ab",
  fetchForecast: function (city, cnt) {
    fetch(
      "http://api.openweathermap.org/data/2.5/forecast/daily?q=" +
        city +
        "&cnt=" +
        5 +
        "&appid=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => this.displayForecast(data));
  },

  displayForecast: function (data) {
    const { icon1 } = data.weather[0];
    const { speed1 } = data.wind;
    const { temp1, humidity1 } = data.main;

    document.querySelector(".icon1").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".temp1").innerText = "Temp: " + temp + "°F";
    document.querySelector(".wind1").innerText = "Wind speed: " + speed + "MPH";
    document.querySelector(".humidity1").innerText =
      "Humidity: " + humidity + "%";
  },
};

// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
// has the uv index here so

// searchButton.addEventListener("click", searchHandler);
searchForm.addEventListener("submit", searchHandler);
