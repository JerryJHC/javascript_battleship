var tableroJ1 , tableroJ2;

//Resetea los elementos
function resetGame(){

    document.querySelectorAll(".addShip").forEach( e => {
        e.addEventListener('click',addShip);
    });

    document.getElementById("reset").addEventListener('click',resetGame);
    document.getElementById("reset").hidden = true;

    document.getElementById("editPanel").hidden = false;

    document.getElementById("informationPanel").addEventListener('attack',game);
    document.getElementById("informationPanel").hidden = true;

    document.getElementById("TableroJ2").hidden = true;

    tableroJ1 = new tablero('game',0);
    tableroJ1.drawGame();
    tableroJ1.startEdition();
    tableroJ1.activeShip( tableroJ1.minActive );
}

//Controla la edicion de barcos
function addShip(){
    let action = this.getAttribute('data-action');
    if( action == 'random' )
        tableroJ1.randomShips();
    else
        tableroJ1.setActiveDirection(action);
}

//Muestra el barco activo en la edicion
function showActiveShip(board){
    if( board.validateActive() )
        document.getElementById("activeShip").innerText = "Nombre : " + board.ships[board.active].name + ' - Tamaño : ' + board.ships[board.active].size;
}

//Dibuja el tablero
function drawGame( board ) {
    var table = document.getElementById(board.tableID);

    while (table.hasChildNodes()) table.removeChild(table.firstChild);
  
    for (let i = -1; i < this.table.length ; i++) {
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
                col.setAttribute('class', '_' + i + 'n' + j + " water" );
                col.game = board;
                col.addEventListener("click", handlerCell );
            }
        }
        tablero.appendChild(row);
    }
}

//Gestiona los eventos de las celdas
function handlerCell() {
    let coors = this.className.replace("_","").split('n');
    coors[0] = parseInt(coors[0]);
    coors[1] = parseInt(coors[1]);
    if( this.game.start && this.game.gameType == 1 ){
        this.game.attack( coors[0] , coors[1] );
        this.removeEventListener('click', this.game.handlerCell);
        this.game.sendEvent('informationPanel','attack');
    }else if( this.game.edit ){
        this.game.addShip( coors[0] , coors[1] )
    }
}

//Valida si hay barcos por colocar
function validateEdition(board){
    if( board.validateEdition() )
        board.showActiveShip();
    else{
        document.getElementById("informationPanel").hidden = false;
        document.getElementById("editPanel").hidden = true;
        startGame();
    }
}

//Inicializa el juego
function startGame(){
    tableroJ2 = new tablero('game2',1);
    tableroJ2.drawGame();
    tableroJ2.startEdition();
    tableroJ2.randomShips();

    tableroJ1.startGame("CPU");
    tableroJ2.startGame("Jugador1");
    
    document.getElementById("editPanel").removeEventListener('edit',startGame);

    document.getElementById("TableroJ2").hidden = false;
}

//Controla el estado de la partida
function game(){
    if( tableroJ2.end() ){
        endGame(tableroJ2);
    }else{
        tableroJ1.randomAttack();
        if( tableroJ1.end() ){
            endGame(tableroJ1);
        }
    }
}

//Finaliza la partida dando al ganador
function endGame(looser){
    tableroJ1.endGame();
    tableroJ2.endGame();
    alert("Ha terminado la partida el ganador es : " + looser.enemy );
    document.getElementById("reset").hidden = false;
}

window.onload = resetGame;