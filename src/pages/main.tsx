import React, {useEffect, useState} from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import Introevent from '../components/events/introevent'
import Recommendevent from '../components/events/recommendevent'
import Allevent from '../components/events/allevent'
import Monthlyevent from '../components/events/monthlyevent'
import Head from "next/head";

export const main = () => {
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
          <div className="justify-between px-4 py-8 mx-auto lg:max-w-7xl md:items-center md:px-8">
            <Recommendevent/>
          </div>
          <div className="justify-between px-4 py-8 mx-auto lg:max-w-7xl md:items-center md:px-8">
            <Allevent/>
          </div>
          <div className="justify-between px-4 py-8 mx-auto lg:max-w-7xl md:items-center md:px-8">
            <Monthlyevent/>
          </div>
        <Footer/>
    </>
  )
}

export default main