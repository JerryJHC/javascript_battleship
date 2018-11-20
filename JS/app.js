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