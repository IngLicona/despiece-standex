<?php
session_start();

// Si no hay sesion activa, redirigir al login
if (!isset($_SESSION['usuario_id'])) {
    header('Location: index.html');
    exit();
}
?>