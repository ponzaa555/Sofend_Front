import React, {useEffect, useState} from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import Introevent from '../components/events/introevent'
import Recommendevent from '../components/events/recommendevent'
import Allevent from '../components/events/allevent'
import Monthlyevent from '../components/events/monthlyevent'
import { getAllEvent } from '../service/api'
import Head from "next/head";

export const main = () => {
  const [events, setEvents] = useState([]);
  
  //fetch all event from api
  useEffect(() => {
    getAllEvent()
      .then(data => {
        setEvents(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

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
        <Navbar/>
        <Introevent/>
        <div className='flex flex-col'>
            <Recommendevent/>
            <Allevent/>
            <Monthlyevent/>
        </div>
        <Footer/>
    </>
  )
}

export default main