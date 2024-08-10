import axios from "axios";
import {createUrl,createError} from "./util"
export async function register(email,password,company_name,company_description){
    try{
        
        const url = createUrl('jobprovider/signup')
        const body = {
            email,
            password,
            company_name,
            company_description
        }
        const response = await axios.post(url,body)
        return response.data
    }catch(ex)
    {
        return createError(ex)
    }

}

export async function login(email,password){
    try{
        const url = createUrl('jobprovider/signin')
        const body ={
            email,
            password,
        }
        const response = await axios.post(url,body)
        return response.data
    }catch (ex)
    {
        return createError(ex)
    }
}