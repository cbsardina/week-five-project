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

// ---------- ALL PLAYER GUESSES ----------
function allGuesses(guesArr, gues) {
  guesArr.push(gues)
}

// ---------- FILTER GUESSES ----------
let wordArr = ['f', 'e', 'r', 'g', 'i', 'e']
let guess = 'g'
let uScoreArr = ['_','_','_','_','_','_']
let guessArr = []
let count = 8
let letterCount = wordArr.length

function filterGuess(wrdArr, gues, ltrCnt) {
  updateUscoreArr = []
  newLetterCount = ltrCnt
  countDown = true              //need to add this bool condition to the app.js for count need a minus -1 fn in dal for this also  **
  for (i in wrdArr) {
    if (gues === wrdArr[i]) {
      updateUscoreArr.push(wrdArr[i])
      newLetterCount -= 1
      countDown = false
    }
    else { updateUscoreArr.push('_')}
  }
  return [updateUscoreArr, newLetterCount, countDown]
}
const result = filterGuess(wordArr, guess, letterCount)
console.log(result[0]);
console.log(result[1]);
console.log(result[2]);


module.exports = { guessWord, create_, allGuesses, filterGuess }





//check for req.body.user submit
// function getCheckUser(req, res) {
//   if(req.body.user) {
//     return req.session.user = req.body.user
//   }
//   else {
//     return req.session.user
//   }
// }

// function compare(word, uScore, count, badGuess) {
//   for(let i in word.length) {
//     if (guess === word[i]) {
//       uScore = uScore.splice(i, 1, guess)
//       return uScore
//     }
//     else {
//       count -= 1
//       badGuessA = badGuessA.push(guess)
//       return [count, badGuessA]
//     }
//   }
// }
