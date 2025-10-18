<?php
session_start();

require_once 'php/conexion.php';

$usuario = $_POST['username'];
$password = $_POST['password'];

$consulta = "SELECT * FROM usuarios WHERE username = '$usuario'";
$resultado = $conexion->query($consulta);

if ($resultado->num_rows > 0) {
    $datos = $resultado->fetch_assoc();
    
    if (strlen($datos['password']) > 20) {
        if (password_verify($password, $datos['password'])) {
            $_SESSION['usuario_id'] = $datos['cve_usuarios'];
            $_SESSION['usuario_nombre'] = $datos['nombre'];
            $_SESSION['usuario_email'] = $datos['email'];
            
            header("Location: stands.php");
            exit();
        }
    } else {
        if ($password == $datos['password']) {
            $_SESSION['usuario_id'] = $datos['cve_usuarios'];
            $_SESSION['usuario_nombre'] = $datos['nombre'];
            $_SESSION['usuario_email'] = $datos['email'];

            header("Location: stands.php");
            exit();
        }
    }
}

header("Location: index.html");
exit();
?>
