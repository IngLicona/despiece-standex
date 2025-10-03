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
    console.log('Calculo de materiales:', resultado);
    console.log('Medida seleccionada:', medidaDescripcion);
    
    // Mostrar alerta con resumen
    let resumen = 'DESPIECE DE MATERIALES\n\n';
    resumen += 'Modulo: ' + resultado.modulo + '\n';
    resumen += 'Cantidad: ' + resultado.cantidad + '\n';
    resumen += 'Medida: ' + medidaDescripcion + '\n\n';
    resumen += 'COMPONENTES:\n';
    
    resultado.componentes.forEach(function(comp) {
        resumen += comp.nombre + ': ' + comp.cantidadTotal + '\n';
    });
    
    alert(resumen);
    
    // Cerrar el modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('infoModal'));
    modal.hide();
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
                description = 'Cabecera de Tren en U - Pieza especial que forma la cabecera en forma de U - CTU';
                break;
            case 'CTL':
                description = 'Cabecera de Tren en L - Pieza especial que forma la cabecera en forma de L - CTL';
                break;
            case 'ST':
                description = 'Stands en Tren - Pieza estándar que forma parte del tren de stands - ST';
                break;
            case 'VTL':
                description = 'Vuelta Tren en L - Pieza especial para hacer giros en L - VTL';
                break;
            case 'VTU':
                description = 'Vuelta Tren en U - Pieza especial para hacer giros en U - VTU';
                break;
            case 'VTI':
                description = 'Tren en Vuelta - Pieza de transición para giros - VTI';
                break;
            case 'FT':
                description = 'Final de Tren - Pieza que marca el final de un tren de stands - FT';
                break;
            case 'EI':
                description = 'Esquina de Isla - Pieza especial para las esquinas de islas - EI';
                break;
            case 'II':
                description = 'Intermedio de Isla - Pieza estándar para las islas - II';
                break;
            case 'IT':
                description = 'Intermedio de Tren - Pieza de conexión entre stands - IT';
                break;
            case 'VIT':
                description = 'Vuelta Intermedio de Tren - Pieza de transición para giros intermedios - VIT';
                break;
            case 'CTIU':
                description = 'Cabecera de Tren A en U - Variante especial de cabecera en U - CTIU';
                break;
            case 'CTIL':
                description = 'Cabecera de Tren A en L - Variante especial de cabecera en L - CTIL';
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