import React, { useState } from 'react';
import '../assets/css/register.css';
import {BiShow,BiHide} from "react-icons/bi"
import { toast } from "react-hot-toast";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate=useNavigate();

    const [data,setData]=useState({
        name: "",
        mobile: "",
        age: "",
        gender: "",
        nomini_name: "",
        nomini_mobile: "",
        email: "",
        password: "",
        confirmPassword: "",
        cabNo: "",
        aadhaarNo: "",
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
    
    const registerPassenger = async () => {
        const finalData = {
            ...data,
            nomini: data.nomini_name,
            nominiMobile: data.nomini_mobile,
        } 
        console.log(finalData);
        const fetchData=await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/passanger/register`,{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(finalData)
        });

        if(fetchData.status === 200)
        {
            toast.success("Registration Successfull...");
            navigate("/login");
        }
        else
        {
            toast.error("Registration Failed...");
        }
    }

    const registerDriver = async () => {
        const finalData = {
            ...data,
            aadhar_no: data.aadhaarNo,
            cab_no: data.cabNo,
        }
        const fetchData=await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/driver/register`,{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(finalData)
        });
        const dataRes = await fetchData.json();
        console.log(dataRes);

        if(fetchData.status === 200)
        {
            toast.success("Registration Successfull...");
            navigate("/login");
        }
        else
        {
            toast.error("Registration Failed...");
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(!userRole)
        {
            registerPassenger();
        }
        else
        {
            registerDriver();
        }
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
                    <label htmlFor='name'>Name</label>
                    <input type='text' id='name' name='name' className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-400' value={data.name} onChange={handleOnChange}/>

                    <label htmlFor='mobile'>Mobile</label>
                    <input type='tel' id='mobile' name='mobile' className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-400' value={data.mobile} onChange={handleOnChange}/>

                    <label htmlFor='age'>Age</label>
                    <input type='number' id='age' name='age' className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-400' value={data.age} onChange={handleOnChange}/>

                    <label htmlFor='gender'>Gender:</label>
                    <div className='flex items-center justify-around'>
                        <label htmlFor="male">Male</label>
                        <input type="radio" id="male" name="gender" value="Male" onClick={handleOnChange}/>
                        <label htmlFor="female">Female</label>
                        <input type="radio" id="female" name="gender" value="Female" onClick={handleOnChange}/>
                        <label htmlFor="other">Other</label>
                        <input type="radio" id="other" name="gender" value="Other" onClick={handleOnChange}/>
                    </div>

                    {
                        userRole === false ?
                            <>
                                <label htmlFor='nomini_name'>Nominee Name</label>
                                <input type='text' id='nomini_name' name='nomini_name' className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-400' value={data.nomini_name} onChange={handleOnChange}/>

                                <label htmlFor='nomini_mobile'>Nominee Mobile</label>
                                <input type='text' id='nomini_mobile' name='nomini_mobile' className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-400' value={data.nomini_mobile} onChange={handleOnChange}/>
                            </>
                        :
                            <>
                                <label htmlFor='cabNo'>Cab No</label>
                                <input type='text' id='cabNo' name='cabNo' className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-400' value={data.cabNo} onChange={handleOnChange}/>

                                <label htmlFor='aadhaarNo'>Aadhaar No</label>
                                <input type='tel' id='aadhaarNo' name='aadhaarNo' className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-400' value={data.aadhaarNo} onChange={handleOnChange}/>

                            </>
                    }

                    <label htmlFor='email'>Email Address</label>
                    <input type='email' id='email' name='email' className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-400' value={data.email} onChange={handleOnChange}/>

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

                    <button type='submit' className='w-full max-w-[150px] bg-purple-500 m-auto hover:bg-purple-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4'>
                        Register
                    </button>
                </form>
                <p className='text-left text-sm mt-2'>Already have account ? <Link to={'/login'} className='text-purple-500 underline'>Login Now!!</Link></p>
            </div>
        </div>
        </>
    );
}

export default Register