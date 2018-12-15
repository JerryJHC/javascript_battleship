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
                return 'Acorazado';
            case 4:
                return 'Portaviones';
            case 3:
                return 'Buque';
            default:
                return 'Navio';
        }
    }

    setPosition(x,y){
        this.x = x;
        this.y = y;
    }

    setDirection(direction){
        this.direction = direction;
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
        this.activeShip(-1);
        this.direction = '';
    }

    //Indica que se ha iniciado la partida
    startGame(){
        this.start = true;
    }

    //Indica que se ha iniciado el modo de edicion para colocar los barcos
    startEdition(){
        this.edit = true;
        this.validateEdition();
    }

    //Valida si hay barcos por colocar
    validateEdition(){
        this.minActive++;
        this.direction = '';
        this.active++;
        if( this.minActive < this.ships.length ){
            this.showActiveShip();
            this.activeShip(this.minActive);
        }else{
            this.edit = false;
            let editPanel = document.getElementById("editPanel");
            editPanel.hidden = true;
            editPanel.dispatchEvent( new Event('edit') );
        }
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
        this.minActive = -1;
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
    addShip(x,y){
        if( !this.validateActive() ) return false;
        //determina las posiciones finales del barco
        let finalX = x;
        let finalY = y;
        if( this.direction == 'v' )
            finalX += this.ships[this.active].size -1;
        else if( this.direction == 'h' )
            finalY += this.ships[this.active].size -1;
        else return false;
        
        if( !this.validatePosition(x,y,finalX,finalY) ) return false;
        
        for( let i = x ; i <= finalX ; i++ )
            for( let j = y ; j <= finalY ; j++ ){
                this.table[i][j] = 'B';
                document.getElementById(i + ',' + j).textContent = 'B';
            }
        
        this.ships[this.active].setPosition(x,y);
        this.ships[this.active].setDirection(this.direction);

        this.validateEdition();

        return true;
    }

    //Valida que el barco se pueda agregaren la posicion
    validatePosition(iniX,iniY,endX,endY){
        if( endX >= this.table.length || endY >= this.table[endX].length )  return false;
        
        for( let i = iniX ; i <= endX ; i++ )
            for( let j = iniY ; j <= endY ; j++ )
                if( this.table[i][j] == 'B' )   return false;
        
        return true;
    }

    //Dibuja el tablero
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

    //Gestiona los eventos de las celdas
    handlerCell(e) {
        let coors = this.id.split(',');
        coors[0] = parseInt(coors[0]);
        coors[1] = parseInt(coors[1]);
        console.log('pulsado :  ' + coors[0] + ':' + coors[1] );
        if( this.game.start && this.game.gameType == 1 ){
            this.textContent = this.game.attack( coors[0] , coors[1]);
            this.removeEventListener('click', this.game.handlerCell);
        }else if( this.game.edit ){
            this.game.addShip( coors[0] , coors[1] )
        }
    }

    //Activa el barco a utilizar en la edicion
    activeShip(active){
        this.active = active;
    }

    //Valida que haya un barco activo
    validateActive(){
        return this.active >= this.minActive && this.active < this.ships.length;
    }

    //Asgina la direccion actual del barco a utilizar
    setActiveDirection(direction){
        if( direction == 'v' )
            this.direction = 'v';
        else if( direction == 'h' )
                this.direction = 'h';
    }

    showActiveShip(){
        if( this.validateActive() )
            document.getElementById("activeShip").innerText = "Nombre : " + this.ships[this.active].name + ' - Tamaño : ' + this.ships[this.active].size;
    }

}

//Exportando modulos para test
module.exports.player = player;
module.exports.tablero = tablero;