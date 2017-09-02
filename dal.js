/////// DAL.JS ////////
const fs = require('fs')
const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");


// ---------- GET RANDOM WORD ----------
function getRandomWord() {
  return randomWord = words[Math.floor(Math.random()*words.length)]
}

// ---------- CREATE UNDERSCORES ----------
function guessWord() {
  const empty = '';
  const guessWord = getRandomWord().split(empty)
  return guessWord
}
//check for req.body.user submit
function getCheckUser(req, res) {
  if(req.body.user) {
    return req.session.user = req.body.user
  }
  else {
    return req.session.user
  }
}

module.exports = { guessWord }
