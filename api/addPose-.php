<?php
	$params = json_decode(file_get_contents('php://input'));
		echo '<pre>';
		print_r($params);
		echo '</pre>';
		echo '<pre>';
		print_r($_POST);
		echo '</pre>';
		echo '<pre>';
		print_r($_FILES);
		echo '</pre>';


		?>