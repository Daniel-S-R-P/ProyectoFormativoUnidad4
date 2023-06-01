<?php
include '../header.php';
include '../db.php';

$ide = $_GET['id'];

$sql = "SELECT * FROM ingresos WHERE id_usuario = $ide ORDER BY fecha";
$result = $conn->query($sql);
foreach ($result as $data) {
  echo "<tr>
          <td>".$data['id_ingreso']."</td>
          <td>".$data['fecha']."</td>
          <td>".$data['tipo_ingreso']."</td>
          <td>".$data['categoria']."</td>
          <td>".$data['importe']."</td>
          <td>".$data['descripcion']."</td>
          <td>
            <input class='btn btn-outline-success' type='button' value='Modificar' onclick=editar('".$data['id_ingreso']."')>
            <input class='btn btn-outline-danger' type='button' value='Eliminar' onclick=eliminar('".$data['id_ingreso']."')>
          </td>
        </tr>";
}
//echo json_encode($data);
$conn->close();
?>


<!-- $userId = $_GET['usuario'];

$stmt = $conn->prepare("SELECT fecha, tipo_ingreso, categoria, importe, descripcion FROM ingresos");
//$stmt->bind_param('i', $userId);
$stmt->execute();
$result = $stmt->get_result();

$ingresos = [];
while ($row = $result->fetch_assoc()) {
  $ingreso = [
    'tipo_ingreso' => $row['tipo_ingreso'],
    'total' => $row['total'], 'fecha' => $row['fecha']
  ];
  $ingresos[] = $ingreso;
}

echo json_encode($ingresos);
?> -->