<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");
include 'db.php';
session_start();
$data = json_decode(file_get_contents('php://input'), true);
if (json_last_error() === JSON_ERROR_NONE) {
    $recipe_id = $data['recipe_id'] ?? null;
    $comment = $data['comment'] ?? null;
} else {
    $recipe_id = $_POST['recipe_id'] ?? null;
    $comment = $_POST['comment'] ?? null;
}

if (!$recipe_id || !$comment) {
    echo json_encode(["error" => "Invalid input"]);
    exit();
}

$stmt = $conn->prepare("INSERT INTO comments (recipe_id, comment) VALUES (?, ?)");
$stmt->bind_param("is", $recipe_id, $comment);

if ($stmt->execute()) {
    echo json_encode(["success" => "Comment added successfully."]);
} else {
    echo json_encode(["error" => "Failed to add comment: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
