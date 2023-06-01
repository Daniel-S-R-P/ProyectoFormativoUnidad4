<?php
include '../header.php';
include '../db.php';

$ide = $_GET['id'];

$sql = "DELETE FROM ingresos WHERE id_ingreso = $ide ";
$result = $conn->query($sql);
echo "ok";

?>