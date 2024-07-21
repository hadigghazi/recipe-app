<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

include 'db.php';
session_start();

$data = json_decode(file_get_contents('php://input'), true);

$username = $data['username'] ?? null;
$password = $data['password'] ?? null;

error_log("Received username: $username, password: $password");

if ($username && $password) {
    $sql = "SELECT id, password FROM users WHERE username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        $hashed_password = $user['password'];
        $user_id = $user['id'];

        if (password_verify($password, $hashed_password)) {
            $_SESSION['user_id'] = $user_id;
            echo json_encode(['success' => 'Login successful', 'user_id' => $user_id]);
        } else {
            echo json_encode(['error' => 'Invalid username or password']);
        }
    } else {
        echo json_encode(['error' => 'Invalid username or password']);
    }

    $stmt->close();
} else {
    echo json_encode(['error' => 'Username and password are required']);
}

$conn->close();
?>
