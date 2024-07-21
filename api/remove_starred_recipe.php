<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

include 'db.php';

$data = json_decode(file_get_contents('php://input'), true);
$user_id = $data['user_id'] ?? null;
$recipe_id = $data['recipe_id'] ?? null;

if (!$user_id || !$recipe_id) {
    echo json_encode(['error' => 'User ID or Recipe ID not provided']);
    exit();
}

$sql = "DELETE FROM starred_recipes WHERE user_id = ? AND recipe_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $user_id, $recipe_id);

if ($stmt->execute()) {
    echo json_encode(['success' => 'Recipe removed from starred list']);
} else {
    echo json_encode(['error' => 'Failed to remove recipe from starred list']);
}

$stmt->close();
$conn->close();
?>
