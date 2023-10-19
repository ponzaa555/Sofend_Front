import React from "react";
import Navbar from '../components/navbar'
import Head from "next/head";
import Ticket from "../components/ticket/ticket";
import { useSession } from "next-auth/react";
import { getTicket } from "../service/api";
import { useState } from "react";
import { useEffect } from "react";
import { set } from "zod";
import Ticketforphone from "../components/ticket/ticketforphone";
import { useMediaQuery } from 'react-responsive';

const MyTicket = () => {

    const {data: session} = useSession();
    // console.log(session?.user?.email)
    // console.log(session?.user?.name)
    // console.log(session?.user?.userID)

    const userID = session?.user?.userID as string;
    const Firstname = session?.user?.name?.split(/[' ']/)[0] as string;
    const Lastname = session?.user?.name?.split(/[' ']/)[1] as string;

    const[Data,setData] = useState([])
    const [getfinish, setgetfinish] = useState(false);

    useEffect(() => {
        if (session) {
            console.log(session)
            getTicket(session.user?.userID)
                .then(data => {
                    setFilteredEvents(data);
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
    }, [session]);
    console.log(Data)

    const[selectedtag,setSelectedtag] = useState("available")
    //set color button
    const defaultcolor = `text-xl border border-black rounded-full px-3 py-2 hover:bg-black hover:text-white font-montserrat`
    const changeColor = `text-xl border border-black rounded-full px-3 py-2 bg-black text-white font-montserrat font-bold`
    const[colortag_available,setColortag_available] = useState(changeColor)
    const[colortag_expired,setColortag_expired] = useState(defaultcolor)
    const [checkdisableAvailable, setCheckdisableAvailable] = useState(true);
    const [checkdisableExpired, setCheckdisableExpired] = useState(false);
    const alltag = ["available","expired"]

    const handleclicktag = (e:any) => {

        setgetfinish(false)
        const input_tag = String(e.target.value)
        if (input_tag === "available") {
            setCheckdisableAvailable(true)
            setCheckdisableExpired(false)
        }
        else {
            setCheckdisableAvailable(false)
            setCheckdisableExpired(true)
        }
        console.log("input",input_tag)
        setSelectedtag(input_tag)
        //set color tag to selected
        alltag.filter((tag) => tag !== input_tag).map((tag) => {
            eval("setColortag_"+tag)(defaultcolor)
        })
        eval("setColortag_"+input_tag)(changeColor)  
    }

    const[filteredEvents,setFilteredEvents] = useState([])
    
    let status_ticket = ""
    const filteredbytag = () => {
        const filteredE = Data.filter((E) => {
          status_ticket = E.status
          if (status_ticket === "scanned") {
            status_ticket = "expired";
          }
          return status_ticket.includes(selectedtag);
        });
        return filteredE;
    }
    
    var filteredE = filteredbytag()

    useEffect(() => {
        var filteredData = filteredbytag()
        setFilteredEvents(filteredData)
        setgetfinish(true)
      },[selectedtag])

    // console.log("filtered",filteredEvents)
    // console.log("data",Data)
    // console.log("filteredE",filteredE)

    const isMobile = useMediaQuery({ maxWidth: 767 });

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
                    <button disabled={checkdisableAvailable} className={colortag_available} value="available" onClick={handleclicktag}>Available</button>
                    <button  disabled={checkdisableExpired} className ={colortag_expired} value="expired" onClick={handleclicktag} >Expired</button>
                </div>
            </div>
            {getfinish == true ? 
                <div className='mx-auto lg:max-w-7xl md:items-center md:flex-col md:px-8 my-8'>
                    <div>
                    <div className="md:hidden flex flex-wrap gap-4">
                        {filteredE.map((ticket,index) => (
                            <Ticketforphone ticketID={ticket.ticketID} eventID={ticket.eventID} eventName={ticket.eventName} userID={userID} firstname={Firstname} lastname={Lastname} eventImage={ticket.eventImage} date={ticket.validDatetime} seat={ticket.seatNo} class={ticket.className} status={ticket.status} location={ticket.location} zone={ticket.className} no={ticket.runNo}/>
                        ))}
                    </div>
                    </div>
                    <div>
                    <div className ="flex flex-wrap gap-4 lg:max-w-7xl">
                        {filteredE.map((ticket, index) => (
                            !isMobile && (
                            <Ticket ticketID={ticket.ticketID} eventID={ticket.eventID} eventName={ticket.eventName} userID={userID} firstname={Firstname} lastname={Lastname} eventImage={ticket.eventImage} date={ticket.validDatetime} seat={ticket.seatNo} class={ticket.className} status={ticket.status} location={ticket.location} zone={ticket.className} no={ticket.runNo} />
                        )
                        ))}
                    </div>
                    </div>
                </div>
                :
            <>
              <div className="h-32 mt-3"/>
              <div role="status" className='flex flex-row items-center justify-center mb-5 mt-4 '>
                  <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                  </svg>
                  <span className="font-montserrat">Loading...</span>
              </div>
              <div className="h-32 mt-3"/>
            </>
            }
            <div className='justify-center bg-white p-4'>
                <h1 className='text-center text-black font-montserrat font-bold text-2xl'>EventBud</h1>
                <h1 className='text-center text-black font-montserrat'>all right reserved</h1>
            </div>
        </>
    )}
export default MyTicket;