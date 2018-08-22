describe("Timer", function() {
	describe("format", function() {
		it("should return the time in a zero-padded String of minutes and seconds", function() {
			chai.expect(Timer.format(10000)).to.equal("00:10");
			chai.expect(Timer.format(182432)).to.equal("03:02");
			chai.expect(Timer.format(1885643)).to.equal("31:25");
		});
	});
});