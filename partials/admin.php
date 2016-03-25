<?php
	function post_angular() 
	{
		echo '<h1>hello</h1>';
	}
?>

<section ng-controller='addPoseCtrl'>

	<form class='add-pose-form' name='addPoseForm' novalidate ng-submit='submitForm()' ng-click='formClick()'>
		<h2>Add Pose</h2>
		<div class='form-group'>
			<label for="name_sanskrit">Pose Name (Sanskrit)</label>
			<input type='text' class='' id="name_sanskrit" name="name_sanskrit" ng-model="pose.sanskrit"  ng-required="true"/>
			<span ng-show="form.size.$error.required">The value is required!</span>
		</div>
		<div class='form-group'>
			<label for="name_english">Pose Name (English)</label>
			<input type='text' class='' id="name_english" name="name_english" ng-model='pose.english'/>
		</div>
		<div class='form-group'>
			<label for="loy_order">Order of appearance in Light on Yoga</label>
			<input type='text' class='' id="loy_order" name="loy_order" ng-model="pose.loy_order"  ng-required="true" size="3"/>
			<span ng-show="form.size.$error.required">The value is required!</span>
		</div>
		<div class='form-group'>
			<label for="tag">Tags</label>
			<tags-input ng-model="pose.tags" display-property='tagName'>
				<auto-complete source="loadTags($query)"></auto-complete>
			</tags-input>
		</div>
		<div class='form-group'>
			<label for="image_file">Primary Image</label>
			<input type='file' class='' id="image_file" name="image_file" file-upload='poseImage' ng-required="true">
		</div>
		 <button type="submit" class="btn btn-default">Submit</button>
	</form>
	<p>Form Status: {{formStatus}}</p>
	<div class='form-status'>
		<h4>Form Status</h4>
		<div ng-repeat='update in serverUpdates'>
			{{serverUpdates}}
		</div>
	</div>
</section>

<section ng-controller='addAssetCtrl'>
	<form class='add-asset-form' name='addAssetForm' ng-submit='submitForm()' ng-click='formClick()'>
		<h3>Add Asset - {{formStatus}}</h3>
		<!--<div class="form-group">
			<label for="asset_type">Asset Type</label>
			<select name="asset_type" ng-model="ass">
				<option ng-repeat>
			</select>
		</div>-->
		<div class="form-group">
			<label for="external_url">External URL</label>
			<input type="text" id="external_url" name="external_url" ng-model="asset.url"/>
		</div>

		<!--<div class='form-group'>
			<label for="image_file">Image File</label>
			<input type='file' class='' id="image_file" name="image_file" file-upload='fileUpload'/>
		</div>-->

		<div class='form-group'>
			<label for="category">Link Poses</label>
			<tags-input ng-model="asset.poseList" display-property='sanskrit_name'>
				<auto-complete source="loadPoses($query)"></auto-complete>
			</tags-input>
		</div>

		<div class='form-group'>
			<label for="category">Tags</label>
			<tags-input ng-model="asset.tagList" display-property='tagName'>
				<auto-complete source="loadTags($query)"></auto-complete>
			</tags-input>
		</div>
		<div class='form-group'>
			<label>User Notes</label>
			<textarea name='notes' ng-model='notes'></textarea>
		</div>
		<button type="submit" class="btn btn-default">Submit</button>
	</form>
</section>

<pre style='display: none;'><?php print_r($_SERVER); ?></pre>

<script src='./js/file-upload.js'></script>
<script src='./js/admin.js'></script>