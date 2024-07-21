<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");
include 'db.php';

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['id']) && isset($data['name']) && isset($data['ingredients']) && isset($data['steps'])) {
    $id = $data['id'];
    $name = $data['name'];
    $ingredients = implode(',', $data['ingredients']);
    $steps = implode(',', $data['steps']);

    $sql = "UPDATE recipes SET name='$name', ingredients='$ingredients', steps='$steps' WHERE id=$id";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(['message' => 'Recipe updated successfully']);
    } else {
        echo json_encode(['error' => 'Error: ' . $sql . '<br>' . $conn->error]);
    }
} else {
    echo json_encode(['error' => 'Invalid input']);
}

$conn->close();
?>
