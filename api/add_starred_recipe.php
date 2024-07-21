<?php
header('Content-Type: application/json');

header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

include 'db.php';

if (!$conn) {
    echo json_encode(['error' => 'Database connection failed']);
    exit();
}

$data = json_decode(file_get_contents('php://input'), true);

$user_id = $data['user_id'] ?? null;
$recipe_id = $data['recipe_id'] ?? null;

if ($user_id && $recipe_id) {
    $stmt = $conn->prepare('INSERT INTO starred_recipes (user_id, recipe_id) VALUES (?, ?)');
    if ($stmt) {
        $stmt->bind_param('ii', $user_id, $recipe_id);
        $result = $stmt->execute();
        
        if ($result) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['error' => 'Failed to star recipe']);
        }

        $stmt->close();
    } else {
        echo json_encode(['error' => 'Failed to prepare SQL statement']);
    }
} else {
    echo json_encode(['error' => 'User ID or Recipe ID not provided']);
}

$conn->close();
?>
