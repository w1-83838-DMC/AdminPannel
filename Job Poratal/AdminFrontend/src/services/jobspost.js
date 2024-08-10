import axios from "axios";
import { createError,createUrl } from "./util";


export async function applyJobs(jobs){
    try{
        const url = createUrl('jobapply')
        const headers = {
            headers: {
                token: sessionStorage['token'],
            },
        }
        const body = {
            jobs: jobs.map(job=>{
                return{ "job_id": job['job_id'], "seeker_id": job['seeker_id'] }
            }),
        }
        console.log(headers)
        const response = await axios.post(url,body,headers)
        console.log(response)
        return response.data
    }catch(ex){
        return createError(ex)
    }
}


export async function getAllAppliedJobs(){
    try{
        const url = createUrl('jobapply')
        const headers = {
            headers: {
                token: sessionStorage['token'],
            },
        }
     
        console.log(headers)
        const response = await axios.get(url,headers)
        console.log(response)
        return response.data
    }catch(ex){
        return createError(ex)
    }
}