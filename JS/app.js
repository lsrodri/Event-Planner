var eventPlannerApp = angular.module('eventPlanner', ['ngRoute','ngResource']);

eventPlannerApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/Home', {
        templateUrl: 'Partials/home.html'
      }).
      when('/Event', {
        templateUrl: 'Partials/Event.html',
        controller: 'eventCtrl'
      }).
      when('/login', {
        templateUrl: 'Partials/Login.html',
        controller: 'loginCtrl'
      }).
      when('/MenuView', {
        templateUrl: 'Partials/MenuView.html',
        controller: 'menuViewCtrl'
      }).
      when('/ShowEvent',{
         templateUrl: 'Partials/ShowEvent.html',
         controller: 'showEventCtrl'
      }).
         when('/Sidebar',{
         templateUrl: 'Partials/Sidebar.html',
         controller: 'sidebarCtrl' 
      }).
      otherwise({
        redirectTo: '/Home'
      });
  }]); 

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAQmXz8Ehr5THimTgt2RRh2DsA0a0olAto",
  authDomain: "events-394dd.firebaseapp.com",
  databaseURL: "https://events-394dd.firebaseio.com",
  storageBucket: "events-394dd.appspot.com",
  messagingSenderId: "1034358825975"
};

firebase.initializeApp(config);

var provider = new firebase.auth.FacebookAuthProvider();

firebase.auth().getRedirectResult().then(function(result) {
  if (!result.credential) {
    window.location.hash = "#!/Login";
  }  
}).catch(function(error) {
  console.log(error.code + error.message + error.email + error.credential);
  window.location.hash = "#!/Login";
});