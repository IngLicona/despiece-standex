<?php
// Incluir el archivo de conexión
require_once 'conexion.php';

// Función simple para limpiar datos
function limpiar_datos($datos) {
    global $conexion;
    $datos = trim($datos); // Quita espacios al inicio y final
    $datos = stripslashes($datos); // Quita slashes
    $datos = htmlspecialchars($datos); // Convierte caracteres especiales en entidades HTML
    $datos = $conexion->real_escape_string($datos); // Escapa caracteres especiales
    return $datos;
}

// Función para verificar si el usuario está logueado
function esta_logueado() {
    session_start();
    if (isset($_SESSION['usuario'])) {
        return true;
    }
    return false;
}

// Función para redireccionar
function ir_a($pagina) {
    header("Location: $pagina");
    exit;
}

// Función para mostrar mensajes de error
function mostrar_error($mensaje) {
    return "<div class='error'>$mensaje</div>";
}

// Función para mostrar mensajes de éxito
function mostrar_exito($mensaje) {
    return "<div class='exito'>$mensaje</div>";
}
?>