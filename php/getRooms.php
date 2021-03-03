<?php

include_once(__DIR__ . '/database.php');

if(isset($_REQUEST['nPage']))   {
    $anPage = (int) $_REQUEST['nPage'];
} else {
    $anPage = 0;
}

if(isset($_REQUEST['nNumRowsOnPage']))   {
    $anNumRowsOnPage = (int) $_REQUEST['nNumRowsOnPage'];
} else {
    $anNumRowsOnPage = 10;
}

$anStartRow = $anNumRowsOnPage * $anPage;

$astrQuery = "SELECT r.*,c.UserID='$g_SessionSID' AS Joined FROM Rooms AS r LEFT JOIN Connections
AS c ON r.ID=c.RoomID LIMIT $anStartRow,$anNumRowsOnPage;";

$aResult = $myMysqli->query($astrQuery);
if(!$aResult){
    echo "Query failed: (" . $myMysqli->connect_errno . ') ' . $myMysqli->error;
    exit;
}

$avRooms = [];
while ($aRow = $aResult->fetch_assoc() ){
    $avRooms[] = $aRow;
}

include_once(__DIR__ . '/database_close.php');

$aResponse = [];
$aResponse["vRooms"] = $avRooms;
echo json_encode($aResponse);