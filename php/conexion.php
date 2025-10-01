<?php
// Datos de conexión a la base de datos
$servidor = "localhost";    // El servidor, casi siempre es localhost
$usuario = "root";         // Usuario de MySQL (por defecto en XAMPP es root)
$password = "";            // Contraseña (por defecto en XAMPP está vacía)
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

// Si todo está bien, no necesitas hacer nada más
// Ya puedes usar $conexion en otros archivos
?>

<?php
// Al final de conexion.php
if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
} else {
    echo "Conexión exitosa"; // Solo para pruebas, después lo quitamos
}