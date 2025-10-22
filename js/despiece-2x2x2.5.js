// Despiece para medida 2.00 x 2.00 x 2.50 M

const despiece_2x2x2_5 = {
    'CTU': {
        nombre: 'Cabecera de Tren en U',
        componentes: {
            'POSTES_2500': 7,
            'LARGUERO_950': 12,
            'LARGUERO_1940_ANTEPECHO': 2,
            'MAMPARA_964X2390': 6,
            'MAMPARA_ANTEPECHO_CURVO_2400X300': 1
        }
    },
    'CTL': {
        nombre: 'Cabecera de Tren en L',
        componentes: {
            'POSTES_2500': 6,
            'LARGUERO_950': 8,
            'LARGUERO_1940_ANTEPECHO': 4,
            'MAMPARA_964X2390': 4,
            'MAMPARA_ANTEPECHO_CURVO_2400X300': 2
        }
    },
    'ST': {
        nombre: 'Stands en Tren',
        componentes: {
            'POSTES_2500': 4,
            'LARGUERO_950': 8,
            'LARGUERO_1940_ANTEPECHO': 2,
            'MAMPARA_964X2390': 4,
            'MAMPARA_ANTEPECHO_CURVO_2400X300': 1
        }
    },
    'VTL': {
        nombre: 'Vuelta Tren en L',
        componentes: {
            'POSTES_2500': 5,
            'LARGUERO_950': 8,
            'LARGUERO_1940_ANTEPECHO': 4,
            'MAMPARA_964X2390': 4,
            'MAMPARA_ANTEPECHO_CURVO_2400X300': 2
        }
    },
    'VTU': {
        nombre: 'Vuelta Tren en U',
        componentes: {
            'POSTES_2500': 6,
            'LARGUERO_950': 12,
            'LARGUERO_1940_ANTEPECHO': 2,
            'MAMPARA_964X2390': 6,
            'MAMPARA_ANTEPECHO_CURVO_2400X300': 1
        }
    },
    'VTI': {
        nombre: 'Tren en Vuelta',
        componentes: {
            'POSTES_2500': 3,
            'LARGUERO_950': 4,
            'LARGUERO_1940_ANTEPECHO': 4,
            'MAMPARA_964X2390': 2,
            'MAMPARA_ANTEPECHO_CURVO_2400X300': 2
        }
    },
    'FT': {
        nombre: 'Final de Tren',
        componentes: {
            'POSTES_2500': 3,
            'LARGUERO_950': 4,
            'LARGUERO_1940_ANTEPECHO': 4,
            'MAMPARA_964X2390': 2,
            'MAMPARA_ANTEPECHO_CURVO_2400X300': 2
        }
    },
    'EI': {
        nombre: 'Esquina de Isla',
        componentes: {
            'POSTES_2500': 3.25,
            'LARGUERO_950': 4,
            'LARGUERO_1940_ANTEPECHO': 4,
            'MAMPARA_964X2390': 2,
            'MAMPARA_ANTEPECHO_CURVO_2400X300': 2
        }
    },
    'II': {
        nombre: 'Intermedio de Isla',
        componentes: {
            'POSTES_2500': 3,
            'LARGUERO_950': 6,
            'LARGUERO_1940_ANTEPECHO': 2,
            'MAMPARA_964X2390': 3,
            'MAMPARA_ANTEPECHO_CURVO_2400X300': 1
        }
    },
    'IT': {
        nombre: 'Intermedio de Tren',
        componentes: {
            'POSTES_2500': 3,
            'LARGUERO_950': 4,
            'LARGUERO_1940_ANTEPECHO': 3,
            'MAMPARA_964X2390': 2,
            'MAMPARA_ANTEPECHO_CURVO_2400X300': 1
        }
    },
    'VIT': {
        nombre: 'Vuelta Intermedio de Tren',
        componentes: {
            'POSTES_2500': 5,
            'LARGUERO_950': 8,
            'LARGUERO_1940_ANTEPECHO': 3,
            'MAMPARA_964X2390': 4,
            'MAMPARA_ANTEPECHO_CURVO_2400X300': 1
        }
    },
    'CTIU': {
        nombre: 'Cabecera de Tren A en U',
        componentes: {
            'POSTES_2500': 6,
            'LARGUERO_950': 8,
            'LARGUERO_1940_ANTEPECHO': 3,
            'MAMPARA_964X2390': 4,
            'MAMPARA_ANTEPECHO_CURVO_2400X300': 1
        }
    },
    'CTIL': {
        nombre: 'Cabecera de Tren A en L',
        componentes: {
            'POSTES_2500': 5,
            'LARGUERO_950': 4,
            'LARGUERO_1940_ANTEPECHO': 5,
            'MAMPARA_964X2390': 2,
            'MAMPARA_ANTEPECHO_CURVO_2400X300': 2
        }
    },
    'REGISTROS': {
        nombre: 'Stand de Registros',
        componentes: {
            'POSTES_2500': 4,
            'LARGUERO_950': 8,
            'LARGUERO_1940_ANTEPECHO': 2,
            'MAMPARA_964X2390': 4,
            'MAMPARA_ANTEPECHO_CURVO_2400X300': 1
        }
    }
};

// Funcion para mostrar los resultados en el modal de medida 2x2x2.5
function mostrarResultados2x2x2_5(contenedor, resultado){
    // Obtener la referencia a los componentes del resultado
    const componentes = resultado.componentes;

    // Funcion auxiliar para obtener la cantidad de un componente
    function getCantidad(codigo){
        const comp = componentes.find(c => c.codigo === codigo);
        return comp ? comp.cantidadTotal : 0;
    }

    // Seccion 1: TOTALES STAND TIPO 1 (ANTEPECHO CURVO)
    agregarSeccion(contenedor, 'TOTALES STAND TIPO 1 (ANTEPECHO CURVO)', [
        { nombre: 'TOTAL POSTES 2500mm', cantidad: getCantidad('POSTES_2500') },
        { nombre: 'TOTAL LARGUERO 950mm', cantidad: getCantidad('LARGUERO_950') },
        { nombre: 'TOTAL LARGUERO ANTEPECHO 1940mm', cantidad: getCantidad('LARGUERO_1940_ANTEPECHO') },
        { nombre: 'TOTAL MAMPARA 964x2390mm', cantidad: getCantidad('MAMPARA_964X2390') },
        { nombre: 'TOTAL PANEL ANTEPECHO CURVO 2400x300mm', cantidad: getCantidad('MAMPARA_ANTEPECHO_CURVO_2400X300') }
    ]);

    // Seccion 2: Factor de proteccion Stand Tipo 1
    agregarSeccion(contenedor, 'FACTOR DE PROTECCION STAND TIPO 1', [
        { nombre: 'TOTAL POSTES 2500mm', cantidad: getCantidad('POSTES_2500') + 10 },
        { nombre: 'TOTAL LARGUERO 950mm', cantidad: getCantidad('LARGUERO_950') + 10 },
        { nombre: 'TOTAL LARGUERO ANTEPECHO 1940mm', cantidad: getCantidad('LARGUERO_1940_ANTEPECHO') + 10 },
        { nombre: 'TOTAL MAMPARA 964x2390mm', cantidad: getCantidad('MAMPARA_964X2390') + 10 },
        { nombre: 'TOTAL PANEL ANTEPECHO CURVO 2400x300mm', cantidad: getCantidad('MAMPARA_ANTEPECHO_CURVO_2400X300') + 10 }
    ]);

    // Seccion 3: TOTALES STAND TIPO 2 (ANTEPECHO RECTO)
    agregarSeccion(contenedor, 'TOTALES STAND TIPO 2 (ANTEPECHO RECTO)', [
        { nombre: 'TOTAL POSTES 2500mm', cantidad: getCantidad('POSTES_2500') },
        { nombre: 'TOTAL LARGUERO 950mm', cantidad: getCantidad('LARGUERO_950') },
        { nombre: 'TOTAL LARGUERO ANTEPECHO 1940mm', cantidad: getCantidad('LARGUERO_1940_ANTEPECHO') },
        { nombre: 'TOTAL MAMPARA 964x2390mm', cantidad: getCantidad('MAMPARA_964X2390') },
        { nombre: 'TOTAL PANEL ANTEPECHO 1954x214mm', cantidad: getCantidad('MAMPARA_ANTEPECHO_CURVO_2400X300') }
    ]);

    // Seccion 4: Factor de proteccion Stand Tipo 2
    agregarSeccion(contenedor, 'FACTOR DE PROTECCION STAND TIPO 2', [
        { nombre: 'TOTAL POSTES 2500mm', cantidad: getCantidad('POSTES_2500') + 10 },
        { nombre: 'TOTAL LARGUERO 950mm', cantidad: getCantidad('LARGUERO_950') + 10 },
        { nombre: 'TOTAL LARGUERO ANTEPECHO 1940mm', cantidad: getCantidad('LARGUERO_1940_ANTEPECHO') + 10 },
        { nombre: 'TOTAL MAMPARA 964x2390mm', cantidad: getCantidad('MAMPARA_964X2390') + 10 },
        { nombre: 'TOTAL PANEL ANTEPECHO 1954x214mm', cantidad: getCantidad('MAMPARA_ANTEPECHO_CURVO_2400X300') + 10 }
    ]);
}