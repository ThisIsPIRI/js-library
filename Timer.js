/**A simple timer.
 * @param onstop {Function} The Function to be called when the timer stops. A single Boolean, indicating whether the time ran out naturally, will be passed into it.
 * @param updateCallback {Function} The Function to be called when the time String is updated. The String will be passed into it.
 * @param format {Function} A Function that accepts an amount of time in milliseconds and two Booleans indicating
 * whether to show time over 1h/under 1s and returns a String representation of the time.
 * @param showH {Boolean} Whether to show time longer than 60 minutes as separate hours.
 * @param showOne {Boolean} Whether to show time shorter than 1 second.*/
const Timer = function(onstop, updateCallback, format, showH, showOne) {
	//Times are in milliseconds
	this.time = 0;
	this.updateRate = 60;
	this.intervalId = 0;
	this.running = false;
	this.prev = null;
	this.onstop = onstop;
	this.updateCallback = updateCallback;
	this.format = format;
	this.showH = showH;
	this.showOne = showOne;
};
Timer.prototype.getTimeString = function() {
	return this.format(this.time, this.showH, this.showOne);
};
Timer.prototype.updateTimeString = function() {
	this.updateCallback(this.getTimeString());
};
Timer.prototype.addTime = function(amount) {
	this.time += amount;
	if(this.time < 0) 
		this.time = 0;
	this.updateTimeString();
};
Timer.prototype.update = function() {
	if(!this.running) return;
	const started = Date.now();
	if(this.prev === null) this.prev = started - this.updateRate;
	this.time -= started - this.prev;
	if(this.time <= 0) {
		this.stop(true);
		return; //If it doesn't return here, prev will be set to started and used wrongly in the next session
	}
	this.updateTimeString();
	this.prev = started;
};
Timer.prototype.start = function() {
	if(!this.running && this.time > 0) {
		this.intervalId = setInterval(() => {this.update();}, this.updateRate);
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
/**Call to stop the timer.
 * @param timeRanOut {Boolean} Whether the time ran out naturally. Will be passed to onstop.*/
Timer.prototype.stop = function(timeRanOut) {
	this.pause();
	this.time = 0;
	this.updateTimeString();
	this.onstop(timeRanOut);
};
