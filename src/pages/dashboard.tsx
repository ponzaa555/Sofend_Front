import React, {useEffect, useState} from 'react';
import Head from 'next/head';
import NavbarEO from '../components/navbarEO';
import Event from '../components/eventEO';
import axios from 'axios';

const dashboard = ({}) => {

  const [event, setEvent] = useState([]);

  useEffect(() => {
    axios.get('https://eventbud-jujiu2awda-uc.a.run.app/eo_event/rajadamnern')
      .then((response) => {
        setEvent(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    console.log("event: ",event)
  },[event])

  

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
      <NavbarEO />
      <div className='my-16 mx-20'>
        {/*page name and create event button*/}
        <div className='flex justify-between mb-5'>
          <div className='text-5xl body-font font-montserrat font-bold'>All Events</div>
          <button className='font-montserrat font-bold bg-black rounded-lg text-white px-3'>create an event</button>
        </div>
        {/*table header*/}
        <div className='w-full h-0.5 bg-gray-300 rounded-lg mb-5' />
        <div className='flex font-montserrat text-xl font-bold mb-5 text-2xl'>
          <div className='pl-5 w-6/12'>Event Name</div>
          <div className='w-2/12'>Date & Time</div>
          <div className='w-1/12'></div>
          <div className='w-2/12'>Status</div>
          <div className='w-2/12'>Tickets Sold</div>
          <div className='w-1/12'></div>
        </div>
        <div className='w-full h-0.5 bg-gray-300 rounded-lg mb-5' />
        {event.map((event) => (
          <Event
            eventName={event.eventName}
            startDateTime={event.startDateTime}
            endDateTime={event.endDateTime}
            eventStatus={event.eventStatus}
            ticketSold={event.ticketSold}
            posterImage={event.posterImage}
            soldTicket={event.soldTicket}
            totalTicket={event.totalTicket}
          />
          ))}
        {/* <Event /> */}

        <div className='justify-center bg-white p-4'>
          <h1 className='text-center text-black font-montserrat font-bold text-2xl'>EventBud</h1>
          <h1 className='text-center text-black font-montserrat'>all right reserved</h1>
        </div>

      </div>
    </>
  )
}

export default dashboard