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

describe('ship', function () {
    var ship = require('../JS/tablero').ship;

    let s1 = new ship(4);
    s1.setPosition(0,0);
    s1.setDirection('v');

    it('Creado el barco debería devolver true', function () {
        expect( s1.alive() ).to.be.true;
    });

    it('Golpea al barco - debería devolver true', function () {
        expect( s1.hit(0,0) ).to.be.true;
    });

    it('Debería devolver true', function () {
        expect( s1.alive() ).to.be.true;
    });

    it('No golpea al barco - debería devolver false', function () {
        expect( s1.hit(10,0) ).to.be.false;
    });

    it('Debería devolver true', function () {
        expect( s1.alive() ).to.be.true;
    });

    it('Golpea al barco - debería devolver true', function () {
        expect( s1.hit(1,0) ).to.be.true;
    });

    it('Debería devolver true', function () {
        expect( s1.alive() ).to.be.true;
    });

    it('Golpea al barco - debería devolver true', function () {
        expect( s1.hit(2,0) ).to.be.true;
    });

    it('Debería devolver true', function () {
        expect( s1.alive() ).to.be.true;
    });

    it('Golpea al barco - debería devolver true', function () {
        expect( s1.hit(3,0) ).to.be.true;
    });

    it('Debería devolver false', function () {
        expect( s1.alive() ).to.be.false;
    });

});