const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');

const app = express();

app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: false
    }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
    clientID: '305381128807-euau51nmsa344fk47uvto0o59pk2kcng.apps.googleusercontent.com',
    clientSecret: 'your-client-secret',
    callbackURL: 'http://localhost:3000/auth/google/callback'
},
    (accessToken, refreshToken, profile, done) => {
        // Verify user's profile and create or retrieve user from database
        // Call done() with the user object
    }
));
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    // Retrieve user from database using id
    // Call done() with the user object
});
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] })
);

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect('/profile');
    }
);
app.get('/profile', (req, res) => {
    if (req.isAuthenticated()) {
        // Access user data using req.user
        res.send(`Welcome, ${req.user.displayName}!`);
    } else {
        res.redirect('/login');
    }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});