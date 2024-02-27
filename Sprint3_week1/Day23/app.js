//! import nessecery modules
const express = require('express');
const { body, validationResult } = require('express-validator');
const session = require('express-session');

const app = express();
//! Middlewares

app.use(express.urlencoded({ extended: false }));
app.use(
    session({
        isconnected: false,
        secret: 'mySecretKey',
        resave: false,
        saveUninitialized: true
    }));
//! Server variable 
const users = [
    {
        username: 'fadwa',
        password: 'admin',
    },
];
//! Routes
//* registration route
app.get('/signup', (req, res) => {
    res.send(`
    <h1>Sign Up</h1>
    <form action="/signup" method="POST">
      <input type="text" name="username" placeholder="username" required><br>
      <input type="password" name="password" placeholder="Password" required><br>
      <button type="submit">signup</button>
    </form>
  `);
});
app.post("/signup",
    body('username').trim().isLength({ min: 6 }).withMessage('username must be at least 6 chars long').escape(),
    body('password').isLength({ min: 6 }).withMessage('password must be at least 6 chars long'),

    (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { username, password } = req.body;
        const user = users.find(user => user.username == username);

        if (user) {
            return res.status(400).json({ message: 'oops we already have a user with that username , try again dummy' })
        }
        users.push({ username, password });
        res.redirect('/')
    });
//* authentification route
app.get("/", (req, res) => {
    res.send(`
    <h1>Login</h1>
    <form action="/login" method="POST">
      <input type="text" name="username" placeholder="Username" required><br>
      <input type="password" name="password" placeholder="Password" required><br>
      <button type="submit">Login</button>
    </form>
  `);
});
app.post("/login",
    body('username').notEmpty().trim().escape(),
    body('password').trim().notEmpty(),
    (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { username, password } = req.body;
        const user = users.find((user) => user.username == username && user.password == password);
        if (!user) {
            return res.status(400).send({ message: 'the user entered does not exist !' });
        }
        req.session.isconnected = true;
        req.session.username = username; // Set the value of the 'username' session variable
        res.redirect('/home'); // send to home page after succesful log in
    });
//* loging out route
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
})
//* the Home page route
app.get('/home', (req, res) => {
    if (req.session.isconnected) {
        return res.status(200).json({ message: 'Successful anthentification to HOME page ' });
    }
    res.redirect('/');
});
//! Error handling Middlewares
app.use((req, res, next) => {
    res.status(404).send("oops the route was not found!");
});
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("ooops something went wrong");
});
app.listen(3000, () => {
    console.log("Server is running on port 3000 ...");
});