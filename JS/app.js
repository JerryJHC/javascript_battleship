//Tabla de jugador 1
var j1 = [
    [ '-' , '-' , '-' ],
    [ '-' , '-' , '-' ]
];

function printJ1(){
    j1.forEach(element => {
        element.forEach( value => console.log(" " + value + " ") );
        console.log("\n");
    });
}

function attack(x,y){
    if( x < j1.length )
        if( y < j1[x].length )
            j1[x][y] = 'x';
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
                    j1[i][j] = 'o';
        }
}

/* handler de eventos click */
var handler = function(e) {
    this.textContent = "X";
    arrayTablero[this.row][this.column] = "X";
  };
  
function draw() {
    var tablero = document.getElementById("game");
  
    while (tablero.hasChildNodes()) {
      tablero.removeChild(tablero.firstChild);
    }
  
    for (let i = 0; i <= j1.length ; i++) {
        var fila = document.createElement("tr");
        //arrayTablero[s] = new Array(columnas);
        for (let j = 0; j <= j1[i].length; j++) {
            var col = document.createElement("td");
            fila.appendChild(col);
            if (i === 0 && j === 0) {
            } else if (i === 0 && j !== 0) {
                col.textContent = String.fromCharCode(65 + j);
            } else if (j === 0 && i !== 0) {
                col.textContent = i;
            } else {
                j1[i][j] = 0;
                col.row = i;
                col.column = j;
                col.textContent = "" + i + ',' + j ;
                col.addEventListener("click", handler );
            }
        }
    
        tablero.appendChild(fila);
    }
}
  
  window.onload = () => draw();