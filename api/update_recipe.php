<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");
include 'db.php';
session_start();
$data = json_decode(file_get_contents('php://input'), true);

$recipe_id = $data['recipe_id'] ?? null;
$name = $data['name'] ?? null;
$ingredients = $data['ingredients'] ?? null;
$steps = $data['steps'] ?? null;

if ($recipe_id && $name && $ingredients && $steps) {
    $sql = "UPDATE recipes SET name = ?, ingredients = ?, steps = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sssi', $name, $ingredients, $steps, $recipe_id);
    
    if ($stmt->execute()) {
        echo json_encode(['success' => 'Recipe updated successfully']);
    } else {
        echo json_encode(['error' => 'Failed to update recipe']);
    }

    $stmt->close();
} else {
    echo json_encode(['error' => 'Invalid input data']);
}

$conn->close();
?>
