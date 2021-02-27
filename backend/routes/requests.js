"use strict";
const { StatusCodes } = require('http-status-codes');
const { body, validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');
const express = require('express');
const router = express.Router();

const { User, Request, Reply, Suggestion } = require('../database');

router.get('/',
    param('userId').isUUID(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(StatusCodes.NOT_FOUND).json({ errors: errors.array() });
        }

        let requests;
        try {
            requests = await Request.findAll({
                where: { "$User.id$": req.params.userId },
                include: { model: User, attributes: [] },
                attributes: ["id", "name"]
            });
        } catch (error) {
            console.log(error);
            return res.sendStatus(StatusCodes.BAD_GATEWAY);
        }
        return res.json({
            requests: requests.map(r => r.get()),
        });
    }
);

router.get('/:requestId',
    param('requestId').isUUID(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(StatusCodes.NOT_FOUND).json({ errors: errors.array() });
        }

        let request;
        try {
            r = Request.findOne({
                where: { id: req.params.requestId },
                include: [
                    { model: User, attributes: ["id"] },
                    {
                        model: Reply,
                        include: [
                            { model: User, attributes: ["name"] },
                            {
                                model: Suggestion,
                                attributes: ["name", "phone", "message"]
                            }
                        ],
                    },
                ],
                attributes: ["name", "message"]
            });
        } catch (error) {
            console.log(error);
            return res.sendStatus(StatusCodes.BAD_GATEWAY);
        }
        if (request == null) {
            return res.sendStatus(StatusCodes.NOT_FOUND);
        }
        // TODO: check if authentication corresponds to same user
        // if (request.User.id != req.userId) {
        //     return res.sendStatus(StatusCodes.FORBIDDEN);
        // }
        return res.json({
            name: request.name,
            message: request.message,
            // TODO: add real links
            inviteLink: "https://google.com",
            replies: request.Replies.map(reply => ({
                suggestions: reply.Suggestions.map(s => s.get()),
                from: reply.User.name,
            })),
        });
    }
);

router.post('/',
    body('name').isString(),
    body('message').isString(),
    // temporary
    body('userId').isUUID(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(StatusCodes.NOT_FOUND).json({ errors: errors.array() });
        }

        let request;
        try {
            request = await Request.create({
                id: uuidv4(),
                name: req.body.name,
                message: req.body.message,
            });
            // TODO: get user based on authentication
            let user = await User.findOne({ where: { id: req.body.userId } });
            if (user == null) {
                return res.status(StatusCodes.NOT_FOUND).send('User not found.');
            }
            await user.addRequest(request);
        } catch (error) {
            console.log(error);
            return res.sendStatus(StatusCodes.BAD_GATEWAY);
        }
        return res.status(StatusCodes.CREATED).json({
            id: request.getId(),
            name: request.getName(),
            message: request.getMessage(),
        });
    }
);

router.put('/:reqId',
    body('name').isString().optional(),
    body('message').isString().optional(),
    // temporary
    body('userId').isUUID(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(StatusCodes.NOT_FOUND).json({ errors: errors.array() });
        }

        let request;
        try {
            request = await Request.findOne({ where: { id: req.params.reqId } });
            // TODO: get user based on authentication
            if (req.body.userId != request.getUser().getId()) {
                return res.sendStatus(StatusCodes.FORBIDDEN);
            }
            if (req.body.hasOwnProperty("name")) {
                await request.setName(req.body.name);
            }
            if (req.body.hasOwnProperty("message")) {
                await request.setMessage(req.body.message);
            }
        } catch (error) {
            console.log(error);
            return res.sendStatus(StatusCodes.BAD_GATEWAY);
        }
        return res.status(StatusCodes.OK).json({
            id: request.getId(),
            name: request.getName(),
            message: request.getMessage(),
        });
    }
);

router.delete('/:reqId',
    async (req, res) => {
        let request;
        try {
            request = await Request.findOne({ where: { id: req.params.reqId } });
            // TODO: check user based on authentication
            await request.destroy();
        } catch (error) {
            console.log(error);
            return res.sendStatus(StatusCodes.BAD_GATEWAY);
        }
        return res.sendStatus(StatusCodes.NO_CONTENT);
    }
);

module.exports = router;