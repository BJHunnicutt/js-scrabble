var TileBag = require("./tileBag.js");
var Scrabble = require("./scrabble.js");

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
      this.drawTiles();
      // Should put the tiles back in the bag (if we come back to this later)
    };

    Player.prototype.updatePlayerTiles = function(word) {
      var letters = word.toUpperCase().split('');
      for (let letter of letters) {
        this.playerTiles.splice(this.playerTiles.indexOf(letter), 1);
      }
      this.drawTiles()
    };


    module.exports = Player;
