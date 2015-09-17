<?php
if (move_uploaded_file($_FILES["file"]["tmp_name"], __DIR__ . "/menu.pdf")){
	echo true;
}
else{
	echo false;
}
?>