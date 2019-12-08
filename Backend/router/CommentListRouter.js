const express = require('express');
const app = express()

const knexFile = require('../knexfile')['development'];
const knex = require('knex')(knexFile)

const authClass = require('../auth')(knex);
app.use(authClass.initialize());

class CommentRouter {
  constructor(commentService) {
    this.commentService = commentService
  }

  router() {
    let router = express.Router();
    router.get('/', authClass.authenticate(), this.get.bind(this));
    router.post('/', authClass.authenticate(), this.post.bind(this));
    router.put('/:id', authClass.authenticate(), this.put.bind(this));
    router.delete('/:id', authClass.authenticate(), this.delete.bind(this));
    return router;
  }

  get(req, res) {
    return this.commentService.list(req.query.link, req.query.userType, req.user.id)
      .then((notes) => {
        res.json(notes)
      })
      .catch((err) => res.status(500).json(err));
  }

  post(req, res) {
    return this.commentService.add(req.body.comment, req.user.id)
      .then(() => this.commentService.list(req.body.comment.currentVideoLink, req.body.userType, req.user.id))
      .then((notes) => res.json(notes))
      .catch((err) => res.status(500).json(err));
  }

  put(req, res) {
    return this.commentService.update(req.params.id, req.body.selectedComment, req.user.id)
      .then(() => this.commentService.list(req.body.selectedComment.currentVideoLink, req.body.userType, req.user.id))
      .then((notes) => res.json(notes))
      .catch((err) => res.status(500).json(err));
  }

  delete(req, res) {
    return this.commentService.remove(req.params.id, req.user.id)
      .then(() => this.commentService.list(req.body.commentState.currentVideoLink, req.body.userType, req.user.id))
      .then((notes) => res.json(notes))
      .catch((err) => res.status(500).json(err));
  }

}

module.exports = CommentRouter;