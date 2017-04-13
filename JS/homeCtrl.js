eventPlannerApp.controller('homeCtrl', function ($scope, $routeParams, $window, facebookService, eventService, geolocationService, firebaseService) {

	//Default setting is to have a distance of 5km, no date selection, and order results by time
	$scope.sort = "time";
	$scope.dateSelection = "";
	$scope.distance = 5;

	//Checking on authentication
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			//Getting user's list of events
			$scope.myEvents = firebaseService.getRef();
		}
	});

	$scope.addEvent = function(id,name,datetime,image){
		
		//chhecking if event already exists on the database
		firebaseService.checkBeforeAdding(id).once('value').then(function(snapshot) {
		  //if returned object is null, allow adding to continue
		  if(snapshot.val() === null) {
		  	$scope.myEvents.push({
				"eventDate" : datetime,
				"eventId" : id,
				"eventImage" : image,
				"eventName" : name
		    });
		  //otherwise let user know the new event is already saved
		  } else {
		  	
		  }
		});
	}

	var distance = 1000;
	var since = null;
	var until = null;
	var coords = {
		latitude: null,
		longitude: null
	}

	
	//Checking whether user is logged in / signed up
	facebookService.getToken().then(function(token){

		//Getting user's current position before requesting event data
		geolocationService.getCurrentPosition().then(function(coordinates){

			//Setting the global coords object
			coords.latitude = coordinates.coords.latitude;
			coords.longitude = coordinates.coords.longitude;

			//By default, getting events that are 1km from the user and sorting them by time
			$scope.events = eventService.get({
				accessToken: token,
				lat: coords.latitude,
				lng: coords.longitude,
				distance: distance,
				sort: $scope.sort
			});

		});

	//Redirecting user to login page if the facebook token is not available
	}, function(error){
		$window.location = "#!/login";
	});

	$scope.getEvents = function(){

		if($scope.dateSelection) {
			//Transforming selected date into the format the Graph API accepts
			since = new Date($scope.dateSelection).getTime() / 1000;
			//Adding a day to the date range
			until = since + 86400;
		} else {
			since = null;
			until = null;
		}

		distance = $scope.distance * 1000;

		//Getting the events with the parameters above
		facebookService.getToken().then(function(token){
			$scope.events = eventService.get({
					accessToken: token,
					lat: coords.latitude,
					lng: coords.longitude,
					distance: distance,
					sort: $scope.sort,
					since: since,
					until: until
				});
		});

	}

}); 