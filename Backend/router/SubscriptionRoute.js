const express = require("express");
const app = express();

const knexFile = require("../knexfile")["development"];
const knex = require("knex")(knexFile);

const authClass = require("../auth")(knex);
app.use(authClass.initialize());

class SubscriptionRoute {
  constructor(subscriptionService) {
    this.subscriptionService = subscriptionService;
  }

  route() {
    let router = express.Router();
    router.get("/", authClass.authenticate(), this.get.bind(this));
    router.post("/", authClass.authenticate(), this.post.bind(this));
    // router.post("/", this.post.bind(this));
    return router
  }

  async get(req, res) {
    console.log("id is here: ", req.user.id);

    return this.subscriptionService
      .listSubscriptionDetails(req.user.id)
      .then(data => {
        console.log(data);
        res.json(data);
      })
      .catch(err => res.status(500).json(err));
  }

  async post(req, res) {
    return this.subscriptionService.updateSubscription(req.user.id)
    .then((id) => res.json(id))
    .catch((err) => res.status(500).json(err))

  }

}

module.exports = SubscriptionRoute;
