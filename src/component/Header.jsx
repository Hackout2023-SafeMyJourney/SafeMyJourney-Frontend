import React, { useState } from 'react';
import logo from "../assets/logo.png";
import { Link } from 'react-router-dom';
import {FaRegUserCircle} from "react-icons/fa";
import { useCookies } from "react-cookie";

const Header = () => {
    const [cookies , , ] = useCookies(["access_token"]);
    const isLoginned = cookies["access_token"] ? true : false;

    const[showMenu,setshowMenu] = useState(false);
    const handleShowMenu = ()=>{
        setshowMenu(preve => !preve) 
    }
    return (
        <header className='fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white'>
            
            <div className='flex items-center h-full justify-between'>
                <Link to={""}>
                <div className='h-10'>
                    <img src={logo} className="h-full"/>
                </div>
                </Link>

                <div className="flex items-center gap-4 md:gap-7">
                    <div className=" text-slate-600"onClick={handleShowMenu}>
                        <div className="text-3xl cursor-pointer">
                            <FaRegUserCircle />
                        </div>
                        {showMenu && (
                        <div className="absolute right-2 bg-white py-2 px-2 shadow drop-shadow-md flex flex-col">
                            { isLoginned ?
                                <>
                                    <Link to={"logout"} className="Whitespace-nowrap cursor-pointer">Logout</Link>
                                </>
                                : <>
                                    <Link to={"admin/login"} className="whitespace-nowrap cursor-pointer">Admin Login</Link>
                                    <Link to={"login"} className="Whitespace-nowrap cursor-pointer">Login</Link>
                                </>
                            }
                        </div>
                        )}
                        
                    </div>
                </div>
            </div>


            {/* mobile */}
        </header>
    )
}

export default Header