<!DOCTYPE html>
<html>
	<head>
		<link rel="stylesheet" href="vendor/bootstrap-3.3.4-dist/css/bootstrap.min.css">
		<link rel="stylesheet" href="vendor/bootstrap-3.3.4-dist/css/bootstrap-theme.min.css">
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css">
		<style type="text/css">
			.previous_conference {
				display: inline-block;
				border: 1px solid #EEE;
				width: 100px;
				height: 110px;
				border-radius: 2px;
				text-decoration: none;
				color: #888;
				padding: 5px;
				text-align: center;
			}
			.previous_conference:hover {
				color: #333;
				background-color: #F8F8F8;
				border: 1px solid #DDD;
			}
			.previous_conference .icon {
				width: 80px;
				height: 80px;
				display: block;
				margin-left: auto;
				margin-right: auto;
				opacity: 0.7;
				/*
				-webkit-filter: grayscale(100%);
				-moz-filter: grayscale(100%);
				filter: grayscale(100%);
				filter: gray;
				filter: url("data:image/svg+xml;utf8,<svg version='1.1' xmlns='http://www.w3.org/2000/svg' height='0'><filter id='greyscale'><feColorMatrix type='matrix' values='0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0' /></filter></svg>#greyscale");
				*/
			}
			.previous_conference .label {
				font-family: "Myriad Set Pro","Lucida Grande","Helvetica Neue","Helvetica","Arial","Verdana","sans-serif";
				font-size: 12px;
				text-align: center;
				margin-top: 5px;
				color: #888;
				padding: 0px;
				font-weight: 100;
			}
			.previous_conference:hover .icon {
				opacity: 1.0;
				-webkit-filter: none;
				-moz-filter: none;
				filter: none;
			}
			.features h2 {
				display: inline;
				font-size: 20px;
			}
			.features i {
				float: left;
				margin-right: 5px;
				font-size: 20px;
			}

			.content {
				padding-top: 30px;
				padding-bottom: 30px;
				border-top: 1px solid #333;
				border-bottom: 1px solid #333;
				position: relative;
				z-index: 999;
				box-shadow: 0px 0px 80px #000;
			}
			.header {
				border-top: 0px;
				border-bottom: 1px solid #E9B832;
				background-image: url('images/header.jpg');
				background-size: cover;
				background-position: 50% 50%;
				color: white;
				min-height: 300px;
			}
			.footer {
				border-bottom: 0px;
				border-top: 1px solid #E9B832;
				background-image: url('images/dark_stripes/dark_stripes.png');
			}

			.image {
				overflow: hidden;
				height: 300px;
			}
			.backgroundImage {
				overflow: hidden;
				height: 100%;
				background-size: cover;
				background-position: 50% 50%;
				position: relative;
			}
			#attendees {
				height: 400px;
			}
			#attendees .backgroundImage {
				background-image: url('images/header.jpg');
			}
			#chairs {
				height: 500px;
			}
			#chairs .backgroundImage {
				background-image: url('images/chairs.jpg');
			}
			.team img {
				height: 150px;
				box-shadow: 0px 0px 10px #000;
				border: 1px solid black;
			}
			.team .member {
				text-align: center;
			}
			.team .member label {
				display: block;
			}
			.primary p.overview {
				font-size: 1.4em;
				border-bottom: 1px solid #EEE;
				text-align: center;
				padding-bottom: 30px;
				margin-bottom: 30px;
			}

			.header, .footer {
				color: #E9B832;
				color: white;
				background-color: #333;
				z-index: 99999;
			}
			.header a, .footer a {
			}
			.samples {
				margin-top: 20px;
				padding-top: 20px;
				border-top: 1px solid #EEE;
			}
			img.platforms {
				margin-top: 20px;
				margin-bottom: 20px;
				margin-left: auto;
				margin-right: auto;
			}
			.platforms_container {
				text-align: center;
			}

			.header h1 {
				text-shadow: 0px 0px 5px rgb(0, 0, 0);
				color: #E9B832;
				font-size: 120px;
				font-weight: 100;
			}
			.header p {
				font-weight: 100;
				font-size: 25px;
				color: white;
			}
			.header .rightside {
				padding-top: 60px;
			}
			.footer a {
				color: #E9B832;
			}
			.features {
				border-bottom: 1px solid #EEE;
				margin-bottom: 20px;
				padding-bottom:20px;
			}

		</style>
		<title>ConfApp</title>
	</head>
	<body class="container-fluid">
		<div class="header row content">
			<div class="col-md-8">
				<h1>ConfApp</h1>
				<p class="explanation">Mobile program guides for conferences and conventions.</p>
			</div>
			<div class="rightside col-md-4">
				<a class="btn btn-xl btn-default btn-block" href="mailto:confapp@googlegroups.com?Subject=ConfApp Inquiry">Contact us</a>
				<a class="btn btn-xl btn-primary btn-block" href="http://admin.conf-app.com/" Inquiry">Conference Administrators</a>
			</div>
		</div>
		<div class="row primary content">
			<div class="col-md-12 platforms_container">
				<img src="images/platforms.jpg" class="platforms img-responsive" />
			</div>
			<p class="col-md-12 overview">
				ConfApp allows conference attendees to check the conference schedule, read papers and abstracts, view videos, and more directly on their phone. It works with any conference size; single-track to multi-track.
			</p>
			<div class="col-md-12 features">
				<div class="row">
					<div class="col-sm-3">
						<i class="fa fa-film fa-2x"></i>
						<h2>Video Preview</h2>
						<p>Include a short video for any program content so attendees can decide what they want to see.</p>
					</div>
					<div class="col-sm-3">
						<i class="fa fa-thumbs-o-up fa-2x"></i>
						<h2>Talk Voting</h2>
						<p>Let attendees vote on their favorite content of the conference. Use the results for an award!</p>
					</div>
					<div class="col-sm-3">
						<i class="fa fa-file-pdf-o fa-2x"></i>
						<h2>View PDFs</h2>
						<p>Include the PDF files of papers so attendees can read them in the app.</p>
					</div>
					<div class="col-sm-3">
						<i class="fa fa-map-marker fa-2x"></i>
						<h2>Conference Map</h2>
						<p>With a map of your conference space, attendees will always know where to go.</p>
					</div>
				</div>
				<div class="row">
					<div class="col-sm-3">
						<i class="fa fa-star fa-2x"></i>
						<h2>Save Favorites</h2>
						<p>Attendees can make a personalized schedule or save content to their reading list.</p>
					</div>
					<div class="col-sm-3">
						<i class="fa fa-mobile fa-2x"></i>
						<h2>Native Apps</h2>
						<p>With apps for Android and iOS attendees get a smooth platform-specific user experience.</p>
					</div>
					<div class="col-sm-3">
						<i class="fa fa-cloud-download fa-2x"></i>
						<h2>Offline Mode</h2>
						<p>Don't worry about spotty conference WiFi...these apps work offline</p>
					</div>
					<div class="col-sm-3">
						<i class="fa fa-dropbox fa-2x"></i>
						<h2>Automatic Syncing</h2>
						<p>Sign in with Dropbox to sync your favorites between devices.</p>
					</div>
				</div>
				<div class="row">
					<div class="col-sm-3">
						<i class="fa  fa-2x"></i>
						<h2></h2>
						<p></p>
					</div>
					<div class="col-sm-3">
						<i class="fa fa-trophy fa-2x"></i>
						<h2>Feature Award-Winning Papers</h2>
						<p>If you give awards, feature the papers in the app with special icons, or on their own list.</p>
					</div>
					<div class="col-sm-3">
						<i class="fa fa-desktop fa-2x"></i>
						<h2>Full-Featured Web Client </h2>
						<p>See the program online from any computer or device even if the app isn't installed.</p>
					</div>
					<div class="col-sm-3">
						<i class="fa  fa-2x"></i>
						<h2></h2>
						<p></p>
					</div>
				</div>
			</div>
			<div class='previous_labels col-sm-12'>
				<p>
					We have worked with a number of conferences, including:
				</p>
			</div>
			<div class = "previous conferences col-md-12">
				<div class ="row">
					<div class='previous_conferences col-sm-1'></div>
					<div class='previous_conferences col-sm-1'>
						<a class='previous_conference' href='http://its2014.org/' target='_blank' title='ACM International Conference on Interactive Tabletops and Surfaces'>
							<img src='images/conf_icons/ITS_2014.png' class='icon' />
							<div class='label'>ITS 2014</div>
						</a>
					</div>
					<div class='previous_conferences col-sm-1'>
						<a class='previous_conference' href='http://www.acm.org/uist/uist2014/' target='_blank' title='ACM Symposium on User Interface Software and Technology'>
							<img src='images/conf_icons/UIST_2014.png' class='icon' />
							<div class='label'>UIST 2014</div>
						</a>
					</div>
					<div class='previous_conferences col-sm-1'>
						<a class='previous_conference' href='http://chi2014.acm.org/' target='_blank' title='The ACM SIGCHI Conference on Human Factors in Computing Systems'>
							<img src='images/conf_icons/CHI_2014.jpg' class='icon' />
							<div class='label'>CHI 2014</div>
						</a>
					</div>
					<div class='previous_conferences col-sm-1'>
						<a class='previous_conference' href='http://www.acm.org/uist/uist2013/' title='ACM Symposium on User Interface Software and Technology'>
							<img src='images/conf_icons/UIST-ITS_2013.png' class='icon' />
							<div class='label'>UIST/ITS 2013</div>
						</a>
					</div>
					<div class='previous_conferences col-sm-1'>
						<a class='previous_conference' href='http://chi2013.acm.org' target='_blank' title='The ACM SIGCHI Conference on Human Factors in Computing Systems'>
							<img src='images/conf_icons/CHI_2013.jpg' class='icon' />
							<div class='label'>CHI 2013</div>
						</a>
					</div>
					<div class='previous_conferences col-sm-1'>
						<a class='previous_conference' href='http://www.ubicomp.org/ubicomp2012/' target='_blank' title='The International Conference on Ubiquitous Computing'>
							<img src='images/conf_icons/ubicomp_2012.png' class='icon' />
							<div class='label'>UbiComp 2012</div>
						</a>
					</div>
					<div class='previous_conferences col-sm-1'>
						<a class='previous_conference' href='http://chi2012.acm.org' target='_blank' title='The ACM SIGCHI Conference on Human Factors in Computing Systems'>
							<img src='images/conf_icons/CHI_2012.jpg' class='icon' />
							<div class='label'>CHI 2012</div>
						</a>
					</div>
					<div class='previous_conferences col-sm-1'>
						<a class='previous_conference' href='http://www.chi2011.org/' target='_blank' title='The ACM SIGCHI Conference on Human Factors in Computing Systems'>
							<img src='images/conf_icons/CHI_2011.png' class='icon' />
							<div class='label'>CHI 2011</div>
						</a>
					</div>
					<div class='previous_conferences col-sm-1'>
						<a class='previous_conference' href='http://www.chi2010.org/' target='_blank' title='The ACM SIGCHI Conference on Human Factors in Computing Systems'>
							<img src='images/conf_icons/CHI_2010.png' class='icon' />
							<div class='label'>CHI 2010</div>
						</a>
					</div>
				</div>
			</div>
			<div class='samples col-sm-12'>
				<p>Sample guides (from CHI 2014) are available for iOS, Android, and Web clients:</p>
				<a href="https://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=866933409&mt=8" target="_blank"><img src="images/ios_badge.png" /></a>
				<a href="https://play.google.com/store/apps/details?id=edu.cmu.hcii.confapp.chi2014.android" target="_blank"><img src="images/android_badge.png" /></a>
				<a class ="btn btn-default btn-xl" href="https://chi2014.acm.org/program/mobile/" target="_blank">View Web Guide</a>
			</div>
		</div>
		<div class="image row" id="chairs">
			<div class="backgroundImage"></div>
		</div>
		<div class="footer team row content">
			<div class = "col-sm-3">
				<h3>Team</h3>
				<p>If you are interested in using ConfApp, contact us at <a class="" href="mailto:confapp@googlegroups.com?Subject=ConfApp Inquiry">confapp@googlegroups.com</a></p>
			</div>
			<div class = "member col-sm-3">
				<a href="http://www.cs.cmu.edu/~ehayashi/" target="_blank">
					<img src="images/team/ehayashi.jpg" />
					<label>Eiji Hayashi</label>
				</a>
			</div>
			<div class = "member col-sm-3">
				<a href="http://from.so/" target="_blank">
					<img src="images/team/soney.jpg" />
					<label>Stephen Oney</label>
				</a>
			</div>
			<div class = "member col-sm-3">
				<a href="http://jasonwiese.net/" target="_blank">
					<img src="images/team/jwiese.jpg" />
					<label>Jason Wiese</label>
				</a>
			</div>
		</div>
	</body>
	<script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
	<script type="text/javascript">
		var lastScrollTop = 0,
			backgroundimages = $('.backgroundImage');

		$(window).scroll(function(){
			var st = $(this).scrollTop(),
				ah = $(this).height();

			backgroundimages.each(function(){
				var img = $(this),
					pos = img.position().top,
					hei = img.height();
				if ((st + ah) > pos && st < (pos + hei)){
					var p = ((pos - st)/ah) + 0.25;
					img.css('background-position', '50%'+(p*100)+'%');
				}
			});
			lastScrollTop = st;
		});

		$(window).scroll();
	</script>
</html>
