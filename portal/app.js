/**
 * Main Application
 */
var app = angular.module('portalApp', [
  'ngRoute', 'firebase', 'ngTouch'
]);

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home
    .when("/", {templateUrl: "portal/partials/home.html", controller: "HomeController"})
    .when("/announcements", {templateUrl: "portal/partials/announcements.html",controller: "AnnouncementsController"})
    .when("/jobSwapper", {templateUrl: "portal/partials/swapper.html",controller: "SwapperController"})
    .otherwise("/404", {templateUrl: "portal/partials/404.html", controller: "404Controller"});
}]);

