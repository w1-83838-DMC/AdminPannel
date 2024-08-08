
import DashboardItem from '../components/dashboardItem';
import Navbar from './../components/navbar';
import { useEffect, useState } from 'react';
import { getAllJobs } from '../services/jobs';
import { toast } from 'react-toastify';

function Home() {

    const [jobs,setJobs]= useState([])

    const loadAllJobs = async ()=>{
        const result = await getAllJobs()
        console.log(result['data'])
        if(result['status']== 'success'){
            setJobs(result['data'])
        }else{
            toast.error(result['error'])
        }
    }

    useEffect(()=>{
        loadAllJobs()
    },[])

    return (
        <div>
        <Navbar/>
        <h2 className='page-header'>JOBS</h2>
        <table className=' table table-striped mt-5'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>providerid</th>
                    <th>jobtitle</th>
                    <th>location</th>
                    <th>companyname</th>
                    <th>categoryid</th>
                    <th>experiencerequired</th>
                    <th>salary</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    jobs.map((job,index)=>{
                        return <tr>
                            <td>{index+1}</td>
                            <td>{job['provider_id']}</td>
                            <td>{job['job_title']}</td>
                            <td>{job['location']}</td>
                            <td>{job['companyname']}</td>
                            <td>{job['category_id']}</td>
                            <td>{job['experienece_required']} years </td>
                            <td>{job['salary']} ₹ </td>
                            <td>
                                <button className="btn btn-danger bt-sm me-2">delete </button>
                                <button className="btn btn-primary bt-sm">details</button>
                            </td>
    
                        </tr>
                    })
                }
            </tbody>
        </table>
    </div>);
}

export default Home;