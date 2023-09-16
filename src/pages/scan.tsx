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
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [checkin, setCheckin] = useState(true);

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

    const popup = () => {
        if (checkin) {
            return (
                <div className="fixed top-0 inset-x-0 flex items-center justify-center z-50">
                    <div className="px-8 py-6 bg-green-400 text-white flex justify-between rounded">
                        <div className="flex items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-7 w-7 mr-6"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"
                                />
                            </svg>
                            <p>Check in success!</p>
                            <h2> Qr code result: {scanResultWebCam}</h2>
                        </div>
                        <button className="text-green-100 hover:text-white" onClick={() => setPopupVisible(false)}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="fixed top-0 inset-x-0 flex items-center justify-center z-50">
                    <div className="px-8 py-6 bg-red-400 text-white flex justify-between rounded">
                        <div className="flex items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-7 w-7 mr-6"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                            </svg>
                            <p>Check in fail!</p>
                            <h2> Qr code result: {scanResultWebCam}</h2>
                        </div>
                        <button className="text-red-100 hover:text-white" onClick={() => setPopupVisible(false)}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )
        }

    }


    const handleScanResult = (result, error) => {
        if (result) {
            setScanResultWebCam(result.text);
            console.log(result.text);
        } else if (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (scanResultWebCam) {
            console.log(scanResultWebCam);
            setPopupVisible(true);
            // alert(scanResultWebCam);
        }
    }, [scanResultWebCam]);

    return (
        <>
            <Head>
                {/* import font to page */}
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='anonymous'/>
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap" rel="stylesheet"/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='anonymous'/>
                <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@400;500;700&family=Montserrat:wght@400;500;700&display=swap" rel="stylesheet"/>
            </Head>
            <div>
                <h3>Qr Code Scan by Web Cam</h3>
                <QrReader
                    constraints={{ facingMode: 'environment' }}
                    scanDelay={3000}
                    videoStyle={{ width: '100%' }}
                    onResult={handleScanResult}
                />
                {isPopupVisible && popup()}
                <h3>Scanned By WebCam Code: {scanResultWebCam}</h3>
                <h2>{eventDetail.eventName}</h2>
            </div>
            
        </>
    )
}

export default scan
