const { sequelize, User, Request, Reply, Suggestion } = require('../database');
const { v4: uuidv4 } = require('uuid');

async function testData() {
    try {
        await sequelize.authenticate();
        console.log("authentication succeeded!");
        await sequelize.sync({ force: true });
        console.log("synced!");

        let user1 = await User.create({ id: uuidv4(), name: "u1", key: "key" });
        let user2 = await User.create({ id: uuidv4(), name: "u2", key: "key" });
        let user3 = await User.create({ id: uuidv4(), name: "u3", key: "key" });
        let request1 = await Request.create({ id: uuidv4(), name: "r1", message: "msg", key: "key" });
        let request2 = await Request.create({ id: uuidv4(), name: "r2", message: "msg", key: "key" });
        await user1.addRequest(request1);
        await user1.addRequest(request2);

        let reply1 = await Reply.create({id: uuidv4(),});
        let reply2 = await Reply.create({id: uuidv4(),});
        let reply3 = await Reply.create({id: uuidv4(),});
        await user2.addReply(reply1);
        await request1.addReply(reply1);
        await user3.addReply(reply2);
        await request1.addReply(reply2);
        await user2.addReply(reply3);
        await request2.addReply(reply3);

        let suggestion1 = await Suggestion.create({
            data: {
                name: "s1", phone: "8000000000", message: "msg"
            }
        });
        let suggestion2 = await Suggestion.create({
            data: {
                name: "s2", phone: "8000000000", message: "msg"
            }
        });
        let suggestion3 = await Suggestion.create({
            data: {
                name: "s3", phone: "8000000000", message: "msg"
            }
        });
        let suggestion4 = await Suggestion.create({
            data: {
                name: "s4", phone: "8000000000", message: "msg"
            }
        });

        await reply1.addSuggestion(suggestion1);
        await reply1.addSuggestion(suggestion2);
        await reply2.addSuggestion(suggestion3);
        await reply3.addSuggestion(suggestion4);
        
        console.log("finished inserting test data!")
    } catch (err) {
        console.log("error: \n", err);
    }
}

testData();