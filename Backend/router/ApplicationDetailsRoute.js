const express = require('express');
const app = express()

const knexFile = require('../knexfile')['development'];
const knex = require('knex')(knexFile)

const authClass = require('../auth')(knex);
app.use(authClass.initialize());

class ApplicationDetailsRoute {
  constructor(applicationDetailsService) {
    this.applicationDetailsService = applicationDetailsService
  }

  router() {
    let router = express.Router();
    router.get('/pendingApplicationDetails', authClass.authenticate(), this.getPendingApplicationDetails.bind(this));
    router.get('/processedApplicationDetails', authClass.authenticate(), this.getProcessedApplicationDetails.bind(this));
    router.put('/processApplication/:id', authClass.authenticate(), this.processApplication.bind(this))
    return router;
  }

  getPendingApplicationDetails(req, res) {
    return this.applicationDetailsService.listPendingApplicationDetails(req.query.id)
      .then((details) => {
        console.log('PendingDetails received: ', details)
        res.json(details)
      })
      .catch((err) => res.status(500).json(err));
  };

  getProcessedApplicationDetails(req, res) {
    return this.applicationDetailsService.listProcessedApplicationDetails(req.query.id)
      .then((details) => {
        console.log('ProcessedDetails received: ', details)
        res.json(details)
      })
      .catch((err) => res.status(500).json(err));
  };

  processApplication(req, res) {
    console.log('arrive at processing route')
    console.log(req.params.id, req.body.status)
    return this.applicationDetailsService.updateApplicationDetails(req.params.id, req.body.status)
      .then((details) => {
        console.log('updating application status')
        res.json(details)
      })
      .catch((err) => res.status(500).json(err));
  };
}

module.exports = ApplicationDetailsRoute;