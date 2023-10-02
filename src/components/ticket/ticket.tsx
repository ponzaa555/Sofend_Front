import React from "react";
import SVG from 'react-inlinesvg';
import { useEffect, useState } from "react";
import axios from "axios";
import { set } from "zod";
import Link from "next/link";

const Ticket = (props:any) => {

    const eventTicket = props
    const qrcode = require('qrcode') 
    // console.log(eventTicket.firstname)
    // console.log(eventTicket.ticketID)
    // console.log(eventTicket.eventID)

    // Convert payload(string) to SVG(qrcode)
    var getSVG = ''
    const payload = eventTicket.ticketID
    const options = { type: 'svg', color: { dark: '#000', light: '#fff' } }
    qrcode.toString(payload, options, (err:any, svg:any) => {
        if (err) return console.log(err)
        getSVG = svg as string
        // console.log("SVG: ", svg)
    })

    const date = eventTicket.date.split(/['T']/)[0] as string;
    const day = date.split('-')[2] as string;
    const month = date.split('-')[1] as string;
    const year = date.split('-')[0] as string;
    const month_list = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    const parsedate = day + " " + month_list[parseInt(month)-1] + " " + year as string;
    
    let zone = "-"
    let row = "-"
    let gate = "-"
    let seat = "-"
    const checkseat = () => {
        if (eventTicket.seat.length == 2) {
            zone = eventTicket.seat
            row = eventTicket.seat[0]
            seat = eventTicket.seat[1]
        }
        else if (eventTicket.seat.length > 6) {
            zone = eventTicket.seat.substring(0,6) + "..."
        }
        else if(eventTicket.seat != ""){
            zone = eventTicket.seat
        }
    }
    checkseat()
    // console.log(zone)
    // console.log(row)
    // console.log(seat)
    // console.log(gate)

    const button = () => {
        if(eventTicket.status=="available")
        return(
            <>
            <button className="flex flex-row justify-center">
                <p className="font-montserrat font-bold text-sm text-white w-3/4">Send this ticket to your friend</p>
                <img className="w-auto h-6 mt-3" src="../images/tickets/sendIcon.png"></img>
            </button>
            </>
        )
        else{
            return
        }
    }

    const qr = () => {
        if(eventTicket.status=="available")
        return(
            <SVG className="w-40" src= {getSVG}/>
        )
        else{
            return(
            <>
                <SVG className="w-40 opacity-20 blur-sm" src= {getSVG}/>
            </>
        )
        }
    }

    let eventName_ch = eventTicket.eventName
    const checklength = () => {
    console.log(eventTicket.eventName.length,eventTicket.eventName)
    if(eventTicket.eventName.length > 75){
        eventName_ch = eventTicket.eventName.substring(0,75) + "..."
    }
    }
    checklength()

    const data = {
        ticketID : eventTicket.ticketID,
        firstname: eventTicket.firstname,
        lastname: eventTicket.lastname,
        eventName: eventName_ch,
        location: eventTicket.location,
        poster : eventTicket.eventImage,
        date: parsedate,
        zone: zone,
        row: row,
        gate: gate,
        seat: seat,
    }
    const dataString = encodeURIComponent(JSON.stringify(data));
    
    return(
        <>
            <div className="flex flex-row-2">
                <div className="bg-black rounded-md w-[200px] h-[400px] px-3">
                    <div className="flex flex-col justify-items-center my-12 gap-2">
                        {/* <div className="text-white font-montserrat font-bold ml-2">no. {eventTicket.ticketID}</div> */}
                        <img className="rounded-md" src={eventTicket.eventImage}></img>
                            <Link href={`/sendticket?data=${dataString}`}>
                            {button()}
                            </Link>
                        </div>
                </div>
                <div className="bg-[#F9F9F9] w-[24.5rem] h-[400px] rounded-md px-8 py-2 shadow-lg">
                    <div className="flex flex-col justify-between mt-4">
                        <div className="flex flex-row-2 justify-items-start justify-between">
                            <div className="font-montserrat font-bold text-xl text-[#D40000]">{parsedate}</div>
                        </div>
                        <div className="font-montserrat font-bold text-xl text-black h-20 mt-2 w-96">{eventName_ch}</div>
                        <div className="flex flex-row-2 justify-items-start">
                            <div className="">
                                <div className="font-montserrat font-medium text-base text-black my-2 h-16 w-48">{eventTicket.location}</div>
                                <div className="flex flex-row-2 justify-items-start gap-16">
                                    <div className="">
                                        <div className="font-montserrat font-bold text-base text-black">ZONE</div>
                                        <div className="font-montserrat font-bold text-xl text-black">{zone}</div>
                                        <div className="font-montserrat font-bold text-base text-black">ROW</div>
                                        <div className="font-montserrat font-bold text-xl text-black">{row}</div>
                                    </div>
                                    <div className="">
                                        <div className="font-montserrat font-bold text-base text-black">GATE</div>
                                        <div className="font-montserrat font-bold text-xl text-black">{gate}</div>
                                        <div className="font-montserrat font-bold text-base text-black">SEAT</div>
                                        <div className="font-montserrat font-bold text-xl text-black">{seat}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                {/* <SVG className="w-40" src= {getSVG}/> */}
                                {qr()}
                            </div>
                        </div>
                        <div className="flex flex-row-2 justify-items-start gap-20 mt-3">
                            <div className="">
                                <div className="font-montserrat font-bold text-base text-black">First Name</div>
                                <div className="font-montserrat font-bold text-xl text-black">{eventTicket.firstname}</div>
                            </div>
                            <div className="">
                                <div className="font-montserrat font-bold text-base text-black">Last Name</div>
                                <div className="font-montserrat font-bold text-xl text-black">{eventTicket.lastname}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Ticket;