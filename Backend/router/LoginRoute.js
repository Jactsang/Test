const express = require('express');
const jwt = require('jwt-simple')
const config = require('../config')

let router = express.Router();

class LoginRoute {
    constructor(loginService){
        this.loginService = loginService
    }

    route(){
        router.post('/', this.postLocalLogin.bind(this));
        return router;
    }

    postLocalLogin(req, res){
        // console.log(req.body.email,'req.body.email')
        return this.loginService.localLoginService(
            req.body.email,
            req.body.password
            )
        .then((notes)=>{
            // console.log(notes,'notes')
            // loginService returns 'Wrong Email or Password' when email or password is wrong
            if(notes === 'Wrong Email or Password'){
                res.json('Wrong Email or Password')
            }

            let payload = {
                id: notes[0].id
            }
            // create token: userID + Secret
            let token = jwt.encode(payload, config.jwtSecret);

            res.json({
                token: token,
                userID: notes[0].id,
                studentUserType: notes[0].student,
                expertUserType: notes[0].expert,
                adminUserType: notes[0].admin,
                jobApplicationPendingUserType: notes[0].pending,
            });
        })
        .catch(
            (err)=> res.status(500).json(err)
            // (err)=> res.status(500).json('EEfafh uiefh id fieshf i')
            )
    }

}
module.exports = LoginRoute;


