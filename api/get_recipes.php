<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

include 'db.php';

$sql = "SELECT * FROM recipes";
$result = $conn->query($sql);

$recipes = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $recipes[] = $row;
    }
}
echo json_encode($recipes);

$conn->close();
?>
