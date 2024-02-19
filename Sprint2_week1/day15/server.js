//!  version 1 with 'http.get'
// //! import the http and url modules
// const http = require('http');
// const url = require('url');

// const API_KEY = 'bde7e9114a6d3c2e45b15cade4778466';
// const cities = [
//   { name: 'New York', lat: 40.7128, lng: -74.0060 },
//   { name: 'London', lat: 51.5074, lng: -0.1278 },
//   { name: 'Paris', lat: 48.8566, lng: 2.3522 },
//   { name: 'Tokyo', lat: 35.6895, lng: 139.6917 },
//   { name: 'Sydney', lat: -33.8651, lng: 151.2099 },
//   { name: 'Rome', lat: 41.9028, lng: 12.4964 },
//   { name: 'Cairo', lat: 30.0444, lng: 31.2357 },
//   { name: 'Rio de Janeiro', lat: -22.9068, lng: -43.1729 },
//   { name: 'Dubai', lat: 25.2048, lng: 55.2708 },
//   { name: 'Rabat', lat: 34.0209, lng: -6.8416 }
// ];
// //! create an http server 
// const server = http.createServer((req, res) => {
//   const parsedUrl = url.parse(req.url, true);

//   const path = parsedUrl.pathname;
//   const query = parsedUrl.query;

//   if (path === '/users') {
//     // Handle the '/users' endpoint
//   } else if (path === '/products') {
//     // Inside the "/products" endpoint handler
//     res.writeHead(200, { 'Content-Type': 'text/plain' });
//     res.end('I am a list of products :p');
//   } else if (path === '/weather') {
//     //search the city (from the query ) in the cities array
//     const city = cities.find(c => c.name == query.city);

//     const apiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lng}&appid=${API_KEY}&units=metric`;

//     http.get(apiUrl, (response) => {
//       let data = '';
//       //* add listenner on the data event to contatenate the chunks of data (data can be recieved in multiple chunks)
//       response.on('data', (chunk) => {
//         data += chunk;
//       });
//       //* listener for the end event (all data has been received) to process on the received data
//       response.on('end', () => {
//         try {
//           const weatherData = JSON.parse(data);
//           //* write the data into the page
//           res.writeHead(200, { 'Content-Type': 'text/plain' });
//           res.end(`the temperature is  ${weatherData.main.temp}c In ${query.city}.`);
//         } catch (error) {
//           res.writeHead(500, { 'Content-Type': 'text/plain' });
//           res.end('oops you encounted an error ');
//         }
//       });
//     })

//   } else {
//     res.writeHead(404, { 'Content-Type': 'text/plain' });
//     res.end('Endpoint not found');
//   }
// });

// server.listen(3000, () => {
//   console.log('Server is listening on port 3000');
// });
//!version2  with 'fetch'
//! import the http and url modules
const http = require('http');
const url = require('url');

const API_KEY = 'bde7e9114a6d3c2e45b15cade4778466';
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
//! create an http server 
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  const path = parsedUrl.pathname;
  const query = parsedUrl.query;

  if (path === '/users') {
    // Handle the '/users' endpoint
  } else if (path === '/products') {
    // Inside the "/products" endpoint handler
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('I am a list of products :p');
  } else if (path === '/weather') {
    //search the city (from the query ) in the cities array
    //* retrieve the data from the api
    const cityName = query.city;
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
    display_weather(cityName)
      .then((temp) => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`the temperature is  ${temp}c In ${cityName}.`);
      })
      .catch((error) => {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('oops you encounted an error ', error.message);
      })

  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Endpoint not found');
  }
});

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
