/**
 * Controls the Job Swapper Page
 */
app.controller('SwapperController', function($scope, UserService, MenuService, SwapperService) {
	console.log("SwapperController reporting for duty.");
 	$scope.loggedIn = false;

    var init = function() {
        getCurrentUser();
        $scope.tabs = MenuService.appsHash;
        $scope.activeTab = 2;
        $scope.jobs = SwapperService.getAllJobs();
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
    
    $scope.postJob = function(what, when, howMuch){
    	SwapperService.postJob(what,when,howMuch, $scope.currentUser).then(function(response){
			$scope.newJob = "";
			$scope.newWhen = "";
			$scope.newHowMuch = "";
    	});
    };
    
    $scope.removeJob = function(job){
    	if (job.uid == $scope.currentUser.uid){
			SwapperService.removeJob(job, $scope.jobs).then(function(){
			});
    	}
    	else{
    		alert("Sorry, you can't delete another person's job");
    	}	
    };
  
    	    
    init();

});