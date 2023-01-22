import express from "express";
import { verify } from "jsonwebtoken";
import { deleteUser, dislike, getUser, like, subscribe, unsubscribe, update } from "../controllers/user.js"
import { verifyToken } from "../verifyToken.js"

const router = express.Router();

// update user
router.put("/:id", verifyToken, update)

// get user
router.get("/user/:id", getUser)

// sub to user
router.put("/sub/:id", verifyToken, subscribe);

// unsub user
router.put("/unsub/:id", verifyToken, unsubscribe)

// delete user
router.delete("/:id", verifyToken, deleteUser);

// like video
router.put("/like/:videoId", verifyToken, like);

// dislike video
router.put("/dislike/:videoId", verifyToken, dislike);

export default router;