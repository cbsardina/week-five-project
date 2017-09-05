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

function filterGuess(wrdArr, currUscoreArray, gues, ltrCnt, allGuesses) {
  let updateUscoreArr = currUscoreArray
  let newLetterCount = ltrCnt
  let countDown = true
  let updateGuessArr = allGuesses
  updateGuessArr.push(gues)
  for (i in wrdArr) {
    if (gues === wrdArr[i]) {
      updateUscoreArr.splice(i, 1, gues)
      newLetterCount -= 1
      countDown = false
    }
  }
  return [updateUscoreArr, newLetterCount, countDown, updateGuessArr]
}

//---------- COUNTER ----------
function counter(cnt, cntBool) {
  if (cntBool){
    cnt -= 1
    return cnt
  } else { return cnt}
}


module.exports = { guessWord, create_, filterGuess, counter }
