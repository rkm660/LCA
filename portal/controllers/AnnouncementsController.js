/**
 * Controls the Announcements Page
 */
app.controller('AnnouncementsController', function($scope, $q, UserService, MenuService, AnnouncementsService, Utils) {
    console.log("AnnouncementsController reporting for duty.");
    $scope.loggedIn = false;
    $scope.submitPostButtonDisabled = false;

    var init = function() {
        getCurrentUser();
        $scope.tabs = MenuService.appsHash;
        $scope.activeTab = 1;
        loadAnnouncements();
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

    var loadAnnouncements = function() {
        $scope.announcements = AnnouncementsService.getAllAnnouncements();
    };

    $scope.formattedDate = function(timestamp) {
        return Utils.formatDate(parseInt(timestamp));
    };

    $scope.postAnnouncement = function(sub, body) {
        if (sub && sub.length > 0 && body && body.length > 0) {
            $scope.submitPostButtonDisabled = true;
            
            var originalFileNames = [];
			angular.forEach($scope.files, function(file){
				originalFileNames.push(file.name);
			});
			
            AnnouncementsService.postAnnouncement(sub, body, $scope.currentUser.uid, $scope.currentUser.firstName, $scope.currentUser.lastName, $scope.currentUser.position, originalFileNames)
                .then(function(announcement) {
                        var announcementKey = announcement.key();
                        var realFileNamesRef = new Firebase("https://lca.firebaseio.com/announcements/" + announcementKey);
                        var realFileNames = [];
                        angular.forEach(originalFileNames, function(fileName, index){
                        	realFileNames.push(announcementKey + index + "." + AnnouncementsService.getExtension(fileName));
                        });
                        realFileNamesRef.child("realFileNames").set(
                        	realFileNames
                        );
                        AnnouncementsService.uploadFiles($scope.files, announcementKey).success(function(response) {
							angular.forEach(response, function(fileName, index){
								console.log(fileName, index);
								if (fileName == "false"){
									alert("There was an error uploading your file.");
								}
							});
							
							alert("Successfully posted announcement!");
							$scope.announcementSubject = "";
							$scope.announcementBody = "";
							document.getElementById("fileUpload").value = "";
							$scope.submitPostButtonDisabled = false;
                    });
                })
        .catch(function(err) {
            alert("There has been an error: ", err);
            $scope.submitPostButtonDisabled = false;
        });
    }

};

$scope.filesChanged = function(elm) {
    $scope.files = elm.files;
    $scope.$apply();
};

init();
});