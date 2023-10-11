import React from "react";
import ComponentSend2 from "./com_send2";
import { useState } from "react";
import Link from "next/link";
import TicketSend from "./ticketforsend";
import axios from "axios";
import { postTicket } from "~/service/api";

const ComponentSend1 = (props:any) => {

    const [Send, setSend] = useState(false);
    const [Email, setEmail] = useState("");

    const onSubmit = async () => {
        setSend(true);
        console.log(Email)
        console.log(ticket.ticketID)
        console.log(ticket.userID)

        postTicket(ticket.userID,ticket.ticketID,Email)
        .then(data => {
            console.log(data);
        })
    };
 
    const ticket = props
    console.log(Email)
    // console.log(ticket)

    return (
        <>
        {Send ? <ComponentSend2 ticketID={ticket.ticketID}
                    userID={ticket.userID}
                    firstname= {ticket.firstname}
                    lastname= {ticket.lastname}
                    eventName= {ticket.eventName}
                    location= {ticket.location}
                    poster = {ticket.poster}
                    zone= {ticket.zone}
                    row= {ticket.row}
                    gate= {ticket.gate}
                    seat= {ticket.seat}
                    date={ticket.date}/> :
            <div className="flex flex-row gap-16">
                <div className="basis-3/5">
                    <TicketSend ticketID={ticket.ticketID} 
                    firstname= {ticket.firstname}
                    lastname= {ticket.lastname}
                    eventName= {ticket.eventName}
                    location= {ticket.location}
                    poster = {ticket.poster}
                    zone= {ticket.zone}
                    row= {ticket.row}
                    gate= {ticket.gate}
                    seat= {ticket.seat}
                    date={ticket.date}/>
                </div>
                <div className="basis-2/4">
                <div className="bg-[#F9F9F9] rounded-md basis-2/4 p-8 h-[375px]">
                    <div className="flex flex-col justify-center items-center gap-8">
                        <div className="">
                            <div className="font-montserrat text-xl text-red-600">After sending this ticket, it will belong to them and removed out of your ‘My Ticket’ menu.</div>
                            <div className="font-montserrat text-xl font-bold text-red-600">This action cannot be undone.</div>
                        </div>
                        <div className="self-start">
                            <div className="flex flex-row">
                                <p className="font-montserrat font-bold text-black text-xl">Your friend’s email</p>
                                <span className="text-red-600 ml-1 text-lg font-bold">*</span>
                            </div>
                            {/* <form className="">
                                <input className="border-2 border-gray-300 rounded-md pl-2 w-[22rem] py-1" type="email" placeholder="" required></input>
                            </form> */}
                            <form onSubmit={onSubmit}>
                                <input className="border-2 border-gray-300 rounded-md pl-2 w-[22rem] py-2" type="email" placeholder="Email"
                                    value={Email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    name="email"
                                    required
                                />
                                <button type="submit" className="bg-black hover:bg-black hover:text-white border-2 border-black duration-300 text-white font-bold py-2 rounded mt-2 mb-2 box-content w-[21.75rem]
                            mr-5 font-montserrat">send</button>
                            </form>
                        </div>
                    </div>
                </div>
                </div>
            </div>}
        </>
    )
}

export default ComponentSend1;