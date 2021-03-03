<?php

include_once(__DIR__ . '/database.php');

if(isset($_REQUEST['RoomID'])) {
    $anRoomID = (int)$_REQUEST['RoomID'];
} else {
    echo "Missing RoomID";
    exit;
}

$astrQuery = "SELECT COUNT(*) AS CountUser FROM connections WHERE RoomID=$anRoomID AND UserID='$g_SessionSID' LIMIT 1;";

$aResult = $myMysqli->query($astrQuery);
if(!$aResult){
    echo "Query failed: (" . $myMysqli->connect_errno . ') ' . $myMysqli->connect_error;
    exit;
}

$aRow = $aResult->fetch_assoc();
$anCountUser=$aRow['CountUser'];

if(0<$anCountUser){
    $aResponse = [];
    echo json_encode($aResponse);
    exit;
}

$astrQuery = "INSERT INTO connections (RoomID,USerID) VALUES ($anRoomID,'$g_SessionSID');";

$aResult = $myMysqli->query($astrQuery);
if(!$aResult){
    echo "Query failed: (" . $myMysqli->connect_errno . ') ' . $myMysqli->connect_error;
    exit;
}

include_once(__DIR__ . '/database_close.php');

$aResponse = [];
echo json_encode($aResponse);