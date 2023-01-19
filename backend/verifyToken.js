import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) return next(createError(401, "no token"));

    // token verification, if correct, sets request's user to userID
    jwt.verify(token, process.env.JWT, (err, user) => {
        if(err) return next(createError(403, "invalid token"));
        req.user = user;
        next();
    })

}