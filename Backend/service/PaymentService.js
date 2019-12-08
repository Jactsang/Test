class PaymentService {
    constructor(knex) {
        this.knex = knex;
    }

    async changeStatus(userId) {
        console.log('changing status');
        let today = await new Date();
        let subscriptionDate = await today.toISOString();
        // let expiryDate = await new Date(today.setDate(today.getDate() + 30)).toISOString();
        let expiryDate = await new Date(today.setMinutes(today.getMinutes() + 3)).toISOString();
        let query = await this.knex('account')
            .update({
                subscribed: true,
                subscribed_at: subscriptionDate,
                expiry_date: expiryDate,
            })
            .increment('quota_increased', 5)
            .where('id', userId)
            .returning('id')

            .catch(err => {
                throw new Error('error here ', err)
            })

        console.log('subscription query: ', query)
    }

    async listSubscriptionDetails(userId) {
        if (typeof userId !== "undefined") {
            let query = await this.knex
                .select("subscribed", "subscribed_at", "expiry_date")
                .from("account")
                .where("id", userId)

            return query;
        }
    }
}

module.exports = PaymentService

