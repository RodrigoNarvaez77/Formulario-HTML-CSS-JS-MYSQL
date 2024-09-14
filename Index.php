<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "personal";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Error en la conexión: " . $conn->connect_error);
}

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['nombre']) && isset($data['email']) && isset($data['telefono'])) {
    $nombre = $conn->real_escape_string($data['nombre']);
    $email = $conn->real_escape_string($data['email']);
    $telefono = $conn->real_escape_string($data['telefono']);

$sql = "INSERT INTO personas (nombre, correo, telefono) VALUES ('$nombre', '$email', '$telefono')";
$resultado = $conn->query($sql);
}

$conn->close();
?>


