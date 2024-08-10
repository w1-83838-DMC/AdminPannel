const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const utils= require('./utils')
const config  = require('./config')
const jwt = require('jsonwebtoken')

// create new react app
const app = express()
app.use(cors())
app.use(morgan('combined'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('images'))


// app.use((request,response,next)=>{
//     const skipUrls=['/jobseeker/signup','/jobseeker/signin']
//     if (skipUrls.findIndex(item => item == request.url) != -1){
//         next()
//     }else 
//     {
//         const token = request.headers['token']
//         console.log(token)

//         if(!token){
//             response.send(utils.createError('missing token'))
//         }else {
//             try{
//                 const payload = jwt.verify(token, config.secret)
//                 console.log(payload)
//                 request.data= payload
//                 next()   
//             }catch(ex){
//                 response.send(utils.createError('invalidate token '))   
//             }
//         }
//     }
// })

// app.use((request,respose,next)=>{
//     if(request.url == '/jobseeker/signup' || request.url == '/jobseeker/signin' || request.url == '/jobprovider/signup' || request.url == '/jobprovider/signin'){
//         next()
//     }else{
//         const token = request.headers['token']
//         console.log(token)
//         if(!token || token.length == 0){
//             respose.send(utils.createError('missing token '))
//         }else {
//             try{
//                 const payload = jwt.verify(token,config.jobseekersecretkey)
//                 request.user = payload 
//                 next()
//             }catch(ex){
//                 respose.send(utils.createError('Invalid token'))
//             }
//         }
//     }

// })

 ///////////////////////////////////////////////////////////////////////////////////////

// app.use((request,respose,next)=>{
//     const publicRoutes = [
//         '/jobseeker/signup',
//         '/jobseeker/signin',
//         '/jobprovider/signup',
//         '/jobprovider/signin'
//     ];

//     if(publicRoutes.includes(request.url)){
//         return next();
//     }

//     const isJobseekerRoute = request.url.startsWith('/jobseeker');
//     //const isJobproviderRoute = request.url.startsWith('/jobprovider');

//     const token = request.headers['token'];

//     if(!token){
//         respose.send(utils.createError('Missing token'));
//     }

//     let secret;
//     if(isJobseekerRoute){
//         secret = config.jobseekersecretkey
//     // }else if (isJobproviderRoute){
//     //      secret = config.jobprovidersecretkey
//     }else{
//         respose.send(utils.createError('Invalid route'));
//     }

//     try{
//         const payload = jwt.verify(token,secret);
//         request.user=payload;
//         next();
//     }catch(ex){
//         respose.send(utils.createError('invalid token'))
//     }


// });

const jobproviderRoutes= require("./router/jobprovider")
const jobSeekerRoutes = require("./router/jobseeker")
const jobsRoutes = require("./router/jobpost")
const jobApplyRoutes = require("./router/jobapply")


//add the route 
app.use("/jobprovider",jobproviderRoutes)
app.use("/jobseeker", jobSeekerRoutes)
app.use("/jobpost",jobsRoutes)
app.use("/jobapply",jobApplyRoutes)


app.listen(9999,'0.0.0.0',()=>{
    console.log('server started on port 9999')

})














































