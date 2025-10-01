<?php
// Mostrar errores (esto nos ayuda a ver si algo falla)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Incluir conexión
require_once '../php/conexion.php';

// Verificar si la conexión fue exitosa
if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

try {
    // Consultar las medidas estándares
    $query = "SELECT * FROM medidas_estandar"; // Asegúrate que este es el nombre correcto de tu tabla
    $resultado = $conexion->query($query);

    // Array para guardar las medidas
    $medidas = array();

    // Si hay resultados
    if ($resultado) {
        while($fila = $resultado->fetch_assoc()) {
            // Guardamos solo los datos que necesitamos
            $medidas[] = array(
                'id' => $fila['cve_medidas_estandares'],
                'descripcion' => $fila['codigo_medida']
            );
        }
        
        // Configurar el header y devolver JSON
        header('Content-Type: application/json');
        echo json_encode($medidas);
    } else {
        echo "Error en la consulta: " . $conexion->error;
    }
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>