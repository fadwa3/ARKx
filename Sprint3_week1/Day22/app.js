const express = require('express');
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const app = express();
//* array of users alowed to log in
const USERS = [
  {
    username: "fadwa",
    password: "admin"
  },
  {
    username: "mona",
    password: "root"
  },
  {
    username: "salma",
    password: "dummy"
  }
];
//?  MIDDLEWARES
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

//! function to verify Authentification
function verifyAuthentification(req, res, next) {
  //* get the header that contain the token + verify if it's empty
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(400).json({ message: "u are not authorized" });
  }
  //* extract the token
  const token = authHeader.split(" ")[1];
  const user = jwt.verify(token, "key");
  if (!user) {
    return res.status(403).json({ message: "u are not authorized" });
  }
  req.user = user;
  next();
}
//? ROUTES
app.get('/', (req, res) => {
  res.render('index');
});

app.post('/login', body('username').notEmpty().trim().escape(), body('password').notEmpty().trim().escape(), (req, res) => {
  const { username, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  if (USERS.find((user) => user.username == username && user.password == password)) {
    //* authenticate the user with a token
    const token = jwt.sign({ username: username }, "key", {
      expiresIn: "2000s"
    });
    //*send the token as res to use in the header to enter dashboard
    res.json({ token: token })
  } else {
    res.redirect('/');
  }
});

app.get('/dashboard', verifyAuthentification, (req, res) => {

  res.render('dashboard');

});


app.listen(3001, () => {
  console.log('Server started on port 3001 ...');
});
