class SubscriptionService {
    constructor(knex) {
      this.knex = knex;
    }
  
    async listSubscriptionDetails(userId) {
      if (typeof userId !== "undefined") {
        console.log("starting to get data");
        let query = await this.knex
          .select("subscribed", "subscribed_at", "expiry_date", "quota_increased", "first_name")
          .from("account")
          .where("id", userId)
  
        return query;
      }
    }

    async updateSubscription(userId) {
        if (typeof userId !== "undefined") {
            let query = await this.knex('account')
            .update({
                subscribed: false,
                quota_increased: 0
            })
            .where('id', userId)
            .returning('id')

            .catch(err => {
                throw new Error('error here ', err)
            })

            console.log(query)
        }
    }

  }
  
  module.exports = SubscriptionService;
  