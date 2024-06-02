require('dotenv').config();
const jwt = require('jsonwebtoken');

async function authentication(req, res, next) {
    try {
        const token = req.headers.authorization;

        jwt.verify(token, process.env.SECRET_KEY, async (err, decode) => {
            if (decode) {
                console.log(decode);
                req.userID = decode.userID;
                role = decode.role;

                next();

            } else {
                return res.status(401).json({
                    status: 401,
                    message: "Invalid Token"
                });
            }


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
