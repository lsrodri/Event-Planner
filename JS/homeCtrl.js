eventPlannerApp.controller('homeCtrl', function ($scope, $routeParams, $window, facebookService, Events) {

	facebookService.getToken().then(function(token){
		$scope.events = Events.get(
			{
				accessToken: token,
				lat: '59.3293',
				lng: '18.0686',
				distance: 1000,
				sort: 'venue'
			});
	}, function(error){
		$window.location = "#!/login";
	});

}); 