<?php
$servername = "localhost";
$username = "root";
$password = "Maxconm190";
$dbname = "countify";

$conn = new mysqli($servername, $username, $password, $dbname);

// Comprobar conexión
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}


?>