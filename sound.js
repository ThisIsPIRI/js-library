const sound = {
	repeatNumber : 0,
	beep : function(context, onended) {
		const oscillator = context.createOscillator();
		const gain = context.createGain();
		oscillator.connect(gain);
		gain.connect(context.destination);
		oscillator.start(context.currentTime);
		oscillator.stop(context.currentTime + 0.7);
		setTimeout(onended, 700 + 600);
	},
	repeatInternal : function() {
		if(sound.repeatNumber <= 0) return;
		sound.repeatNumber--;
		if(sound.audio instanceof AudioContext)
			sound.beep(sound.audio, sound.repeatInternal);
		else {
			sound.audio.onended = sound.repeatInternal;
			sound.audio.play();
		}
	},
	/**If what is an Audio, plays it howMany times.
	 * If what is an AudioContext, beeps howMany times.*/
	repeat : function(what, howMany) {
		sound.audio = what;
		sound.repeatNumber = howMany;
		sound.repeatInternal();
	}
};
