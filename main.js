// Query Selectors
var body = document.querySelector("body");
var gameBoard = document.querySelector(".game-area");
var space = document.querySelectorAll("td");
var broadcast = document.querySelector("#moveIndicator");
var player1Score = document.querySelector(".player-1-win-count");
var player2Score = document.querySelector(".player-2-win-count");
var player1Draw = document.querySelector(".player-1-draw-count");
var player2Draw = document.querySelector(".player-2-draw-count");
var header = document.querySelector("header");
var moveIndicator = document.querySelector("#moveIndicator");

// Global Variables
var game;
var defaultHeader = "🛸 Galactic Battle 🚀";
var currentPlayerEmoji = "👽";

// Event Listeners
window.addEventListener("load", loadGame);
gameBoard.addEventListener("click", move);

// Functions
function createGame(players) {
  var game = {};

  game.players = players || {
    x: createPlayer("🛸"),
    o: createPlayer("🚀"),
  };

  game.board = createInitialBoard();
  game.currentPlayer = game.players.x;
  game.turnsTaken = 0;
  game.won = null;
  game.winningLine = [];
  game.winConditions = {
    rowA: ["a1", "a2", "a3"],
    rowB: ["b1", "b2", "b3"],
    rowC: ["c1", "c2", "c3"],
    column1: ["a1", "b1", "c1"],
    column2: ["a2", "b2", "c2"],
    column3: ["a3", "b3", "c3"],
    diagonal1: ["a1", "b2", "c3"],
    diagonal2: ["a3", "b2", "c1"],
  };

  game.turnUpkeep = function () {
    game.currentPlayer =
      game.currentPlayer === game.players.x ? game.players.o : game.players.x;
    game.turnsTaken++;
  };

  game.checkGameStatus = function () {
    return game.won || game.turnsTaken === 9;
  };

  game.checkWinCondition = function () {
    var markerCheck =
      game.currentPlayer.marker +
      game.currentPlayer.marker +
      game.currentPlayer.marker;

    for (var line in game.winConditions) {
      var lineValues = [];
      var spaces = game.winConditions[line];
      for (var i = 0; i < spaces.length; i++) {
        lineValues.push(game.board[spaces[i]]);
      }

      if (lineValues.join("") === markerCheck) {
        game.winningLine = spaces.slice();
        game.currentPlayer.wins.push(Object.assign({}, game.board));
        game.currentPlayer.winningLines.push(game.winningLine);
        game.won = game.currentPlayer.marker + " wins!";
        return true;
      }
    }
    return false;
  };

  game.checkDraw = function () {
    if (game.turnsTaken === 9 && !game.won) {
      game.won = "DRAW!";
      return true;
    }
    return false;
  };

  return game;
}

function createPlayer(marker) {
  var player = {};
  player.marker = marker;
  player.wins = [];
  player.draws = [];
  player.winningLines = [];

  player.saveToStorage = function () {
    localStorage.setItem(player.marker + "Player", JSON.stringify(player));
  };

  player.loadWinsFromStorage = function () {
    var savedPlayer = JSON.parse(
      localStorage.getItem(player.marker + "Player")
    );
    if (savedPlayer !== null) {
      player.marker = savedPlayer.marker;
      player.wins = savedPlayer.wins || [];
      player.draws = savedPlayer.draws || [];
      player.winningLines = savedPlayer.winningLines || [];
    }
  };

  return player;
}

function createInitialBoard() {
  return {
    a1: "",
    a2: "",
    a3: "",
    b1: "",
    b2: "",
    b3: "",
    c1: "",
    c2: "",
    c3: "",
  };
}
