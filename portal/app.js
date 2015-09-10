/**
 * Main Application
 */
var app = angular.module('portalApp', [
  'ngRoute', 'firebase'
]);

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home
    .when("/", {templateUrl: "portal/partials/loginRegister.html", controller: "LoginRegisterController"})
    
    .otherwise("/404", {templateUrl: "portal/partials/404.html", controller: "404Controller"});
}]);

