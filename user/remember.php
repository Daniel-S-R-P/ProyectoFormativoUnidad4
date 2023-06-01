<?php
include '../header.php';
include '../db.php';

// Obtener la clave del área a editar desde la solicitud POST
$usuario = $_GET['user'];
$telefono= $_GET['telefono'];


// Obtener los datos del área a partir de su clave
$stmt = $conn->prepare("SELECT * FROM usuarios WHERE usuario = ? AND telefono= ?");
$stmt->bind_param('ss', $usuario, $telefono);
$stmt->execute();
$result = $stmt->get_result();
$dato = mysqli_fetch_assoc($result);;
if($dato != null){
  echo json_encode($dato);
}else{
  echo "No hay registro";
}   
?>