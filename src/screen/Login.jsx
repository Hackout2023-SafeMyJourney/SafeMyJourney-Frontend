import React, { useState } from 'react';
import toast from 'react-hot-toast';
import {BiShow,BiHide} from "react-icons/bi"
import { Link } from 'react-router-dom';
import "../assets/css/login.css";

const Login = () => {
    const [data,setData]=useState({
        emailid: "",
        password: "",
    });

    const [userRole, setUserRole] = useState(false);
    const [showPassword, setShowPassword]= useState(false);
    
    const switchRole = () => {
        setUserRole(preve => !preve)
    }

    const handleShowPassword = ()=>{
        setShowPassword(preve => !preve)
    }
    
    const handleOnChange = (e)=>{
        const {name,value}=e.target
        setData((preve)=>{
            return{
                ...preve,
                [name]:value
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("success submit");
    }

    return (
        <>
        <div className="login-main">
            <div className='login-change-role'>
                {
                    userRole === false ?
                        <>
                        <div onClick={switchRole}>
                            Are you driver?
                        </div>
                        </>
                    :
                        <>
                        <div onClick={switchRole}>
                            Are you passenger?
                        </div>
                        </>
                }
            </div>
            <div className='login-box'>
                <div className='login-label'>
                    {
                        userRole === false ?
                            <>
                            <div>
                                Passenger Login
                            </div>
                            </>
                        :
                            <>
                            <div>
                                Driver Login
                            </div>
                            </>
                    }
                </div>
                <hr />
                <form className='w-full py-3 flex flex-col w-50' onSubmit={handleSubmit}>
                    <label htmlFor='email'>Email Address</label>
                    <input type='email' id='email' name='emailid' className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-400' value={data.emailid} onChange={handleOnChange}/>

                    <label htmlFor='password'>Password</label>
                    <div className='flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-400'>                        
                        <input type={showPassword ? "text":"password"} id='password' name='password' className='w-full bg-slate-200 border-none outline-none' value={data.password} onChange={handleOnChange}/>
                        <span className='flex text-xl cursor-pointer' onClick={handleShowPassword}>{showPassword ? <BiShow/>:<BiHide/>}</span>
                    </div>

                    <button type='submit' className='w-full max-w-[150px] bg-purple-500 m-auto hover:bg-purple-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4'>
                        Login
                    </button>
                </form>
                <p className='text-left text-sm mt-2'>Don't have an account? <Link to={'/register'} className='text-purple-500 underline'>Register Now!!</Link></p>
            </div>
        </div>
        </>
    );
}

export default Login