class ApplicationDetailsService {
    constructor(knex) {
        this.knex = knex;
    }

    async listPendingApplicationDetails(application_id) {
        let query = await this.knex.select()
            .from('application')
            .where('account_id', application_id)
        // console.log('PENDING application Service')
        return query
    };

    async listProcessedApplicationDetails(application_id) {
        // console.log('start doing query')
        let query = await this.knex.select()
            .from('application')
            .where('account_id', application_id)
        // console.log('getting application details')
        return query
    };

    updateApplicationDetails(application_id, status) {
        // console.log(application_id, status)
        let query = this.knex.select('pending', 'expert')
            .from('account')
            .where('id', application_id)
        // console.log(query)

        return query.then((rows) => {
            if (rows.length === 1) {

                if (status === 'approve') {
                    return this.knex('account')
                        .update({
                            pending: false,
                            expert: true
                        })
                        .where({ id: application_id })
                } else if (status === 'deny') {
                    return this.knex('account')
                        .update({
                            pending: false,
                            expert: false
                        })
                        .where({ id: application_id })
                } else {
                    throw new Error('Cannot update status')
                }
            }
        })
    };
}
module.exports = ApplicationDetailsService;