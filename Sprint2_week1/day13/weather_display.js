//* List of cities to be used
const cities = [
    { name: 'New York', lat: 40.7128, lng: -74.0060 },
    { name: 'London', lat: 51.5074, lng: -0.1278 },
    { name: 'Paris', lat: 48.8566, lng: 2.3522 },
    { name: 'Tokyo', lat: 35.6895, lng: 139.6917 },
    { name: 'Sydney', lat: -33.8651, lng: 151.2099 },
    { name: 'Rome', lat: 41.9028, lng: 12.4964 },
    { name: 'Cairo', lat: 30.0444, lng: 31.2357 },
    { name: 'Rio de Janeiro', lat: -22.9068, lng: -43.1729 },
    { name: 'Dubai', lat: 25.2048, lng: 55.2708 },
    { name: 'Rabat', lat: 34.0209, lng: -6.8416 }
  ];
 
async function display_weather(city){
try{   
const apiKey = 'bde7e9114a6d3c2e45b15cade4778466';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lng}&appid=${apiKey}&units=metric`;

const response = await fetch(apiUrl);
const data = await response.json();
const temp=data.main.temp;
const city=data.name;
return ({city,temp})

}catch(error){
    throw new Error('failed to fetch the data from weather api');
}
}

//* Function to select a city randomly
function selectRandomCity(cities) {
    const randomIndex = Math.floor(Math.random() * cities.length);
    return cities[randomIndex];
}

display_weather(selectRandomCity(cities))
.then((data)=>{
    console.log('--> Here is the weather of a random city : ');
    console.log(`${data.city}  : ${data.temp}`);
})
.catch((error)=>{
  console.log('--> ooops here is a bug :( ')
  console.log(error);
})
