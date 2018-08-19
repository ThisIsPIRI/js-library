describe("Tree", function() {
	describe("addNode", function() {
		it("should return the added Node", function() {
			const tree = new Tree();
			chai.expect(tree.addNode(tree.root)).to.equal(tree.allNodes[1][0]);
		});
		it("should add a Node", function() {
			const tree = new Tree();
			const node1 = tree.addNode(tree.root);
			const node2 = tree.addNode(tree.allNodes[1][0]);
			chai.expect(tree.allNodes[1][0]).to.equal(node1);
			chai.expect(tree.allNodes[2][0]).to.equal(node2);
			const node2_1 = tree.addNode(tree.allNodes[1][0]);
			chai.expect(tree.allNodes[2][1]).to.equal(node2_1);
		});
	});
	describe("clear", function() {
		it("should remove all Nodes except the root", function() {
			const tree = new Tree();
			tree.addNode(tree.root);
			tree.addNode(tree.root);
			tree.addNode(tree.allNodes[1][1]);
			tree.clear();
			chai.expect(tree.allNodes.length).to.eql(1);
		});
		it("should clear any attribute of the root", function() {
			const tree = new Tree();
			tree.addNode(tree.root);
			tree.addNode(tree.root);
			tree.addNode(tree.allNodes[1][1]);
			tree.root.attrib = "hello";
			tree.clear();
			chai.expect(tree.root.attrib).to.eql(undefined);
		});
	});
	describe("replaceNode", function() {
		it("should replace a Node and clear its attributes", function() {
			const tree = new Tree();
			const oldNode = tree.addNode(tree.root);
			oldNode.attrib = "node1";
			tree.replaceNode(tree.allNodes[1][0]);
			chai.expect(tree.allNodes[1][0]).to.not.equal(oldNode);
			chai.expect(tree.allNodes[1][0].attrib).to.eql(undefined);
		});
		it("should return the new Node", function() {
			const tree = new Tree();
			tree.addNode(tree.root);
			const returned = tree.replaceNode(tree.allNodes[1][0]);
			chai.expect(tree.allNodes[1][0]).to.equal(returned);
		});
		it("should keep the Node's list of children", function() {
			const tree = new Tree();
			const parentNode = tree.addNode(tree.root);
			const childrenList = [tree.addNode(parentNode), tree.addNode(parentNode)];
			tree.replaceNode(tree.allNodes[1][0]);
			chai.expect(tree.allNodes[1][0].children).to.eql(childrenList);
		});
		it("should redirect the children's parentNode to the new Node", function() {
			const tree = new Tree();
			const parentNode = tree.addNode(tree.root);
			const childrenList = [tree.addNode(parentNode), tree.addNode(parentNode)];
			const newNode = tree.replaceNode(tree.allNodes[1][0]);
			childrenList.forEach(function(elem) {
				chai.expect(elem.parentNode).to.equal(newNode);
			});
		});
	});
});