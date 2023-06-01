<?php
include '../header.php';
include '../db.php';

$userId = $_GET['usuario'];

$stmt = $conn->prepare("SELECT tipo_egreso, SUM(importe) as total FROM egresos WHERE id_usuario = ? GROUP BY tipo_egreso");
$stmt->bind_param('i', $userId);
$stmt->execute();
$result = $stmt->get_result();

$egresos = [];
while ($row = $result->fetch_assoc()) {
  $egreso = [
    'tipo_egreso' => $row['tipo_egreso'],
    'total' => $row['total']
  ];
  $egresos[] = $egreso;
}

echo json_encode($egresos);
?>
