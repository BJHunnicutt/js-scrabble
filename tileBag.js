

// **----------- Tile Bag ------------** ";


var TileBag = function() {
  this.tiles = {A: 9, B: 2, C: 2, D: 4, E: 12, F: 2, G: 3, H: 2, I: 9, J: 1,
    K: 1, L: 4, M: 2, N: 6, O: 8, P: 2, Q: 1, R: 6, S: 4, T: 6, U: 4, V: 2, W: 2, X: 1, Y: 2, Z: 1};
};

TileBag.prototype.drawTiles = function(num) {
  var drawnTiles = [];

  for (var i = 1; i <= num; i++) {
    var letters = Object.keys(this.tiles); //Get all the available letters in the tilebag
    var drawnTile = letters[Math.floor(Math.random() * letters.length)]; // select one letter at random
    this.tiles[drawnTile] = this.tiles[drawnTile] - 1; // Subtract 1 from the tilebag for that letter

    drawnTiles = drawnTiles.concat(drawnTile); // Add tile to the drawn array
    // this.clean_up_bag(drawnTile);  // Remove letters without tiles left from this.tiles
  }
  return drawnTiles;
};

TileBag.prototype.clean_up_bag = function(drawnTile) {
  if (this.tiles[drawnTile] === 0) {
    delete this.tiles[drawn_tile];
  }
};

TileBag.prototype.tilesRemaining = function() {
  var total = 0;
  for (var i = 0; i < Object.keys(this.tiles).length; i++) { // Loop through all the letters in the tileBag
    total = total + this.tiles[Object.keys(b)[1]]; //Add the number of tiles for each letter to the total
  }
  return total;
};

module.exports = TileBag;
