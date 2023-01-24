import { createError } from "../error.js";
import User from "../models/User.js";
import Video from "../models/Video.js"

export const addVideo = async (req, res, next) => {
    const newVideo = new Video({ userId: req.user.id, ...req.body });
    try {
        const savedVideo = await newVideo.save();
        res.status(200).json(savedVideo);
    } catch (error) {
        next(error);
    }
}
export const removeVideo = async (req, res, next) => {
    try {
        const video = await Video.findByIdAndDelete(req.params.id); // finding video by id, id is request input
        if(!video) { return next( createError(404, "Video not found")); }
        if (req.user.id === video.userId) {
            const updatedVideo = await Video.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, { new: true });
        } else {
            return next(createError(403, "Invalid token to change video"));
        }
        res.status(200).json("Video has been deleted");
    } catch(error) {
        next(error);
    }
 
}
export const changeVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id); // finding video by id, id is request input
        if(!video) { return next( createError(404, "Video not found")); }
        if (req.user.id === video.userId) {
            const updatedVideo = await Video.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, { new: true });
        } else {
            return next(createError(403, "Invalid token to change video"));
        }
        res.status(200).json(updatedVideo);
    } catch(error) {
        next(error);
    }
}
export const getVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        res.status(200).json(video);    
    } catch (error) {
        next(error);
    }
}


export const addView = async (req, res, next) => {
    try {
        await Video.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 }
        }, { new: true });
        res.status(200).json("View added");    
    } catch (error) {
        next(error);
    }
}

export const random = async (req, res, next) => {
    try {
        const videos = await Video.aggregate([{ $sample: { size: 40 }}]);
        res.status(200).json(videos);    
    } catch (error) {
        next(error);
    }
}
export const trending = async (req, res, next) => {
    try {
        const videos = await Video.find().sort({ views: -1 });
        res.status(200).json(videos);    
    } catch (error) {
        next(error);
    }
}

export const getByTags = async (req, res, next) => {
    const tags = req.query.tags.split(",");
    console.log(tags);
    try {
           const videos = await Video.find({ tags: { $in: tags }}).limit(20);
    } catch (error) {
        next(error);
    }
}
export const search = async (req, res, next) => {
    const query = req.query.q;
    try {
        const videos = await Video.find({ title: { $regex: query, $options: "i" }}).limit(40);
        res.status(200).json(videos);    
    } catch (error) {
        next(error);
    }ç
}

export const sub = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        const subbedChannels = user.subscribedUsers;
        
        const list = await Promise.all(
            subbedChannels.map(channelId => {
                return Video.find({ userId: channelId })
            })
        ) // promise since finding multiple entries
        res.status(200).json(list.flat().sort((a,b) => b.createdAt - a.createdAt));   // flat to get rid of nested data  
    } catch (error) {
        next(error);
    }
}