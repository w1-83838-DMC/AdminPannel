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