const express = require('express');
const app = express()

const knexFile = require('../knexfile')['development'];
const knex = require('knex')(knexFile)

const authClass = require('../auth')(knex);
app.use(authClass.initialize());

class VideoRouter {
  constructor(videoService) {
    this.videoService = videoService
  }

  router() {
    let router = express.Router();
    router.get('/', authClass.authenticate(), this.get.bind(this));
    return router;
  }

  async get(req, res) {
    return this.videoService.list(req.user.id)
    .then((videos) => {
        res.json(videos)
      })
      .catch((err) => res.status(500).json(err));
  }

}

module.exports = VideoRouter;