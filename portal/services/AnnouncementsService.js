/**
 * Service for Announcements manipulation
 */
 
app.service("AnnouncementsService",function($firebaseArray, $q, $http){
	
	var refURL = "https://lca.firebaseio.com/announcements/";
		
	this.getAllAnnouncements = function(){
		var ref = new Firebase(refURL);
		var announcements = $firebaseArray(ref);
		return announcements;
	};
	
	this.postAnnouncement = function(sub, body, uid, fName, lName, pos, origFileNames){
		var userAnnouncements = this.getAllAnnouncements();
		return userAnnouncements.$add({
			subject: sub,
			body: body, 
			dateTime: Firebase.ServerValue.TIMESTAMP,
			uid: uid,
			firstName: fName,
			lastName: lName,
			position: pos,
			originalFileNames : origFileNames
		});
	};
	
	this.uploadFiles = function(files, key){
    	var fd = new FormData();
    	var i = 0;
    	angular.forEach(files, function(file){
    		fd.append(key+i.toString(), file);
    		i++;
    	});
    	
    	return $http.post("portal/files/announcements/uploadAnnouncement.php", fd, {
    		transformRequest : angular.identity,
    		headers : {"Content-Type" : undefined}
    	});
    };
    
    this.getExtension = function(fileName){
    	 return fileName.split('.').pop();
    };
	
});