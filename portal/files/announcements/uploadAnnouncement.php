<?php
$arr = array();
foreach($_FILES as $key => $file){
	$ext = pathinfo($file["name"], PATHINFO_EXTENSION);
	$fileName = $key . "." . $ext;
  if (move_uploaded_file($file["tmp_name"], __DIR__ . "/" . $fileName )){
  		array_push($arr,$fileName);
	}
  else{
  		array_push($arr, "false");
	}	
}
$out = array_values($arr);
echo json_encode($out);
?>