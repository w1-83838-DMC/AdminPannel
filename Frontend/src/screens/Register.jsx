import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register } from "../services/jobseeker";

function Register() {

    const [fname,setFirstName]= useState('')
    const [laname,setLastName]= useState('')
    const [email,setEmail]= useState('')
    const [password,setPassword]= useState('')
    const [confirmPassword,setConfirmPassword]= useState('')
    const [contactme,setContactMe]= useState('')
    const [state,setState]= useState('')
    const [city,setCity]= useState('')

    // get the Navigation hook 

    const navigate = useNavigate()



    const onRegister=async ()=>{
        if(fname.length == 0){
            toast.warning('Please enter first name')              
        }else  if(laname.length == 0){
            toast.warning('Please enter last name')              
        }else  if(email.length == 0){
            toast.warning('Please enter email')              
        }else  if(password.length == 0){
            toast.warning('Please enter password ')              
        }else  if(confirmPassword.length == 0){
            toast.warning('Please enter Confirm Password ')              
        }else if (password!= confirmPassword){
            toast.warning('Password does not match')
        }else if (contactme.length == 0){
            toast.warning('Please Enter Contact')
        }else if (state.length == 0){
            toast.warning('Please enter State')
        }else if(city.length == 0){
            toast.warning('please enter city')
        }else 
        {
            const result = await register(fname,laname,email,password,contactme,state,city)
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
                        <label htmlFor="">First Name</label>
                        <input
                         onChange={e=>setFirstName(e.target.value)}
                        type="text" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="">Last Name</label>
                        <input 
                        onChange={e=>setLastName(e.target.value)}
                        type="text" className="form-control" />
                    </div>
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
                        <label htmlFor="">Contact Me</label>
                        <input 
                        onChange={e=>setContactMe(e.target.value)}
                        type="number" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="">State</label>
                        <input 
                        onChange={e=>setState(e.target.value)}
                        type="text" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="">City</label>
                        <input 
                        onChange={e=>setCity(e.target.value)}
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