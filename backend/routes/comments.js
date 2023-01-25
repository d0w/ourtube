import express from "express";
import { verifyToken } from "../verifyToken.js";
import { addComment, deleteComment, getComments } from "../controllers/comment.js"

const router = express.Router();

// create a comment
router.post("/", verifyToken, addComment)

// delete a comment
router.delete("/:id", verifyToken, deleteComment)

// edit a comment
//router.put("/:id", verifyToken, )

// find comments based on video Id
router.get("/:videoId", getComments);

export default router;