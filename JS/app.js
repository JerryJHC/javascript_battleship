var tableroJ1 , tableroJ2;

function addShip(){
    console.log(this.getAttribute('data-action'));
    tableroJ1.setActiveDirection(this.getAttribute('data-action'));
}

window.onload = () => {

    document.querySelectorAll(".addShip").forEach( e => {
        e.addEventListener('click',addShip);
    });

    tableroJ1 = new tablero('game',0);
    tableroJ1.drawGame();
    tableroJ1.startEdition();
    tableroJ1.activeShip( tableroJ1.minActive );
    
    tableroJ2 = new tablero('game2',1);
    tableroJ2.drawGame();
};