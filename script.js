const gameBoard= {
  board: [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]
}

const Player1 = {
  name: 'Player1',
  symbol: 'X'
};

const Player2 = {
  name: 'Player2',
  symbol: 'O'
};

let currentPlayers = [];

function Player(name, symbol) {
  this.name = name;
  this.symbol = symbol;
}

function addPlayerToGame(name, symbol) {
  const newPlayer = new Player(name, symbol);
  currentPlayers.push(newPlayer);
}

addPlayerToGame('Player1', 'X');
addPlayerToGame('Player2', 'O');

let currentPlayerIndex = 0;
const player1 = currentPlayers[0];
const player2 = currentPlayers[1];

const player1Button = document.querySelector('.player1');
const player2Button = document.querySelector('.player2');
player1Button.addEventListener('click', selectPlayer);
player2Button.addEventListener('click', selectPlayer);

function selectPlayer(event) {
  const selectedPlayer = event.target.classList[0];
  if (selectedPlayer === 'player1') {
    currentPlayerIndex = 0;
    console.log(player1.name + ' has selected symbol ' + player1.symbol);
  } else if (selectedPlayer === 'player2') {
    currentPlayerIndex = 1;
    console.log(player2.name + ' has selected symbol ' + player2.symbol);
  }
}

function cellSelection(event) {
  const selectedCell = event.target;
  const rowIndex = selectedCell.dataset.row;
  const colIndex = selectedCell.dataset.col;
  const currentPlayer = currentPlayers[currentPlayerIndex];

  if (selectedCell.textContent === '') {
    selectedCell.textContent = currentPlayer.symbol;
    gameBoard.board[rowIndex][colIndex] = currentPlayer.symbol;
    checkForWin();
    checkForDraw();
    currentPlayerIndex = (currentPlayerIndex + 1) % currentPlayers.length;
  }
}

const cells = document.querySelectorAll('.cell');
cells.forEach(cell => cell.addEventListener('click', cellSelection));

