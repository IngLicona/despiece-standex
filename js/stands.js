// Funcion para cargar las medidas directamente en el select
function cargarMedidas() {
    // Obtener el select
    const select = document.getElementById('medidaSelect');
    
    // Limpiar el select
    select.innerHTML = '<option value="">Seleccione una medida...</option>';
    
    // Verificar que medidasDisponibles exista
    if (typeof window.medidasDisponibles === 'undefined') {
        console.error('medidasDisponibles no esta definido');
        return;
    }
    
    // Agregar cada medida desde el array local
    window.medidasDisponibles.forEach(function(medida) {
        const option = document.createElement('option');
        option.value = medida.id;
        option.textContent = medida.descripcion;
        select.appendChild(option);
    });
}

// Funcion para cargar tipos de resultado segun la medida
function cargarTiposResultado() {
    const medidaId = document.getElementById('medidaSelect').value;
    const tipoSelect = document.getElementById('tipoResultadoSelect');
    
    // Limpiar el select
    tipoSelect.innerHTML = '<option value="">Seleccione un tipo...</option>';
    
    if (!medidaId) {
        tipoSelect.disabled = true;
        tipoSelect.innerHTML = '<option value="">Primero seleccione una medida...</option>';
        return;
    }
    
    let tipos = [];
    
    // Definir tipos segun la medida
    if (medidaId === '1') { // 2x2x2.5
        tipos = [
            { valor: 'TIPO1', nombre: 'STAND TIPO 1 (ANTEPECHO CURVO)' },
            { valor: 'TIPO2', nombre: 'STAND TIPO 2 (ANTEPECHO RECTO)' }
        ];
    } else if (medidaId === '2') { // 3x2x2.5
        tipos = [
            { valor: 'TIPO3', nombre: 'STAND TIPO 3 (ANTEPECHO RECTO)' },
            { valor: 'TIPO4', nombre: 'STAND TIPO 4 (ANTEPECHO RECTO DE PANEL ART CON GANCHOS)' }
        ];
    } else if (medidaId === '3') { // 3x2.5x2.5
        tipos = [
            { valor: 'TIPO1', nombre: 'STAND TIPO 1 (ANTEPECHO CURVO LATERAL)' },
            { valor: 'TIPO2', nombre: 'STAND TIPO 2 (ANTEPECHO CURVO AL CENTRO)' },
            { valor: 'TIPO3', nombre: 'STAND TIPO 3 (ANTEPECHO RECTO)' },
            { valor: 'TIPO4', nombre: 'STAND TIPO 4 (ANTEPECHO RECTO DE PANEL ART CON GANCHOS)' }
        ];
    } else if (medidaId === '4') { // 3x3x2.5
        tipos = [
            { valor: 'TIPO1', nombre: 'STAND TIPO 1 (ANTEPECHO CURVO LATERAL)' },
            { valor: 'TIPO2', nombre: 'STAND TIPO 2 (ANTEPECHO CURVO AL CENTRO)' },
            { valor: 'TIPO3', nombre: 'STAND TIPO 3 (ANTEPECHO RECTO)' },
            { valor: 'TIPO4', nombre: 'STAND TIPO 4 (ANTEPECHO RECTO DE PANEL ART CON GANCHOS)' }
        ];
    }
    
    // Agregar opciones al select
    tipos.forEach(tipo => {
        const option = document.createElement('option');
        option.value = tipo.valor;
        option.textContent = tipo.nombre;
        tipoSelect.appendChild(option);
    });
    
    tipoSelect.disabled = false;
}

// Funcion para validar que el numero sea mayor a cero
function validarNumero(input) {
    const valor = input.value;
    const mensajeError = document.getElementById('numError');
    
    // Si el numero es menor o igual a cero, mostrar error
    if (valor <= 0 || isNaN(valor)) {
        mensajeError.style.display = 'block';
        input.value = '';
    } else {
        mensajeError.style.display = 'none';
    }
}

// Funcion para guardar los datos cuando se presiona el boton
function guardarDatos() {
    const medidaId = document.getElementById('medidaSelect').value;
    const tipoResultado = document.getElementById('tipoResultadoSelect').value;
    const numStands = document.getElementById('numStands').value;
    
    // Verificar que todos los campos tengan valor
    if (!medidaId || !tipoResultado || !numStands) {
        alert('Por favor completa todos los campos');
        return;
    }
    
    // Obtener la descripcion de la medida seleccionada
    const medidaSeleccionada = window.medidasDisponibles.find(m => m.id === medidaId);
    const medidaDescripcion = medidaSeleccionada ? medidaSeleccionada.descripcion : 'No especificada';
    
    // Obtener el tipo de modulo actual del modal
    const tipoModulo = document.getElementById('modalContent').getAttribute('data-modulo');
    
    // Calcular materiales con la medida seleccionada
    const resultado = calcularMaterialesPorModulo(tipoModulo, parseInt(numStands), medidaId);
    
    // Mostrar resultados
    if (resultado.error) {
        alert(resultado.mensaje);
        return;
    }
    
    // Mostrar los resultados en consola
    const modalInfo = bootstrap.Modal.getInstance(document.getElementById('infoModal'));
    modalInfo.hide();
    mostrarResultados(resultado, medidaDescripcion, tipoModulo, tipoResultado);
}

function mostrarResultados(resultado, medidaDescripcion, tipoModulo, tipoResultado) {
    document.getElementById('resultModulo').textContent = resultado.modulo;
    document.getElementById('resultCantidad').textContent = resultado.cantidad;
    document.getElementById('resultMedida').textContent = medidaDescripcion;

    const contenedor = document.getElementById('contenedorResultados');
    contenedor.innerHTML = '';
    
    const medidaId = document.getElementById('medidaSelect').value;
    
    // Seleccionar la funcion de visualizacion segun la medida
    if (medidaId === '1' && typeof mostrarResultados2x2x2_5 === 'function') {
        mostrarResultados2x2x2_5(contenedor, resultado, tipoResultado);
    } else if (medidaId === '2' && typeof mostrarResultados3x2x2_5 === 'function') {
        mostrarResultados3x2x2_5(contenedor, resultado, tipoResultado);
    } else if (medidaId === '3' && typeof mostrarResultados3x2_5x2_5 === 'function') {
        mostrarResultados3x2_5x2_5(contenedor, resultado, tipoModulo, tipoResultado);
    } else if (medidaId === '4' && typeof mostrarResultados3x3x2_5 === 'function') {
        mostrarResultados3x3x2_5(contenedor, resultado, tipoResultado);
    } else {
        mostrarTablaGenerica(contenedor, resultado);
    }
    
    const modalResultados = new bootstrap.Modal(document.getElementById('resultadosModal'));
    modalResultados.show();
}

function mostrarTablaGenerica(contenedor, resultado) {
    const seccion = document.createElement('div');
    seccion.className = 'seccion-resultado mb-4';
    
    const tituloDiv = document.createElement('h6');
    tituloDiv.className = 'titulo-seccion mb-3';
    tituloDiv.textContent = 'MATERIALES TOTALES';
    seccion.appendChild(tituloDiv);
    
    const tabla = document.createElement('table');
    tabla.className = 'table table-sm table-bordered';
    
    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>Componente</th>
            <th class="text-end">Cantidad</th>
        </tr>
    `;
    tabla.appendChild(thead);
    
    const tbody = document.createElement('tbody');
    resultado.componentes.forEach(function(comp) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${comp.nombre}</td>
            <td class="text-end"><strong>${comp.cantidadTotal}</strong></td>
        `;
        tbody.appendChild(tr);
    });
    
    tabla.appendChild(tbody);
    seccion.appendChild(tabla);
    contenedor.appendChild(seccion);
    
    // Agregar seccion de factor de proteccion
    const seccionFactor = document.createElement('div');
    seccionFactor.className = 'seccion-resultado mb-4';
    
    const tituloFactor = document.createElement('h6');
    tituloFactor.className = 'titulo-seccion mb-3';
    tituloFactor.textContent = 'FACTOR DE PROTECCION (+10)';
    seccionFactor.appendChild(tituloFactor);
    
    const tablaFactor = document.createElement('table');
    tablaFactor.className = 'table table-sm table-bordered';
    
    const tbodyFactor = document.createElement('tbody');
    resultado.componentes.forEach(function(comp) {
        const totalConFactor = comp.cantidadTotal + 10;
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${comp.nombre}</td>
            <td class="text-end"><strong>${totalConFactor}</strong></td>
        `;
        tbodyFactor.appendChild(tr);
    });
    
    tablaFactor.appendChild(tbodyFactor);
    seccionFactor.appendChild(tablaFactor);
    contenedor.appendChild(seccionFactor);
}

function obtenerCantidad(componentes, codigoComponente) {
    const comp = componentes.find(c => c.codigo === codigoComponente);
    return comp ? comp.cantidadTotal : 0;
}

function agregarSeccion(contenedor, titulo, items) {
    const seccion = document.createElement('div');
    seccion.className = 'seccion-resultado mb-4';
    
    const tituloDiv = document.createElement('h6');
    tituloDiv.className = 'titulo-seccion mb-3';
    tituloDiv.textContent = titulo;
    seccion.appendChild(tituloDiv);
    
    const tabla = document.createElement('table');
    tabla.className = 'table table-sm table-bordered';
    
    const tbody = document.createElement('tbody');
    items.forEach(function(item) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.nombre}</td>
            <td class="text-end"><strong>${item.cantidad}</strong></td>
        `;
        tbody.appendChild(tr);
    });
    
    tabla.appendChild(tbody);
    seccion.appendChild(tabla);
    contenedor.appendChild(seccion);
}

// Funcion para imprimir resultados
function imprimirResultados() {
    // Obtener el contenido del modal
    const contenidoModal = document.querySelector('#resultadosModal .modal-body').cloneNode(true);
    const modulo = document.getElementById('resultModulo').textContent;
    const cantidad = document.getElementById('resultCantidad').textContent;
    const medida = document.getElementById('resultMedida').textContent;
    
    // Crear ventana de impresion
    const ventanaImpresion = window.open('', '_blank', 'width=900,height=700');
    
    // Escribir el HTML completo
    ventanaImpresion.document.write(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Despiece de Materiales - Standex</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
            <link rel="stylesheet" href="css/print.css">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                    position: relative;
                }
                
                .print-header {
                    text-align: center;
                    margin-bottom: 30px;
                    padding: 20px;
                    border-bottom: 3px solid #333;
                    position: relative;
                }
                
                .print-header img {
                    width: 100%;
                    max-width: 100%;
                    height: auto;
                    margin-bottom: 15px;
                }
                
                .print-header h1 {
                    margin: 10px 0;
                    color: #333;
                    font-size: 24px;
                    font-weight: bold;
                }
                
                .print-header p {
                    margin: 5px 0;
                    color: #666;
                    font-size: 14px;
                }
                
                .resultado-info {
                    background: #f8f9fa;
                    border: 2px solid #333;
                    padding: 15px;
                    margin-bottom: 25px;
                    border-radius: 5px;
                }
                
                .resultado-info p {
                    margin: 8px 0;
                    font-size: 14px;
                }
                
                .resultado-info strong {
                    color: #333;
                    font-weight: bold;
                }
                
                .seccion-resultado {
                    margin-bottom: 25px;
                    page-break-inside: avoid;
                }
                
                .titulo-seccion {
                    background: #333;
                    color: white;
                    padding: 10px;
                    margin-bottom: 10px;
                    font-weight: bold;
                    font-size: 14px;
                }
                
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 20px;
                }
                
                table thead {
                    background: #555;
                    color: white;
                }
                
                table th,
                table td {
                    border: 1px solid #333;
                    padding: 8px;
                    text-align: left;
                }
                
                table td:last-child {
                    text-align: right;
                    font-weight: bold;
                }
                
                .print-footer {
                    margin-top: 40px;
                    text-align: center;
                    padding-top: 20px;
                    border-top: 3px solid #333;
                    position: relative;
                }
                
                .print-footer img {
                    width: 100%;
                    max-width: 100%;
                    height: auto;
                    margin-bottom: 10px;
                }
                
                .print-footer p {
                    margin: 5px 0;
                    font-size: 12px;
                    color: #666;
                }
                
                @media print {
                    @page {
                        size: A4;
                        margin: 2cm 1.5cm;
                    }
                    
                    body {
                        padding: 0;
                        margin: 0;
                    }
                    
                    .print-header {
                        position: running(header);
                        margin-bottom: 20px;
                    }
                    
                    .print-footer {
                        position: running(footer);
                        margin-top: 20px;
                    }
                    
                    .print-header img,
                    .print-footer img {
                        width: 100%;
                        max-width: 100%;
                    }
                    
                    .watermark-header {
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        width: 100%;
                        z-index: -1;
                    }
                    
                    .watermark-header img {
                        width: 100%;
                        height: auto;
                        opacity: 0.95;
                    }
                    
                    .watermark-footer {
                        position: fixed;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        width: 100%;
                        z-index: -1;
                    }
                    
                    .watermark-footer img {
                        width: 100%;
                        height: auto;
                        opacity: 0.95;
                    }
                    
                    .content-wrapper {
                        position: relative;
                        z-index: 1;
                        padding-top: 120px;
                        padding-bottom: 100px;
                    }
                }
            </style>
        </head>
        <body>
            <!-- Marcas de agua fijas en todas las paginas -->
            <div class="watermark-header">
                <img src="assets/img/up.png" alt="Standex Header">
            </div>
            
            <div class="watermark-footer">
                <img src="assets/img/down.png" alt="Standex Footer">
            </div>
            
            <!-- Contenido principal -->
            <div class="content-wrapper">
                <!-- Encabezado con informacion -->
                <div class="print-header" style="border: none; padding-top: 0;">
                    <h1>DESPIECE DE MATERIALES PARA STANDS</h1>
                    <p><strong>Fecha:</strong> ${new Date().toLocaleDateString('es-MX', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric',
                        weekday: 'long'
                    })}</p>
                    <p><strong>Hora:</strong> ${new Date().toLocaleTimeString('es-MX')}</p>
                </div>
                
                <!-- Contenido del despiece -->
                ${contenidoModal.innerHTML}
            </div>
        </body>
        </html>
    `);
    
    ventanaImpresion.document.close();
    
    // Esperar a que carguen las imagenes antes de imprimir
    ventanaImpresion.onload = function() {
        setTimeout(function() {
            ventanaImpresion.print();
        }, 500);
    };
}


// Funcion para guardar datos de registro
function guardarDatosRegistro() {
    const tipoRegistro = document.getElementById('tipoRegistroSelect').value;
    const numRegistros = document.getElementById('numRegistros').value;
    
    if (!tipoRegistro || !numRegistros) {
        alert('Por favor completa todos los campos');
        return;
    }
    
    // Calcular materiales para el registro
    const resultado = calcularMaterialesRegistro(tipoRegistro, parseInt(numRegistros));
    
    if (resultado.error) {
        alert(resultado.mensaje);
        return;
    }
    
    // Cerrar modal de registro
    const modalRegistro = bootstrap.Modal.getInstance(document.getElementById('registroModal'));
    modalRegistro.hide();
    
    // Mostrar resultados
    document.getElementById('resultModulo').textContent = resultado.modulo;
    document.getElementById('resultCantidad').textContent = resultado.cantidad;
    document.getElementById('resultMedida').textContent = '1.00 x 0.50 x 2.50 M';
    
    const contenedor = document.getElementById('contenedorResultados');
    contenedor.innerHTML = '';
    
    mostrarResultadosRegistro(contenedor, resultado);
    
    const modalResultados = new bootstrap.Modal(document.getElementById('resultadosModal'));
    modalResultados.show();
}

// Funcion para calcular materiales de registro
function calcularMaterialesRegistro(tipoRegistro, cantidad) {
    if (!registro[tipoRegistro]) {
        return { error: true, mensaje: 'Tipo de registro no encontrado' };
    }
    
    const registroData = registro[tipoRegistro];
    const resultado = {
        modulo: registroData.nombre,
        cantidad: cantidad,
        componentes: []
    };
    
    for (let componenteKey in registroData.componentes) {
        const cantidadBase = registroData.componentes[componenteKey];
        const cantidadTotal = cantidadBase * cantidad;
        
        resultado.componentes.push({
            codigo: componenteKey,
            cantidadTotal: cantidadTotal
        });
    }
    
    return resultado;
}

// Hacer que todas las celdas sean clickeables
document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', function() {
        const standType = this.textContent;
        
        // Si es REGISTRO, mostrar modal diferente
        if (standType === 'REGISTRO') {
            document.getElementById('tipoRegistroSelect').value = '';
            document.getElementById('numRegistros').value = '';
            document.getElementById('numRegistroError').style.display = 'none';
            
            const modal = new bootstrap.Modal(document.getElementById('registroModal'));
            modal.show();
            return;
        }
        
        // Para otros stands, mostrar modal normal
        let description = '';
        switch(standType) {
            case 'SC':
                description = 'Stand en Cajon - SC';
                break;
            case 'SE':
                description = 'Stand en Esquina - SE';
                break;
            case 'ST':
                description = 'Stands en Tren - ST';
                break;
            case 'VTL':
                description = 'Vuelta Tren en L - VTL';
                break;
            case 'VTU':
                description = 'Vuelta Tren en U - VTU';
                break;
            case 'VTI':
                description = 'Tren en Vuelta - VTI';
                break;
            case 'FT':
                description = 'Final de Tren - FT';
                break;
            case 'EI':
                description = 'Esquina de Isla - EI';
                break;
            case 'II':
                description = 'Intermedio de Isla - II';
                break;
            case 'IT':
                description = 'Intermedio de Tren - IT';
                break;
            case 'VIT':
                description = 'Vuelta Intermedio de Tren - VIT';
                break;
            case 'CTIU':
                description = 'Cabecera de Tren A en U - CTIU';
                break;
            case 'CTIL':
                description = 'Cabecera de Tren A en L - CTIL';
                break;
            default:
                description = 'Información no disponible';
        }
        
        const modalContent = document.getElementById('modalContent');
        modalContent.textContent = description;
        modalContent.setAttribute('data-modulo', standType);
        
        cargarMedidas();
        
        document.getElementById('numStands').value = '';
        document.getElementById('numError').style.display = 'none';
        
        const modal = new bootstrap.Modal(document.getElementById('infoModal'));
        modal.show();
    });
});

// Agregar el evento para validar el número de stands
document.getElementById('numStands').addEventListener('input', function() {
    validarNumero(this);
});

// Agregar el evento para validar el número de registros
document.getElementById('numRegistros').addEventListener('input', function() {
    const valor = this.value;
    const mensajeError = document.getElementById('numRegistroError');
    
    if (valor <= 0 || isNaN(valor)) {
        mensajeError.style.display = 'block';
        this.value = '';
    } else {
        mensajeError.style.display = 'none';
    }
});