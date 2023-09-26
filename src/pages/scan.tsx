import React, { use } from 'react'
import { QrReader } from 'react-qr-reader';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { getEventDetail } from '~/service/api';
import Head from 'next/head';
import ScheduleCard from '~/components/events/schedulecard';
import MaterialSymbolsArrowBackIosNew from '../components/icon/PreButton'
import { set } from 'zod';


export const scan = () => {
    const router = useRouter();
    const [eventDetail, setEventDetail] = useState<any>({});
    const { id } = router.query;
    const [scanResultWebCam, setScanResultWebCam] = useState("");
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [checkin, setCheckin] = useState(false);
    const [getfinish, setgetfinish] = useState(false);
    const qrReader = useRef(null);
    const [qrresponse, setQrresponse] = useState("");
    const [postfinish, setpostfinish] = useState(false);

    useEffect(() => {
        console.log(id);
        if (id) {
            console.log(id);
            getEventDetail(id as string)
                .then(data => {
                    setEventDetail(data);
                    setgetfinish(true);
                })
                .catch(error => {
                    console.error('Error:', error);
                })
        };
    }, [id]);

    const popup = () => {
        if (postfinish) {
            if (checkin) {
                return (
                    <div className="fixed inset-0 flex items-center justify-center z-50 ">
                        <div className="flex w-auto shadow-lg rounded-lg">
                            <div className="bg-green-600 py-4 px-6 rounded-l-lg flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="text-white fill-current" viewBox="0 0 16 16" width="20" height="20"><path fill-rule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg>
                            </div>
                            <div className="px-4 py-6 bg-white rounded-r-lg flex justify-between items-center w-full border border-l-transparent border-gray-200">
                                <div className="flex flex-col">
                                    <p className="text-xl font-medium font-montserrat mr-3">Check-in success!</p>
                                    {/* <h2 className="font-montserrat">{qrresponse}</h2>
                                <h2 className="font-montserrat"> Qr code result: {scanResultWebCam}</h2> */}
                                </div>
                                <button onClick={() => {
                                    // setPopupVisible(false)
                                    // setScanResultWebCam("")
                                    // setpostfinish(false)
                                    window.location.reload();
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="fill-current text-gray-700" viewBox="0 0 16 16" width="20" height="20"><path fill-rule="evenodd" d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"></path></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="fixed inset-0 flex items-center justify-center z-50 ">
                        <div className="flex w-auto shadow-lg rounded-lg">
                            <div className="bg-red-600 py-4 px-6 rounded-l-lg flex items-center ">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="fill-current text-white" width="20" height="20"><path fill-rule="evenodd" d="M4.47.22A.75.75 0 015 0h6a.75.75 0 01.53.22l4.25 4.25c.141.14.22.331.22.53v6a.75.75 0 01-.22.53l-4.25 4.25A.75.75 0 0111 16H5a.75.75 0 01-.53-.22L.22 11.53A.75.75 0 010 11V5a.75.75 0 01.22-.53L4.47.22zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5H5.31zM8 4a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 018 4zm0 8a1 1 0 100-2 1 1 0 000 2z"></path></svg>
                            </div>
                            <div className="px-4 py-6 bg-white rounded-r-lg flex justify-between items-center w-full border border-l-transparent border-gray-200">
                                <div className="flex flex-col">
                                    <p className="text-xl font-medium font-montserrat mr-3">Check-in fail!</p>
                                    <h2 className="font-montserrat mr-3">{qrresponse}</h2>
                                    {/* <h2 className="font-montserrat"> Qr code result: {scanResultWebCam}</h2> */}
                                </div>
                                <button onClick={() => {
                                    // setPopupVisible(false)
                                    // setScanResultWebCam("")
                                    // setpostfinish(false)
                                    window.location.reload();
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="fill-current text-gray-700" viewBox="0 0 16 16" width="20" height="20"><path fill-rule="evenodd" d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"></path></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        } else {
            return (
                <div className="fixed inset-0 flex items-center justify-center z-50 ">
                    <div className="flex w-auto shadow-lg rounded-lg ">
                        <div role="status" className='flex flex-row items-center justify-center my-4 mx-4'>
                            <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                            <span className="font-montserrat ">Loading...</span>
                        </div>
                    </div>
                </div>

            )
        }

    }


    const handleScanResult = (result, error) => {
        if (error) return;
        if (result) {
            setScanResultWebCam(result.text);
            console.log("Qrcode:", result.text);
            // qrReader.current.stop();
        }

    };

    const postscanresult = async () => {
        const url = `https://eventbud-jujiu2awda-uc.a.run.app/scanner/${id}/${scanResultWebCam}`;
        console.log(url);

        const response = await fetch(url, {
            method: 'POST',
        });
        const res = await response.json();
        console.log(res);
        setQrresponse(res.detail);
        if (response.ok) {
            setCheckin(true);
        } else {
            setCheckin(false);
        }
        setpostfinish(true);

    }


    useEffect(() => {
        if (scanResultWebCam != "") {
            { postscanresult() }
            setPopupVisible(true);
        }
    }, [scanResultWebCam]);

    return (
        <>
            <Head>
                {/* import font to page */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='anonymous' />
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap" rel="stylesheet" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='anonymous' />
                <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@400;500;700&family=Montserrat:wght@400;500;700&display=swap" rel="stylesheet" />
            </Head>
            <div className='justify-between px-4 py-8 mx-auto lg:max-w-7xl md:items-center md:px-8'>
                <div className='flex mt-1 h-full w-auto items-center my-2 '>
                    <a href="/profilepage" className=''>
                        <MaterialSymbolsArrowBackIosNew />
                    </a>
                    <a href="/profilepage" className=''>
                        <div className="text-4xl font-montserrat font-bold text-center">BACK</div>
                    </a>
                </div>
                {getfinish == true ? <h2 className='text-center my-5 text-lg font-medium font-montserrat'>{eventDetail.eventName}</h2> :
                    <div role="status" className='flex flex-row items-center justify-center mb-5 mt-4 '>
                        <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span className="font-montserrat">Loading...</span>
                    </div>}
                {isPopupVisible == false ?
                    <QrReader
                        constraints={{ facingMode: 'environment' }}
                        // ref={qrReader}
                        scanDelay={500}
                        onResult={handleScanResult}
                        videoStyle={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%", objectFit: "cover" }}
                    // videoContainerStyle={{ width: "100%", height: "50%" }}
                    /> : popup()}
            </div>


        </>
    )
}

export default scan