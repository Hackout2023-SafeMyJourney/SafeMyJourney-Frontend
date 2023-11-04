import React from 'react';
import { QrReader } from 'react-qr-reader';

const QRReader = (props) => {
    return (
        <QrReader
            constraints={{
                facingMode: 'environment'
            }}
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