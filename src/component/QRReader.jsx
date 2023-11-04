import React, { useEffect, useState } from 'react';
import { QrReader } from 'react-qr-reader';

const QRReader = (props) => {
    return (
        <QrReader
            onResult={(result, error) => {
                if (!!result) {
                    props.setData(result?.text);
                }
    
                if (!!error) {
                    console.info(error);
                }
            }}
        />
    );
}

export default QRReader;