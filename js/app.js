var eventPlannerApp = angular.module('eventPlanner', ['ngRoute','ngResource', 'firebase', 'ngMap']);

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
        when('/Help', {
        templateUrl: 'Partials/Help.html',
      }).
      otherwise({
        redirectTo: '/Home'
      });
}]); 

eventPlannerApp.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);