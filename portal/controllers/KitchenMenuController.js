/**
 * Controls the Kitchen Menu Page
 */
app.controller('KitchenMenuController', function($scope, $http, MenuService, UserService) {
    console.log("KitchenMenuController reporting for duty.");

    $scope.loggedIn = false;
    var init = function() {
        getCurrentUser();
        $scope.tabs = MenuService.appsHash;
        $scope.activeTab = 5;
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

    $scope.filesChanged = function(elm) {
    	$scope.files = elm.files;
    	$scope.$apply();
    };
    
    $scope.uploadFiles = function(){
    	var fd = new FormData();
    	angular.forEach($scope.files, function(file){
    		fd.append("file", file);
    	});
    	
    	$http.post("portal/files/uploadMenu.php", fd, {
    		transformRequest : angular.identity,
    		headers : {"Content-Type" : undefined}
    	})
    	.success(function(res){
    		console.log(res);
    		document.getElementById('pdf').contentDocument.location.reload();
    	});
    };

    init();
});
