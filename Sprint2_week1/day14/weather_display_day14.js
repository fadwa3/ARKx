const fs = require('fs');

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

//* retrieve the data from the api
async function display_weather(city_name) {
    try {
        const apiKey = 'bde7e9114a6d3c2e45b15cade4778466';
        const city = cities.find((c) => c.name == city_name);
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lng}&appid=${apiKey}&units=metric`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        const temp = data.main.temp;

        return temp;
    } catch (error) {
        throw new Error('bug : failed to fetch the data from weather api\n', error.message);
    }
}

//* delete existing files with the city name
function deleteCityFile(cityName) {
    const filename = `${cityName}.txt`;
    try {
        fs.unlink(filename);
    } catch (error) {
    }
}

//* write result in a new file
function write_to_File(cityName, temperature) {
    const filename = `${cityName}.txt`;
    fs.writeFile(filename, `Temperature in ${cityName} is  ${temperature} C`, (err) => {
        if (err) { console.log('bug : failure in writing the new file \n', err.message) };
    });
}
//* function to select a random city from an array
function selectRandomCity(cities) {
    const randomIndex = Math.floor(Math.random() * cities.length);
    return cities[randomIndex];
}
//* read array of city names from "input.txt" and do the magic 
fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        throw new Error('bug : failure in reading the input.txt');

    }
    try {
        const random_city = selectRandomCity(JSON.parse(data));

        //* retrieve the weather data 
        display_weather(random_city)
            .then(temp => {
                deleteCityFile(random_city);
                write_to_File(random_city, temp);
                console.log('the new file was created succesfuly :D')
            })
            .catch(error => {
                console.error('bug : error in display weather function\n', error.message);
            });
    } catch (error) {
        console.error('bug : failure parsing the file data \n ', error.message);
    }
});


