<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");
include 'db.php';
session_start();
$data = json_decode(file_get_contents("php://input"), true);
$recipe_id = $data['recipe_id'];

$sql = "DELETE FROM recipes WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $recipe_id);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => $stmt->error]);
}

$stmt->close();
$conn->close();
?>
