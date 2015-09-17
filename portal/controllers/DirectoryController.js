/**
 * Controls the Directory Page
 */
app.controller('DirectoryController', function($scope, $http, MenuService, UserService) {
    console.log("DirectoryController reporting for duty.");
	
    $scope.loggedIn = false;
    var init = function() {
        getCurrentUser();
        $scope.tabs = MenuService.appsHash;
        $scope.activeTab = 7;
        $scope.users = [];
        UserService.getUsers().then(function(users){
        	angular.forEach(users.data, function(user){
        		UserService.getUserInfo(user.public.uid).then(function(u){
        			$scope.users.push(u.data);
        		});
        	});
        });
    };

    //checks to see if user logged in
    var getCurrentUser = function() {
        var ref = new Firebase("https://lca.firebaseio.com/");
        var user = ref.getAuth();
        if (user != null) {
            $scope.loggedIn = true;
            UserService.getUserInfo(user.uid).then(function(u) {
                $scope.currentUser = u.data;
                $scope.currentUser.uid = user.uid;
            });
        }
    };
	
	
	
	init();
});