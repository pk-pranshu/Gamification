		var app = angular.module('myApp',[
				'ui.router',
				'mgcrea.ngStrap.popover', 
				'mgcrea.ngStrap.tooltip',
				'ngAnimate'
			]);

		app.config( ['$stateProvider', '$urlRouterProvider', function( $stateProvider, $urlRouterProvider ) {
				
				$urlRouterProvider.otherwise("/home");

				$stateProvider
					.state('home',{
						url:"/home",
						templateUrl:"../home.html"
					})
					.state('secondPage',{
						url:"/secondpage",
						templateUrl:"../secondPage.html"
					})
					.state('thirdPage',{
						url:"/thirdpage",
						templateUrl:"../thirdPage.html"
					})
					.state('fourthPage',{
						url:"/fourthPage",
						templateUrl:"../fourthPage.html"
					})
					.state('fifthPage',{
						url:"/fifthPage",
						templateUrl:"../fifthPage.html"
					})
					.state('sixthPage',{
						url:"/sixthPage",
						templateUrl:"../sixthPage.html"
					});
			}]);

		app.factory( "lodash", [ "$window", function( $window ) {
				if ( $window && $window._ ) {
					return $window._;
				} 
				else {
					throw new Error( "Js library 'Lo-Dash' is not available! Please make sure it has been added to the page." );
				}
			}]);

		app.controller('MainCtrl', [  "$scope","$timeout","$window","$rootScope", "$http", "$animate","lodash", "$state", function( $scope, $timeout, $window, $rootScope, $http, $animate, lodash, $state ) {
				
				$timeout(changePage,7000);

				function changePage(scope,element,attrs){

					$state.go('secondPage');
				}

				// $timeout(nextPage,75000);
				$timeout(nextPage,40000);


				function nextPage(scope,element,attrs){

					$state.go('thirdPage');

				}

				$timeout(fourthPageCall,53000);


				function fourthPageCall(scope,element,attrs){

					$state.go('fourthPage');
				}

				$timeout(fifthPageCall,68000);


				function fifthPageCall(scope,element,attrs){

					$state.go('fifthPage');
				}

				$timeout(sixthPageCall,79000);


				function sixthPageCall(scope,element,attrs){

					$state.go('sixthPage');
				}

				$http.get("data/data.json").success(function(response) {
					$scope.gems = response;
				});		

		}]);

		app.controller('homePageCtrl', [  "$scope","$timeout", "$animate","lodash", function( $scope, $timeout, $animate, lodash ) {


			var table = [
				"G", "", "91.224", 4, 5,
				"A", "", "92.90628", 5, 5,
				"M", "", "95.96", 6, 5,
				"I", "", "(98)", 7, 5,
				"F", "", "101.07", 8, 5,
				"I", "", "102.9055", 9, 5,
				"C", "", "106.42", 10, 5,
				"A", "", "107.8682", 11, 5,
				"T", "", "112.411", 12, 5,
				"I", "", "114.818", 13, 5,
				"O", "", "118.71", 14, 5,
				"N", "", "121.76", 15, 5,
			];

			var camera, scene, renderer;
			var controls;

			var objects = [];
			var targets = { table: [] };

			init();
			animate();

			function init() {

				camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
				camera.position.z = 3000;

				scene = new THREE.Scene();

				// table

				tileOpacity=0.1;

				for ( var i = 0; i < table.length; i += 5 ) {

					var element = document.createElement( 'div' );
					element.className = 'element';
					// element.style.backgroundColor = 'rgba(0,127,127,' + ( Math.random() * 0.5 + 0.25 ) + ')';

					if(i%2==0)
						tileOpacity=0.8;
					else
						tileOpacity=0.3;
					element.style.backgroundColor = 'rgba(0,127,255,' + (tileOpacity)+ ')';

					// tileOpacity+=0.07;

					var symbol = document.createElement( 'div' );
					symbol.className = 'symbol';
					symbol.textContent = table[ i ];
					element.appendChild( symbol );


					var object = new THREE.CSS3DObject( element );
					object.position.x = Math.random() * 800 - 200;
					object.position.y = Math.random() * 800 - 200;
					object.position.z = Math.random() * 800 - 200;
					scene.add( object );

					objects.push( object );

					var object = new THREE.Object3D();
					object.position.x = ( table[ i + 3 ] * 140 ) - 1330;
					object.position.y = - ( table[ i + 4 ] * 180 ) + 990;

					targets.table.push( object );

				}


				renderer = new THREE.CSS3DRenderer();
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.domElement.style.position = 'absolute';
				document.getElementById( 'container' ).appendChild( renderer.domElement );

				controls = new THREE.TrackballControls( camera, renderer.domElement );
				controls.rotateSpeed = 0.5;
				controls.minDistance = 500;
				controls.maxDistance = 1500;
				controls.addEventListener( 'change', render );

				transform( targets.table, 3000 );

				window.addEventListener( 'resize', onWindowResize, false );

			}

			function transform( targets, duration ) {

				TWEEN.removeAll();

				for ( var i = 0; i < objects.length; i ++ ) {

					var object = objects[ i ];
					var target = targets[ i ];

					new TWEEN.Tween( object.position )
						.to( { x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration )
						.easing( TWEEN.Easing.Exponential.InOut )
						.start();

					new TWEEN.Tween( object.rotation )
						.to( { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration )
						.easing( TWEEN.Easing.Exponential.InOut )
						.start();

				}

				new TWEEN.Tween( this )
					.to( {}, duration * 2 )
					.onUpdate( render )
					.start();

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

				render();

			}

			function animate() {

				requestAnimationFrame( animate );

				TWEEN.update();

				controls.update();

			}

			function render() {

				renderer.render( scene, camera );

			}

		}]);

		app.controller('secondPageCtrl', [  "$scope","$timeout","$rootScope", "$animate","lodash", function( $scope, $timeout, $rootScope, $animate, lodash ) {
		
			

				var idx = 0;
				var abc = function() {
					var dataLen = $scope.gems.length;

					if ( idx < dataLen  ) {
							$timeout( function() {
				
								var currentItem = $scope.gems[ idx ];
				
									if ( idx > 0 ) {	
										$scope.gems[ idx - 1 ].selected = false;
									}
				
									idx++;
									currentItem.selected = true;
									abc();
							}, 6000);
					}
				}
	
				$rootScope.$on( "tableRendered" , abc );


		}]);

		app.controller('thirdPageCtrl', [  "$scope","$timeout", "$animate","lodash", function( $scope, $timeout, $animate, lodash ) {

			var bgSecondPage = document.getElementById("bgSecondPage");   
			bgSecondPage.remove();

			i=1;     
    		$timeout(moveScoreCard,1500);

    			function moveScoreCard() {
       				 if(i<4)
        			{
            			$scope.detailsBlock = i;
            			i++;
            			$timeout(moveScoreCard,3500);
       				 }  
    			}

		}]);

		app.controller('fourthPageCtrl', [  "$scope","$timeout", "$animate","lodash", function( $scope, $timeout, $animate, lodash ) {

	        CountDownTimer('01/01/2016 00:01 AM', 'countid1','countid2','countid3','countid4');

	        function CountDownTimer(dt, id1, id2, id3, id4)
	        {
	            var end = new Date(dt);

	            var _second = 1000;
	            var _minute = _second * 60;
	            var _hour = _minute * 60;
	            var _day = _hour * 24;
	            var timer;

	            function showRemaining() {
	                var now = new Date();
	                var distance = end - now;
	                if (distance < 0) {

	                    clearInterval(timer);
	                    document.getElementById(id).innerHTML = 'EXPIRED!';

	                    return;
	                }
	                var days = Math.floor(distance / _day);
	                var hours = Math.floor((distance % _day) / _hour);
	                var minutes = Math.floor((distance % _hour) / _minute);
	                var seconds = Math.floor((distance % _minute) / _second);

	                document.getElementById(id1).innerHTML = days ;
	                document.getElementById(id2).innerHTML = hours;
	                document.getElementById(id3).innerHTML = minutes;
	                document.getElementById(id4).innerHTML = seconds;
	            }

	            timer = setInterval(showRemaining, 1000);
	        }

	        j=1;     
    		$timeout(moveBottomDiv,500);

    			function moveBottomDiv() {
       				 if(j<3){
            			$scope.bottomDiv = j;
            			j++;
            			$timeout(moveBottomDiv,5000);
       			}  
    		}
		}]);

		app.controller('fifthPageCtrl', [  "$scope","$timeout", "$interval", "$animate","lodash", function( $scope, $timeout,$interval, $animate, lodash ) {

			check1=$scope.gems[0].score;
			check2=$scope.gems[1].score;
			check3=$scope.gems[2].score;
			check4=$scope.gems[3].score;

			result1 = parseFloat(check1);
			result2 = parseFloat(check2);
			result3 = parseFloat(check3);
			result4 = parseFloat(check4);

			percentValue=document.querySelectorAll(".barText");
			percentValue[0].style.display='none';
			percentValue[1].style.display='none';
			percentValue[2].style.display='none';
			percentValue[3].style.display='none';

			$scope.width1=0;
			$scope.width2=0;
			$scope.width3=0;
			$scope.width4=0;


			$timeout(movebar1,2000);
			$timeout(movebar2,3000);
			$timeout(movebar3,4000);
			$timeout(movebar4,5000);


				function movebar1(){
					
					for( i=0;i<100;i++ )
					{
						if( i===result1 ){
							$scope.width1=result1;
							percentValue[0].style.display='block';
							break;
						}
						$scope.width1+=1;
					}
				}	

				function movebar2(){
					
					for( i=0;i<100;i++ )
					{
						if( i===result2 ){
							$scope.width2=result2;
							percentValue[1].style.display='block';
							break;
						}
						$scope.width2+=1;
					}
				}	

				function movebar3(){
					
					for( i=0;i<100;i++ )
					{
						if( i===result3 ){
							$scope.width3=result3;
							percentValue[2].style.display='block';
							break;
						}
						$scope.width3+=1;
					}
				}	

				function movebar4(){
					
					for( i=0;i<100;i++ )
					{
						if( i===result4 ){
							$scope.width4=result4;
							percentValue[3].style.display='block';
							break;
						}
						$scope.width4+=1;
					}
				}	
		}]);

		app.controller('sixthPageCtrl', [  "$scope","$timeout", "$interval", "$animate","lodash", function( $scope, $timeout,$interval, $animate, lodash ) {

			$timeout(moveTableLeft,5000);

			sideDiv=document.querySelector(".winnerName");
			sideDiv.style.display='none';


			function  moveTableLeft() {
				  	sideDiv=document.querySelector(".winnerName");
					sideDiv.style.display='block';
				}

			$timeout(changeBackground,11000);

				
				
				function changeBackground() {
					sideDiv.style.display='none';
		    		bg = document.querySelector(".sixthPage");
		    		bg.className += " changeScreen";
	   
			}		

		}]);

		app.directive("onFinish", [ "$timeout", "$rootScope", function( $timeout, $rootScope ) {
			return {
				restrict: "A",
				scope: false,
				link: function(scope, element, attrs) {
					if ( scope.$last ) {
						$timeout( function() {
							$rootScope.$emit( "tableRendered" );
						});	
					}
				}
			}
		}]);


		app.directive("repDetails", ["$popover", function($popover, $templateCache) {

			return {
				restrict: "E",
				scope: false,
				templateUrl: 'example.html',
				link: function(scope, element, attrs) {
				}
			}
		}]);


		app.directive("setBg",["$timeout",function($timeout){

			return{
				restrict:"A",
				scope:false,
				link:function(scope,element,attrs){


					if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

						var container, stats;
						var camera, scene, renderer, particles, geometry, materials = [], parameters, i, h, color, sprite, size;
						var mouseX = 0, mouseY = 0;

						var windowHalfX = window.innerWidth / 2;
						var windowHalfY = window.innerHeight / 2;

						init();
						animate();

						function init() {

							container = document.createElement( 'div' );
							container.setAttribute("id","bgFirstPage");
							document.body.appendChild( container );

							camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 2000 );
							camera.position.z = 1000;

							scene = new THREE.Scene();
							scene.fog = new THREE.FogExp2( 0x000000, 0.004 );

							geometry = new THREE.Geometry();

							sprite1 = THREE.ImageUtils.loadTexture( "textures/sprites/trophy-2-64.ico" );
							sprite2 = THREE.ImageUtils.loadTexture( "textures/sprites/trophy-2-64.ico" );
							sprite3 = THREE.ImageUtils.loadTexture( "textures/sprites/trophy-2-64.ico" );
							sprite4 = THREE.ImageUtils.loadTexture( "textures/sprites/trophy-2-64.ico" );
							sprite5 = THREE.ImageUtils.loadTexture( "textures/sprites/trophy-2-64.ico" );

							for ( i = 0; i < 2500; i ++ ) {

								var vertex = new THREE.Vector3();
								vertex.x = Math.random() * 2000 - 1000;
								vertex.y = Math.random() * 2000 - 1000;
								vertex.z = Math.random() * 2000 - 1000;

								geometry.vertices.push( vertex );

							}

						parameters = [ [ [1.0, 0.2, 0.5], sprite2, 20 ],
						   [ [0.95, 0.1, 0.5], sprite3, 15 ],
						   [ [0.90, 0.05, 0.5], sprite1, 10 ],
						   [ [0.85, 0, 0.5], sprite5, 8 ],
						   [ [0.80, 0, 0.5], sprite4, 5 ],
						   ];

						for ( i = 0; i < parameters.length; i ++ ) {

								color  = parameters[i][0];
								sprite = parameters[i][1];
								size   = parameters[i][2];

								materials[i] = new THREE.PointCloudMaterial( { size: size, map: sprite, blending: THREE.AdditiveBlending, depthTest: false, transparent : true } );
								// materials[i].color.setHSL( color[0], color[1], color[2] );
								materials[i].color.setRGB( 0, 0, 255 );


								particles = new THREE.PointCloud( geometry, materials[i] );

								particles.rotation.x = Math.random() * 6;
								particles.rotation.y = Math.random() * 6;
								particles.rotation.z = Math.random() * 6;

								scene.add( particles );

						}

							renderer = new THREE.WebGLRenderer();
							renderer.setPixelRatio( window.devicePixelRatio );
							renderer.setSize( window.innerWidth, window.innerHeight );
							container.appendChild( renderer.domElement );

							window.addEventListener( 'resize', onWindowResize, false );

						}

						function onWindowResize() {

							windowHalfX = window.innerWidth / 2;
							windowHalfY = window.innerHeight / 2;

							camera.aspect = window.innerWidth / window.innerHeight;
							camera.updateProjectionMatrix();

							renderer.setSize( window.innerWidth, window.innerHeight );

						}

						function animate() {

							requestAnimationFrame( animate );

							render();

						}

						function render() {

							var time = Date.now() * 0.00005;

							camera.position.x += ( mouseX - camera.position.x ) * 0.05;
							camera.position.y += ( - mouseY - camera.position.y ) * 0.05;

							camera.lookAt( scene.position );

							for ( i = 0; i < scene.children.length; i ++ ) {

								var object = scene.children[ i ];

								if ( object instanceof THREE.PointCloud ) {

									object.rotation.y = time * ( i < 4 ? i + 1 : - ( i + 1 ) );

							}

						}

								for ( i = 0; i < materials.length; i ++ ) {

									color = parameters[i][0];

									// h = ( 360 * ( color[0] + time ) % 360 ) / 360;
									// materials[i].color.setHSL( h, color[1], color[2] );

									h =  0;				
									materials[i].color.setRGB( h, 0,255  );

								}

							renderer.render( scene, camera );

						}


				}
			}

		}]);

		app.directive("setbackground", ["$timeout", function($timeout) {

			return{
				restrict:"A",
				scope:false,
				link:function(scope,element,attrs){


					var bgThirdPage = document.getElementById("bgFirstPage");   
					bgThirdPage.remove();

					if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

					var SCREEN_WIDTH = window.innerWidth,
					SCREEN_HEIGHT = window.innerHeight,

					r = 450,

					mouseX = 0, mouseY = 0,

					windowHalfX = window.innerWidth / 2,
					windowHalfY = window.innerHeight / 2,

					camera, scene, renderer;

					init();
					animate();

					function init() {

						var container;

						container = document.createElement( 'div' );
						container.setAttribute("id","bgSecondPage");
						document.body.appendChild( container );

						camera = new THREE.PerspectiveCamera( 80, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 3000 );
						camera.position.z = 1000;

						scene = new THREE.Scene();

						var i, line, vertex1, vertex2, material, p,
						parameters = [ [ 0.25, 0xff7700, 1, 2 ], [ 0.5, 0xff9900, 1, 1 ], [ 0.75, 0xffaa00, 0.75, 1 ], [ 1, 0xffaa00, 0.5, 1 ], [ 1.25, 0x000833, 0.8, 1 ],
						[ 3.0, 0xaaaaaa, 0.75, 2 ], [ 3.5, 0xffffff, 0.5, 1 ], [ 4.5, 0xffffff, 0.25, 1 ], [ 5.5, 0xffffff, 0.125, 1 ] ],

						geometry = new THREE.Geometry();


						for ( i = 0; i < 150; i ++ ) {

						    var vertex1 = new THREE.Vector3();
						    vertex1.x = Math.random() * 2 - 1;
						    vertex1.y = Math.random() * 2 - 1;
						    vertex1.z = Math.random() * 2 - 1;
						    vertex1.normalize();
						    vertex1.multiplyScalar( r );

						    vertex2 = vertex1.clone();
						    vertex2.multiplyScalar( Math.random() * 0.09 + 1 );

						    geometry.vertices.push( vertex1 );
						    geometry.vertices.push( vertex2 );

						}

						for( i = 0; i < parameters.length; ++ i ) {

						    p = parameters[ i ];

						    material = new THREE.LineBasicMaterial( { color: p[ 1 ], opacity: p[ 2 ], linewidth: p[ 3 ] } );

						    line = new THREE.Line( geometry, material, THREE.LinePieces );
						    line.scale.x = line.scale.y = line.scale.z = p[ 0 ];
						    line.originalScale = p[ 0 ];
						    line.rotation.y = Math.random() * Math.PI;
						    line.updateMatrix();
						    scene.add( line );

						}

							renderer = new THREE.WebGLRenderer( { antialias: true } );
							renderer.setPixelRatio( window.devicePixelRatio );
							renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
							container.appendChild( renderer.domElement );


				            //

				   		 window.addEventListener( 'resize', onWindowResize, false );

					}

					function onWindowResize() {

					    windowHalfX = window.innerWidth / 2;
					    windowHalfY = window.innerHeight / 2;

					    camera.aspect = window.innerWidth / window.innerHeight;
					    camera.updateProjectionMatrix();

					    renderer.setSize( window.innerWidth, window.innerHeight );

					}


					function animate() {

					    requestAnimationFrame( animate );

					    render();

					}

					function render() {

					    camera.position.y += ( - mouseY + 200 - camera.position.y ) * .05;
					    camera.lookAt( scene.position );

					    renderer.render( scene, camera );

					    var time = Date.now() * 0.0001;

				   		for ( var i = 0; i < scene.children.length; i ++ ) {

				       		 var object = scene.children[ i ];

				       		 if ( object instanceof THREE.Line ) {

				            		object.rotation.y = time * ( i < 4 ? ( i + 1 ) : - ( i + 1 ) );

				            		if ( i < 5 ) object.scale.x = object.scale.y = object.scale.z = object.originalScale * (i/5+1) * (1 + 0.5 * Math.sin( 7*time ) );

				        	}

				    	}

					}
				}
			}

		}]);