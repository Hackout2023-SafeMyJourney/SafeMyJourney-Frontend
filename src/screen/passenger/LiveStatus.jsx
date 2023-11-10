import React, { useState } from 'react';
import LiveTraking from '../../component/LiveTraking';
import { useLocation } from 'react-router-dom';

const LiveStatus = () => {
    const {state} = useLocation();
    console.log(state);
    return (
        <>
            <div>
                <LiveTraking />
            </div>
        </>
    );
}

export default LiveStatus