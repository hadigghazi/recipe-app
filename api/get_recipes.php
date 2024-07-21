<?php
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
