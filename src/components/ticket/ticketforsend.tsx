import { get } from "http";
import React from "react";
import SVG from 'react-inlinesvg';

const TicketSend = (props:any) => {

    const eventTicket = props
    // console.log(eventTicket)
    // console.log(eventTicket.ticketID)

    const qrcode = require('qrcode') 
    var getSVG = ''
    const payload = eventTicket.ticketID
    const options = { type: 'svg', color: { dark: '#000', light: '#fff' } }
    qrcode.toString(payload, options, (err:any, svg:any) => {
        if (err) return console.log(err)
        getSVG = svg as string
        // console.log("SVG: ", svg)
    })

    return(
        <>
            <div className="flex flex-row-2">
                <div className="bg-black rounded-md w-[20rem] h-[450px] px-3">
                    <div className="flex flex-col justify-items-center my-4">
                        {/* <div className="text-white font-montserrat font-bold ml-8 -mb-4 mt-4">no. {eventTicket.ticketID}</div> */}
                        <img className="rounded-md p-6" src={eventTicket.poster}></img>
                    </div>
                </div>
                <div className="bg-[#F9F9F9] w-[25rem] h-[450px] rounded-md px-8 py-2">
                    <div className="flex flex-col justify-between h-auto my-4 gap-4">
                        <div className="flex flex-row-2 justify-items-start justify-between">
                            <div className="font-montserrat font-bold text-xl text-[#D40000]">{eventTicket.date}</div>
                        </div>
                        <div className="font-montserrat font-bold text-xl text-black w-80 h-20">{eventTicket.eventName}</div>
                        <div className="flex flex-row-2 justify-items-start my-2">
                            <div className="">
                                <div className="font-montserrat font-medium text-base text-black my-2">{eventTicket.location}</div>
                                <div className="flex flex-row-2 justify-items-start gap-20">
                                    <div className="">
                                        <div className="font-montserrat font-bold text-base text-black">ZONE</div>
                                        <div className="font-montserrat font-bold text-xl text-black">{eventTicket.zone}</div>
                                        <div className="font-montserrat font-bold text-base text-black">ROW</div>
                                        <div className="font-montserrat font-bold text-xl text-black">{eventTicket.row}</div>
                                    </div>
                                    <div className="">
                                        <div className="font-montserrat font-bold text-base text-black">GATE</div>
                                        <div className="font-montserrat font-bold text-xl text-black">{eventTicket.gate}</div>
                                        <div className="font-montserrat font-bold text-base text-black">SEAT</div>
                                        <div className="font-montserrat font-bold text-xl text-black">{eventTicket.seat}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 ml-5">
                                <SVG className="w-40" src= {getSVG}/>
                            </div>
                        </div>
                        <div className="flex flex-row-2 justify-items-start gap-10">
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
export default TicketSend;