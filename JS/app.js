var eventPlannerApp = angular.module('eventPlanner', ['ngRoute','ngResource', 'firebase']);

eventPlannerApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/Home', {
        templateUrl: 'Partials/home.html',
        controller: 'homeCtrl'
      }).
      when('/login', {
        templateUrl: 'Partials/Login.html',
        controller: 'loginCtrl'
      }).
      when('/MenuView/', {
        templateUrl: 'Partials/MenuView.html',
        controller: 'menuViewCtrl'
      }).
      when('/ShowEvent/:eventId',{
         templateUrl: 'Partials/ShowEvent.html',
         controller: 'showEventCtrl'
      }).
         when('/Sidebar',{
         templateUrl: 'Partials/Sidebar.html',
         controller: 'sidebarCtrl' 
      }).
         when('/Header', {
        templateUrl: 'Partials/Header.html',
        controller: 'headerCtrl'
      }).
         when('/Profile', {
        templateUrl: 'Partials/Profile.html',
        controller: 'ProfileCtrl'
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
  messagingSenderId: "1034358825975",
  projectId: "events-394dd"
};

firebase.initializeApp(config);

var provider = new firebase.auth.FacebookAuthProvider();