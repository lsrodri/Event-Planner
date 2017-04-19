eventPlannerApp.controller('ProfileCtrl', function ($scope,$routeParams) {

	firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
	    $scope.name = firebase.auth().currentUser.displayName;
		$scope.avatar = firebase.auth().currentUser.photoURL;
	  }
	});



}); 