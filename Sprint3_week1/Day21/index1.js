const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();
//! added
const { body, validationResult } = require('express-validator');
const escapeHtml = require('escape-html');
const csurf = require('csurf');


// Middleware

app.use(bodyParser.urlencoded({ extended: true })); //*
app.use(cookieParser()); //*
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true })); //* Middleware for session management

app.use(csurf({ cookie: true }));//* Enable CSRF protection middleware

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Sample Vulnerable Node.js Application');
});

app.get('/login', (req, res) => {

  res.send(`
    <h1>Login</h1>
    <form action="/login" method="POST">

    <!-- CSRF token field -->
      <input type="hidden" name="_csrf" value="${req.csrfToken()}"> 

      <input type="text" name="username" placeholder="Username" required><br>
      <input type="password" name="password" placeholder="Password" required><br>
      <button type="submit">Login</button>
    </form>
  `);
});

app.post('/login', body('username').notEmpty().trim().escape(),
  (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    // Authenticate user (vulnerable code for the challenge)
    if (username === 'admin' && password === 'password') {
      req.session.authenticated = true;
      req.session.username = escapeHtml(username); // Set the username in the session
      res.redirect('/profile');
    } else {
      res.send('Invalid username or password');
    }
  });

app.get('/profile', (req, res) => {

  if (req.session.authenticated) {
    res.send(`<h1>Welcome to your profile : ${req.session.username} </h1>`);
  } else {
    res.redirect('/login');
  }
});

// Server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
