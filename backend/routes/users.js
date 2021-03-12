'use strict';
const CryptoJS = require('crypto-js');
const Base64 = require('crypto-js/enc-base64');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { StatusCodes } = require('http-status-codes');
const { body, validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');
const express = require('express');
const router = express.Router();

const { User } = require('../models');
const { JWT_SECRET } = require('../config');

const SALT_ROUNDS = 10;

/**
 * Create new user
 * Body: name required
 */
router.post('/register', body('name').isString(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ errors: errors.array() });
    }

    let password = Base64.stringify(CryptoJS.lib.WordArray.random(16));
    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    } catch (err) {
        console.log(err);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }

    let user;
    try {
        user = await User.create({
            id: uuidv4(),
            name: req.body.name,
            password: hashedPassword,
        });
    } catch (error) {
        console.log(error);
        return res.sendStatus(StatusCodes.BAD_GATEWAY);
    }
    return res.status(StatusCodes.CREATED).json({
        userId: user.id,
        // Must be stored securely by client
        password: password,
        name: user.name,
    });
});

/**
 * Get session token to supply with future requests
 * Must supply userId, password in body
 * Response includes token
 */
router.post(
    '/login',
    body('userId').isUUID(),
    body('password').isString(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ errors: errors.array() });
        }

        let user;
        try {
            user = await User.findOne({
                where: { id: req.body.userId },
                attributes: ['password'],
            });
        } catch (error) {
            console.log(error);
            return res.sendStatus(StatusCodes.BAD_GATEWAY);
        }

        if (user == null) {
            return res.sendStatus(StatusCodes.UNAUTHORIZED);
        }

        try {
            if (!(await bcrypt.compare(req.body.password, user.password))) {
                return res.sendStatus(StatusCodes.UNAUTHORIZED);
            }
        } catch (err) {
            console.log(err);
            return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
        }

        // Create token that expires in 24 hours
        let token = jwt.sign({ id: req.body.userId }, JWT_SECRET, {
            expiresIn: 86400,
        });
        return res.status(StatusCodes.OK).json({
            token: token,
        });
    }
);

module.exports = router;
