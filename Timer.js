/**A simple timer.
 * @param onstop {Function} The Function to be called when the time's up.
 * @param updateTimeString {Function} The Function to be called when the time String is updated. The String will be passed into it.
 * @param showH {Boolean} Whether to show time longer than 60 minutes as separate hours.
 * @param showOne {Boolean} Whether to show time shorter than 1 second.*/
const Timer = function(onstop, updateTimeString, showH, showOne) {
	//Times are in milliseconds
	this.time = 0;
	this.updateRate = 60;
	this.intervalId = 0;
	this.running = false;
	this.prev = null;
	this.onstop = onstop;
	this.updateTimeString = updateTimeString;
	this.showH = showH;
	this.showOne = showOne;
};
//Modified from https://stackoverflow.com/a/6313008 under CC BY-SA
Timer.format = function (number, showHour, showUnderOne) {
	var secondSum = number / 1000;
	if(!showUnderOne) secondSum = Math.floor(secondSum);
	var hours = showHour ? Math.floor(secondSum / 3600) : 0; //To show over an hour as minutes, assing 0 to hours when !showHour
	var minutes = Math.floor((secondSum - (hours * 3600)) / 60);
	var seconds = secondSum - (hours * 3600) - (minutes * 60);
	if(showUnderOne) seconds = seconds.toFixed(3);
	
	if (hours < 10) hours = '0' + hours;
	if (minutes < 10) minutes = '0' + minutes;
	if (seconds < 10) seconds = '0' + seconds;
	var result = "";
	if(showHour) result += hours + ':';
	result += minutes + ':' + seconds;
	return result;
};
Timer.prototype.getTimeString = function() {
	return Timer.format(this.time, this.showH, this.showOne);
}
Timer.prototype.addTime = function(amount) {
	this.time += amount;
	this.updateTimeString(this.getTimeString());
};
Timer.prototype.update = function() {
	if(!this.running) return;
	var started = new Date().getTime();
	if(this.prev === null) this.prev = started - this.updateRate;
	this.time -= started - this.prev;
	if(this.time <= 0) {
		this.stop();
		return; //If it doesn't return here, prev will be set to started and used wrongly in the next session
	}
	this.updateTimeString(this.getTimeString());
	this.prev = started;
};
Timer.prototype.start = function() {
	if(!this.running && this.time > 0) {
		if(this.prev !== null) alert("failsafe 0 triggered: prev !== null when starting");
		this.intervalId = setInterval(this.update, this.updateRate);
		this.running = true;
	}
};
Timer.prototype.pause = function() {
	if(this.running) {
		clearInterval(this.intervalId);
		this.running = false;
		this.prev = null;
	}
};
Timer.prototype.stop = function() {
		this.pause();
		this.time = 0;
		this.updateTimeString(this.getTimeString());
		this.onstop();
};