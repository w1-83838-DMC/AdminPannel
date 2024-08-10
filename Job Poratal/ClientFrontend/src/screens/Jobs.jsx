import { Link } from 'react-router-dom';
import Navbar from './../components/navbar';
import propertiesData from '../dummy/jobs.json'
import { useEffect, useState } from 'react';
import { getAllJobs } from './../services/jobs';
import { toast } from 'react-toastify';
import config from '../config';
import { addJob } from '../features/cartSlice';
import { useDispatch } from 'react-redux';

function Myjobs({ job }){

    // get the dispatch object 

    const dispatch = useDispatch()
    


    const addJobsToCart = () =>{
        dispatch(addJob({...job,quantity: 1}))
    }

    return (
        <div className="card" style={{height: 450}}>
            <div style={{textAlign: 'center'}}>
                 <img 
                    style={{width:200}}
                    className='card-img-top' 
                    src ={config.server + "/" + job.companyimage} 
                    alt=""
                    />
                 <div className='card-body'>
                 <div style={{fontWeight: 'bold', fontSize: 19}}>Job Title: {job.job_title}</div>
                <div>Salary <span style={{fontWeight: 'bold', fontSize: 17 }}>₹ :{job.salary}</span></div>
                <div>Job Description : {job.job_description}</div>
              </div>
              <div className='mt-5'>
                <button onClick={addJobsToCart}className="btn btn-success ">Apply for this Job </button>
              </div>
            </div>
    </div>
    )
}

function Jobs() {

    const [jobs,setJobs] = useState([])

    const loadAllJobs = async () => {
        const result = await getAllJobs()
        console.log(result['data'])
        if(result['status']=='success'){
            setJobs(result['data'])

        }else{
            toast.error(result['error'])
        }
    }

    useEffect(()=>{
        loadAllJobs()
    },[]) // componentwillmound 

    return (
        <div>
            <Navbar/>
            <h2 className='page-header'>ALL JOBS </h2>
            <div className='row'>
                {jobs.map(job => {
                //console.log(job)
                return(
                    <div key={job['job_id']} className='col-3'>
                        <Myjobs job={job}/>
                    </div>
                )
            })}
            </div>
        </div>
    );
}

export default Jobs;
