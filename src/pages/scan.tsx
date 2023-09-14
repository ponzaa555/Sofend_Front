import React, { use } from 'react'
import { QrReader } from 'react-qr-reader';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { getEventDetail } from '~/service/api';
import Head from 'next/head';
import ScheduleCard from '~/components/events/schedulecard';

export const scan = () => {
    const router = useRouter();
    const [eventDetail, setEventDetail] = useState<any>({});
    const { id } = router.query;
    const [scanResultWebCam, setScanResultWebCam] = useState('');

    useEffect(() => {
        console.log(id);
        if (id) {
            console.log(id);
            getEventDetail(id as string)
                .then(data => {
                    setEventDetail(data);
                })
                .catch(error => {
                    console.error('Error:', error);
                })
        };
    }, [id]);


    return (
        <div>
            <h3>Qr Code Scan by Web Cam</h3>
            <QrReader
                delay={1000}
                style={{width: '100%'}}
                onResult={(result, error) => {
                    if (!!result) {
                      setScanResultWebCam(result?.text);
                    }
                    if (!!error) {
                      console.info(error);
                    }
                  }}
            />
            <h3>Scanned By WebCam Code: {scanResultWebCam}</h3>
            <h2>{eventDetail.eventName}</h2>
        </div>
    )
}

export default scan
