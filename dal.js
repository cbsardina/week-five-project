/////// DAL.JS ////////
const fs = require('fs')
const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");


// ---------- GET RANDOM WORD FORMAT IN ARRAY ----------
function getRandomWord() {
  return randomWord = words[Math.floor(Math.random()*words.length)]
}
function guessWord() {
  const empty = '';
  const guessWord = getRandomWord().split(empty)
  return guessWord
}

// ---------- CREATE UNDERSCORES ----------
function create_ (wordAry) {
  const uScore = wordAry.map(function(x) {
    x = '_'
    return x
  })
  return uScore
}

// ---------- ----------




function compare(word, uScore, count, badGuess) {
  for(let i in word.length) {
    if (guess === word[i]) {
      uScore = uScore.splice(i, 1, guess)
      return uScore
    }
    else {
      count -= 1
      badGuessA = badGuessA.push(guess)
      return [count, badGuessA]
    }
  }
}



module.exports = { guessWord, create_, compare }


//check for req.body.user submit
// function getCheckUser(req, res) {
//   if(req.body.user) {
//     return req.session.user = req.body.user
//   }
//   else {
//     return req.session.user
//   }
// }
