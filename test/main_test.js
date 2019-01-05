var expect = require('chai').expect;

describe('ship', function () {
    var Ship = require('../JS/game').Ship;

    let s1 = new Ship(4);
    s1.setPosition(0, 0);
    s1.setDirection('v');

    it('Creado el barco debería devolver true', function () {
        expect(s1.alive()).to.be.true;
    });

    it('Golpea al barco - debería devolver true', function () {
        expect(s1.hit(0, 0)).to.be.true;
    });

    it('Debería devolver true', function () {
        expect(s1.alive()).to.be.true;
    });

    it('No golpea al barco - debería devolver false', function () {
        expect(s1.hit(10, 0)).to.be.false;
    });

    it('Debería devolver true', function () {
        expect(s1.alive()).to.be.true;
    });

    it('Golpea al barco - debería devolver true', function () {
        expect(s1.hit(1, 0)).to.be.true;
    });

    it('Debería devolver true', function () {
        expect(s1.alive()).to.be.true;
    });

    it('Golpea al barco - debería devolver true', function () {
        expect(s1.hit(2, 0)).to.be.true;
    });

    it('Debería devolver true', function () {
        expect(s1.alive()).to.be.true;
    });

    it('Golpea al barco - debería devolver true', function () {
        expect(s1.hit(3, 0)).to.be.true;
    });

    it('Debería devolver false', function () {
        expect(s1.alive()).to.be.false;
    });

});

describe('Board', function () {
    var Ship = require('../JS/game').Ship;
    var Board = require('../JS/game').Board;
    var PlayerBoard = require('../JS/game').PlayerBoard;

    //Crea 100 barcos
    for (let i = 0; i < 100; i++) {
        let b1 = new PlayerBoard('b' + i);

        b1.startEdition();
        b1.randomShips();

        it(b1.tableID + ' - End Game : Deberia devolver false', function () {
            expect(b1.end()).to.be.false;
        });

        //Realiza hasta 100 ataques para cubrir el tablero y asegurarse que la partida termina
        for (let i = 0; i < 100; i++) {
            it(b1.tableID + ' - Ataque : Deberia devolver true', function () {
                let s = b1.randomAttack();
                return s[0] >= 0 && s[0] <= 9 && s[1] >= 0 && s[1] <= 9;
            });
            if (b1.end()) break;
        }

        it(b1.tableID + ' - End Game : Deberia devolver true', function () {
            expect(b1.end()).to.be.true;
        });
    }

});