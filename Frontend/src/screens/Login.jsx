import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../services/jobseeker";

function Login() {
    const [email,setEmail] = useState('')
    const [password,setPassword]= useState('')
    const [isEmailEmpty,setEmailEmpty]= useState(false)
    const [isPasswordEmpty,setPasswordEmpty] = useState(false)
   
    // get navigartion hook
    const navigate = useNavigate()

    const onLogin = async ()=>{
        if(email.length == 0)
        {
           toast.error('Please enter email')
        }else if(password.length == 0)
        {
            toast.error('Please enter Password')
        }else 
        {
            const result = await login(email,password)
            if(result['status'] == 'success'){
                // cache the token 
                const token = result['data']['token']
                sessionStorage['token']= token
                toast.success('Welcome to the Application ')
                navigate('/home')
            }else{
                toast.error(result['error'])
            }
        }
    }

    return (
    <div>
        <h2 className='page-header'>Login</h2>
        <div className='row'>
            <div className='col'></div>
            <div className='col'>
                <div className='form'>
                    <div className='mb-3'>
                        <label htmlFor=''>Email</label>
                        <input
                        onChange={(e)=>{
                            if(e.target.value.length == 0){
                                setEmailEmpty(true)
                            }else 
                            {
                                setEmailEmpty(false)
                            }
                                setEmail(e.target.value)
                            }}
                            type='email' 
                            placeholder="abc@test.com"
                            className='form-control' 
                            />
                        {isEmailEmpty && (
                        <p style={{color: 'red'}}>Email is mandatory</p>
                        )}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor=''>Password</label>
                        <input 
                        onChange={(e)=>{
                            if(e.target.value.length == 0){
                                setPasswordEmpty(true)
                            }else 
                            {
                                setPasswordEmpty(false)
                            }
                            setPassword(e.target.value)
                        }}
                        type='password'
                        placeholder="XXXXXXXX" 
                        className='form-control'
                        />
                        {isPasswordEmpty &&(
                        <p style={{color: 'red'}}>Password is mandatory</p>
                        )}   
                    </div>
                    <div className='mb-3'>
                        <div>Don't have Account? <Link to='/register'>Register Here</Link></div>
                        <button onClick={onLogin} className='btn btn-success mt-2'>Login</button>
                    </div>
                </div> 
            </div>
            <div className='col'></div>
        </div>
    </div>);
}

export default Login;