// use moment.js to get the dates for displaying the weather on today AND the five day forcast
// const elem = document.createElement("div");
// const elemText = document.createTextNode("This is a div");

// elem.appendChild(elemText);

// document.body.appendChild(elem);

// elem.classList.add("heading");
// elem.id = "newDiv";
// elem.setAttribute("option", "test");
const currentDate = moment();
var city = "";

document.getElementById("currentDate").innerHTML =
  currentDate.format("MM/DD/YYYY");

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
    const { name } = data;
    const { icon } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    console.log(name, icon, temp, humidity, speed);
    document.querySelector(".city").innerText =
      name + "(" + "#currentDate" + ")";
    // document.querySelector(".icon").src =
    //   "https://openweathermap.org/img/wn/" + icon + ".png";
  },
};

// document.getElementsByClassName("city-name").innerHTML =
