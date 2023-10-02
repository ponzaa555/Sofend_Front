import React from "react";
import Navbar from '../components/navbar'
import Head from "next/head";
import TicketSend from "../components/ticket/ticketforsend";
import ComponentSend1 from "~/components/ticket/com_send1";
import ComponentSend2 from "~/components/ticket/com_send2";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from 'next/router'
import { useSession } from "next-auth/react";

const SendTicket = () => {

    const router = useRouter()
    const { data } = router.query;
    const {data:session} = useSession();
    
    // recieve data from myticket page.
        let parsedData = null;
        if (data) {
            try {
                parsedData = JSON.parse(decodeURIComponent(data as string));
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        }
    console.log(parsedData)
    console.log(parsedData.posterImage)
    
    return (
        <>
            <Head>
                {/* import font to page */}
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='anonymous'/>
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap" rel="stylesheet"/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='anonymous' />
                <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@400;500;700&family=Montserrat:wght@400;500;700&display=swap" rel="stylesheet"/>
            </Head>
            <Navbar/>
            <div className='mx-auto lg:max-w-7xl md:items-center md:flex-col md:px-8 my-8'>
                <div className="font-montserrat font-bold text-4xl mb-10">Send ticket to your friend</div>
                <div className="flex flex-row gap-16">
                    <div className="basis-3/5">
                        <TicketSend ticketID={parsedData.ticketID} 
                        firstname= {parsedData.firstname}
                        lastname= {parsedData.lastname}
                        eventName= {parsedData.eventName}
                        location= {parsedData.location}
                        poster = {parsedData.poster}
                        zone= {parsedData.zone}
                        row= {parsedData.row}
                        gate= {parsedData.gate}
                        seat= {parsedData.seat}
                        date={parsedData.date}/>
                    </div>
                    <div className="basis-2/4">
                        <ComponentSend1 />
                    </div>
                </div>
            </div>
            <div className='justify-center bg-white p-4'>
                <h1 className='text-center text-black font-montserrat font-bold text-2xl'>EventBud</h1>
                <h1 className='text-center text-black font-montserrat'>all right reserved</h1>
            </div>
        </>
    )
}
export default SendTicket;