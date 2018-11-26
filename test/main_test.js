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