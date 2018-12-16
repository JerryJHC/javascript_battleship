var tableroJ1 , tableroJ2;

function addShip(){
    console.log(this.getAttribute('data-action'));
    tableroJ1.setActiveDirection(this.getAttribute('data-action'));
}

function startGame(){
    tableroJ2 = new tablero('game2',1);
    tableroJ2.drawGame();

    tableroJ1.startGame();
    tableroJ2.startGame();
}

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