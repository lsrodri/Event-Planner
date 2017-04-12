eventPlannerApp.controller('sidebarCtrl', function ($scope,$routeParams, firebaseService) {

	$scope.printFunc = function(){
		window.print();
	};

	//Checking on authentication
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			$scope.myEvents = firebaseService.getEvents();
		}
	});
 
}); 