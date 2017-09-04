// var arr = [
//   { id: 15 },
//   { id: -1 },
//   { id: 0 },
//   { id: 3 },
//   { id: 12.2 },
//   { },
//   { id: null },
//   { id: NaN },
//   { id: 'undefined' }
// ];
//
// var invalidEntries = 0;
//
// function isNumber(obj) {
//   return obj!== undefined && typeof(obj) === 'number' && !isNaN(obj);
// }
//
// function filterByID(item) {
//   if (isNumber(item.id)) {
//     item.id += 100    // <++ can add to this
//     return true;
//   }
//   invalidEntries++;
//   return false;
// }
//
// var arrByID = arr.filter(filterByID);
//
// console.log('Filtered Array\n', arrByID);
// // Filtered Array
// // [{ id: 15 }, { id: -1 }, { id: 0 }, { id: 3 }, { id: 12.2 }]
//
// console.log('Number of Invalid Entries = ', invalidEntries);
// // Number of Invalid Entries = 4



var words = ["spray", "limit", "elite", "exuberant", "destruction", "present"];

function checkWord(word) {
  return word.length >6
}
let allOfIt = []

function learnFilter(wordArr) {
  let longWords = wordArr.filter(checkWord)
  let something = 8;
  let somethingElse = ['9', 's', 10]
  // const allOfIt = [longWords, something, somethingElse]
  // return allOfIt
  allOfIt.push(longWords, something, somethingElse)
}
learnFilter(words)
console.log(allOfIt);

// console.log(learnFilter(words)[2]);
// Filtered array longWords is ["exuberant", "destruction", "present"]
console.log('===================================');
console.log('===================================');
let otherArr = ['f', 'e', 'r', 'g', 'i', 'e']
let guess = 'e'
let emptyArr = []

function isEqual(letter, gues) {
  return letter === gues
}
function filterWord(wordArr, gues) {
  let resultArr = wordArr.filter(isEqual)
  let somethingElse = ['9', 's', 10]
  // emptyArr.push(resultArr, somethingElse)
  return [resultArr, somethingElse]
}

const runFun = filterWord(otherArr, guess)
console.log(runFun);
console.log(runFun[0]);
console.log(runFun[1]);
