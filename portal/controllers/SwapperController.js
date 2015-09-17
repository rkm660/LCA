/**
 * Controls the Job Swapper Page
 */
app.controller('SwapperController', function($scope, UserService, MenuService, SwapperService, Utils) {
    console.log("SwapperController reporting for duty.");
    $scope.loggedIn = false;
	$scope.times = ["Midnight","1 AM","2 AM","3 AM","4 AM","5 AM","6 AM","7 AM","8 AM","9 AM","10 AM","11 AM","12 PM","1 PM","2 PM","3 PM","4 PM","5 PM","6 PM","7 PM","8 PM","9 PM","10 PM","11 PM"];
	$scope.newTimeJob = $scope.times[0];
	
    var init = function() {
        getCurrentUser();
        $scope.tabs = MenuService.appsHash;
        $scope.activeTab = 2;
        SwapperService.filterJobs();
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

    $scope.postJob = function(what, when, time, howMuch) {
    	var index = $scope.times.indexOf(time);
    	var dateToPass = index > 1 ? when + 3600000 * (index) : when;
        if (what && what.length > 0 && when) {
            SwapperService.postJob(what, dateToPass, howMuch, $scope.currentUser).then(function(response) {
                $scope.newJob = "";
                $scope.newHowMuchJob = "";
                $scope.newTimeJob = $scope.times[0];
            });
        }
    };
    
    $scope.formatDate = function(timestamp){
    	return Utils.formatDate(timestamp);
    };

    $scope.removeJob = function(job) {
        if (job.uid == $scope.currentUser.uid) {
            SwapperService.removeJob(job, $scope.jobs).then(function() {});
        } else {
            alert("Sorry, you can't delete another person's job");
        }
    };
    
    $scope.notifyOwner = function(job){
    	UserService.getUserInfo(job.uid).then(function(u){
    	    alert(u.data.firstName + "'s phone number is " +  u.data.phone + " and his email address is " + u.data.email);
    	});
    };
    
    init();
});
