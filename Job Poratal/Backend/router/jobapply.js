const express = require('express')
const db= require('../db')
const router = express.Router()
const utils= require('../utils')
const cryptoJs = require('crypto-js')
const jwt = require('jsonwebtoken')
const config = require('../config')

router.post('/',async (request,response)=>{
    const {job_id,seeker_id} = request.body

    try{
        const statement = 
                    `insert into job_application(job_id, seeker_id) values (?,?)`
                console.log(statement)
        const result = await db.execute(statement,[job_id,seeker_id])
            response.send(utils.createSuccess(result))
            console.log(result)
    }catch(ex){
        response.send(utils.createError(ex))
    }
})

router.get("/", async (request,response)=>{
    try{
        const statement = 
                `select job_application.job_id,jobs.job_title,jobseeker.fname,jobseeker.lname,jobseeker.email,jobseeker.contactme from job_application INNER JOIN jobs ON jobs.job_id= job_application.job_id INNER JOIN jobseeker ON job_application.seeker_id=jobseeker.seeker_id`;
        const [result] = await db.execute(statement)
        console.log((result))
        response.send(utils.createSuccess(result))
    }catch(ex){
        response.send(utils.createError)
    }
})




module.exports = router