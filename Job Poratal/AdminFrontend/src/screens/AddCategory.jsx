import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import { toast } from "react-toastify";
import { useState } from "react";
import { addCategory } from "../services/jobs";

function AddCategory(){

    const [categoryname,setCategoryName]= useState('')

    const navigate = useNavigate()

    const onSave = async ()=>{
        if(categoryname.length == 0){
            toast.error("Please enter category ")
        }else{
            const result = await addCategory(categoryname)
            if(result['status']=='success'){
                toast.success('succesfully Added Category ')
                navigate('/jobs')
            }else{
                toast.error(result['error'])
            }
        }

    }
    return(<div>
        <Navbar/>
        <h2 className='page-header'> ADD CATEGORY </h2>
        <div className="form">
            <div className="mb-3">
                <label htmlFor="">categoryName</label>
                <input 
                    onChange={(e)=>setCategoryName(e.target.value)}
                    type="text"
                    className="form-control" />
            </div>
            <div className="mb-3">
                <button onClick={onSave} className="btn btn-success me-2">Save
                </button>
                <Link to="/jobs" className="btn btn-danger">Cancel
                </Link>
            </div>

        </div>


    </div>);

}
export default AddCategory;