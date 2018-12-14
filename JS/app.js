var tableroJ1 , tableroJ2;

window.onload = () => {
    tableroJ1 = new tablero('game',0);
    tableroJ1.drawGame();
    
    tableroJ2 = new tablero('game2',1);
    tableroJ2.drawGame();
};