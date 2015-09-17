/**
 * Main Application
 */
var app = angular.module('portalApp', [
  'ngRoute', 'firebase', 'ngTouch','mgcrea.ngStrap'
]);

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home
    .when("/", {templateUrl: "portal/partials/home.html", controller: "HomeController"})
    .when("/announcements", {templateUrl: "portal/partials/announcements.html",controller: "AnnouncementsController"})
    .when("/jobSwap", {templateUrl: "portal/partials/swapper.html",controller: "SwapperController"})
    .when("/kitchenMenu", {templateUrl: "portal/partials/kitchenMenu.html",controller: "KitchenMenuController"})    
    .when("/TP", {templateUrl: "portal/partials/toiletPaper.html",controller: "ToiletPaperController"})    
    .when("/directory", {templateUrl: "portal/partials/directory.html",controller: "DirectoryController"})    

    .otherwise("/404", {templateUrl: "portal/partials/404.html", controller: "404Controller"});
}]);
