
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
    for (let i = 0; i < cells.length; i++){
        cells[i].className = 'cell';
        //HTMLElement.className overwrites the entire current classname. HTMLElement.classList.add will add onto the current class names and HTMLEElement.classList.remove will only remove the specified class name if it exists.
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
    //Math.random() returns between 0-0.9999999. If multiplied by 2, returns between 0-1.99999999. Math.floor will round down, so we will either get between 0 and 1. 
    let random = Math.floor(Math.random() * 2);
    //random ? 1 : -1 translates to ==> if random is true, then return 1 else return -1. 1 is considered 'true' and 0 is considered 'false'
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
        // console.log(message);
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
        // console.log(message);
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
        // console.log(message);
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