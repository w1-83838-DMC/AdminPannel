import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import { useState } from "react";
import { toast } from "react-toastify";
import { addJobs } from "../services/jobs";

function AddJobs() {

    const [providerid,setproviderId]= useState('')
    const [seekerid,setSeekerId]= useState('')
    const [jobtitle,setJobTitle]= useState('')
    const [jobdescription,setJobDescription]= useState('')
    const [location,setLocation]=useState('')
    const [companyname,setCompanyName]=useState('')
    const [categoryid,setCategoryId]= useState('')
    const [experiencerequired,setExperienceRequires]= useState('')
    const [salary,setSalary]= useState('')
    const [companyimage,setCompanyImage]=useState('')

    const navigate = useNavigate()

    const onSave = async () =>{
        if(providerid.length == 0){
            toast.error("Please enter providerid ")
        }else if (seekerid.length == 0){
            toast.error('Please enter seekerid ')
        }else if (jobtitle.length == 0){
            toast.error("Please enter job title")
        }else if (jobdescription.length == 0){
            toast.error("Please enter jobDescription")
        }else if (location.length == 0){
            toast.error("Please enter location")
        }else if (companyname.length == 0){
            toast.error("please enter companyname")
        }else if (categoryid.length == 0){
            toast.error("Please enter categoryId")
        }else if(experiencerequired.length == 0 ){
            toast.error("please enter experience ")
        }else if (salary.length == 0)
        {
            toast.error("please enter salary ")
        }else if (companyimage.length == 0){
                toast.error("please enter companyimage ")
        }else {
            const result = await addJobs(providerid,seekerid,jobtitle,jobdescription,location,categoryid,experiencerequired,salary,companyname,companyimage)
            console.log(result)
            if(result['status']== 'success'){
                toast.success('succesfully Added Jobs ')
                navigate('/jobs')
            }else{
                toast.error(result['error'])
            }
        }
    }

    return (<div>
        <Navbar/>
        <h2 className='page-header'>ADD JOBS</h2>
        <div className="form">
        <div className="mb-3">
                <label htmlFor="">provider_id</label>
                <input 
                    onChange={(e)=>setproviderId(e.target.value)}
                    type="text" 
                    className="form-control" />
        </div> 
        <div className="mb-3">
                <label htmlFor="">seeker_id</label>
                <input 
                    onChange={(e)=>setSeekerId(e.target.value)}
                    type="text" 
                    className="form-control" />
        </div> 
        <div className="mb-3">
                <label htmlFor="">job_title</label>
                <input
                    onChange={(e)=>setJobTitle(e.target.value)}
                    type="text" 
                    className="form-control" />
        </div> 
        <div className="mb-3">
                <label htmlFor="">job_description</label>
                <textarea
                    onChange={(e)=>setJobDescription(e.target.value)}
                    rows={5} 
                    className="form-control" />
        </div>
        <div className="mb-3">
                <label htmlFor="">location</label>
                <textarea 
                    onChange={(e)=>setLocation(e.target.value)}
                    rows={2} 
                    className="form-control" />
        </div>
        <div className="mb-3">
                <label htmlFor="">Company name</label>
                <input 
                    onChange={(e)=>setCompanyName(e.target.value)}
                    type="text" 
                    className="form-control" />
        </div> 
        <div className="mb-3">
                <label htmlFor="">Company Image</label>
                <input 
                    onChange={(e)=>setCompanyImage(e.target.value)}
                    type="text" 
                    className="form-control" />
        </div> 
        <div className="row mb-3">
            <div className="col">
                <div className="mb-3">
                 <label htmlFor="">category_id</label>
                 <input 
                    onChange={(e)=>setCategoryId(e.target.value)}
                    type="text" 
                    className="form-control" />
                </div>
                </div>
                <div className="col">
                     <div className="mb-3">
                     <label htmlFor="">experience_required</label>
                    <input 
                        onChange={(e)=>setExperienceRequires(e.target.value)}
                        type="text" 
                        className="form-control" />
                </div>
                </div>
                <div className="col">
                     <div className="mb-3">
                    <label htmlFor="">salary</label>
                    <input 
                        onChange={(e)=>setSalary(e.target.value)}
                        type="text" 
                        className="form-control" />
                    </div>
                </div>
                <div className='mb-3'>
                    <button onClick={onSave} className="btn btn-success me-2">Save

                    </button>
                    <Link to="/jobs" className="btn btn-danger">Cancel

                    </Link>
                </div>
            </div>
        </div>
    </div>);
}

export default AddJobs;