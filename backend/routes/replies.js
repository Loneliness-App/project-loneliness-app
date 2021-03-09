var express = require('express');
const { body, validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');
const { v4: uuidv4 } = require('uuid');
const expressJwt = require('express-jwt');
const { JWT_SECRET } = require('../config');
const { User, Request, Reply, Suggestion } = require('../models');

var router = express.Router();
router.use(expressJwt({ secret: JWT_SECRET, algorithms: ['HS256'] }));

/**
 * get all replies that user has responded to.
 * Body should include userId.
 */
router.get('/', async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ errors: errors.array() });
    }
    Reply.findAll({
        where: { '$User.id$': req.user.id },
        include: [
            { model: User, attributes: [] },
            { model: Request, attributes: ['id', 'name'] },
        ],
        attributes: [],
    }).then((replies) =>
        res.json({
            replies: replies.map((r) => r.get()),
        })
    );
});

/*
Create an empty reply when a user accepts a request.
Body should be 
{
    requestId : uuid
    userId: uuid
}
*/
router.post('/', body('requestId').isUUID(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(StatusCodes.NOT_FOUND)
            .json({ errors: errors.array() });
    }
    let reply;
    let replyId = uuidv4();
    //check if the user exists, if so create reply and add to user.

    try {
        reply = await Reply.create({
            id: replyId,
        });

        let user = await User.findOne({ where: { id: req.user.id } });
        if (user == null) {
            return res.status(StatusCodes.NOT_FOUND).send('User not found.');
        }

        let request = await Request.findOne({
            where: { id: req.body.requestId },
        });
        if (request == null) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .send('Recommendation request not found');
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
});

/*
Populate reply with user information
Example Body:
{
    "replyId" : UUID,
    "userId" : UUID,
    "suggestions" : [
        {"name": "clark", "phone":"1234567890", "message": "hello"},
    ]
}
*/
router.put(
    '/',
    body('replyId').isUUID(),
    body('suggestions').isArray(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ errors: errors.array() });
        }

        let reply;
        try {
            reply = await Reply.findOne({
                where: { id: req.body.replyId, '$User.id$': req.user.id },
                include: [{ model: User, attributes: [] }],
            });
            if (reply == null) {
                return res
                    .status(StatusCodes.NOT_FOUND)
                    .send('Reply not found or user does not match.');
            }
            //check that user is the one on the reply!!!!

            //for each suggestion: create, and add to reply,
            try {
                for (let s of req.body.suggestions) {
                    suggestion = await Suggestion.create(s);
                    reply.addSuggestion(suggestion);
                }
            } catch (e) {
                console.log('Devlog', e);
                return res
                    .status(StatusCodes.INTERNAL_SERVER_ERROR)
                    .send('duplicate key issue');
            }
        } catch (error) {
            return res.sendStatus(StatusCodes.BAD_GATEWAY);
        }
        return res.status(StatusCodes.OK).json({
            replyId: req.body.replyId,
        });
    }
);

module.exports = router;
