import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register } from "../services/jobprovider";


function Register() {

    const [email,setEmail]= useState('')
    const [password,setPassword]= useState('')
    const [confirmpassword,setConfirmPassword]= useState('')
    const [companyname,setCompanyName]= useState('')
    const [companydescription,setCompanyDescription] = useState('')
    
    // get the Navigation hook 

    const navigate = useNavigate()

    const onRegister=async ()=>{
                    
        if(email.length == 0){
            toast.warning('Please enter email')              
        }else  if(password.length == 0){
            toast.warning('Please enter password ')              
        }else  if(confirmpassword.length == 0){
            toast.warning('Please enter Confirm Password ')              
        }else if (password!= confirmpassword){
            toast.warning('Password does not match')
        }else 
        {
            const result = await register(email,password,companyname,companydescription)
            if(result['status']=='success'){
                toast.success('succesfully registered the user')
                navigate('/' )
            }else {
                toast.error(result['error'])
            }
        }

    }

    return (<div>
        <h2 className='page-header'>Register</h2>
        <div className="row">
            <div className="col"></div>
            <div className="col">
                <div className="form">
                    <div className="mb-3">
                        <label htmlFor="">Email</label>
                        <input 
                        onChange={e=>setEmail(e.target.value)}
                        type="email" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="">Password</label>
                        <input 
                        onChange={e=>setPassword(e.target.value)}
                        type="password" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="">Confirm Password</label>
                        <input 
                        onChange={e=>setConfirmPassword(e.target.value)}
                        type="password" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="">Company Name</label>
                        <input 
                        onChange={e=>setCompanyName(e.target.value)}
                        type="text" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="">Company Description </label>
                        <input 
                        onChange={e=>setCompanyDescription(e.target.value)}
                        type="text" className="form-control" />
                    </div>

                    <div className="mb-3">
                        <div>Already Have An Account <Link to='/'>Login Here</Link></div>
                        <button onClick={onRegister} className="btn btn-success mt-2">Register</button>
                    </div>
                </div>
            </div>
            <div className="col"></div>
        </div>
    </div>);
}

export default Register;