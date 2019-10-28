
/*----- constants -----*/
let player = [-1,1]


/*----- app's state (variables) -----*/
let turn, winner, board
// turn = 1

/*----- cached element references -----*/

let grid = document.querySelector('.grid-container');
let playAgain = document.getElementById('play-again');
let cells = document.querySelectorAll('.grid-container div');

// // /*----- event listeners -----*/

playAgain.addEventListener('click', init);
grid.addEventListener('click', handleClick);



// /*----- functions -----*/
init()

function init(){
    turn = getRandomNum();
    winner = null;
};

function switchTurn(){
        return turn < 0 ? -1 : 1;
    };



function convertToChar(num){
    return num < 0 ? 'X' : 'O';
};

// // function resets board
function reset(){
// sets user to random
    turn = Math.floor(Math.random() * 2);
//resets the winner
    winner = null;
//clears the board
    board = [
        [0,0,0],
        [0,0,0],
        [0,0,0],
    ]
};

// function render(){

// };

function handleClick(evt){
    turn *= -1

        let evtId = evt.target.id;
        let columns = evtId[1];
        let row = evtId[3];
        cells.forEach(function(e){
            if (evtId === e.id){
            e.innerHTML = convertToChar(turn);
            // board[row][columns] = turn;
        }
    }); 
}
console.log('hit');

function getRandomNum(){
    let random = Math.floor(Math.random() * 2);
    return random ? 1 : -1;
};

// console.log(getRandomNum())

// function determineWinner(){
//     board.forEach(e)
// }

//test