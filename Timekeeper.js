"use strict";

/**A simple abstract timekeeper.
 * You must Object.assign() an Object with functions updateState() and startCondition() to instances of this before starting them. See TimerMixin for an example.
 * @param onstop {Function} The Function to be called when the timer stops. A single Boolean, indicating whether the time ran out naturally, will be passed into it.
 * @param onchange {Function} The Function to be called when the time field changes. The field's value will be passed into it.*/
const Timekeeper = function(onstop, onchange) {
	//Times are in milliseconds
	this.time = 0;
	this.updateRate = 60;
	this.intervalId = 0;
	this.running = false;
	this.prev = null;
	this.onstop = onstop;
	this.onchange = onchange;
};
Timekeeper.prototype.addTime = function(amount) {
	this.time += amount;
	if(this.time < 0)
		this.time = 0;
	this.onchange(this.time);
};
Timekeeper.prototype.pause = function() {
	if(this.running) {
		clearInterval(this.intervalId);
		this.running = false;
		this.prev = null;
	}
};
/**Call to stop the timer.
 * @param timeRanOut {Boolean} Whether the time ran out naturally. Will be passed to onstop.*/
Timekeeper.prototype.stop = function(timeRanOut) {
	this.pause();
	this.time = 0;
	this.onchange(this.time);
	this.onstop(timeRanOut);
};
Timekeeper.prototype.start = function() {
	if(!this.running && this.startCondition()) {
		this.prev = Date.now();
		this.intervalId = setInterval(() => this.update(), this.updateRate);
		this.running = true;
	}
};
Timekeeper.prototype.update = function() {
	if(!this.running) return;
	const started = Date.now();
	this.updateState(started - this.prev);
	this.onchange(this.time);
	//This overwrites prev even if updateState() calls stop(), but it doesn't matter as prev is initialized in start()
	this.prev = started;
};

const TimerMixin = {
	updateState: function(elapsed) {
		this.time -= elapsed;
		if(this.time <= 0) this.stop(true);
	},
	startCondition: function() { return this.time > 0; }
};

const StopwatchMixin = {
	updateState: function(elapsed) {
		this.time += elapsed;
	},
	startCondition: () => true
};

const ClockMixin = {
	updateState: function(elapsed) {
		const date = new Date();
		this.time = date.getHours() * 3600000 + date.getMinutes() * 60000 + date.getSeconds() * 1000 + date.getMilliseconds();
	},
	startCondition: () => true
};
