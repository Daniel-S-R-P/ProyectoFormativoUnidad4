<?php
include '../header.php';
include '../db.php';

$ide = $_GET['id'];

$sql = "DELETE FROM egresos WHERE id_egreso = $ide";
$result = $conn->query($sql);
echo "ok";

?>