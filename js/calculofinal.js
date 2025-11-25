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
                <button class="btn btn-danger btn-sm" onclick="eliminarCalculo(${index})" title="Eliminar este cálculo">
                    <i class="fas fa-trash"></i>
                </button>
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

function eliminarCalculo(index) {
    if (confirm('¿Desea eliminar este cálculo?')) {
        calculosGuardados.splice(index, 1);
        localStorage.setItem("calculosStands", JSON.stringify(calculosGuardados));
        mostrarCalculos();
        actualizarContador();
    }
}

function agregarACalculadora() {
    // Verificar que existe un cálculo para agregar
    if (!window.ultimoCalculo) {
        alert('No hay ningún cálculo para agregar');
        return;
    }
    
    // Verificar que NO sea un registro (validación de seguridad)
    if (window.ultimoCalculo.esRegistro === true) {
        alert('Los registros no se pueden agregar a la calculadora');
        return;
    }
    
    // Verificar que existan materiales filtrados
    if (!window.ultimoCalculo.materialesFiltrados || window.ultimoCalculo.materialesFiltrados.length === 0) {
        alert('No hay materiales para agregar');
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
    alert('¡Cálculo agregado exitosamente!');
    
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
        alert('No hay cálculos guardados para consolidar.');
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