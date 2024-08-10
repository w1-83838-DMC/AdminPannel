const express = require('express')
const db = require('../db')
const router = express.Router()
const utils = require('../utils')
const cryptoJs = require('crypto-js')
const jwt = require('jsonwebtoken')
const config = require('../config')


router.post('/',async(request,response)=>{

    const {provider_id,seeker_id,job_title,job_description,location,category_id,experienece_required,salary,companyname,companyimage} = request.body

    try{
    const statement = 
                    `insert into jobs 
                            (provider_id,seeker_id,job_title,job_description,location,
                            category_id,experienece_required,salary,companyname,companyimage) 
                    values 
                            ( ?,?,? , ?, ? , ? , ? , ? , ? , ?)`
    const result = await db.execute(
        statement,
        [provider_id,seeker_id,job_title,job_description,location,category_id,experienece_required,salary,companyname,companyimage]) 
        response.send(utils.createSuccess(result))
        console.log(statement)
    }catch(ex){
        response.send(utils.createError(ex))
    }
})

router.get("/", async (request,response)=>{
    try{
        const statement = 
                `select * from jobs `;
        const [result] = await db.execute(statement)
        console.log((result))
        response.send(utils.createSuccess(result))
    }catch(ex){
        response.send(utils.createError)
    }
})

router.put('/:job_id', async (request, response) => {
    const {job_id} = request.params
    const {job_title,job_description,salary} = request.body
    try{
    
    const statement = 
                  `update jobs set 
                      job_title = ?, job_description = ?, 
                      salary = ? where job_id = ?;`
    console.log(statement)
    const result = await db.execute(
      statement,
      [job_title,job_description,salary,job_id])
      response.send(utils.createSuccess(result))
    }catch(ex){
      response.send(utils.createError(ex))
    }
})

router.delete('/:job_id', async (request, response) => {
    const {job_id} = request.params
    try{
    
    const statement = 
                  `delete from jobs where job_id = ? `
    console.log(statement)
    const result = await db.execute(
      statement,
      [job_id])
      response.send(utils.createSuccess(result))
    }catch(ex){
      response.send(utils.createError(ex))
    }
})

router.post('/categories',async (request,response)=>{
    const {category_name} = request.body

    try{
        const statement = 
                    `insert into categories(category_name) values (?)`
        const result = await db.execute(statement,[category_name])
            response.send(utils.createSuccess(result))
            console.log(result)
    }catch(ex){
        response.send(utils.createError(ex))
    }
})



  




module.exports = router