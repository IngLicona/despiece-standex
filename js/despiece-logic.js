// Medidas disponibles
window.medidasDisponibles = [
    { id: '1', codigo: '2x2x2.5', descripcion: '2.00 x 2.00 x 2.50 M' },
    { id: '2', codigo: '3x2x2.5', descripcion: '3.00 x 2.00 x 2.50 M' },
    { id: '3', codigo: '3x2.5x2.5', descripcion: '3.00 x 2.50 x 2.50 M' },
    { id: '4', codigo: '3x3x2.5', descripcion: '3.00 x 3.00 x 2.50 M' }
];

// Obtener despiece segun medida
function obtenerDespiecePorMedida(medidaId) {
    switch(medidaId) {
        case '1':
            return despiece_2x2x2_5;
        case '2':
            return despiece_3x2x2_5;
        case '3':
            return despiece_3x2_5x2_5;
        case '4':
            return despiece_3x3x2_5;
        default:
            return despiece_2x2x2_5;
    }
}

// Nombres de componentes
const nombresComponentes = {
    'POSTES_2500': 'Postes 2500mm',
    'POSTES_300_ANTEPECHO': 'Postes 300mm Antepecho',
    'LARGUERO_950': 'Larguero 950mm',
    'LARGUERO_2435': 'Larguero 2435mm',
    'LARGUERO_455': 'Larguero 455mm',
    'LARGUERO_1940_ANTEPECHO': 'Larguero Antepecho 1940mm',
    'LARGUERO_950_ANTEPECHO': 'Larguero Antepecho 950mm',
    'LARGUERO_455_ANTEPECHO': 'Larguero Antepecho 455mm',
    'LARGUERO_455_ANTEPECHO1': 'Larguero Antepecho 455mm Centro',
    'LARGUERO_455_ANTEPECHO2': 'Larguero Antepecho 455mm Lateral',
    'LARGERO_455_ANTEPECHO': 'Larguero Antepecho 455mm',
    'LARGUERO_2435_ANTEPECHO': 'Larguero Antepecho 2435mm',
    'LARGUERO_2435_INTERMERDIO': 'Larguero Intermedio 2435mm',
    'LARGUERO_ANTEPECHO_2930': 'Larguero Antepecho 2930mm',
    'MAMPARA_964X2390': 'Mampara 964x2390mm',
    'MAMPARA_469X2390': 'Mampara 469x2390mm',
    'MAMPARA_1940_ANTEPECHO': 'Panel Antepecho 1954x214mm',
    'MAMPARA_ANTEPECHO_CURVO_2400X300': 'Panel Antepecho Curvo 2400x300mm',
    'MAMPARA_ANTEPECHO_CURVO_2174X255': 'Panel Antepecho Curvo 2174x255mm',
    'MAMPARA_ANTEPECHO_964X214': 'Panel Antepecho 964x214mm',
    'MAMPARA_ANTEPECHO_469X214': 'Panel Antepecho 469x214mm',
    'MAMPARA_ANTEPECHO_469X214_1': 'Panel Antepecho 469x214mm Centro',
    'MAMPARA_ANTEPECHO_469X214_2': 'Panel Antepecho 469x214mm Lateral',
    'MAMPARA_ANTEPECHO_2944': 'Panel Antepecho 2944x214mm',
    'PANEL_ANTEPECHO_1954X214': 'Panel Antepecho 1954x214mm',
    'PANEL_ANTEPECHO_2449X214': 'Panel Antepecho 2449x214mm',
    'PANEL_ANTEPECHO_2944X214': 'Panel Antepecho 2944x214mm',
    'PANEL_ANTEPECHO_CURVO_2200X300': 'Panel Antepecho Curvo 2200x300mm',
    'PANEL_ANTEPECHO_469X214': 'Panel Antepecho 469x214mm',
    'PANEL_ART_964X2390': 'Panel Art 964x2390mm',
    'PANEL_ART_ANTEPECHO_2435X300': 'Panel Art Antepecho con Ganchos 2435x300mm',
    'PANEL_ART_ANTEPECHO_2930X300': 'Panel Art Antepecho con Ganchos 2930x300mm',
    'PANEL_ART_ANTEPECHO_1940X300': 'Panel Art Antepecho con Ganchos 1940x300mm'
};

// Calcular materiales
function calcularMaterialesPorModulo(moduleKey, cantidad, medidaId) {
    const despiecePorModulo = obtenerDespiecePorMedida(medidaId);
    
    if (!despiecePorModulo[moduleKey]) {
        return { error: true, mensaje: 'Modulo no encontrado' };
    }

    const modulo = despiecePorModulo[moduleKey];
    const resultado = {
        modulo: modulo.nombre,
        cantidad: cantidad,
        componentes: []
    };

    for (let componenteKey in modulo.componentes) {
        const cantidadBase = modulo.componentes[componenteKey];
        const cantidadTotal = cantidadBase * cantidad;

        resultado.componentes.push({
            codigo: componenteKey,
            nombre: nombresComponentes[componenteKey] || componenteKey,
            cantidadPorModulo: cantidadBase,
            cantidadTotal: cantidadTotal
        });
    }

    return resultado;
}
