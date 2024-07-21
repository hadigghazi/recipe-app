<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");
include 'db.php';
session_start();
$data = json_decode(file_get_contents('php://input'), true);

$name = $data['name'] ?? null;
$ingredients = $data['ingredients'] ?? null;
$steps = $data['steps'] ?? null;
$user_id = $data['user_id'] ?? null;

if ($name && $ingredients && $steps && $user_id) {
    $sql = "INSERT INTO recipes (name, ingredients, steps, user_id) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sssi', $name, $ingredients, $steps, $user_id);

    if ($stmt->execute()) {
        echo json_encode(['success' => 'Recipe created successfully']);
    } else {
        echo json_encode(['error' => $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(['error' => 'Missing required fields']);
}

$conn->close();
?>
