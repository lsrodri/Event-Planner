eventPlannerApp.controller('headerCtrl', function ($scope, $routeParams, alertService) {

	firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
	    $scope.name = firebase.auth().currentUser.displayName;
		  $scope.avatar = firebase.auth().currentUser.photoURL;
	  }
	});

  //Adding alerts to the header
  $scope.alerts = alertService.get();

  $scope.closeAlert = function(index){
    alertService.closeAlert(index);
  }

	/* When the user clicks on the button, 
  toggle between hiding and showing the dropdown content */
  $scope.magda= function(){
      document.getElementById("myDropdown").classList.toggle("show");
  }

  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {

      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

}); 