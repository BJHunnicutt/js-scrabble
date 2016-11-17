// Scrabble Javascript Project

// Helpful description of exporting modules: https://www.sitepoint.com/understanding-module-exports-exports-node-js/
var TileBag = require("./tileBag.js");
var Board = require("./board.js");


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
var Player = function(name, tileBagClass = new TileBag()) {
  this.name = name;
  this.plays = [];
  this.game = new Scrabble();
  this.tileBag = tileBagClass;
  this.playerTiles = [];
  this.drawTiles();
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
      return word;
    };

    // highestWordScore(): Function which returns the highestScoringWord score
    Player.prototype.highestWordScore = function() {
      var score = this.game.score(this.highestScoringWord());
      return score;
    };

    //drawTiles(): Function draws the players tiles up to 7
    Player.prototype.drawTiles = function() {
      var fill = 7 - this.playerTiles.length;
      this.playerTiles = this.playerTiles.concat(this.tileBag.drawTiles(fill));
    };

    Player.prototype.dumpTiles = function() {
      this.playerTiles = [];
      this.draw_tiles();
      // Should put the tiles back in the bag (if we come back to this later)
    };


    // ------------------------- GAME PLAY ------------------------- //

    // Game constructor function (with initialized instance of player names)
    var Game = function(name1, name2) {
      this.s1 = new Scrabble();
      this.t1 = new TileBag();
      this.p1 = new Player(name1, this.t1);
      this.p2 = new Player(name2, this.t1);
      this.b1 = new Board(this.p1, this.p2);
    };

    // Display the current board
    Game.prototype.displayBoard = function(word, start_position, direction) {
      return this.b1.fill(word, start_position, direction);
    };


    // playGame(): Goes back and forth having 2 players play words until someone wins
    Game.prototype.playGame = function() {
      var wordScore = true;
      var firstTurn = true;
      var turn = "player1";
      console.log( this.displayBoard(this.b1.boardArray[0][0], "0A", "right") ); //This just replaces the symbol at the center when it displays the board the first time.

      // Go back and forth playing words until someone wins
      do {
        if (turn == "player1") {
          wordScore = this.move(this.p1)
          turn = "player2"
        }
        else if (turn == "player2") {
          wordScore = this.move(this.p2);
          turn = "player1";
        }
      } while (wordScore !== false); // wordScore will be false if a player has won
      console.log("Wow, " + this.p1.name + "! Your score is " + this.p1.total_score + "! Looks like you won! :D");
    };



// ------------------------- TESTS ------------------------- //

// WAVE 1: tests //
console.log("\n **------ Wave 1 Tests ------** ");

var s = new Scrabble();
console.log(s.helloWorld() + ' == hello world!');  // => hello world!
console.log(s.score('aaaaaaa') + ' == 57');  // => 57
console.log(s.score('quiz') + ' == 22');  // => 22

var words = ['one', 'pour', 'two']; // points = 3, 6, 6, should pick two becaues it's shorter
console.log(s.highestScoreFrom(words) + ' == two');


// WAVE 2: tests //
console.log("\n **------ Wave 2 Tests ------** ");
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



// --- OPTIONAL ENHANCEMENTS: tests --- //

// Tile Bag: tests //
console.log("\n **------ Tile Bag Tests ------** ");
var player1 = new Player("Jeannie");
console.log(Object.keys(player1.tileBag.tiles).length + ' == 26');
console.log(Object.keys(player1.playerTiles).length + ' == 7');
// Check that tiles are updating
var oldTiles = player1.playerTiles;
player1.play('test');
var newTiles = player1.playerTiles;
console.log(player1.playerTiles);
console.log(oldTiles);
console.log(newTiles);
console.log((oldTiles == newTiles) + ' == true');


// Game: Tests //
console.log("\n **------ Game Tests ------** ");
var game1 = new Game("Jeannie", "Brent");
game1.playGame();




module.exports = Scrabble;
