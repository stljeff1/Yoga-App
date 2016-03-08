<?php
	
	$filepath = dirname(__FILE__);
	$filepath = preg_replace("/\w+[\/|\\\\]?$/", 'images/', $filepath);
	define("IMAGE_FILE_PATH", $filepath);

	if(IS_LOCAL) {
		function get_form_data()  
		{
			global $_REQUEST, $_FILES;
			$obj = array();

			$obj['data'] = json_decode($_REQUEST['model']);

		
			$obj['file'] = (isset($_FILES['file'])) ? $_FILES['file'] : false;
			return $obj;
		}

		function save_image($db, $obj, $is_primary = false) 
		{
		
			$img = write_image_to_disk($obj);
			//$img = array('img_path'=> '/yoga-app/images/my_damn_image.gif');

			$return = -1;

			$get_asset = "SELECT * FROM asset_type WHERE type LIKE '%image%'";
			if($db->num_rows($get_asset) > 0) {
				list($asset_id, $asset_name) = $db->get_row($get_asset);
				$asset_type = $asset_id;
			}

			if($img['img_path'] && $asset_type) {
				//write_image_to_db($img);
				$asset = array(
					'locator' => $img['img_path'],
					'fk_type' => $asset_type,
					'is_primary_asset' => $is_primary
				);
				$insert = $db->insert('assets', $asset);
				//spew(array('Location' => 'save_image', 'data' => $asset));
				if($insert) 
					$return = $db->lastid();

			}
			return $return;
		}

		function write_image_to_disk($img) 
		{
			$return = array(
				'img_path' => false,
				'message' => false
			);

			$file_path = WEB_ROOT . 'images/';
			$img_path =  $file_path . $img->file_src_name;

			if(file_exists(IMAGE_FILE_PATH.$img->file_src_name)) {

				$return['message'] = "Image exists";
				$return['img_path'] = $img_path;
			}
		
			else if($img->uploaded) {
				if($img->image_src_x > 999) {
					$img->image_resize = true;
					$img->image_ratio_y = true;
					$img->image_x = 999;
				}
				$img->Process(IMAGE_FILE_PATH);
				if($img->processed) {
					$return['message'] = "Image Saved";
					$return['img_path'] = $img_path;
					$img->Clean();
				}
				else {
					$return['message'] = 'Error';
					$return['error'] = $img->error;
				}
			}
			//spew(array('Location' => 'write_image_to_disk', 'data' => $return));
			return $return;
		}

		/*function join_pose_asset($db, $pose, $asset) 
		{
			$save = array('fk_pose' => $pose, 'fk_asset' => $asset);
			$insert = $db->insert('pose_to_asset', $save);	
			//spew(array('Location' => 'join_pose_asset', 'data' => $save));
			if($insert)
				return $db->lastid();
			else
				return -1;
		}*/


		function save_asset($db, $data)
		{
			$insert = $db->insert('assets', array('locator' => $data['locator'], 'fk_type' => $data['fk_type'], 'notes' => $data['asset_notes']));
			if($insert) {
				$asset = $db->lastid();
				$poses = $data['poseList'];
				$tags = $data['tagList'];
				foreach($poses as $pose_id) {
					$insert_pose = join_tables($db, 'pose_to_asset', array('fk_pose' => $pose_id, 'fk_asset' => $asset));//$db->insert('pose_to_category', array('fk_pose' => $pose_id, 'fk_category' => $cat));
					if(!$insert_pose || $insert_pose < 0) 
						trigger_error('Unable to link pose to asset.');
				}
				foreach($tags as $tag) {
					$myTag = $tag;
					if(!isset($myTag['ID'])) {
						$insert_tag = $db->insert('tags', array('tagName' => $myTag['tagName']));
						$myTag['ID'] = $db->lastid();
					}
					$join_tag = join_tables($db, 'asset_to_tag', array('fk_tag' => $myTag['ID'], 'fk_asset' => $asset));
					if(!$join_tag || $join_tag < 0) 
						trigger_error('Unable to link tag to asset.');
				}
				return $asset;
			}
			else
				return -1;
		}

		function save_pose($db, $pose) 
		{/*
			$mysqli = new mysqli(DB_HOST, DB_USER, DB_PW, DB_NAME);
			print_r(array(DB_HOST, DB_USER, DB_PW, DB_NAME, $mysqli));

			if($mysqli->connect_error) {
				return array('error'=>'Faiiled to connect with database', );
			}*/

			$existing = $db->exists('poses', '*', array('sanskrit_name' => $pose->sanskrit));
			
			if($existing !== false) 
				return array('error'=> 'pose Exists. Handle it.');

			$data = array('sanskrit_name' => $pose->sanskrit, 'loy_order' => $pose->loy_order);
			
			if(isset($pose->english) && $pose->english != "") 
				$data['english_name'] = $pose->english;

			//save categories
			/*
			$category = save_tags($db, $pose->category, $data);
			if(count($tag))
				$data['fk_category'] = json_encode($category);
			*/
			
			//spew(array('Location' => 'save_pose', 'data' => $data));

			$insert = $db->insert('poses', $data);
			if($insert) {
				$pose_id = $db->lastid();
				return $pose_id;
			}

			else
				return -1;

		}

		function save_tags($db, $tags) {
			$return = array();
			foreach ($tags as $tag) {
				$tagName = preg_replace('/-/', ' ', $tag->tagName);
				if(isset($tag->ID)) {
					$id = $tag->ID;
					if(is_numeric($id)) 
						array_push($return, $id);
				}
				else {
					$insert_tag = $db->insert('tags', array('tagName' => $tagName));
					if(!$insert_tag)
						trigger_error('Unsaved tag');
					else
						array_push($return, $db->lastid());
					
				}
					
			}
			spew(array('tags_gathered'=>$return));
			return $return;

		}

		function save_tag_array($db, $tags) {
			$return = array();
			foreach ($tags as $tag) {
				spew(array('saving_tag'=> $tag));
				$tagName = preg_replace('/-/', ' ', $tag['tagName']);
				if(isset($tag['ID'])) {
					$id = $tag['ID'];
					if(is_numeric($id)) 
						array_push($return, $id);
				}
				else {
					$insert_tag = $db->insert('tags', array('tagName' => $tagName));
					if(!$insert_tag)
						trigger_error('Unsaved tag');
					else {
						$id = $db->lastid();
						array_push($return,  $db->lastid());
						spew(array('save_tag',  $db->lastid()));
					
					}
					
				}
					
			}
			return $return;

		}
	}
	function sanatize_data($db, $form)
	{
		$form->sanskrit = $db->filter($form->sanskrit);
		if(isset($form->english))
			$form->english = $db->filter($form->english);

		return $form;

	}

	function join_tables($db, $table, $data)
	{
		$sql = "SELECT * FROM $table WHERE 1=1 ";
		foreach($data as $k => $v) {
			// $v always numeric
			$sql .= " AND " . $k . " = " . $v;
		}
		if($exists = $db->num_rows($sql) > 0 && false) {
			$id = $db->get_row(preg_replace('*', 'ID', $sql));
			return $id;
		}
		else {
			$insert = $db->insert($table, $data);	
			if($insert)
				return $db->lastid();
			else
				return -1;
		}
	}

	function get_pose_by_name($db, $sanskrit) 
	{

	}
	function getAllPoses($db) 
	{
		$return = array();
		$poseSql = "SELECT * FROM poses ORDER BY loy_order";
		$poses = $db->get_results($poseSql);
		foreach ($poses as $p) {
			$pose = getPoseLinkedData($db, $p);
			array_push($return, $pose);
		}
		return $return;
	}

	function getPose($db, $id) 
	{
		$sql = "SELECT * FROM poses %s LIMIT 1";
		if(is_numeric($id))
			$sql = sprintf($sql, 'WHERE ID = ' . $id);
		else
			$sql = sprintf($sql, 'WHERE sanskrit_name = "' . $id . '"');
		$poseRow = $db->get_results($sql);
		$pose = $poseRow[0];

		$prev = "SELECT sanskrit_name, loy_order FROM poses WHERE loy_order < " . $pose['loy_order'] . ' ORDER BY loy_order DESC LIMIT 1';
		$next = "SELECT sanskrit_name, loy_order FROM poses WHERE loy_order > " . $pose['loy_order'] . ' ORDER BY loy_order LIMIT 1';
		$prev_obj = $db->get_row($prev);
		$next_obj = $db->get_row($next);

		$pose = getPoseLinkedData($db, $pose);
		$pose['prev'] = $prev_obj;
		$pose['next'] = $next_obj;

		return $pose;
	}

	function getPoseLinkedData($db, $pose) 
	{
		$return = array(
			'sanskritName' => $pose['sanskrit_name'],
			'englishName' => $pose['english_name'],
			'tags' => array(),
			'image' => null,
			'ID' => $pose['ID'],
			'loy_order' => $pose['loy_order'],
		);
		$tagIDs = "SELECT fk_tag FROM pose_to_tag WHERE fk_pose = " . $pose['ID'];
		$tagIDs = $db->get_results($tagIDs);
		foreach ($tagIDs as $tagID) {
			$tagSql = "SELECT * FROM tags WHERE ID = " . $tagID['fk_tag'];
			$tags = $db->get_results($tagSql);
			foreach($tags as $tag) {
				array_push($return['tags'], $tag);
			}
		}

		$imgSql = "SELECT assets.ID, assets.locator  FROM assets JOIN pose_to_asset ON assets.ID = pose_to_asset.fk_asset WHERE assets.is_primary_asset = 1 AND pose_to_asset.fk_pose =  ". $pose['ID'];
		list($imgId, $imgUrl) = $db->get_row($imgSql);
		$return['image'] = array("ID"=>$imgId, 'url' => $imgUrl);

		return $return;	

	}

	function getAssets($db, $id) 
	{
		$sql = "SELECT a.ID, a.locator, a.fk_type, a.notes FROM assets a JOIN pose_to_asset pa ON a.ID = pa.fk_asset WHERE a.is_primary_asset IS null AND %s ";
		$sql = sprintf($sql, 'pa.fk_pose = ' . $id);
		//echo $sql;
		$assets = $db->get_results($sql);
		
		return $assets;
	}

	function getTags($db, $type, $id)
	{
		$sql = "SELECT t.ID, t.tagName FROM tags t JOIN asset_to_tag at ON t.ID = at.fk_tag WHERE at.fk_asset = " . $id;
		//echo "SQL: " . $sql;
		$tags = $db->get_results($sql);
		return $tags;
	}

	function getPageInfo($url) {
		$page_html = file_get_contents($url);
		$html = new DOMDocument();
		preg_match("/<title>(.*)<\/title>/i", $page_html, $title);
		if(count($title) == 2)
			$title = $title[1];
		else
			$title = '';	
		$description = '';
		$image = '';
		$domain = '';
		@$html->loadHTML($page_html);
		foreach($html->getElementsByTagName('meta') as $tag) {
			$name = $tag->getAttribute('name');
			$content = $tag->getAttribute('content');
			$property = $tag->getAttribute('property');
			if(isset($name) && !isset($description) && preg_match("description",$name )) 
				$description = $tag->getAttribute('value');
			else if(isset($property) && preg_match('/og:description/', $property))
				$description = $content;
			else if(isset($property) && preg_match('/og:title/', $property))
				$title = $content;
			else if(isset($property)  && $image == '' && preg_match('/og:image/', $property))
				$image = $content;
			else if(isset($property) && preg_match('/og:site_name/', $property))
				$domain = $content;

		} 

		if(!isset($domain)) {
			$parsed_url = parse_url($url);
			if($parse_url && isset($parse_url['host']))
				$domain = $parse_url['host'];
		}

		return array("title" => $title, "description" => $description, "image" => $image, "domain" => $domain, "url" => $url);

	}

	function loadPoseTypes($db) {

		$sql = "SELECT tag.ID, tag.tagName FROM tags tag JOIN posetypes type WHERE type.type LIKE tag.tagName";
		return $db->get_results($sql);

	}


	function loadData($db, $table, $query = false) 
	{
		$return = array();
		
		$col = false;
		switch($table) {
			case 'poses':
				$col = 'sanskrit_name';
				break;
			case 'categories':
				$col = 'category_name';
				break;
			case 'tags':
				$col = 'tagName';
				break;
		}
		if($col) {
			$sql = "SELECT ID, $col FROM $table";
			if($query) {
				$sql .= " WHERE $col LIKE '%$query%'";
			}
			$sql .= " ORDER BY $col";
			//spew($sql);
			$return = $db->get_results($sql);
		}
		return $return;
	}
	function loadCategories($db) 
	{
		$return = array();
		$sql = "SELECT * FROM categories";
		$cats = $db->get_results($sql);
		/*foreach ($poses as $p) {
			$pose = getPoseLinkedData($db, $p);
			array_push($return, $pose);
		}*/
		return $cats;
	}

?>