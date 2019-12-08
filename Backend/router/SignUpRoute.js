const express = require('express');

let router = express.Router();

class SignUpRoute{
    constructor(signUpService){
        this.signUpService = signUpService
    }

    route(){
        router.post('/student', this.postStudentSignUp.bind(this));
        router.post('/expert', this.postExpertSignUp.bind(this));
        router.post('/admin', this.postAdminSignUp.bind(this));

        return router;
    }

    postStudentSignUp(req, res){
        return this.signUpService.studentLocalSignUpService(
            req.body.name,
            req.body.email,
            req.body.password
            )
        .then((notes)=>{
            // If the email already exists, signUpService will return The email exists
            if(notes === 'The email exists'){
                res.json('The email exists')
            } else {
                res.json('Sign Up Successfully')
            }
        })
        .catch((err)=> res.status(500).json(err))
    }

    postExpertSignUp(req, res){
        return this.signUpService.expertLocalSignUpService(
            req.body.email,
            req.body.password,
            req.body.firstName,
            req.body.lastName,
            req.body.summary,
            req.body.experience,
            req.body.educationAndCertificate,
            req.body.instrument1,
            req.body.skillLevel1,
            req.body.instrument2,
            req.body.skillLevel2,
            req.body.instrument3,
            req.body.skillLevel3,
            req.body.languageEnglish,
            req.body.languageMandarin,
            req.body.languageCantonese,
            req.body.referral,
            req.body.upload1,
            req.body.upload2,
            req.body.upload3,
            )
        .then((notes)=>{
            console.log(notes,'notes')
            // If the email already exists, signUpService will return The email exists
            if(notes === 'The email exists'){
                res.json('The email exists')
            } else {
                res.json('Sign Up Successfully')
            }
        })
        .catch((err)=> res.status(500).json(err))
    }

    postAdminSignUp(req, res){
        return this.signUpService.adminLocalSignUpService(
            req.body.email,
            req.body.password
            )
        .then((notes)=>{
            // If the email already exists, signUpService will return The email exists
            if(notes === 'The email exists'){
                res.json('The email exists')
            } else {
                res.json('Sign Up Successfully')
            }
        })
        .catch((err)=> res.status(500).json(err))
    }
}
module.exports = SignUpRoute;


