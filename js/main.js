
/*----- constants -----*/
const player = [-1, 1];
const BOARD_SIZE = 3;
const ATTEMPT_LIMIT = 9;

/*----- app's state (variables) -----*/
let turn, winner, board, attempts = 0;
// turn = 1

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
    // sets user to random
    turn = getRandomNum();
    //resets the winner
    winner = null;
    //clears the board
    board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ]

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

    if (evt.target.className === 'cell'){
        let evtId = evt.target.id;
        let column = evtId[1];
        let row = evtId[3];
        cells.forEach(function (e) {
            if (evtId === e.id) {
                board[column][row] = turn;
            }
            attempts++;
        });
        evt.className = 'disabled';
    }
    console.log(board);
    turn = switchTurn();
    render();
}

function getRandomNum() {
    let random = Math.floor(Math.random() * 2);
    return random ? 1 : -1;
};


function checkRowWinner() {
  for(let row = 0; row < BOARD_SIZE; row++);
  let sum = 0;
    for(let column = 0; column < BOARD_SIZE; column++);
      sum += boardPosition(row, column);
    if (Math.abs(sum) === BOARD_SIZE){
        message = player + "Wins!";
        console.log(message);
    }
};

function checkColumnWinner(){
  for(let column = 0; column < BOARD_SIZE; column++);
  let sum = 0;
    for(let row =0; row < BOARD_SIZE; row++);
      sum += boardPosition(row, column);
    if (Math.abs(sum) === BOARD_SIZE){
        message = player + "Wins!";
        console.log(message);
    }
};
 
function checkDiagonals(){
    let downSum = 0;
    let upSum = 0;

    for(let column = 0, row = 0; column < BOARD_SIZE, row < BOARD_SIZE; column++, row++){
        let sum = 0;

    }
};

function checkTie(){
if(attempts === ATTEMPT_LIMIT){
    message = "It's a tie!";
};
}


function gameOver(){
    checkRowWinner();
    checkColumnWinner();
    checkDiagonals();
    checkTie();
}