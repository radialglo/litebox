define(["site/get"], function(get) {
  
    describe("get", function() {

        it("should retrieve photoset", function() {
            get("72157629076059695", function(data) {
                console.log(data);
                expect(data.stat).to.equal("ok");

            });
        });
    });
});
