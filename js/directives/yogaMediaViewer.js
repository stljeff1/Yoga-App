//define(['app'], function(app) {
angular.module('YogaPoseApp')
	.directive('yogaMediaViewer', function() {
		return {
			restrict: 'AC',
			/*scope: {
				pose: '=',
				mediaObj: '='
			},*/
			scope: false,
			replace: true,
			template: '<div class=""><div class="media-content"><img src="{{pose.image.url}}" style="max-width: 200px;"/></div><div>',
			link: function($scope, $el, $attrs) {
				//scope.watch mediaObj

				var contentTpl= {
					youtube: function(obj) {
						console.log(obj);
						var html = '<h4>'+obj.title+'</h4><div class="embed-responsive embed-responsive-4by3"><iframe class="" src="https://www.youtube.com/embed/'+obj.locator+'" frameborder="0" allowfullscreen></iframe></div>';
						if(obj.tags && obj.tags.length) {
							html += '<p>Tags: ';
							for(var i = 0; i < obj.tags.length; i++) {
								html += '<a href="#">' + obj.tags[i].tagName + '</a>';
								if(i < obj.tags.length - 1)
									html += ', ';
							}
							html += '</p>';
						}
						html += '</div>'
						return html;
					},
					instagram: function(obj) {
						var html, user, type, media, date,  caption;

						var titleEL, mediaRow, captionRow;
						type = obj.type;
						user = obj.user,

						media = obj.media,

						date = obj.date

						caption = obj.caption;


						titleEL = "<div class='media'><div class='media-left'><a href='https://www.instagram.com/"+user.name+"'><img class='instagram-profile-pic' src='"+user.pic+"'/></a></div> ";
						titleEL += "<div class='media-body'><h4 class='media-heading'><a href='https://www.instagram.com/"+user.name+"'>"+user.name+"</a></h4>Published:"+date+"</div></div>";

						if(type == "video") {
							console.log('showVideo');
							mediaRow = "<div class='instagram-video'></div>";
						}
						else {
							mediaRow = "<div class='instagram-image'><a href='"+media.link+"' target='_blank'><img class='img-responsive' src='"+media.obj.standard_resolution.url+"'/></a></div>";
						}

						captionRow = "<div class='instagramCaption'><h4>Caption</h4><p>"+caption+"</p></div>";
						if(obj.myTags && obj.myTags.length) {
							captionRow += "<div class='instagramCaption'><h4>Internal Tags:</h4><p>";
							for(var i = 0; i < obj.myTags.length; i++) {
								captionRow += '<a href="#">' + obj.myTags[i].tagName + '</a>';
								if(i < obj.myTags.length - 1)
									captionRow += ', ';
							}
							captionRow += '</p></div>';
						}


						//console.log(titleEL + mediaRow + captionRow);
						return titleEL + mediaRow + captionRow;

						//$el.find('.media-content').html('').append(titleEL).append(mediaRow).append(captionRow);

					}
				}

				$scope.$watch('mediaObj', function(newVal, oldVal) {
					if(newVal) {
						var content = '';
						if((typeof newVal) == "string") {
							if(newVal.match(/\.(?:jpg|gif|png)$/)) {
								content = '<img src="'+newVal+'"/>';
							}
							else if(newVal.length == 11) {
								content = contentTpl.youtube(newVal);
							}
						}
						else if((typeof newVal) == "object") {
							if((newVal.link && newVal.link.indexOf('instagram') > -1) || newVal.asset_type == 4)
								content = contentTpl.instagram(newVal);
							else if(newVal.locator)
								content = contentTpl.youtube(newVal);
						}
						else {
							content = "<a href='"+newVal+"' target='_blank'>"+newVal+"</a>";
						}
						$el.find('.media-content').html(content);
						console.log('showing', newVal);
						$scope.$emit('newMedia', newVal)
					}
				}, true);
			}
		}
	});


//})