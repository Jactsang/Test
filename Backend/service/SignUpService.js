
const bcrypt = require('../bcrypt')

class SignUpService {
    constructor(knex) {
        this.knex = knex;
    }

    // Using async function since we need to wait for bcrypt hashing password
    async studentLocalSignUpService(name, email, password) {
        let query = this.knex
            .select()
            .from('account')
            .where('email', email)

        let hash = await bcrypt.hashPassword(password)

        return query.then((rows) => {
            if (rows.length >= 1) {
                return 'The email exists'
            } else {
                return this.knex('account').insert([
                    {
                        first_name: name,
                        email: email,
                        password: hash,
                        student: true,
                        subscribed: false,
                        quota_increased: 5
                    }
                ])
                    .catch(function (err) {
                        console.error(err, 'studentLocalSignUpService');
                    });
            }
        })
            .catch(function (err) {
                console.error(err);
            });
    }

    async expertLocalSignUpService(
        email,
        password,
        firstName,
        lastName,
        summary,
        experience,
        educationAndCertificate,
        instrument1,
        skillLevel1,
        instrument2,
        skillLevel2,
        instrument3,
        skillLevel3,
        languageEnglish,
        languageMandarin,
        languageCantonese,
        referral,
        upload1,
        upload2,
        upload3
    ) {
        // !!! This will not work :let query = await this.knex
        let query = this.knex
            .select()
            .from('account')
            .where('email', email)

        let hash = await bcrypt.hashPassword(password)
        console.log(email, password, 'email, password')
        console.log(hash, 'hash')
        console.log('expertLocalSignUpService')

        return query.then((rows) => {
            // console.log(rows,'rows')
            if (rows.length >= 1) {
                console.log('The email exists')
                return 'The email exists'
            } else {
                console.log('Okay, you can sign up')
                return this.knex('account').insert(
                    [{
                        email: email,
                        password: hash,
                        expert: true,
                        pending: true
                    }])
                    .then(() => {
                        console.log('The email exists2')

                        let findAccountId = this.knex
                            .select('id')
                            .from('account')
                            .where('email', email)

                        return findAccountId.then((rows) => {
                            console.log(rows[0].id, 'rows Account Id')

                            let findAccIdResult = rows[0].id

                            return this.knex('application').insert(
                                [{
                                    first_name: firstName,
                                    last_name: lastName,
                                    email: email,
                                    education_certificate: educationAndCertificate,
                                    instrument_1: instrument1,
                                    level_of_skil_1: skillLevel1,
                                    instrument_2: instrument2,
                                    level_of_skil_2: skillLevel2,
                                    instrument_3: instrument3,
                                    level_of_skil_3: skillLevel3,
                                    summary: summary,
                                    referral: referral,
                                    language_English: languageEnglish,
                                    language_Mandarin: languageMandarin,
                                    language_Cantonese: languageCantonese,
                                    experience: experience,
                                    upload_1: upload1,
                                    upload_2: upload2,
                                    upload_3: upload3,
                                    account_id: findAccIdResult
                                }]
                            )
                        })
                    })
            }
        })
        .catch(function (err) {
                console.error(err);
        })
    }

    async adminLocalSignUpService(email, password) {
        let query = this.knex
            .select()
            .from('account')
            .where('email', email)

        let hash = await bcrypt.hashPassword(password)

        return query.then((rows) => {
            if (rows.length >= 1) {
                return 'The email exists'
            } else {
                return this.knex('account').insert([
                    {
                        email: email,
                        password: hash,
                        admin: true
                    }
                ])
                    .catch(function (err) {
                        console.error(err, 'adminLocalSignUpService');
                    });
            }
        })
            .catch(function (err) {
                console.error(err);
            });
    }

}

module.exports = SignUpService;