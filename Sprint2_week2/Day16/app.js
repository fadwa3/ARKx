
const express = require('express');
const app = express();
//* define a route
app.get('/', (req, res) => {
    res.send('Welcome to my Express.js server!')
});

app.listen(3000, () => {
    console.log('server is running on port 3000 ...');
});