eventPlannerApp.controller('loginCtrl', function ($scope,$routeParams, $window, facebookService) {

	facebookService.getToken().then(function(token){
		if(token) {
			$window.location = "#!/Home"
		}
	}, function(error){
		
	});

	$scope.fbLogin = function(){
		firebase.auth().signInWithRedirect(provider);
	}

}); 