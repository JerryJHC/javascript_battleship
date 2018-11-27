//Clase para la funcionalidad de los jugadores
class player{
    constructor( name ){
        this.name = name;
    }

    print() {
        console.log(this.name);
    }

    valid(){
        return ( this.name !== '' ) ? true : false;
    }

}

class tablero{
    //Para crear el tablero se le pasa el id de la tabla donde dibujar en html
    constructor( tableID ){
        this.tableID = tableID;
        this.createTable( 5 , 5 );
    }

    //funcion que crea un array que represente el tablero
    createTable(rows,columns){
        this.table = new Array(rows);
        for( let i = 0 ; i < rows ; i++ ){
            this.table[i] = new Array(columns);
            for( let j = 0 ; j < columns ; j++ )
                this.table[i][j] = 0;
        }
    }

    //funcion para validar si el tablero se puede utilizar
    valid(){
        return ( this.table !== undefined && tableID != '' ) ? true : false;
    }

    //Funcion para atacar una posicion del tablero
    attack(x,y){
        if( x < j1.length )
            if( y < j1[x].length ){
                if( j1[x][y] == 'B' ){
                    j1[x][y] = 'X';
                    return 'X';
                }
            }
        return 'O';
    }

    //funcion para agregar barcos en el tablero
    addShip(x,y,length,direction){
        //determina las posiciones finales del barco
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
}

//Exportando modulos para test
module.exports.player = player;
module.exports.tablero = tablero;