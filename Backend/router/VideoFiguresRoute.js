const express = require("express");
const app = express();

const knexFile = require("../knexfile")["development"];
const knex = require("knex")(knexFile);

const authClass = require("../auth")(knex);
app.use(authClass.initialize());

class VideoFiguresRoute {
  constructor(videoFiguresService) {
    this.videoFiguresService = videoFiguresService;
  }

  route() {
    let router = express.Router();
    router.get("/", authClass.authenticate(), this.getNumFigures.bind(this));
    router.get("/lastVideoUploaded", authClass.authenticate(), this.getLastUploaded.bind(this));
    router.get("/lastVideoCommented", authClass.authenticate(), this.getLastCommented.bind(this));
    router.get("/commentAspect", authClass.authenticate(), this.getCommentAspect.bind(this));
    return router;
  }

  async getNumFigures(req, res) {
    console.log("id is here: ", req.user.id);

    return this.videoFiguresService
      .listAllVideoUploaded(req.user.id)
      .then(data => {
        console.log(data);
        res.json(data);
      })
      .catch(err => res.status(500).json(err));
  }

  async getLastUploaded(req, res) {
    console.log("id is here: ", req.user.id);

    return this.videoFiguresService
      .listLastVideoUploaded(req.user.id)
      .then(data => {
        console.log(data);
        res.json(data);
      })
      .catch(err => res.status(500).json(err));
  }

  async getLastCommented(req, res) {
    console.log("id is here: ", req.user.id);

    return this.videoFiguresService
      .listLastVideoCommented(req.user.id)
      .then(data => {
        console.log(data);
        res.json(data);
      })
      .catch(err => res.status(500).json(err));
  }

  async getCommentAspect(req, res) {
    console.log("id is here: ", req.user.id);

    return this.videoFiguresService
      .listCommentAspect(req.user.id)
      .then(data => {
        console.log(data);
        res.json(data);
      })
      .catch(err => res.status(500).json(err));
  }
}

module.exports = VideoFiguresRoute;
