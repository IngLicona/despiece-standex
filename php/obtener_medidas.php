<?php
// Decirle al navegador que vamos a enviar JSON
header('Content-Type: application/json; charset=utf-8');

// Incluir el archivo de conexion que esta en la misma carpeta
require_once 'conexion.php';

// Hacer la consulta a la base de datos
$query = "SELECT cve_medidas_estandares, codigo_medida FROM medidas_estandar ORDER BY codigo_medida";
$resultado = $conexion->query($query);

// Crear un array vacio para guardar las medidas
$medidas = array();

// Si la consulta funciono y hay resultados
if ($resultado && $resultado->num_rows > 0) {
    // Recorrer cada fila de resultados
    while($fila = $resultado->fetch_assoc()) {
        // Agregar cada medida al array
        $medidas[] = array(
            'id' => $fila['cve_medidas_estandares'],
            'descripcion' => $fila['codigo_medida']
        );
    }
}

// Convertir el array a JSON y enviarlo
echo json_encode($medidas);
?>