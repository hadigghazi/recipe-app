<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");
include 'db.php';
session_start();
$id = $_GET['id'];

$sql = "SELECT * FROM recipes WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $recipe = $result->fetch_assoc();
    $recipe['ingredients'] = explode(',', $recipe['ingredients']); // Convert ingredients to array
    $recipe['steps'] = explode(',', $recipe['steps']); // Convert steps to array
    echo json_encode($recipe);
} else {
    echo json_encode(['error' => 'Recipe not found']);
}

$stmt->close();
$conn->close();
?>
