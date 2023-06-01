<?php
include '../header.php';
include '../db.php';

$ide = $_GET['id'];

$sql = "Select * FROM egresos WHERE id_egreso = $ide";
$result = $conn->query($sql);
$objeto = mysqli_fetch_assoc($result);
echo json_encode($objeto);

?>