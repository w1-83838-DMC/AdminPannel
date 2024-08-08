import { useSelector } from "react-redux";
import Navbar from "../components/navbar";
import { useEffect, useState } from "react";
import config from "../config";

function Cart(){
    const [total,setTotal] = useState(0)
    const cart = useSelector(state=>state.cart)
    useEffect(()=>{

        let totalAmount=0
        for(const job of cart.jobs){
        totalAmount+=job['job_id']
    }
    setTotal(totalAmount)

    },[cart.jobs])
    
    
    return(
        <div>
            <Navbar/>
            <h2 className='page-header'>Cart</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>job_id</th>
                        <th>job_title</th>
                        <th>salary</th>
                        <th>CompanyImage</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cart.jobs.map((job,index)=>{
                            return<tr>
                                <td>{index+1}</td>
                                <td>{job['job_id']}</td>
                                <td>{job['job_title']}</td>
                                <td>{job['salary']}</td>
                                <td>
                                    <img style={{width:80}} src={config.server + '/' + job['companyimage']} alt="" />
                                </td>
                                <td>
                                    <button className="btn btn-success btn-sm">+</button>
                                    <button className="btn btn-success btn-sm ms-1">-</button>
                                    
                                </td>
                            </tr>
                        })
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan='5' style={{textAlign: 'right'}}>Applied candidate</td>
                        <td>{total}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default Cart;