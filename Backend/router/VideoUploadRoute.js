const express = require('express');

class VideoUploadRoute {
    constructor(videoUploadService){
        this.videoUploadService = videoUploadService;
    }

    route(){
        let router = express.Router();
        router.post('/', this.post.bind(this));
        return router;
    }

    async post(req, res){
        console.log('req.body.id', req.body.id)
        return this.videoUploadService.addVid(req.body.payload, req.body.id)
            .then((id)=> res.json(id))
            .catch((err)=> res.status(500).json(err))
    }
}

module.exports = VideoUploadRoute;