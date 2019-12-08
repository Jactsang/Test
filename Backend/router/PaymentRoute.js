const express = require("express");
const app = express();
const router = express.Router();

const knexFile = require("../knexfile")["development"];
const knex = require("knex")(knexFile);

const authClass = require("../auth")(knex);
app.use(authClass.initialize());

const StripeLoader = require('stripe');
const stripeSecret = require('../constants/stripe')
const stripe = new StripeLoader(stripeSecret);

class PaymentRoute {
    constructor(paymentService) {
        this.paymentService = paymentService;
    }

    route() {
        router.post('/', this.post.bind(this));
        return router;
    }

    async post(req, res) {
        console.log('starting the stripe')
        console.log('req.body.stripeToken', req.body.stripeToken)
        console.log('req.body.amount', req.body.amount)
        console.log('req.body.userId', req.body.userId)
        // let  = req.body.amount;
        let amount = 50;
        try {
            // let data = await this.charge(req.body.stripeToken.token.id, amount);
            let data = await this.charge(req.body.stripeToken.token.id, amount);
            console.log('data posting! ', data);
            if (data.status === "succeeded") {
                console.log('chargeddddd!')
                return this.paymentService.changeStatus(req.body.userId)
                    .then((id) => res.json(id))
                    .catch((err) => res.status(500).json(err))
            }
        } catch (e) {
            console.log('router error! ', e)
            res.status(500)
        }
    }

    charge(token, amount) {

        return stripe.charges.create({
            amount: amount * 100,
            currency: 'usd',
            source: token,
            description: '30-day Quota Upgrade'
        })
    }
}

module.exports = PaymentRoute;

