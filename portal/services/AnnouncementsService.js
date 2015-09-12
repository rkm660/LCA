/**
 * Service for Announcements manipulation
 */
 
app.service("AnnouncementsService",function($firebaseArray, $q){
	
	var refURL = "https://lca.firebaseio.com/announcements/";
		
	this.getAllAnnouncements = function(){
		var ref = new Firebase(refURL);
		var announcements = $firebaseArray(ref);
		return announcements;
	};
	
	this.postAnnouncement = function(sub, body, uid, fName, lName, pos){
		var userAnnouncements = this.getAllAnnouncements();
		return userAnnouncements.$add({
			subject: sub,
			body: body, 
			dateTime: Firebase.ServerValue.TIMESTAMP,
			uid: uid,
			firstName: fName,
			lastName: lName,
			position: pos
		});
	};
	
});