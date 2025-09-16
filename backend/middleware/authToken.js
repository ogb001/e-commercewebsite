const jwt = require("jsonwebtoken");

async function authToken(req, res, next) {
    try {
        // Extract token from cookies or headers
        const token = req.cookies.token || req.headers['authorization']?.replace('Bearer ', '');

        // Check if token is provided
        if (!token) {
            return res.status(401).json({  // 401 Unauthorized
                message: "No token provided",
                data: [],
                error: true,
                success: false
            });
        }

        // Verify the token
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(403).json({  // 403 Forbidden
                    message: "Invalid or expired token",
                    data: [],
                    error: true,
                    success: false
                });
            }

            // If token is valid, attach decoded info to req object
            req.user_id = decoded._id;  // Attach user ID or other relevant info

            // Optionally, attach other user info if needed
            // req.user_email = decoded.email; 

            // Proceed to the next middleware or route handler
            next();
        });

    } catch (err) {
        console.error("Token validation error:", err.message);
        return res.status(500).json({  // 500 Internal Server Error
            message: err.message || "An error occurred during token validation",
            data: [],
            error: true,
            success: false
        });
    }
}

module.exports = authToken;
