import React from "react";
import SVG from 'react-inlinesvg';
import { useEffect, useState } from "react";
import axios from "axios";
import { set } from "zod";
import Link from "next/link";

const ticketforphone = (props:any) => {
    

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
            <button className="flex flex-row justify-center gap-2" onClick={setDataToLocalStorage}>
                <p className="font-montserrat font-bold text-xs text-white w-3/4">Send this ticket to your friend</p>
                <img className="w-auto h-3 mt-3" src="../images/tickets/sendIcon.png"></img>
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
            <SVG className="" src= {getSVG}/>
        )
        else{
            return(
            <>
                <SVG className="opacity-20 blur-sm" src= {getSVG}/>
            </>
        )
        }
    }

    let eventName_ch = eventTicket.eventName
    const checklength = () => {
    console.log(eventTicket.eventName?.length,eventTicket.eventName)
    if(eventTicket.eventName?.length > 40){
        eventName_ch = eventTicket.eventName.substring(0,40) + "..."
    }
    }
    checklength()

    const data = {
        ticketID : eventTicket.ticketID,
        userID: eventTicket.userID,
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
    // const dataString = encodeURIComponent(JSON.stringify(data));

    const setDataToLocalStorage = () => {
        localStorage.setItem('data', JSON.stringify(data));
    }
    
    return(
        <>
            <div className="flex w-auto mx-3 items-stretch">
                <div className="bg-black rounded-md w-1/3 px-3">
                    <div className="flex flex-col my-8 gap-2 text-sm self-center h-auto">
                        <div className="font-montserrat font-bold text-white">no.</div>
                        {/* <div className="text-white font-montserrat font-bold ml-2">no. {eventTicket.ticketID}</div> */}
                        <img className="rounded-md w-auto" src={eventTicket.eventImage}></img>
                            <Link href={`/sendticket`}>
                            {button()}
                            </Link>
                        </div>
                </div>
                <div className="bg-[#F9F9F9] w-2/3 rounded-md px-4 py-2 shadow-lg">
                    <div className="flex flex-col justify-between mt-4">
                        <div className="flex flex-row-2 justify-between">
                            <div className="font-montserrat font-bold text-xs text-[#D40000]">{parsedate}</div>
                        </div>
                        <div className="font-montserrat font-bold text-base text-black mt-2 w-auto">{eventName_ch}</div>
                        <div className="flex flex-row-2 ">
                            <div className="">
                                <div className="font-montserrat font-medium text-xs text-black my-2 w-auto">{eventTicket.location}</div>
                                <div className="flex gap-2 w-auto">
                                    <div className="flex flex-row-2 w-1/2 justify-between h-auto">
                                        <div className="">
                                            <div className="font-montserrat font-bold text-xs text-black">ZONE</div>
                                            <div className="font-montserrat font-bold text-base text-black">{zone}</div>
                                            <div className="font-montserrat font-bold text-xs text-black">ROW</div>
                                            <div className="font-montserrat font-bold text-base text-black">{row}</div>
                                        </div>
                                        <div className="">
                                            <div className="font-montserrat font-bold text-xs text-black">GATE</div>
                                            <div className="font-montserrat font-bold text-base text-black">{gate}</div>
                                            <div className="font-montserrat font-bold text-xs text-black">SEAT</div>
                                            <div className="font-montserrat font-bold text-base text-black">{seat}</div>
                                        </div>
                                    </div>
                                    <div className="w-1/2">
                                        {qr()}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex mt-3 w-auto">
                            <div className="w-1/2">
                                <div className="font-montserrat font-bold text-xs text-black w-auto">First Name</div>
                                <div className="font-montserrat font-bold text-base text-black">{eventTicket.firstname}</div>
                            </div>
                            <div className="w-1/2">
                                <div className="font-montserrat font-bold text-xs text-black">Last Name</div>
                                <div className="font-montserrat font-bold text-base text-black w-auto h-auto">{eventTicket.lastname}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ticketforphone;