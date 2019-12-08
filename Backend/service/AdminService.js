class AdminService {
    constructor(knex){
        this.knex = knex;
    }

    // Using async function since we need to wait for bcrypt hashing password
    async displayAllPendingJobService () {   
        let query = await this.knex
        .select("*")
        .from('application')
        .innerJoin('account', 'application.account_id', 'account.id')
        .where('account.pending', true)

        let organizeData = await query.map( candidate => ({
            id: candidate.id,
            firstName: candidate.first_name,
            lastName: candidate.last_name,
            email: candidate.email,
            skills: [{
                instrument: candidate.instrument_1, level: candidate.level_of_skil_1
            },
            {
                instrument: candidate.instrument_2, level: candidate.level_of_skil_2
            },
            {
                instrument: candidate.instrument_3, level: candidate.level_of_skil_3
            }],
            date: candidate.created_at
        }))

        return organizeData
    }

    async displayAllProcessedJobService () {  

        let queryApproved = await this.knex
        .select("*")
        .from('application')
        .innerJoin('account', 'application.account_id', 'account.id')
        .where('account.pending', false)
        .andWhere('account.expert', true)

        let queryDenied = await this.knex
        .select("*")
        .from('application')
        .innerJoin('account', 'application.account_id', 'account.id')
        .where('account.pending', false)
        .andWhere('account.expert', false)
        
        let approved = await queryApproved.map( approved => ({
            id: approved.id,
            firstName: approved.first_name,
            lastName: approved.last_name,
            email: approved.email,
            skills: [{
                instrument: approved.instrument_1, level: approved.level_of_skil_1
            },
            {
                instrument: approved.instrument_2, level: approved.level_of_skil_2
            },
            {
                instrument: approved.instrument_3, level: approved.level_of_skil_3
            }],
            date: approved.created_at,
            approved: true
        }))

        let denied = await queryDenied.map( denied => ({
            id: denied.id,
            firstName: denied.first_name,
            lastName: denied.last_name,
            email: denied.email,
            skills: [{
                instrument: denied.instrument_1, level: denied.level_of_skil_1
            },
            {
                instrument: denied.instrument_2, level: denied.level_of_skil_2
            },
            {
                instrument: denied.instrument_3, level: denied.level_of_skil_3
            }],
            date: denied.created_at,
            approved: false
        }))

        let combined = approved.concat(denied);

        // console.log('combined!!!!', combined)
        
        return combined
    }
}

module.exports = AdminService;