//Clase para contener informacion de los barcos en el tablero
class Ship {
    constructor(size) {
        this.name = this.getName(size);
        this.size = size;
        this.health = size;
    }

    getName(size) {
        switch (size) {
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

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    setDirection(direction) {
        this.direction = direction;
    }


    verifyPosition(x, y) {
        let endX = this.x, endY = this.y;
        if (this.direction == 'v')
            endX += this.size - 1;
        else if (this.direction == 'h')
            endY += this.size - 1;
        else
            return false;
        return x >= this.x && x <= endX && y >= this.y && y <= endY;
    }

    hit(x, y) {
        if (this.verifyPosition(x, y)) {
            this.health--;
            return true;
        } else
            return false;
    }

    alive() {
        return this.health > 0;
    }

}

//Clase para controlar las partidas sonbre un tablero
class Board {
    //Para crear el tablero se le pasa el id de la tabla donde dibujar en html
    constructor(tableID) {
        this.rows = 10;
        this.columns = 10;
        this.tableID = tableID;
        this.start = false;
        this.edit = false;
        this.createTable();
        this.availableShips(10);
        this.activeShip(-1);
        this.direction = '';
    }

    //Indica que se ha iniciado la partida
    startGame() {
        this.start = true;
    }

    //Indica que ha finalizado la partida
    endGame() {
        this.start = false;
    }

    //Indica que se ha iniciado el modo de edicion para colocar los barcos
    startEdition() {
        this.edit = true;
        this.validateEdition();
    }

    //Valida si hay barcos por colocar
    validateEdition() {
        this.minActive++;
        this.direction = '';
        this.active++;
        if (this.minActive < this.ships.length) {
            this.activeShip(this.minActive);
            return true;
        } else {
            this.edit = false;
            return false;
        }
    }

    //funcion que crea un array que represente el tablero
    createTable() {
        this.table = new Array(this.rows);
        for (let i = 0; i < this.rows; i++) {
            this.table[i] = new Array(this.columns);
            for (let j = 0; j < this.columns; j++)
                this.table[i][j] = 0;
        }
    }

    //Crea un array con los barcos disponibles
    availableShips(cant) {
        let list = [5, 4, 4, 3, 3, 3, 2, 2, 2, 2];
        this.ships = new Array(cant);
        this.minActive = -1;
        for (let i = 0; i < cant; i++)
            this.ships[i] = new Ship(list[i]);
    }

    //Funcion para atacar una posicion del tablero
    attack(x, y) {
        if (x < this.rows && y < this.columns) {
            if (this.table[x][y] == 'O' || this.table[x][y] == 'X') return false;
            else if (this.table[x][y] == 'B') {
                this.table[x][y] = 'X';
                for (let i = 0; i < this.ships.length; i++)
                    if (this.ships[i].hit(x, y)) {
                        if (this.ships[i].alive())
                            this.msg = "ha golpeado un barco";
                        else
                            this.msg = "ha eliminado un " + this.ships[i].name;
                        break;
                    }
                return true;
            }
            this.msg = "no ha acertado";
            this.table[x][y] = 'O';
            return true;
        } else
            return false;
    }

    //funcion para agregar barcos en el tablero
    addShip(x, y) {
        if (!this.validateActive()) return false;
        //determina las posiciones finales del barco
        let finalX = x;
        let finalY = y;
        if (this.direction == 'v')
            finalX += this.ships[this.active].size - 1;
        else if (this.direction == 'h')
            finalY += this.ships[this.active].size - 1;
        else return false;

        if (!this.validatePosition(x, y, finalX, finalY)) return false;

        for (let i = x; i <= finalX; i++)
            for (let j = y; j <= finalY; j++)
                this.table[i][j] = 'B';

        this.ships[this.active].setPosition(x, y);
        this.ships[this.active].setDirection(this.direction);

        return true;
    }

    //Valida que el barco se pueda agregar en la posicion
    validatePosition(iniX, iniY, endX, endY) {
        if (endX >= this.rows || endY >= this.columns) return false;

        for (let i = iniX; i <= endX; i++)
            for (let j = iniY; j <= endY; j++)
                if (this.table[i][j] == 'B') return false;

        return true;
    }

    //Activa el barco a utilizar en la edicion
    activeShip(active) {
        this.active = active;
    }

    //Valida que haya un barco activo
    validateActive() {
        return this.active >= this.minActive && this.active < this.ships.length;
    }

    //Asgina la direccion actual del barco a utilizar
    setActiveDirection(direction) {
        if (direction == 'v')
            this.direction = 'v';
        else if (direction == 'h')
            this.direction = 'h';
    }

    //Coloca los barcos de forma aleatoria en el tablero
    randomShips() {
        while (this.active < this.ships.length) {
            let rndX = Math.round(Math.random() * (this.rows - 1)), rndY = Math.round(Math.random() * (this.columns - 1));
            this.direction = (Math.random() > 0.5) ? 'v' : 'h';
            if (this.addShip(rndX, rndY)) this.validateEdition();
        }
    }

    //Comprueba si todos los barcos han sido derribados
    end() {
        for (let i = 0; i < this.ships.length; i++)
            if (this.ships[i].alive()) return false;
        return true;
    }

}

class PlayerBoard extends Board {

    constructor(tableID) {
        super(tableID);
        this.genPositionList();
    }

    //Realiza un ataque aleatorio utilizando la lista de ataques disponibles
    randomAttack() {
        let index = Math.round(Math.random() * (this.positionList.length - 1));
        let pos = [this.positionList[index][0], this.positionList[index][1]];
        this.attack(pos[0], pos[1]);
        this.positionList.splice(index, 1);
        return pos;
    }

    //Genera un listado con todas las posibles posiciones de ataque
    genPositionList() {
        this.positionList = new Array(this.rows * this.columns);
        let c = 0;
        for (let i = 0; i < this.rows; i++)
            for (let j = 0; j < this.columns; j++)
                this.positionList[c++] = [i, j];
    }
}

//Exportando modulos para test
module.exports.Ship = Ship;
module.exports.Board = Board;
module.exports.PlayerBoard = PlayerBoard;