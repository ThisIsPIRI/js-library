/**Makes a new group of checkboxes that display their selection order.
 * @param elem {HTMLElement} A (preferably empty) container element.
 * @param labels {Array} An Array of Strings.
 * @param changeCallback {Function} A function to be called whenever a checkbox is checked or unchecked. Passed to this function are: the index of the changed checkbox, whether it was checked or unchecked and an Array of all currently checked boxes' indices.*/
const OrderedCheckGroup = function(elem, labels, changeCallback) {
	this.elem = elem;
	this.boxes = [];
	//Array of indices
	this.checked = [];
	this.changeCallback = changeCallback;
	for(let i = 0;i < labels.length;i++) {
		this.addOption(labels[i]);
	}
};
/**Adds a new checkbox.
 * @param label {String}*/
OrderedCheckGroup.prototype.addOption = function(label) {
	const labelElem = document.createElement("label");
	const check = document.createElement("input");
	check.type = "checkbox";
	check.dataset.index = this.boxes.length;
	check.addEventListener("change", (e) => {
		const index = parseInt(e.currentTarget.dataset.index);
		if(e.currentTarget.checked)
			this.checked.push(index);
		else {
			this.checked.splice(this.checked.indexOf(index), 1);
			this.boxes[index].labelElem.lastChild.nodeValue = this.boxes[index].labelText;
		}
		this.changeCallback(index, e.currentTarget.checked, this.checked);
		this.updateCheckedLabels();
	});
	labelElem.appendChild(check);
	labelElem.append(label);
	this.elem.appendChild(labelElem);
	this.boxes.push({
		check: check,
		labelElem: labelElem,
		labelText: label
	});
};
OrderedCheckGroup.prototype.updateCheckedLabels = function() {
	for(let i = 0;i < this.checked.length;i++) {
		const cur = this.boxes[this.checked[i]];
		cur.labelElem.lastChild.nodeValue = `(${i + 1}) ${cur.labelText}`;
	}
};
OrderedCheckGroup.prototype.toggle = function(index, toCheck) {
	if(index < 0)
		index = this.boxes.length + index;
	const elem = this.boxes[index].check;
	if(elem.checked !== toCheck) {
		elem.checked = toCheck;
		elem.dispatchEvent(new Event('change'));
	}
};
