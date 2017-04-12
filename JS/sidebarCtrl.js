eventPlannerApp.controller('sidebarCtrl', function ($scope,$routeParams, firebaseService) {

	$scope.printFunc = function(){
		window.print();
	};

	$scope.removeEvent = function(id){
		$scope.myEvents.$remove(id);
	}

	//Checking on authentication
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			$scope.myEvents = firebaseService.getEvents();
		}
	});
 


}); 