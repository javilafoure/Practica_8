const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('.statusText');
const ressetBtn = document.querySelector('.btn_reset');
// const inicio = document.querySelector('#inicio');

const ganador = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let opt = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame(){
    cells.forEach(cell => cell.addEventListener('click', cellClicked));
    ressetBtn.addEventListener('click', resetGame);
    statusText.textContent = `${currentPlayer} TURN`;
    running = true;
}

function cellClicked(){
    const cellIndex = this.getAttribute('cellIndex');

    if(opt[cellIndex] != "" || !running){
        return;
    }

    updateCell(this, cellIndex);
    checkGanador();
}

function updateCell(cell, index){
    opt[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer(){
    currentPlayer = (currentPlayer =="X") ? "O" : "X";
    statusText.textContent = `${currentPlayer} TURN`;
}

function checkGanador(){
    let roundWon = false;

    for (let i = 0; i < ganador.length; i++) {
        const condicion = ganador[i];

        const cellA = opt[condicion[0]];
        const cellB = opt[condicion[1]];
        const cellC = opt[condicion[2]];
        
        if(cellA == "" || cellB == "" || cellC == "" ){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }
    if(roundWon){
        statusText.textContent = `${currentPlayer} Gano!`;
        running = false;
    }
    else if(!opt.includes("")){
        statusText.textContent = `Empate!`;
        running = false;
    }else{
        changePlayer();
    }
}

function resetGame(){
    currentPlayer = "X";
    opt = ["","","","","","","","",""];
    statusText.textContent = `${currentPlayer} TURN`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}

// inicio.addEventListener('click', irInicio);

// function irInicio(){
//     window.location.href = 'index.html';
// }
