/**
 * Service for menu 
 */
 
app.service("MenuService",function(){
	
	this.appsHash = {
		"a": ["", "Home"],
		"b": ["announcements", "Announcements"],
		"c": ["jobSwap" , "Job Swap"],
		//"d": ["calendar", "Calendar"],
		"d": ["rush" , "Rush"],
		"f": ["points", "Points"],
		//"h": ["caps",  "Caps = Trash"],
		"g": ["kitchenMenu", "Kitchen Menu"],
		"j": ["TP" , "Toilet Paper"],
		//"ja": ["minutes","Chapter Minutes"],
		"k": ["directory","Directory"],
		"l": ["polls", "Polls"]
	};
	
});