// Despiece para medida 2.00 x 2.00 x 2.50 M

const despiece_2x2x2_5 = {
    'SC': {
        nombre: 'Stand en Cajon',
        componentes: {
            'POSTES_2500': 7,
            'LARGUERO_950': 12,
            'LARGUERO_1940_ANTEPECHO': 2,
            'MAMPARA_964X2390': 6,
            'MAMPARA_ANTEPECHO_CURVO_2174X255': 1
        }
    },
    'SE': {
        nombre: 'Stand en Esquina',
        componentes: {
            'POSTES_2500': 6,
            'LARGUERO_950': 8,
            'LARGUERO_1940_ANTEPECHO': 4,
            'MAMPARA_964X2390': 4,
            'MAMPARA_ANTEPECHO_CURVO_2174X255': 2
        }
    },
    'ST': {
        nombre: 'Stands en Tren',
        componentes: {
            'POSTES_2500': 4,
            'LARGUERO_950': 8,
            'LARGUERO_1940_ANTEPECHO': 2,
            'MAMPARA_964X2390': 4,
            'MAMPARA_ANTEPECHO_CURVO_2174X255': 1
        }
    },
    'VTL': {
        nombre: 'Vuelta Tren en L',
        componentes: {
            'POSTES_2500': 5,
            'LARGUERO_950': 8,
            'LARGUERO_1940_ANTEPECHO': 4,
            'MAMPARA_964X2390': 4,
            'MAMPARA_ANTEPECHO_CURVO_2174X255': 2
        }
    },
    'VTU': {
        nombre: 'Vuelta Tren en U',
        componentes: {
            'POSTES_2500': 6,
            'LARGUERO_950': 12,
            'LARGUERO_1940_ANTEPECHO': 2,
            'MAMPARA_964X2390': 6,
            'MAMPARA_ANTEPECHO_CURVO_2174X255': 1
        }
    },
    'VTI': {
        nombre: 'Tren en Vuelta',
        componentes: {
            'POSTES_2500': 3,
            'LARGUERO_950': 4,
            'LARGUERO_1940_ANTEPECHO': 4,
            'MAMPARA_964X2390': 2,
            'MAMPARA_ANTEPECHO_CURVO_2174X255': 2
        }
    },
    'FT': {
        nombre: 'Final de Tren',
        componentes: {
            'POSTES_2500': 3,
            'LARGUERO_950': 4,
            'LARGUERO_1940_ANTEPECHO': 4,
            'MAMPARA_964X2390': 2,
            'MAMPARA_ANTEPECHO_CURVO_2174X255': 2
        }
    },
    'EI': {
        nombre: 'Esquina de Isla',
        componentes: {
            'POSTES_2500': 3.25,
            'LARGUERO_950': 4,
            'LARGUERO_1940_ANTEPECHO': 4,
            'MAMPARA_964X2390': 2,
            'MAMPARA_ANTEPECHO_CURVO_2174X255': 2
        }
    },
    'II': {
        nombre: 'Intermedio de Isla',
        componentes: {
            'POSTES_2500': 3,
            'LARGUERO_950': 6,
            'LARGUERO_1940_ANTEPECHO': 2,
            'MAMPARA_964X2390': 3,
            'MAMPARA_ANTEPECHO_CURVO_2174X255': 1
        }
    },
    'IT': {
        nombre: 'Intermedio de Tren',
        componentes: {
            'POSTES_2500': 3,
            'LARGUERO_950': 4,
            'LARGUERO_1940_ANTEPECHO': 3,
            'MAMPARA_964X2390': 2,
            'MAMPARA_ANTEPECHO_CURVO_2174X255': 1
        }
    },
    'VIT': {
        nombre: 'Vuelta Intermedio de Tren',
        componentes: {
            'POSTES_2500': 5,
            'LARGUERO_950': 8,
            'LARGUERO_1940_ANTEPECHO': 3,
            'MAMPARA_964X2390': 4,
            'MAMPARA_ANTEPECHO_CURVO_2174X255': 1
        }
    },
    'CTIU': {
        nombre: 'Cabecera de Tren Intermedia en U',
        componentes: {
            'POSTES_2500': 6,
            'LARGUERO_950': 8,
            'LARGUERO_1940_ANTEPECHO': 3,
            'MAMPARA_964X2390': 4,
            'MAMPARA_ANTEPECHO_CURVO_2174X255': 1
        }
    },
    'CTIL': {
        nombre: 'Cabecera de Tren Intermedia en L',
        componentes: {
            'POSTES_2500': 5,
            'LARGUERO_950': 4,
            'LARGUERO_1940_ANTEPECHO': 5,
            'MAMPARA_964X2390': 2,
            'MAMPARA_ANTEPECHO_CURVO_2174X255': 2
        }
    },
    'REGISTROS': {
        nombre: 'Stand de Registros',
        componentes: {
            'POSTES_2500': 4,
            'LARGUERO_950': 8,
            'LARGUERO_1940_ANTEPECHO': 2,
            'MAMPARA_964X2390': 4,
            'MAMPARA_ANTEPECHO_CURVO_2174X255': 1
        }
    }
};

// Funcion para mostrar los resultados en el modal de medida 2x2x2.5
function mostrarResultados2x2x2_5(contenedor, resultado, tipoResultado){
    // Obtener la referencia a los componentes del resultado
    const componentes = resultado.componentes;

    // Funcion auxiliar para obtener la cantidad de un componente
    function getCantidad(codigo){
        const comp = componentes.find(c => c.codigo === codigo);
        return comp ? comp.cantidadTotal : 0;
    }

    // Array para guardar los materiales que se mostrarán
    let materialesFiltrados = [];

    // Mostrar solo el tipo seleccionado
    if (tipoResultado === 'TIPO1') {
        materialesFiltrados = [
            { codigo: 'POSTES_2500', nombre: 'TOTAL POSTES 2500mm', cantidad: getCantidad('POSTES_2500') },
            { codigo: 'LARGUERO_950', nombre: 'TOTAL LARGUERO 950mm', cantidad: getCantidad('LARGUERO_950') },
            { codigo: 'LARGUERO_1940_ANTEPECHO', nombre: 'TOTAL LARGUERO ANTEPECHO 1940mm', cantidad: getCantidad('LARGUERO_1940_ANTEPECHO') },
            { codigo: 'MAMPARA_964X2390', nombre: 'TOTAL MAMPARA 964x2390mm', cantidad: getCantidad('MAMPARA_964X2390') },
            { codigo: 'MAMPARA_ANTEPECHO_CURVO_2174X255', nombre: 'TOTAL PANEL ANTEPECHO CURVO 2174x255mm', cantidad: getCantidad('MAMPARA_ANTEPECHO_CURVO_2174X255') }
        ];
        agregarSeccion(contenedor, 'TOTALES STAND TIPO 1 (ANTEPECHO CURVO)', materialesFiltrados.map(m => ({ nombre: m.nombre, cantidad: m.cantidad })));
        
    } else if (tipoResultado === 'TIPO2') {
        materialesFiltrados = [
            { codigo: 'POSTES_2500', nombre: 'TOTAL POSTES 2500mm', cantidad: getCantidad('POSTES_2500') },
            { codigo: 'LARGUERO_950', nombre: 'TOTAL LARGUERO 950mm', cantidad: getCantidad('LARGUERO_950') },
            { codigo: 'LARGUERO_1940_ANTEPECHO', nombre: 'TOTAL LARGUERO ANTEPECHO 1940mm', cantidad: getCantidad('LARGUERO_1940_ANTEPECHO') },
            { codigo: 'MAMPARA_964X2390', nombre: 'TOTAL MAMPARA 964x2390mm', cantidad: getCantidad('MAMPARA_964X2390') },
            { codigo: 'MAMPARA_ANTEPECHO_CURVO_2174X255', nombre: 'TOTAL PANEL ANTEPECHO 1054x255mm', cantidad: getCantidad('MAMPARA_ANTEPECHO_CURVO_2174X255') }
        ];
        agregarSeccion(contenedor, 'TOTALES STAND TIPO 2 (ANTEPECHO RECTO)', materialesFiltrados.map(m => ({ nombre: m.nombre, cantidad: m.cantidad })));
    }
    
    // RETORNAR los materiales filtrados
    return materialesFiltrados;
}