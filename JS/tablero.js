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

class ship{
    constructor( size ){
        this.name = this.getName(size);
        this.size = size;
    }

    getName(size){
        switch(size){
            case 5:
                return 'acorazado';
            case 4:
                return 'portaviones';
            case 3:
                return 'buque';
            default:
                return 'navio';
        }
    }

    setPosition(x,y){
        this.x = x;
        this.y = y;
    }

    setOrientation(o){
        this.orientation = o;
    }

}

class tablero{
    //Para crear el tablero se le pasa el id de la tabla donde dibujar en html
    constructor( tableID , gameType ){
        this.tableID = tableID;
        this.gameType = gameType;
        this.start = false;
        this.edit = false;
        this.createTable( 5 , 5 );
        this.availableShips( 5 , 4 );
        this.activeShip(0);
    }

    //Indica que se ha iniciado la partida
    startGame(){
        this.start = true;
    }

    //Indica que se ha iniciado el modo de edicion para colocar los barcos
    startEdition(){
        this.edit = true;
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

    //Crea un array con los barcos disponibles
    availableShips(max,cant){
        this.ships = new Array(cant);
        for( let i = 0 ; i < cant ; i++ )
            this.ships[i] = new ship(max--);
    }

    //funcion para validar si el tablero se puede utilizar
    valid(){
        return ( this.table !== undefined && this.tableID != '' && this.tableID !== undefined ) ? true : false;
    }

    //Funcion para atacar una posicion del tablero
    attack(x,y){
        if( x < this.table.length )
            if( y < this.table[x].length ){
                if( this.table[x][y] == 'B' ){
                    this.table[x][y] = 'X';
                    return 'X';
                }
            }
        return 'O';
    }

    //funcion para agregar barcos en el tablero
    addShip(x,y,length,direction){
        //determina las posiciones finales del barco
        let finalX = x;
        let finalY = y;
        if( direction == 'v' )
            finalX += length -1;
        else
            finalY += length -1;
        
        if( finalX < this.table.length )
            if( finalY < this.table[x].length ){
                for( let i = x ; i <= finalX ; i++ )
                    for( let j = y ; j <= finalY ; j++ )
                        this.table[i][j] = 'B';
            }
    }

    drawGame() {
        var tablero = document.getElementById(this.tableID);
    
        while (tablero.hasChildNodes()) tablero.removeChild(tablero.firstChild);
      
        for (let i = -1; i < this.table.length ; i++) {
            var fila = document.createElement("tr");
            for (let j = -1; j < this.table[0].length; j++) {
                var col = document.createElement("td");
                fila.appendChild(col);
                if (i === -1 && j === -1) {
                } else if (i === -1 && j !== -1) {
                    col.textContent = String.fromCharCode(65 + j);
                } else if (j === -1 && i !== -1) {
                    col.textContent = i;
                } else {
                    let id = i + ',' + j;
                    col.textContent = ( this.gameType == 1 ) ? id  : this.table[i][j] ;
                    col.setAttribute('id', id );
                    col.game = this;
                    col.addEventListener("click", this.handlerCell );
                }
            }
        
            tablero.appendChild(fila);
        }
    }

    handlerCell(e) {
        let coors = this.id.split(',');
        console.log('pulsado :  ' + coors[0] + ':' + coors[1] );
        if( this.game.start ){
            this.textContent = this.game.attack( coors[0] , coors[1]);
            this.removeEventListener('click', this.game.handlerCell);
        }else if( this.game.edit ){

        }
    }

    //Activa el barco a utilizar
    activeShip(active){
        this.active = active;
    }

}

//Exportando modulos para test
module.exports.player = player;
module.exports.tablero = tablero;