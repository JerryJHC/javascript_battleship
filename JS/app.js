var tableroJ1 , tableroJ2;

//Controla la edicion de barcos
function addShip(){
    let action = this.getAttribute('data-action');
    console.log(action);
    if( action == 'random' )
        tableroJ1.randomShips();
    else
        tableroJ1.setActiveDirection(action);
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
}

//Controla el estado de la partida
function game(){
    
}

window.onload = () => {

    document.querySelectorAll(".addShip").forEach( e => {
        e.addEventListener('click',addShip);
    });

    document.getElementById("editPanel").addEventListener('edit',startGame);

    document.getElementById("informationPanel").addEventListener('attack',game);

    tableroJ1 = new tablero('game',0);
    tableroJ1.drawGame();
    tableroJ1.startEdition();
    tableroJ1.activeShip( tableroJ1.minActive );
    
};