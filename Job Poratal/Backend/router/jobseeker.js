const express = require('express')
const db = require('../db')
const router = express.Router();
const utils = require('../utils')
const cryptoJs = require('crypto-js')
const jwt = require('jsonwebtoken')
const config = require('../config')


router.post('/signup', async (request, response) => {
  const { fname, lname, email, password ,contactme,state,city} = request.body

  try{
  //const encryptedPassword = String(cryptoJs.SHA256(password))

  const statement = `
                insert into jobseeker 
                      (fname, lname,email, password, contactme,state,city)
                values 
                      (?, ?, ?, ?, ? , ? , ? )`

 const result = await db.execute(
    statement,
    [fname, lname, email,password,contactme,state,city])
    response.send(utils.createSuccess(result))
  }catch(ex){
    response.send(utils.createError(ex))
  }
})

// router.post('/signin', async (request, response) => {
//   console.log("inside///")
//   const { email, password } = request.body

//   try{
//   //const encryptedPassword = String(cryptoJs.SHA256(password))
//   const statement = `
//                 select seeker_id,fname,lname  
//                            from jobseeker 
//                              where 
//                              email = ? and password = ?`

//  const [jobseekers] = await db.execute(statement,[email,password])
//   if(jobseekers.length == 0){
//     response.send(utils.createError('user does not exist'))
//   }else 
//   {
//       const jobseeker = jobseekers[0]
//       console.log(jobseeker)
//       const token = jwt.sign({
//           seeker_id: jobseeker['seeker_id'],
//           fname: jobseeker['fname'],
//           lname: jobseeker['lname']
//       },config.secret)
//       response.send(utils.createSuccess({
//         token,fname: jobseeker['fname'],lname: jobseeker['lname']}
//       ))
//   }
//     response.send(utils.createSuccess(jobseekers))
//   }catch(ex){
//     //response.send(utils.createError(ex))
//   }
// })



router.post('/signin',async (request,response) => {
  console.log("inside ....")
  const {email,password} = request.body

  const statement = `select seeker_id,fname,lname from jobseeker where email = ? and password = ?`
  console.log(statement)
  await db.pool.execute(statement,[email,password],(error,jobseekers)=>{
      if(error){
        response.send(utils.createError(error))
      }else {
        if(jobseekers.length == 0){
            response.send(utils.createError('Inavalid User Name or password'))
        }else {
          const {seeker_id,fname,lname}= jobseekers[0];

          const payload = {
            seeker_id,
            fname,
            lname
          }
          const token = jwt.sign(payload,config.jobseekersecretkey)
          console.log(token)
          response.send(
            utils.createSuccess({
              token,
              fname,
              lname,
            })
          )
        }
      }
  })
})


router.get("/",async (request,response)=>{
  try{
  const statement = 
          `select * from jobseeker`;
  const [result] = await db.execute(statement)
  console.log(result)
  response.send(utils.createSuccess(result))
  }catch(ex){
    response.send(utils.createError(ex))
  }
})


router.put('/:seeker_id', async (request, response) => {
  const {seeker_id} = request.params
  const { fname, lname, email, password ,contactme,state,city} = request.body
  try{
  const encryptedPassword = String(cryptoJs.SHA256(password))

  const statement = 
                `update jobseeker set 
                    fname = ?, lname = ?, email = ?, 
                    password = ?, contactme = ?, 
                    state = ?, city = ? where seeker_id = ?;`
  console.log(statement)
  const result = await db.execute(
    statement,
    [fname, lname, email,encryptedPassword,contactme,state,city,seeker_id])
    response.send(utils.createSuccess(result))
  }catch(ex){
    response.send(utils.createError(ex))
  }
})

router.delete('/:seeker_id', async (request, response) => {
  const {seeker_id} = request.params
  try{

  const statement = 
                ` delete from jobseeker where seeker_id = ${seeker_id} `
  console.log(statement)
  const result = await db.execute(
    statement,
    [seeker_id])
    response.send(utils.createSuccess(result))
  }catch(ex){
    response.send(utils.createError(ex))
  }
})

module.exports = router


