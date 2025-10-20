const registro = {
    'CR': {
        nombre : 'Cabecera de Registro',
        componentes : {
            'POSTES_2500': 2,
            'POSTE_950': 2,
            'LARGUERO_950': 6,
            'LARGUERO_455': 4,
            'PANEL_FRENTES_964X864': 1,
            'PANEL_LADOS_469X864': 2,
            'PANEL_ANTEPCHO_464X215': 1,
            'CUBIERTAS_PANEL_ART_970_X_470': 1,
            'GANCHOS_PARA_CUBIERTA': 4,
            'CUBIERTAS(ENTEPAÑOS)PANEL_ART_970_X_470': 1,
            'Z300_PARA_ENTREPAÑO': 4,
            'LARGUERO_CURVOZ441': 0,
            'PANEL_CURVO1073X864': 0,
            'ANTEPECHO_CURVO1073X214': 0,
            'CUBIERTAS_CURVAS_PANEL_ART_970X470_CON_Z441': 0
        }
    },
    'RT': {
        nombre : 'Registro en Tren',
        componentes : {
            'POSTES_2500': 1,
            'POSTE_950': 1,
            'LARGUERO_950': 6,
            'LARGUERO_455': 2,
            'PANEL_FRENTES_964X864': 1,
            'PANEL_LADOS_469X864': 1,
            'PANEL_ANTEPCHO_464X215': 1,
            'CUBIERTAS_PANEL_ART_970_X_470': 1,
            'GANCHOS_PARA_CUBIERTA': 4,
            'CUBIERTAS(ENTEPAÑOS)PANEL_ART_970_X_470': 1,
            'Z300_PARA_ENTREPAÑO': 4,
            'LARGUERO_CURVOZ441': 0,
            'PANEL_CURVO1073X864': 0,
            'ANTEPECHO_CURVO1073X214': 0,
            'CUBIERTAS_CURVAS_PANEL_ART_970X470_CON_Z441': 0
        }
    },

    'VT': {
        nombre : 'Vuelta De Tren',
        componentes : {
            'POSTES_2500': 1,
            'POSTE_950': 2,
            'LARGUERO_950': 6,
            'LARGUERO_455': 4,
            'PANEL_FRENTES_964X864': 1,
            'PANEL_LADOS_469X864': 2,
            'PANEL_ANTEPCHO_464X215': 1,
            'CUBIERTAS_PANEL_ART_970_X_470': 1,
            'GANCHOS_PARA_CUBIERTA': 4,
            'CUBIERTAS(ENTEPAÑOS)PANEL_ART_970_X_470': 1,
            'Z300_PARA_ENTREPAÑO': 4,
            'LARGUERO_CURVOZ441': 0,
            'PANEL_CURVO1073X864': 0,
            'ANTEPECHO_CURVO1073X214': 0,
            'CUBIERTAS_CURVAS_PANEL_ART_970X470_CON_Z441': 0
        }
    },

    'CRC': {
        nombre : 'Cabera Registro Curvo',
        componentes : {
            'POSTES_2500': 2,
            'POSTE_950': 2,
            'LARGUERO_950': 2,
            'LARGUERO_455': 4,
            'PANEL_FRENTES_964X864': 0,
            'PANEL_LADOS_469X864': 2,
            'PANEL_ANTEPCHO_464X215': 0,
            'CUBIERTAS_PANEL_ART_970_X_470': 0,
            'GANCHOS_PARA_CUBIERTA': 4,
            'CUBIERTAS(ENTEPAÑOS)PANEL_ART_970_X_470': 1,
            'Z300_PARA_ENTREPAÑO': 4,
            'LARGUERO_CURVOZ441': 4,
            'PANEL_CURVO1073X864': 1,
            'ANTEPECHO_CURVO1073X214': 1,
            'CUBIERTAS_CURVAS_PANEL_ART_970X470_CON_Z441': 1
        }
    },

    'RTC': {
        nombre : 'Registro en Tren Curvo',
        componentes : {
            'POSTES_2500': 1,
            'POSTE_950': 1,
            'LARGUERO_950': 2,
            'LARGUERO_455': 2,
            'PANEL_FRENTES_964X864': 0,
            'PANEL_LADOS_469X864': 1,
            'PANEL_ANTEPCHO_464X215': 0,
            'CUBIERTAS_PANEL_ART_970_X_470': 0,
            'GANCHOS_PARA_CUBIERTA': 4,
            'CUBIERTAS(ENTEPAÑOS)PANEL_ART_970_X_470': 1,
            'Z300_PARA_ENTREPAÑO': 4,
            'LARGUERO_CURVOZ441': 4,
            'PANEL_CURVO1073X864': 1,
            'ANTEPECHO_CURVO1073X214': 1,
            'CUBIERTAS_CURVAS_PANEL_ART_970X470_CON_Z441': 1
        }
    }
};

function mostrarResultadosRegistro(contenedor, resultado) {
    const componentes=resultado.componentes;

    function getCantidad(codigo){
        const comp = componentes.find(c => c.codigo === codigo);
        return comp ? comp.cantidadTotal : 0;
    }

    //Seccion 1: Totales Registros sin Entrepaño
    agregarSeccion(contenedor, 'TOTALES REGISTROS SIN ENTREPAÑO', [
        { nombre: 'POSTES 2500mm', cantidad: getCantidad('POSTES_2500') },
        { nombre: 'POSTES 950mm', cantidad: getCantidad('POSTE_950') },
        { nombre: 'LARGUERO 950mm', cantidad: getCantidad('LARGUERO_950') },
        { nombre: 'LARGUERO 455mm', cantidad: getCantidad('LARGUERO_455') },
        { nombre: 'PANEL FRENTE 964x864mm', cantidad: getCantidad('PANEL_FRENTES_964X864') },
        { nombre: 'PANEL LADO 469x864mm', cantidad: getCantidad('PANEL_LADOS_469X864') },
        { nombre: 'PANEL ANTEPECHO 464x215mm', cantidad: getCantidad('PANEL_ANTEPCHO_464X215') },
        { nombre: 'CUBIERTA PANEL ART 970x470mm', cantidad: getCantidad('CUBIERTAS_PANEL_ART_970_X_470') },
        { nombre: 'GANCHOS PARA CUBIERTA', cantidad: getCantidad('GANCHOS_PARA_CUBIERTA') }
    ]);

    //Seccion 2: Factor de Proteccion Registros sin Entrepaño
    agregarSeccion(contenedor, 'FACTOR DE PROTECCION DE REGISTROS SIN ENTREPAÑO', [
        { nombre: 'POSTES 2500mm', cantidad: getCantidad('POSTES_2500') + 10 },
        { nombre: 'POSTES 950mm', cantidad: getCantidad('POSTE_950') + 10 },
        { nombre: 'LARGUERO 950mm', cantidad: getCantidad('LARGUERO_950') + 10 },
        { nombre: 'LARGUERO 455mm', cantidad: getCantidad('LARGUERO_455') + 10 },
        { nombre: 'PANEL FRENTE 964x864mm', cantidad: getCantidad('PANEL_FRENTES_964X864') + 10 },
        { nombre: 'PANEL LADO 469x864mm', cantidad: getCantidad('PANEL_LADOS_469X864') + 10 },
        { nombre: 'PANEL ANTEPECHO 464x215mm', cantidad: getCantidad('PANEL_ANTEPCHO_464X215') + 10 },
        { nombre: 'CUBIERTA PANEL ART 970x470mm', cantidad: getCantidad('CUBIERTAS_PANEL_ART_970_X_470') + 10 },
        { nombre: 'GANCHOS PARA CUBIERTA', cantidad: getCantidad('GANCHOS_PARA_CUBIERTA') + 10 }
    ]);

    //Seccion 3: Totales Registros con Entrepaño
    agregarSeccion(contenedor, 'TOTALES REGISTROS CON ENTREPAÑO', [
        { nombre: 'POSTES 2500mm', cantidad: getCantidad('POSTES_2500') },
        { nombre: 'POSTES 950mm', cantidad: getCantidad('POSTE_950') },
        { nombre: 'LARGUERO 950mm', cantidad: getCantidad('LARGUERO_950') },
        { nombre: 'LARGUERO 455mm', cantidad: getCantidad('LARGUERO_455') },
        { nombre: 'PANEL FRENTE 964x864mm', cantidad: getCantidad('PANEL_FRENTES_964X864') },
        { nombre: 'PANEL LADO 469x864mm', cantidad: getCantidad('PANEL_LADOS_469X864') },
        { nombre: 'PANEL ANTEPECHO 464x215mm', cantidad: getCantidad('PANEL_ANTEPCHO_464X215') },
        { nombre: 'CUBIERTA PANEL ART 970x470mm', cantidad: getCantidad('CUBIERTAS_PANEL_ART_970_X_470') },
        { nombre: 'GANCHOS PARA CUBIERTA', cantidad: getCantidad('GANCHOS_PARA_CUBIERTA') },
        { nombre: 'CUBIERTAS (ENTREPAÑOS) PANEL ART 970x470mm)', cantidad: getCantidad('CUBIERTAS(ENTEPAÑOS)PANEL_ART_970_X_470') },
        { nombre: 'Z300 PARA ENTREPAÑO', cantidad: getCantidad('Z300_PARA_ENTREPAÑO') }
    ]);

    //Seccion 4: Factor de Proteccion Registros con Entrepaño
    agregarSeccion(contenedor, 'FACTOR DE PROTECCION REGISTROS CON ENTREPAÑO', [
        { nombre: 'POSTES 2500mm', cantidad: getCantidad('POSTES_2500') + 10 },
        { nombre: 'POSTES 950mm', cantidad: getCantidad('POSTE_950') + 10 },
        { nombre: 'LARGUERO 950mm', cantidad: getCantidad('LARGUERO_950') + 10 },
        { nombre: 'LARGUERO 455mm', cantidad: getCantidad('LARGUERO_455') + 10 },
        { nombre: 'PANEL FRENTE 964x864mm', cantidad: getCantidad('PANEL_FRENTES_964X864') + 10 },
        { nombre: 'PANEL LADO 469x864mm', cantidad: getCantidad('PANEL_LADOS_469X864') + 10 },
        { nombre: 'PANEL ANTEPECHO 464x215mm', cantidad: getCantidad('PANEL_ANTEPCHO_464X215') + 10 },
        { nombre: 'CUBIERTA PANEL ART 970x470mm', cantidad: getCantidad('CUBIERTAS_PANEL_ART_970_X_470') + 10 },
        { nombre: 'GANCHOS PARA CUBIERTA', cantidad: getCantidad('GANCHOS_PARA_CUBIERTA') + 10 },
        { nombre: 'CUBIERTAS (ENTREPAÑOS) PANEL ART 970x470mm)', cantidad: getCantidad('CUBIERTAS(ENTEPAÑOS)PANEL_ART_970_X_470') + 10 },
        { nombre: 'Z300 PARA ENTREPAÑO', cantidad: getCantidad('Z300_PARA_ENTREPAÑO') + 10 }
    ]);

    //Seccion 5: TOTALES REGISTRO ESQUINAS CURVAS SIN ENTREPAÑO
    agregarSeccion(contenedor, 'TOTALES REGISTRO ESQUINAS CURVAS SIN ENTREPAÑO', [
        { nombre: 'POSTES 2500mm', cantidad: getCantidad('POSTES_2500') },
        { nombre: 'POSTES 950mm', cantidad: getCantidad('POSTE_950') },
        { nombre: 'LARGUERO 950mm', cantidad: getCantidad('LARGUERO_950') },
        { nombre: 'LARGUERO 455mm', cantidad: getCantidad('LARGUERO_455') },
        { nombre: 'PANEL FRENTE 964x864mm', cantidad: getCantidad('PANEL_FRENTES_964X864') },
        { nombre: 'PANEL LADO 469x864mm', cantidad: getCantidad('PANEL_LADOS_469X864') },
        { nombre: 'PANEL ANTEPECHO 464x215mm', cantidad: getCantidad('PANEL_ANTEPCHO_464X215') },
        { nombre: 'CUBIERTA PANEL ART 970x470mm', cantidad: getCantidad('CUBIERTAS_PANEL_ART_970_X_470') },
        { nombre: 'GANCHOS PARA CUBIERTA', cantidad: getCantidad('GANCHOS_PARA_CUBIERTA') },
        { nombre: 'LARGUERO CURVO Z441mm', cantidad: getCantidad('LARGUERO_CURVOZ441') },
        { nombre: 'PANEL CURVO 1073x864mm', cantidad: getCantidad('PANEL_CURVO1073X864') },
        { nombre: 'ANTEPECHO CURVO 1073x214mm', cantidad: getCantidad('ANTEPECHO_CURVO1073X214') },
        { nombre: 'CUBIERTAS CURVAS PANEL ART 970x470mm CON Z441', cantidad: getCantidad('CUBIERTAS_CURVAS_PANEL_ART_970X470_CON_Z441') }
    ]);

    //Seccion 6: Factor de Proteccion Registro Esquinas Curvas sin Entrepaño
    agregarSeccion(contenedor, 'FACTOR DE PROTECCION REGISTRO ESQUINAS CURVAS SIN ENTREPAÑO', [
        { nombre: 'POSTES 2500mm', cantidad: getCantidad('POSTES_2500') + 10 },
        { nombre: 'POSTES 950mm', cantidad: getCantidad('POSTE_950') + 10 },
        { nombre: 'LARGUERO 950mm', cantidad: getCantidad('LARGUERO_950') + 10 },
        { nombre: 'LARGUERO 455mm', cantidad: getCantidad('LARGUERO_455') + 10 },
        { nombre: 'PANEL FRENTE 964x864mm', cantidad: getCantidad('PANEL_FRENTES_964X864') + 10 },
        { nombre: 'PANEL LADO 469x864mm', cantidad: getCantidad('PANEL_LADOS_469X864') + 10 },
        { nombre: 'PANEL ANTEPECHO 464x215mm', cantidad: getCantidad('PANEL_ANTEPCHO_464X215') + 10 },
        { nombre: 'CUBIERTA PANEL ART 970x470mm', cantidad: getCantidad('CUBIERTAS_PANEL_ART_970_X_470') + 10 },
        { nombre: 'GANCHOS PARA CUBIERTA', cantidad: getCantidad('GANCHOS_PARA_CUBIERTA') + 10 },
        { nombre: 'LARGUERO CURVO Z441mm', cantidad: getCantidad('LARGUERO_CURVOZ441') + 10 },
        { nombre: 'PANEL CURVO 1073x864mm', cantidad: getCantidad('PANEL_CURVO1073X864') + 10 },
        { nombre: 'ANTEPECHO CURVO 1073x214mm', cantidad: getCantidad('ANTEPECHO_CURVO1073X214') + 10 },
        { nombre: 'CUBIERTAS CURVAS PANEL ART 970x470mm CON Z441', cantidad: getCantidad('CUBIERTAS_CURVAS_PANEL_ART_970X470_CON_Z441') + 10 }
    ]);
}