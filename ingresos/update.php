<?php
include '../header.php';
include '../db.php';

// Actualización de datos
$data = json_decode(file_get_contents('php://input'), true);
$id = $data['id_ingreso'];
$fecha = $data['fecha'];
$cuenta = $data['cuenta'];
$categoria = $data['categoria'];
$importe = $data['importe'];
$nota = $data['nota'];

// Actualizar los datos en la base de datos
$stmt = $conn->prepare("UPDATE ingresos SET fecha = ?, tipo_ingreso = ?, categoria = ?, importe = ?, descripcion = ? WHERE id_ingreso = ?");
$stmt->bind_param('sssssi', $fecha, $cuenta, $categoria, $importe, $nota, $id);
$stmt->execute();

// Verificar si la actualización fue exitosa
if ($stmt->affected_rows > 0) {
    $response = ['success' => true, 'message' => 'Actualización exitosa'];
} else {
    $response = ['success' => false, 'message' => 'Error en la actualización: ' . $stmt->error];
}

$stmt->close();
$conn->close();

// Devolver una respuesta JSON al archivo JavaScript
header('Content-Type: application/json');
echo json_encode($response);
?>
