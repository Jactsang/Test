const express = require("express");
const app = express();

const knexFile = require("../knexfile")["development"];
const knex = require("knex")(knexFile);

const authClass = require("../auth")(knex);
app.use(authClass.initialize());

class EarningFiguresRoute {
  constructor(earningFiguresService) {
    this.earningFiguresService = earningFiguresService;
  }

  route() {
    let router = express.Router();
    router.get("/", authClass.authenticate(), this.get.bind(this));
    return router;
  }

  async get(req, res) {
    console.log("id is here: ", req.user.id);

    return this.earningFiguresService
      .list(req.user.id)
      .then(data => {
        console.log(data);
        res.json(data);
      })
      .catch(err => res.status(500).json(err));
  }
}

module.exports = EarningFiguresRoute;
