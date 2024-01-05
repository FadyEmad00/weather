let todyDegree = document.getElementById("tody-degree");
let todyIcon = document.getElementById("tody-icon");
let todyStatus = document.getElementById("tody-status");

let days = document.querySelectorAll("#day");
let dayIcons = document.querySelectorAll("#day-icon");
let dayMax = document.querySelectorAll("#day-max");
let dayMin = document.querySelectorAll("#day-min");
let dayStatus = document.querySelectorAll("#day-status");

let form = document.getElementById("form");
let searchInput = document.getElementById("search");

let countryName = document.getElementById("country-name");
let todyDate = document.getElementById("tody-date");

function fetchData(contury) {
  fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=1541c432b30f43ec876200626240101&q=${contury}&days=3`
  )
    .then((response) => response.json())
    .then((data) => {
      todyDegree.textContent = data.current.temp_c;
      todyIcon.src = "https:" + data.current.condition.icon;
      todyStatus.textContent = data.current.condition.text;

      countryName.textContent = data.location.name;

      var d = new Date(data.forecast.forecastday[0].date);
      todyDate.textContent = `${d.getDay()}/${
        d.getMonth() + 1
      }/${d.getFullYear()} `;

      days.forEach((day, index) => {
        var d = new Date(data.forecast.forecastday[index].date);
        day.textContent = d.toString().split(" ")[0];
      });

      dayIcons.forEach((icon, index) => {
        icon.src =
          "https:" + data.forecast.forecastday[index + 1].day.condition.icon;
        // console.log(
        //   data.forecast.forecastday[index + 1].day.condition.icon.split("//")[1]
        // );
      });

      dayMax.forEach((maxTemp, index) => {
        maxTemp.textContent =
          data.forecast.forecastday[index + 1].day.maxtemp_c;
      });

      dayMin.forEach((minTemp, index) => {
        minTemp.textContent =
          data.forecast.forecastday[index + 1].day.mintemp_c;
      });

      dayStatus.forEach((dayStatus, index) => {
        dayStatus.textContent =
          data.forecast.forecastday[index + 1].day.condition.text;
      });
    })
    .catch((error) => alert("No matching location found."));
}

fetchData("egypt");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  search(searchInput.value);
});

function search(value) {
  fetchData(value);
}
