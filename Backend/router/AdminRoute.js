const express = require('express');

let router = express.Router();

class AdminRoute{
    constructor(adminService){
        this.adminService = adminService
    }

    route(){
        router.get('/pendingjobs', this.getPendingJobApplication.bind(this));
        router.get('/processedjobs', this.getProcessedJobApplication.bind(this));
        return router;
    }

    getPendingJobApplication(req, res){
        return this.adminService.displayAllPendingJobService()
        .then((data)=>{
            // console.log(notes,'getpendingjobapplication')
            res.json(data)
        })
        .catch((err)=> res.status(500).json(err))
    }

    getProcessedJobApplication(req, res){
        return this.adminService.displayAllProcessedJobService()
        .then((data)=>{
            // console.log(notes,'getpendingjobapplication')
            res.json(data)
        })
        .catch((err)=> res.status(500).json(err))
    }

}
module.exports = AdminRoute;


