<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Permite solicitudes desde cualquier origen

// Configuración de la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "personal";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die(json_encode(["error" => "Error en la conexión: " . $conn->connect_error]));
}

$id = isset($_GET['id']) ? intval($_GET['id']) : 0;
$nombre = isset($_GET['nombre']) ? trim($_GET['nombre']) : '';
$correo = isset($_GET['correo']) ? trim($_GET['correo']) : '';
$telefono = isset($_GET['telefono']) ? trim($_GET['telefono']) : '';
$hijos = isset($_GET['hijos']) ? trim($_GET['hijos']) : '';
$intereses = isset($_GET['intereses']) ? trim($_GET['intereses']) : '';
$estado_civil = isset($_GET['estado_civil']) ? trim($_GET['estado_civil']) : '';

// Consulta para actualizar datos
$sql = "UPDATE personas SET nombre = ?, correo = ?, telefono = ?, hijos = ?, intereses = ?, estado_civil = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssssi", $nombre, $correo, $telefono, $hijos, $intereses, $estado_civil, $id);

$response = [];

if ($stmt->execute()) {
    // Si la ejecución es exitosa, enviar un mensaje de éxito
    $response["success"] = true;
    $response["message"] = "Datos actualizados correctamente.";
} else {
    // En caso de error en la ejecución
    $response["success"] = false;
    $response["message"] = "Error al actualizar los datos: " . $stmt->error;
}

$stmt->close();
$conn->close();

// Devolver la respuesta en formato JSON
echo json_encode($response);
?>

