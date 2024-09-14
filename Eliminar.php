<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "personal";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Error en la conexión: " . $conn->connect_error);
}

$id = isset($_GET['id']) ? intval($_GET['id']) : 0;
$sql = "DELETE FROM personas WHERE id=$id";

$conn->close();
?>