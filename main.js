// Query Selectors
var body = document.querySelector('body')
var gameBoard = document.querySelector('.game-area')
var space = document.querySelectorAll('td') 
var broadcast = document.querySelector('#moveIndicator')
var player1Score = document.querySelector('.player-1-win-count')
var player2Score = document.querySelector('.player-2-win-count')
var player1Draw = document.querySelector('.player-1-draw-count')
var player2Draw = document.querySelector('.player-2-draw-count')

// Global Variables 
var game

// Event Listeners
window.addEventListener('load', loadGame)
gameBoard.addEventListener('click', move)

