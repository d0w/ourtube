import express from "express";
import { deleteUser, dislike, getUser, like, subscribe, update } from "../controllers/user.js"
import { verifyToken } from "../verifyToken.js"

const router = express.Router();

// update user
router.put("/:id", verifyToken, update)

// get user
router.get("/user/:id", getUser)

// sub to user
router.put("/sub/:id", subscribe);

// unsub user
router.get("/unsub/:id")

// delete user
router.delete("/:id", deleteUser);

// like video
router.put("/like/:videoId", like);

// dislike video
router.put("/dislike/:videoId", dislike);

export default router;