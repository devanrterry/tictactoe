
/*----- constants -----*/

const player = [-1, 1];
const BOARD_SIZE = 3;
const ATTEMPT_LIMIT = 9;

/*----- app's state (variables) -----*/

let turn, winner, board, attempts = 0;


/*----- cached element references -----*/

let grid = document.querySelector('.grid-container');
let playAgain = document.getElementById('play-again');
let cells = document.querySelectorAll('.grid-container div');
let message = document.getElementById('message');

// // /*----- event listeners -----*/

playAgain.addEventListener('click', init);
grid.addEventListener('click', handleClick);


// /*----- functions -----*/

init()

function init() {
    turn = getRandomNum();
    winner = null;
    board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ]
    for (let i = 0; i < cells.length; i++){
        cells[i].className = 'cell';
    };
    message.textContent = 'Good luck!';
    render();
};

function switchTurn() {
    return turn < 0 ? 1 : -1;
};


function convertToChar(num) {
    if (num < 0){
        return 'O';
    } else if (num > 0){
        return 'X';
    } else {
        return '';
    }
};

function boardPosition(row, column) {
    return board[row][column];
}

function render(){
    for (let row = 0; row < 3; ++row){
        for (let column = 0; column < 3; ++column){
            let position = boardPosition(row, column);
            let cell = document.querySelector("#r" + row + "c" + column);
            cell.innerHTML = convertToChar(position);
        }
    }
};

function handleClick(evt) {
    if (evt.target.className === 'disabled' || winner !== null){
        return;
    }
    if (evt.target.className === 'cell'){
        let evtId = evt.target.id;
        let column = parseInt(evtId[1]);
        let row = parseInt(evtId[3]);
        board[column][row] = turn;
        attempts++;
        evt.target.className = 'disabled';
    }
    gameOver();
    console.log(board);
    turn = switchTurn();
    render();
}

function getRandomNum() {
    let random = Math.floor(Math.random() * 2);
    return random ? 1 : -1;
};

function checkRowWinner() {
  for(let row = 0; row < BOARD_SIZE; row++){
  let sum = 0;
    for(let column = 0; column < BOARD_SIZE; column++){
      sum += board[row][column];
    };
    if (Math.abs(sum) === BOARD_SIZE){
        message.textContent = turn + " Wins!";
        winner = turn;
    }
};
};

function checkColumnWinner(){
  for(let column = 0; column < BOARD_SIZE; column++){
  let sum = 0;
    for(let row =0; row < BOARD_SIZE; row++){
      sum += board[row][column];
  };
  if (Math.abs(sum) === BOARD_SIZE){
        message.textContent = turn + " Wins!";
        winner = turn;
    }
};
};
 
function checkDiagonals(){
    let diagonal1 = 0;
    let diagonal2 = 0;
    for(let i = 0; i < 3; i++){
        diagonal1 += board[i][i];
        diagonal2 += board[i][2-i];
    };
    if (Math.abs(diagonal1) === 3 || Math.abs(diagonal2) === 3){
        message.textContent = turn + " Wins!";
        winner = turn;
    }
};

function checkTie(){
    let counter = 0;
for(i = 0; i < BOARD_SIZE; i++){
    for(j = 0; j < BOARD_SIZE; j++){
        counter += Math.abs(board[i][j]);
        };
    };
    if (counter === 9){
        return message.textContent = "It's a tie!";
    };
};


function gameOver(){
    checkRowWinner();
    checkColumnWinner();
    checkDiagonals();
    checkTie();
}