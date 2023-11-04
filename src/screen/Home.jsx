import React, { useState } from 'react';
import "../assets/css/home.css";
import bgImg from "../assets/OR68WQ0.jpg";
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <>
            <div className='home-main' style={{
                backgroundImage: `url(${bgImg})`,

            }}>
                <div className='home-box'>
                    <p className='home-title'>Safe My Journey</p>
                    <br/>
                    <p className='home-slogan'>Your Trusted Travel Companion!</p>
                    <Link to={'/login'}>
                        <div className='home-login'>
                            Login
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Login