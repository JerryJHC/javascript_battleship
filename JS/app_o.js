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
    constructor( rows , columns ){
        if( rows > 0 && columns > 0 )
            this.createTable(rows,columns);
    }

    createTable(rows,columns){
        this.table = new Array(rows);
        for( let i = 0 ; i < rows ; i++ ){
            this.table[i] = new Array(columns);
            for( let j = 0 ; j < columns ; j++ )
                this.table[i][j] = 0;
        }
    }

    valid(){
        return ( this.table !== undefined ) ? true : false;
    }

}

//Exportando modulos para test
module.exports.player = player;
module.exports.tablero = tablero;