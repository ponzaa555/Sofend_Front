import React from 'react'
import Concerts from '../components/events/eventdetails/concert/concerts'
import Head from 'next/head'


const eventdetailC = () => {
  return (
    <>
        <Head>
            <title>EventBud</title>
            <meta name="description" content="" />
            <link rel="icon" href="/favicon.ico" />
            {/* import font to page */}
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='anonymous'/>
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap" rel="stylesheet"/>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='anonymous'/>
            <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@400;500;700&family=Montserrat:wght@400;500;700&display=swap" rel="stylesheet"/>
        </Head>
        <Concerts/>
    </>
  )
}

export default eventdetailC