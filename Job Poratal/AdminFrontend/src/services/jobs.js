import axios from "axios";
import { createError, createUrl } from "./util";

export async function getAllJobs(){
    try{
        const url = createUrl('jobpost')
        const headers = {
            headers:{
            token: sessionStorage['token']
            },
        }
        const response=await axios.get(url,headers)
        //console.log(response)
        return response.data
    }catch(ex){
        return createError(ex)

    }
}

export async function addJobs(provider_id,seeker_id,job_title,job_description,location,category_id,experienece_required,salary,companyname,companyimage){
    try{
        const url = createUrl('jobpost')
        const body={
            provider_id,
            seeker_id,
            job_title,
            job_description,
            location,
            category_id,
            experienece_required,
            salary,
            companyname,
            companyimage   
        }
        const response = await axios.post(url,body)
        console.log(response)
        return response.data
    }catch(ex){
        return createError(ex)
    }

}

export async function addCategory(category_name){
    try{
        const url=createUrl('jobpost/categories')
        const body={
            category_name
        }
        const response = await axios.post(url,body)
        console.log(response)
        return response.data
    }catch(ex){
        return createError(ex)
    }

}