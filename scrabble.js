// Scrabble Javascript Project


// Helpful description of exporting modules: https://www.sitepoint.com/understanding-module-exports-exports-node-js/
var TileBag = require("./tileBag.js");
var Board = require("./board.js");
// var Player = require("./player.js");

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
    Scrabble.prototype.score = function(word, tiles = []) {
      if (tiles === []) {
        tiles = word.split('');
      }
      var score = 0;
      for (var i = 0, len = word.length; i < len; i++) {
        score = score + this.letterScore(word[i]);
      }

      // 7-letter word bonus
      if (len == 8) {score = score + 50;}
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

        return this.game.score(word, this.playerTiles)
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
      this.drawTiles();
      // Should put the tiles back in the bag (if we come back to this later)
    };

    Player.prototype.updatePlayerTiles = function(word) {
      var letters = word.toUpperCase().split('');
      for (let letter of letters) {
        if (this.playerTiles.includes(letter)) {
          this.playerTiles.splice(this.playerTiles.indexOf(letter), 1);
        }
      }
      this.drawTiles()
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
      this.turn = "player1";
      this._word = "";
      this._direction = "";
      this._startPosition = "";
      this.alert = "";
    };

    // Display the current board
    Game.prototype.displayBoard = function(word, startPosition, direction) {
      return this.b1.fill(word, startPosition, direction);
    };


    // playGame(): Goes back and forth having 2 players play words until someone wins
    Game.prototype.playGame = function() {
      console.log("playGame " + this.turn);

      console.log( this.displayBoard(this.b1.boardArray[0][0], "0A", "h") ); //This just replaces the symbol at the center when it displays the board the first time.

      var wordScore = this.movePlayers();

      // console.log(wordScore);
      if (wordScore === false) {
        console.log("Wow, " + this.p1.name + "! Your score is " + this.p1.total_score + "! Looks like you won! :D");
      }
    };

    Game.prototype.movePlayers = function(wordScore = true) {
      if (this.turn == "player1") {
        var player = this.p1;
      }
      else if (this.turn == "player2") {
        var player = this.p2;
      }

      console.log("\n\t\t\t *** " + player.name.toUpperCase() + "'s Turn ***\t" + this.alert + "\n\n");
      this.alert = "";

      // Prompt usage details:
      // https://docs.nodejitsu.com/articles/command-line/how-to-prompt-for-command-line-input/
      console.log("| In the prompts below: \n" +
      " ------------------------------------------------------------------------------\n" +
      "|      WORD: Enter a word (or type Q to quit / D to dump tiles)                |\n" +
      "|     START: Enter the starting location of your word (e.g 0A)                 |\n" +
      "| DIRECTION: Enter whether to place the word horizontally or vertically? (h/v) |\n" +
      " ------------------------------------------------------------------------------");
      prompt.get(['word', 'startPosition', 'direction'], this.getWord);

      return wordScore;
    };


    // Collet the word to play
    Game.prototype.getWord = function(err, result) { //The function called by prompt does not have access to "this." variables
      // Error handling
      if (err) { return onErr(err); }
      function onErr(err) {console.log(err); return 1; }
      // set variables
      var word = result.word;
      var direction = result.direction;
      var startPosition = result.startPosition;

      game1.checkWord(word, startPosition, direction);  ///WHYYYYY won't it recognize this function?????
    };


    // Check if the word and placement is valid
    Game.prototype.checkWord = function(word, startPosition, direction) {
      if (this.turn == "player1") {
        var player = this.p1;
      }
      else if (this.turn == "player2") {
        var player = this.p2;
      }

      this._word = word;
      this._direction = direction;
      if (this.firstTurn === true) {
        var startPosition = "7H";
        this.alert = "\n\n\t     (Note: The first word must be placed on 7H)";
        // this.firstTurn = false;
      }
      this._startPosition = startPosition;
      console.log("Word: " + this._word + " Direction: " + this._direction + " startPosition: " + this._startPosition + "\n");

      // If the player selected to Quit or Dump tiles
      if (word.toUpperCase() == "Q") {
        return;
      }
      else if (word.toUpperCase() == "D") {
        player.dumpTiles();
        console.log("\n\n\t\t Here are new tiles "+ player.name +"! Your turn is over!");
        // console.log(this.displayBoard(this._word, this._startPosition, this._direction));
        this.alert = "";
      }

      [placementValid, overlappingTiles] = this.checkPlacement();
      // console.log("checkWord - valid?: " + letters + " overlappingTiles " + overlappingTiles + "\n");
      lettersValid = this.lettersAvailable(overlappingTiles);

      if (placementValid === true && lettersValid === true) {
        this.finishTurn();
      }
      else {
        // Start the turn over until they play a valid word
        console.log( this.displayBoard(this.b1.boardArray[0][0], "0A", "h") );
        this.movePlayers();
      }
    };


    Game.prototype.checkPlacement = function() {
      // Check if the word fits with the existing tiles on the board
      var placementValid = false;

      if (this._word === "D" || this._word === "Q") {
        var placementValid = true;
        var overlappingTiles = [];
      }
      else {
        [letters, letterLocations, locationContents] = this.b1.checkCoverage(this._word, this._startPosition, this._direction);

        // are there overlapping letters that are in our word? if not you can't play here (if its not the first turn)
        var placementValidArray = [];
        var overlappingTiles = [];

        var alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
        var i = 0;
        for (let letter of letters) {
          if (letters.includes(locationContents[i])) {
            if (locationContents[i] === letter) {
              placementValidArray[i] = true;
              overlappingTiles = overlappingTiles.concat(letter);
            }
            else if (locationContents[i] != letter) {
              placementValidArray[i] = false;
            }
          }
          else {
            placementValidArray[i] = null;
          }
          i = i+1;
        }
        // THey must play on another word, but they must align with the letters on the board
        if (placementValidArray.includes(true) && !placementValidArray.includes(false)) {
          placementValid = true;
        }
        else if (this.firstTurn === true) {
          placementValid = true;
          placementValidArray = [];
          this.firstTurn = false;
        }
        else {
          this.alert = "\n\n\t     That doesn't fit on the board. Follow the rules and try again!";
        }
      return [placementValid, overlappingTiles];
    }
  };


    Game.prototype.lettersAvailable = function(overlappingTiles) {
      console.log("overlappingTiles: " + overlappingTiles);
      if (this.turn == "player1") {
        var player = this.p1;
      }
      else if (this.turn == "player2") {
        var player = this.p2;
      }

      // Check if word contains only available letters
      var word2 = this._word.toUpperCase();
      var availableTiles = player.playerTiles;
      var availableTiles = availableTiles.concat(overlappingTiles);

      for (var i = 0, len = availableTiles.length; i < len; i++) {
        word2 = word2.replace(availableTiles[i],'');
      }

      if (this._word === "D" || this._word === "Q") {
        var lettersValid = true;
      }
      //if all the letters are either in the players tiles or on the board
      else if (word2.length === 0) {
        var lettersValid = true;
      }
      else if (word2.length > 0) {
        this.alert = "\n\n\t     You dont have those tiles... try again.";
        var lettersValid = false;
      }
      return lettersValid;
    };




    // Switch players and call a new round
    Game.prototype.finishTurn = function() {

      if (this.turn == "player1") {
        player = this.p1;
      }
      else if (this.turn == "player2") {
        player = this.p2;
      }


      // determine if the word is ok
      if ((this._word.toUpperCase() != "D") && this._word.length > 0) {
        // Switching players if word is good
        if (this.turn == "player1") {
          score = player.play(this._word);
          player.updatePlayerTiles(this._word);
          this.turn = "player2";
          console.log(this.displayBoard(this._word, this._startPosition, this._direction));
        }
        else if (this.turn == "player2") {
          score = player.play(this._word);
          player.updatePlayerTiles(this._word);
          this.turn = "player1";
          console.log( this.displayBoard(this._word, this._startPosition, this._direction) );
        }
        // THis should make it keep looping through players until theres a winner...
        this.movePlayers();
      }
      else if (this._word.toUpperCase() === "D") {
        // Switching players if they just dumped
        if (this.turn == "player1") {
          this.turn = "player2";
          console.log( this.displayBoard(this.b1.boardArray[0][0], "0A", "h") );
        }
        else if (this.turn == "player2") {
          this.turn = "player1";
          console.log( this.displayBoard(this.b1.boardArray[0][0], "0A", "h") );
        }
        this.movePlayers();
      }
      else {
        // If the word is not admissable, ask for a new word.
        this.movePlayers();
      }
      // var score = this.s1.score(this._word);
      // return [word, startPosition, direction];
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
