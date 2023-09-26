import React from "react";
import Navbar from '../components/navbar'
import Head from "next/head";
import Ticket from "../components/ticket/ticket";
import { useSession } from "next-auth/react";
import { getTicket } from "../service/api";
import { useState } from "react";
import { useEffect } from "react";


const MyTicket = () => {

    const {data: session} = useSession();

    console.log(session?.user?.email)
    console.log(session?.user?.name)
    console.log(session?.user?.userID)

    const Firstname = session?.user?.name?.split(/[' ']/)[0] as string;
    const Lastname = session?.user?.name?.split(/[' ']/)[1] as string;

    const[Data,setData] = useState([])
    const [getfinish, setgetfinish] = useState(false);

    useEffect(() => {
        if (session) {
            console.log(session)
            getTicket(session.user?.userID)
                .then(data => {
                    setData(data);
                    setgetfinish(true);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
        else {
            console.log("no session")
        }
    }, []);

    return(
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
                <div className="font-montserrat font-bold text-4xl mb-4">MY TICKET</div>
                <div className="flex flex-row-2 justify-start gap-4">
                    <button className="text-xl border border-black rounded-full px-2 py-1 hover:bg-black hover:text-white font-montserrat">Available</button>
                    <button className="text-xl border border-black rounded-full px-3 py-2 hover:bg-black hover:text-white font-montserrat">Expired</button>
                </div>
            </div>
            <div className='mx-auto lg:max-w-7xl md:items-center md:flex-col md:px-8 my-8'>
                    <div className ="flex flex-wrap gap-8">
                        {Data.map((ticket,index) => (
                            <Ticket ticketID={ticket.ticketID} eventID={ticket.eventID} firstname={Firstname} lastname={Lastname}/>   
                        ))}
                </div>
            </div>
            <div className='justify-center bg-white p-4'>
                <h1 className='text-center text-black font-montserrat font-bold text-2xl'>EventBud</h1>
                <h1 className='text-center text-black font-montserrat'>all right reserved</h1>
            </div>
        </>
    )}
export default MyTicket;