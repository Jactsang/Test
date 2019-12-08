const express = require('express');
const app = express()

const knexFile = require('../knexfile')['development'];
const knex = require('knex')(knexFile)

const authClass = require('../auth')(knex);
app.use(authClass.initialize());

class RatingRouter {
  constructor(ratingService) {
    this.ratingService = ratingService
  }

  router() {
    let router = express.Router();
    router.get('/', authClass.authenticate(), this.get.bind(this));
    router.post('/', authClass.authenticate(), this.post.bind(this));
    return router;
  }

  get(req, res) {
    return this.ratingService.list(req.query.url, req.user.id)
      .then((rating) => {
        res.json(rating)
      })
      .catch((err) => res.status(500).json(err));
  }

  post(req, res) {
    return this.ratingService.add(req.body.rating, req.body.url, req.user.id)
    .then(() => this.ratingService.list(req.body.url, req.user.id))
    .then((rating) => res.json(rating))
    .catch((err) => res.status(500).json(err));
  }

}

module.exports = RatingRouter;