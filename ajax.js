//An object literal for making simple AJAX requests.
const ajaxRequester = {
	/**Sends an AJAX request to uri.
	 * @param uri {String} The URI to send the request to.
	 * @param callback {Function} The function to call onload.
	 * @param callOnError {Boolean} Whether to callback onerror, passing an empty String.*/
	request : function(uri, callback, callOnError) {
		const request = new XMLHttpRequest();
		request.open("GET", uri, true);
		request.responseType = "text";
		request.onload = function() {
			callback(request.responseText);
		};
		if(callOnError)
			request.onerror = function() {
				callback('');
			};
		request.send(null);
	},
	/**Sends AJAX requests to uris. Arguments to callback will be (data, uri) and arguments to callOnError ('', uri).
	 * @param uris {Array} Array of uris.*/
	requestAll : function(uris, callback, callOnError) {
		uris.forEach(function(uri) {
			newCallback = function(data) {
				callback(data, uri);
			};
			newCallOnError = function(data) {
				callOnError(data, uri);
			};
			ajaxRequester.request(uri, newCallback, newCallOnError);
		});
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