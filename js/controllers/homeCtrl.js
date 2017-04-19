eventPlannerApp.controller('homeCtrl', function ($scope, $routeParams, $window, facebookService, eventService, geolocationService, firebaseService, alertService) {

	//Default setting is to have a distance of 5km, no date selection, and order results by time
	$scope.sort = "time";
	$scope.dateSelection = "";
	$scope.distance = 5;
	$scope.loading = true;

	//Checking on authentication
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			//Getting user's list of events
			$scope.myEvents = firebaseService.getRef();
		}
	});


	$scope.addEvent = function(id,name,datetime,image){
		
		//checking if event already exists on the database
		firebaseService.checkBeforeAdding(id).once('value').then(function(snapshot) {
		  //if event is not already in the user's list, allow adding to continue
		  if(snapshot.val() === null) {
		  	/*
		  	Firebase allows a 3-way data binding,
		  	so it is not necessary to call a service as updating the
		  	appropriate variable in the scope updates the service
		  	*/
		  	$scope.myEvents.push({
				"eventDate" : datetime,
				"eventId" : id,
				"eventImage" : image,
				"eventName" : name
		    });

		    $scope.$apply(function () {
		  		alertService.add("alert-success", "Added to your list!", 4000);
		  	});

		  //otherwise let user know the new event is already saved
		  } else {
		  	//Telling users that the event is already in their list of events
		  	$scope.$apply(function () {
		  		alertService.add("alert-warning", "This event already exists in your list.", 4000);
		  	});

		  }

		}, function(error){
			$scope.$apply(function () {
		  		alertService.add("alert-warning", "Unable to save event. Please check your internet connection.", 4000);
		  	});
		});
	}

	var distance = 5000;
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
			}, function(){
				//success function
				$scope.loading = false;
			}, function(error){
				//error function
				$scope.loading = false;
		  		alertService.add("alert-warning", "Unable to fetch events. Please check your internet connection.");
			});

		}, function(error) {
			$scope.loading = false;
	  		alertService.add("alert-warning", "Location Unavailable. Please check your browser settings.", 4000);
		});

	//Redirecting user to login page if the facebook token is not available
	}, function(error){
		$window.location = "#!/login";
	});

	$scope.getEvents = function(){

		$scope.loading = true;
		if($scope.dateSelection) {
			//Transforming selected date into the format the Graph API accepts
			since = new Date($scope.dateSelection).getTime() / 1000;
			//Adding a day to the date range
			until = since + 86400;
		} else {
			//clearing the time constraints in case it isn't selected
			since = null;
			until = null;
		}

		//transforming the distance to kilometers
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
			}, function(){
				//success function
				$scope.loading = false;
			}, function(error){
				//error function
		  		alertService.add("alert-warning", "Unable to fetch events. Please check your internet connection.");
		  		$scope.loading = false;
			});
		});

	}

}); 