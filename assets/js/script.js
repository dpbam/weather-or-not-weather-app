const currentDate = moment();
const apiKey = '6e6ec74027adce6a58ed16bac77822ab';
const dayOne = moment().add(1, 'day');
const dayTwo = moment().add(2, 'day');
const dayThree = moment().add(3, 'day');
const dayFour = moment().add(4, 'day');
const dayFive = moment().add(5, 'day');

var city = '';

document.getElementById('day-one').innerHTML = dayOne.format('MM/DD');
document.getElementById('day-two').innerHTML = dayTwo.format('MM/DD');
document.getElementById('day-three').innerHTML = dayThree.format('MM/DD');
document.getElementById('day-four').innerHTML = dayFour.format('MM/DD');
document.getElementById('day-five').innerHTML = dayFive.format('MM/DD');

var savedCities = JSON.parse(localStorage.getItem('cities')) || [];

// store the value of the city in localStorage
// document.getElementById("city-name").value = localStorage.getItem(city);

// get that city name back

// put it on a new button

// put an onClick on that button so you can search again.

let weather = {
  fetchWeather: function (x) {
    // (x) Parameter
    fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=' +
        x +
        '&units=imperial&appid=' +
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

    document.querySelector('.city').innerText = name;
    document.querySelector('.icon').src =
      'https://openweathermap.org/img/wn/' + icon + '.png';
    document.querySelector('.temp').innerText = 'Temp: ' + temp + '°F';
    document.querySelector('.wind').innerText = 'Wind speed: ' + speed + 'MPH';
    document.querySelector('.humidity').innerText =
      'Humidity: ' + humidity + '%';
  },
};

function toggleWeather() {
  // get the .weather div
  var myWeather = document.getElementById('weather');
  var myForecast = document.getElementById('five-day-forecast');

  // get the current value of the weather's display property
  var displaySetting = myWeather.style.display;
  var displaySettingForecast = myForecast.style.display;

  // also get the weather search button, so we can change what it says
  var searchButton = document.getElementById('searchButton');

  // now toggle the search and the button text, depending on the current state
  if (displaySetting == 'block') {
    // weather is visible. hide it
    myWeather.style.display = 'block';
    // change button text
    searchButton.innerHTML = 'Search';
  } else {
    // weather is hidden. show it
    myWeather.style.display = 'block';
    // change button text
    searchButton.innerHTML = 'Search';
  }
  if (displaySettingForecast == 'block') {
    myForecast.style.display = 'block';
    searchButton.innerHTML = 'Search';
  } else {
    myForecast.style.display = 'block';
    searchButton.innerHTML = 'Search';
  }
}

var searchButton = document.querySelector('.search-btn');

var searchHandler = function (clickEvent) {
  clickEvent.preventDefault();
  var city = document.getElementById('city-name').value;
  weather.fetchWeather(city); // city is an argument

  document.getElementById('currentDate').innerHTML =
    currentDate.format('[ (]MM/DD/YYYY[)]');

  for (var i = 0; i < savedCities.length; i++) {
    if (savedCities[i] !== city) {
      // something here?
    }
  }

  // for (var i = 0; i < savedCities.length; i++) {
  //   if (!city) {
  //     savedCities.push(city);
  //   }
  // }

  // if (savedCities.length) {
  //   savedCities.push(city);
  //   localStorage.setItem('cities', JSON.stringify(savedCities));
  // }

  // for (var i = 0; i < savedCities.length; i++) {
  //   // var cityItem = $('<button>');
  //   console.log(savedCities[i]);
  //   if (savedCities[i] === city) {
  //     var cityItem = document.getElementsByClassName('city-btn');
  //     if (cityItem) {
  //       cityItem.attr('data-cityname', savedCities[i]);
  //       cityItem.setAttribute('class', 'city-btn');
  //       cityItem.text(savedCities[i]);
  //       $('city-div').append(savedCities[i]);
  //     }
  //   }
  // }

  // var cityButton = document.createElement('BUTTON');
  // console.log(cityButton);
  // cityButton.innerText = `${city}`;
  // cityButton.classList = 'city-btn';
  // document.getElementById('city-div').appendChild(cityButton);
  // why does the below not work for searching based on that city?
  // is it because I need to grab the city name ON that button?
  // document.getElementsByClassName('city-btn').innerHTML.onclick = searchHandler(
  //   'click',
  //   city
  // );
  // document.getElementsByClassName('city-btn').innerText.searchHandler(city);

  // $(document).ready(function () {
  document
    .getElementsByClassName('city-btn')[0]
    .addEventListener('click', searchHandler);
};

var searchForm = document.querySelector('#search');

let forecast = {
  fetchForecast: function (lat, lon) {
    fetch(
      'https://api.openweathermap.org/data/2.5/onecall?lat=' +
        lat +
        '&lon=' +
        lon +
        '&units=imperial&appid=' +
        apiKey
    )
      .then((response) => response.json())
      .then((data) => this.displayForecast(data));
  },

  uvIndex: function (current) {
    // in the current object we're pulling out uvi
    const { uvi } = current;
    document.querySelector('.uvIndex').innerText = uvi;

    if (uvi < 2) {
      document.querySelector('.uvIndex').style.backgroundColor = 'green';
      document.querySelector('.uvIndex').style.color = 'white';
    }
    if (2 < uvi < 7) {
      document.querySelector('.uvIndex').style.backgroundColor = 'orange';
      document.querySelector('.uvIndex').style.color = 'white';
    }
    if (uvi > 7) {
      document.querySelector('.uvIndex').style.backgroundColor = 'purple';
      document.querySelector('.uvIndex').style.color = 'white';
    }
  },

  displayForecast: function (data) {
    const icon1 = data.daily[0].weather[0].icon;
    const speed1 = data.daily[0].wind_speed;
    const temp1 = data.daily[0].temp.day;
    const humidity1 = data.daily[0].humidity;
    const uvi = data.current.uvi;

    this.uvIndex(data.current);

    document.querySelector('.icon1').src =
      'https://openweathermap.org/img/wn/' + icon1 + '.png';
    document.querySelector('.temp1').innerText = 'Temp: ' + temp1 + '°F';
    document.querySelector('.wind1').innerText =
      'Wind speed: ' + speed1 + 'MPH';
    document.querySelector('.humidity1').innerText =
      'Humidity: ' + humidity1 + '%';

    const icon2 = data.daily[1].weather[0].icon;
    const speed2 = data.daily[1].wind_speed;
    const temp2 = data.daily[1].temp.day;
    const humidity2 = data.daily[1].humidity;

    document.querySelector('.icon2').src =
      'https://openweathermap.org/img/wn/' + icon2 + '.png';
    document.querySelector('.temp2').innerText = 'Temp: ' + temp2 + '°F';
    document.querySelector('.wind2').innerText =
      'Wind speed: ' + speed2 + 'MPH';
    document.querySelector('.humidity2').innerText =
      'Humidity: ' + humidity2 + '%';

    const icon3 = data.daily[2].weather[0].icon;
    const speed3 = data.daily[2].wind_speed;
    const temp3 = data.daily[2].temp.day;
    const humidity3 = data.daily[2].humidity;

    document.querySelector('.icon3').src =
      'https://openweathermap.org/img/wn/' + icon3 + '.png';
    document.querySelector('.temp3').innerText = 'Temp: ' + temp3 + '°F';
    document.querySelector('.wind3').innerText =
      'Wind speed: ' + speed3 + 'MPH';
    document.querySelector('.humidity3').innerText =
      'Humidity: ' + humidity3 + '%';

    const icon4 = data.daily[3].weather[0].icon;
    const speed4 = data.daily[3].wind_speed;
    const temp4 = data.daily[3].temp.day;
    const humidity4 = data.daily[3].humidity;

    document.querySelector('.icon4').src =
      'https://openweathermap.org/img/wn/' + icon4 + '.png';
    document.querySelector('.temp4').innerText = 'Temp: ' + temp4 + '°F';
    document.querySelector('.wind4').innerText =
      'Wind speed: ' + speed4 + 'MPH';
    document.querySelector('.humidity4').innerText =
      'Humidity: ' + humidity4 + '%';

    const icon5 = data.daily[4].weather[0].icon;
    const speed5 = data.daily[4].wind_speed;
    const temp5 = data.daily[4].temp.day;
    const humidity5 = data.daily[4].humidity;

    document.querySelector('.icon5').src =
      'https://openweathermap.org/img/wn/' + icon5 + '.png';
    document.querySelector('.temp5').innerText = 'Temp: ' + temp5 + '°F';
    document.querySelector('.wind5').innerText =
      'Wind speed: ' + speed5 + 'MPH';
    document.querySelector('.humidity5').innerText =
      'Humidity: ' + humidity5 + '%';
  },
};

searchForm.addEventListener('submit', searchHandler);
