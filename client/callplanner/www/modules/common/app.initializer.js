angular.module('initializer',[])
.run(function($rootScope, DBHandlerService, $ionicPlatform, AppContext) {
    console.log("module `initializer` starting...");
	$ionicPlatform.ready(function() {
		console.log("calling initializer.ready()");

		if(DBHandlerService.connect()) {
			DBHandlerService.init().then(function(res) {
				console.log("Database initialized.");
				$rootScope.$emit("onDatabaseReady", []);
			}, function(err) {
				console.log("Database init failed.");
			});
			console.log("finished to execute initializer.ready()");
		} else {
			console.log("ERROR : Database connection failed");
		}

		AppContext.init();
	});

});