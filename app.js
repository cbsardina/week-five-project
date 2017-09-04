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
  allGuesses,
  filterGuess
} = require('./dal');
// const scrap = require('./scrap')
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
  req.session.wordArr = guessWord()
  req.session.letterCount = (req.session.wordArr).length
  req.session.count = 8
  req.session.uScoreArr = create_(req.session.wordArr)
  req.session.guessArr = []
  res.render('welcome')
})



// ---------- /main --redir--> /main ----------
app.get('/main', isPlayer, (req, res) => {
  res.redirect('/main')
})

// ---------- POST /main =render=> main ----------
app.post('/main', (req, res, next) => {
  req.session.user = (req.session.user) ? req.session.user : req.body.user;
  const wordArr = req.session.wordArr
  const player = req.session.user
  let count = req.session.count

  let guessArr = req.session.guessArr
  const checkGuess = filterGuess(wordArr, req.body.guess, req.session.letterCount)
  const uScoreArr = checkGuess[0]
  req.session.letterCount = checkGuess[1]
  allGuesses(req.session.guessArr, req.body.guess)  //push all guesses
  req.session.guessArr = guessArr

  if ((req.session.letterCount === 0)
            && (req.session.count > 0)) {
    alert('You Win!!!')
  }
  else if ((req.session.count === 0)
              && (req.session.letterCount > 0)){
      alert('Womp Womp...Sorry, try again...')
  }
  //.................................
  // console.log(req.session);
  // console.log('======================');
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    res.render('main', {player, count, wordArr, uScoreArr, guessArr})
})


// console.log('========================');
// console.log();
// console.log();
// console.log('=======================');


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
