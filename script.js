function Gameboard() {
  this.board = [
   ['', '', ''],
   ['', '', ''],
   ['', '', ''],
  ];
}

function Player(name, symbol) {
 this.name = name;
 this.symbol = symbol;
}

const player1 = new Player('Player 1', 'X');
const player2 = new Player('Player 2', 'O');

const player1Button = document.querySelector('.player1');
const player2Button = document.querySelector('.player2');
player1Button.addEventListener('click', selectPlayer);
player2Button.addEventListener('click', selectPlayer);

function selectPlayer(event) {
 const selectedPlayer = event.target.classList[0];
 if (selectedPlayer === 'player1') {
   console.log(player1.name + ' has selected symbol ' + player1.symbol);
 } else if (selectedPlayer === 'player2') {
   console.log(player2.name + ' has selected symbol ' + player2.symbol);
 }
}

// WORK ON THIS 
const player1Choice = document.querySelector('.cell');
const player2Choice = document.querySelector('.cell');
player1Choice.addEventListener('click', playerSelect);
player2Choice.addEventListener('click', playerSelect);

function playerSelect(event) {
  const playerSelectedCell = event.target;
  playerSelectedCell.textContent = player1.symbol;
}