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
    const numStands = document.getElementById('numStands').value;
    
    // Verificar que ambos campos tengan valor
    if (!medidaId || !numStands) {
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
    mostrarResultados(resultado, medidaDescripcion);
}

function mostrarResultados(resultado, medidaDescripcion) {
    document.getElementById('resultModulo').textContent = resultado.modulo;
    document.getElementById('resultCantidad').textContent = resultado.cantidad;
    document.getElementById('resultMedida').textContent = medidaDescripcion;

    const contenedor = document.getElementById('contenedorResultados');
    contenedor.innerHTML = '';
    
    // Verificar si existe funcion especifica para esta medida
    const medidaId = document.getElementById('medidaSelect').value;
    
    if (medidaId === '4' && typeof mostrarResultados3x3x2_5 === 'function') {
        // Usar funcion especifica para 3x3x2.5
        mostrarResultados3x3x2_5(contenedor, resultado);
    } else {
        // Mostrar tabla simple generica para otras medidas
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

// Función para imprimir resultados
function imprimirResultados() {
    window.print();
}


// Hacer que todas las celdas sean clickeables
document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', function() {
        // Obtener el texto de la celda
        const standType = this.textContent;
        
        // Obtener la descripción según el tipo de stand
        let description = '';
        switch(standType) {
            case 'CTU':
                description = 'Cabecera de Tren en U - CTU';
                break;
            case 'CTL':
                description = 'Cabecera de Tren en L - CTL';
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
            case 'REGISTRO':
                description = 'Stand de Registros - REGISTROS';
                break;
            default:
                description = 'Información no disponible';
        }
        
        // Actualizar el contenido del modal
        const modalContent = document.getElementById('modalContent');
        modalContent.textContent = description;
        modalContent.setAttribute('data-modulo', standType);
        
        // Cargar las medidas cuando se abre el modal
        cargarMedidas();
        
        // Limpiar el input de número
        document.getElementById('numStands').value = '';
        document.getElementById('numError').style.display = 'none';
        
        // Mostrar el modal
        const modal = new bootstrap.Modal(document.getElementById('infoModal'));
        modal.show();
    });
});

// Agregar el evento para validar el número de stands
document.getElementById('numStands').addEventListener('input', function() {
    validarNumero(this);
});