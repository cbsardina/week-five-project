/////// APP.JS //////

const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');
const session = require('express-session');
const bodyParser = require('body-parser');
const {
  guessWord,
  create_,
  checkGuess,
  filterGuess,
  counter
} = require('./dal');

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
    cookie: { maxAge: null },
  }))

  // verify player
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
  const sesh = req.session
  sesh.wordArr = guessWord()
  sesh.letterCount = (sesh.wordArr).length
  sesh.count = 8
  sesh.uScoreArr = create_(sesh.wordArr)
  sesh.allGuessArr = []
  console.log(sesh);
  res.render('welcome')
})

// ---------- /main --redir--> /main ----------
app.get('/main', isPlayer, (req, res) => {
  res.redirect('/main')
})

// ---------- POST /main =render=> main ----------
app.post('/main', (req, res) => {
  const sesh = req.session
  sesh.user = (sesh.user) ? sesh.user : req.body.user;
  //---------- if click guess, fn to compare, splice, etc.
  if (req.body.guess) {
    const checkGuess = filterGuess(sesh.wordArr,
                                  sesh.uScoreArr,
                                  req.body.guess,
                                  sesh.letterCount,
                                  sesh.allGuessArr)
    sesh.uScoreArr = checkGuess[0]
    sesh.letterCount = checkGuess[1]
    const checkCount = counter(sesh.count, checkGuess[2])
    sesh.count = checkCount
    sesh.allGuessArr = checkGuess[3]
  };
  //----------- assign variables for views
  const wordArr = sesh.wordArr;
  const player = sesh.user;
  let allGuessArr = sesh.allGuessArr;
  let uScoreArr = sesh.uScoreArr;
  let count = sesh.count;
  console.log(req.body.guess);
  console.log(sesh);
  //conditionals winner, loser, continue game
  if (sesh.letterCount === 0 && sesh.count > 0) {
    res.render('winner', {player, wordArr}) }
  else if (sesh.count === 0 && sesh.letterCount > 0) {
    res.render('loser', {player, wordArr, uScoreArr}) }
  else {
    res.render('main', {player, count, uScoreArr, allGuessArr})
  }
});


// =========== PORT SETUP =========================//
app.listen(3000, (req, res) => {
  console.log('Server running on 3000');
})
