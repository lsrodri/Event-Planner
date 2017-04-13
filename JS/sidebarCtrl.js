eventPlannerApp.controller('sidebarCtrl', function ($scope,$routeParams, firebaseService) {

	$scope.printFunc = function(){
		window.print();
	};

	$scope.removeEvent = function(id){
		delete $scope.myEvents[id];
		$scope.myEvents.$save();
	}

	//Checking on authentication
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			$scope.myEvents = firebaseService.getEvents();
		}
	});

}); 