const express = require('express')
const db= require('../db')
const router = express.Router();
const utils = require('../utils')
const cryptoJs = require('crypto-js')
const jwt= require('jsonwebtoken')
const config = require('../config')


router.post('/signup',async(request,response)=>{
    const {provider_id,email,password,company_name,company_description} = request.body

    try{
    
    const statement = `insert into jobprovider 
                                (email,password,company_name,company_description)
                           values
                                (?,?,?,?);`
    console.log(statement)
    const result = await db.execute(
        statement,
        [email,password,company_name,company_description])
        response.send(utils.createSuccess(result))
    }catch(ex){
        response.send(utils.createError(ex))
    }
})

router.post('/signin',async(request,response)=>{
    const {email,password}= request.body

    const statement = `select provider_id,email from jobprovider where email= ? and password = ? ;`
    console.log(statement)
    await db.pool.execute(statement,[email,password],(error,jobprovider)=>{
        if(error){
            response.send(utils.createError(error))
        }else{
            if(jobprovider.length == 0){
                response.send(utils.createError('Invalid User Name or password '))
            }else{
                const{provider_id,email}= jobprovider[0];

                const payload = {
                    provider_id,
                    email
                }
                const token = jwt.sign(payload,config.jobprovidersecretkey)
                console.log(token)
                response.send(
                    utils.createSuccess({
                        token,
                        email
                    })
                )
            }
        }
    })

})




module.exports = router