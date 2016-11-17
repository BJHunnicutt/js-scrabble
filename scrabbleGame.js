// scrabbleGame.js

var Scrabble = require("./scrabble.js");


// ------------------------- GAME PLAY ------------------------- //

// Game constructor function (with initialized instance of player names)
var Game = function(name1, name2) {
  this.s1 = new Scrabble();
  this.t1 = new TileBag();
  this.p1 = new Scrabble(name1, this.t1);
  this.p2 = new Scrabble(name2, this.t1);
  this.b1 = new Board(this.p1, this.p2);
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
      wordScore = this.move(this.p1);
      turn = "player2";
    }
    else if (turn == "player2") {
      wordScore = this.move(this.p2);
      turn = "player1";
    }
  } while (wordScore !== false); // wordScore will be false if a player has won
  console.log("Wow, " + this.p1.name + "! Your score is " + this.p1.total_score + "! Looks like you won! :D");
};

// Display the current board
Game.prototype.displayBoard = function(word, start_position, direction) {
  return this.b1.fill(word, start_position, direction);
};


module.exports = Game;
