app.service("SwapperService",function($firebaseArray){

	var self = this;
	var refURL = "https://lca.firebaseio.com/jobs";
			
	self.getAllJobs = function(){
		var ref = new Firebase(refURL);
		var jobs = $firebaseArray(ref);
		return jobs;
	};
	
	self.postJob = function(what,when,howMuch, user){
		var jobs = self.getAllJobs();
		return jobs.$add({
			what: what,
    		when: when,
    		howMuch: howMuch,
    		firstName: user.firstName,
    		lastName: user.lastName,
    		uid: user.uid
		});
	};
	
	self.removeJob = function(job, jobs){
		return jobs.$remove(job);
	};
	
});