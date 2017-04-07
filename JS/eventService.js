eventPlannerApp.factory('Events',function ($resource) {

	return $resource("https://safe-wildwood-70333.herokuapp.com/events?lat=59.3293&lng=18.0686&distance=1000&sort=venue&accessToken=:accessToken");

});