import React from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import Eventschedule from '../components/events/eventschedule'
import Link from 'next/link'
import Head from 'next/head';


export const profile = () => {
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
            <div className="w-full">
                <div className="flex justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                    <a className="w-1/4 flex-col shadow-2xl mr-2 ">profile</a>
                    <div className="w-3/4 flex-col shadow-2xl ">
                        <Eventschedule/>
                    </div>
                </div>
            </div>
        <Footer/>
    </>
  )
}

export default profile
