timer = {
	//Modified from https://stackoverflow.com/questions/6312993
	format : function (number, showHour, showUnderOne) {
		secondSum = number / 1000;
		if(!showUnderOne) secondSum = Math.floor(secondSum);
		var hours = showHour ? Math.floor(secondSum / 3600) : 0; //To show over an hour as minutes, assing 0 to hours when !showHour
		var minutes = Math.floor(secondSum - (hours * 3600)) / 60;
		var seconds = secondSum - (hours * 3600) - (minutes * 60);
		if(showUnderOne) seconds = seconds.toFixed(3);
		
		if (hours < 10)
			hours = '0' + hours;
		if (minutes < 10)
			minutes = '0' + minutes;
		if (seconds < 10) 
			seconds = '0' + seconds;
		var result = "";
		if(showHour) result += hours + ':';
		result += minutes + ':' + seconds;
		return result;
	},

	//Elements
	customTime : document.getElementById("customTime"),
	timeShower : document.getElementById("timeShower"),
	showH : document.getElementById("showHoursCheck"),
	showOne : document.getElementById("showUnderOneCheck"),

	//Other variables. Times are in milliseconds
	time : 0, updateRate : 60, intervalId : 0, running : false,

	//UI
	updateTimeString : function() {
		timer.timeShower.innerHTML = timer.format(timer.time, timer.showH.checked, timer.showOne.checked);
	},
	addCustom : function() {
		timer.addTime(customTime.value * 1000);
	},

	//logic
	addTime : function(amount) {
		timer.time += amount;
		timer.updateTimeString();
	},
	prev : null,
	update : function() {
		if(!timer.running) return;
		var started = new Date().getTime();
		if(timer.prev === null) timer.prev = started - timer.updateRate;
		timer.time -= started - timer.prev;
		if(timer.time <= 0) {
			timer.stop();
			return; //If it doesn't return here, prev will be set to started and used wrongly in the next session
		}
		timer.updateTimeString();
		timer.prev = started;
	},
	start : function() {
		if(!timer.running && timer.time > 0) {
			if(timer.prev !== null) alert("failsafe 0 triggered: prev !== null when starting");
			timer.intervalId = setInterval(timer.update, timer.updateRate);
			timer.running = true;
		}
	},
	pause : function() {
		if(timer.running) {
			clearInterval(timer.intervalId);
			timer.running = false;
			timer.prev = null;
		}
	},
	stop : function() {
		timer.pause();
		timer.time = 0;
		timer.updateTimeString();
		timer.onstop();
	},
	onstop : function() {} //Placeholder. Assign a function reference here to get callbacks when the timer stops
};
timer.showH.onchange = timer.showOne.onchange = timer.updateTimeString;