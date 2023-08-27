import Head from "next/head";
import Link from "next/link";
import Navbar from "~/components/navbar";
import Selectzonenseat from "~/components/events/eventdetails/concert/selectzonenseat";

export default function EventdetailC() {


    return ( 
        <>
            <Head>
                <title>EventBud</title>
                <meta name="description" content="" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="flex min-h-screen flex-col">
                <Navbar/>
                <Selectzonenseat/>
            </main>
        </>
    );
}