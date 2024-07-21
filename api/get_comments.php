<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");
include 'db.php';
session_start();
$recipe_id = isset($_GET['recipe_id']) ? intval($_GET['recipe_id']) : 0;

if ($recipe_id <= 0) {
    echo json_encode(["error" => "Invalid recipe ID"]);
    exit();
}

$stmt = $conn->prepare("SELECT id, comment FROM comments WHERE recipe_id = ?");
$stmt->bind_param("i", $recipe_id);
$stmt->execute();
$result = $stmt->get_result();

$comments = [];
while ($row = $result->fetch_assoc()) {
    $comments[] = $row;
}

echo json_encode($comments);

$stmt->close();
$conn->close();
?>
