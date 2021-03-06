var tableroJ1, tableroJ2;

//Resetea los elementos
function resetGame() {

    document.querySelectorAll(".addShip").forEach(e => {
        e.addEventListener('click', addShip);
    });

    document.getElementById("reset").addEventListener('click', resetGame);
    document.getElementById("reset").hidden = true;

    document.getElementById("editPanel").hidden = false;

    document.getElementById("informationPanel").hidden = true;

    document.getElementById("TableroJ2").hidden = true;

    tableroJ1 = new PlayerBoard('game');
    drawGame(tableroJ1);
    tableroJ1.startEdition();
    tableroJ1.activeShip(tableroJ1.minActive);
    showActiveShip(tableroJ1);
}

//Controla la edicion de barcos
function addShip() {
    let action = this.getAttribute('data-action');
    if (action == 'random') {
        tableroJ1.randomShips();
        drawGame(tableroJ1);
        validateEdition(tableroJ1);
    } else
        tableroJ1.setActiveDirection(action);
}

//Muestra el barco activo en la edicion
function showActiveShip(board) {
    if (board.validateActive())
        document.getElementById("activeShip").innerText = "Nombre : " + board.ships[board.active].name + ' - Tamaño : ' + board.ships[board.active].size;
}

//Muestra un mensaje del tablero
function showInfo(board,enemy){
    document.querySelector("#informationPanel ."+board.tableID).textContent = enemy + " " + board.msg;
}

//Dibuja el tablero
function drawGame(board) {
    var table = document.getElementById(board.tableID);

    while (table.hasChildNodes()) table.removeChild(table.firstChild);

    for (let i = -1; i < board.table.length; i++) {
        var row = document.createElement("tr");
        for (let j = -1; j < board.table[0].length; j++) {
            var col = document.createElement("td");
            row.appendChild(col);
            if (i === -1 && j === -1) {
            } else if (i === -1 && j !== -1) {
                col.textContent = String.fromCharCode(65 + j);
            } else if (j === -1 && i !== -1) {
                col.textContent = i;
            } else {
                col.setAttribute('class', '_' + i + 'n' + j + ((board.table[i][j] == 'B') ? " ship" : " water"));
                col.game = board;
                col.addEventListener("click", handlerCell);
            }
        }
        table.appendChild(row);
    }
}

//Gestiona los eventos de las celdas
function handlerCell() {
    let coors = this.className.replace("_", "").split('n');
    coors[0] = parseInt(coors[0]);
    coors[1] = parseInt(coors[1]);
    if (this.game.start && this.game == tableroJ2) {
        this.game.attack(coors[0], coors[1]);
        setCell(tableroJ2, coors[0], coors[1], "attacked");
        this.removeEventListener('click', handlerCell);
        showInfo(tableroJ2,"Jugador 1");
        if (tableroJ2.end()) endGame("Jugador 1");
        else CPUAttack();
    } else if (this.game.edit) {
        if (this.game.addShip(coors[0], coors[1])) {
            drawGame(this.game);
            validateEdition(this.game);
        }
    }
}

function CPUAttack() {
    let pos = tableroJ1.randomAttack();
    setCell(tableroJ1, pos[0], pos[1], "attacked");
    showInfo(tableroJ1,"CPU");
    if (tableroJ1.end()) endGame("CPU");
}

//Valida si hay barcos por colocar
function validateEdition(board) {
    if (board.validateEdition())
        showActiveShip(board);
    else {
        document.getElementById("informationPanel").hidden = false;
        document.getElementById("editPanel").hidden = true;
        startGame();
    }
}

//Inicializa el juego
function startGame() {
    tableroJ2 = new Board('game2');
    tableroJ2.startEdition();
    tableroJ2.randomShips();
    drawGame(tableroJ2);

    tableroJ1.startGame();
    tableroJ2.startGame();

    document.getElementById("TableroJ2").hidden = false;
}

//Controla el estado de la partida
function game() {
    if (tableroJ2.end()) {
        endGame(tableroJ2);
    } else {
        tableroJ1.randomAttack();
        if (tableroJ1.end()) {
            endGame(tableroJ1);
        }
    }
}

//Finaliza la partida dando al ganador
function endGame(winner) {
    tableroJ1.endGame();
    tableroJ2.endGame();
    alert("Ha terminado la partida el ganador es : " + winner);
    document.getElementById("reset").hidden = false;
}

//Agrega un valor a una celda de la vista
function setCell(board, x, y, value) {
    let cell = document.querySelector("#" + board.tableID + " ._" + x + 'n' + y);
    cell.setAttribute('class', cell.getAttribute('class') + " attacked");
}

//Muestra un mensaje en el informationPanel
function showMessage(board) {

}

window.onload = resetGame;