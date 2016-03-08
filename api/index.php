<?php

define("DB_HOST", 'localhost');

if(file_exists("C:\wamp\\")) {
	define("IS_LOCAL", true);
}
else {
	define("IS_LOCAL", false);
}
if(IS_LOCAL) {
	define("DB_USER", 'yogaapp');
	define("DB_PASS", 'app123');
	define("DB_NAME", 'yoga-app');

	define("WEB_ROOT", "/yoga-app/");
}
else {

	define("DB_USER", 'jeffwilk_yogaapp');
	define("DB_PASS", 'a$ApX8h0A&M');
	define("DB_NAME", 'jeffwilk_yogaapp');

	define("WEB_ROOT", "/");
	define( 'DISPLAY_DEBUG', true ); //display db errors?

}
//echo "<h1>Hello</h1>" . DB_NAME;
function spew($obj) 
{
	echo '<pre>';
	print_r($obj);
	echo '</pre>';

}

require_once('simple-mysqli-master/class.db.php');
require_once('class.upload.php-master/src/class.upload.php');

include_once('api-functions.php');


$database = DB::getInstance();

$errors = array();
$success = array();
$data = array();

$q = false;
if(isset($_GET['query']) && $_GET['query'] != 'undefined')
	$q = $_GET['query'];
switch ($_REQUEST['method']) 
{
	case 'dumbtest':
		$prev = "SELECT sanskrit_name FROM poses WHERE ID < 6 LIMIT 1";
		$q_prev = $database->get_results($prev);
		$next = "SELECT sanskrit_name FROM poses WHERE ID > 11 LIMIT 1";
		$q_next = $database->get_results($next);
		spew(array('tests', $database->num_rows($prev), $database->get_row($prev)));
		break;
	case 'addAsset' :
		$data = json_decode(file_get_contents('php://input'), true);
		//spew($data);

		if(!isset($data['locator'])) {
			array_push($errors, 'No URL Specified');
		}
		else {
			$data['locator'] = $database->filter($data['locator']);
			if(isset($data['asset_notes']))
				$data['asset_notes'] = $database->filter($data['asset_notes']);
			else
				$data['asset_notes'] = -1;
			$asset = save_asset($database, $data);
			if($asset && $asset > 0) {
				$data['data'] = array('ID' => $asset);
				array_push($success, 'Asset Saved');
			}
			else
				array_push($errors, 'Unable to save asset');
		}
		break;
	case 'uploadAsset' :
		break;
	case 'saveTags' :
		$data = json_decode(file_get_contents('php://input'), true);
		$tags = save_tag_array($database, $data['tags']);
		$pose = $data['poseID'];
		foreach($tags as $tag) {
			//$existing = "SELECT ID 	from tags
			spew(array('myTag' => $tag));
			$insert_tag = join_tables($database, 'pose_to_tag', array('fk_pose' => $pose, 'fk_tag' => $tag));//$db->insert('pose_to_category', array('fk_pose' => $pose_id, 'fk_category' => $cat));
			if(!$insert_tag || $insert_tag < 0) 
				array_push($errors, 'Error Saving tag');
			else
				array_push($success, 'tag Saved.');
		}
		spew($data);
		break;
	case 'addPose' :
		try {
			$form = get_form_data();
			//spew($form);


			if(!isset($form['data']->sanskrit) || $form['data']->sanskrit == "") {
				throw new Exception('Sanskrit name must be provided');
			}

			$form['data'] = sanatize_data($database, $form['data']);
 
			//echo '<h1>'.$form['data']->sanskrit.'</h1>';
			$pose = save_pose($database, $form['data']);
			//spew(array('pose_return' => $pose));
			if($pose && $form['file']) {
				$upload = new Upload($form['file']);
				$asset = save_image($database, $upload, true);
				$img_update = join_tables($database, 'pose_to_asset', array('fk_asset'=>$asset, 'fk_pose' => $pose));

				if(isset($form['data']->tags)) {

					$tags = save_tags($database, $form['data']->tags);
					//spew($tags);
					foreach($tags as $tag) {
						$insert_tag = join_tables($database, 'pose_to_tag', array('fk_pose' => $pose, 'fk_tag' => $tag));//$db->insert('pose_to_category', array('fk_pose' => $pose_id, 'fk_category' => $cat));
						if(!$insert_tag || $insert_tag < 0) 
							array_push($errors, 'Error Saving tag');
						else
							array_push($success, 'tag Saved.');
					}
				}
				if($asset <= 0 ||  !$img_update) {
					array_push($errors, 'Error Saving Image');
				}
				else {
					array_push($success, 'Image Saved.');
					
					if($pose) {
						array_push($success, 'Pose Saved');

					}
				}
				
				

				$data['data'] = array(
					'poseID' => $pose,
					'assetID' => $asset
				);
				
			}

			if(!$pose) {
				throw new Exception("Error Saving pose");
				$data['data'] = $form;
			}


		}
		catch (Exception $e) {
			array_push($errors, $e->getMessage());
		}
		break;
	case 'getAllPoses':
		$data['data'] = getAllPoses($database);		
		break;
	case 'getPose':
		$data['data'] = getPose($database, $_REQUEST['data1']);
		break;
	case 'getAssets':
		$data['data'] = array();
		$assets = getAssets($database, $_REQUEST['data1']);
		foreach($assets as $asset) {
			$tags = getTags($database, 'assets', $asset['ID']);
			$asset['tags'] = $tags;
			array_push($data['data'], $asset);
		}
		//$data['data'] = ;
		break;
	case 'getPageInfo':
		$data['data'] = getPageInfo($_REQUEST['url']);
		break;
	case 'loadCategories':
		$data['data'] = loadData($database, 'categories', $q);		
		break;
	case 'loadTags':
		if($q == "poseTypes")
			$data['data'] = loadPoseTypes($database);
		else		
			$data['data'] = loadData($database, 'tags', $q);		
		break;
	case 'loadPoses':
		$data['data'] = loadData($database, 'poses', $q);		
		break;

}

if(!empty($errors)) {
	$data['errors'] = $errors;
	$data['message'] = 'Negative';
}
else {
	$data['success'] = $success;
	$data['message'] = 'Victory';	
}

echo json_encode($data);

?>
