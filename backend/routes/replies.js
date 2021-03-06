var express = require('express');
const { validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');
const { v4: uuidv4 } = require('uuid');

var router = express.Router();
const { User, Request, Reply, Suggestion } = require('../models');


router.get('/user/:userid/replies', function (req, res) {
    Reply.findAll({
      where: { "$User.id$": req.params.userid },
      include: [
        { model: User, attributes: [] },
        { model: Request, attributes: ["id", "name"]}],
      attributes: [],
  }).then(replies => res.json({
    replies: replies.map(r => r.get())
}));
})

/*
Body shuold be 
{
    requestId : uuid
}
*/
router.post('/user/:userid/reply/', async (req, res) => {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(StatusCodes.NOT_FOUND).json({ errors: errors.array() });
        }
    let reply;
    let replyId = uuidv4()
    //check if the user exists, if so create reply and add to user.
    
    try {
        reply = await Reply.create({
            id: replyId
        });

        let user = await User.findOne({ where: { id: req.params.userid} });
        if (user == null) {
            return res.status(StatusCodes.NOT_FOUND).send('User not found.');
        }

        let request = await Request.findOne({where: {id : req.body.requestId}})
        if (request == null) {
            return res.status(StatusCodes.NOT_FOUND).send('Recommendation request not found');
        }

        await request.addReply(reply);
        await user.addReply(reply);
        
    } catch (error) {
        console.log(error);
        return res.sendStatus(StatusCodes.BAD_GATEWAY);
    }
    return res.status(StatusCodes.OK).json({
        id: replyId,
    });
    
    

})

/*
Example Body:
{
    "suggestions" : [
        {"id" : 1, "name": "clark", "phone":"1234567890", "message": "hello"},
        {"id" : 2, "name": "clark2", "phone":"2234567890", "message": "hello2"}
    ]
}
*/
router.put('/user/:userid/reply/:replyid', async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(StatusCodes.NOT_FOUND).json({ errors: errors.array() });
    }

    let reply;
    try {
        reply = await Reply.findOne(
            {where : 
                {id : req.params.replyid,
                "$User.id$": req.params.userid},
                include: [{ model: User, attributes: [] }]
        });
        if (reply == null) {
            return res.status(StatusCodes.NOT_FOUND).send('Reply not found or user does not match.');
        }
        //check that user is the one on the reply!!!!


        //for each suggestion: create, and add to reply, 
        try {
            for (let s of req.body.suggestions) {
                suggestion = await Suggestion.create(s);
                reply.addSuggestion(suggestion);
            }
        } catch(e) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("duplicate key issue")
        }
        

    } catch (error) {
        console.log(error);
        return res.sendStatus(StatusCodes.BAD_GATEWAY);
    }
})

module.exports = router;