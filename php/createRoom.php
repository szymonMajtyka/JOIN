<?php

include_once(__DIR__ . '/database.php');

if(isset($_REQUEST['RoomName'])) {
    $astrRoomName = trim($_REQUEST['RoomName']);
} else {
    echo "Missing RoomName";
    exit;
}

$astrQuery = "INSERT INTO rooms (Name) VALUES ('$astrRoomName');";
$aResult = $myMysqli->query($astrQuery);

if(!$aResult) {
    echo "Query failed: (" . $myMysqli->errno . ") " . $myMysqli->error;
    exit;
}

include_once(__DIR__ . '/database_close.php');

$aResponse = [];
echo json_encode($aResponse);