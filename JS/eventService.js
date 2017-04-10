eventPlannerApp.factory('eventService',function ($resource) {

	return $resource("https://safe-wildwood-70333.herokuapp.com/events",
		{
			accessToken: '@accessToken',
			lat: '@lat',
			lng: '@lng',
			distance: '@distance',
			sort: '@sort'
		});

});