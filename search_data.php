<?php
if (isset($_GET['search']) && !empty($_GET['search'])) {
	$arr = array();
    $arr['result'] = array(
         array("id" => 12345, "label" => "langga","xx" => "sss")
        ,array("id" => 12346, "label" => "anggi","xx" => "sss")
        ,array("id" => 12347, "label" => "debora","xx" => "sss")
        ,array("id" => 12348, "label" => "michell","xx" => "sss")
    );
    
    echo json_encode($arr);
}
?>