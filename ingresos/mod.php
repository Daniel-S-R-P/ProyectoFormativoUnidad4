<?php
include '../header.php';
include '../db.php';

$ide = $_GET['id'];

$sql = "Select * FROM ingresos WHERE id_ingreso = $ide";
$result = $conn->query($sql);
$objeto = mysqli_fetch_assoc($result);
echo json_encode($objeto);

?>