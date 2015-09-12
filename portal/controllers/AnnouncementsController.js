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
            AnnouncementsService.postAnnouncement(sub, body, $scope.currentUser.uid, $scope.currentUser.firstName, $scope.currentUser.lastName, $scope.currentUser.position)
                .then(function(res) {
                    alert("Successfully posted!");
                    $scope.announcementSubject = "";
                    $scope.announcementBody = "";
                    $scope.submitPostButtonDisabled = false;
                })
                .catch(function(err) {
                    alert("There has been an error: ", err);
                    $scope.submitPostButtonDisabled = false;
                });
        }

    };

    init();
});