<?php
include '../header.php';
include '../db.php';

$userId = $_GET['usuario'];

$stmt = $conn->prepare("SELECT tipo_ingreso, SUM(importe) as total FROM ingresos WHERE id_usuario = ? GROUP BY tipo_ingreso");
$stmt->bind_param('i', $userId);
$stmt->execute();
$result = $stmt->get_result();

$ingresos = [];
while ($row = $result->fetch_assoc()) {
  $ingreso = [
    'tipo_ingreso' => $row['tipo_ingreso'],
    'total' => $row['total']
  ];
  $ingresos[] = $ingreso;
}

echo json_encode($ingresos);
?>
