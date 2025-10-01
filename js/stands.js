// Función para cargar las medidas desde la base de datos
function cargarMedidas() {
    // Mostramos en consola que estamos intentando cargar
    console.log('Intentando cargar medidas...');
    
    // Hacer la petición al PHP
    fetch('php/obtener_medidas.php')
        .then(function(response) {
            // Mostrar la respuesta completa para debug
            console.log('Respuesta recibida:', response);
            
            // Convertir la respuesta a texto primero para ver qué recibimos
            return response.text();
        })
        .then(function(text) {
            // Mostrar el texto recibido
            console.log('Texto recibido:', text);
            
            try {
                // Intentar convertir el texto a JSON
                const medidas = JSON.parse(text);
                console.log('Medidas parseadas:', medidas);
                
                // Obtener el select
                const select = document.getElementById('medidaSelect');
                
                // Limpiar opciones existentes
                select.innerHTML = '<option value="">Seleccione una medida...</option>';
                
                // Agregar cada medida como una opción
                medidas.forEach(function(medida) {
                    const option = document.createElement('option');
                    option.value = medida.id;
                    option.textContent = medida.descripcion;
                    select.appendChild(option);
                });
            } catch (error) {
                console.error('Error al procesar JSON:', error);
            }
        })
        .catch(function(error) {
            console.error('Error al cargar medidas:', error);
        });
}

// Función para validar el número de stands
function validarNumero(input) {
    // Obtener el valor del input
    const valor = input.value;
    const mensajeError = document.getElementById('numError');
    
    // Verificar si es un número positivo
    if (valor <= 0 || isNaN(valor)) {
        mensajeError.style.display = 'block';
        input.value = ''; // Limpiar el input
    } else {
        mensajeError.style.display = 'none';
    }
}

// Función para guardar los datos
function guardarDatos() {
    const medida = document.getElementById('medidaSelect').value;
    const numStands = document.getElementById('numStands').value;
    
    if (!medida || !numStands) {
        alert('Por favor completa todos los campos');
        return;
    }
    
    // Aquí puedes agregar el código para guardar los datos
    console.log('Medida seleccionada:', medida);
    console.log('Número de stands:', numStands);
    
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
                description = 'Cabecera de Tren en U - Pieza especial que forma la cabecera en forma de U';
                break;
            case 'CTL':
                description = 'Cabecera de Tren en L - Pieza especial que forma la cabecera en forma de L';
                break;
            case 'ST':
                description = 'Stands en Tren - Pieza estándar que forma parte del tren de stands';
                break;
            case 'VTL':
                description = 'Vuelta Tren en L - Pieza especial para hacer giros en L';
                break;
            case 'VTU':
                description = 'Vuelta Tren en U - Pieza especial para hacer giros en U';
                break;
            case 'VTI':
                description = 'Tren en Vuelta - Pieza de transición para giros';
                break;
            case 'FT':
                description = 'Final de Tren - Pieza que marca el final de un tren de stands';
                break;
            case 'EI':
                description = 'Esquina de Isla - Pieza especial para las esquinas de islas';
                break;
            case 'II':
                description = 'Intermedio de Isla - Pieza estándar para las islas';
                break;
            case 'IT':
                description = 'Intermedio de Tren - Pieza de conexión entre stands';
                break;
            case 'VIT':
                description = 'Vuelta Intermedio de Tren - Pieza de transición para giros intermedios';
                break;
            case 'CTIU':
                description = 'Cabecera de Tren A en U - Variante especial de cabecera en U';
                break;
            case 'CTIL':
                description = 'Cabecera de Tren A en L - Variante especial de cabecera en L';
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