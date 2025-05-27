const button = document.getElementById("search");
const input= document.getElementById("input-button");



const cityTemp =document.getElementById("city-temp");
const cityTime =document.getElementById("city-time");
const cityName =document.getElementById("city-name");


async function getData(cityName){
   const promise = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=66347aa7db1b4cca88a214303252402&q=${cityName}&aqi=yes`
    ); 
    return await promise.json();
}
button.addEventListener("click", async()=>{
    const value =input.value;
    const result = await getData(value);
    cityName.innerText =`${result.location.name}, ${result.location.region}-${result.location.country}`;
    cityTime.innerText = result.location.localtime;
    cityTemp.innerText = result.current.temp_c;
});