<?php
require_once 'php/verificar_sesion.php';
?>


<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simbología Despiece Stands - Standex</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <!-- Tus CSS -->
    <link rel="stylesheet" href="css/style_stand.css">
    <link rel="stylesheet" href="css/modal.css">
    <link rel="stylesheet" href="css/print.css">
</head>
    
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <div class="title-section">
                SIMBOLOGÍA DESPIECE STANDS
            </div>
            
            <div class="logout-section">
                <span class="user-name">
                    <i class="fas fa-user me-2"></i>
                    <?php echo htmlspecialchars($_SESSION['usuario_nombre']); ?>
                </span>
                <button class="btn btn-logout" onclick="cerrarSesion()">
                    <i class="fas fa-sign-out-alt me-2"></i>
                    Cerrar Sesión
                </button>
            </div>
        </div>

        <!-- Main Content -->
        <div class="main-content">
            <div class="map-grid">
                <!-- Fila 1 -->
                <div class="cell vtu pos-1-1">VTU</div>
                <div class="cell st pos-2-1">ST</div>
                <div class="cell st pos-3-1">ST</div>
                <div class="cell it pos-4-1">IT</div>
                <div class="cell it pos-5-1">IT</div>
                <div class="cell st pos-6-1">ST</div>
                <div class="cell st pos-7-1">ST</div>
                <div class="cell registros pos-10-1">REGISTRO</div>

                <!-- Fila 2 -->
                <div class="cell st pos-1-2">ST</div>
                <div class="cell vit pos-7-2">VIT</div>

                <!-- Fila 3 -->
                <div class="cell ctl pos-1-3">CTL</div>
                <div class="cell it pos-8-3">IT</div>

                <!-- Isla central -->
                <div class="cell ei" style="grid-column: 4; grid-row: 3;">EI</div>
                <div class="cell ii" style="grid-column: 5; grid-row: 3;">II</div>
                <div class="cell ii" style="grid-column: 6; grid-row: 3;">II</div>
                <div class="cell ei" style="grid-column: 7; grid-row: 3;">EI</div>
                
                <div class="cell ei" style="grid-column: 4; grid-row: 4;">EI</div>
                <div class="cell ii" style="grid-column: 5; grid-row: 4;">II</div>
                <div class="cell ii" style="grid-column: 6; grid-row: 4;">II</div>
                <div class="cell ei" style="grid-column: 7; grid-row: 4;">EI</div>

                <!-- Fila 4 derecha -->
                <div class="cell vti pos-8-4">VTI</div>
                <div class="cell ft pos-9-4">FT</div>

                <!-- Fila 5 -->
                <div class="cell ctu pos-1-5">CTU</div>

                <!-- Fila 6 -->
                <div class="cell st pos-1-6">ST</div>

                <!-- Fila 7 -->
                <div class="cell vtl pos-1-7">VTL</div>
                <div class="cell ctil pos-3-7">CTIL</div>
                <div class="cell it pos-4-7">IT</div>
                <div class="cell st pos-5-7">ST</div>
                <div class="cell ctiu pos-7-7">CTIU</div>
                <div class="cell it pos-8-7">IT</div>
                <div class="cell st pos-9-7">ST</div>
            </div>

            <!-- Leyenda -->
            <div class="legend">
                <div class="legend-item" style="background: #3f51b5;">CABECERA DE TREN EN U (CTU)</div>
                <div class="legend-item" style="background: #f44336;">CABECERA DE TREN EN L (CTL)</div>
                <div class="legend-item" style="background: #4caf50;">STANDS EN TREN (ST)</div>
                <div class="legend-item" style="background: #ff9800;">VUELTA TREN EN L (VTL)</div>
                <div class="legend-item" style="background: #ffeb3b; color: #333;">VUELTA TREN EN U (VTU)</div>
                <div class="legend-item" style="background: #9c27b0;">TREN EN VUELTA (VTI)</div>
                <div class="legend-item" style="background: #795548;">FINAL DE TREN (FT)</div>
                <div class="legend-item" style="background: #e91e63;">ESQUINA DE ISLA (EI)</div>
                <div class="legend-item" style="background: #00bcd4;">INTERMEDIO DE ISLA (II)</div>
                <div class="legend-item" style="background: #9e9e9e;">INTERMEDIO DE TREN (IT)</div>
                <div class="legend-item" style="background: #2196f3;">VUELTA INTERMEDIO DE TREN (VIT)</div>
                <div class="legend-item" style="background: #cddc39; color: #333;">CABECERA DE TREN A EN U (CTIU)</div>
                <div class="legend-item" style="background: #ff5722;">CABECERA DE TREN A EN L (CTIL)</div>
                <div class="legend-item" style="background: #009688;">STAND DE REGISTROS (REGISTROS)</div>
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <div class="rights">
                DERECHOS RESERVADOS
            </div>
        </div>
    </div>

    <!-- Modales -->
    <div class="modal fade" id="infoModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <i class="fas fa-cubes me-2"></i>
                        Información del Stand
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="description-container">
                        <i class="fas fa-info-circle me-2"></i>
                        <div id="modalContent"></div>
                    </div>
                    
                    <form id="standForm" class="mt-4">
                        <div class="mb-4">
                            <label for="medidaSelect" class="form-label">
                                <i class="fas fa-ruler me-2"></i>
                                Selecciona la medida:
                            </label>
                            <select class="form-select" id="medidaSelect" required>
                                <option value="">Seleccione una medida...</option>
                            </select>
                        </div>

                        <div class="mb-3">
                            <label for="numStands" class="form-label">
                                <i class="fas fa-sort-numeric-up me-2"></i>
                                Número de stands:
                            </label>
                            <input type="number" 
                                    class="form-control" 
                                    id="numStands" 
                                    min="1" 
                                    required
                                    placeholder="Ingrese la cantidad">
                            <div id="numError" class="invalid-feedback">
                                Por favor ingrese un número válido mayor a 0
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" onclick="guardarDatos()">
                        <i class="fas fa-save me-2"></i>
                        Guardar
                    </button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        <i class="fas fa-times me-2"></i>
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="resultadosModal" tabindex="-1">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <i class="fas fa-clipboard-list me-2"></i>
                        DESPIECE DE MATERIALES
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body" style="max-height: 70vh; overflow-y: auto;">
                    <div class="resultado-info mb-4">
                        <p class="mb-1"><strong>Modulo:</strong> <span id="resultModulo"></span></p>
                        <p class="mb-1"><strong>Cantidad:</strong> <span id="resultCantidad"></span></p>
                        <p class="mb-1"><strong>Medida:</strong> <span id="resultMedida"></span></p>
                    </div>
                    
                    <div id="contenedorResultados"></div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        <i class="fas fa-times me-2"></i>Cerrar
                    </button>
                    <button type="button" class="btn btn-primary" onclick="imprimirResultados()">
                        <i class="fas fa-print me-2"></i>Imprimir
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal de Cerrar Sesion -->
    <div class="modal fade" id="logoutModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <i class="fas fa-sign-out-alt me-2"></i>
                        Cerrar Sesion
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <p class="mb-0">¿Estas seguro de que deseas cerrar sesion?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        <i class="fas fa-times me-2"></i>
                        Cancelar
                    </button>
                    <button type="button" class="btn btn-danger" onclick="confirmarCerrarSesion()">
                        <i class="fas fa-sign-out-alt me-2"></i>
                        Cerrar Sesion
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal de Registros -->
    <div class="modal fade" id="registroModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <i class="fas fa-cubes me-2"></i>
                        Stand de Registros
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="description-container">
                        <i class="fas fa-info-circle me-2"></i>
                        <div>
                            <p class="mb-2">Medida: <strong>1.00 x 0.50 x 2.50 M</strong></p>
                            <p class="mb-0">Seleccione el tipo de registro</p>
                        </div>
                    </div>
                    
                    <form id="registroForm" class="mt-4">
                        <div class="mb-4">
                            <label for="tipoRegistroSelect" class="form-label">
                                <i class="fas fa-list me-2"></i>
                                Tipo de Registro:
                            </label>
                            <select class="form-select" id="tipoRegistroSelect" required>
                                <option value="">Seleccione un tipo...</option>
                                <option value="CR">Cabecera de Registro</option>
                                <option value="RT">Registro en Tren</option>
                                <option value="VT">Vuelta De Tren</option>
                                <option value="CRC">Cabecera Registro Curvo</option>
                                <option value="RTC">Registro en Tren Curvo</option>
                            </select>
                        </div>

                        <div class="mb-3">
                            <label for="numRegistros" class="form-label">
                                <i class="fas fa-sort-numeric-up me-2"></i>
                                Numero de registros:
                            </label>
                            <input type="number" 
                                    class="form-control" 
                                    id="numRegistros" 
                                    min="1" 
                                    required
                                    placeholder="Ingrese la cantidad">
                            <div id="numRegistroError" class="invalid-feedback">
                                Por favor ingrese un numero valido mayor a 0
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" onclick="guardarDatosRegistro()">
                        <i class="fas fa-save me-2"></i>
                        Guardar
                    </button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        <i class="fas fa-times me-2"></i>
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    
    <!-- Despieces por medida -->
    <script src="js/despiece-2x2x2.5.js"></script>
    <script src="js/despiece-3x2x2.5.js"></script>
    <script src="js/despiece-3x2.5x2.5.js"></script>
    <script src="js/despiece-3x3x2.5.js"></script>
    
    <!-- Despiece de registros -->
    <script src="js/registro.js"></script>
    
    <script>
    let logoutModal;

    
    document.addEventListener('DOMContentLoaded', function() {
        // Crear instancia del modal de logout
        logoutModal = new bootstrap.Modal(document.getElementById('logoutModal'));
    });

    function cerrarSesion() {
        logoutModal.show();
    }

    // Funcion para confirmar y ejecutar el cierre de sesion
    function confirmarCerrarSesion() {
        window.location.href = 'php/logout.php';
    }
    </script>
    
    <!-- Logica principal -->
    <script src="js/despiece-logic.js"></script>
    <!-- Scripts de interfaz -->
    <script src="js/stands.js"></script>
</body>
</html>