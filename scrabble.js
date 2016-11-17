// Scrabble Javascript Project


// Helpful description of exporting modules: https://www.sitepoint.com/understanding-module-exports-exports-node-js/
var TileBag = require("./tileBag.js");
var Board = require("./board.js");


var prompt = require('prompt');
//start the prompt
prompt.start();


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
        return this.game.score(word)
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
      this.firstTurn = true;
      this.isWaiting = false;
      this._word = "";
    };

    // Display the current board
    Game.prototype.displayBoard = function(word, start_position, direction) {
      return this.b1.fill(word, start_position, direction);
    };


    // playGame(): Goes back and forth having 2 players play words until someone wins
    Game.prototype.playGame = function(turn = "player1") {
      var wordScore = true;

      console.log( this.displayBoard(this.b1.boardArray[0][0], "0A", "right") ); //This just replaces the symbol at the center when it displays the board the first time.

      var [turn, wordScore] = this.switchPlayers(turn, wordScore);

      // // Go back and forth playing words until someone wins
      // do {
      //   if (turn == "player1") {
      //     wordScore = this.move(this.p1);
      //     turn = "player2";
      //   }
      //   else if (turn == "player2") {
      //     wordScore = this.move(this.p2);
      //     turn = "player1";
      //   }
      // } while (wordScore !== false); // wordScore will be false if a player has won

      // console.log(wordScore);
      if (wordScore === false) {
        console.log("Wow, " + this.p1.name + "! Your score is " + this.p1.total_score + "! Looks like you won! :D");
      }
      else if (wordScore !== true){
        this.playGame(turn);
      }
    };

    Game.prototype.switchPlayers = function(turn, wordScore) {
      // wordScore = true;
      // Go back and forth playing words until someone wins
      if (turn == "player1") {
        wordScore = this.move(this.p1);
        turn = "player2";
      }
      else if (turn == "player2") {
        wordScore = this.move(this.p2);
        turn = "player1";
      }
      return [turn, wordScore];
    };


    Game.prototype.move = function(player) {
      // if (this.isWaiting === true) {
      //   var word = "";
      // }

      if (this.isWaiting === false) {
        // var word = "";
        console.log("\n\t\t\t *** " + player.name.toUpperCase() + "'s Turn ***\n\n");
        var [word, startPosition, direction] = this.getWord();
        this._word = word;
      }

      if ((typeof this._word != "undefined") && this._word.length > 0) {
        console.log(this._word + startPosition + direction);
        console.log("Here");
        this.checkWord(player, this._word);
        this.isWaiting = false;

        return this.s1.score(this._word);
      }
      else {
        return true;
      }
    };


    // Collet the word to play
    Game.prototype.getWord = function() {
      this.isWaiting = true;

      var word = "";
      var startPosition = "";
      var direction = "";
      // Prompt usage details:
      // https://docs.nodejitsu.com/articles/command-line/how-to-prompt-for-command-line-input/
      // console.log("| In the prompts below: \n" +
      // "| WORD: Enter a word (type Q to quit / D to dump tiles) \n" +
      // "| START POSITION: Enter the starting location of your word (e.g 0A) \n" +
      // "| DIRECTION: Enter whether to place the word horizontally or vertically? (h/v) \n" +
      // " ______________________________________________________________________________ ");

      prompt.get(['word', 'startPosition', 'direction'], function (err, result) {
        if (err) { return onErr(err); }
        var word = result.word;
        var direction = result.direction;
        var startPosition = result.startPosition;
      });
      function onErr(err) {console.log(err); return 1; }

      // if (this.firstTurn === true) {
      //     console.log("\nThe first turn must begin on 7H\n");
      //     startPosition = "7H";
      // }
      isPaused = false;
      return [word, startPosition, direction];
    };

    // // Collet the startPosition of the play
    // Game.prototype.getStartPosition = function() {
    //   var startPosition = "";
    //   //  Get the start position of the word (default to center on first turn)
    //   if (this.firstTurn === true) {
    //     startPosition = "7H";
    //     //  Actually should check if spaces_covered includes 7H...
    //     //  if not.. puts "Sorry, the first word must cover the center space (7H), try again: "
    //   }
    //   else {
    //     console.log("\nEnter the start position of your word (e.g 0A): ");
    //     prompt.get(['startPosition'], function (err, result) {
    //       if (err) { return onErr(err); }
    //       startPosition = result.startPosition;
    //     });
    //   }
    //   function onErr(err) {console.log(err); return 1; }
    //   return startPosition;
    // };
    //
    //
    // // Collet the direction of the play
    // Game.prototype.getDirection = function() {
    //   var direction = "";
    //
    //   console.log("\nDo you want to place the word horizontally or vertically? (h/v): ");
    //   if (direction === "") {
    //     prompt.get(['direction'], function (err, result) {
    //       if (err) { return onErr(err); }
    //       direction = result.direction;
    //     });
    //   }
    //   function onErr(err) {console.log(err); return 1; }
    //   return direction;
    // };


    // Check if the player wants to quit or dunp their tiles
    Game.prototype.checkWord = function(player, word) {
      if (word == "Q") {
        return;
      }
      else if (word == "D") {
        player.dump_tiles();
        console.log("\n\nHere are new tiles! Your turn is over!\n");
        console.log(this.display_board(this.b1.boardArray[0][0], "0A", "right"));
        return true;
      }
      return word;
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
var game1 = new Game("Chris", "Jamie");
game1.playGame();




module.exports = Scrabble;
