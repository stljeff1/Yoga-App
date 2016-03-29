<?php
?>

<!DOCTYPE html>
<!--[if lt IE 7]>
<html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>
<html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>
<html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js" ng-app="YogaPoseApp"> <!--<![endif]-->
<head>

    <!-- Meta-Information -->
    <title ng-bind-template="{{pageTitle}}">Propifyyourlife Yoga App</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="description" content="ACME Inc.">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php
        if(file_exists("C:\wamp\\")) {
            define('WEBROOT', '/yoga-app/'); ?>
            <base href="/yoga-app/">
        <?php } else {
            define('WEBROOT', '/'); ?> 
            <base href="/"> <?php
        }
        ?>

<meta property="og:site_name" content="#PropifyYourLife"/>
<meta property="og:title" content="#Propifyyorlife"/>
<meta property="og:latitude" content="37.7749295"/>
<meta property="og:longitude" content="-122.41941550000001"/>
<meta property="og:url" content="http://propifyyourlife.jeffwilkerson.net/"/>

<meta property="og:description" content="Presenting a multitude of ways to propify your life with yoga."/>
<meta property="og:image" content="http://propifyyourlife.jeffwilkerson.net/images/book-resources.jpg"/>
<meta itemprop="thumbnailUrl" content="http://propifyyourlife.jeffwilkerson.net/images/book-resources.jpg"/>
    <!-- Vendor: Bootstrap Stylesheets http://getbootstrap.com
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap-theme.min.css"> -->
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="./css/cerulean-bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="./css/bootstrap-switch.min.css">
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" rel="stylesheet">

    <!-- Our Website CSS Styles -->
    <link rel="stylesheet" href="./css/main.css">
    <link rel="stylesheet" href="./css/block-grid.css">
    <link rel="stylesheet" href="./css/bootstrap-switch.min.css">
    <link rel='stylesheet' href='js/tags-input/ng-tags-input.css'/>
</head>
<body>
<!--[if lt IE 7]>
<p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade
    your browser</a> to improve your experience.</p>
<![endif]-->

<!-- Our Website Content Goes Here -->
<div class='body-container container-fluid'>
<nav class="navbar navbar-default">

    <div class="navbar-header">
      <!--  <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button> -->
      <a class="navbar-brand" href="<?php echo WEBROOT; ?>">#Propifyyourlife</a>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
        <li class="active"><a href="<?php echo WEBROOT; ?>poses">Poses <span class="sr-only">(current)</span></a></li>
        
      </ul><!--
      <form class="navbar-form navbar-left" role="search">
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Search">
        </div>
        <button type="submit" class="btn btn-default">Submit</button>
      </form>-->

      <ul class="nav navbar-nav navbar-right">
        <li><a href="<?php echo WEBROOT; ?>about">About</a></li>
        <li><a href='https://github.com/stljeff1/Yoga-App' target='_blank'>View Project on GitHub</a></li>
        <li><a href="<?php echo WEBROOT; ?>tribute">Tribute</a></li>
        <li><a href="http://www.jeffwilkerson.net/" target="_blank">JW</a></li>
      </ul>
    </div><!-- /.navbar-collapse -->
</nav>
    <div ng-view></div>
    <div ng-include='"templates/footer.html"'></div>
</div>

        <?php /*
            if(isset($_REQUEST['content'])) {
                switch ($_REQUEST['content']) {
                    case 'admin':
                        include_once('partials/admin.php');
                        break;
                    
                    default:
                        # code...
                        break;
                }
            }*/
        ?>
<!-- Vendor: Javascripts -->

<script src="./js/lib/date.js"></script>


<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
<!-- Vendor: Angular, followed by our custom Javascripts -->
<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.4.2/angular.js"></script>
<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.4.2/angular-route.min.js"></script>

<script src="./js/lib/bootstrap-switch.min.js"></script>
<script src="./js/lib/ui-bootstrap-tpls-1.2.4.min.js"></script>

<script src="./js/app.js"></script>


<script src="./js/directives/bsSwitch.js"></script>
<script src="./js/directives/poseListView.js"></script>
<script src="./js/directives/yogaInstaFeed.js"></script>
<script src="./js/directives/yogaVideoList.js"></script>
<script src="./js/directives/yogaLinkFeed.js"></script>
<script src="./js/directives/yogaMediaViewer.js"></script>


<script src="./js/services/poseListService.js"></script>
<script src="./js/services/singlePoseService.js"></script>

<script src="./js/controllers/poseListCtrl.js"></script>
<script src="./js/controllers/singlePoseCtrl.js"></script>


<?php
    if(function_exists('post_angular')) {
        post_angular();
    }
?>
</html>