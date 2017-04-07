eventPlannerApp.controller('showEventCtrl', function ($scope,$routeParams,facebookService) {

	facebookService.getToken().then(function(token){
		facebookService.getEvent(token, $routeParams.eventId).then(function(event){
			$scope.event = event;
		}, function(error){
			//Error getting event
			console.log(error);
		});
	}, function(error){
		//Error getting token
		console.log(error);
	});

}); 