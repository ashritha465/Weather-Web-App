const apikey = "2d240daa02557c5f2e290d58cc8fb4ff";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const url = (city) =>
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
//STEP 2
async function getWeatherByLocation(city) {
    const resp = await fetch(url(city), { origin: "cors" });
    const respData = await resp.json();

    console.log(respData);

    addWeatherToPage(respData);
}
//STEP 3
function addWeatherToPage(data) {
    const temp = KtoC(data.main.temp);
 //STEP 5
    const weather = document.createElement("div");
    weather.classList.add("weather");

    weather.innerHTML = `
        <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp}°C <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h2>
        <small>${data.weather[0].main}</small>
    `;

    // cleanup
    main.innerHTML = "";

    main.appendChild(weather);
}
//STEP 4
function KtoC(K) {
    return Math.floor(K - 273.15);
}
//After Submitting the form -STEP-1
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const city = search.value;

    if (city) {
        getWeatherByLocation(city);
    }
});

