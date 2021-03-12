'use strict';
const { StatusCodes } = require('http-status-codes');
const { body, query, param, validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');
const expressJwt = require('express-jwt');
const express = require('express');
const { User, Request, Reply, Suggestion } = require('../models');
const { JWT_SECRET } = require('../config');

const router = express.Router();
router.use(expressJwt({ secret: JWT_SECRET, algorithms: ['HS256'] }));

/**
 * Get list of requests associated with a user
 */
router.get('/', async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ errors: errors.array() });
    }

    let requests;
    try {
        requests = await Request.findAll({
            where: { '$User.id$': req.user.id },
            include: { model: User, attributes: [] },
            attributes: ['id', 'name'],
        });
    } catch (error) {
        console.log(error);
        return res.sendStatus(StatusCodes.BAD_GATEWAY);
    }
    return res.json({
        requests: requests.map((r) => r.get()),
    });
});

/**
 * Get information about request and list of replies
 */
router.get('/:requestId', param('requestId').isUUID(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ errors: errors.array() });
    }

    let reqResource;
    try {
        reqResource = await Request.findOne({
            where: { id: req.params.requestId },
            include: [
                { model: User, attributes: ['id'] },
                {
                    model: Reply,
                    include: [
                        { model: User, attributes: ['name'] },
                        {
                            model: Suggestion,
                            attributes: ['name', 'phone', 'message'],
                        },
                    ],
                },
            ],
            attributes: ['name', 'message'],
        });
    } catch (error) {
        console.log(error);
        return res.sendStatus(StatusCodes.BAD_GATEWAY);
    }
    if (reqResource == null) {
        return res.sendStatus(StatusCodes.NOT_FOUND);
    }
    if (reqResource.User.id != req.user.id) {
        // Authenticated user does not own the request resource
        return res.sendStatus(StatusCodes.FORBIDDEN);
    }
    return res.json({
        name: reqResource.name,
        message: reqResource.message,
        // TODO: add real link system
        inviteLink: 'https://google.com',
        replies: reqResource.Replies.map((reply) => ({
            suggestions: reply.Suggestions.map((s) => s.get()),
            from: reply.User.name,
        })),
    });
});

/**
 * Create new request
 * Body: name, message strings required
 */
router.post(
    '/',
    body('name').isString(),
    body('message').isString(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ errors: errors.array() });
        }

        let reqResource;
        try {
            let user = await User.findOne({ where: { id: req.user.id } });
            if (user == null) {
                // Should not occur unless we allow deleting users
                return res.sendStatus(StatusCodes.UNAUTHORIZED);
            }

            reqResource = await Request.create({
                id: uuidv4(),
                name: req.body.name,
                message: req.body.message,
            });
            await user.addRequest(reqResource);
        } catch (error) {
            console.log(error);
            return res.sendStatus(StatusCodes.BAD_GATEWAY);
        }
        return res.status(StatusCodes.CREATED).json({
            id: reqResource.id,
            name: reqResource.name,
            message: reqResource.message,
        });
    }
);

/**
 * Modify name and/or message of request
 * Body: name, message
 */
router.put(
    '/:requestId',
    param('requestId').isUUID(),
    body('name').isString().optional(),
    body('message').isString().optional(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ errors: errors.array() });
        }

        let reqResource;
        try {
            reqResource = await Request.findOne({
                where: { id: req.params.requestId },
                include: { model: User, attributes: ['id'] },
            });

            if (reqResource.User.id != req.user.id) {
                // Authenticated user does not own the request resource
                return res.sendStatus(StatusCodes.FORBIDDEN);
            }

            if (req.body.hasOwnProperty('name')) {
                reqResource.name = req.body.name;
            }
            if (req.body.hasOwnProperty('message')) {
                reqResource.message = req.body.message;
            }
            await reqResource.save();
        } catch (error) {
            console.log(error);
            return res.sendStatus(StatusCodes.BAD_GATEWAY);
        }
        return res.status(StatusCodes.OK).json({
            id: reqResource.id,
            name: reqResource.name,
            message: reqResource.message,
        });
    }
);

/**
 * Delete specified request
 */
router.delete('/:requestId', param('requestId').isUUID(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ errors: errors.array() });
    }

    let reqResource;
    try {
        reqResource = await Request.findOne({
            where: { id: req.params.requestId },
            include: { model: User, attributes: ['id'] },
        });

        if (reqResource.User.id != req.user.id) {
            // Authenticated user does not own the request resource
            return res.sendStatus(StatusCodes.FORBIDDEN);
        }

        await reqResource.destroy();
    } catch (error) {
        console.log(error);
        return res.sendStatus(StatusCodes.BAD_GATEWAY);
    }
    return res.sendStatus(StatusCodes.NO_CONTENT);
});

module.exports = router;
