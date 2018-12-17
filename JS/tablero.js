//Clase para contener informacion de los barcos en el tablero
class ship{
    constructor( size ){
        this.name = this.getName(size);
        this.size = size;
        this.health = size;
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

    hit(x,y){
        let endX = this.x , endY = this.y;
        if( this.direction == 'v' )
            endX += this.size;
        else if( this.direction == 'h' )
            endY += this.size;
        else
            return false;
        if( x >= this.x && x <= endX && y >= this.y && y <= endY ){
            this.health--;
            return true;
        }else
            return false;
    }

    alive(){
        return this.health > 0;
    }

}

//Clase para controlar las partidas sonbre un tablero
class tablero{
    //Para crear el tablero se le pasa el id de la tabla donde dibujar en html
    constructor( tableID , gameType ){
        let rows = 10 , columns = 10;
        this.tableID = tableID;
        this.gameType = gameType;
        this.start = false;
        this.edit = false;
        this.createTable( rows , columns );
        this.availableShips( 10 );
        this.activeShip(-1);
        this.direction = '';
        this.info = document.querySelector("#informationPanel p."+tableID);
        this.info.textContent = '';
        if( gameType == 0 ) this.genPositionList( rows , columns );
    }

    //Indica que se ha iniciado la partida
    startGame(enemy){
        this.start = true;
        this.enemy = enemy;
    }

    endGame(){
        this.start = false;
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
            if( this.gameType == 0 ){
                document.getElementById("informationPanel").hidden = false;
                document.getElementById("editPanel").hidden = true;
                this.sendEvent( "editPanel","edit" );
            }
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
    availableShips(cant){
        let list = [5,4,4,3,3,3,2,2,2,2];
        this.ships = new Array(cant);
        this.minActive = -1;
        for( let i = 0 ; i < cant ; i++ )
            this.ships[i] = new ship(list[i]);
    }

    //funcion para validar si el tablero se puede utilizar
    valid(){
        return ( this.table !== undefined && this.tableID != '' && this.tableID !== undefined ) ? true : false;
    }

    //Funcion para atacar una posicion del tablero
    attack(x,y){
        if( x < this.table.length && y < this.table[x].length ){
            if( this.table[x][y] == 'O' || this.table[x][y] == 'X' ) return false;
            else if( this.table[x][y] == 'B' ){
                this.table[x][y] = 'X';
                for( let i = 0 ; i < this.ships.length ; i++ )
                    if( this.ships[i].hit( x , y ) ){
                        if( this.ships[i].alive() )
                            this.addMsg( "ha golpeado un " + this.ships[i].name );
                        else
                            this.addMsg( "ha eliminado un " + this.ships[i].name );
                        this.setCell( x , y , this.ships[i].name + " attacked" );
                        break;
                    }
                return true;
            }
            this.addMsg("no ha acertado");
            this.table[x][y] = 'O';
            this.setCell(x,y,"water attacked");
            return true;
        }else
            return false;
    }

    //Agrega un valor a una celda de la vista
    setCell(x,y,value){
        document.querySelector("#" + this.tableID + " ._" + x + 'n' + y ).setAttribute('class' , value );
    }

    //Agrega un mensaje en el informationPanel
    addMsg(msg){
        this.info.textContent = this.enemy + ' ' + msg;
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
                if( this.gameType == 0 )    this.setCell( i , j , '_' + i + 'n' + j + ' ' + this.ships[this.active].name );
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
                    col.setAttribute('class', '_' + i + 'n' + j + " water" );
                    col.game = this;
                    col.addEventListener("click", this.handlerCell );
                }
            }
            tablero.appendChild(fila);
        }
    }

    //Gestiona los eventos de las celdas
    handlerCell(e) {
        let coors = this.className.replace("_","").split('n');
        coors[0] = parseInt(coors[0]);
        coors[1] = parseInt(coors[1]);
        if( this.game.start && this.game.gameType == 1 ){
            this.game.attack( coors[0] , coors[1] );
            this.removeEventListener('click', this.game.handlerCell);
            this.game.sendEvent('informationPanel','attack');
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

    //Muestra el barco activo en la edicion
    showActiveShip(){
        if( this.validateActive() )
            document.getElementById("activeShip").innerText = "Nombre : " + this.ships[this.active].name + ' - Tamaño : ' + this.ships[this.active].size;
    }

    //Genera un evento en un elemento de HTML
    sendEvent( id , event ){
        let editPanel = document.getElementById(id);
        editPanel.dispatchEvent( new Event(event) );
    }

    //Coloca los barcos de forma aleatoria en el tablero
    randomShips(){
        while( this.active < this.ships.length){
            let rndX = Math.round( Math.random() * ( this.table.length -1) ) , rndY = Math.round( Math.random() * ( this.table[0].length -1) );
            this.direction = ( Math.random() > 0.5 ) ? 'v' : 'h';
            this.addShip( rndX , rndY )
        }
    }

    //Realiza un ataque aleatorio utilizando la lista de ataques disponibles
    randomAttack(){
        let index = Math.round( Math.random() * ( this.positionList.length -1) );
        this.attack( this.positionList[index][0] , this.positionList[index][1] );
        this.positionList.splice(index,1);
    }

    //Genera un listado con todas las posibles posiciones de ataque
    genPositionList(rows,columns){
        this.positionList = new Array( rows * columns);
        let c = 0;
        for( let i = 0 ; i < rows ; i++ )
            for( let j = 0 ; j < columns ; j++ )
                this.positionList[c++] = [i,j];
    }

    //Comprueba si todos los barcos han sido derribados
    end(){
        for( let i = 0 ; i < this.ships.length ; i++ )
            if( this.ships[i].alive() )   return false;
        return true;
    }

}

//Exportando modulos para test
module.exports.ship = ship;
module.exports.tablero = tablero;