
// --------------- BOARD --------------- //

var Board = function(player1, player2) {
  this.p1 = player1;
  this.p2 = player2;
  this.boardArray = [
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
};


Board.prototype.getBoard = function() {
  var boardArray = this.boardArray;
  var p1_letters = this.p1.playerTiles;
  var p2_letters = this.p2.playerTiles;

  var p1 = this.p1;
  var p2 = this.p2;
  var [p1_l1, p1_l2, p1_l3, p1_l4, p1_l5, p1_l6, p1_l7] = p1_letters;
  var [p2_l1, p2_l2, p2_l3, p2_l4, p2_l5, p2_l6, p2_l7] = p2_letters;



  var board = "\n\n\n\n\n\n" +
  "  ███████╗ ██████╗██████╗  █████╗ ██████╗ ██████╗ ██╗     ███████╗        ██╗███████╗\n" +
  "  ██╔════╝██╔════╝██╔══██╗██╔══██╗██╔══██╗██╔══██╗██║     ██╔════╝        ██║██╔════╝\n" +
  "  ███████╗██║     ██████╔╝███████║██████╔╝██████╔╝██║     █████╗          ██║███████╗\n" +
  "  ╚════██║██║     ██╔══██╗██╔══██║██╔══██╗██╔══██╗██║     ██╔══╝     ██   ██║╚════██║\n" +
  "  ███████║╚██████╗██║  ██║██║  ██║██████╔╝██████╔╝███████╗███████╗██╗╚█████╔╝███████║\n" +
  "  ╚══════╝ ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚═════╝ ╚══════╝╚══════╝╚═╝ ╚════╝ ╚══════╝\n\n\n" +
  "\t\t    a b c d e f g h i j k l m n o     ---------------------" + "\n" +
  "\t\t 0|" + " " + boardArray[0][0]  + " " + boardArray[0][1]  + " " + boardArray[0][2]  + " " + boardArray[0][3]  + " " + boardArray[0][4]  + " " + boardArray[0][5]  + " " + boardArray[0][6]  + " " + boardArray[0][7]  + " " + boardArray[0][8]  + " " + boardArray[0][9]  + " " + boardArray[0][10]  + " " + boardArray[0][11]  + " " + boardArray[0][12]  + " " + boardArray[0][13]  + " " + boardArray[0][14] + "|0        " + p1.name + "'s" + "\n" +
  "\t\t 1|" + " " + boardArray[1][0]  + " " + boardArray[1][1]  + " " + boardArray[1][2]  + " " + boardArray[1][3]  + " " + boardArray[1][4]  + " " + boardArray[1][5]  + " " + boardArray[1][6]  + " " + boardArray[1][7]  + " " + boardArray[1][8]  + " " + boardArray[1][9]  + " " + boardArray[1][10]  + " " + boardArray[1][11]  + " " + boardArray[1][12]  + " " + boardArray[1][13]  + " " + boardArray[1][14] + "|1         TILES:" + "\n" +
  "\t\t 2|" + " " + boardArray[2][0]  + " " + boardArray[2][1]  + " " + boardArray[2][2]  + " " + boardArray[2][3]  + " " + boardArray[2][4]  + " " + boardArray[2][5]  + " " + boardArray[2][6]  + " " + boardArray[2][7]  + " " + boardArray[2][8]  + " " + boardArray[2][9]  + " " + boardArray[2][10]  + " " + boardArray[2][11]  + " " + boardArray[2][12]  + " " + boardArray[2][13]  + " " + boardArray[2][14] + "|2    |---------------|" + "\n" +
  "\t\t 3|" + " " + boardArray[3][0]  + " " + boardArray[3][1]  + " " + boardArray[3][2]  + " " + boardArray[3][3]  + " " + boardArray[3][4]  + " " + boardArray[3][5]  + " " + boardArray[3][6]  + " " + boardArray[3][7]  + " " + boardArray[3][8]  + " " + boardArray[3][9]  + " " + boardArray[3][10]  + " " + boardArray[3][11]  + " " + boardArray[3][12]  + " " + boardArray[3][13]  + " " + boardArray[3][14] + "|3    | "+ p1_l1  + " " + p1_l2  + " " + p1_l3  + " " + p1_l4  + " " + p1_l5  + " " + p1_l6  + " " + p1_l7+ " |" + "\n" +
  "\t\t 4|" + " " + boardArray[4][0]  + " " + boardArray[4][1]  + " " + boardArray[4][2]  + " " + boardArray[4][3]  + " " + boardArray[4][4]  + " " + boardArray[4][5]  + " " + boardArray[4][6]  + " " + boardArray[4][7]  + " " + boardArray[4][8]  + " " + boardArray[4][9]  + " " + boardArray[4][10]  + " " + boardArray[4][11]  + " " + boardArray[4][12]  + " " + boardArray[4][13]  + " " + boardArray[4][14] + "|4    |===============|" + "\n" +
  "\t\t 5|" + " " + boardArray[5][0]  + " " + boardArray[5][1]  + " " + boardArray[5][2]  + " " + boardArray[5][3]  + " " + boardArray[5][4]  + " " + boardArray[5][5]  + " " + boardArray[5][6]  + " " + boardArray[5][7]  + " " + boardArray[5][8]  + " " + boardArray[5][9]  + " " + boardArray[5][10]  + " " + boardArray[5][11]  + " " + boardArray[5][12]  + " " + boardArray[5][13]  + " " + boardArray[5][14] + "|5" + "\n" +
  "\t\t 6|" + " " + boardArray[6][0]  + " " + boardArray[6][1]  + " " + boardArray[6][2]  + " " + boardArray[6][3]  + " " + boardArray[6][4]  + " " + boardArray[6][5]  + " " + boardArray[6][6]  + " " + boardArray[6][7]  + " " + boardArray[6][8]  + " " + boardArray[6][9]  + " " + boardArray[6][10]  + " " + boardArray[6][11]  + " " + boardArray[6][12]  + " " + boardArray[6][13]  + " " + boardArray[6][14] + "|6        " + p2.name + "'s" + "\n" +
  "\t\t 7|" + " " + boardArray[7][0]  + " " + boardArray[7][1]  + " " + boardArray[7][2]  + " " + boardArray[7][3]  + " " + boardArray[7][4]  + " " + boardArray[7][5]  + " " + boardArray[7][6]  + " " + boardArray[7][7]  + " " + boardArray[7][8]  + " " + boardArray[7][9]  + " " + boardArray[7][10]  + " " + boardArray[7][11]  + " " + boardArray[7][12]  + " " + boardArray[7][13]  + " " + boardArray[7][14] + "|7         TILES:" + "\n" +
  "\t\t 8|" + " " + boardArray[8][0]  + " " + boardArray[8][1]  + " " + boardArray[8][2]  + " " + boardArray[8][3]  + " " + boardArray[8][4]  + " " + boardArray[8][5]  + " " + boardArray[8][6]  + " " + boardArray[8][7]  + " " + boardArray[8][8]  + " " + boardArray[8][9]  + " " + boardArray[8][10]  + " " + boardArray[8][11]  + " " + boardArray[8][12]  + " " + boardArray[8][13]  + " " + boardArray[8][14] + "|8    |---------------|" + "\n" +
  "\t\t 9|" + " " + boardArray[9][0]  + " " + boardArray[9][1]  + " " + boardArray[9][2]  + " " + boardArray[9][3]  + " " + boardArray[9][4]  + " " + boardArray[9][5]  + " " + boardArray[9][6]  + " " + boardArray[9][7]  + " " + boardArray[9][8]  + " " + boardArray[9][9]  + " " + boardArray[9][10]  + " " + boardArray[9][11]  + " " + boardArray[9][12]  + " " + boardArray[9][13]  + " " + boardArray[9][14] + "|9    | " + p2_l1  + " " + p2_l2  + " " + p2_l3  + " " + p2_l4  + " " + p2_l5  + " " + p2_l6  + " " + p2_l7 + " |" + "\n" +
  "\t\t10|" + " " + boardArray[10][0]  + " " + boardArray[10][1]  + " " + boardArray[10][2]  + " " + boardArray[10][3]  + " " + boardArray[10][4]  + " " + boardArray[10][5]  + " " + boardArray[10][6]  + " " + boardArray[10][7]  + " " + boardArray[10][8]  + " " + boardArray[10][9]  + " " + boardArray[10][10]  + " " + boardArray[10][11]  + " " + boardArray[10][12]  + " " + boardArray[10][13]  + " " + boardArray[10][14] + "|10   |===============|" + "\n" +
  "\t\t11|" + " " + boardArray[11][0]  + " " + boardArray[11][1]  + " " + boardArray[11][2]  + " " + boardArray[11][3]  + " " + boardArray[11][4]  + " " + boardArray[11][5]  + " " + boardArray[11][6]  + " " + boardArray[11][7]  + " " + boardArray[11][8]  + " " + boardArray[11][9]  + " " + boardArray[11][10]  + " " + boardArray[11][11]  + " " + boardArray[11][12]  + " " + boardArray[11][13]  + " " + boardArray[11][14] + "|11" + "\n" +
  "\t\t12|" + " " + boardArray[12][0]  + " " + boardArray[12][1]  + " " + boardArray[12][2]  + " " + boardArray[12][3]  + " " + boardArray[12][4]  + " " + boardArray[12][5]  + " " + boardArray[12][6]  + " " + boardArray[12][7]  + " " + boardArray[12][8]  + " " + boardArray[12][9]  + " " + boardArray[12][10]  + " " + boardArray[12][11]  + " " + boardArray[12][12]  + " " + boardArray[12][13]  + " " + boardArray[12][14] + "|12" + "\n" +
  "\t\t13|" + " " + boardArray[13][0]  + " " + boardArray[13][1]  + " " + boardArray[13][2]  + " " + boardArray[13][3]  + " " + boardArray[13][4]  + " " + boardArray[13][5]  + " " + boardArray[13][6]  + " " + boardArray[13][7]  + " " + boardArray[13][8]  + " " + boardArray[13][9]  + " " + boardArray[13][10]  + " " + boardArray[13][11]  + " " + boardArray[13][12]  + " " + boardArray[13][13]  + " " + boardArray[13][14] + "|13        Scores" + "\n" +
  "\t\t14|" + " " + boardArray[14][0]  + " " + boardArray[14][1]  + " " + boardArray[14][2]  + " " + boardArray[14][3]  + " " + boardArray[14][4]  + " " + boardArray[14][5]  + " " + boardArray[14][6]  + " " + boardArray[14][7]  + " " + boardArray[14][8]  + " " + boardArray[14][9]  + " " + boardArray[14][10]  + " " + boardArray[14][11]  + " " + boardArray[14][12]  + " " + boardArray[14][13]  + " " + boardArray[14][14] + "|14    --------------" + "\n" +
  "\t\t   -----------------------------          "+ p1.name + ": " + p1.totalScore() + "\n" +
  "\t\t    a b c d e f g h i j k l m n o         "+ p2.name + ": " + p2.totalScore() + "\n\n";

  return board
};

Board.prototype.cleanUpInput = function(word, startPosition, direction) {
  var positionArray = [];
  if (startPosition.length > 2) {
    letter = startPosition[2].toUpperCase();
    positionArray[0] = startPosition.substr(0,2);
  }
  else {
    letter = startPosition[1].toUpperCase();
    positionArray[0] = startPosition[0];
  }

  switch (letter) {
    case "A":
      positionArray[1] = "0";
      break;
    case "B":
      positionArray[1] = "1";
      break;
    case "C":
      positionArray[1] = "2";
      break;
    case "D":
      positionArray[1] = "3";
      break;
    case "E":
      positionArray[1] = "4";
      break;
    case "F":
      positionArray[1] = "5";
      break;
    case "G":
      positionArray[1] = "6";
      break;
    case "H":
      positionArray[1] = "7";
      break;
    case "I":
      positionArray[1] = "8";
      break;
    case "J":
      positionArray[1] = "9";
      break;
    case "K":
      positionArray[1] = "10";
      break;
    case "L":
      positionArray[1] = "11";
      break;
    case "M":
      positionArray[1] = "12";
      break;
    case "N":
      positionArray[1] = "13";
      break;
    case "O":
      positionArray[1] = "14";
      break;
  }


  var v = parseInt(positionArray[0]);
  var h = parseInt(positionArray[1]);

  var word = word.toUpperCase(); //changes all letters to uppercase
  // var direction = direction.toLowerCase()

  return [word, v, h];
};


// Place the word in the board array variable in the correct place/orientation
Board.prototype.fill = function(word, startPosition, direction) {
  // check_coverage(word, start_position, direction)
  [word, v, h] = this.cleanUpInput(word, startPosition, direction);
  var letters = word.split("");

  for (let letter of letters) {
    this.boardArray[v][h] = letter;
    switch(direction) {
      case "v":
        v = v + 1;
        break;
      case "h":
        h = h + 1;
    }
  }
  var board = this.getBoard();

  // console.log("!!!!!!!!!!!!!!!board: " + board)
  return board;
};

Board.prototype.checkCoverage = function(word, startPosition, direction) {
  //Not done
};



// console.log(title);
// console.log(board);

module.exports = Board;
