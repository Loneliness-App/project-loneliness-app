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
 * Get list of replies
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
 * Get a single reply, including list of suggestions
 */
router.get('/:replyId', async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(StatusCodes.NOT_FOUND)
            .json({ errors: errors.array() });
    }

    let reply;
    try {
        reply = await Reply.findOne({
            where: { id: req.params.replyId, '$User.id$': req.user.id  },
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
        return res
            .status(StatusCodes.NOT_FOUND)
            .send('Reply not found or not owned by user.');
    }
    
    return res.json({
        replyId: reply.id,
        requestName: reply.Request.name,
        requestOwner: reply.Request.User.name,
        requestMessage: reply.Request.message,
        suggestions: reply.Suggestions.map((suggestion) => suggestion.get()),
    });
});

/**
 * Create a reply, or activate and return a pre-existing existing reply
 */
router.put('/', body('requestId').isUUID(), body('requestToken'), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(StatusCodes.BAD_REQUEST)
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
 * Add suggestions to a reply
 */
router.post('/:replyId/suggestions', body('suggestions').isArray(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ errors: errors.array() });
    }

    let reply;
    try {
        reply = await Reply.findOne({
            where: { id: req.params.replyId, '$User.id$': req.user.id },
            include: [{ model: User, attributes: ['id'] }],
        });
        if (reply == null) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .send('Reply not found or not owned by user.');
        }

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
 * Modify fields of reply
 */
router.patch('/:replyId', body('active').isBoolean().optional(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ errors: errors.array() });
    }

    let reply;
    try {
        reply = await Reply.findOne({
            where: { id: req.params.replyId, '$User.id$': req.user.id },
            include: [{ model: User, attributes: [] }],
        });
        if (reply == null) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .send('Reply not found or user does not match.');
        }
        if (req.body.hasOwnProperty('active')) {
            reply.active = req.body.active;
        }
        await reply.save();
    } catch (error) {
        return res.sendStatus(StatusCodes.BAD_GATEWAY);
    }
    return res.status(StatusCodes.OK).json({
        replyId: reply.id,
        active: reply.active,
    });
});

module.exports = router;
