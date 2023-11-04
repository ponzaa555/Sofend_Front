
import Head from "next/head";
import Link from "next/link";
import Navbar from "~/components/navbar";
import Selectzonenseat from "~/components/events/eventdetails/concert/selectzonenseat";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "~/components/footer";

const SelectZoneSeats = () => {

    const router = useRouter()
    const {id} = router.query as {id:string}

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
            <main className="flex min-h-screen flex-col">
                <Navbar/>
                <Selectzonenseat/>
            </main>
        </>
    );
}

export default SelectZoneSeats
