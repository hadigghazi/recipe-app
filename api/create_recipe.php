<?php
header("Content-Type: application/json");
include 'db.php';

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['name']) && isset($data['ingredients']) && isset($data['steps'])) {
    $name = $data['name'];
    $ingredients = implode(',', $data['ingredients']);
    $steps = implode(',', $data['steps']);

    $sql = "INSERT INTO recipes (name, ingredients, steps) VALUES ('$name', '$ingredients', '$steps')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(['message' => 'Recipe created successfully']);
    } else {
        echo json_encode(['error' => 'Error: ' . $sql . '<br>' . $conn->error]);
    }
} else {
    echo json_encode(['error' => 'Invalid input']);
}

$conn->close();
?>
