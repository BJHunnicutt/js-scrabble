// Scrabble Javascript Project

// Helpful description of exporting modules: https://www.sitepoint.com/understanding-module-exports-exports-node-js/
module.exports = Scrabble;

// ------------------------- WAVE 1 ------------------------- //
// Scrabble constructor function (acting as a class)
var Scrabble = function() {};

    // Test function
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


// ------------------------- WAVE 2 ------------------------- //
// Player constructor function (with initialized instance of a name)
var Player = function(name) {
  this.name = name;
  this.plays = [];
  this.game = new Scrabble();
};


// play(word): Function which adds the input word to the plays Array -- Returns false if player has already won
Player.prototype.play = function(word) {
  if (this.hasWon === true) {
    return false;
  }
  else {
    this.plays = this.plays.concat(word);
  }
};

// totalScore(): Function which sums up and returns the score of the players words
Player.prototype.totalScore = function() {
  var total = 0;
  for (let word of this.plays) {
    total = total + this.game.score(word);
  }
  return total;
};

// hasWon(): Function which returns true if the player has over 100 points, otherwise returns false
Player.prototype.hasWon = function() {
  if (this.totalScore >= 100) {
    return true;
  }
  else {
    return false;
  }
};

// highestScoringWord(): Function which returns the highest scoring word the user has played
Player.prototype.highestScoringWord = function() {
  var word = this.game.highestScoreFrom(this.plays);
  return word
};

// highestWordScore(): Function which returns the highestScoringWord score
Player.prototype.highestWordScore = function() {
  var score = this.game.score(this.highestScoringWord());
  return score
};



// WAVE 1: tests //
console.log("\n--- Wave 1 tests ---")
var s = new Scrabble();
console.log(s.helloWorld() + ' == hello world!');  // => hello world!
console.log(s.score('aaaaaaa') + ' == 57');  // => 57
console.log(s.score('quiz') + ' == 22');  // => 22

var words = ['one', 'pour', 'two']; // points = 3, 6, 6, should pick two becaues it's shorter
console.log(s.highestScoreFrom(words) + ' == two');


// WAVE 2: tests //
console.log("\n--- Wave 2 tests ---")
var player1 = new Player("Jeannie");
console.log(player1.name + ' == Jeannie');
console.log(player1.plays); // => []
player1.play('test');
console.log(player1.plays); // => ['test']
console.log(player1.totalScore() + ' == 4'); // => 4
console.log(player1.hasWon() + ' == false'); // => false
player1.play('banana');
console.log(player1.plays); // => ['test', 'banana']
console.log(player1.totalScore() + ' == 12'); // => 12
console.log(player1.highestScoringWord() + " == banana"); // => 'banana'
console.log(player1.highestWordScore() + " == 8"); // => 8



// --------------- OPTIONAL ENHANCEMENTS --------------- //
var p1 = new Player("Jeannie");
var p2 = new Player("Brent");
p1_l1 = "A"; p1_l2 = "A"; p1_l3 = "A"; p1_l4 = "A"; p1_l5 = "A"; p1_l6 = "A"; p1_l7 = "A";
p2_l1 = "A"; p2_l2 = "A"; p2_l3 = "A"; p2_l4 = "A"; p2_l5 = "A"; p2_l6 = "A"; p2_l7 = "A";

var boardArray = [
  ["\#", ".", ".", "+", ".", ".", ".", "\#", ".", ".", ".", "+", ".", ".", "\#"],
  [".", "=", ".", ".", ".", "*", ".", ".", ".", "*", ".", ".", ".", "=", "."],
  [".", ".", "=", ".", ".", ".", "+", ".", "+", ".", ".", ".", "=", ".", "."],
  ["+", ".", ".", "=", ".", ".", ".", "+", ".", ".", ".", "=", ".", ".", "+"],
  [".", ".", ".", ".", "=", ".", ".", ".", ".", ".", "=", ".", ".", ".", "."],
  [".", "*", ".", ".", ".", "*", ".", ".", ".", "*", ".", ".", ".", "*", "."],
  [".", ".", "+", ".", ".", ".", "+", ".", "+", ".", ".", ".", "+", ".", "."],
  ["\#", ".", ".", "+", ".", ".", ".", ".", ".",".", ".", "+", ".", ".", "\#"],
  [".", ".", "+", ".", ".", ".", "+", ".", "+", ".", ".", ".", "+", ".", "."],
  [".", "*", ".", ".", ".", "*", ".", ".", ".", "*", ".", ".", ".", "*", "."],
  [".", ".", ".", ".", "=", ".", ".", ".", ".", ".", "=", ".", ".", ".", "."],
  ["+", ".", ".", "=", ".", ".", ".", "+", ".", ".", ".", "=", ".", ".", "+"],
  [".", ".", "=", ".", ".", ".", "+", ".", "+", ".", ".", ".", "=", ".", "."],
  [".", "=", ".", ".", ".", "*", ".", ".", ".", "*", ".", ".", ".", "=", "."],
  ["\#", ".", ".", "+", ".", ".", ".", "\#", ".", ".", ".", "+", ".", ".", "\#"]
];

var title = "\n\n\n\n\n\n" +
"   ███████╗ ██████╗██████╗  █████╗ ██████╗ ██████╗ ██╗     ███████╗\n" +
"  ██╔════╝██╔════╝██╔══██╗██╔══██╗██╔══██╗██╔══██╗██║     ██╔════╝\n" +
"  ███████╗██║     ██████╔╝███████║██████╔╝██████╔╝██║     █████╗\n" +
"  ╚════██║██║     ██╔══██╗██╔══██║██╔══██╗██╔══██╗██║     ██╔══╝\n" +
"  ███████║╚██████╗██║  ██║██║  ██║██████╔╝██████╔╝███████╗███████╗\n" +
"  ╚══════╝ ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚═════╝ ╚══════╝╚══════╝\n\n\n";



var board = "\t   a b c d e f g h i j k l m n o     ---------------------" + "\n" +
"\t 0|" + " " + boardArray[0][0]  + " " + boardArray[0][1]  + " " + boardArray[0][2]  + " " + boardArray[0][3]  + " " + boardArray[0][4]  + " " + boardArray[0][5]  + " " + boardArray[0][6]  + " " + boardArray[0][7]  + " " + boardArray[0][8]  + " " + boardArray[0][9]  + " " + boardArray[0][10]  + " " + boardArray[0][11]  + " " + boardArray[0][12]  + " " + boardArray[0][13]  + " " + boardArray[0][14] + "|0         " + p1.name + "'s" + "\n" +
"\t 1|" + " " + boardArray[1][0]  + " " + boardArray[1][1]  + " " + boardArray[1][2]  + " " + boardArray[1][3]  + " " + boardArray[1][4]  + " " + boardArray[1][5]  + " " + boardArray[1][6]  + " " + boardArray[1][7]  + " " + boardArray[1][8]  + " " + boardArray[1][9]  + " " + boardArray[1][10]  + " " + boardArray[1][11]  + " " + boardArray[1][12]  + " " + boardArray[1][13]  + " " + boardArray[1][14] + "|1         TILES:" + "\n" +
"\t 2|" + " " + boardArray[2][0]  + " " + boardArray[2][1]  + " " + boardArray[2][2]  + " " + boardArray[2][3]  + " " + boardArray[2][4]  + " " + boardArray[2][5]  + " " + boardArray[2][6]  + " " + boardArray[2][7]  + " " + boardArray[2][8]  + " " + boardArray[2][9]  + " " + boardArray[2][10]  + " " + boardArray[2][11]  + " " + boardArray[2][12]  + " " + boardArray[2][13]  + " " + boardArray[2][14] + "|2    |---------------|" + "\n" +
"\t 3|" + " " + boardArray[3][0]  + " " + boardArray[3][1]  + " " + boardArray[3][2]  + " " + boardArray[3][3]  + " " + boardArray[3][4]  + " " + boardArray[3][5]  + " " + boardArray[3][6]  + " " + boardArray[3][7]  + " " + boardArray[3][8]  + " " + boardArray[3][9]  + " " + boardArray[3][10]  + " " + boardArray[3][11]  + " " + boardArray[3][12]  + " " + boardArray[3][13]  + " " + boardArray[3][14] + "|3    | "+ p1_l1  + " " + p1_l2  + " " + p1_l3  + " " + p1_l4  + " " + p1_l5  + " " + p1_l6  + " " + p1_l7+ " |" + "\n" +
"\t 4|" + " " + boardArray[4][0]  + " " + boardArray[4][1]  + " " + boardArray[4][2]  + " " + boardArray[4][3]  + " " + boardArray[4][4]  + " " + boardArray[4][5]  + " " + boardArray[4][6]  + " " + boardArray[4][7]  + " " + boardArray[4][8]  + " " + boardArray[4][9]  + " " + boardArray[4][10]  + " " + boardArray[4][11]  + " " + boardArray[4][12]  + " " + boardArray[4][13]  + " " + boardArray[4][14] + "|4    |===============|" + "\n" +
"\t 5|" + " " + boardArray[5][0]  + " " + boardArray[5][1]  + " " + boardArray[5][2]  + " " + boardArray[5][3]  + " " + boardArray[5][4]  + " " + boardArray[5][5]  + " " + boardArray[5][6]  + " " + boardArray[5][7]  + " " + boardArray[5][8]  + " " + boardArray[5][9]  + " " + boardArray[5][10]  + " " + boardArray[5][11]  + " " + boardArray[5][12]  + " " + boardArray[5][13]  + " " + boardArray[5][14] + "|5" + "\n" +
"\t 6|" + " " + boardArray[6][0]  + " " + boardArray[6][1]  + " " + boardArray[6][2]  + " " + boardArray[6][3]  + " " + boardArray[6][4]  + " " + boardArray[6][5]  + " " + boardArray[6][6]  + " " + boardArray[6][7]  + " " + boardArray[6][8]  + " " + boardArray[6][9]  + " " + boardArray[6][10]  + " " + boardArray[6][11]  + " " + boardArray[6][12]  + " " + boardArray[6][13]  + " " + boardArray[6][14] + "|6         " + p2.name + "'s" + "\n" +
"\t 7|" + " " + boardArray[7][0]  + " " + boardArray[7][1]  + " " + boardArray[7][2]  + " " + boardArray[7][3]  + " " + boardArray[7][4]  + " " + boardArray[7][5]  + " " + boardArray[7][6]  + " " + boardArray[7][7]  + " " + boardArray[7][8]  + " " + boardArray[7][9]  + " " + boardArray[7][10]  + " " + boardArray[7][11]  + " " + boardArray[7][12]  + " " + boardArray[7][13]  + " " + boardArray[7][14] + "|7         TILES:" + "\n" +
"\t 8|" + " " + boardArray[8][0]  + " " + boardArray[8][1]  + " " + boardArray[8][2]  + " " + boardArray[8][3]  + " " + boardArray[8][4]  + " " + boardArray[8][5]  + " " + boardArray[8][6]  + " " + boardArray[8][7]  + " " + boardArray[8][8]  + " " + boardArray[8][9]  + " " + boardArray[8][10]  + " " + boardArray[8][11]  + " " + boardArray[8][12]  + " " + boardArray[8][13]  + " " + boardArray[8][14] + "|8    |---------------|" + "\n" +
"\t 9|" + " " + boardArray[9][0]  + " " + boardArray[9][1]  + " " + boardArray[9][2]  + " " + boardArray[9][3]  + " " + boardArray[9][4]  + " " + boardArray[9][5]  + " " + boardArray[9][6]  + " " + boardArray[9][7]  + " " + boardArray[9][8]  + " " + boardArray[9][9]  + " " + boardArray[9][10]  + " " + boardArray[9][11]  + " " + boardArray[9][12]  + " " + boardArray[9][13]  + " " + boardArray[9][14] + "|9    | " + p2_l1  + " " + p2_l2  + " " + p2_l3  + " " + p2_l4  + " " + p2_l5  + " " + p2_l6  + " " + p2_l7 + " |" + "\n" +
"\t10|" + " " + boardArray[10][0]  + " " + boardArray[10][1]  + " " + boardArray[10][2]  + " " + boardArray[10][3]  + " " + boardArray[10][4]  + " " + boardArray[10][5]  + " " + boardArray[10][6]  + " " + boardArray[10][7]  + " " + boardArray[10][8]  + " " + boardArray[10][9]  + " " + boardArray[10][10]  + " " + boardArray[10][11]  + " " + boardArray[10][12]  + " " + boardArray[10][13]  + " " + boardArray[10][14] + "|10   |===============|" + "\n" +
"\t11|" + " " + boardArray[11][0]  + " " + boardArray[11][1]  + " " + boardArray[11][2]  + " " + boardArray[11][3]  + " " + boardArray[11][4]  + " " + boardArray[11][5]  + " " + boardArray[11][6]  + " " + boardArray[11][7]  + " " + boardArray[11][8]  + " " + boardArray[11][9]  + " " + boardArray[11][10]  + " " + boardArray[11][11]  + " " + boardArray[11][12]  + " " + boardArray[11][13]  + " " + boardArray[11][14] + "|11" + "\n" +
"\t12|" + " " + boardArray[12][0]  + " " + boardArray[12][1]  + " " + boardArray[12][2]  + " " + boardArray[12][3]  + " " + boardArray[12][4]  + " " + boardArray[12][5]  + " " + boardArray[12][6]  + " " + boardArray[12][7]  + " " + boardArray[12][8]  + " " + boardArray[12][9]  + " " + boardArray[12][10]  + " " + boardArray[12][11]  + " " + boardArray[12][12]  + " " + boardArray[12][13]  + " " + boardArray[12][14] + "|12" + "\n" +
"\t13|" + " " + boardArray[13][0]  + " " + boardArray[13][1]  + " " + boardArray[13][2]  + " " + boardArray[13][3]  + " " + boardArray[13][4]  + " " + boardArray[13][5]  + " " + boardArray[13][6]  + " " + boardArray[13][7]  + " " + boardArray[13][8]  + " " + boardArray[13][9]  + " " + boardArray[13][10]  + " " + boardArray[13][11]  + " " + boardArray[13][12]  + " " + boardArray[13][13]  + " " + boardArray[13][14] + "|13        Scores" + "\n" +
"\t14|" + " " + boardArray[14][0]  + " " + boardArray[14][1]  + " " + boardArray[14][2]  + " " + boardArray[14][3]  + " " + boardArray[14][4]  + " " + boardArray[14][5]  + " " + boardArray[14][6]  + " " + boardArray[14][7]  + " " + boardArray[14][8]  + " " + boardArray[14][9]  + " " + boardArray[14][10]  + " " + boardArray[14][11]  + " " + boardArray[14][12]  + " " + boardArray[14][13]  + " " + boardArray[14][14] + "|14    --------------" + "\n" +
"\t   -----------------------------         "+ p1.name + ": " + p1.total_score + "\n" +
"\t   a b c d e f g h i j k l m n o         "+ p2.name + ": " + p2.total_score + "\n\n";

// console.log(title);
// console.log(board);
