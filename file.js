//An object literal for reading local files in local web apps.
const fileReader = {
	read : function(fileName, callback) {
		const request = new XMLHttpRequest();
		request.open("GET", fileName, true);
		request.responseType = "text";
		request.onload = function() {
			callback(request.responseText);
		}
		request.send(null);
	},
	/*Replaces all occurrences of replaceThese in data withSeparator
	and returns the array of all tokens separated withSeparator.
	replaceThese may have multiple characters; pass them as one concatenated String.
	If you don't want to replace anything, pass null to replaceThese.
	If no values are passed, \n will be used for replaceThese and space for withSeparator.*/
	getTokensFrom : function(data, replaceThese, withSeparator) {
		replaceThese = replaceThese !== undefined ? replaceThese : '\n'; //No optional parameters; we have to support IEs
		withSeparator = withSeparator !== undefined ? withSeparator : ' ';
		if(replaceThese !== null) //Caller didn't want to replace anything
			data = data.replace(new RegExp('[' + replaceThese + ']', "g"), withSeparator); //replaceThese withSeparator.
		return data.split(withSeparator).map(function(word) {return word.trim();}); //Separate each words and remove preceding and trailing whitespaces.
	}
};