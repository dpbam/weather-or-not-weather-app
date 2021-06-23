// use moment.js to get the dates for displaying the weather on today AND the five day forcast
// const elem = document.createElement("div");
// const elemText = document.createTextNode("This is a div");

// elem.appendChild(elemText);

// document.body.appendChild(elem);

// elem.classList.add("heading");
// elem.id = "newDiv";
// elem.setAttribute("option", "test");
const currentDate = moment();
const dayOne = moment().add(1, 'day');
const dayTwo = moment().add(2, 'day');
const dayThree = moment().add(3, 'day');
const dayFour = moment().add(4, 'day');
const dayFive = moment().add(5, 'day');

var city = "";

document.getElementById("currentDate").innerHTML =
  currentDate.format("[ (]MM/DD/YYYY[)]");

document.getElementById("day-one").innerHTML = dayOne.format("MM/DD/YYYY")
document.getElementById("day-two").innerHTML = dayTwo.format("MM/DD/YYYY")
document.getElementById("day-three").innerHTML = dayThree.format("MM/DD/YYYY")
document.getElementById("day-four").innerHTML = dayFour.format("MM/DD/YYYY")
document.getElementById("day-five").innerHTML = dayFive.format("MM/DD/YYYY")



let weather = {
  apiKey: "6e6ec74027adce6a58ed16bac77822ab",
  fetchWeather: function (city) {
    fetch(
      "http://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=imperial&appid=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    console.log(data)
    const { name } = data;
    const { icon } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    console.log(name, icon, temp, humidity, speed);
    document.querySelector(".city").innerText =
      name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".icon").innerText = icon;
    document.querySelector(".temp").innerText = "Temp: " + temp + "°F";
    document.querySelector(".wind").innerText = "Wind speed: " + speed + "MPH";
    document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
  },
};

var searchButton = document.querySelector(".search-btn")
searchButton.addEventListener("click", function(clickEvent) {
var city = document.getElementById("city-name").value
console.log(city)
weather.fetchWeather(city);

})

// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
// has the uv index here so 

