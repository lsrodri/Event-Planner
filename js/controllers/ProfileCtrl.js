eventPlannerApp.controller('ProfileCtrl', function ($scope,$routeParams, firebaseService) {
/*
	$scope.name = firebase.auth().currentUser.displayName || "";
	$scope.avatar = firebase.auth().currentUser.photoURL || "";
*/
	firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
	    $scope.name = firebase.auth().currentUser.displayName;
		$scope.avatar = firebase.auth().currentUser.photoURL;
	  }
	});

}); 