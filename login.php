<?php
// 1. Conectamos con la base de datos
require_once 'php/conexion.php';

// 2. Obtenemos el usuario y contraseña del formulario
$usuario = $_POST['username'];
$password = $_POST['password'];

// 3. Buscamos el usuario en la base de datos
$consulta = "SELECT * FROM usuarios WHERE username = '$usuario'";
$resultado = $conexion->query($consulta);

// 4. Si encontramos el usuario
if ($resultado->num_rows > 0) {
    // Obtenemos los datos del usuario
    $datos = $resultado->fetch_assoc();
    
    // 5. Revisamos qué tipo de contraseña es
    if (strlen($datos['password']) > 20) {
        // Si la contraseña es larga, está encriptada
        // Usamos password_verify para comparar
        if (password_verify($password, $datos['password'])) {
            header("Location: stands.html");
            exit();
        }
    } else {
        // Si la contraseña es corta, está en texto plano
        // Comparamos directamente
        if ($password == $datos['password']) {
            header("Location: stands.html");
            exit();
        }
    }
}

// Si algo falló, regresamos al login
header("Location: login.html");
exit();
?>
