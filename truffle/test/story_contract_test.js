var StoriesContract = artifacts.require("StoriesContract");

contract("StoriesContract", function(accounts) {

    //replace for your test contract addr
    var instance = StoriesContract.at("0x2c2b9c9a4a25e24b174f26114e8926a9f2128fe4");

    it("returns nr of nodes", () => {
        return StoriesContract.deployed().then(() => {
            return instance.getNumberNodes.call();
        }).then(nrNodes => {
            assert.equal(nrNodes.valueOf() > 0, true, "No stories");
        })
    });

    describe("createStory", () => {
        it("it should let us create a story", () => {
            return StoriesContract.deployed().then(() => {
                var title = "test title";
                var body = "test body";

                return instance.createStory(title, body, { gas:2000000, value : 500000 });
            }).then(result => {
                let storyCreatedEvent = getEventArgs(result, "StoryCreated");

                assert.equal(storyCreatedEvent.id > 0, true, "Should increment stories ID");
            }).catch(err => {
                console.log(` err : ${err}`);
            });
        });
    });
});

function getEventArgs(transaction, evt) {
  let event = transaction.logs.filter(({ event }) => event === evt)[0];
  if(!event) throw `Remember to call ${evt} event!`;
  return event.args;
}
