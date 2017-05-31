eventPlannerApp.controller('sidebarCtrl', function ($scope,$routeParams, firebaseService, alertService) {

	$scope.printFunc = function(){
		window.print();
	};

	$scope.removeEvent = function(id){
		
		alertService.add("alert-success", "Removed from your list!", 4000);

		delete $scope.myEvents[id];
		$scope.myEvents.$save();
		
	}

	//Checking on authentication
	
	/*firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			$scope.myEvents = firebaseService.getEvents();
		}
	});*/

	//Checking on authentication
	firebaseService.checkAuth(function(){
		//Assigning the firebase object to myEvents
		$scope.myEvents = firebaseService.getEvents();
	});

}); 