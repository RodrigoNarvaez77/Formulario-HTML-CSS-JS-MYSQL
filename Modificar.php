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
    die("Error en la conexión: " . $conn->connect_error);
}

$sql = "SELECT id,nombre,correo,telefono FROM personas";
$result = $conn->query($sql);
$data=[];
if($result->num_rows>0){
    while($row = $result->fetch_assoc()){
        $data[] = $row;
    }
}

$conn->close();
echo json_encode($data);
?>