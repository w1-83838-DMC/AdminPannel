import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/navbar";
import { useEffect, useState } from "react";
import config from "../config";
import { applyJobs } from "../services/jobspost";
import { clear } from "../features/cartSlice";
import { toast } from "react-toastify";

function Cart(){
    const [total,setTotal] = useState(0)

    const dispatch = useDispatch()
    const cart = useSelector(state=>state.cart)
    useEffect(()=>{

        let totalAmount=0
        for(const job of cart.jobs){
        totalAmount+=job['job_id']
    }
    setTotal(totalAmount)

    },[cart.jobs])
    
    const onApplyJob = async ()=> {
        const result = await applyJobs(cart.jobs)
        if (result ['status'] == 'success'){
            dispatch(clear())
            toast.success("Succesfully Applied For Role ")
        }else{
            toast.error(result['error'])
        }
    }
    
    return(
        <div>
            <Navbar/>
            <h2 className='page-header'>Applicant Applied Jobs .....</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>job_id</th>
                        <th>seeker_id</th>
                        <th>job_title</th>
                        <th>salary</th>
                        <th>CompanyImage</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cart.jobs.map((job,index)=>{
                            return<tr>
                                <td>{index+1}</td>
                                <td>{job['job_id']}</td>
                                <td>{job['seeker_id']}</td>
                                <td>{job['job_title']}</td>
                                <td>{job['salary']}</td>
                                <td>
                                    <img style={{width:80}} src={config.server + '/' + job['companyimage']} alt="" />
                                </td>
                            </tr>
                        })
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan='5' style={{textAlign: 'right'}}>Applied candidate Job_id :</td>
                        <td>{total}</td>
                    </tr>
                </tfoot>
            </table>
            
        <button onClick={onApplyJob} className="btn btn-primary">Applied To the Job

        </button>

        </div>
    )
}

export default Cart;