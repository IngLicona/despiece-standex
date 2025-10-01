<?php
$servidor = "localhost";    // Nombre del servior de la base de datos
$usuario = "root";         // usuario de MySQL 
$password = "";            // Contraseña
$basedatos = "despiece_aluminio"; // El nombre de tu base de datos

try {
    // Crear conexión
    $conexion = new mysqli($servidor, $usuario, $password, $basedatos);

    // Verificar conexión
    if ($conexion->connect_error) {
        die("Error de conexión: " . $conexion->connect_error);
    }

    // Establecer el conjunto de caracteres
    $conexion->set_charset("utf8");

} catch (Exception $e) {
    die("Error: " . $e->getMessage());
}

?>