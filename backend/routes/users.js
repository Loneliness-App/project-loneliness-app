"use strict";
const { StatusCodes } = require('http-status-codes');
const { body, validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');
var express = require('express');
var router = express.Router();

router.post('/',
    body('name').isString(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(StatusCodes.NOT_FOUND).json({ errors: errors.array() });
        }

        let user;
        try {
            user = await User.create({ id: uuidv4(), name: req.body.name });
        } catch (error) {
            console.log(error);
            return res.sendStatus(StatusCodes.BAD_GATEWAY);
        }
        return res.status(StatusCodes.CREATED).json({
            id: user.getId(),
            name: user.getName(),
        });
    }
);

module.exports = router;
