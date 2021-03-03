<?php

if(!session_id()){
    session_start();
}
$g_SessionSID = session_id();

$myMysqli = new \mysqli('localhost', 'root', '', 'anygamedb', 3306);
if ($myMysqli->connect_errno) {
    echo 'Faild to connectto MySQL: (' . $myMysqli->connect_errno . ') ' . $myMysqli->connect_error;
    exit;
}