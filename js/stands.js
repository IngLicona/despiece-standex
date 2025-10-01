// Funcion para cargar las medidas desde la base de datos
function cargarMedidas() {
    // Hacer peticion al servidor para obtener las medidas
    fetch('/standex-despiece/php/obtener_medidas.php')
        .then(function(response) {
            // Convertir la respuesta a JSON
            return response.json();
        })
        .then(function(medidas) {
            // Buscar el elemento select en el HTML
            const select = document.getElementById('medidaSelect');
            
            // Limpiar el select
            select.innerHTML = '<option value="">Seleccione una medida...</option>';
            
            // Agregar cada medida como una opcion en el select
            medidas.forEach(function(medida) {
                const option = document.createElement('option');
                option.value = medida.id;
                option.textContent = medida.descripcion;
                select.appendChild(option);
            });
        })
        .catch(function(error) {
            console.error('Error al cargar medidas:', error);
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
    const medida = document.getElementById('medidaSelect').value;
    const numStands = document.getElementById('numStands').value;
    
    // Verificar que ambos campos tengan valor
    if (!medida || !numStands) {
        alert('Por favor completa todos los campos');
        return;
    }
    
    // Aqui puedes enviar los datos al servidor
    console.log('Medida seleccionada:', medida);
    console.log('Numero de stands:', numStands);
    
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
            default:
                description = 'Información no disponible';
        }
        
        // Actualizar el contenido del modal
        document.getElementById('modalContent').textContent = description;
        
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