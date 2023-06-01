<?php
include '../header.php';
include '../db.php';

// Obtener el ID del usuario a eliminar desde la solicitud GET
$usuario = $_GET['id'];

// Eliminar los registros relacionados en la tabla de ingresos
$stmtIngresos = $conn->prepare("DELETE FROM ingresos WHERE id_usuario = ?");
$stmtIngresos->bind_param('i', $usuario);
$stmtIngresos->execute();

// Eliminar los registros relacionados en la tabla de egresos
$stmtEgresos = $conn->prepare("DELETE FROM egresos WHERE id_usuario = ?");
$stmtEgresos->bind_param('i', $usuario);
$stmtEgresos->execute();

// Eliminar el usuario de la tabla de usuarios
$stmtUsuarios = $conn->prepare("DELETE FROM usuarios WHERE id_usuario = ?");
$stmtUsuarios->bind_param('i', $usuario);
$stmtUsuarios->execute();

// Verificar si se eliminaron registros en las tablas
if ($stmtUsuarios->affected_rows > 0) {
  // Si se eliminaron registros, puedes realizar acciones adicionales si es necesario
  echo json_encode(array('message' => 'Usuario eliminado correctamente.'));
} else {
  // Si no se encontraron registros para eliminar, muestra un mensaje de error o información
  echo json_encode(array('message' => 'No se encontró el usuario para eliminar.'));
}

// Cerrar las conexiones a la base de datos
$stmtIngresos->close();
$stmtEgresos->close();
$stmtUsuarios->close();
$conn->close();
?>
