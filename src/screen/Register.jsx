import React, { useState } from 'react';
import '../assets/css/register.css';
import {BiShow,BiHide} from "react-icons/bi"
import { toast } from "react-hot-toast";

const Register = () => {
    const [data,setData]=useState({
        firstName: "",
        lastName: "",
        emailid: "",
        password: "",
        confirmPassword: "",
    });

    const [userRole, setUserRole] = useState(false);
    const [showPassword, setShowPassword]= useState(false);
    const [showConfirmPassword,setShowConfirmPassword]= useState(false)

    const switchRole = () => {
        setUserRole(preve => !preve)
    }

    const handleShowPassword = ()=>{
        setShowPassword(preve => !preve)
    }
    const handleShowConfirmPassword = ()=>{
        setShowConfirmPassword(preve => !preve)
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
        <div className="reg-main">
            <div className='reg-change-role'>
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
            <div className='reg-box'>
                <div className='reg-label'>
                    {
                        userRole === false ?
                            <>
                            <div>
                                Passenger Registration
                            </div>
                            </>
                        :
                            <>
                            <div>
                                Driver Registration
                            </div>
                            </>
                    }
                </div>
                <hr />
                <form className='w-full py-3 flex flex-col w-50' onSubmit={handleSubmit}>
                    <label htmlFor='firstname'>First Name</label>
                    <input type='text' id='firstname' name='firstName' className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-400' value={data.firstName} onChange={handleOnChange}/>

                    <label htmlFor='lastname'>Last Name</label>
                    <input type='text' id='lastname' name='lastName' className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-400' value={data.lastName} onChange={handleOnChange}/>

                    <label htmlFor='email'>Email Address</label>
                    <input type='email' id='email' name='emailid' className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-400' value={data.emailid} onChange={handleOnChange}/>

                    <label htmlFor='password'>Password</label>
                    <div className='flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-400'>                        
                        <input type={showPassword ? "text":"password"} id='password' name='password' className='w-full bg-slate-200 border-none outline-none' value={data.password} onChange={handleOnChange}/>
                        <span className='flex text-xl cursor-pointer' onClick={handleShowPassword}>{showPassword ? <BiShow/>:<BiHide/>}</span>
                    </div>
                    
                    
                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <div className='flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-400'>                        
                        <input type={showConfirmPassword ? "text":"password"} id='confirmPassword' name='confirmPassword' className='w-full bg-slate-200 border-none outline-none' value={data.confirmPassword} onChange={handleOnChange}/>
                        <span className='flex text-xl cursor-pointer' onClick={handleShowConfirmPassword}>{showConfirmPassword ? <BiShow/>:<BiHide/>}</span>
                    </div>

                    <button type='submit' className='w-full max-w-[150px] bg-red-500 m-auto hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4'>
                        Register
                    </button>
                </form>
            </div>
        </div>
        </>
    );
}

export default Register