//Clase para la funcionalidad de los jugadores
class player{
    constructor( name ){
        this.name = name;
    }

    print() {
        console.log(this.name);
    }

}

class ship{
    constructor( rows , columns  ){
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

    print(){
        console.log(this.table);
    }

}

//Exportando modulos para test
module.exports.player = player;