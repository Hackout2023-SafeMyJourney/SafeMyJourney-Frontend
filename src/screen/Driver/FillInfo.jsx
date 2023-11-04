import React, { useState } from 'react';
import '../../assets/css/driverfillinfo.css';
import { toast } from "react-hot-toast";

export const FillInfo = () => {
    const [data,setData] = useState({
        cabNo: "",
        aadhaarNo: "",
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

    const handleSave = (e) => {
        e.preventDefault();
        toast.success("success save");
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("success get QR");
    }

    return (
        <>
        <div className="dfillinfo-main">
            <div className='dfillinfo-box'>
                <div className='dfillinfo-label'>
                    Edit Cab Details
                </div>
                <hr />
                <form className='w-full py-3 flex flex-col w-50' onSubmit={handleSubmit}>
                    <label htmlFor='cabNo'>Cab No</label>
                    <input type='text' id='cabNo' name='cabNo' className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-400' value={data.cabNo} onChange={handleOnChange}/>

                    <label htmlFor='aadhaarNo'>Aadhaar No</label>
                    <input type='tel' id='aadhaarNo' name='aadhaarNo' className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-400' value={data.aadhaarNo} onChange={handleOnChange}/>

                    <button type='button' className='w-full max-w-[200px] bg-purple-500 m-auto hover:bg-purple-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4' onClick={handleSave} >
                        Save Details
                    </button>
                    <button type='submit' className='w-full max-w-[200px] bg-pink-500 m-auto hover:bg-pink-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4'>
                        Get My QR
                    </button>
                </form>
            </div>
        </div>
        </>
    );
}