// SISTEMA UNIVERSAL - FUNCIONA EN TODAS LAS PÁGINAS
console.log("JavaScript universal cargado correctamente!");

// FUNCIONES COMPARTIDAS (para todas las páginas)


// Función universal de animación de entrada
function animarEntrada(elemento, delay = 300) {
    if (elemento) {
        elemento.style.opacity = '0';
        elemento.style.transform = 'translateY(50px)';
        
        setTimeout(function() {
            elemento.style.transition = 'all 1.5s ease';
            elemento.style.opacity = '1';
            elemento.style.transform = 'translateY(0)';
        }, delay);
    }
}

// Función para scroll suave
function scrollSuave(elemento) {
    if (elemento) {
        elemento.scrollIntoView({
            behavior: 'smooth'
        });
    }
}

// CÓDIGO ESPECÍFICO PARA INDEX.HTML
if (document.querySelector('.landing-container')) {
    console.log("Página INDEX.HTML detectada");
    
    // Animación de entrada para landing
    window.addEventListener('load', function() {
        console.log("Iniciando animaciones de index.html...");
        const container = document.querySelector('.landing-container');
        animarEntrada(container, 300);
    });
    
    // Scroll suave para botón info
    const infoLink = document.querySelector('a[href="#info"]');
    if (infoLink) {
        infoLink.addEventListener('click', function(e) {
            e.preventDefault();
            console.log("Click en botón info");
            scrollSuave(document.getElementById('info'));
        });
    }
}

// CÓDIGO ESPECÍFICO PARA STANDS.HTML
else if (document.querySelector('.container')) {
    console.log("Página STANDS.HTML detectada");
    
    // Animación de entrada para container
    window.addEventListener('load', function() {
        console.log("Iniciando animaciones de stands.html...");
        const container = document.querySelector('.container');
        animarEntrada(container, 200);
    });
    
    // Funcionalidad de las celdas
    document.querySelectorAll('.cell').forEach(cell => {
        if (!cell.classList.contains('empty')) {
            // Click en celdas
            cell.addEventListener('click', function() {
                const type = this.textContent;
                const description = getDescripcionStand(type);
                
                console.log("Celda clickeada:", type);
                
                // Remover selección anterior
                document.querySelectorAll('.cell').forEach(c => c.classList.remove('selected'));
                
                // Agregar selección actual
                this.classList.add('selected');
                
                // Mostrar información
                alert(`Elemento: ${type}\nDescripción: ${description}\n\nEn el sistema completo aquí se abriría el modal de cálculo.`);
            });
            
            // Efectos hover
            cell.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.08)';
                this.style.transition = 'transform 0.2s ease';
            });
            
            cell.addEventListener('mouseleave', function() {
                if (!this.classList.contains('selected')) {
                    this.style.transform = 'scale(1)';
                }
            });
        }
    });
    
    // Función específica para stands
    function getDescripcionStand(type) {
        const descriptions = {
            'ST': 'Stand Estándar en Tren',
            'VTU': 'Vuelta de Tren en U',
            'VIT': 'Vuelta Intermedio de Tren',
            'IT': 'Intermedio de Tren',
            'CTL': 'Cabecera de Tren en L',
            'CTU': 'Cabecera de Tren en U',
            'CTIL': 'Cabecera de Tren A en L',
            'CTIU': 'Cabecera de Tren A en U',
            'EI': 'Esquina de Isla',
            'II': 'Intermedio de Isla',
            'VTL': 'Vuelta de Tren en L',
            'VTI': 'Tren en Vuelta',
            'FT': 'Final de Tren'
        };
        return descriptions[type] || 'Descripción no disponible';
    }
}


// CÓDIGO PARA FUTURAS PÁGINAS
else {
    console.log("Página no identificada - aplicando funciones básicas");
    
    // Aplicar animación básica a cualquier contenedor principal
    window.addEventListener('load', function() {
        const mainContainer = document.querySelector('main') || 
                            document.querySelector('.main') || 
                            document.querySelector('#main');
        if (mainContainer) {
            animarEntrada(mainContainer, 250);
        }
    });
}