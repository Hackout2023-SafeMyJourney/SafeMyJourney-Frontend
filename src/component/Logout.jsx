import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom'
import { useEffect } from "react";
import { toast } from "react-hot-toast";

const Logout = () => {
    const navigate = useNavigate();
    const [ , , removeCookie] = useCookies(["token"]);
    
    removeCookie('token');
    removeCookie('user');
    
    useEffect(() => {
        toast.success('Logout Successfull...');
        navigate('/');
    }, [])

    return (
        <>
        </>
    );
}

export default Logout;