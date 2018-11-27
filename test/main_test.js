var expect = require('chai').expect;
describe('comprobarBarco', function () {
    var comprobarBarco = require('../JS/logic').comprobarBarco;

    it('debería devolver que no hay ningún barco en la coordenada pasada', function () {
        jugador = {
            barcos: [
                {
                    localizaciones: [[0, 0]]
                }
            ]
        };
        expect(comprobarBarco(jugador, [9, 9])).to.be.false;
    });

});

describe('player', function () {
    var player = require('../JS/app_o').player;

    it('debería devolver true', function () {
        expect( (new player('p1')).valid() ).to.be.true;
    });

});

describe('tablero', function () {
    var tablero = require('../JS/app_o').tablero;

    it('debería devolver true', function () {
        expect( (new tablero(2,-1)).valid() ).to.be.false;
    });

});