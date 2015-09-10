/**
 * Controls the Login Regsiter Page
 */
app.controller('LoginRegisterController', function($scope, UserService) {
    console.log("LoginRegisterController reporting for duty.");
    $scope.loggedIn = false;
	
	var init = function(){
		getCurrentUser();
	};
	
	//checks to see if user logged in
	var getCurrentUser = function(){		
		var ref = new Firebase("https://lca.firebaseio.com/");
		var user = ref.getAuth();
		if (user != null){
			$scope.loggedIn = true;
			UserService.getUserInfo(user.uid).then(function(user){
				$scope.currentUser = user.data;
			});
		}
	};
	
	
    $scope.signup = function() {
        console.log($scope.signupFirstName, $scope.signupLastName, $scope.signupEmail, $scope.signupPassword, $scope.signupPasswordConfirm, $scope.signupAI,
            $scope.signupPhone, $scope.signupPosition);
        if ($scope.signupFirstName && $scope.signupFirstName.length > 0 && $scope.signupLastName && $scope.signupLastName.length > 0 && $scope.signupEmail && $scope.signupEmail.length > 0 && $scope.signupPassword && $scope.signupPassword.length > 0 && $scope.signupPasswordConfirm && $scope.signupPasswordConfirm.length > 0 && $scope.signupAI && $scope.signupAI > 0 && $scope.signupPosition && $scope.signupPosition.length > 0 && $scope.signupPhone && $scope.signupPhone.length > 0) {
            var ref = new Firebase("https://lca.firebaseio.com/");
            ref.createUser({
                email: $scope.signupEmail,
                password: $scope.signupPassword
            }, function(error, userData) {
                if (error) {
                    console.log("Error creating user:", error);
                } else {
                    console.log("Successfully created user account with uid:", userData.uid);
                    var usersRef = new Firebase("https://lca.firebaseio.com/users/" + userData.uid );
                    usersRef.child("public").set({
                    	firstName: $scope.signupFirstName,
                    	lastName: $scope.signupLastName,
                    	email: $scope.signupEmail,
                    	AI: $scope.signupAI,
                    	position: $scope.signupPosition,
                    	phone: $scope.signupPhone
                    });
                }
            });
        };
    };

    $scope.login = function() {
        var ref = new Firebase("https://lca.firebaseio.com/");
        ref.authWithPassword({
            email: $scope.loginEmail,
            password: $scope.loginPassword
        }, function(error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            } else {
                console.log("Authenticated successfully with payload:", authData);
                getCurrentUser();
            }
        });

    };
    
    $scope.logout = function(){
    	var ref = new Firebase("https://lca.firebaseio.com/");
    	ref.unauth();
    	$scope.loggedIn = false;
    };
    
    $scope.forgotPassword = function(){
    	alert("For now, please see Rahul to reset your password.");
    };
    
    init();
});