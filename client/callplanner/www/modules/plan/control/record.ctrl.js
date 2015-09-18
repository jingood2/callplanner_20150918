angular.module('callplanner.plan')
.controller('RecordCtrl', function($rootScope, $state, $scope, $ionicHistory, $timeout) {
	
	$scope.$on('$ionicView.enter', function(e) {
		console.log("Entered record page.");
		// $scope.recordSrc = new Date().getTime() + ".mp3";
		console.log("media src original path : " +  JSON.stringify($scope.recordSrc));
		// $scope.playSrc = '/sdcard/' + $scope.recordSrc;
		$scope.status = {
			playing: false,
			recording: false,
			recFileExist: false
		};
		// $scope.isDeviceReady = false; 
  	});



	document.addEventListener("deviceready", onDeviceReady, true);

	function onDeviceReady() {
		$timeout(function(){
			$scope.recordSrc = new Date().getTime() + ".mp3";
			$scope.playSrc = '/sdcard/' + $scope.recordSrc;
		    console.log("Device ready.");
		    $scope.isDeviceReady = true;
		    $scope.mediaRec = new Media($scope.recordSrc, 
				function(res) {
					console.log("success " + JSON.stringify(res));
					$scope.status.recording=false;
				}, 
				function(err) {
					console.log("error " + JSON.stringify(err));
					$scope.status.recording=false;
				},
				function(status) {
					console.log("status " + JSON.stringify(status));
				}
			);
		}, 200);
	}

	$scope.startRecord = function() {
		if(! $scope.isDeviceReady) {
			console.log("device not ready.")
			return;
		}
		$scope.mediaRec.startRecord();
		$scope.status.recording = true;
		$scope.status.recFileExist = true;
		console.log("media record started");
		console.log("media: " + JSON.stringify($scope.mediaRec));
	};
	$scope.stopRecord = function() {
		$scope.mediaRec.stopRecord();
		$scope.mediaRec.release();
		$scope.status.recording = false;
		console.log("media record stopped");
		console.log("media: " + JSON.stringify($scope.mediaRec));
	};
	
	$scope.play = function() {
		console.log("recorded file : " +  JSON.stringify($scope.mediaRec));
		console.log("system path : " + window.location.pathname);
		$scope.mediaPlay = new Media($scope.playSrc,
			function(res) {
				console.log("play success " + JSON.stringify(res));
				$scope.status.playing=false;
				$scope.$apply();
				console.log("changed to " + $scope.status.playing);
			}, 
			function(err) {
				console.log("play error " + JSON.stringify(err));
				$scope.status.playing=false;
			},
			function(status) {
				console.log("play status " + JSON.stringify(status));
			}
		);

		$scope.mediaPlay.play();
		$scope.status.playing = true;
		console.log("media started");
		console.log("media: " + JSON.stringify($scope.mediaPlay));
	};
	
	$scope.stop = function() {
		console.log("stats" + " " + $scope.status.playing + " " + $scope.status.recording + " " + $scope.status.recFileExist);

		$scope.mediaPlay.stop();
		$scope.status.playing = false;
		console.log("media stopped");
		console.log("media: " + JSON.stringify($scope.mediaPlay));
	};
	
	$scope.goBack = function() {
		if($scope.status.playing) {
			$scope.mediaPlay.stop();
		}
		if($scope.status.recording) {
			$scope.mediaRec.stop();
		}
		if($scope.status.recFileExist) {
			releaseMediaFiles();
		}
	    $state.go('createplan');
	};
	var releaseMediaFiles = function() {
		if($scope.mediaPlay)
			$scope.mediaPlay.release();
		if($scope.mediaRec)
			$scope.mediaRec.release();
	};
	$scope.submit = function() {
		if($scope.status.playing) {
			$scope.mediaPlay.stop();
		}
		if($scope.status.recording) {
			$scope.mediaRec.stop();
		}
		if($scope.status.recFileExist) {
			releaseMediaFiles();
		}
		$rootScope.$emit('record_done', [true, $scope.playSrc]);
		$state.go('createplan');
		
	};


});
