eventPlannerApp.controller('homeCtrl', function ($scope, $routeParams, $window, facebookService, Events) {

	facebookService.getToken().then(function(token){
		$scope.events = Events.get({accessToken:token});
	}, function(error){
		$window.location = "#!/login";
	});

}); 