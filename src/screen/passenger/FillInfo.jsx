import React, { useState } from 'react';
import "../../assets/css/passengerfillinfo.css";
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';

export const FillInfo = () => {
    const navigate = useNavigate();
    const { state } = useLocation();

    const [data,setData]=useState({
        startLocation: "",
        endLocation: "",
    });
    
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
        <div className='pfillinfo-main'>
            <div className='pfillinfo-box'>
                <form className='w-full py-3 flex flex-col w-50' onSubmit={handleSubmit}>
                    <label htmlFor='startLocation'>Start Location</label>
                    <input type='text' id='startLocation' name='startLocation' className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-400' value={data.startLocation} onChange={handleOnChange}/>

                    <label htmlFor='endLocation'>End Location</label>
                    <input type='text' id='endLocation' name='endLocation' className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-400' value={data.endLocation} onChange={handleOnChange}/>

                    <div className='pfillinfo-button-div'>
                        <button type='button' className='w-full max-w-[150px] bg-purple-500 hover:bg-purple-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-2'>
                            Get Directions
                        </button>
                        <button type='submit' className='w-full max-w-[150px] bg-yellow-400 hover:bg-yellow-500 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-2'>
                            Share Ride
                        </button>
                    </div>
                </form>
            </div>
            <hr/>
        </div>
        </>
    );
}
