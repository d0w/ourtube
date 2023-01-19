import { createError } from "../error.js"
import User from "../models/User.js";

export const update = async(req, res, next) => {
    // checking token user and current user
    if (req.params.id === req.user.id) {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true });
            res.status(200).json(updatedUser);
        } catch(error) {
            next(error);
        }
    } else {
        return next(createError(403, "invalid token"));
    }
}
export const deleteUser = async(req, res, next) => {
}
export const getUser= async(req, res, next) => {
}
export const subscribe = async(req, res, next) => {
}
export const unsubscribe = async(req, res, next) => {
}
export const like = async(req, res, next) => {
}
export const dislike = async(req, res, next) => {
}