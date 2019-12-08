const bcrypt = require('../bcrypt')

class LoginService {
    constructor(knex){
        this.knex = knex;
    }

    localLoginService(email,password){
        console.log('trying to logg in', email, password)

        if (email && password) {
            let query = this.knex
            .select()
            .from('account')
            .where('email', email)

            // Using async function since we need to wait for bcrypt decoding password
            return query.then(async (rows)=>{
                // This email cannot be found
                if(rows.length === 0) {
                    return 'Wrong Email or Password'
                }
                
                let result = await bcrypt.checkPassword(password, rows[0].password)
                if(result){
                    return rows
                } else {
                    // Wrong Password
                    return 'Wrong Email or Password'
                }
            })
            .catch(
                function(err) {
                console.error(err);
            });
        }
    }


}

module.exports = LoginService;