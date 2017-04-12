eventPlannerApp.controller('sidebarCtrl', function ($scope,$routeParams, $firebaseObject, $firebaseArray) {

	$scope.printFunc = function(){
		window.print();
	};

	//Checking on authentication
	firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
		//Database name: events
	    var ref = firebase.database().ref("events");
		var uid = firebase.auth().currentUser.uid;
		//Getting only the events created by the user using uid
	 	var syncObject = $firebaseObject(ref.child(uid));
	 	//3-way data binding
	 	syncObject.$bindTo($scope, "events");
	  } 
	});

	$scope.addEvent = function(){

	}
 
}); 