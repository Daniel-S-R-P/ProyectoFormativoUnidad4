<?php
include '../header.php';
include '../db.php';

// Recibir los datos enviados desde JavaScript
$data = json_decode(file_get_contents('php://input'), true);

$contraseña = $data['contraseña'];
$id=$data['id'];
// Actualizar los datos en la tabla usuarios
$stmt = $conn->prepare("UPDATE usuarios SET password=? WHERE id_usuario=?");
$stmt->bind_param('si',$contraseña, $id);
$stmt->execute();

// Devolver una respuesta al archivo JavaScript
header('Content-Type: application/json');
echo json_encode(['success' => true]);
?>
