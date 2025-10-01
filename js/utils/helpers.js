/**
 * Funciones utilitarias para el sistema
 */

// Validación de formularios
export function validateForm(formData, rules) {
    const errors = {};
    
    for (const [field, value] of formData.entries()) {
        if (rules[field]) {
            if (rules[field].required && !value) {
                errors[field] = 'Este campo es requerido';
            }
            if (rules[field].min && value < rules[field].min) {
                errors[field] = `El valor mínimo es ${rules[field].min}`;
            }
            if (rules[field].max && value > rules[field].max) {
                errors[field] = `El valor máximo es ${rules[field].max}`;
            }
        }
    }
    
    return errors;
}

// Formateo de números
export function formatNumber(number, decimals = 2) {
    return number.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Manejo de errores
export function handleError(error) {
    console.error('Error:', error);
    // Aquí puedes agregar lógica para mostrar errores al usuario
}

// Función para cargar datos de manera asíncrona
export async function fetchData(url, options = {}) {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        handleError(error);
        return null;
    }
}