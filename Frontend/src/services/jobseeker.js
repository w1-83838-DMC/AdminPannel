import axios from "axios";
import {createUrl,createError} from "./util"
export async function register(fname,lname,email,password,contactme,state,city){
    try{
        
        const url = createUrl('jobseeker/signup')
        const body = {
            fname,
            lname,
            email,
            password,
            contactme,
            state,
            city
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
        const url = createUrl('jobseeker/signin')
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