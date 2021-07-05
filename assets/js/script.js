// use moment.js to get the dates for displaying the weather on today AND the five day forcast
// const elem = document.createElement("div");
// const elemText = document.createTextNode("This is a div");

// elem.appendChild(elemText);

// document.body.appendChild(elem);

// elem.classList.add("heading");
// elem.id = "newDiv";
// elem.setAttribute("option", "test");
const currentDate = moment();
const apiKey = "6e6ec74027adce6a58ed16bac77822ab";
const dayOne = moment().add(1, "day");
const dayTwo = moment().add(2, "day");
const dayThree = moment().add(3, "day");
const dayFour = moment().add(4, "day");
const dayFive = moment().add(5, "day");

var city = "";
var lat = "";
var lon = "";

// document.getElementById("currentDate").innerHTML =
//   currentDate.format("[ (]MM/DD/YYYY[)]");

document.getElementById("day-one").innerHTML = dayOne.format("MM/DD/YYYY");
document.getElementById("day-two").innerHTML = dayTwo.format("MM/DD/YYYY");
document.getElementById("day-three").innerHTML = dayThree.format("MM/DD/YYYY");
document.getElementById("day-four").innerHTML = dayFour.format("MM/DD/YYYY");
document.getElementById("day-five").innerHTML = dayFive.format("MM/DD/YYYY");

let weather = {
  fetchWeather: function (x) {
    // (x) Parameter
    fetch(
      "http://api.openweathermap.org/data/2.5/weather?q=" +
        x +
        "&units=imperial&appid=" +
        apiKey
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
  // apiKey: "6e6ec74027adce6a58ed16bac77822ab",
  fetchForecast: function (lat, lon) {
    fetch(
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        lat +
        "&lon=" +
        lon +
        "&units=imperial&appid=" +
        apiKey
    )
      .then((response) => response.json())
      .then((data) => this.displayForecast(data));
  },

  displayForecast: function (data) {
    console.log("displayWeatherForecase ", data);
    const icon1 = data.daily[0].weather[0].icon;
    const speed1 = data.daily[0].wind_speed;
    const temp1 = data.daily[0].temp.day;
    const humidity1 = data.daily[0].humidity;

    // iterate over the days

    document.querySelector(".icon1").src =
      "https://openweathermap.org/img/wn/" + icon1 + ".png";
    document.querySelector(".temp1").innerText = "Temp: " + temp1 + "°F";
    document.querySelector(".wind1").innerText =
      "Wind speed: " + speed1 + "MPH";
    document.querySelector(".humidity1").innerText =
      "Humidity: " + humidity1 + "%";

    console.log("displayWeatherForecase ", data);
    const icon2 = data.daily[1].weather[0].icon;
    const speed2 = data.daily[1].wind_speed;
    const temp2 = data.daily[1].temp.day;
    const humidity2 = data.daily[1].humidity;

    // iterate over the days

    document.querySelector(".icon2").src =
      "https://openweathermap.org/img/wn/" + icon2 + ".png";
    document.querySelector(".temp2").innerText = "Temp: " + temp2 + "°F";
    document.querySelector(".wind2").innerText =
      "Wind speed: " + speed2 + "MPH";
    document.querySelector(".humidity2").innerText =
      "Humidity: " + humidity2 + "%";

    console.log("displayWeatherForecase ", data);
    const icon3 = data.daily[2].weather[0].icon;
    const speed3 = data.daily[2].wind_speed;
    const temp3 = data.daily[2].temp.day;
    const humidity3 = data.daily[2].humidity;

    // iterate over the days

    document.querySelector(".icon3").src =
      "https://openweathermap.org/img/wn/" + icon3 + ".png";
    document.querySelector(".temp3").innerText = "Temp: " + temp3 + "°F";
    document.querySelector(".wind3").innerText =
      "Wind speed: " + speed3 + "MPH";
    document.querySelector(".humidity2").innerText =
      "Humidity: " + humidity3 + "%";

    console.log("displayWeatherForecase ", data);
    const icon4 = data.daily[3].weather[0].icon;
    const speed4 = data.daily[3].wind_speed;
    const temp4 = data.daily[3].temp.day;
    const humidity4 = data.daily[3].humidity;

    // iterate over the days

    document.querySelector(".icon4").src =
      "https://openweathermap.org/img/wn/" + icon4 + ".png";
    document.querySelector(".temp4").innerText = "Temp: " + temp4 + "°F";
    document.querySelector(".wind4").innerText =
      "Wind speed: " + speed4 + "MPH";
    document.querySelector(".humidity4").innerText =
      "Humidity: " + humidity4 + "%";

    console.log("displayWeatherForecase ", data);
    const icon5 = data.daily[4].weather[0].icon;
    const speed5 = data.daily[4].wind_speed;
    const temp5 = data.daily[4].temp.day;
    const humidity5 = data.daily[4].humidity;

    // iterate over the days

    document.querySelector(".icon5").src =
      "https://openweathermap.org/img/wn/" + icon5 + ".png";
    document.querySelector(".temp5").innerText = "Temp: " + temp5 + "°F";
    document.querySelector(".wind5").innerText =
      "Wind speed: " + speed5 + "MPH";
    document.querySelector(".humidity5").innerText =
      "Humidity: " + humidity5 + "%";
  },
};

// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
// has the uv index here so

searchForm.addEventListener("submit", searchHandler);

// function sum(x, y) {
//   // num1 , num2 are parameters that represent the arguments being passed at time of execution
//   var total = x + y;

//   double(total); // total is an argument // execution double
// }

// function double(x) {
//   // x is a parameter
//   console.log(x * 2);
// }

// console.log(x);

// sum(10, 20); /// 10 , 20 are arguments
// sum(30, 40);
