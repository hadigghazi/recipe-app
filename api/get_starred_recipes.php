<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000'); // Replace with your frontend origin
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true'); // Allow credentials

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

include 'db.php'; // Adjust the path as needed

if (!$conn) {
    echo json_encode(['error' => 'Database connection failed']);
    exit();
}

$user_id = $_GET['user_id'] ?? null;

if ($user_id) {
    $stmt = $conn->prepare('SELECT * FROM starred_recipes WHERE user_id = ?');
    if ($stmt) {
        $stmt->bind_param('i', $user_id);
        $stmt->execute();
        $result = $stmt->get_result();
        $starredRecipes = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($starredRecipes);

        $stmt->close();
    } else {
        echo json_encode(['error' => 'Failed to prepare SQL statement']);
    }
} else {
    echo json_encode(['error' => 'User ID not provided']);
}

$conn->close();
?>
