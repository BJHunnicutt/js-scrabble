// Scrabble Javascript Project


// WAVE 1:
// Scrabble function (acting as a class)
var Scrabble = function() {

};

// YOUR CODE HERE
Scrabble.prototype.helloWorld = function() {
  return 'hello world!';
};

// Function to score individual letters
Scrabble.prototype.letterScore = function(letter) {
  var letterValues = {AEIOULNRST: 1, DG: 2, BCMP: 3, FHVWY: 4, K: 5, JX: 8, QZ: 10};
  var letterSets = Object.keys(letterValues);

  // Loop through the set of letters for each point value
  for (var i in letterSets) {
    // if the set with a given point value includes the letter
    if (letterSets[i].includes(letter.toUpperCase())) {   // Tried a regex version but not sure how to put a variabel in the a-z part: (str.match(/[a-z]/i)) {  // THe i makes the reg exp case insensitive
      // Return the point value associated with that set
      return letterValues[letterSets[i]];
    }
  }
};

// score(word): returns the total score value for the given word
Scrabble.prototype.score = function(word) {
  var score = 0;
  for (var i = 0, len = word.length; i < len; i++) {
    score = score + this.letterScore(word[i]);
  }
  // 7-letter word bonus
  if (len == 7) {score = score + 50;}
  return score;
};


// highestScoreFrom(arrayOfWords): returns the word in the array with the highest score
Scrabble.prototype.highestScoreFrom = function(arrayOfWords) {
  var highest = arrayOfWords[0];
  for (let word of arrayOfWords) {
    // the highest scoring word
    if (this.score(word) > this.score(highest)) {
      highest = word;
    }
    // the shortest of two words with the same score
    else if (this.score(word) == this.score(highest) && word.length < highest.length) {
      highest = word;
    }
  }
  return highest;
};




// Helpful description of exporting modules: https://www.sitepoint.com/understanding-module-exports-exports-node-js/
module.exports = Scrabble;


var s = new Scrabble();

console.log(s.helloWorld());  // => hello world!
console.log(s.score('aaaaaaa'));  // => 57
console.log(s.score('quiz'));  // => 22

var words = ['one', 'pour', 'two']; // points = 3, 6, 6, should pick two becaues it's shorter
console.log(s.highestScoreFrom(words));
