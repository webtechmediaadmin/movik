require('dotenv').config();
const jwt = require('jsonwebtoken');
const UsersModel = require('../models/user.model');

async function authentication(req, res, next) {
    try {
        const token = req.cookies.token || req.headers.authorization;

        if (!token) {
            return res.status(401).json({
                status: 401,
                message: "Please provide a valid Bearer token."
            });
        }

        jwt.verify(token, process.env.SECRET_KEY, async (err, decode) => {
            if (err) {
                return res.status(401).json({
                    status: 401,
                    message: "Invalid Token"
                });
            }

            req.userID = decode.userID;
            const user = await UsersModel.findOne({ where: { id: req.userID } });

            if (!user) {
                return res.status(404).json({
                    status: 404,
                    message: "User not found"
                });
            }

            req.user = user;
            next();
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        });
    }
}

module.exports = { authentication };
