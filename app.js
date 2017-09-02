/////// APP.JS //////

const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');
const session = require('express-session');
const bodyParser = require('body-parser');
const {
  guessWord
} = require('./dal');
// const routes = require('./routes/routes');

// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

// set up bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// set up public directory for express use
app.use(express.static('public'));

//session
app.use(
  session({
    secret: 'puppy monkey baby',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: null }
  }))
  // verify login
  function isPlayer(req, res, next) {
    if(req.session.user) {
      next();
    }
    else {
      res.redirect('/welcome');
    }
  }


//============== ROUTES =========================

// ---------- / --redir--> /welcome ----------
app.get('/', (req, res) => {
  res.redirect('/welcome')
})

// ---------- /welcome =render=> welcome ----------
app.get('/welcome', (req, res) => {
  req.session.word = guessWord()
  const count = 9;
  req.session.count = count
  //.................................
  console.log('req.session.count::');
  console.log(req.session.count);
  console.log('======================');
  res.render('welcome')
})

// ---------- /main --redir--> /main ----------
app.get('/main', isPlayer, (req, res) => {
  res.redirect('/main')
})  // ∆ to conditional based on count

// ---------- POST /main =render=> main ----------
app.post('/main', (req, res, next) => {
  if (req.session.user) {          //starts and maintains session user
    next()
  }
    else {
      req.session.user = req.body.user
    }
  const player = req.session.user
  const word = req.session.word   // use word[i]
  const count = req.session.count - 1   // ∆ to conditional
  const guess = req.body.guess
  console.log('========================');
  console.log('Guess below:: ');
  console.log(guess);
  console.log('=======================');
  req.session.count = count
  console.log(req.session);
    res.render('main', {player, word, count})
})


// app.post('/main/:guesses_left', isPlayer, (req, res) => {
//   const guessLetter = req.body.guess
//   console.log(guessLetter);
// })
// app.post('/main', (req, res) => {
//
//
//   res.render('main', {player})
// })
//
// app.get('/main', isPlayer, (req, res) => {
//
//
// })

  // =========== PORT SETUP =========================//
app.listen(3000, (req, res) => {
  console.log('Server running on 3000');
})
