import React from 'react';
import { useLocation } from 'react-router-dom';
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';

const Redirector = () => {
    let location = useLocation();
    const navigate = useNavigate()
    const [cookies1 , , ] = useCookies(["token"]);
    const [cookies2 , , ] = useCookies(["user"]);
    
    useEffect(() => {
        const currentPath = location.pathname;

        if(currentPath.startsWith('/passenger') || currentPath.startsWith('/driver'))
        {
            if(!cookies1["token"])
            {
                if(currentPath.startsWith('/passenger') || currentPath.startsWith('/driver'))
                {
                    navigate('/login');
                }
            }
            else
            {
                const userRole = cookies2["user"];
                if(userRole === "passenger")
                {
                    if(currentPath.startsWith('/driver'))
                    {
                        navigate('/login');
                    }
                }
                else if(userRole === "driver")
                {
                    if(currentPath.startsWith('/passenger'))
                    {
                        navigate('/login');
                    }
                }
            }
        }
    }, [location]);

    return (
        <>

        </>
    );
}

export default Redirector;