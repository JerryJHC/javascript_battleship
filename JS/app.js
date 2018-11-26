//Tabla de jugador 1
const rows = 5 , columns = 5;
var j1 = new Array(rows);

function printJ1(){
    j1.forEach(element => {
        element.forEach( value => console.log(" " + value + " ") );
        console.log("\n");
    });
}

function attack(x,y){
    if( x < j1.length )
        if( y < j1[x].length ){
            if( j1[x][y] == 'B' ){
                j1[x][y] = 'X';
                return 'X';
            }
        }
    return 'O';
}

function putBoat(x,y,length,direction){
    //determina las posiciones finales
    finalX = x;
    finalY = y;
    if( direction == 'v' )
        finalX += length -1;
    else
        finalY += length -1;
    
    if( finalX < j1.length )
        if( finalY < j1[x].length ){
            for( let i = x ; i <= finalX ; i++ )
                for( let j = y ; j <= finalY ; j++ )
                    j1[i][j] = 'B';
        }
}

/* handler de eventos click */
var handlerCell = function(e) {
    this.textContent = attack(this.row , this.column);
    this.removeEventListener('click',handlerCell);
  };
  
function drawGame() {
    var tablero = document.getElementById("game");

    while (tablero.hasChildNodes()) tablero.removeChild(tablero.firstChild);
  
    for (let i = -1; i < rows ; i++) {
        var fila = document.createElement("tr");
        if( i !== -1 ) j1[i] = new Array(columns);
        for (let j = -1; j < columns; j++) {
            var col = document.createElement("td");
            fila.appendChild(col);
            if (i === -1 && j === -1) {
            } else if (i === -1 && j !== -1) {
                col.textContent = String.fromCharCode(65 + j);
            } else if (j === -1 && i !== -1) {
                col.textContent = i;
            } else {
                j1[i][j] = 0;
                col.row = i;
                col.column = j;
                col.textContent = "" + i + ',' + j ;
                col.addEventListener("click", handlerCell );
            }
        }
    
        tablero.appendChild(fila);
    }
}
  
window.onload = () => drawGame();