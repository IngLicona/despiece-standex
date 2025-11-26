let calculosGuardados = [];

function abrirCalculadora() {
    mostrarCalculos();
    const modal = new bootstrap.Modal(document.getElementById('calculadoraModal'));
    modal.show();
}

function mostrarCalculos() {
    const contenedor = document.getElementById('listaCalculos');
    if (!contenedor) return;

    // Limpiar contenedor
    contenedor.innerHTML = '';

    // Si no hay cálculos guardados
    if (calculosGuardados.length === 0) {
        contenedor.innerHTML = `
            <div class="alert alert-info d-flex align-items-center" role="alert">
                <i class="fas fa-info-circle me-3 fs-4"></i>
                <div>
                    <strong>No hay cálculos guardados</strong>
                    <p class="mb-0 mt-1">Realiza un cálculo de despiece y agrégalo usando el botón "Agregar a Calculadora"</p>
                </div>
            </div>
        `;
        return;
    }

    // Mostrar cada cálculo guardado
    calculosGuardados.forEach((calculo, index) => {
        const card = document.createElement('div');
        card.className = 'card mb-3 shadow-sm';
        
        card.innerHTML = `
            <div class="card-header bg-light d-flex justify-content-between align-items-center">
                <span class="badge bg-primary">Cálculo #${index + 1}</span>
                <div>
                    <button class="btn btn-info btn-sm me-1" onclick="verDetalleCalculo(${index})" title="Ver detalle">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-warning btn-sm me-1" onclick="editarCalculo(${index})" title="Editar este cálculo">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarCalculo(${index})" title="Eliminar este cálculo">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="card-body">
                <h6 class="card-title text-primary mb-3">
                    <i class="fas fa-cube me-2"></i>
                    ${calculo.nombreModulo}
                </h6>
                <div class="row">
                    <div class="col-md-4">
                        <p class="mb-1">
                            <i class="fas fa-ruler-combined me-1 text-secondary"></i>
                            <strong>Medida:</strong>
                        </p>
                        <span class="text-muted">${calculo.medida}</span>
                    </div>
                    <div class="col-md-4">
                        <p class="mb-1">
                            <i class="fas fa-tag me-1 text-secondary"></i>
                            <strong>Tipo:</strong>
                        </p>
                        <span class="text-muted">${calculo.tipoResultado}</span>
                    </div>
                    <div class="col-md-4">
                        <p class="mb-1">
                            <i class="fas fa-hashtag me-1 text-secondary"></i>
                            <strong>Cantidad:</strong>
                        </p>
                        <span class="badge bg-success fs-6">${calculo.cantidad} stands</span>
                    </div>
                </div>
                
                <!-- Mostrar algunos componentes como preview -->
                <div class="mt-3">
                    <p class="mb-2 text-muted small">
                        <i class="fas fa-box me-1"></i>
                        ${calculo.componentes.length} componentes diferentes
                    </p>
                </div>
            </div>
        `;
        
        contenedor.appendChild(card);
    });
}

function verDetalleCalculo(index) {
    const calculo = calculosGuardados[index];
    
    if (!calculo) {
        mostrarAlerta('Cálculo no encontrado', 'error');
        return;
    }
    
    // Llenar la información del modal de resultados
    document.getElementById('resultModulo').textContent = calculo.nombreModulo;
    document.getElementById('resultCantidad').textContent = calculo.cantidad;
    document.getElementById('resultMedida').textContent = calculo.medida;
    
    // Generar el HTML de los componentes en formato simple (como en la imagen)
    const contenedor = document.getElementById('contenedorResultados');
    let html = '';
    
    // Agregar título del tipo
    html += `<h6 class="mb-3">Totales Stand ${calculo.tipoResultado.toLowerCase().replace('tipo', 'tipo ')}</h6>`;
    
    // Crear tabla simple sin códigos
    html += '<table class="table table-borderless">';
    
    calculo.componentes.forEach((comp) => {
        html += `<tr>
            <td style="width: 80%;">${comp.nombre}</td>
            <td style="width: 20%; text-align: right;"><strong>${comp.cantidad}</strong></td>
        </tr>`;
    });
    
    html += '</table>';
    contenedor.innerHTML = html;
    
    // Ocultar el botón de agregar a calculadora ya que ya está agregado
    document.getElementById('btnAgregarCalculadora').style.display = 'none';
    
    // Cerrar el modal de calculadora
    const modalCalculadora = bootstrap.Modal.getInstance(document.getElementById('calculadoraModal'));
    if (modalCalculadora) {
        modalCalculadora.hide();
    }
    
    // Mostrar el modal de resultados
    const resultadosModal = bootstrap.Modal.getInstance(document.getElementById('resultadosModal')) || 
                           new bootstrap.Modal(document.getElementById('resultadosModal'));
    resultadosModal.show();
}

function eliminarCalculo(index) {
    mostrarConfirmacion('¿Desea eliminar este cálculo?', function() {
        calculosGuardados.splice(index, 1);
        localStorage.setItem("calculosStands", JSON.stringify(calculosGuardados));
        mostrarCalculos();
        actualizarContador();
    });
}

function agregarACalculadora() {
    // Verificar que existe un cálculo para agregar
    if (!window.ultimoCalculo) {
        mostrarAlerta('No hay ningún cálculo para agregar', 'warning');
        return;
    }
    
    // Verificar que NO sea un registro (validación de seguridad)
    if (window.ultimoCalculo.esRegistro === true) {
        mostrarAlerta('Los registros no se pueden agregar a la calculadora', 'warning');
        return;
    }
    
    // Verificar que existan materiales filtrados
    if (!window.ultimoCalculo.materialesFiltrados || window.ultimoCalculo.materialesFiltrados.length === 0) {
        mostrarAlerta('No hay materiales para agregar', 'warning');
        return;
    }
    
    // Crear un ID único para este cálculo
    const idCalculo = Date.now();
    
    // Crear el objeto del cálculo usando los materiales ya filtrados
    const nuevoCalculo = {
        id: idCalculo,
        tipoModulo: window.ultimoCalculo.tipoModulo,
        nombreModulo: window.ultimoCalculo.resultado.modulo,
        medida: window.ultimoCalculo.medidaDescripcion,
        medidaId: window.ultimoCalculo.medidaId,
        tipoResultado: window.ultimoCalculo.tipoResultado,
        cantidad: window.ultimoCalculo.resultado.cantidad,
        componentes: window.ultimoCalculo.materialesFiltrados // Usar directamente los materiales filtrados
    };
    
    // Agregar a la lista de cálculos
    calculosGuardados.push(nuevoCalculo);
    
    // Guardar en localStorage
    localStorage.setItem('calculosStands', JSON.stringify(calculosGuardados));
    
    // Actualizar el contador
    actualizarContador();
    
    // Mostrar mensaje de éxito
    mostrarAlerta('¡Cálculo agregado exitosamente!', 'success');
    
    // Cerrar el modal de resultados
    const modalResultados = bootstrap.Modal.getInstance(document.getElementById('resultadosModal'));
    if (modalResultados) {
        modalResultados.hide();
    }
}

function actualizarContador() {
    const contador = document.getElementById('contadorCalculadora');

    if (contador) {
        const totalCalculos = calculosGuardados.length;
        contador.textContent = totalCalculos;

        if (totalCalculos > 0) {
            contador.style.display = 'inline-block';
        } else {
            contador.style.display = 'none';
        }
    }
}

function cargarCalculosGuardados() {
    const guardados = localStorage.getItem("calculosStands");
    if (guardados) {
        calculosGuardados = JSON.parse(guardados);
        actualizarContador();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    cargarCalculosGuardados();
});

function calcularTotalConsolidado() {
    if (calculosGuardados.length === 0) {
        mostrarAlerta('No hay cálculos guardados para consolidar', 'warning');
        return;
    }

    const materialesConsolidados = {};

     // Recorrer cada cálculo guardado
    calculosGuardados.forEach(function(calculo) {
        
        // Recorrer cada material del cálculo
        calculo.componentes.forEach(function(componente) {
            
            const codigo = componente.codigo;
            const cantidad = componente.cantidad;
            const nombre = componente.nombre;
            
            
            if (materialesConsolidados[codigo]) {
                // SÍ existe: SUMAR la cantidad
                materialesConsolidados[codigo].cantidad += cantidad;
            } else {
                // NO existe: AGREGARLO por primera vez
                materialesConsolidados[codigo] = {
                    codigo: codigo,
                    nombre: nombre,
                    cantidad: cantidad
                };
            }
        });
    });

    const arrayConsolidado = Object.values(materialesConsolidados);

    mostrarResumenTotal(arrayConsolidado);
}

function mostrarResumenTotal(materiales) {
    const contenedor = document.getElementById('contenedorResumenTotal');
    contenedor.innerHTML = '';
    
    // Crear la tabla
    const tabla = document.createElement('table');
    tabla.className = 'table table-striped table-hover mb-0';
    
    // Crear encabezado
    const thead = document.createElement('thead');
    thead.className = 'table-dark';
    thead.innerHTML = `
        <tr>
            <th width="10%" class="text-center">#</th>
            <th width="60%">Componente</th>
            <th width="30%" class="text-end">Cantidad Total</th>
        </tr>
    `;
    tabla.appendChild(thead);
    
    // Crear cuerpo
    const tbody = document.createElement('tbody');
    let totalPiezas = 0;
    
    materiales.forEach(function(material, index) {
        totalPiezas += material.cantidad;
        
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="text-center fw-bold">${index + 1}</td>
            <td>${material.nombre}</td>
            <td class="text-end">
                <span class="badge bg-primary fs-6">${material.cantidad}</span>
            </td>
        `;
        tbody.appendChild(tr);
    });
    
    // Fila de total
    const trTotal = document.createElement('tr');
    trTotal.className = 'table-secondary fw-bold';
    trTotal.innerHTML = `
        <td colspan="2" class="text-end">
            <i class="fas fa-calculator me-2"></i>
            TOTAL DE PIEZAS:
        </td>
        <td class="text-end">
            <span class="badge bg-success fs-5">${totalPiezas}</span>
        </td>
    `;
    tbody.appendChild(trTotal);
    
    tabla.appendChild(tbody);
    contenedor.appendChild(tabla);
    
    // Actualizar estadísticas
    document.getElementById('totalCalculos').textContent = calculosGuardados.length;
    document.getElementById('totalStandsResumen').textContent = calculosGuardados.reduce((sum, c) => sum + c.cantidad, 0);
    document.getElementById('totalComponentes').textContent = materiales.length;
    
    // Cerrar modal de calculadora y abrir modal de resumen
    const modalCalculadora = bootstrap.Modal.getInstance(document.getElementById('calculadoraModal'));
    if (modalCalculadora) {
        modalCalculadora.hide();
    }
    
    const modalResumen = new bootstrap.Modal(document.getElementById('resumenTotalModal'));
    modalResumen.show();
}

function limpiarTodo() {
    if (calculosGuardados.length === 0) {
        mostrarAlerta('No hay cálculos para limpiar', 'warning');
        return;
    }
    
    mostrarConfirmacion('¿Está seguro de que desea eliminar TODOS los cálculos guardados? Esta acción no se puede deshacer.', function() {
        calculosGuardados = [];
        localStorage.setItem('calculosStands', JSON.stringify(calculosGuardados));
        mostrarCalculos();
        actualizarContador();
        mostrarAlerta('Todos los cálculos han sido eliminados', 'success');
    });
}

function editarCalculo(index) {
    const calculo = calculosGuardados[index];
    if (!calculo) {
        mostrarAlerta('Cálculo no encontrado', 'error');
        return;
    }
    
    // Guardar el índice del cálculo que se está editando
    window.calculoEditandoIndex = index;
    
    // Cargar los datos en el modal de edición
    document.getElementById('editNombreModulo').textContent = calculo.nombreModulo;
    document.getElementById('editMedidaSelect').value = calculo.medidaId;
    document.getElementById('editNumStands').value = calculo.cantidad;
    
    // Cargar tipos de resultado según la medida
    cargarTiposResultadoEdicion(calculo.medidaId, calculo.tipoResultado);
    
    // Abrir el modal de edición
    const modalEdicion = new bootstrap.Modal(document.getElementById('editarCalculoModal'));
    modalEdicion.show();
}

function cargarTiposResultadoEdicion(medidaId, tipoActual) {
    const tipoSelect = document.getElementById('editTipoResultadoSelect');
    tipoSelect.innerHTML = '<option value="">Seleccione un tipo...</option>';
    
    if (!medidaId) {
        tipoSelect.disabled = true;
        return;
    }
    
    let tipos = [];
    
    if (medidaId === '1') {
        tipos = [
            { valor: 'TIPO1', nombre: 'STAND TIPO 1 (ANTEPECHO CURVO)' },
            { valor: 'TIPO2', nombre: 'STAND TIPO 2 (ANTEPECHO RECTO)' }
        ];
    } else if (medidaId === '2') {
        tipos = [
            { valor: 'TIPO3', nombre: 'STAND TIPO 3 (ANTEPECHO RECTO)' },
            { valor: 'TIPO4', nombre: 'STAND TIPO 4 (ANTEPECHO RECTO DE PANEL ART CON GANCHOS)' }
        ];
    } else if (medidaId === '3') {
        tipos = [
            { valor: 'TIPO1', nombre: 'STAND TIPO 1 (ANTEPECHO CURVO LATERAL)' },
            { valor: 'TIPO2', nombre: 'STAND TIPO 2 (ANTEPECHO CURVO AL CENTRO)' },
            { valor: 'TIPO3', nombre: 'STAND TIPO 3 (ANTEPECHO RECTO)' },
            { valor: 'TIPO4', nombre: 'STAND TIPO 4 (ANTEPECHO RECTO DE PANEL ART CON GANCHOS)' }
        ];
    } else if (medidaId === '4') {
        tipos = [
            { valor: 'TIPO1', nombre: 'STAND TIPO 1 (ANTEPECHO CURVO LATERAL)' },
            { valor: 'TIPO2', nombre: 'STAND TIPO 2 (ANTEPECHO CURVO AL CENTRO)' },
            { valor: 'TIPO3', nombre: 'STAND TIPO 3 (ANTEPECHO RECTO)' },
            { valor: 'TIPO4', nombre: 'STAND TIPO 4 (ANTEPECHO RECTO DE PANEL ART CON GANCHOS)' }
        ];
    }
    
    tipos.forEach(tipo => {
        const option = document.createElement('option');
        option.value = tipo.valor;
        option.textContent = tipo.nombre;
        if (tipo.valor === tipoActual) {
            option.selected = true;
        }
        tipoSelect.appendChild(option);
    });
    
    tipoSelect.disabled = false;
}

function guardarEdicionCalculo() {
    const index = window.calculoEditandoIndex;
    if (index === undefined || index === null) {
        mostrarAlerta('Error: No se puede guardar la edición', 'error');
        return;
    }
    
    const calculo = calculosGuardados[index];
    const nuevaCantidad = parseInt(document.getElementById('editNumStands').value);
    const nuevoTipo = document.getElementById('editTipoResultadoSelect').value;
    
    if (!nuevaCantidad || nuevaCantidad <= 0) {
        mostrarAlerta('Por favor ingrese una cantidad válida mayor a 0', 'warning');
        return;
    }
    
    if (!nuevoTipo) {
        mostrarAlerta('Por favor seleccione un tipo de resultado', 'warning');
        return;
    }
    
    // Si cambió el tipo de resultado, necesitamos recalcular los materiales
    if (nuevoTipo !== calculo.tipoResultado) {
        // Recalcular materiales con el nuevo tipo
        const resultado = calcularMaterialesPorModulo(calculo.tipoModulo, nuevaCantidad, calculo.medidaId);
        
        if (resultado.error) {
            mostrarAlerta(resultado.mensaje, 'error');
            return;
        }
        
        // Obtener materiales filtrados según el nuevo tipo
        let materialesFiltrados = [];
        const contenedorTemp = document.createElement('div');
        
        if (calculo.medidaId === '1' && typeof mostrarResultados2x2x2_5 === 'function') {
            materialesFiltrados = mostrarResultados2x2x2_5(contenedorTemp, resultado, nuevoTipo);
        } else if (calculo.medidaId === '2' && typeof mostrarResultados3x2x2_5 === 'function') {
            materialesFiltrados = mostrarResultados3x2x2_5(contenedorTemp, resultado, nuevoTipo);
        } else if (calculo.medidaId === '3' && typeof mostrarResultados3x2_5x2_5 === 'function') {
            materialesFiltrados = mostrarResultados3x2_5x2_5(contenedorTemp, resultado, calculo.tipoModulo, nuevoTipo);
        } else if (calculo.medidaId === '4' && typeof mostrarResultados3x3x2_5 === 'function') {
            materialesFiltrados = mostrarResultados3x3x2_5(contenedorTemp, resultado, nuevoTipo);
        }
        
        // Actualizar el cálculo con los nuevos valores
        calculosGuardados[index].cantidad = nuevaCantidad;
        calculosGuardados[index].tipoResultado = nuevoTipo;
        calculosGuardados[index].componentes = materialesFiltrados;
    } else {
        // Solo cambió la cantidad, recalcular proporcionalmente
        const factorCambio = nuevaCantidad / calculo.cantidad;
        calculosGuardados[index].cantidad = nuevaCantidad;
        calculosGuardados[index].componentes = calculo.componentes.map(comp => ({
            ...comp,
            cantidad: comp.cantidad * factorCambio
        }));
    }
    
    // Guardar en localStorage
    localStorage.setItem('calculosStands', JSON.stringify(calculosGuardados));
    
    // Actualizar la vista
    mostrarCalculos();
    
    // Cerrar el modal
    const modalEdicion = bootstrap.Modal.getInstance(document.getElementById('editarCalculoModal'));
    if (modalEdicion) {
        modalEdicion.hide();
    }
    
    mostrarAlerta('¡Cálculo actualizado exitosamente!', 'success');
    
    // Limpiar el índice de edición
    delete window.calculoEditandoIndex;
}

function imprimirResumenTotal() {
    // Obtener los datos del resumen
    const totalCalculos = document.getElementById('totalCalculos').textContent;
    const totalStands = document.getElementById('totalStandsResumen').textContent;
    const totalComponentes = document.getElementById('totalComponentes').textContent;
    
    // Obtener el contenido de la tabla consolidada
    const contenidoTabla = document.querySelector('#contenedorResumenTotal').cloneNode(true);
    
    // Generar HTML con la información de cada cálculo
    let htmlCalculos = '';
    calculosGuardados.forEach((calculo, index) => {
        htmlCalculos += `
            <div class="resultado-info">
                <p><strong>Modulo:</strong> ${calculo.nombreModulo}</p>
                <p><strong>Cantidad:</strong> ${calculo.cantidad}</p>
                <p><strong>Medida:</strong> ${calculo.medida}</p>
            </div>
        `;
    });
    
    // Crear ventana de impresión
    const ventanaImpresion = window.open('', '_blank', 'width=900,height=700');
    
    // Escribir el HTML completo
    ventanaImpresion.document.write(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Resumen Total de Materiales - Standex</title>
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
                    background: white;
                    border: 2px solid #333;
                    padding: 15px;
                    margin-bottom: 20px;
                    border-radius: 5px;
                    page-break-inside: avoid;
                }
                
                .resultado-info p {
                    margin: 8px 0;
                    font-size: 14px;
                }
                
                .resultado-info strong {
                    color: #333;
                    font-weight: bold;
                }
                
                .estadisticas {
                    display: flex;
                    justify-content: space-around;
                    margin: 20px 0;
                    padding: 15px;
                    background: white;
                    border: 2px solid #333;
                    border-radius: 5px;
                    page-break-inside: avoid;
                }
                
                .estadistica-item {
                    text-align: center;
                    flex: 1;
                }
                
                .estadistica-item h3 {
                    margin: 5px 0;
                    font-size: 14px;
                    color: #666;
                }
                
                .estadistica-item p {
                    margin: 5px 0;
                    font-size: 28px;
                    font-weight: bold;
                    color: #333;
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
                    background: #555 !important;
                    color: white !important;
                }
                
                table th,
                table td {
                    border: 1px solid #333;
                    padding: 8px;
                    text-align: left;
                }
                
                table th {
                    font-weight: bold;
                    font-size: 11pt;
                }
                
                table td {
                    font-size: 10pt;
                }
                
                table td:last-child {
                    text-align: right;
                    font-weight: bold;
                }
                
                .table-striped tbody tr:nth-of-type(odd) {
                    background-color: #f8f9fa;
                }
                
                .badge {
                    display: inline-block;
                    padding: 4px 8px;
                    background: #0d6efd;
                    color: white;
                    border-radius: 4px;
                    font-weight: bold;
                }
                
                .table-secondary {
                    background-color: #e9ecef !important;
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
                    <h1>RESUMEN TOTAL DE MATERIALES</h1>
                    <p><strong>Fecha:</strong> ${new Date().toLocaleDateString('es-MX', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric',
                        weekday: 'long'
                    })}</p>
                    <p><strong>Hora:</strong> ${new Date().toLocaleTimeString('es-MX')}</p>
                </div>
                
                <!-- Información de cada cálculo -->
                ${htmlCalculos}
                
                <!-- Estadísticas -->
                <div class="estadisticas">
                    <div class="estadistica-item">
                        <h3>Total de Cálculos</h3>
                        <p>${totalCalculos}</p>
                    </div>
                    <div class="estadistica-item">
                        <h3>Total de Stands</h3>
                        <p>${totalStands}</p>
                    </div>
                    <div class="estadistica-item">
                        <h3>Componentes Únicos</h3>
                        <p>${totalComponentes}</p>
                    </div>
                </div>
                
                <!-- Contenido del resumen consolidado -->
                <div>
                    ${contenidoTabla.innerHTML}
                </div>
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

function exportarAExcel() {
    if (calculosGuardados.length === 0) {
        mostrarAlerta('No hay cálculos para exportar', 'warning');
        return;
    }
    
    // Calcular materiales consolidados
    const materialesConsolidados = {};
    
    calculosGuardados.forEach(function(calculo) {
        calculo.componentes.forEach(function(componente) {
            const codigo = componente.codigo;
            const cantidad = componente.cantidad;
            const nombre = componente.nombre;
            
            if (materialesConsolidados[codigo]) {
                materialesConsolidados[codigo].cantidad += cantidad;
            } else {
                materialesConsolidados[codigo] = {
                    codigo: codigo,
                    nombre: nombre,
                    cantidad: cantidad
                };
            }
        });
    });
    
    const arrayConsolidado = Object.values(materialesConsolidados);
    
    // Crear contenido CSV
    let csv = '\uFEFF'; // BOM para UTF-8
    csv += 'RESUMEN TOTAL DE MATERIALES\n\n';
    
    // Estadísticas
    const totalCalculos = calculosGuardados.length;
    const totalStands = calculosGuardados.reduce((sum, c) => sum + c.cantidad, 0);
    const totalComponentes = arrayConsolidado.length;
    const totalPiezas = arrayConsolidado.reduce((sum, m) => sum + m.cantidad, 0);
    
    csv += `Total de Cálculos:,${totalCalculos}\n`;
    csv += `Total de Stands:,${totalStands}\n`;
    csv += `Componentes Únicos:,${totalComponentes}\n\n`;
    
    // Encabezados
    csv += '#,Código,Componente,Cantidad Total\n';
    
    // Datos
    arrayConsolidado.forEach((material, index) => {
        csv += `${index + 1},${material.codigo},"${material.nombre}",${material.cantidad}\n`;
    });
    
    // Fila de total
    csv += `,,TOTAL DE PIEZAS:,${totalPiezas}\n`;
    
    // Crear y descargar archivo
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    const fecha = new Date().toISOString().split('T')[0];
    link.setAttribute('href', url);
    link.setAttribute('download', `Resumen_Materiales_${fecha}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    mostrarAlerta('Archivo CSV exportado exitosamente', 'success');
}