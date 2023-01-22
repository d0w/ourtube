import express from "express";
import { update } from "../controllers/user.js";
import { addVideo, addView, changeVideo, getVideo, random, removeVideo, search, sub, getByTags, trending } from "../controllers/video.js"
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// adding video
router.post("/", verifyToken, addVideo);

//change video
router.put("/:id", verifyToken, changeVideo);

// delete video
router.put("/:id", verifyToken, removeVideo);

// get video
router.get("/find/:id", getVideo);
//add video view
router.put("/view/:id", addView);

// trending videos
router.get("/trending", trending);

// random videos
router.get("/random", random);

// subscribe users
router.get("/sub", verifyToken, sub)

// get by getByTag
router.get("/tags", getByTags)

// search
router.get("/search/:id", search)
export default router;