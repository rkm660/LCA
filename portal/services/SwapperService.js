app.service("SwapperService",function($firebaseArray, $q){

	var self = this;
	var refURL = "https://lca.firebaseio.com/jobs";
			
	self.getAllJobs = function(){
		var ref = new Firebase(refURL);
		var jobs = $firebaseArray(ref);
		return jobs;
	};
	
	self.filterJobs = function(){
		var deferred = $q.defer();
		var today = Date.now();
		self.getAllJobs().$loaded().then(function(res){
			var removePromiseArray = [];
			angular.forEach(res, function(job){
				if (job.when < today){
					removePromiseArray.push(self.removeJob(job, res));
				}
			});
			$q.all(removePromiseArray).then(function(){
				deferred.resolve(true);	
			})
			.catch(function(err){
				console.log(err);
				deferred.reject(false);
			});
		});
		return deferred.promise;
	};
	
	self.postJob = function(what,when,howMuch, user){
		var jobs = self.getAllJobs();
		return jobs.$add({
			what: what,
    		when: when,
    		howMuch: howMuch ? howMuch : "",
    		firstName: user.firstName,
    		lastName: user.lastName,
    		uid: user.uid
		});
	};
	
	self.removeJob = function(job, jobs){
		return jobs.$remove(job);
	};
	
});