import { useSelector } from "react-redux";
import Navbar from "../components/navbar";
import config from "../config";
import { useEffect } from "react";

function MyJobs({job}){
    return (
        <div className="card" style={{height: 450}}>
        <div style={{textAlign: 'center'}}>
             <img 
                style={{width:300}}
                className='card-img-top' 
                src ={config.server + "/" + job.companyimage} 
                alt=""
                />
             <div className='card-body'>
             <div style={{fontWeight: 'bold', fontSize: 19}}>Job Title: {job.job_title}</div>
            <div>Salary <span style={{fontWeight: 'bold', fontSize: 17 }}>₹ :{job.salary}</span></div>
            <div>Job Description : {job.job_description}</div>
          </div>
          <div className='mt-2'>
                <button className="btn btn-success ">Applied Done .! </button>
              </div>
          
        </div>
    </div>
    )
}


function AppliedJobs() {

    const cart = useSelector(state=> state.cart)

    useEffect(()=>{

    },[cart.job])

    return (<div>
        <Navbar/>
        <h2 className='page-header'>Applied Jobs </h2>
        <div className='row'>
            {
                cart.jobs.map((job=>{
                    return(
                        <div key={job['job_id']} className='col-3'>
                            <MyJobs job={job}/>
                        </div>
                    )
                }))
            }

        </div>

    </div>);
}

export default AppliedJobs;