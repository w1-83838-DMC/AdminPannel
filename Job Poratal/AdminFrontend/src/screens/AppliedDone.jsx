import { useSelector } from "react-redux";
import Navbar from "../components/navbar";
import config from "../config";
import { useEffect, useState } from "react";
import { getAllAppliedJobs } from "../services/jobspost";
import { toast } from "react-toastify";

function AppliedDone() {

    const [jobs,setJobs]= useState()

    const loadJobs = async()=>{
        const result = await getAllAppliedJobs()
        if(result['status'] == 'success'){
            setJobs(result['data'])
        }else{
            toast.error(result['error'])
        }
    }

    useEffect(()=>{
        loadJobs()
    },[])

    const cart = useSelector(state=> state.cart)

    useEffect(()=>{

    },[cart.job])

    return (<div>
        <Navbar/>
        <h2 className='page-header'>Applied Done </h2>
        
       

    </div>);
}

export default AppliedDone;