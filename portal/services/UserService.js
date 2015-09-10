/**
 * Service for user manipulation
 */
 
app.service("UserService",function($http){
	
	this.getUserInfo = function(uid){
		return $http.get("https://lca.firebaseio.com/users/"+uid+"/public.json");
	};
	
	
});