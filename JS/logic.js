function comprobarBarco (jugador, coordenadas) {
    var barcoEncontrado, barco;
    for (var i = 0; i < jugador.barcos.length; i++) {
    barco = jugador.barcos[i];
    barcoEncontrado = barco.localizaciones.filter(
    function (coordenadaActual) {
    return (coordenadaActual[0] === coordenadas[0]) &&
    (coordenadaActual[1] === coordenadas[1]);
    })[0];
    if (!barcoEncontrado) {
    return false;
    }
    }
    }

    module.exports.comprobarBarco = comprobarBarco;
    