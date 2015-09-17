/**
 * Utils service
 */
 
app.service("Utils",function(){
	
	this.formatDate = function(timestamp) {
        var d = new Date(timestamp);
        var weekday = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");
        var monthname = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
        var hours = d.getHours();
        var minutes = d.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        var formattedDate = weekday[d.getDay()] + ' ' + monthname[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear() + " - " + strTime;
        return formattedDate;
    };
    
});