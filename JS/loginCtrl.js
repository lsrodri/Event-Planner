eventPlannerApp.controller('loginCtrl', function ($scope,$routeParams,$location) {

	firebase.auth().getRedirectResult().then(function(result) {
	  if (result.credential) {
	    $location.path("Home");
	    var token = result.credential.accessToken;
	    $.ajax("https://safe-wildwood-70333.herokuapp.com/events?lat=59.3293&lng=18.0686&distance=1000&sort=venue&accessToken=" + token).success(function(data){
	        console.log(data);
	    });
	  }  
	}).catch(function(error) {
	  console.log(error.code + error.message + error.email + error.credential);
	});

	$scope.fbLogin = function(){
		firebase.auth().signInWithRedirect(provider);
	}

}); 