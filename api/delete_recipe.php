<?php
header("Content-Type: application/json");
include 'db.php';

if (isset($_GET['id'])) {
    $id = $_GET['id'];

    $sql = "DELETE FROM recipes WHERE id=$id";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(['message' => 'Recipe deleted successfully']);
    } else {
        echo json_encode(['error' => 'Error: ' . $sql . '<br>' . $conn->error]);
    }
} else {
    echo json_encode(['error' => 'No recipe ID provided']);
}

$conn->close();
?>
