import React, { useEffect, useState } from 'react';
import "../../assets/css/qr.css"
import toast from 'react-hot-toast';
import QRReader from "../../component/QRReader";
import { useNavigate } from 'react-router-dom';

const ScanQR = () => {
    const navigate=useNavigate();
    const [data, setData] = useState(false);
    const [verified, setVerfied] = useState(true);
    const [fillData, setFillData] = useState({
        name: "",
        mobileNo: "",
        cabNo: "",
        photo: "",
    })

    useEffect(() => {
        if(!new RegExp('^SMJ:.*$', 'gm').test(data))
        {
            return;
        }
        toast.success("QR found");
        handleSubmit();

    }, [data]);

    const handleVerified = () => {
        setVerfied(prev => !prev);
    }

    const handleSubmit = () => {
        toast.success("Submit success");
        navigate("/passenger/fillinfo");
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        handleSubmit();
    }

    const handleOnChange = (e)=>{
        const {name,value}=e.target
        setFillData((preve)=>{
            return{
                ...preve,
                [name]:value
            }
        })
    }
    
    return (
    <>
        <div className='qr-main'>
            <div className='qr-form'>
                {
                    verified ?
                    <>
                        <p className='qr-label'>
                            Scan SafeMyJourney QR Code
                        </p>
                        <div className='qr-box'>
                            <QRReader setData={setData}/>
                        </div>
                    </>
                    :
                    <>
                        <div className='qr-fillform'>
                            <form className='w-full py-3 flex flex-col w-50' onSubmit={handleSubmitForm}>
                                <label htmlFor='name'>Driver Name</label>
                                <input type='text' id='name' name='name' className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-400' value={fillData.name} onChange={handleOnChange}/>

                                <label htmlFor='mobileNo'>Driver Mobile</label>
                                <input type='tel' id='mobileNo' name='mobileNo' className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-400' value={fillData.mobileNo} onChange={handleOnChange}/>

                                <label htmlFor='cabNo'>Cab No</label>
                                <input type='tel' id='cabNo' name='cabNo' className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-400' value={fillData.cabNo} onChange={handleOnChange}/>

                                <button type='submit' className='w-full max-w-[150px] bg-purple-500 m-auto hover:bg-purple-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4'>
                                    Confirm
                                </button>
                            </form>
                        </div>
                    </>
                }
            </div>
            {
                verified ?
                <>
                    <div className='flex text-left text-sm mt-2'>Cab don't have QR Code? &nbsp;
                        <p onClick={handleVerified} className='cursor-pointer text-purple-500 underline'>
                            Self checkin
                        </p>
                    </div>
                </>
                :
                <>
                    <div className='flex text-left text-sm mt-2'>Cab have QR Code? &nbsp;
                        <p onClick={handleVerified} className='cursor-pointer text-purple-500 underline'>
                            Go verified
                        </p>
                    </div>
                </>
            }
        </div>
    </>
  );

}

export default ScanQR