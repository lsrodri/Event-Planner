eventPlannerApp.controller('sidebarCtrl', function ($scope,$routeParams, $firebaseObject, $firebaseArray) {

	//Initializing the 
	firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
	    var ref = firebase.database().ref("events");
		var uid = firebase.auth().currentUser.uid;
	 	var syncObject = $firebaseObject(ref.child(uid));
	 	syncObject.$bindTo($scope, "events");
	  } 
	});
 
}); 