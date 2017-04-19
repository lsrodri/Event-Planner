eventPlannerApp.factory('eventService',function ($resource) {

	/*
		Implementation of facebook-events by location:
		https://www.npmjs.com/package/facebook-events-by-location

		As Heroku decides on ports, changed index.js line 19:

		app.set("port", process.env.PORT0 || 3000);

		to 

		app.set("port", process.env.PORT || 3000);
	*/
	
	return $resource("https://event-planner-fb-api.herokuapp.com/events",
		{
			accessToken: '@accessToken',
			lat: '@lat',
			lng: '@lng',
			distance: '@distance',
			sort: '@sort'
		});

});