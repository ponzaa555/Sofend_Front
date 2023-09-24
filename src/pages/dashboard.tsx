import React, {useEffect, useState} from 'react';
import Head from 'next/head';
import NavbarEO from '../components/navbarEO';

export const dashboard = () => {
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
      <div className='mx-10 my-10'>
        {/*page name and create event button*/}
        <div className='flex justify-between mb-5'>
          <div className='text-5xl body-font font-montserrat font-bold'>All Events</div>
          <button className='font-montserrat font-bold bg-black rounded-lg text-white px-3 py-0'>create an event</button>
        </div>
        {/*table header*/}
        <div className='w-full h-1 bg-gray-300 rounded-lg mb-5' />
        <div className='flex justify-between font-montserrat text-xl font-bold mb-5 text-2xl'>
          <div className='ml-5'>Event Name</div>
          <div className='ml-32'>Date & Time</div>
          <div className=''>Status</div>
          <div className='mr-24'>Tickets Sold</div>
        </div>
        <div className='w-full h-1 bg-gray-300 rounded-lg mb-5' />
        {/*event for this EO [On-Going]*/}
        <div className='flex font-montserrat text-base font-bold items-center'>
          <div className='flex items-center space-x-4'>
            <img className='object-cover h-36 w-30 rounded-md' src='https://p-u.popcdn.net/event_details/posters/000/016/215/large/fc20bc7076d8acd7e80168e07f511f4181a65da0.png?1695028291' />
            <div className='font-bold w-60'>BE@RBRICK WORLD WIDE TOUR 3 in Bangkok</div>
          </div>
          <div className='flex flex-col items-center ml-36'>
            <div className=''>Sat, 20 Nov 2021</div>
            <div className=''>19:00 - 22:00</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default dashboard