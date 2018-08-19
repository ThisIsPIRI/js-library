const Tree = function() {
	const Node = function(parentNode) {
		this.parentNode = parentNode;
		this.children = [];
		this.depth = parentNode == undefined ? 0 : parentNode.depth + 1;
	}
	this.clear = function() {
		this.root = new Node();
		this.allNodes = [[this.root]];
	}
	/**Adds a Node toParent.
	 * @param toParent {Node} The desired parent Node.
	 * @returns {Node} The newly added Node.*/
	this.addNode = function(toParent) {
		const newNode = new Node(toParent);
		if(this.allNodes.length <= newNode.depth) this.allNodes.push([newNode]);
		else this.allNodes[newNode.depth].push(newNode);
		toParent.children.push(newNode);
		return newNode;
	}
	this.replaceNode = function(toRemove, toAdd) {
		if(toAdd == undefined) toAdd = new Node(toRemove.parentNode);
		this.allNodes[toRemove.depth][this.allNodes[toRemove.depth].indexOf(toRemove)] = toAdd;
		toRemove.parentNode.children[toRemove.parentNode.children.indexOf(toRemove)] = toAdd;
		toAdd.children = toRemove.children;
		toAdd.children.forEach(function(elem) {
			elem.parentNode = toAdd;
		});
		return toAdd;
	}
	this.clear();
}