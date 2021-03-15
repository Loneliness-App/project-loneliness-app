var express = require('express');
const { body, validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');
const { v4: uuidv4 } = require('uuid');
const expressJwt = require('express-jwt');
const { JWT_SECRET } = require('../config');
const { User, Request, Reply, Suggestion } = require('../models');
const { mode } = require('crypto-js');

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
        where: { '$User.id$': req.user.id, active: true },
        include: [
            { model: User, attributes: [] },
            {
                model: Request,
                include: [{ model: User, attributes: ['name'] }],
                attributes: ['id', 'name'],
            },
        ],
        attributes: ['id'],
    }).then((replies) => {
        res.json({
            replies: replies.map((r) => ({
                id: r.get('id'),
                requestName: r.get('Request').get('name'),
                requestOwner: r.get('Request').get('User').get('name'),
            })),
        });
    });
});

/*
Create an empty reply when a user accepts a request.
Body should be 
{
    requestId : uuid
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
            active: true,
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
    "suggestions" : [
        {"name": "clark", "phone":"1234567890", "message": "hello"},
    ]
}
*/
router.put('/:replyid', body('suggestions').isArray(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(StatusCodes.NOT_FOUND)
            .json({ errors: errors.array() });
    }

    let reply;
    try {
        reply = await Reply.findOne({
            where: { id: req.params.replyid, '$User.id$': req.user.id },
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
                .status(StatusCodes.BAD_GATEWAY)
                .send('duplicate key issue');
        }
    } catch (error) {
        return res.sendStatus(StatusCodes.BAD_GATEWAY);
    }
    return res.status(StatusCodes.OK).json({
        replyId: req.body.replyId,
    });
});

/**
 * set a replies "active" status to true or false.
 */
router.put('/:replyid/active', body('active').isBoolean(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(StatusCodes.NOT_FOUND)
            .json({ errors: errors.array() });
    }

    let reply;
    try {
        reply = await Reply.findOne({
            where: { id: req.params.replyid, '$User.id$': req.user.id },
            include: [{ model: User, attributes: [] }],
        });
        if (reply == null) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .send('Reply not found or user does not match.');
        }
        try {
            await reply.update({ active: req.body.active });
        } catch (e) {
            return res.status(StatusCodes.BAD_GATEWAY);
        }
    } catch (error) {
        return res.sendStatus(StatusCodes.BAD_GATEWAY);
    }
    return res.status(StatusCodes.OK).json({
        replyId: reply.id,
        active: reply.active,
    });
});

/**
 * get all suggestions for a reply
 */
router.get('/:replyid', async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(StatusCodes.NOT_FOUND)
            .json({ errors: errors.array() });
    }

    let reply;
    //query suggestions by replyid
    try {
        reply = await Reply.findOne({
            where: { id: req.params.replyid },
            include: [
                { model: User, attributes: ['id'] },
                { model: Suggestion, attributes: ['name', 'phone', 'message'] },
                {
                    model: Request,
                    include: [{ model: User, attributes: ['name'] }],
                    attributes: ['name', 'message'],
                },
            ],
            attributes: ['id'],
        });
    } catch (error) {
        console.log(error);
        return res.sendStatus(StatusCodes.BAD_GATEWAY);
    }
    if (reply == null) {
        return res.sendStatus(StatusCodes.NOT_FOUND);
    }
    if (reply.User.id != req.user.id) {
        // Authenticated user does not own the request resource
        return res.sendStatus(StatusCodes.FORBIDDEN);
    }
    return res.json({
        replyid: reply.id,
        requestName: reply.Request.name,
        requestOwner: reply.Request.User.name,
        requestMessage: reply.Request.message,
        suggestions: reply.Suggestions.map((suggestion) => suggestion.get()),
    });
});

module.exports = router;
