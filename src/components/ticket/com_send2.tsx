import React from "react";
import TicketSend from "./ticketforsend";
import { Toaster } from "react-hot-toast";

const ComponentSend2 = (props:any) => {

    const ticket = props

    return(
        <>  
            <div className="flex flex-row justify-center gap-16">
            <div className="">
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
            <div className="w-1/4">
            <div className="grid grid-col place-content-center justify-items-center gap-4 place-items-center mt-28">
                <img className="w-24" src="../images/tickets/yes.png"></img>
                <div className="font-montserrat font-bold text-xl text-black">Transfer succesful</div>
                <a href="/myticket" className="bg-black hover:bg-black hover:text-white border-2 border-black duration-300 text-white font-bold py-2 rounded mt-2 mb-2 box-content h-6 w-32 font-montserrat text-center">My Ticket</a>
            </div>
            </div>
            </div>   
        </>
    )
}

export default ComponentSend2;