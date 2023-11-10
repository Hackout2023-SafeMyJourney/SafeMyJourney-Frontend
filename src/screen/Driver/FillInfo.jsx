import React from 'react';
import '../../assets/css/driverfillinfo.css';
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

export const FillInfo = () => {
    const print = () => window.print();
    const [cookies , , ] = useCookies(["token"]);
    const data = jwtDecode(cookies["token"]);
    const qr_url = `https://api.qrserver.com/v1/create-qr-code/?size=360x360&data=SMJ:${data.id}`;

    return (
        <>
        <div className="dfillinfo-main">
            <div className='dfillinfo-box'>
                <div className='dfillinfo-label'>
                    🛟 Safe My Journey QR 🛟
                </div>
                <hr />
                <div className='w-full py-3 flex flex-col w-50'>
                    <img src={qr_url}></img>
                    <button type='button' onClick={ print } className='w-full max-w-[200px] bg-pink-500 m-auto hover:bg-pink-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4'>
                        Get My QR
                    </button>
                </div>
            </div>
        </div>
        </>
    );
}