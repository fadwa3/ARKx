//! import nessecery modules
const express = require('express');
const { body, validationResult } = require('express-validator');
const session = require('express-session');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


const app = express();
//! Middlewares
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(
    session({
        isconnected: false,
        secret: 'mySecretKey',
        resave: false,
        saveUninitialized: true
    }));
//
app.use(passport.initialize());
//
app.use(passport.session());
//! Server variable 
const users = [
    {
        username: 'fadwa',
        password: 'admin',
    },
];
//! Passport
//*the log in 
passport.use(new LocalStrategy(
 
    (username, password, done) => {
        const user = users.find(user => user.username === username && user.password === password);
        if (!user) {
            return done(null, false, { message: 'Incorrect username or password' });
        }
        return done(null, user);
    }
));
//* the serialize
passport.serializeUser((user, done) => {
    done(null, user.username);
});
//* the deserialize
passport.deserializeUser((username, done) => {
    const user = users.find(user => user.username === username);
    done(null, user);
});
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
//! changed (added the Passport)
app.post('/login',
    passport.authenticate('local', {
        successRedirect: '/home',
        failureRedirect: '/',
        failureFlash: true
    })
);
//*
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}
//* the Home page route
app.get('/home', isAuthenticated, (req, res) => {
    res.status(200).json({ message: 'Successful anthentification to HOME page ' });
});
//* loging out route
app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})

//! Error handling Middlewares
app.use((req, res, next) => {
    res.status(404).send("oops the route was not found!");
});
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("ooops something went wrong");
});
app.listen(3009, () => {
    console.log("Server is running on port 3009 ...");
});