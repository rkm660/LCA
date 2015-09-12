/**
 * Service for user manipulation
 */

app.service("UserService", function($http, $q) {
			
			var self = this;


            self.getUserInfo = function(uid) {
                return $http.get("https://lca.firebaseio.com/users/" + uid + "/public.json");
            };

            self.setPosition = function(user, position) {
                console.log(user);
                var ref = new Firebase("https://lca.firebaseio.com/users/" + user.uid + "/public");
                user.position = position;
                ref.update(user, function(error) {
                        if (!error) {
                            alert("Update successful");
                        } else {
                            alert("There was an error: ", error);
                        }
                    });
                };
        	
        	var getUsers = function(){
        		return $http.get("https://lca.firebaseio.com/users.json");
        	}       
        	
        	self.userPositionHash = function(){
        		var deferred = $q.defer();
        		getUsers().then(function(res){
        			var hash = {};
        			angular.forEach(res.data, function(response){
        				hash[response.public.uid] = response.public.position;
        			});
        			deferred.resolve(hash);
        		});
        		return deferred.promise;
        	};
        	
        	
        		                
            });