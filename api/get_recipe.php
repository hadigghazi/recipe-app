<?php
header("Content-Type: application/json");
include 'db.php';

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $sql = "SELECT * FROM recipes WHERE id = $id";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        echo json_encode($result->fetch_assoc());
    } else {
        echo json_encode(['error' => 'Recipe not found']);
    }
} else {
    echo json_encode(['error' => 'No recipe ID provided']);
}

$conn->close();
?>
