import React from "react";
import SVG from 'react-inlinesvg';

const Ticket = (props:any) => {

    const eventTicket = props
    const qrcode = require('qrcode') 
    console.log(eventTicket.firstname)
    console.log(eventTicket.ticketID)
    console.log(eventTicket.eventID)

    // Convert payload(string) to SVG(qrcode)
    var getSVG = ''
    const payload = eventTicket.ticketID
    const options = { type: 'svg', color: { dark: '#000', light: '#fff' } }
    qrcode.toString(payload, options, (err:any, svg:any) => {
        if (err) return console.log(err)
        getSVG = svg as string
        console.log("SVG: ", svg)
    })

    return(
        <>
            <div className="flex flex-row-2">
                <div className="bg-black rounded-md w-[200px] h-[400px] px-3">
                    <div className="flex flex-col justify-items-center my-8 gap-2">
                        <div className="text-white font-montserrat font-bold ml-2">no. {eventTicket.ticketID}</div>
                        <img className="" src="../images/events/e1.png"></img>
                            <a href="/sendticket">
                            <button className="flex flex-row justify-center">
                                <p className="font-montserrat font-bold text-sm text-white w-3/4">Send this ticket to your friend</p>
                                <img className="w-auto h-6 mt-3" src="../images/tickets/sendIcon.png"></img>
                            </button>
                            </a>
                        </div>
                </div>
                <div className="bg-[#F9F9F9] w-[24.5rem] h-[400px] rounded-md px-8 py-2">
                    <div className="flex flex-col justify-between h-auto my-4">
                        <div className="flex flex-row-2 justify-items-start justify-between">
                            <div className="font-montserrat font-bold text-xl text-[#D40000]">2 Sep 2023</div>
                            <div className="font-montserrat font-bold text-xl text-black">5,500</div>
                        </div>
                        <div className="font-montserrat font-bold text-xl text-black">หลักสูตร Administering Windows Server Hybrid Core Infrastructure (AZ-8…</div>
                        <div className="flex flex-row-2 justify-items-start">
                            <div className="">
                                <div className="font-montserrat font-medium text-base text-black my-4">Thunder dome stadium, Muang Thong Thani</div>
                                <div className="flex flex-row-2 justify-items-start gap-20">
                                    <div className="">
                                        <div className="font-montserrat font-bold text-base text-black">ZONE</div>
                                        <div className="font-montserrat font-bold text-xl text-black">C1</div>
                                        <div className="font-montserrat font-bold text-base text-black">ROW</div>
                                        <div className="font-montserrat font-bold text-xl text-black">A</div>
                                    </div>
                                    <div className="">
                                        <div className="font-montserrat font-bold text-base text-black">GATE</div>
                                        <div className="font-montserrat font-bold text-xl text-black">4</div>
                                        <div className="font-montserrat font-bold text-base text-black">SEAT</div>
                                        <div className="font-montserrat font-bold text-xl text-black">A16</div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-10">
                                {/* <img className="w-44" src="../images/tickets/qrcode.png"></img> */}
                                <SVG className="w-44" src= {getSVG}/>

                            </div>
                        </div>
                        <div className="flex flex-row-2 justify-items-start gap-20">
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