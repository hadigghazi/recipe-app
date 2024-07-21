<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

$servername = "localhost";
$username = "root"; 
$password = ""; 
$dbname = "recipes"; 

$mysqli = new mysqli($servername, $username, $password, $dbname);
session_start();
if ($mysqli->connect_error) {
    echo json_encode(["error" => "Connection failed: " . $mysqli->connect_error]);
    http_response_code(500);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(["error" => "Invalid JSON"]);
    http_response_code(400);
    exit();
}

$username = $data['username'] ?? null;
$password = $data['password'] ?? null;

if (!$username || !$password) {
    echo json_encode(["error" => "Username and password are required"]);
    http_response_code(400);
    exit();
}

$hashed_password = password_hash($password, PASSWORD_DEFAULT);

$stmt = $mysqli->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
if ($stmt) {
    $stmt->bind_param("ss", $username, $hashed_password);
    if ($stmt->execute()) {
        echo json_encode(["success" => "User registered successfully"]);
        http_response_code(201);
    } else {
        echo json_encode(["error" => "Failed to register user"]);
        http_response_code(500);
    }
    $stmt->close();
} else {
    echo json_encode(["error" => "Failed to prepare SQL statement"]);
    http_response_code(500);
}

$mysqli->close();
?>
