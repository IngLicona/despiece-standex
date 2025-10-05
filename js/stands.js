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

    const tbodyComponentes = document.getElementById('resultComponentes');
    tbodyComponentes.innerHTML = ''; 

    resultado.componentes.forEach(function(comp) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${comp.nombre}</td>
            <td class="text-end">${comp.cantidadTotal}</td>
        `;
        tbodyComponentes.appendChild(tr);
    });

    // Calcular totales con factor de protección
    const tbodyTotales = document.getElementById('resultTotalesFinales');
    tbodyTotales.innerHTML = '';
    
    resultado.componentes.forEach(function(comp) {
        const totalConProteccion = comp.cantidadTotal + 10;
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${comp.nombre}</strong></td>
            <td class="text-end"><strong>${totalConProteccion}</strong></td>
        `;
        tbodyTotales.appendChild(tr);
    });
    
    // Mostrar el modal de resultados
    const modalResultados = new bootstrap.Modal(document.getElementById('resultadosModal'));
    modalResultados.show();
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