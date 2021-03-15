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
        return res.json({
            replies: replies.map((r) => ({
                id: r.get('id'),
                requestName: r.get('Request').get('name'),
                requestOwner: r.get('Request').get('User').get('name'),
            })),
        });
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

/*
Create an empty reply when a user accepts a request.
Body should be 
{
    requestId : uuid
}
*/
router.post('/', body('requestId').isUUID(), body('requestToken'), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(StatusCodes.NOT_FOUND)
            .json({ errors: errors.array() });
    }

    let reply;
    try {
        let request = await Request.findOne({
            where: { id: req.body.requestId, token: req.body.requestToken },
        });
        if (request == null) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .send('Invalid request resource ID or token');
        }

        let existingReply = await Reply.findOne({
            where: { '$User.id$': req.user.id, '$Request.id$': req.body.requestId },
            include: [
                { model: User, attributes: [] },
                { model: Request, attributes: [] },
            ],
        });
        if (existingReply != null) {
            existingReply.active = true;
            await existingReply.save();
            return res.status(StatusCodes.OK).json({
                id: existingReply.id,
            });
        }

        let user = await User.findOne({ where: { id: req.user.id } });
        if (user == null) {
            // Should not occur unless we allow deleting users
            return res.sendStatus(StatusCodes.UNAUTHORIZED);
        }

        reply = await Reply.create({
            id: uuidv4(),
            active: true,
        });

        await request.addReply(reply);
        await user.addReply(reply);
    } catch (error) {
        console.log(error);
        return res.sendStatus(StatusCodes.BAD_GATEWAY);
    }
    return res.status(StatusCodes.CREATED).json({
        id: reply.id,
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
router.put('/:replyId', body('suggestions').isArray(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(StatusCodes.NOT_FOUND)
            .json({ errors: errors.array() });
    }

    let reply;
    try {
        reply = await Reply.findOne({
            where: { id: req.params.replyId },
            include: [{ model: User, attributes: ['id'] }],
        });
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

module.exports = router;
